module.exports = {
	dist: {
		files: [
			{
				dest: 'dist/fonts/',
				expand: true, 
				filter: 'isFile',
				flatten: true,
				src: ['src/fonts/**']
			},
			{
				dest: 'dist/images/',
				expand: true, 
				filter: 'isFile',
				flatten: true,
				src: ['src/images/**']
			},
			{
				dest: 'dist/js/vendor',
				expand: true, 
				filter: 'isFile',
				flatten: true,
				src: ['src/js/vendor/**']
			},
			{
				dest: 'dist/',
				expand: true, 
				filter: 'isFile',
				flatten: true,
				src: [
					'src/404.html',
					'src/apple-touch-icon.png',
					'src/browserconfig.xml',
					'src/crossdomain.xml',
					'src/favicon.ico',
					'src/humans.txt',
					'src/index.html',
					'src/robots.txt',
					'src/tile-wide.png',
					'src/tile.png'	
				]
			},
		]
	}
}