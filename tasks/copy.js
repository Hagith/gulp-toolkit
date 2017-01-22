const Stream = require('merge-stream');
const merge = require('merge-options');

const defaults = {
  files: [],
};

module.exports = (config) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function copyTask() {
    const stream = new Stream();
    opts.files.forEach((el) => {
      stream.add(this.src(el.src).pipe(this.dest(el.dest)));
    });

    return stream;
  };
};
