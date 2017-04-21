import {types} from './client/actions';

export const messages = (state = [], action) => {
	switch (action.type) {
		case types.RECEIVE_MESSAGE:
			return state.filter(message => ![].concat(action.payload).map(m => m.id).includes(message.id)).concat(action.payload);
		case types.ADD_MESSAGE:
			return state.concat({...action.payload, sending: true});
		case 'ADD_MESSAGE_SUCCESS':
			return state.map(message => action.payload.nonce === message.nonce ? {...action.payload, sending: false} : message);
		default:
			return state;
	}
};

export const isFetching = (state = false, action) => {
	switch (action.type) {
		case types.ADD_MESSAGE:
			return false;
		case 'ADD_MESSAGE_SUCCESS':
			return false;
		default:
			return state;
	}
};

export const user = (state = null, action) => {
	switch (action.type) {
		 case 'LOGIN':
		     return action.payload;
		default:
			return state;
	}
};

export const showJsAlert = (state = true, action) => {
	switch (action.type) {
		case 'HIDE_JS_ALERT':
			return false;
		case 'SHOW_JS_ALERT':
			return true;
		default:
			return state;
	}
};

export const clients = (state = [], action) => {
	switch (action.type) {
		case types.CLIENT_CONNECTED:
			return state.filter(client => client.id !== action.payload.id).concat(action.payload);
		case types.CLIENT_DISCONNECTED:
			return state.filter(client => client.socketId !== action.payload.id);
		case 'AUTH':
			return state.map(client => client.id === action.payload.user.id ? {...client, socketId: action.payload.socket.id} : client);
		default:
			return state;
	}
};