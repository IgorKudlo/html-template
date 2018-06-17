var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith  = require('gulp.spritesmith');
var ttf2woff     = require('gulp-ttf2woff');
var ttf2woff2    = require('gulp-ttf2woff2');
var browserSync  = require('browser-sync');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});


gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});


// sprite png
gulp.task('sprite', function () {
    var spriteData = gulp.src('app/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'css',
        imgPath: '../images/sprite.png',
        padding: 15
    }));
    spriteData.img.pipe(gulp.dest('app/images'));
    spriteData.css.pipe(gulp.dest('app/sass/sprite'));
});


// ttf2woff.
gulp.task('ttf2woff', function () {
    gulp.src(['app/fonts/*.ttf'])
        .pipe(ttf2woff())
        .pipe(gulp.dest('app/fonts'));
});

// ttf2woff2.
gulp.task('ttf2woff2', function () {
    gulp.src(['app/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(gulp.dest('app/fonts'));
});


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/images/icons/', ['sprite']);
    gulp.watch('app/fonts/', ['ttf2woff']);
    gulp.watch('app/fonts/', ['ttf2woff2']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});


gulp.task('default', ['watch']);
