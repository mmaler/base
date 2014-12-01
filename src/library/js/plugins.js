/***
 *
 * BEGIN: Prevent Console Errors
 * @source library/js/plugins.js
 *
***/

(function() {
    
	var console 		= ( window.console = window.console || {} );
	var method;
	var methods	 	= [ 'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn' ];
	var noop 			= function () {};
	var length 		= methods.length;
   
	while ( length-- ) {
	
		method = methods[length];
	
		if ( ! console[method] ) {
			console[method] = noop;
		}
	}
}());