module.exports = {
	options: {
		separator: ';',
	},
	dev: {
		src: ['src/library/js/plugins.js', 'src/library/js/core.js', 'src/library/js/components/**/*.js'],
		dest: 'src/js/global.js',
    },
	dist: {
		src: ['src/library/js/plugins.js', 'src/library/js/core.js', 'src/library/js/components/**/*.js'],
		dest: 'src/js/global.js',
    }
}