import shortid from 'shortid';
import storage from 'node-persist';

const MESSAGES_KEY = 'messages';

storage.initSync();

// if (!storage.getItemSync(MESSAGES_KEY)) {
storage.setItemSync(MESSAGES_KEY, []);
// }

const arrayToPage = (array, pageRequest) => ({
	totalElements: array.length,
	content: array.slice()
		.reverse()
		.slice(pageRequest.page * pageRequest.size, pageRequest.page * pageRequest.size + pageRequest.size)
		.reverse()
});

const api = {
	getMessages: pageRequest => storage.get(MESSAGES_KEY).then(messages => arrayToPage(messages, pageRequest)),
	addMessage: message => {
		const msg = {...message, id: shortid.generate(), timestamp: new Date().toISOString()};
		return storage.getItem(MESSAGES_KEY)
			.then(messages => messages.concat(msg))
			.then(messages => storage.set(MESSAGES_KEY, messages))
			.then(() => msg);
	}
};

export default api;