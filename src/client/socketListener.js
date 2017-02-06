import io from 'socket.io-client';
import config from '../../config.json';

export const getSocket = () => io.connect(`http://${__IP__}:${config.port}`);

export default (dispatch, getState) => {
	const socket = getSocket();
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