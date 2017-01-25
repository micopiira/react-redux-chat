const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/client.jsx',
    output: { path: path.join(__dirname, 'static'), filename: 'bundle.js'},
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [new ExtractTextPlugin('bundle.css')],
    module: {
        loaders: [
            {
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
                // loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            }
        ]
    }
};