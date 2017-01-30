import shortid from 'shortid';
import fs from 'fs';
import data from '../data.json';
import path from 'path';

let db = {...data};

const save = cb => {
	fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(db), 'utf8', cb);
};

const api = {
	getMessages: pageRequest => Promise.resolve({
		totalElements: db.messages.length,
		content: db.messages.slice()
			.reverse()
			.slice(pageRequest.page * pageRequest.size, pageRequest.page * pageRequest.size + pageRequest.size)
			.reverse()
	}),
	addMessage: message => {
		const msg = {...message, id: shortid.generate(), timestamp: new Date()};
		db = {...db, messages: (db.messages || []).concat(msg)};
		save(() => {});
		return msg;
	}
};

export default api;