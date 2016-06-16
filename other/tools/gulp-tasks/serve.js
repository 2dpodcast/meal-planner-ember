var gulp = require('gulp'),
        browserSync = require('browser-sync');

var devServer = browserSync.create("dev-server");

// assuming task is sequenced externally (no dependent tasks here).
gulp.task('serve', [], function () {

    devServer.init({
        port: 3000,
        server: {
            baseDir: '../../app'
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
                'font-size': '22px'
            }
        },
        open: false
    });
});