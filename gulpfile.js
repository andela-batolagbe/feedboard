var gulp = require('gulp');
var gutil = require('gulp-util')
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var nodemon = require('gulp-nodemon');
var del = require('del');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.paths = {
  app: 'app',
  builds: 'assets/dist',
  test: 'test'
};

gulp.task('clean', function() {
  del(['assets/dist/*.js', 'assets/dist/*.css']).then(function() {
    console.log("removed previous build");
  });
});

gulp.task('join', function() {
  return gulp.src(['app/components/*.js', 'app/app.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(gulp.paths.builds));
});

gulp.task('build', ['join'], function() {

  var bundler = browserify({
    entries: [gulp.paths.builds + '/app.js'],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  bundler.external('react');

  return watchify(bundler)
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(gulp.paths.builds));
});


gulp.task('nodemon', ['join', 'build'], function() {
  nodemon({
      script: 'server.js',
      ext: 'js',
      ignore: ['.package.json']
    })
    .on('restart', function() {
      console.log('server restarted');
    });
});

gulp.task('watch', function() {
  gulp.watch(gulp.paths.app+ '/**/*.js', ['clean', 'join', 'build', 'nodemon']);
});


gulp.task('default', ['clean', 'join', 'build', 'nodemon'], function() {
  gulp.start('watch');
});

module.exports = gulp;
