const replace = require('replace-in-file');
const zipFolder = require('zip-folder');

const htmlbeautify = require('gulp-html-beautify');
const gulp = require('gulp');

const BUILD_FOLDER = './build'
const INDEX_FILE = '/index.html'

const options = {
	files: BUILD_FOLDER + INDEX_FILE,
	from: /"\//g,
	to: '"',
};

const makeZip = () => {
	zipFolder(BUILD_FOLDER, './build.zip', function(err) {
		if(err) {
			console.log('Error creating zip archive!', err);
		} else {
			console.log('Zip success: ./build.zip');
		}
	});
}

gulp.task('htmlbeautify', function() {
	const options = {indentSize: 2}
	gulp.src(BUILD_FOLDER + INDEX_FILE)
	    .pipe(htmlbeautify(options))
	    .pipe(gulp.dest(BUILD_FOLDER))
});

replace(options)
	.then(changes => {
		console.log('Modified files:', changes.join(', '));
		gulp.run('htmlbeautify');
		setTimeout(makeZip, 1000);
	})
	.catch(error => {
		console.error('Error occurred:', error);
	});