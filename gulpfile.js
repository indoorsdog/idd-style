var gulp = require('gulp');
var del = require('del');
var gulpSass = require('gulp-sass');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpRename = require('gulp-rename');
var gulpSourceMaps = require('gulp-sourcemaps');

var sep = require('path').sep;

var src = [__dirname, 'src'].join(sep);
var srcPartials = [src, 'partials'].join(sep);
var srcScss = [src, 'scss'].join(sep);

var dist = [__dirname, 'dist'].join(sep);

gulp.task('del', function () {
    'use strict';
    del.sync([srcPartials, '*'].join(sep));
    del.sync([dist, '*'].join(sep));
});

gulp.task('partials', function () {
    'use strict';
    return gulp.src([srcScss, '*'].join(sep), { base: process.cwd() })
        .pipe(gulpRename({
            dirname: ['partials'].join(sep),
            prefix: '_'
        }))
        .pipe(gulp.dest(src));
});

gulp.task('sass', ['partials'], function () {
    'use strict';
    gulp.src([srcScss + '/*.scss', '!' + srcScss + '/idd-responsive*'])
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpAutoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(dist + '/css'));
    gulp.src([srcScss + '/*.scss', '!' + srcScss + '/idd-responsive*'])
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

gulp.task('default', ['del', 'partials', 'sass']);
