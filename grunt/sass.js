module.exports = {
	options: {
		sourceMap: false,
	},
	dev: {
		files: {
			'src/css/global.css':	'src/library/sass/global.scss',
		}
	},
	dist: {
		files: {
			'src/css/global.css':	'src/library/sass/global.scss',
		}
	}
};
