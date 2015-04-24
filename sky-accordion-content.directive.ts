/* global angular */
(function () {
	'use strict';

	/*
	 * Directive: skyAccordionContent
	 *
	 * Put this directive on the part of the accordion that should collapse
	 *
	 * When the skyAccordionContent's linking function is run, the element
	 * is wrapped (for animation purposes) and the wrapper registers itself
	 * on the required skyAccordion
	 */

	angular.module('skyAccordion').directive('skyAccordionContent',skyAccordionContent);

	skyAccordionContent.$inject = [];

	function skyAccordionContent() {
		var directive = {
			restrict:'A',
			require:'^skyAccordion',
			link:link
		};

		function link(scope,element,attributes,skyAccordionCtrl) {
			element.wrap('<div sky-accordion-wrapper></div>');
			skyAccordionCtrl.addContent(element.parent());
		}

		return directive;
	}

})();
