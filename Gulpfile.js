var gulp = require("gulp");
var uglify = require('gulp-uglify');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var browserify = require('browserify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task("default", function () {
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            modules: "umd"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("lib"));
});

var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
});

gulp.task("browserify", function () {
    return browserify({
            entries: [__dirname + "/lib/index.js"],
            debug: true
        })
        .bundle()
        .pipe(source('metaco-api-client.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify({
             debug: true,
             options: {
                sourceMap: true
             }
         }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('./dist/'));
});
