// Include Gulp
var gulp = require('gulp');

// Define base folders
var src  = 'src/',
	dist = 'public/assets/';

// Include plugins
var sass               = require('gulp-sass');
var browserSync        = require('browser-sync');
var gulpif             = require('gulp-if');
var notify             = require('gulp-notify');
var postcss            = require('gulp-postcss');
var rename             = require('gulp-rename');
var sourcemaps         = require('gulp-sourcemaps');
var uglify             = require('gulp-uglify');
var gutil              = require('gulp-util');
var autoprefixer       = require('autoprefixer');
var argv               = require('yargs').argv;
var browserify         = require('browserify');
var babelify           = require('babelify');
var watchify           = require('watchify');
var source             = require('vinyl-source-stream');
var buffer             = require('vinyl-buffer');
var reload             = browserSync.reload;

// Set environment
var environment = argv.production ? 'production' : 'development';

// Compile CSS from SCSS files
gulp.task('scss', function () {
	return gulp.src(src + 'scss/*.scss', { base: src + 'scss/' })
		.pipe(gulpif(environment === 'development', sourcemaps.init()))
		.pipe(sass({
			outputStyle: (environment === 'development') ? 'expanded' : 'compressed',
			includePaths: ['scss']
		}))
		.on('error', notify.onError(function (error) {
			return 'SCSS Error \n' + error;
		}))
		.pipe(postcss([
			autoprefixer({browsers: ['last 30 versions']})
		]))
		.pipe(gulpif(environment === 'development', sourcemaps.write('./', {includeContent: false, sourceRoot: src + 'scss/'})))
		.pipe(gulp.dest(dist + 'css'));
});

// Images
gulp.task('img', function () {
	return gulp.src(src + 'img/**')
		.pipe(gulp.dest(dist + 'img'));
});

// Fonts
gulp.task('fonts', function () {
	return gulp.src(src + 'fonts/**')
		.pipe(gulp.dest(dist + 'fonts'));
});

// Synchronise browsers
gulp.task('browser-sync', function() {
	browserSync({
		proxy: "jayfreestone.dev",
		ghostMode: false
	});
});

// Scripts
gulp.task('js', function() {
	return buildScript('main.js', false); // Runs once as watch is set to false
});

// External Scripts
gulp.task('node-js', function() {
	return gulp.src([
		'node_modules/viewport-units-buggyfill/viewport-units-buggyfill.js',
		'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
		'node_modules/hammerjs/hammer.min.js',
		'node_modules/webfontloader/webfontloader.js',
		'node_modules/lazysizes/lazysizes.min.js',
		'node_modules/picturefill/dist/picturefill.min.js'
	])
	.pipe(gulp.dest(dist + 'js'));
});

function buildScript(file, watch) {
	var props = {
		entries: [src + 'js/' + file],
		debug : (environment === 'development') ? true : false,
		cache: {},
		packageCache: {},
		transform:  [babelify.configure({presets : ['es2015'] })]
	};

	// If watch requested run watchify() otherwise run browserify()
	var bundler = watch ? watchify(browserify(props)) : browserify(props);

	function rebundle() {
		var stream = bundler.bundle();
		return stream
			.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulpif(environment === 'production', buffer()))
			.pipe(gulpif(environment === 'production', uglify({
			 	mangle: true,
				compress: {
					sequences: true,
					dead_code: true,
					conditionals: true,
					booleans: true,
					unused: true,
					if_return: true,
					join_vars: true,
					drop_console: true // remove console.* functions
				}
			})))
			.on('error', handleErrors)
			.pipe(gulp.dest(dist + 'js'))
			.pipe(reload({stream:true}));
	}

	// Listen for an update and run rebundle
	bundler.on('update', function() {
		rebundle();
		gutil.log('Rebundle...');
	});

	// Run it once the first time buildScript is called
	return rebundle();
}

function handleErrors() {
 	var args = Array.prototype.slice.call(arguments);
	notify.onError({
    	title: 'Compile Error',
    	message: '<%= error.message %>'
  	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

// Watch for changes in files
gulp.task('watch', function () {
	gulp.watch(src + 'scss/**/*.scss', ['scss']);
	gulp.watch(src + 'scss/*.scss', ['scss']);
	gulp.watch(src + 'js/**/*.js', ['js']);
	gulp.watch(src + 'img/*', ['img']);
	gulp.watch(src + 'fonts/*', ['fonts']);
	return buildScript('main.js', true); // Browserify watch for JS changes
});

// Build all files
gulp.task('build', ['scss', 'js', 'node-js', 'img', 'fonts']);

// Default task
gulp.task('default', ['build', 'browser-sync', 'watch']);
