import io from 'socket.io-client';
import config from '../../config.json';

export const socket = io.connect(`http://0.0.0.0:${config.port}`);

export default (dispatch, getState) => {
	socket.on('connect', () => {
		socket.emit('auth', getState().user);
		socket.on('dispatch', action => {
			dispatch(action);
		});
	});
	socket.on('error', () => {
		dispatch({type: 'SOCKET_ERROR'});
	});
	socket.on('connect_failed', () => {
		dispatch({type: 'SOCKET_CONNECT_FAILED'});
	});
};