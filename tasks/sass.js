const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const merge = require('merge-options');
const errorHandler = require('../lib/error-handler');

const defaults = {
  src: '',
  dest: '',
  sass: {},
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
    cascade: false,
  },
};

module.exports = (config) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function sassTask() {
    return this.src(opts.src)
      .pipe(sourcemaps.init())
      .pipe(plumber({ errorHandler }))
      .pipe(sass(opts.sass))
      .pipe(autoprefixer(opts.autoprefixer))
      .pipe(sourcemaps.write('.'))
      .pipe(this.dest(opts.dest));
  };
};
