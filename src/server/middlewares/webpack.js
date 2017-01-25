import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../../webpack.config';

const compiler = Webpack(webpackConfig);
export default WebpackDevMiddleware(compiler, {serverSideRender: true, noInfo: true})