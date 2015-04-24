/* global angular */
(function () {
	'use strict';

	/*
	 * Directive: skyAccordionToggle
	 *
	 * Put this directive on the part of the accordion that should toggle the collapser
	 *
	 * When the skyAccordionToggle's linking function is run, the element
	 * registers a click-handler that runs a method on the required skyAccordion.
	 */

	angular.module('skyAccordion').directive('skyAccordionToggle',skyAccordionToggle);

	skyAccordionToggle.$inject = [];

	function skyAccordionToggle() {
		var directive = {
			restrict:'A',
			require:'^skyAccordion',
			link:link
		};

		function link(scope,element,attributes,skyAccordionCtrl) {
			element.on('click', function() {
				skyAccordionCtrl.toggle();
			});
		}

		return directive;
	}

})();
