var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		'./src/index'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /\.css/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'your app title',
			template: './app/index.html',
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}