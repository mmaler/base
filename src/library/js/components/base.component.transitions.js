/***
 *
 * BEGIN: Transitions
 * @source js/components/base.component.transitions.js
 *
***/

+ function($) {
	
	'use strict';
	
	function transitionEnd() {
	
		var el = document.createElement('behaviors')

		var transEndEventNames = {
			WebkitTransition: 'webkitTransitionEnd',
			MozTransition: 	'transitionend',
			OTransition: 		'oTransitionEnd otransitionend',
			transition: 			'transitionend'
		}

		for ( var name in transEndEventNames ) {
			
			if ( el.style[name] !== undefined ) {
				return {
					end: transEndEventNames[name]
				}
			}
		}

		return false;
	}

	$.fn.emulateTransitionEnd = function( duration ) {
		
		var called = false;
		
		var $el = this;
		
		$(this).one( 'baseTransitionEnd', function() {
			called = true;
		});
		
		var callback = function() {
			
			if ( ! called ) {
				$($el).trigger( $.support.transition.end );
			}
		}
		
		setTimeout( callback, duration );
		
		return this;
	}

	$( function() {
		
		$.support.transition = transitionEnd();

		if ( ! $.support.transition ) {
			return;
		}

		$.event.special.baseTransitionEnd = {
			bindType: 		$.support.transition.end,
			delegateType: $.support.transition.end,
			handle: function(e) {
				if ( $(e.target).is(this) ) {
					return e.handleObj.handler.apply( this, arguments );
				}
			}
		}
	});
}(jQuery);