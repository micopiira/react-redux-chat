import config from '../../config.json';

export default (html, preloadedState, assetsByChunkName) => {
	const styles = assetsByChunkName.app.filter(path => path.endsWith('.css')).map(path => `<link rel="stylesheet" href="${path}">`).join('');
	const scripts = assetsByChunkName.app.filter(path => path.endsWith('.js')).map(path => `<script src="${path}"></script>`).join('');
	return `
		<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
				<title>${config.title}</title>
				${styles}
			</head>
			<body>
				<div id="root">${html}</div>
				<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};</script>
				${scripts}
			</body>
		</html>`.replace(/\n\s+/g, '');
};