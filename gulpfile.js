const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const fileinclude = require('gulp-ex-file-include');
const mode = require('gulp-mode')();
const htmlbeautify = require('gulp-html-beautify');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const basePath = require('path');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const uglify = require('gulp-uglify-es').default;
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminZopfli = require("imagemin-zopfli");
const imageminMozjpeg = require("imagemin-mozjpeg");
const webp = require("gulp-webp");
const imageminWebp = require("imagemin-webp");

// css task
const css = () => {
  return src('./app/styles/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('styles.css'))
    .pipe(csso())
    .pipe(dest('public_html/css'))
    .pipe(mode.development(browserSync.stream()));
}

// js task
const js = () => {
  return src('./app/js/scripts.js')
    .pipe(uglify())
    .pipe(dest('./public_html/js'))
    .pipe(mode.development(browserSync.stream()));
}

// copy tasks
const copyImages = () => {
  return src('./app/img/**/*.{jpg,jpeg,png,svg}')
    .pipe(imagemin([
      imageminPngquant({
        speed: 5,
        quality: [0.6, 0.8]
      }),
      imageminZopfli({
        more: true
      }),
      imageminMozjpeg({
        progressive: true,
        quality: 90
      }),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {removeUnusedNS: false},
          {removeUselessStrokeAndFill: false},
          {cleanupIDs: false},
          {removeComments: true},
          {removeEmptyAttrs: true},
          {removeEmptyText: true},
          {collapseGroups: true}
        ]
      })
    ]))
    .pipe(dest('./public_html/img'));
}


const webpTask = () => {
  return src('./app/img/**/*.{jpg,jpeg,png}')
    .pipe(webp(imageminWebp({
      lossless: true,
      quality: 6,
      alphaQuality: 85
    })))
    .pipe(dest('./public_html/img'));
}

const copyFonts = () => {
  return src('./app/fonts/**/*.{woff,woff2}')
    .pipe(dest('public_html/fonts'));
}

const copyFavicon = () => {
  return src('./app/favicon/*.*')
    .pipe(dest('public_html/favicon'));
}

const html = () => {
  return src(['./app/view/**/*.html', '!./app/view/partial/*.html'])
    .pipe(fileinclude())
    .pipe(mode.production(htmlbeautify()))
    .pipe(dest('public_html'))
    .pipe(mode.development(browserSync.stream()));
}

const svgStore = () => {
  return src('./app/img/sprite/*.svg')
    .pipe(svgmin(function (file) {
      let prefix = basePath.basename(file.relative, basePath.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(dest('./public_html/img'));
}

// watch task
const watchForChanges = () => {
  browserSync.init({
    server: {
      baseDir: './public_html/'
    },
    notify: false,
    port: 7384
  });

  watch('./app/styles/**/*.scss', css);
  watch('./app/js/**/*.js', js);
  watch('./app/view/*.html', html);
  watch('./app/img/**/*.{png,jpg,jpeg,svg}', series(copyImages));
  watch('./app/fonts/**/*.{woff,woff2}', series(copyFonts));
  watch('./app/favicon/*.*', series(copyFavicon));
}

// public tasks
exports.default = series(parallel(css, js, copyImages, copyFonts, html, copyFavicon), watchForChanges);
exports.build = series(parallel(css, js, copyImages, copyFonts, html, copyFavicon));
exports.sprite = series(svgStore);
exports.webpTask = series(webpTask);
