const notify = require('gulp-notify');

module.exports = function errorHandler(...args) {
  notify.onError('Error in plugin <%= error.plugin %>\n <%= error.stack %>')(...args);
  // Keep gulp from hanging on this task
  this.emit('end');
};
