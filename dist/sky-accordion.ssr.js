'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var skyReveal = require('sky-reveal');

const SkyAccordionStore = new Vue({
	data() {
		return {
			accordions: [],
		};
	},
	methods: {
		add(accordion) {
			const index = this.accordions.indexOf(accordion);
			if (index === -1) {
				this.accordions.push(accordion);
			} else {
				this.accordions[index] = accordion;
			}
		},
		remove(accordion) {
			const index = this.accordions.indexOf(accordion);
			if (index > -1) {
				this.accordions.splice(index, 1);
			}
		},
		toggleAll(bool, exclude = []) {
			this.accordions
				.filter(acc => exclude.indexOf(acc) === -1)
				.forEach((acc) => {
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
			default: () => ({}),
		},
	},
	data() {
		return {
			pageYOffset: 0,
			deepLinked: false,
			isOpen: this.open,
			accId: null,
		};
	},
	computed: {
		config() {
			return Object.assign({}, this.options);
		},
	},
	beforeMount() {
		// Assign external id to accId, if external Id is undefined generate random Id if accId is null
		this.accId = this.id && this.id.toString();

		this.deepLinked = this.accId === window.location.hash.substr(1);

		this.isOpen = this.deepLinked
			? this.deepLinked
			: this.isOpen;

		SkyAccordionStore.add(this);
	},
	mounted() {
		if (this.deepLinked) {
			this.pageYOffset = this.currentYOffset(this.$el);

			this.$nextTick(() => {
				this.scroll(this.pageYOffset);
			});
		}
	},
	beforeDestroy() {
		SkyAccordionStore.remove(this);
	},
	methods: {
		currentYOffset(el) {
			return el.getBoundingClientRect().top + window.pageYOffset - this.config.offset;
		},
		scroll(yPosition) {
			window.scrollTo(0, yPosition);
		},
		toggle(bool) {
			this.isOpen = (typeof bool === 'boolean')
				? bool
				: !this.isOpen;

			if (this.config.closeOthersOnOpen && this.isOpen) {
				// Close all accordions but the current one if configured to
				SkyAccordionStore.toggleAll(false, [this]);
			}

			if (this.config.deeplink && this.id) {
				window.history.replaceState(undefined, undefined, `#${this.id}`);
			}
		},
	},
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:['sky-accordion', {open : _vm.isOpen}],attrs:{"id":_vm.accId}},[_vm._ssrNode("<button tabindex=\"0\" class=\"sky-accordion-title\">","</button>",[_vm._t("title")],2),_vm._ssrNode(" "),_c('SkyReveal',{attrs:{"open":_vm.isOpen}},[_c('div',{staticClass:"sky-accordion-content"},[_vm._t("default")],2)])],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-77e14797_0", { source: "\n.sky-accordions{margin:0;padding:0\n}\n.sky-accordion{display:block;margin:0\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = "data-v-77e14797";
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkyAccordion.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  function __vue_create_injector_ssr__(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
      context = __VUE_SSR_CONTEXT__;
    }

    if (!context) return function () {}

    if (!context.hasOwnProperty('styles')) {
      Object.defineProperty(context, 'styles', {
        enumerable: true,
        get: () => context._styles
      });
      context._renderStyles = renderStyles;
    }

    function renderStyles(styles) {
      let css = '';
      for (const {ids, media, parts} of styles) {
        css +=
          '<style data-vue-ssr-id="' + ids.join(' ') + '"' + (media ? ' media="' + media + '"' : '') + '>'
          + parts.join('\n') +
          '</style>';
      }

      return css
    }

    return function addStyle(id, css) {
      const group = css.media || 'default';
      const style = context._styles[group] || (context._styles[group] = { ids: [], parts: [] });

      if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.parts.push(code);
      }
    }
  }

  
  var SkyAccordion = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    __vue_create_injector_ssr__
  );

const defaults = {
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

	const { registerComponents, accordionDefaults } = Object.assign({}, defaults, options);

	if (registerComponents) {
		Vue$$1.component(SkyAccordion.name, Object.assign(
			{},
			SkyAccordion,
			{
				computed: {
					config() {
						return Object.assign({}, accordionDefaults, this.options);
					},
				},
			},
		));
	}
}

exports.SkyAccordion = SkyAccordion;
exports.default = install;
