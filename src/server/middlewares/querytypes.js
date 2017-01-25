export default (req, res, next) => {
	Object.keys(req.query).map(key => {
		req.query[key] = JSON.parse(req.query[key]);
	});
	next();
};