import server from '../src/server/index';
import {getServerIp} from '../src/utils';
import config from '../config.json';

server.listen({host: '0.0.0.0', port: config.port}, () => {
	const {address, port} = server.address();
	/* eslint-disable no-console */
	console.log('The app is running at:');
	console.log();
	console.log(`\thttp://${address}:${port}`);
	console.log(`\thttp://${getServerIp()}:${port}`);
	/* eslint-enable no-console */
});