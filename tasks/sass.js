const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const cleanCss = require('gulp-clean-css');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const merge = require('merge-options');
const errorHandler = require('../lib/error-handler');

const defaults = {
  src: '',
  dest: '',
  sass: {},
  minify: {},
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
    cascade: false,
  },
};

module.exports = (config, minify = false) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function sassTask() {
    return this.src(opts.src)
      .pipe(gulpif(!minify, sourcemaps.init()))
      .pipe(plumber({ errorHandler }))
      .pipe(sass(opts.sass))
      .pipe(autoprefixer(opts.autoprefixer))
      .pipe(gulpif(minify, cleanCss(opts.minify)))
      .pipe(gulpif(!minify, sourcemaps.write('.')))
      .pipe(this.dest(opts.dest))
      .pipe(size({ title: 'styles' }))
      .pipe(size({ title: 'styles', gzip: true }));
  };
};
