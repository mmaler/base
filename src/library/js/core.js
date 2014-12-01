/***
 *
 * BEGIN: Core Javascript Functions
 * @source library/js/core.js
 *
***/

(function ($, window, document, undefined) {
	
	'use strict';
	
	// BEGIN: Fast Query Selector Wrapper
	// @returns object(selector)
	
	var FS = function (selector, context) {
		
		if ( typeof selector === 'string' ) {
			
			if (context) {
				
				var cont;
				
				if (context.jquery) {
	
					cont = context[0];
					
					if ( ! cont ) {
						return context;
					}
					
				} else {
					cont = context;
				}
				
				return $(cont.querySelectorAll(selector));
			}
	
			return $(document.querySelectorAll(selector));
		}
	
		return $(selector, context);
	};
	
	// BEGIN: Single Image Loaded
	// @param image(object)
	// @return callback(bool)
	
	var single_image_loaded = function ( image, callback ) {
		
		function loaded () {
			callback(image[0]);
		}
		
		function bindLoad () {
		
			this.one('load', loaded);
		
			if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		
				var src 			= this.attr( 'src' );
				var param 	= src.match( /\?/ ) ? '&' : '?';
		
				param += 'random=' + (new Date()).getTime();
				
				this.attr('src', src + param);
			}
		}
		
		if ( ! image.attr('src') ) {
			loaded();
			return;
		}
		
		if ( image[0].complete || image[0].readyState === 4 ) {
			loaded();
		} else {
			bindLoad.call(image);
		}
	};
	
	window.Base = {
		
		name:		'Base Framework',
		version:	'{{VERSION}}',
		
		global: {
			namespace: undefined
		},
		
		init: function( scope, libraries, method, options, response ) {
			
			var args 			= [scope, method, options, response];
			var responses 	= [];
			
			this.rtl 				= /rtl/i.test(FS('html').attr('dir'));
			this.scope 		= scope || this.scope;

			this.set_namespace();

			if ( libraries && typeof libraries === 'string' && !/reflow/i.test(libraries) ) {
        
				if (this.libs.hasOwnProperty(libraries) ) {
					responses.push( this.init_lib(libraries, args) );
				}
			
			} else {
				
				for (var lib in this.libs) {
					responses.push(this.init_lib(lib, libraries));
				}
			}
      
			return scope;
		},
		
		init_lib: function ( lib, args ) {
			
			if ( this.libs.hasOwnProperty(lib) ) {
		
				this.patch( this.libs[lib] );
		
				if ( args && args.hasOwnProperty(lib) ) {
					
					if ( typeof this.libs[lib].settings !== 'undefined' ) {
					
						$.extend(true, this.libs[lib].settings, args[lib]);
					
					} else if ( typeof this.libs[lib].defaults !== 'undefined' ) {
						$.extend(true, this.libs[lib].defaults, args[lib]);
					}
					
					return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
				}
		
				args = args instanceof Array ? args : new Array(args);
				
				return this.libs[lib].init.apply(this.libs[lib], args);
			}
		
			return function () {};
		},
		
		 libs: {},
		 
		 utils: {
		 	
		 	// BEGIN: Data Options
			
			data_options : function ( el, data_attr_name ) {
				
				data_attr_name = data_attr_name || 'options';
			
				var opts = {}, ii, p, opts_arr,
			
				data_options = function (el) {
					
					var namespace = Foundation.global.namespace;
			
					if ( namespace.length > 0 ) {
						return el.data(namespace + '-' + data_attr_name);
					}
			
					return el.data(data_attr_name);
				};
			
				var cached_options = data_options(el);
			
				if ( typeof cached_options === 'object' ) {
					return cached_options;
				}
			
				opts_arr = (cached_options || ':').split(';');
				ii = opts_arr.length;
			
				function isNumber (o) {
					return ! isNaN (o-0) && o !== null && o !== '' && o !== false && o !== true;
				}
			
				function trim (str) {
				
					if ( typeof str === 'string' ) {
						return $.trim(str);
					}
					
					return str;
				}
			
				while (ii--) {
			
					p = opts_arr[ii].split(':');
					p = [p[0], p.slice(1).join(':')];
			
					if (/true/i.test(p[1])) p[1] = true;
					if (/false/i.test(p[1])) p[1] = false;
					if (isNumber(p[1])) {
						if (p[1].indexOf('.') === -1) {
							p[1] = parseInt(p[1], 10);
						} else {
							p[1] = parseFloat(p[1]);
						}
					}
			
					if (p.length === 2 && p[0].length > 0) {
						opts[trim(p[0])] = trim(p[1]);
					}
				}
			
				return opts;
			},

		 	// BEGIN: Debounce
			// @param func(function)
			// @param delay(int)
			// @param immediate(bool)
			// @return function
			
		 	debounce : function ( func, delay, immediate ) {
			 	
				var result, timeout;
				
				return function () {
				
					var context 	= this, args = arguments;
					var later 		= function () {
					
						timeout = null;
					
						if ( ! immediate ) {
							result = func.apply(context, args);
						}
					};
					
					var callNow = immediate && !timeout;
					
					clearTimeout(timeout);
					
					timeout = setTimeout( later, delay );
					
					if ( callNow ) {
						result = func.apply( context, args );
					}
					return result;
				};
			},
			
			// BEGIN: Fast Selector
			// @param selector(string)
			// @return element(object)
			
			FS: FS,
			
			// BEGIN: Image Loaded
			
			image_loaded : function ( images, callback ) {
				
				var  self 			= this;
				var unloaded 	= images.length;
				
				if ( unloaded === 0 ) {
					callback(images);
				}
			
				images.each(function () {
			
					single_image_loaded( self.FS(this), function () {
			
						unloaded -= 1;
						
						if ( unloaded === 0 ) {
							callback(images);
						}
					});
				});
			},
		
			// BEGIN: Throttle
			// @param func(function)
			// @param delay(int)
			// @return function
			
			throttle: function( func, delay ) {
				
				var timer = null;
				
				return function () {
					
					var args 		= arguments;
					var context 	= this; 
					
					if ( timer === null ) {
						
						timer = setTimeout( function () {
						
							func.apply(context, args);
						
							timer = null;
						
						}, delay);
					}
				};
			},
		 },
		 
		set_namespace: function () {
			
			var namespace 				= ( this.global.namespace === undefined ) ? $('.base-data-attribute-namespace').css('font-family') : this.global.namespace;
			this.global.namespace 	= ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
		},
	};
	
	$.fn.base = function() {
		
		var args = Array.prototype.slice.call( arguments, 0 );
		
		return this.each( function() {
			Base.init.apply( Base, [this].concat(args) );	
		});
	};
	
}( jQuery, window, window.document ) );