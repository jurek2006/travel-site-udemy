// build.js w gulp/tasks
const 	gulp = require('gulp'),
		imagemin = require('gulp-imagemin'),
		del = require('del'),
		usemin = require('gulp-usemin');

// zadanie usuwające folder dist
gulp.task('deleteDistFolder', function(){
	return del("./dist");
})

// zadanie kopiujące niezbędne obrazy do folderu dist oraz dodatkowo kompresujące obrazy
gulp.task('optimizeImages', ['deleteDistFolder'], function(){
	// wykrzyknika ! używamy poniżej do wyłączenia określonych plików 
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./dist/assets/images"));
});

// zadanie kopiowania, kompresowania i dodawania indywidualnego kodu wersji dla plików js i css
gulp.task('usemin', ['deleteDistFolder'], function(){
	return gulp.src("./app/index.html")
		.pipe(usemin())
		.pipe(gulp.dest("./dist"));
});

gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin']);