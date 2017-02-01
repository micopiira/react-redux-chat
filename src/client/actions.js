import config from '../../config.json';
import axios from 'axios';
import {socket} from './socketListener';

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