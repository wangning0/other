/*
//第一串代码
var gulp = require('gulp');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task('async', function() {
	setTimeout(function() {
		console.log('我是一个异步任务');
	}, 2000);
})

gulp.task('default',function(){
	console.log('这是默认的任务');
})
*/

/*
//第二串代码
var gulp = require('gulp');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task('async', function() {
	setTimeout(function() {
		console.log('我是一个异步任务');
	}, 2000);
})

gulp.task('default', ['sync1', 'async'], function() {
	console.log('这是默认的任务')
});
*/
/*
// 第三串代码
var gulp = require('gulp');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task("sync2", function() {
	console.log('我是另一个同步任务');
})

gulp.task("sync3", function() {
	console.log('我是又一个同步任务');
})

gulp.task('async', function() {
	console.log('老大喊我去搬砖');
	setTimeout(function() {
		console.log('我是一个异步任务');
	}, 2000);
})

gulp.task('default', ['sync1', 'sync2', 'sync3', 'async'], function() {
	console.log('这是默认的任务')
});*/
/*
第四串代码
var gulp = require('gulp');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task('async', function(cb) {
	setTimeout(function() {
		console.log('我是一个异步任务');
		cb();
	}, 2000);
})

gulp.task('default', ['sync1', 'async'], function() {
	console.log('这是默认的任务')
});
*/
var gulp = require('gulp');
var Q = require('q');

gulp.task("sync1", function() {
	console.log('我是一个同步任务');
})

gulp.task('async', function() {
	var deferred = Q.defer();

	setTimeout(function() {
		console.log('我是一个异步任务');
		deferred.resolve();
	}, 2000);

	return deferred.promise;
})

gulp.task('default', ['sync1', 'async'], function() {
	console.log('这是默认的任务')
});