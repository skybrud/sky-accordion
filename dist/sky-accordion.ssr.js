'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var skyReveal = require('sky-reveal');

var SkyAccordionStore = new Vue({
	data: function data() {
		return {
			accordions: [],
		};
	},
	methods: {
		add: function add(accordion) {
			var index = this.accordions.indexOf(accordion);
			if (index === -1) {
				this.accordions.push(accordion);
			} else {
				this.accordions[index] = accordion;
			}
		},
		remove: function remove(accordion) {
			var index = this.accordions.indexOf(accordion);
			if (index > -1) {
				this.accordions.splice(index, 1);
			}
		},
		toggleAll: function toggleAll(bool, exclude) {
			if ( exclude === void 0 ) exclude = [];

			this.accordions
				.filter(function (acc) { return exclude.indexOf(acc) === -1; })
				.forEach(function (acc) {
					acc.$set(acc, 'isOpen', false);
				});
		},
	},
});

var script = {
	name: 'SkyAccordion',
	components: { SkyReveal: skyReveal.SkyReveal },
	props: {
		open: {
			type: Boolean,
			default: false,
		},
		id: [Number, String],
		options: {
			type: Object,
			default: function () { return ({}); },
		},
	},
	data: function data() {
		return {
			pageYOffset: 0,
			deepLinked: false,
			isOpen: this.open,
			accId: null,
		};
	},
	computed: {
		config: function config() {
			return Object.assign({}, this.options);
		},
	},
	beforeMount: function beforeMount() {
		// Assign external id to accId, if external Id is undefined generate random Id if accId is null
		this.accId = this.id && this.id.toString();

		this.deepLinked = this.accId === window.location.hash.substr(1);

		this.isOpen = this.deepLinked
			? this.deepLinked
			: this.isOpen;

		SkyAccordionStore.add(this);
	},
	mounted: function mounted() {
		var this$1 = this;

		if (this.deepLinked) {
			this.pageYOffset = this.currentYOffset(this.$el);

			this.$nextTick(function () {
				this$1.scroll(this$1.pageYOffset);
			});
		}
	},
	beforeDestroy: function beforeDestroy() {
		SkyAccordionStore.remove(this);
	},
	methods: {
		currentYOffset: function currentYOffset(el) {
			return el.getBoundingClientRect().top + window.pageYOffset - this.config.offset;
		},
		scroll: function scroll(yPosition) {
			window.scrollTo(0, yPosition);
		},
		toggle: function toggle(bool) {
			this.isOpen = (typeof bool === 'boolean')
				? bool
				: !this.isOpen;

			if (this.config.closeOthersOnOpen && this.isOpen) {
				// Close all accordions but the current one if configured to
				SkyAccordionStore.toggleAll(false, [this]);
			}

			if (this.config.deeplink && this.id) {
				window.history.replaceState(undefined, undefined, ("#" + (this.id)));
			}
		},
	},
};

/* script */
            var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:['sky-accordion', {open : _vm.isOpen}],attrs:{"id":_vm.accId}},[_vm._ssrNode("<button tabindex=\"0\" class=\"sky-accordion-title\">","</button>",[_vm._t("title")],2),_vm._ssrNode(" "),_c('SkyReveal',{attrs:{"open":_vm.isOpen}},[_c('div',{staticClass:"sky-accordion-content"},[_vm._t("default")],2)])],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-150eaa9c";
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkyAccordion.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var SkyAccordion = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var defaults = {
	registerComponents: true,
	accordionDefaults: {
		offset: 50,
		deeplink: false,
		closeOthersOnOpen: false, // if true, only one accordion will be open at a time
	},
};

function install(Vue$$1, options) {
	if (install.installed === true) {
		return;
	}

	var ref = Object.assign({}, defaults, options);
	var registerComponents = ref.registerComponents;
	var accordionDefaults = ref.accordionDefaults;

	if (registerComponents) {
		Vue$$1.component(SkyAccordion.name, Object.assign(
			{},
			SkyAccordion,
			{
				computed: {
					config: function config() {
						return Object.assign({}, accordionDefaults, this.options);
					},
				},
			}
		));
	}
}

exports.SkyAccordion = SkyAccordion;
exports.default = install;
