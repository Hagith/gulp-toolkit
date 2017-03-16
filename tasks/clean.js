const del = require('del');
const merge = require('merge-options');

const defaults = {
  paths: [],
};

module.exports = (config) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function cleanTask(cb) {
    return del(opts.paths, cb);
  };
};
