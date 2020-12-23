const gulp        = require("gulp"),
      browserSync = require('browser-sync').create(),
      sass        = require('gulp-sass'),
      sourcemaps  = require('gulp-sourcemaps'),
      runSequence = require('gulp4-run-sequence'),
      uglify      = require('gulp-uglify'),
      imagemin    = require('gulp-imagemin'),
      clean       = require('gulp-clean');



let 
storename = 'wecode',


environment = 'dev',
sassStyle = {},
imageCompress = {},
setEnv = (env) => {
    environment = env
    
    if( env == 'prod' ) {
        sassStyle = {'sourcemap=none': true, noCache: true, outputStyle: 'compressed'}
        imageCompress = {optimizationLevel: 5, progressive: true}
    }
};

gulp.task('clean', () => {
    return gulp.src(bases.build + '/../')
        .pipe(clean())
})

gulp.task('copy', () => {
   return gulp.src(paths.copy)
          .pipe(gulp.dest(bases.build))
})


gulp.task('sass', () => {
    let scss = gulp.src(paths.sass)
        .pipe(sass(sassStyle).on('error', sass.logError))
    
    if(environment == 'dev')
        scss.pipe(sourcemaps.write())    

        scss.pipe(gulp.dest(bases.build))
        scss.pipe(browserSync.stream())

    return scss
})

gulp.task('sass:checkout', () => {
    let scss = gulp.src(paths.sassCheckout)
    
    if(environment == 'dev')
        scss = scss.pipe(sourcemaps.init())

    scss = scss.pipe(sass(sassStyle).on('error', sass.logError))
    
    if(environment == 'dev')
        scss = scss.pipe(sourcemaps.write())

        scss.pipe(gulp.dest(bases.build + '/../files'))
        scss = scss.pipe(browserSync.stream())

    return scss
})

gulp.task('js', () => {
    let script = gulp.src(paths.js)

    if(environment == 'prod')
        script.pipe(uglify())

    script.pipe(gulp.dest(bases.build))

        return script
})

gulp.task('js:checkout', () => {
    let script = gulp.src(paths.jsCheckout)

    if(environment == 'prod')
        script.pipe(uglify())

    script.pipe(gulp.dest(bases.build + '/../files'))

        return script
})

gulp.task('images', () => {
    return gulp.src(paths.images)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build))
})

gulp.task('images:checkout', () => {
    return gulp.src(paths.imagesCheckout)
        .pipe(imagemin(imageCompress))
        .pipe(gulp.dest(bases.build + '/../files'))
})


gulp.task('browserSync', () => {
    browserSync.init({
        open: false,
        https: true,
        host: storename + '.vtexlocal.com.br',
        startPath: '/admin/login/',
        proxy: 'https://' + storename + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: ['/files', '/arquivos'],
            dir: [bases.build, bases.build]
        }]
    })
})

gulp.task('watch', () => {
    gulp.watch([paths.sass, paths.sassCheckout, paths.js, paths.jsCheckout], gulp.series('sass' , 'sass:checkout' , 'js', 'js:checkout' ))   
})

gulp.task('browserReload', (cb) => {
    browserSync.reload()
    cb()
})

gulp.task('filesChange', (end) => {
   return runSequence(
        'sass',
        'sass:checkout',
        'js',
        'js:checkout',
        'images',
        'images:checkout',
        end
    )
})

gulp.task('dev', 
gulp.series('filesChange', gulp.parallel('browserSync', 'watch'),
    function () {
        setEnv('dev')
    }))
 
gulp.task('prd', 
gulp.series('filesChange', gulp.parallel('browserSync', 'watch'),
    function () {
       setEnv('prd')
    }))