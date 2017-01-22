/**
 * browserify task
 * ---------------
 * Bundle javascript things with browserify!
 *
 * This task is set up to generate multiple separate bundles, from
 * different sources, and to use Watchify when run from the watch task.
 *
 * Based on: https://github.com/greypants/gulp-starter
 */
const watchify = require('watchify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const size = require('gulp-size');
const merge = require('merge-options');

const bundleLogger = require('../lib/bundle-logger');
const handleErrors = require('../lib/error-handler');

const defaults = {
  bundles: [],
};

module.exports = (config, mode) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function browserifyTask(callback) {
    let bundleQueue = opts.bundles.length;

    // Start bundling with Browserify for each bundle
    opts.bundles.forEach((bundleConfig) => {
      // merge global options
      const options = merge({}, opts.options || {}, bundleConfig);

      const reportFinished = () => {
        bundleLogger.end(options.outputName);

        if (bundleQueue) {
          bundleQueue -= 1;
          if (bundleQueue === 0) {
            // If all bundles have been bundled, tell gulp the task is complete.
            // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
            callback();
          }
        }
      };

      if (mode === 'watch') {
        // Add watchify args and debug (sourcemaps) option
        merge(options, watchify.args, { debug: true });
      }

      let b = browserify(options);
      const bundle = () => {
        bundleLogger.start(options.outputName);

        return b.bundle()
          .on('error', (error) => {
            if (mode === 'watch') {
              return handleErrors.call(this, error);
            }
            throw error;
          })
          .pipe(source(options.outputName))
          .pipe(buffer())
          .pipe(gulpif(mode === 'watch', sourcemaps.init({ loadMaps: true })))
          .pipe(gulpif(mode === 'minify', uglify(config.minify)))
          .pipe(gulpif(mode === 'watch', sourcemaps.write('./')))
          .pipe(size({ title: 'scripts' }))
          .pipe(size({ title: 'scripts', gzip: true }))
          .pipe(this.dest(options.dest))
          .on('end', reportFinished);
      };

      if (mode === 'watch') {
        // Wrap with watchify and rebundle on changes
        b = watchify(b);
        b.on('update', bundle);
        bundleLogger.watch(options.outputName);
      }

      return bundle();
    });
  };
};
