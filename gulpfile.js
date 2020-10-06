var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var scssOptions = {
	outputStyle : 'compressed', /* nested, expanded, compact, compressed */
	indentType : 'tab',
	indentWidth : 1,
	souceComments: true
}
gulp.task('html-tpl', function(){
	var manageEnvironment = function(environment) {
		environment.addFilter('tabIndent', function(str, numOfIndents, firstLine) {
			str = str.replace(/^(?=.)/gm, new Array(numOfIndents + 1).join('\t'));
			if(!firstLine) {
				str = str.replace(/^\s+/,"");
			}
			return str;
		});
	};

	return gulp.src('./src/html/**/*.html')
		.pipe(nunjucksRender({
			envOptions: {
				autoescape: false
			},
			manageEnv : manageEnvironment,
			path: ['./src']
		}))
		.pipe(gulp.dest('./resource/html'))
		.pipe(browserSync.reload({stream : true}));
});
gulp.task('scss:compile', function(){
	return gulp
		.src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(scss(scssOptions).on('error', scss.logError))
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./resource/css'))
		.pipe(browserSync.reload({stream : true}));
});
gulp.task('js', function(){
	return gulp
		.src('./resource/**/*.js')
		.pipe(browserSync.reload({stream : true}));
})
gulp.task('browserSync', function(){
	return browserSync.init({
		port : 3333,
		server : {
			baseDir: './'
		}
	})
});
gulp.task('watch', function(){
	gulp.watch('./src/**/*.html', gulp.series('html-tpl'));
	gulp.watch('./src/**/*.scss', gulp.series('scss:compile'));
	gulp.watch('./resource/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('watch', 'browserSync'));