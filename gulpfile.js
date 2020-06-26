let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify-es').default,
    fileinclude = require('gulp-ex-file-include'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    notify = require('gulp-notify'),
    basePath = require('path'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    imagemin = require('gulp-imagemin');


const paths = {
    html: {
        src: './src/view/*.html',
        build: './public_html',
        watch: './src/view/**/*.html'
    },
    styles: {
        src: './src/styles/*.scss',
        build: './public_html/css',
        watch: './src/styles/**/*.scss'
    },
    js: {
        src: './src/js/scripts.js',
        build: './public_html/js',
        watch: './src/js/**/*.js'
    },
    img: {
        src: './src/img/**/*.*',
        build: './public_html/img',
        watch: './src/img/**/*.*'
    },
    favicon: {
        src: './src/favicon/**/*.*',
        build: './public_html/favicon',
        watch: './src/favicon/**/*.*'
    },
    fonts: {
        src: './src/fonts/*.*',
        build: './public_html/fonts',
        watch: './src/fonts/*.*'
    }
};

gulp.task('svgIcons', function () {
    return gulp
        .src('./src/img/sprite/*.svg')
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
        .pipe(gulp.dest('./public_html/img/'));
});


// Local Server
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './public_html'
        },
        notify: false,
        port: 7384
    })
});


// SCSS Styles
gulp.task('styles', function () {
    return gulp.src(paths.styles.src)
        .pipe(sass({outputStyle: 'compressed'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest(paths.styles.build))
        .pipe(browserSync.stream())
});


// JS
gulp.task('scripts', function () {
    return gulp.src(paths.js.src)
        .pipe(rigger())
        .pipe(gulp.dest(paths.js.build))
        .pipe(uglify())
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest(paths.js.build))
        .pipe(browserSync.reload({stream: true}))
});


// HTML Live Reload
gulp.task('code', function () {
    return gulp.src(paths.html.src)
        .pipe(fileinclude())
        .pipe(gulp.dest(paths.html.build))
        .pipe(browserSync.reload({stream: true}))
});


// img task
gulp.task('img', function () {
    return gulp.src(paths.img.src)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 6}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(paths.img.build))
        .pipe(browserSync.reload({stream: true}))
});


// favicon task
gulp.task('favicon', function () {
    return gulp.src(paths.favicon.src)
        .pipe(gulp.dest(paths.favicon.build))
        .pipe(browserSync.reload({stream: true}))
});


// fonts task
gulp.task('fonts', function () {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.build))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('img', gulp.parallel('img'));

gulp.task('favicon', gulp.parallel('favicon'));

gulp.task('fonts', gulp.parallel('fonts'));

gulp.task('watch', function () {
    gulp.watch(paths.styles.watch, gulp.parallel('styles'));
    gulp.watch(paths.js.watch, gulp.parallel('scripts'));
    gulp.watch(paths.html.watch, gulp.parallel('code'));
    gulp.watch(paths.img.watch, gulp.parallel('img'));
    gulp.watch(paths.favicon.watch, gulp.parallel('favicon'));
    gulp.watch(paths.fonts.watch, gulp.parallel('fonts'));
});

gulp.task('default', gulp.parallel('favicon', 'fonts', 'styles', 'scripts', 'code', 'browser-sync', 'watch'));
