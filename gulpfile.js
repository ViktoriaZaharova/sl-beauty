var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    tinypng = require('gulp-tinypng-compress'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    htmlImport = require('gulp-html-import');
    sourcemaps = require('gulp-sourcemaps');

gulp.task('import', function () {
    return gulp.src('app/components/pages/**/*.html')
        .pipe(rename({dirname: ''}))
        .pipe(htmlImport('app/components/'))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.stream());
});
gulp.task('sass',function(){
  return gulp.src('app/sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});
gulp.task('jquery', function(){
  return gulp.src(['app/libs/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('app/js'))
});
gulp.task('libs-css', ['sass'], function(){
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});
gulp.task('libs-js', function(){
  return gulp.src([
      'app/libs/slick-carousel/slick/slick.min.js',
      'app/libs/fancybox/jquery.fancybox.js',
      'app/libs/rating/jquery.star-rating-svg.min.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('tiny', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg)')
    .pipe(cache(tinypng({
      key: 'p9hZWdpVCqFgzxVSTKkTt7K2xwvC0ll6',
      sigFile: 'images/.tinypng-sigs',
      sameDest: true,
      log: true
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('img', ['tiny'], function(){
  return gulp.src('app/img/**/*.+(svg|ico)')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'libs-css', 'jquery', 'libs-js'], function() {
    gulp.watch(['app/sass/**/*.sass', 'app/components/pages/**/*.sass'], ['sass']);
    // gulp.watch('app/*.html', browserSync.reload);
    gulp.watch(['app/components/*.html', 'app/components/pages/**/*.html'], ['import'], browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
gulp.task('clean', function() {
    return del.sync('dist');
});
gulp.task('build', ['clean', 'sass', 'jquery', 'img'], function(){
  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/libs.min.css'
  ])
  .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
