// styles.js
var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
<<<<<<< HEAD
		.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
		.on('error', function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end');
		})
=======
		.pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
>>>>>>> inProgress
		.pipe(gulp.dest('./app/temp/styles'));
});