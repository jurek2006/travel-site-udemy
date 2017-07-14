// sprites.js
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite');

var config = {
	mode: {
		css: {
			render:{
				css:{
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('createSprite', function(){
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));

	//dla wszystkich plików svg w icons i jego wszystkich podfolderach 
	// - kopiowanie zestawu svg do temp/sprite/css/svg w którym znajduje się plik svg będący kolekcją wszystkich svg
});