const devIp = require('dev-ip');

export const getServerIp = () => {
	const ip = devIp();
	return ip.length ? ip[0] : '0.0.0.0';
};