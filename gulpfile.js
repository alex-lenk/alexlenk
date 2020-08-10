const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const fileinclude = require('gulp-ex-file-include');
const terser = require('gulp-terser');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const mode = require('gulp-mode')();
const htmlbeautify = require('gulp-html-beautify');
const browserSync = require('browser-sync').create();

// clean tasks
/*
const clean = () => {
    return del(['public_html']);
}

const cleanImages = () => {
    return del(['public_html/img']);
}

const cleanFonts = () => {
    return del(['public_html/fonts']);
}
*/

// css task
const css = () => {
    return src('src/styles/styles.scss')
        .pipe(mode.development(sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('styles.css'))
        .pipe(mode.production(csso()))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(dest('public_html/css'))
        .pipe(mode.development(browserSync.stream()));
}

// js task
const js = () => {
    return src('src/js/scripts.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(webpack({
            mode: 'development',
            devtool: 'inline-source-map'
        }))
        .pipe(mode.development(sourcemaps.init({loadMaps: true})))
        .pipe(rename('scripts.js'))
        .pipe(mode.production(terser({output: {comments: false}})))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(dest('public_html/js'))
        .pipe(mode.development(browserSync.stream()));
}

// copy tasks
const copyImages = () => {
    return src('src/img/**/*.{jpg,jpeg,png,svg}')
        .pipe(dest('public_html/img'));
}

const copyFonts = () => {
    return src('src/fonts/**/*.{woff,woff2}')
        .pipe(dest('public_html/fonts'));
}

const html = () => {
    return src('src/view/*.html')
        .pipe(fileinclude())
        .pipe(mode.production(htmlbeautify()))
        .pipe(dest('public_html'))
        .pipe(mode.development(browserSync.stream()));
}

const copyFavicon = () => {
    return src('src/favicon/*.*')
        .pipe(dest('public_html/favicon'));
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

    watch('src/styles/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/view/*.html', html);
    watch('src/img/**/*.{png,jpg,jpeg,svg}', series(copyImages));
    watch('src/fonts/**/*.{woff,woff2}', series(copyFonts));
    watch('src/favicon/*.*', series(copyFavicon));
}

// public tasks
exports.default = series(parallel(css, js, copyImages, copyFonts, html, copyFavicon), watchForChanges);
exports.build = series(parallel(css, js, copyImages, copyFonts, html, copyFavicon));