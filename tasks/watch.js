const livereload = require('gulp-livereload');
const merge = require('merge-options');

const defaults = {
  tasks: [],
  reload: [],
};

module.exports = (config) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function watchTask() {
    livereload.listen();

    opts.tasks.forEach((entry) => {
      this.watch(entry.path, entry.run);
    });

    opts.reload.forEach((path) => {
      this.watch(path, livereload.changed);
    });
  };
};
