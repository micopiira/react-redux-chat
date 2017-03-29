import session from 'express-session';
import config from '../../../config.json';

export default session({
	secret: config.secret,
	resave: false,
	saveUninitialized: true
});