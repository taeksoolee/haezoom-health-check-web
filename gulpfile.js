'use strict';

const isProd = process.env.NODE_ENV === 'production';

const OUTPUT_DIR = 'dist';
const OUTPUT_FILE_NAME = 'components';


const pipeline = (...utils) => {
  return (base) => {
    utils.reduce((result, util) => {
      if(!util) return result;
      return result.pipe(util);
    }, base);
  }
}

const gulp = require('gulp');
// const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const javascriptObfuscator = require('gulp-javascript-obfuscator');

const sass = require('gulp-sass')(require('sass'));
const cleanCss = require("gulp-clean-css");

gulp.task('js', () => {
  return pipeline(
    sourcemaps.init(),
    concat(`${OUTPUT_FILE_NAME}.js`),
    uglify(),
    isProd ? javascriptObfuscator({
      compact: true,
      renameGlobals : true,
      unicodeEscapeSequence : true,
      splitStrings : true,
      selfDefending : true,
      controlFlowFlattening : true,
    }) : undefined,
    sourcemaps.write(),
    gulp.dest(`${OUTPUT_DIR}`)
  )(gulp.src([
    'src/main.js',
    'src/classes/**/*.js',
    'src/components/base/**/*.js',
    'src/components/state/**?*.js',
    'src/components/stateless/**?*.js',
  ]));
});

gulp.task('css', () => {
  return pipeline(
    sass().on('error', sass.logError),
    sourcemaps.init(),
    concat(`${OUTPUT_FILE_NAME}.css`),
    isProd ? cleanCss({ compatibiliy: 'ie8' }) : undefined,
    sourcemaps.write(),
    gulp.dest(`${OUTPUT_DIR}`)
  )(gulp.src([
    'src/style/**/*.scss',
  ]));
});

gulp.task('watch-js', () => {
  return gulp.watch(
    [
      './src/**/*.js',
    ],
    gulp.series(['js'])
  );
});

gulp.task('watch-css', () => {
  return gulp.watch(
    [
      './src/**/*.scss'
    ],
    gulp.series(['css'])
  );
});

gulp.task('default', gulp.parallel(['js', 'css', 'watch-js', 'watch-css']));