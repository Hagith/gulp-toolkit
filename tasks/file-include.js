const include = require('gulp-file-include');
const mergeOptions = require('merge-options');

const defaults = {
  src: '',
  dest: '',
  options: { // https://github.com/coderhaoxin/gulp-file-include#options
    context: {},
  },
};

module.exports = (config) => {
  const opts = mergeOptions.call({ concatArrays: true }, defaults, config);

  return function sassTask() {
    return this.src(opts.src)
      .pipe(include(opts.options))
      .pipe(this.dest(opts.dest));
  };
};
