var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var traceur = require('gulp-traceur');
var sourcemaps = require('gulp-sourcemaps');

var Builder = require('systemjs-builder');
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');

var PATHS = {
    src: {
      js: 'src/**/*.js',
      html: 'src/**/*.html'
    },
    lib: [
      'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
      'node_modules/systemjs/lib/extension-register.js',
      'node_modules/angular2/node_modules/zone.js/zone.js',
      'node_modules/angular2/node_modules/zone.js/long-stack-trace-zone.js'
    ]
};

var port = 9000;

var buildConfig = {
  paths: {
    // "angular2/*": "node_modules/ng2dist/js/prod/es6/angular2/*.es6",
    "angular2/*": "node_modules/angular2/es6/prod/*.es6",
    "falcor": "node_modules/falcor/dist/Falcor.js",
    "falcor-browser": "node_modules/falcor-browser/src/XMLHttpSource.js",
    "angular2/router": "node_modules/angular2/es6/prod/router.es6",
    "rx/*": "node_modules/angular2/node_modules/rx/*.js",
    "rx": "node_modules/angular2/node_modules/rx/dist/rx.all.js",
    "falcor-observable": "node_modules/angular2/node_modules/rx/dist/rx.all.js"
  }
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('js', function () {
  return gulp.src(PATHS.src.js)
    .pipe(rename({extname: ''})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(traceur({
      modules: 'instantiate',
      moduleName: true,
      annotations: true,
      types: true,
      memberVariables: true
    }))
    .pipe(rename({extname: '.js'})) //hack, see: https://github.com/sindresorhus/gulp-traceur/issues/54
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  return gulp.src(PATHS.src.html)
    .pipe(gulp.dest('dist'));
});

gulp.task('falcor', function () {
  var builder = new Builder(buildConfig);
  return builder.build('falcor', 'dist/lib/falcor.js', {});
});

gulp.task('angular2', function () {
  var builder = new Builder(buildConfig);
  return builder.build('angular2/angular2', 'dist/lib/angular2.js', {});
});

gulp.task('router', function () {
  var builder = new Builder(buildConfig);
  return builder.build('angular2/router', 'dist/lib/router.js', {});
});


gulp.task('libs', ['angular2', 'router', 'falcor'], function () {
  var size = require('gulp-size');
  return gulp.src(PATHS.lib)
    .pipe(size({showFiles: true, gzip: true}))
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('serve', function() {

  var app = connect();
  app.use(serveStatic(__dirname + '/dist'));
  app.use(serveStatic(__dirname + '/public'));
  http.createServer(app).listen(port, function () {
    // open('http://localhost:' + port);
    console.log('\nServer started on port', port, '\n');
  });
});

gulp.task('watch', ['default'], function () {

  gulp.watch(PATHS.src.html, ['html']);
  gulp.watch(PATHS.src.js, ['js']);
  gulp.watch(PATHS.src.lib, ['libs']);

});

gulp.task('start', ['watch', 'serve']);

gulp.task('default', ['js', 'html', 'libs']);
