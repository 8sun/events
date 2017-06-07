var gulp = require('gulp');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var stylus = require('gulp-stylus');

gulp.task('build', function () {
    return browserify({entries: 'components/app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'stage-1'], plugins: ["syntax-async-functions", "transform-decorators-legacy"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(streamify(uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('build_home', function () {
    return browserify({entries: 'components/home/home.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', 'stage-1'], plugins: ["syntax-async-functions", "transform-decorators-legacy"]})
        .bundle()
        .pipe(source('bundle-home.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(streamify(uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('styles', function () {
  return gulp.src('assets/css/style.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch(['components/main/*.jsx', 'components/*.jsx', 'models/model.js', 'client/client.js', 'db/index.js'], ['build']);
});

gulp.task('home', ['build_home'], function () {
    gulp.watch(['components/home/*.jsx', 'models/model_home.js', 'client/client.js', 'db/index.js'], ['build_home']);
});

gulp.task('style', ['styles'], function () {
    gulp.watch(['assets/css/style.styl'], ['styles']);
});
