const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-dart-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');


function clean() {
    return del(['dist']);
}

function html() {
    return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function styles() {
    return src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream());
}

function scripts() {
    return src('src/*.js')
    .pipe(sourcemaps.init()) 
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function watcher() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch('src/styles/**/*.scss', styles);
    watch('src/*.js', scripts);
    watch('src/*.html', html);
}

exports.build = series (clean, parallel(html, styles, scripts), watcher);