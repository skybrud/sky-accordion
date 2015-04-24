(function () {
	'use strict';

	describe('Directive: skyAccordion', function() {

		var $compile,
			$rootScope,
			scope,
			element,
			html,
			skyAccordionCtrl,
			$window;

		beforeEach(module('skyAccordion'));

		beforeEach(inject(function(_$compile_, _$rootScope_,_$window_) {
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$window = _$window_;
		}));

		describe('with no initial hash', function() {

			beforeEach(function() {
				element = angular.element('<li sky-accordion="unique"><button sky-accordion-toggle>Title-toggle</button><div sky-accordion-content>Content</div></li>');

				$compile(element)($rootScope);

				$rootScope.$digest();
				scope = element.scope();
				html = element.html();
				skyAccordionCtrl = scope.skyAccordion;
			});

			it('should attach open, close, toggle and addContent methods to the controller', function() {
				expect(skyAccordionCtrl.open).toBeDefined();
				expect(skyAccordionCtrl.close).toBeDefined();
				expect(skyAccordionCtrl.toggle).toBeDefined();
				expect(skyAccordionCtrl.addContent).toBeDefined();
			});


			it('should invoke toggle-method on ctrl when sky-accordion-toggle is clicked', function() {
				var spy = spyOn(skyAccordionCtrl,'toggle');

				expect(spy).not.toHaveBeenCalled();

				angular.element(element[0].querySelector('[sky-accordion-toggle]')).triggerHandler('click');

				expect(spy).toHaveBeenCalled();
			});

			it('toggle() should call open/close based on state', function() {
				var spyOpen = spyOn(skyAccordionCtrl,'open');
				var spyClose = spyOn(skyAccordionCtrl,'close');

				expect(spyOpen).not.toHaveBeenCalled();
				expect(spyClose).not.toHaveBeenCalled();

				skyAccordionCtrl.toggle();

				expect(spyOpen).toHaveBeenCalled();
				expect(spyClose).not.toHaveBeenCalled();

				skyAccordionCtrl.isOpen = true;
				skyAccordionCtrl.toggle();

				expect(spyClose).toHaveBeenCalled();
			});

			it('should change isOpen flag when opening and closing', function() {
				expect(skyAccordionCtrl.isOpen).toBe(false);

				skyAccordionCtrl.open();

				expect(skyAccordionCtrl.isOpen).toBe(true);

				skyAccordionCtrl.close();

				expect(skyAccordionCtrl.isOpen).toBe(false);
			});

			it('should open specific item when the hash is changed', function() {
				expect(skyAccordionCtrl.isOpen).toBe(false);

				$window.location.hash = 'unique';
				angular.element($window).triggerHandler('hashchange');

				expect(skyAccordionCtrl.isOpen).toBe(true);
			});

		});

		describe('with initial hash', function() {

			beforeEach(function() {
				$window.location.hash = 'unique';

				element = angular.element('<li sky-accordion="unique"><button sky-accordion-toggle>Title-toggle</button><div sky-accordion-content>Content</div></li>');

				$compile(element)($rootScope);

				$rootScope.$digest();
				scope = element.scope();
				skyAccordionCtrl = scope.skyAccordion;
			});

			it('should open specific item based on initial location.hash', function() {
				expect(skyAccordionCtrl.isOpen).toBe(true);
			});

		});

	});

})();
