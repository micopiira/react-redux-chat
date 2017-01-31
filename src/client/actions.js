import io from 'socket.io-client';
import config from '../../config.json';
import axios from 'axios';

const socket = io.connect(`http://0.0.0.0:${config.port}`);

export const types = {
	INIT_SOCKETS: 'INIT_SOCKETS',
	ADD_MESSAGE: 'ADD_MESSAGE',
	FETCH_MESSAGES: 'FETCH_MESSAGES',
	CLIENT_DISCONNECTED: 'CLIENT_DISCONNECTED',
	CLIENT_CONNECTED: 'CLIENT_CONNECTED',
	MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
	MESSAGE_SENT: 'MESSAGE_SENT',
	CONNECTED: 'CONNECTED',
	MESSAGES_RECEIVED: 'MESSAGES_RECEIVED'
};

export const initSockets = () => (dispatch, getState) => {
	dispatch({type: types.INIT_SOCKETS, payload: socket});
	socket.on('connect', () => {
		dispatch({type: types.CONNECTED, payload: socket.id});
		socket.emit('auth', getState().user);
		socket.on('disconnected', user => {
			dispatch({type: types.CLIENT_DISCONNECTED, payload: user});
		});
		socket.on('connected', user => {
			dispatch({type: types.CLIENT_CONNECTED, payload: user});
		});
		socket.on('message', message => {
			dispatch({type: types.MESSAGE_RECEIVED, payload: message});
		});

	});
	socket.on('error', () => {
		dispatch({type: 'SOCKET_ERROR'});
	});
	socket.on('connect_failed', () => {
		dispatch({type: 'SOCKET_CONNECT_FAILED'});
	});
};

export const fetchMessages = () => dispatch => {
	dispatch({type: types.FETCH_MESSAGES});
	axios.get('/api/messages', {params: {page: 0, size: config.initialMessageCount}}).then(({data}) => {
		dispatch({type: types.MESSAGES_RECEIVED, payload: data.content});
	});
};

export const addMessage = message => (dispatch, getState) => {
	dispatch({type: types.ADD_MESSAGE, payload: message});
	socket.emit('message', {text: message, sender: getState().user}, addedMessage => {
		dispatch({type: types.MESSAGE_SENT, payload: addedMessage});
	});
};