var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    browserSync = require('browser-sync').create(),
    inlinesource = require('gulp-inline-source'),

    srv= "email-gulp.base";

function myStyles(){
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
}
function myInky(){
    return gulp.src('./templates/**/*.html')
        .pipe(inlinesource())
        .pipe(inky())
        .pipe(inlineCss({
            preserveMediaQueries: true,
            removeLinkTags: false
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}
function watch(){
    browserSync.init({
        proxy: srv
    });
    gulp.watch('./scss/**/*.scss', gulp.series(myStyles,myInky));
    gulp.watch('./templates/**/*.html', myInky);
}

//STYLES
gulp.task('styles', myStyles);

//CONVERTE INKY
gulp.task('inky', gulp.series(myStyles, myInky));

//WATCH
gulp.task('default', watch);
