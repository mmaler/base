module.exports = {
	options: {
		livereload: true,
	},
	html: {
		files: 		['*.html'],
		options: 	{ livereload: true },
	},
	js: {
		files: 		['src/library/js/**/*.{js,json}'],
		options: 	{ livereload: true },
		tasks: 		['concat:dev']
	},
	sass: {
		files: 		['src/library/sass/**/*.{scss,sass}'],
		options: 	{ livereload: true },
		tasks: 		['sass:dev'],
	}
};
