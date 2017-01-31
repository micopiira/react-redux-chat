import shortid from 'shortid';

const random = arr => arr[Math.floor(Math.random() * arr.length)];
const colors = ['red', 'green', 'blue'];

export default (req, res, next) => {
	if (!req.session.user) {
		req.session.user = {
			id: shortid.generate(),
			color: random(colors)
		};
	}
	next();
};