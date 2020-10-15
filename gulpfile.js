var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var scssOptions = {
	outputStyle : 'expanded', /* nested, expanded, compact, compressed */
	indentType : 'tab',
	indentWidth : 1,
	souceComments: true
}
var cssName = 'style.css'
var path = {
	dest : './resource/',
	src : './src/',
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

	return gulp.src(path.src+'html/**/*.html')
		.pipe(nunjucksRender({
			envOptions: {
				autoescape: false
			},
			manageEnv : manageEnvironment,
			path: [path.src]
		}))
		.pipe(gulp.dest(path.dest+'html'))
		.pipe(browserSync.reload({stream : true}));
});
gulp.task('scss:compile', function(){
	return gulp
		.src(path.src+'scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(scss(scssOptions).on('error', scss.logError))
		.pipe(rename(cssName))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.dest+'css'))
		.pipe(browserSync.reload({stream : true}));
});
gulp.task('js', function(){
	return gulp
		.src(path.dest+'**/*.js')
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
	gulp.watch(path.src+'**/*.html', gulp.series('html-tpl'));
	gulp.watch(path.src+'**/*.scss', gulp.series('scss:compile'));
	gulp.watch(path.dest+'**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('watch', 'browserSync'));