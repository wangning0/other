var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: [path.join(__dirname, '/app/index.js')],
	output: {
		path: path.join(__dirname, '/build'),
		filename: "[name].[hash:8].js",
		publicPath: '/'
	},
	resolve: {
		extension: ['', '.jsx', '.js', '.json'],
		alias: {}
	},
	'display-error-details': true,
	module: {
		noParse: [],
		loaders: [{
			test: /\.js|jsx$/,
			loaders: ['jsx?harmony', 'react-hot'],
			exclude: path.join(__dirname, 'node_modules')
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}, {
			test: /\.less/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
		}]
	},
	plugins: [
		new ExtractTextPlugin("main.[hash:8].css", {
			allChunks: true,
			disable: false
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash:8].js'),
		new HtmlWebpackPlugin({
			title: 'your app title',
			template: './app/index.html',
		})
	]
}