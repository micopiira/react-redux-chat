import io from 'socket.io-client';
import config from '../../config.json';
import {types} from './actions';

export const socket = io.connect(`http://0.0.0.0:${config.port}`);

export default (dispatch, getState) => {
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