/***
 *
 * BEGIN: Tabs
 * * @source js/components/base.component.tabs.js
 *
***/

+function ($) {
  
  'use strict';
	
	var Tab = function(element) {
		this.element = $(element);
	}
	
	Tab.TRANSITION_DURATION = 150;
	
	Tab.prototype.show = function() {
	
		var $this         	= this.element;
		var $ul       		= $this.closest('ul:not(.dropdown-menu)');
		var selector  	= $this.data('target');
	
		if ( ! selector ) {
			selector = $this.attr('href');
			selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
		}
	
		if ( $this.parent('li').hasClass('active') ) {
			return;
		}
		
		var $previous = $ul.find('.active:last a');
	
		var hideEvent = $.Event( 'hide.base.tab', {
			relatedTarget: $this[0]
		});
	
		var showEvent = $.Event( 'show.base.tab', {
			relatedTarget: $previous[0]
		});
	
		$previous.trigger(hideEvent);
	
		$this.trigger(showEvent);
	
		if ( showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented() ) {
			return;
		}
	
		var $target = $(selector)
	
		this.activate( $this.closest('li'), $ul );
		
		this.activate( $target, $target.parent(), function() {
	
			$previous.trigger({
				type: 'hidden.base.tab',
				relatedTarget: $this[0]
			});
	
			$this.trigger({
				type: 'shown.base.tab',
				relatedTarget: $previous[0]
			});
		});
	}
	
	Tab.prototype.activate = function(element, container, callback) {
		
		var $active 		= container.find('> .active')
		var transition 	= callback && $.support.transition && ( ( $active.length && $active.hasClass('fade') ) || !!container.find('> .fade').length );

		function next() {
			
			$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
			
			element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);
			
			if ( transition ) {
				element[0].offsetWidth;
				element.addClass('in');
			} else {
				element.removeClass('fade');
			}
			
			if ( element.parent('.dropdown-menu').length ) {
				element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
			}
			
			callback && callback();
		}
		
		$active.length && transition ? $active.one('baseTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
		
		$active.removeClass('in');
	}
	
	function Plugin( option ) {
		
		return this.each( function() {
			
			var $this 	= $(this);
			var data 	= $this.data('base.tab');
			
			if ( ! data ) {
				$this.data( 'base.tab', ( data = new Tab(this) ) );
			}
			
			if ( typeof option == 'string' ) {
				data[option]();
			}
		});
	}
	
	var old = $.fn.tab;
	
	$.fn.tab = Plugin;
	$.fn.tab.Constructor = Tab;
	
	$.fn.tab.noConflict = function() {
		
		$.fn.tab = old;
		
		return this;
	}
	
	var clickHandler = function(e) {
		
		e.preventDefault();
		
		Plugin.call( $(this), 'show' );
	}
	
	$(document).on('click.base.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.base.tab.data-api', '[data-toggle="pill"]', clickHandler);
	
}(jQuery);