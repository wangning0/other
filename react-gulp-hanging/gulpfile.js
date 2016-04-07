var gulp = require('gulp');
var connect = require('gulp-connect');
var path = require('path');
var shell = require('gulp-shell');
var watch = require('gulp-watch');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');
var webpackConfig = {
	watch: false,
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
		new HtmlWebpackPlugin({
			title: 'your app title',
			template: './app/index.html',
		})
	]
}
gulp.task('pro_build', function() {
	return gulp.src('./app/index.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./build/'))
});

gulp.task('clean', function() {
	gulp.src('./build', {
			read: false
		})
		.pipe(rimraf());

	return gulp.src('./server', {
			read: false
		})
		.pipe(rimraf());
});
gulp.task('dev_build', function() {
	return gulp.src('./app/index.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./server/build/'))
})
gulp.task('connect', function() {
	connect.server({
		root: 'server/build',
		livereload: true
	});
});
gulp.task('reload', function() {
	gulp.src('./server/build/**/*')
		.pipe(connect.reload());
})
gulp.task('watch', function() {
	watch(['./app/**/*'], function() {
		runSequence('clean', 'dev_build', 'reload')
	})
})
gulp.task('pro', function() {
	runSequence('clean', 'pro_build');
})
gulp.task('dev', function() {
	runSequence('clean', 'dev_build', 'connect', 'watch');
});