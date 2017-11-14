var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    $               = require('gulp-load-plugins')(),
    del             = require('del'),
    runSequence     = require('run-sequence');


// optimize images
gulp.task('images', function() {
  return gulp.src('./images/**/*')
    .pipe($.changed('./_build/images'))
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./_build/images'));
});

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// minify JS
gulp.task('minify-js', function() {
  gulp.src('js/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./_build/'));
});

// minify CSS
gulp.task('minify-css', function() {
  gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss({keepBreaks:true}))
    .pipe(gulp.dest('./styles/'))
    .pipe(gulp.dest('./_build/css/'));
});

// minify HTML
gulp.task('minify-html', function() {
  var opts = {
    comments: true,
    spare: true,
    conditionals: true
  };

  gulp.src('./*.html')
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest('./_build/'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
  gulp.src('./fonts/**/*.{ttf,woff,eof,eot,svg}')
    .pipe($.changed('./_build/fonts'))
    .pipe(gulp.dest('./_build/fonts'));
});

// start webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './'
    }
  }, done);
});

// start webserver from _build folder to check how it will look in production
gulp.task('server-build', function(done) {
  return browserSync({
    server: {
      baseDir: './_build/'
    }
  }, done);
});

// delete build folder
gulp.task('clean:build', function (cb) {
  del([
    './_build/'
    // if we don't want to clean any file we can use negate pattern
    //'!dist/mobile/deploy.json'
  ], cb);
});

// concat files
gulp.task('concat', function() {
  gulp.src('./js/*.js')
    .pipe($.concat('scripts.js'))
    .pipe(gulp.dest('./_build/'));
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

// calculate build folder size
gulp.task('build:size', function() {
  var s = $.size();

  return gulp.src('./_build/**/*.*')
    .pipe(s)
    .pipe($.notify({
      onLast: true,
      message: function() {
        return 'Total build size ' + s.prettySize;
      }
    }));
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('styles/*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });
  gulp.watch(['*.html', 'components/**/*.html', 'views/**/*.html'], ['bs-reload']);
  gulp.watch(['app/*.js', 'components/**/*.js', 'js/*.js'], ['bs-reload']);
  gulp.watch('styles/**/*.css', ['bs-reload']);
});


/**
 * build task:
 */
gulp.task('build', function(callback) {
  runSequence(
    'clean:build',    
    'images',    
    'fonts',
    'build:size',
    callback);
});
