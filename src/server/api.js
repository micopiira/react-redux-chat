import Express from 'express';
import db from './database';
import io from 'socket.io-client';
import config from '../../config.json';
import bodyParser from 'body-parser';
import querytypes from './middlewares/querytypes';

const socket = io.connect(`http://localhost:${config.port}`);
const api = Express();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));

api.use(querytypes);

const queryToPageRequest = ({page, size}) => ({page, size});

api.get('/messages', (req, res) => {
	db.getMessages(queryToPageRequest(req.query)).then(messages => {
		res.json(messages);
	});
});

api.post('/messages', (req, res) => {
	const message = {text: req.body.text, sender: req.session.user};
	socket.emit('message', message, () => {
		res.redirect('/');
	});
});

export default api;