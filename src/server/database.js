import shortid from 'shortid';
import storage from 'node-persist';

storage.initSync();

const MESSAGES_KEY = 'messages';

if (!storage.getItemSync(MESSAGES_KEY)) {
	storage.setItemSync(MESSAGES_KEY, []);
}

const api = {
	getMessages: pageRequest => storage.getItem(MESSAGES_KEY).then(messages => ({
		totalElements: messages.length,
		content: messages.slice()
			.reverse()
			.slice(pageRequest.page * pageRequest.size, pageRequest.page * pageRequest.size + pageRequest.size)
			.reverse()
	})),
	addMessage: message => {
		const msg = {...message, id: shortid.generate(), timestamp: new Date()};
		return storage.getItem('messages')
			.then(messages => messages.concat(msg))
			.then(messages => storage.setItem('messages', messages))
			.then(() => msg);
	}
};

export default api;