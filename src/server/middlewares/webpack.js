import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../../webpack.config';

const compiler = Webpack(webpackConfig);

export default [
	WebpackDevMiddleware(compiler, {serverSideRender: true, noInfo: true}),
	WebpackHotMiddleware(compiler, {log: false})
];