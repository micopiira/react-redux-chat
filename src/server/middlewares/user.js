import shortid from 'shortid';

export default (req, res, next) => {
    if (!req.session.user) {
        const randomColor = 'red'; // TODO Implement
        req.session.user = {
            id: shortid.generate(),
            color: randomColor
        };
    }
	next();
};