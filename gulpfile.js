const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagecomp = require('compress-images');
const clean = require('gulp-clean');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
    online: true,
  });
}

function scripts() {
  return src([
    'node_modules/swiper/swiper-bundle.min.js',
    'node_modules/@splidejs/splide/dist/js/splide.min.js',
    'node_modules/@splidejs/splide-extension-auto-scroll/dist/js/splide-extension-auto-scroll.min.js',
    'libs/gsap/gsap.min.js',
    'libs/gsap/ScrollTrigger.min.js',
    'libs/gsap/ScrollSmoother.min.js',
    'app/js/app.js',
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'));
}

function styles() {
  return src([
    'app/sass/style.sass',
    'node_modules/swiper/swiper-bundle.min.css',
    'node_modules/@splidejs/splide/dist/css/splide-core.min.css',
  ])
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(dest('app/css/'));
}

async function images() {
  imagecomp(
    'app/img/src/**/*',
    'app/img/dest/',
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '75'] } },
    { png: { engine: 'pngquant', command: ['--quality=75-100', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
    function (err, completed) {
      if (completed === true) {
        browserSync.reload();
      }
    },
  );
}

function cleanimg() {
  return src('app/img/dest/', { allowEmpty: true }).pipe(clean());
}

function startwatch() {
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  watch('app/**/sass/**/*', styles);
  watch('app/img/src/**/*', images);
}

function buildcopy() {
  return src(
    ['app/css/**/*.min.css', 'app/js/**/*.min.js', 'app/img/dest/**/*', 'app/index.html'],
    { base: 'app' },
  ).pipe(dest('dist'));
}

function cleandist() {
  return src('dist/', { allowEmpty: true }).pipe(clean());
}

exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;

exports.build = series(cleandist, styles, scripts, images, buildcopy);

exports.default = parallel(images, styles, scripts, startwatch);
