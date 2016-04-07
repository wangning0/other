var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
	entry: {
		index: [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080',
			path.join(__dirname, '/app/index.js')
		],
		vendor: ['react', 'react-dom']
	},
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin("main.[hash:8].css", {
			allChunks: true,
			disable: false
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash:8].js'),
		new HtmlWebpackPlugin({
			title: 'your app title',
			template: './app/index.html',
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080'
		})
	]
}