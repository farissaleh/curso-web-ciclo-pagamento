//Startar o servidor
const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

//Para monitoriar a atualização dos arquivos
gulp.task('watch', () => {
    watch('app/**/*.html', () => gulp.start('app.html'))
    watch('app/**/*.css', () => gulp.start('app.css'))
    watch('app/**/*.js', () => gulp.start('app.js'))
    watch('assets/**/*.*', () => gulp.start('app.assets'))

})

gulp.task('server', ['watch'] , () => {
    //Monitora a pasta public a cada atualização
    return gulp.src('public').pipe(webserver({
        livereload: true,
        port: 4000,
        open: true
    }))
})