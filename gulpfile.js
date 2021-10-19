const gulp = require('gulp')
const sass=require('gulp-sass')(require('sass'))

const scss=function (done) {
    gulp.src('./src/style/*.scss')

        .pipe(sass().on('error',sass.logError))

        .pipe(gulp.dest('./src/style/'))

    done()
}

exports.scss =scss

exports.listen = function () {
    gulp.watch(
        './src/style/*.scss',
        scss)
}