// watch.js w /gulp/tasks
var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(); //importujemy tylko metodę create

gulp.task('watch', function() {

  browserSync.init({
    // wskazujemy gdzie znajduje się nasza strona
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

  watch('./app/assets/scripts/**/*.js', function(){
    gulp.start('scriptsRefresh');
  });

});

// automatyczne "wstawianie" stylów do strony, bez jej przeładowywania
gulp.task('cssInject',['styles'], function(){
  return gulp.src('./app/temp/styles/styles.css')
          .pipe(browserSync.stream());
});

// odświeżanie przeglądarki i uruchamianie zadania scripts (które uruchamia webpacka)
gulp.task('scriptsRefresh', ['scripts'], function(){
  browserSync.reload();
});