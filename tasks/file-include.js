const include = require('gulp-file-include');
const merge = require('merge-options');

const defaults = {
  src: '',
  dest: '',
  options: { // https://github.com/coderhaoxin/gulp-file-include#options
    context: {},
  },
};

module.exports = (config) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function fileIncludeTask() {
    return this.src(opts.src)
      .pipe(include(opts.options))
      .pipe(this.dest(opts.dest));
  };
};
