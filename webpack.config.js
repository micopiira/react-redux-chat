const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: ['webpack-hot-middleware/client', './src/client/index.jsx']
	},
	output: {
		path: path.join(__dirname, 'static'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new ExtractTextPlugin('bundle.css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			},
		})
	],
	module: {
		loaders: [
			{
				test: /\.json/,
				loader: 'json-loader'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style', 'css!sass')
			},
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel-loader?presets[]=es2015,presets[]=stage-2,presets[]=react'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			}
		]
	}
};