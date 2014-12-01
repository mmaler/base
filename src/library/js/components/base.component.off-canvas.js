/***
 *
 * BEGIN: Off Canvas
 * @source: js/components/base.components.off-canvas.js
 *
***/

( function ( window, $, undefined ) {
	
	'use strict';
	
	$.OffCanvas = function ( element, options, callback ) {
	 	
	 	this.$document					= $(document);
	 	this.$element 						= $(element);
	 	this.$target							= $( this.$element.data('target') );
		this.$toggle							= this.$element;
	 	
		this.options 							= $.extend( {}, $.OffCanvas.DEFAULTS, options);
		
		if ( this.options.toggle ) {
			this.toggle();
		}
	}
	
	/***
	 *
	 * BEGIN: Defaults
	 * @source: js/components/base.components.off-canvas.js
	 *
	***/
	
	$.OffCanvas.DEFAULTS = {
		toggle: true
	}

	/***
	 *
	 * BEGIN: Prototype Functions
	 * @source: js/components/base.components.off-canvas.js
	 *
	***/
		
	$.OffCanvas.prototype = {
		
		// BEGIN: Prodotype Function – Show
		// @source js/sec.utilities.js
		// @since 2014.7.31.1
		
		show: function( callback ) {
			
			var instance = this;
			
			this.hide( function( response ) {
				
				if ( response ) {
					
					if ( instance.$element.data('relative').length && instance.$target.hasClass('left') ) {
						$( instance.$element.data('relative') ).addClass('off-canvas-relative left');
					}
					if ( instance.$element.data('relative').length && instance.$target.hasClass('right') ) {
						$( instance.$element.data('relative') ).addClass('off-canvas-relative right');
					}
					
					instance.$target.addClass('active');
				}
			});
		},
		
		// BEGIN: Prodotype Function – Hide
		//@source: js/components/base.components.off-canvas.js
		
		hide: function( callback ) {
			
			console.log("HIDING");
			var instance = this;
			
			if ( ! this.$document.find('.off-canvas-wrapper.active').length ) {
			
				return callback(true);
			
			} else {
				
				this.$document.find('.off-canvas-relative').removeClass('off-canvas-relative');
				
				var $element = this.$document.find('.off-canvas-wrapper.active')
				
				$element.removeClass('active');
					
				var complete = function (e) {
					if ( typeof( callback ) === 'function' ) {
						return callback(true);
					}
				}
				
				if ( ! $.support.transition ) {
					
					if ( typeof( callback ) === 'function' ) {
						return callback(true);
					}
				} 
					
				$element.one( $.support.transition.end, $.proxy(complete, this) ).emulateTransitionEnd(250);
			}
			
			if ( typeof( callback ) === 'function' ) {
				return callback(true);
			}
		},
		
		// BEGIN: Prodotype Function – Toggle
		//@source: js/components/base.components.off-canvas.js
		
		toggle: function() {
			this[ this.$target.hasClass('active') ? 'hide' : 'show' ]();
		}
	};
	
	/***
	 *
	 * BEGIN: Plugin API
	 * @source: js/components/base.components.off-canvas.js
	 *
	***/	

	$.fn.offCanvas = function (option) {
		
		return this.each( function () {
			
			var $element 	= $(this);
			
			var data 			= $element.data('base.off-canvas');
			var options 		= $.extend( {}, $.OffCanvas.DEFAULTS, $element.data(), typeof option == 'object' && option );
			
			if ( ! data && options.toggle && option === 'show' ) { 
				option = !option;
			}
			
			if ( ! data ) { 
				$element.data('base.off-canvas', ( data = new $.OffCanvas( this, options ) ) );
			}
			
			if ( typeof option == 'string' ) {
				data[option]();
			}
		});
	}

	/***
	 *
	 * BEGIN: Event Handlers
	 * @source: js/components/base.components.off-canvas.js
	 *
	***/	

	$('.off-canvas-toggle').off('.base.off-canvas.data.api').on( 'click.base.off-canvas.data-api', function(e) {
		
		e.preventDefault();
	
		var $element 	= $(this);
		var $target		= $( $element.data('target') );
		
		if ( $target.length && $target.hasClass('active') ) {
			$element.offCanvas('hide');
		} else {
			$element.offCanvas('show');
		}
	});
	
})(window, jQuery);