import Express from 'express';
import db from './server/database';
import SocketIo  from 'socket.io';
import http from 'http';
import config from './config.json';
import api from './server/api';
import {match, RouterContext} from 'react-router';
import routes from './routes';
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from './reducers';
import {renderToString} from 'react-dom/server';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import shortid from 'shortid';
import session from 'express-session';
import webpackMiddleware from './server/middlewares/webpack';

const app = Express();
export const server = http.createServer(app);
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
		io.sockets.emit('disconnected', clients.filter(client => client.socketId === socket.id).map(client => client.user).find(() => true));
		clients = clients.filter(client => client.socketId != socket.id)
	});
});

app.use(session({secret: config.secret, resave: false, saveUninitialized: true}));

app.use('/api', api);
app.use(webpackMiddleware);

app.use((req, res) => {
	match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			db.getMessages({page: 0, size: config.initialMessageCount}).then(({content}) => {
				const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
				if (!req.session.user) {
					const randomColor = 'red'; // TODO Implement
					req.session.user = {
						id: shortid.generate(),
						color: randomColor
					};
				}
				const user = req.session.user;
				io.sockets.emit('connected', user);
				clients = clients.filter(client => client.id != user.id).concat(user);
				const preloadedState = {messages: content, user, clients};
				const store = createStore(combineReducers(reducers), preloadedState, applyMiddleware(thunk, createLogger({collapsed: true})));
				let html = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
				const finalState = store.getState();
				res.status(200).send(renderFullPage(html, finalState, assetsByChunkName));
			});
		} else {
			res.status(404).send('Not found')
		}
	});
});

server.listen(config.port);

const renderFullPage = (html, preloadedState, assetsByChunkName) => {
	const styles = assetsByChunkName.main.filter(path => path.endsWith('.css')).map(path => `<link rel="stylesheet" href="${path}">`);
	const scripts = assetsByChunkName.main.filter(path => path.endsWith('.js')).map(path => `<script src="${path}"></script>`);
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
				<title>Document</title>
				${styles}
			</head>
			<body>
				<div id="root">${html}</div>
				<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};</script>
				${scripts}
			</body>
		</html>`;
};

export const close = (fn) => {
	io.close(() => {
		server.close(() => {
			fn();
		});
	});
};