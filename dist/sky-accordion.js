var SkyAccordion = (function (exports,Vue,skyReveal) {
	'use strict';

	Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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
	var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:['sky-accordion', {open : _vm.isOpen}],attrs:{"id":_vm.accId}},[_c('button',{staticClass:"sky-accordion-title",attrs:{"tabindex":"0"},on:{"click":_vm.toggle}},[_vm._t("title")],2),_vm._v(" "),_c('SkyReveal',{attrs:{"open":_vm.isOpen}},[_c('div',{staticClass:"sky-accordion-content"},[_vm._t("default")],2)])],1)};
	var __vue_staticRenderFns__ = [];

	  /* style */
	  const __vue_inject_styles__ = function (inject) {
	    if (!inject) return
	    inject("data-v-77e14797_0", { source: "\n.sky-accordions{margin:0;padding:0\n}\n.sky-accordion{display:block;margin:0\n}", map: undefined, media: undefined });

	  };
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
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
	      if (style) {
	        hook = function(context) {
	          style.call(this, createInjector(context));
	        };
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
	  function __vue_create_injector__() {
	    const head = document.head || document.getElementsByTagName('head')[0];
	    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
	    const isOldIE =
	      typeof navigator !== 'undefined' &&
	      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

	    return function addStyle(id, css) {
	      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

	      const group = isOldIE ? css.media || 'default' : id;
	      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

	      if (!style.ids.includes(id)) {
	        let code = css.source;
	        let index = style.ids.length;

	        style.ids.push(id);

	        if (css.map) {
	          // https://developer.chrome.com/devtools/docs/javascript-debugging
	          // this makes source maps inside style tags work properly in Chrome
	          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
	          // http://stackoverflow.com/a/26603875
	          code +=
	            '\n/*# sourceMappingURL=data:application/json;base64,' +
	            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
	            ' */';
	        }

	        if (isOldIE) {
	          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
	        }

	        if (!style.element) {
	          const el = style.element = document.createElement('style');
	          el.type = 'text/css';

	          if (css.media) el.setAttribute('media', css.media);
	          if (isOldIE) {
	            el.setAttribute('data-group', group);
	            el.setAttribute('data-next-index', '0');
	          }

	          head.appendChild(el);
	        }

	        if (isOldIE) {
	          index = parseInt(style.element.getAttribute('data-next-index'));
	          style.element.setAttribute('data-next-index', index + 1);
	        }

	        if (style.element.styleSheet) {
	          style.parts.push(code);
	          style.element.styleSheet.cssText = style.parts
	            .filter(Boolean)
	            .join('\n');
	        } else {
	          const textNode = document.createTextNode(code);
	          const nodes = style.element.childNodes;
	          if (nodes[index]) style.element.removeChild(nodes[index]);
	          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
	          else style.element.appendChild(textNode);
	        }
	      }
	    }
	  }
	  /* style inject SSR */
	  

	  
	  var SkyAccordion = __vue_normalize__(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    __vue_create_injector__,
	    undefined
	  );

	const defaults = {
		registerComponents: true,
		accordionDefaults: {
			offset: 50,
			deeplink: false,
			closeOthersOnOpen: false, // if true, only one accordion will be open at a time
		},
	};

	var index = {
		install(Vue$$1, options) {
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
		},
	};

	exports.SkyAccordion = SkyAccordion;
	exports.default = index;

	return exports;

}({},Vue,skyReveal));
