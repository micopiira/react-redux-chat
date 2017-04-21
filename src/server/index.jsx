import Express from 'express';
import db from './database';
import SocketIo  from 'socket.io';
import http from 'http';
import config from '../../config.json';
import api from './api';
import {match, RouterContext} from 'react-router';
import routes from '../routes';
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as reducers from '../reducers';
import {renderToString} from 'react-dom/server';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import webpackMiddleware from './middlewares/webpack';
import userMiddleware from './middlewares/user';
import sessionMiddleware from './middlewares/session';
import {receiveMessage, clientConnected, clientDisconnected} from '../client/actions';
import {getServerIp} from '../utils';
import renderFullPage from './template';
import cookieParser from 'cookie-parser';

const app = Express();
const server = http.createServer(app);
const io = SocketIo(server);

const serverStore = createStore(combineReducers((({clients, messages}) => ({clients, messages}))(reducers)), applyMiddleware(thunk, createLogger({collapsed: true})));

const dispatchGlobally = action => {
	serverStore.dispatch(action);
	io.sockets.emit('dispatch', action);
};

io.on('connection', socket => {
	socket.on('auth', user => {
		dispatchGlobally({type: 'AUTH', payload: {socket: {id: socket.id}, user}});
	});
	socket.on('message', (msg, cb) => {
		db.addMessage({...msg}).then(addedMsg => {
			dispatchGlobally(receiveMessage(addedMsg));
			cb(msg);
		});
	});
	socket.on('get:messages', (pageRequest, cb) => {
		db.getMessages(pageRequest).then(messages => {
			cb(messages);
		});
	});
	socket.on('disconnect', () => {
		dispatchGlobally(clientDisconnected({id: socket.id}));
	});
});

app.use(sessionMiddleware);
app.use('/api', api);
app.use(webpackMiddleware);
app.use(userMiddleware);
app.use(cookieParser());

app.use((req, res) => {
	match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			const user = req.session.user;
			dispatchGlobally(clientConnected(user));
			if (req.query.hideJsAlert) {
				res.cookie('hideJsAlert', JSON.stringify(true));
				res.redirect('/');
			}
			const initialClientState = {user, showJsAlert: !req.cookies.hideJsAlert};
			const store = createStore(combineReducers(reducers), {...serverStore.getState(), ...initialClientState}, applyMiddleware(thunk, createLogger({collapsed: true})));
			res.status(200).send(renderFullPage(
				renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>),
				store.getState(),
				res.locals.webpackStats.toJson().assetsByChunkName
			));
		} else {
			res.status(404).send('Not found');
		}
	});
});

server.listen({host: '0.0.0.0', port: config.port}, () => {
	const {address, port} = server.address();
	/* eslint-disable no-console */
	console.log('The app is running at:');
	console.log();
	console.log(`\thttp://${address}:${port}`);
	console.log(`\thttp://${getServerIp()}:${port}`);
	/* eslint-enable no-console */
});

export default server;