import {getSocket} from './socketListener';

export const types = {
	ADD_MESSAGE: 'ADD_MESSAGE',
	RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
	ADD_MESSAGE_SUCCESS: 'ADD_MESSAGE_SUCCESS',
	CLIENT_CONNECTED: 'CLIENT_CONNECTED',
	CLIENT_DISCONNECTED: 'CLIENT_DISCONNECTED'
};

export const addMessage = message => ({
	type: types.ADD_MESSAGE,
	payload: message
});

export const receiveMessage = message => ({
	type: types.RECEIVE_MESSAGE,
	payload: message
});

export const clientConnected = client => ({
	type: types.CLIENT_CONNECTED,
	payload: client
});

export const clientDisconnected = client => ({
	type: types.CLIENT_DISCONNECTED,
	payload: client
});

export const hideJsAlert = () => ({
	type: 'HIDE_JS_ALERT'
});

export const showJsAlert = () => ({
	type: 'SHOW_JS_ALERT'
});

export const addMessageThunk = text => (dispatch, getState) => {
	const msg = {id: null, text, sender: getState().user, timestamp: new Date().toISOString()};
	getSocket().emit('message', msg);
};