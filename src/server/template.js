import config from '../../config.json';
import packageJson from '../../package.json';

const getAssetsByExtension = (assets, extension, mapFn) =>
	[].concat(assets.app)
		.filter(path => path.endsWith(extension))
		.map(mapFn)
		.join('');

export default (html, preloadedState, assetsByChunkName) => {
	const styles = getAssetsByExtension(assetsByChunkName, '.css', path => `<link rel="stylesheet" href="${path}">`);
	const scripts = getAssetsByExtension(assetsByChunkName, '.js', path => `<script src="${path}"></script>`);
	return (
	`<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<meta name="description" content="${packageJson.description}">
				<meta name="author" content="${packageJson.author.name}">
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
				<title>${config.title}</title>
				${styles}
			</head>
			<body>
				<div id="root">${html}</div>
				<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};</script>
				${scripts}
			</body>
		</html>`
	);
};