var gulp = require('gulp');
var del = require('del');
var gulpSass = require('gulp-sass');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpRename = require('gulp-rename');
var gulpSourceMaps = require('gulp-sourcemaps');

var src = './src';
var dist = './dist';

gulp.task('del', function () {
    'use strict';
    del.sync(dist + '/**');
});

gulp.task('sass', function () {
    'use strict';
    gulp.src([src + '/*.scss', '!' + src + '/idd-responsive*'])
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpAutoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(dist + '/css'));
    gulp.src([src + '/*.scss', '!' + src + '/idd-responsive*'])
        .pipe(gulpSourceMaps.init())
        .pipe(gulpSass({outputStyle: 'compressed'}).on('error', gulpSass.logError))
        .pipe(gulpAutoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulpRename(function (path) {
            path.extname = '.min.css';
        }))
        .pipe(gulpSourceMaps.write('.'))
        .pipe(gulp.dest(dist + '/css'));
});

gulp.task('default', ['del', 'sass']);
