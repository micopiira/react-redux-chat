import shortid from 'shortid';
import fs from 'fs';
import data from '../data.json';

let db = {...data};

/**
 * @typedef {Object} Message
 * @property {String} text
 */

/**
 * @typedef {Object} Page.<T>
 * @property {Array.<T>} content
 * @property {Number} totalElements
 */

/**
 * @typedef {Object} PageRequest
 * @property {Number} page - zero-based page index.
 * @property {Number} size - the size of the page to be returned.
 */

const api = {
	/**
	 *
	 * @param {PageRequest} pageRequest
	 * @return {Promise.<Page.<Message>>}
	 */
	getMessages: pageRequest => Promise.resolve({
		totalElements: db.messages.length,
		content: db.messages.slice().reverse().slice(pageRequest.page * pageRequest.size, pageRequest.page * pageRequest.size + pageRequest.size).reverse()
	}),
	addMessage: message => {
		const msg = {...message, id: shortid.generate(), timestamp: new Date()};
		db = {...db, messages: db.messages.concat(msg)};
		fs.writeFile('../data.json', JSON.stringify(db), 'utf8', () => {
		});
		return msg;
	}
};

export default api;