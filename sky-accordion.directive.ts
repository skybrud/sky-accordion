/* global angular */
(function () {
	'use strict';

	/**
	 * Directive: skyAccordion
	 * Directive for making an accordion.
	 *
	 * Each skyAccordion must contain a skyAccordionToggle and a skyAccordionContent.
	 *
	 * This directive has scope methods for open, close and toggle. These are all
	 * exposed to the controller as well. The controller also has an internal method
	 * for registering the content.
	 *
	 * The directive starts out by calling close on itself (with the noAni-flag).
	 *
	**/

	angular.module('skyAccordion').directive('skyAccordion',skyAccordion);

	skyAccordion.$inject = ['skyAccordionTopScrollOffset','$window'];

	function skyAccordion(skyAccordionTopScrollOffset, $window) {

		var directive = {
			restrict:'A',
			scope:true,
			controllerAs:'skyAccordion',
			controller:skyAccordionCtrl,
			link:link
		};

		skyAccordionCtrl.$inject = ['$scope','$element'];

		function skyAccordionCtrl($scope, $element) {
			var _this = this;

			/*
			 * Resetfunction that resets the contentContainer styling after the animation, and removes the event-listener
			 */
			var resetFn = function() {
				/*
				 * Set transition to 0s to avoid Safari rendering bug when shifting between fixed pixel height and auto height.
				 */
				_this.contentContainer.style.transition = '0s';
				_this.contentContainer.style.height = 'auto';
				_this.contentContainer.style.overflow = 'visible';
			};

			/*
			 * Open the collapser by animating (css transition or animation) the height of the container to the height
			 * of the content. When the transition is complete reset the container styles
			 */
			_this.open = function() {
				$element.addClass('open');
				_this.contentContainer.style.height = _this.content.offsetHeight+'px';
				angular.element(_this.contentContainer).one('webkitTransitionEnd transitionend webkitAnimationEnd animationend', resetFn);
				_this.isOpen=true;
			};

			/*
			 * Close the collapser by animating the container height to 0 with overflow hidden. (start out by setting the
			 * height of the container to the measured height of the content, since we can't animate from auto).
			 *
			 * When the noAni-flag is on, skip the measuring part (transition from auto => no animation).
			 *
			 * Start by removing the transition-end listener, so it doesn't do unintentional stuff,
			 * when closing before the open-transition is complete.
			 */
			_this.close = function(noAni) {
				$element.removeClass('open');
				angular.element(_this.contentContainer).off('webkitTransitionEnd transitionend webkitAnimationEnd animationend', resetFn);
				_this.contentContainer.style.overflow = 'hidden';
				if (!noAni) {
					_this.contentContainer.style.height = _this.content.offsetHeight+'px';
					setTimeout(function() {
						/*
						 * After height auto has been set back to fixed pixel height again, remove transition 0s
						 * (due to Safari bug described in resetFn).
						 *
						 * Set (and animate) to height 0.
						 *
						 * Timeout delay these style changes 30ms to show close animation in Firefox
						 */
						_this.contentContainer.style.transition = '';
						_this.contentContainer.style.height = '0';
					},30);
				} else {
					_this.contentContainer.style.height = '0';
				}
				_this.isOpen=false;
			};

			/*
			 * Toggle the animation by calling close if it is opened, or vice versa.
			 */
			_this.toggle = function() {
				if (_this.isOpen) {
					_this.close();
				} else {
					_this.open();
				}
			};

			/*
			 * Register the accordion content
			 */
			_this.addContent = function(ele) {
				_this.contentContainer=ele[0];
				_this.content = ele[0].childNodes[0];
			};

			/*
			 * Expose relevant methods to the $scope
			 */
			$scope.open = _this.open;
			$scope.close = _this.close;
			$scope.toggle = _this.toggle;
		}

		function link(scope,element,attributes) {

			var init = function() {
				scope.close(true);
				checkHash();
			};

			var checkHash = function() {
				if ($window.location.hash && attributes.skyAccordion === $window.location.hash.substr(1)) {
					/**
					 * Scroll to and open
					 */
					element[0].focus();
					scope.open(true);
					var scrollTo = element[0].getBoundingClientRect().top + $window.scrollY;
					setTimeout(function() {
						$window.scroll(0, scrollTo - skyAccordionTopScrollOffset);
					},200);
				}
			};

			init();

			angular.element($window).on('hashchange', checkHash);
			scope.$on('$destroy', function() {
				angular.element($window).off('hashchange', checkHash);
			});
		}

		return directive;

	}

})();
