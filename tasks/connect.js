const connect = require('gulp-connect');
const merge = require('merge-options');

const defaults = { // https://github.com/avevlad/gulp-connect#api
  root: '.',
  host: '*',
  port: 9000,
};

module.exports = (config) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function connectTask() {
    connect.server(opts);
  };
};
