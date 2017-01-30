import Express from 'express';
import db from './database';
import SocketIo  from 'socket.io';
import http from 'http';
import config from '../../config.json';
import api from './api';
import {match, RouterContext} from 'react-router';
import routes from '../client/routes';
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../client/reducers';
import {renderToString} from 'react-dom/server';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import session from 'express-session';
import webpackMiddleware from './middlewares/webpack';
import userMiddleware from './middlewares/user';

const app = Express();
const server = http.createServer(app);
const io = SocketIo(server);

let clients = [];

io.on('connection', socket => {
	socket.on('auth', user => {
		clients = clients.map(client => client.id === user.id ? {...client, socketId: socket.id} : client);
	});
	socket.on('message', (msg, cb) => {
		const addedMsg = db.addMessage({...msg});
		io.sockets.emit('message', addedMsg);
		cb(addedMsg);
	});
	socket.on('disconnect', () => {
		io.sockets.emit('disconnected', clients
			.filter(client => client.socketId === socket.id)
			.map(client => client.user)
			.find(() => true));
		clients = clients.filter(client => client.socketId != socket.id);
	});
});

app.use(session({secret: config.secret, resave: false, saveUninitialized: true}));

app.use('/api', api);
app.use(webpackMiddleware);
app.use(userMiddleware);

app.use((req, res) => {
	match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			db.getMessages({page: 0, size: config.initialMessageCount}).then(({content}) => {
				const user = req.session.user;
				io.sockets.emit('connected', user);
				clients = clients.filter(client => client.id != user.id).concat(user);
				const preloadedState = {messages: content, user, clients};
				const store = createStore(combineReducers(reducers), preloadedState, applyMiddleware(thunk, createLogger({collapsed: true})));
				let html = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
				const finalState = store.getState();
				const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
				res.status(200).send(renderFullPage(html, finalState, assetsByChunkName));
			});
		} else {
			res.status(404).send('Not found');
		}
	});
});

const renderFullPage = (html, preloadedState, assetsByChunkName) => {
	const styles = assetsByChunkName.app.filter(path => path.endsWith('.css')).map(path => `<link rel="stylesheet" href="${path}">`);
	const scripts = assetsByChunkName.app.filter(path => path.endsWith('.js')).map(path => `<script src="${path}"></script>`);
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
				<title>${config.title}</title>
				${styles}
			</head>
			<body>
				<div id="root">${html}</div>
				<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};</script>
				${scripts}
			</body>
		</html>`;
};

server.listen(config.port);

console.log('The app is running at:');
console.log();
console.log(`http://localhost:${config.port}`);

export default server;