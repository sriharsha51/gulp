const gulp = require('gulp');
const jshint = require('gulp-jshint');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');

gulp.task('jshint', () => {
    gulp.src('js/rslides.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('copyHTML', () => {
    gulp.src('index.html')
        .pipe(gulp.dest('dist'));
})

gulp.task('minify', () => {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

// files changed since the last time it was run
gulp.task('changed', () => {
    return gulp.src('js/*.js')
        .pipe(changed('dist/change'))
        // `ngAnnotate` will only get the files that
        // changed since the last time it was run
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/change'));
})

gulp.task('minify-css', function () {
    return gulp.src('./css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
})

gulp.task('concat-js', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/combined'));
});

 
gulp.task('concat-css', function () {
  return gulp.src('css/*.css')
    .pipe(concatCss("dist/combined/bundle.css"))
    .pipe(gulp.dest('out/'));
});

//gulp.task('default', ['jshint']);