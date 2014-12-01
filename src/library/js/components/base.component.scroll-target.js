/***
 *
 * BEGIN: Scroll Target
 * @source: js/components/base.components.off-canvas.js
 *
***/

( function ( window, $, undefined ) {
	
	'use strict';
	
	var ScrollTarget = function (element) {
		
		console.log("Inside Scroll Target");
		
		this.$document					= $(document);
	 	this.$element 						= $(element);
	 	
	 	this.$parent							= $element.data('parent');
	 	this.$target							= $element.attr('href');
	 	
	 	
	}
	
	ScrollTarget.VERSION  = '1.0.1';
	
	ScrollTarget.prototype.transition = function() {
		
	}
	
	
	// BEGIN: Plugin API
	// @param object(option)
	// @return none
	// ----------------------------------------------------------------------------------------------------
	
	function Plugin( option ) {
    
    	return this.each(function () {
			
			var $element   = $(this);
			var data    		= $element.data('base.scroll-target');
			
			if ( ! data ) {
				$this.data('base.scroll-target', ( data = new ScrollTarget( this ) ) );
			}
		});
	}

	var old = $.fn.scrollTarget
	
	$.fn.scrollTarget             			= Plugin
	$.fn.scrollTarget.Constructor 	= ScrollTarget;
	
	$.fn.scrollTarget.noConflict = function () {
		
		$.fn.scrollTarget = old;
	
		return this;
	}
  
	// BEGIN: Event Handlers
	// @data-attribute: data-toggle="scroll-target"
	// ----------------------------------------------------------------------------------------------------
	
	$(document).on('click.base.scroll-target.data-api', '[data-toggle="scroll-target"]', function (e) {
		
		var $element    = $(this)
		var href    		= $element.attr('href')
		var $target 		= $( $element.attr('data-target') || ( href && href.replace(/.*(?=#[^\s]+$)/, '') ) );
		var option  		= $target.data('base.scroll-target') ? 'toggle' : $.extend( { remote: !/#/.test(href) && href }, $target.data(), $element.data() );

		if ( $element.is('a') ) {
			e.preventDefault();
		}
	});
	
})(window, jQuery);