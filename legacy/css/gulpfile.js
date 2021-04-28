/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path');
// Include gulp
const gulp = require('gulp');


// Include Plugins
const scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-minify-css'),
  iconfont = require('gulp-iconfont'),
  consolidate = require('gulp-consolidate'),
  copyAssets = require('gulp-css-copy-assets').default,

  // eslint-disable-next-line no-unused-vars
  _ = require('lodash');

scss.compiler = require('node-sass');

// ES6-promise is required by autoprefixer
require('es6-promise').polyfill();

const copySettings = {
  srcdirs: [__dirname + '/assets/font'],
  resolve: '../clientlibs/clientlib/resources/css'
}

/**
 * Will look for .scss|sass files inside the node_modules folder
 */
let aliases = {};

function npmModule(url, file, done) {
  // check if the path was already found and cached
  console.log('import', url);
  if (aliases[url]) {
    return done({file: aliases[url]});
  }

  // look for modules installed through npm
  try {
    const newPath = path.relative('./css', require.resolve(url));
    aliases[url] = newPath; // cache this request
    return done({file: newPath});
  } catch (e) {
    // if your module could not be found, just return the original url
    aliases[url] = url;
    return done({file: url});
  }
}

const scssSettings = {
  importer: npmModule
}

//  Gulp functions
//  ---------------------------------------------------------------------------------------
console.log(copyAssets)
// Build SASS
gulp.task('compass-minify', function () {
  gulp.src('assets/sass/common.scss')
    .pipe(scss(scssSettings))
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(copyAssets(copySettings))
    .pipe(gulp.dest('dist/css/minified'))
});

// Build SASS
gulp.task('compass-unminified', function () {
  gulp.src('assets/sass/common.scss')
    .pipe(scss(scssSettings))
    .pipe(copyAssets(copySettings))
    .pipe(gulp.dest('dist/css'))
});

// Build icons
const fontName = "equinor_icons";

gulp.task('Iconfont', function () {
  gulp.src(['assets/icons/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      appendUnicode: true,
      formats: ['ttf', 'eot', 'woff'],
      normalize: true
    }))
    .on('glyphs', function (glyphs, options) {
      console.log(glyphs, options);
      gulp.src('assets/sass/icons/equinor-icons.css')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: fontName,
          className: 'si'
        }))
    })
    .pipe(gulp.dest('assets/font/equinor-icons'))
});


//  Gulp Tasks
//  ---------------------------------------------------------------------------------------

// Default Task
gulp.task('default', ['compass-minify', 'Iconfont']);

// Watch Task
gulp.task('watch', function () {
  gulp.watch(['assets/sass/*.scss', 'assets/sass/**/*.scss'], ['compass-minify']);
});

// Autoprefixer
gulp.task('autoprefixer');

// CSS Lint Task
gulp.task('css-lint');