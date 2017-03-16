const spritesmith = require('gulp.spritesmith');
const merge = require('merge-options');

const defaults = {
  src: '',
  dest: {
    css: '',
    image: '',
  },
  options: {} // https://github.com/twolfson/gulp.spritesmith#spritesmithparams
};

module.exports = (config) => {
  const opts = merge.call({ concatArrays: true }, defaults, config);

  return function spriteTask() {
    const spriteData = this.src(opts.src)
      .pipe(spritesmith(opts.options));

    spriteData.img.pipe(this.dest(config.dest.image));
    spriteData.css.pipe(this.dest(config.dest.css));

    return spriteData;
  };
};
