import config from '../../config.json';
import {socket} from './socketListener';
import shortid from 'shortid';

export const types = {
	ADD_MESSAGE: 'ADD_MESSAGE',
	RECEIVE_MESSAGE: 'RECEIVE_MESSAGE'
};

export const addMessage = message => ({
	type: types.ADD_MESSAGE,
	payload: message
});

export const receiveMessage = message => ({
	type: types.RECEIVE_MESSAGE,
	payload: message
});

export const fetchMessages = () => dispatch => {
	socket.emit('get:messages', {page: 0, size: config.initialMessageCount}, messages => {
		dispatch(receiveMessage(messages));
	});
};

export const addMessageThunk = text => (dispatch, getState) => {
	const msg = {text, sender: getState().user, timestamp: new Date().toISOString()};
	const nonce = shortid.generate();
	dispatch(addMessage({...msg, nonce}));
	socket.emit('message', msg, addedMessage => {
		dispatch({type: 'ADD_MESSAGE_SUCCESS', payload: {...addedMessage, nonce}});
	});
};