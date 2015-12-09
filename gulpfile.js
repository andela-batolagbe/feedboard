var gulp = require('gulp');
var gutil = require('gulp-util')
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var nodemon = require('gulp-nodemon');
var del = require('del');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'react',
  'react-dom',
  'react-router'
];

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

gulp.task('build-dependencies', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('libs.bundle.js'))
    .pipe(gulpif(production, uglify({
      mangle: false
    })))
    .pipe(gulp.dest(gulp.paths.builds));
});

gulp.task('build', ['build-dependencies'], function() {
  var bundler = watchify(browserify('app/app.js', watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, {
    presets: ['es2015', 'react']
  })
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('finished rebuilding files'));
      })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(gulpif(production, uglify({
        mangle: false
      }).pipe(rename({
        extname: '.min.js'
      }))))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(gulp.paths.builds));
  }
});

gulp.task('nodemon', ['build-dependencies', 'build'], function() {
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
  gulp.watch(gulp.paths.app + '/**/*.js', ['clean', 'build-dependencies', 'build', 'nodemon']);
});


gulp.task('default', ['clean', 'build-dependencies', 'build', 'nodemon'], function() {
  gulp.start('watch');
});

module.exports = gulp;
