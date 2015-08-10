var gulp = require("gulp");
var uglify = require('gulp-uglify');
var sourcemaps = require("gulp-sourcemaps");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var release = require('gulp-github-release');

gulp.task("buildBrowser", function () {

    var b = browserify({
        entries: 'lib/index_browser.js',
        debug: true
    });

    b.bundle()
        .pipe(source('metaco.api.client.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));

    b.bundle()
        .pipe(source('metaco.api.client.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task("github-releases", function () {
    gulp.src('./dist/*')
        .pipe(release({
            repo: "metaco-javascript-client",
            owner: "MetacoSA",
            manifest: require('./package.json')
        }));
});

gulp.task("publish", ["buildBrowser", "github-releases"]);