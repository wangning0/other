var path = require('path');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rimraf = require('gulp-rimraf');
var imagemin = require('gulp-imagemin');

gulp.task('remove', function() {
	gulp.src('./server/public/*')
		.pipe(rimraf());
	gulp.src('./server/views/*')
		.pipe(rimraf())
})

gulp.task('toHTML', function() {
	gulp.src('./client/html/**/*')
		.pipe(gulp.dest('./server/views/'))
})

gulp.task('toCss', function() {
	gulp.src('./client/css/**/*')
		.pipe(uglify())
		.pipe(gulp.dest('./server/public/css'))
})

gulp.task('toJs', function() {
	gulp.src('./client/js/**/*')
		.pipe(uglify())
		.pipe(gulp.dest('./server/public/js'))
})

gulp.task('toImg', function() {
	gulp.src('./client/images/*')
		.pipe(imagemin({
			optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
			progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
			interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
			multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe(gulp.dest('./server/public/images'));
});
gulp.task('build', ['toHTML', 'toCss', 'toJs', 'toImg'], function() {
	gulp.src('./client', {
			read: false
		})
		.pipe(rimraf())
});

gulp.task('default', ['remove', 'build']);