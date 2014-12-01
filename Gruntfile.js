module.exports = function(grunt) {
	
	require('time-grunt')(grunt);
	
	require('load-grunt-config')(grunt);
	
	grunt.registerTask( 'build', ['sass:dist', 'cssmin:dist', 'copy:dist', 'concat:dist', 'uglify:dist'] );
};