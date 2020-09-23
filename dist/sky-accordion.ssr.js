'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

//
//
//
//
//
//
//

var script = {
	name: 'SkyAccordionWrapper',
	props: {
		active: {
			type: Boolean,
			default: false,
		},
	},
	data: function data() {
		return {
			// toggle + content HTML Element
			nodes: {},
			status: false,
		};
	},
	computed: {
		baseClass: function baseClass() {
			return ((this.$options.$SkyAccordion.settings.kebabName) + "-wrapper");
		},
		classes: function classes() {
			var obj;

			return [
				this.baseClass,
				( obj = {}, obj[((this.baseClass) + "--is-active")] = this.status, obj ) ];
		},
	},
	// status watcher - change toggle element when status changes
	watch: {
		active: function active(status) {
			if (status != null) {
				this.status = status;
			}
		},

		status: function status(newValue, oldValue) {
			var this$1 = this;

			this._emit('statusChange', { vm: this, status: newValue, oldStatus: oldValue });

			if (this.$parent.onlyOneActive === false) {
				newValue ? this.open() : this.close();
			} else if (newValue === true && oldValue === false) {
				var active = this.$parent.$children
					.filter(function (el) { return el.status && el._uid !== this$1._uid; });

				if (active.length) {
					active.forEach(function (el) {
						el.close();
					});
				}

				this.open();
			} else if (oldValue === true && newValue === false) {
				this.close();
			}
		},
	},

	// mounting

	mounted: function mounted() {
		var this$1 = this;

		this.nodes.toggle = this.$el.querySelector(("." + (this.$options.$SkyAccordion.settings.toggler)));
		this.nodes.content = this.$el.querySelector(("." + (this.$options.$SkyAccordion.settings.content)));
		this.$emit('afterNodesBinding', { vm: this, nodes: this.nodes });

		if (this.nodes.toggle !== null) {
			this.nodes.toggle.addEventListener('click', function () {
				this$1.toggle();
			});
		}

		if (this.active != null) {
			this.status = this.active;
		}
	},

	// collapse basic instance methods

	methods: {
		toggle: function toggle() {
			this._emit('beforeToggle', this);
			this.status = !this.status;
			this._emit('afterToggle', this);
		},
		close: function close() {
			this._emit('beforeClose', this);
			this.status = false;
			this._emit('afterClose', this);
		},
		open: function open() {
			this._emit('beforeOpen', this);
			this.status = true;
			this._emit('afterOpen', this);
		},
		_emit: function _emit(event, payload) {
			this.$emit(event, payload);
			this.$parent && this.$parent.$el.className.indexOf(((this.$options.$SkyAccordion.settings.kebabName) + "-group")) !== -1
				? this.$parent.$parent.$emit(event, payload)
				: this.$parent.$emit(event, payload);
		},
	},
};

/* script */
            var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes},[_vm._t("default",null,{isActive:_vm.status})],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-fae22f32";
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
    component.__file = "SkyAccordionWrapper.vue";

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
  

  
  var SkyAccordionWrapper = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$1 = {
	name: 'SkyAccordionGroup',
	props: {
		onlyOneActive: {
			default: false,
			type: Boolean,
		},
	},
	data: function data() {
		return {};
	},

	// computed props for accessing elements
	computed: {
		elements: function elements() {
			return this.$children;
		},
		elementsCount: function elementsCount() {
			return this.$children.length;
		},
		activeElements: function activeElements() {
			return this.$children.filter(function (el) { return el.status; });
		},
		inActiveElements: function inActiveElements() {
			return this.$children.filter(function (el) { return !el.status; });
		},
	},
	methods: {
		closeAll: function closeAll() {
			this.$children.forEach(function (el) {
				el.close();
			});
		},
		openAll: function openAll() {
			this.$children.forEach(function (el) {
				el.open();
			});
		},
	},
};

/* script */
            var __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sky-accordion-group"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = "data-v-2418e5e5";
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "SkyAccordionGroup.vue";

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
  

  
  var SkyAccordionGroup = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

// Default configuration
var kebabName = 'sky-accordion';
var pascalName = 'SkyAccordion';

var defaults = {
	kebabName: kebabName,
	pascalName: pascalName,
	toggler: (kebabName + "__toggler"),
	content: (kebabName + "__content"),
};

var SkyAccordion = {};
SkyAccordion.install = function install(Vue, options) {
	// merge configs

	var settings = Object.assign(defaults, options);

	// creating required components

	Vue.component(((settings.pascalName) + "Wrapper"), SkyAccordionWrapper);
	Vue.component(((settings.pascalName) + "Group"), SkyAccordionGroup);

	// creates instance of settings in the Vue

	Vue.mixin({
		created: function created() {
			this.$options.$SkyAccordion = {
				settings: settings,
			};
		},
	});

	// content directive

	Vue.directive(((settings.kebabName) + "-content"), {

		// assigning css classes from settings

		bind: function bind(el, binding, vnode) {
			vnode.elm.classList
				.add(vnode.context.$options.$SkyAccordion.settings.content);
		},
	});

	// toggler directive

	Vue.directive(((settings.kebabName) + "-toggle"), {

		// adding toggle class

		bind: function bind(el, binding, vnode) {
			vnode.elm.classList
				.add(vnode.context.$options.$SkyAccordion.settings.toggler);
		},

		// Creating custom toggler handler

		inserted: function inserted(el, binding, vnode) {
			if (binding.value != null) {
				vnode.elm.addEventListener('click', function () {
					vnode.context.$refs[binding.value].status =
						!vnode.context.$refs[binding.value].status;
				});
			}
		},
	});
};
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(SkyAccordion);
}

exports.default = SkyAccordion;
