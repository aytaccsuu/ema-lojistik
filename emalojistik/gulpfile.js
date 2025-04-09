const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');

// Paths
const paths = {
  styles: {
    src: 'frontend/scss/**/*.scss',
    dest: 'frontend/css/'
  },
  scripts: {
    src: 'frontend/js/**/*.js',
    exclude: ['!frontend/js/vendor/**/*.js', '!frontend/js/app.min.js'],
    dest: 'frontend/js/'
  },
  html: {
    src: ['frontend/**/*.html']
  },
  images: {
    src: 'frontend/assets/images/**/*',
    dest: 'dist/images/'
  },
  build: {
    css: 'dist/css/',
    js: 'dist/js/',
    html: 'dist/'
  }
};

// Clean dist folder
function clean() {
  return del(['dist']);
}

// Process SCSS to CSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Process JavaScript with Babel
function scripts() {
  return gulp.src([paths.scripts.src, ...paths.scripts.exclude])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Copy HTML files to dist
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.build.html));
}

// Optimize and copy images to dist
function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

// Watch for changes
function watch() {
  browserSync.init({
    server: {
      baseDir: './frontend'
    }
  });
  
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.html.src).on('change', browserSync.reload);
}

// Build for production
const build = gulp.series(
  clean,
  gulp.parallel(styles, scripts),
  gulp.parallel(html, images)
);

// Default task: development
exports.default = gulp.series(
  gulp.parallel(styles, scripts),
  watch
);

exports.clean = clean;
exports.build = build;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.watch = watch;
