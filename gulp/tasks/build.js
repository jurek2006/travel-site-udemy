// build.js w gulp/tasks
const 	gulp = require('gulp'),
		imagemin = require('gulp-imagemin'),
		del = require('del'),
		usemin = require('gulp-usemin'),
		rev = require('gulp-rev'),
		cssnano = require('gulp-cssnano'),
		uglify = require('gulp-uglify'),
		browserSync = require('browser-sync').create(); //importujemy tylko metodę create;

gulp.task('previewDist', function(){
	browserSync.init({
    // wskazujemy gdzie znajduje się nasza strona
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

// zadanie usuwające folder dist
gulp.task('deleteDistFolder', ['icons'], function(){
	return del("./docs");
})

// zadanie testowe do kopiowania folderów
gulp.task('copyGeneralFiles', ['deleteDistFolder', 'styles', 'scripts'],  function(){
	const pathsToCopy = [
			'./app/**/*', 
			'!./app/index.html',
			'!./app/assets/images/**',
			'!./app/assets/styles/**',
			'!./app/assets/scripts/**',
			'!./app/temp',
			'!./app/temp/**'
	]

	return gulp.src(pathsToCopy)
		.pipe(gulp.dest("./docs"));
});

// zadanie kopiujące niezbędne obrazy do folderu dist oraz dodatkowo kompresujące obrazy
gulp.task('optimizeImages', ['deleteDistFolder'], function(){
	// wykrzyknika ! używamy poniżej do wyłączenia określonych plików 
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./docs/assets/images"));
});

// zadanie kopiowania, kompresowania i dodawania indywidualnego kodu wersji dla plików js i css
gulp.task('usemin', ['deleteDistFolder'], function(){
	return gulp.src("./app/index.html")
		.pipe(usemin({
			css: [function(){return rev()}, function(){return cssnano()}],
			js: [function(){return rev()}, function(){return uglify()}]
		}))
		.pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);