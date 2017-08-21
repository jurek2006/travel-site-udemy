// sprites.js w gulp/tasks
var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			variables: {
				replaceSvgWithPng: function(){
					return function(sprite, render){
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
			sprite: 'sprite.svg',
			render:{
				css:{
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('beginClean', function(){
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));

	//dla wszystkich plików svg w icons i jego wszystkich podfolderach 
	// - kopiowanie zestawu svg do temp/sprite/css/svg w którym znajduje się plik svg będący kolekcją wszystkich svg
});

// zadanie do tworzenia automatycznej kopii naszego pliku ikon svg do png:
gulp.task('createPngCopy', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest('./app/temp/sprite/css'));
});

// zadanie przenoszące wygenerowane pliki z folderu temp do folderu images
gulp.task('copySpriteGraphic', ['createPngCopy'], function(){
	return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'] , function(){
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
	return del('./app/temp/sprite');
})

gulp.task('icons', ['beginClean','createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);