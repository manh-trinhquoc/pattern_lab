// basic
var gulp = require('gulp');
var sass = require('gulp-sass');
let sourcemaps = require("gulp-sourcemaps");
// var autoprefixer = require('gulp-autoprefixer'); // auto prefix
var browserSync = require('browser-sync').create();
wait = require('gulp-wait');

// input and output
var input = 'scss/**';
var output = '../public/css';

//task
//compile
gulp.task('sass', function () {
    return gulp.src(input)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        //.pipe(autoprefixer())
        .pipe(sourcemaps.write("../maps/css"))
        .pipe(gulp.dest(output))
});
// create a task that reloading browsers
gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});
// create a task that delay
gulp.task('wait', function (done) {
    return gulp.src(input)
        .pipe(wait(1500))
});
// Watch Files For Changes
gulp.task('browser-sync', function () {
    browserSync.init({
        startPath: "/patterns/pages-comming-soon/pages-comming-soon.rendered.html",
        server: {
            baseDir: "../public/"
        },
        reloadDebounce: 500,
        reloadThrottle: 500
    });
    gulp.watch([input], gulp.series('sass', 'reload'));
    gulp.watch("**/*.twig").on('change', gulp.series('wait', 'reload'));
    gulp.watch("**/*.json").on('change', gulp.series('wait', 'reload'));
    gulp.watch("**/*.js").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', gulp.series('sass', 'browser-sync'))