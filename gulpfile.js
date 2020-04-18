var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
//var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('app/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
    return gulp.src('app/js/main.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});

//gulp.task('browserSync', function(){
    //browserSync.init({
        //proxy: 'dev.puppet.com'
    //});
//});

gulp.task('watch', function(){
    gulp.watch('app/scss/*.scss', gulp.series(['sass']) );
    gulp.watch('app/js/*.js', gulp.series(['js']));
});
