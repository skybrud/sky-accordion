import SkyAccordionWrapper from './SkyAccordionWrapper.vue';
import SkyAccordionGroup from './SkyAccordionGroup.vue';

// Default configuration
const kebabName = 'sky-accordion';
const pascalName = 'SkyAccordion';

const defaults = {
	kebabName,
	pascalName,
	toggler: `${kebabName}__toggler`,
	content: `${kebabName}__content`,
};

const SkyAccordion = {};
SkyAccordion.install = function install(Vue, options) {
	// merge configs

	const settings = Object.assign(defaults, options);

	// creating required components

	Vue.component(`${settings.pascalName}Wrapper`, SkyAccordionWrapper);
	Vue.component(`${settings.pascalName}Group`, SkyAccordionGroup);

	// creates instance of settings in the Vue

	Vue.mixin({
		created() {
			this.$options.$SkyAccordion = {
				settings,
			};
		},
	});

	// content directive

	Vue.directive(`${settings.kebabName}-content`, {

		// assigning css classes from settings

		bind(el, binding, vnode) {
			vnode.elm.classList
				.add(vnode.context.$options.$SkyAccordion.settings.content);
		},
	});

	// toggler directive

	Vue.directive(`${settings.kebabName}-toggle`, {

		// adding toggle class

		bind(el, binding, vnode) {
			vnode.elm.classList
				.add(vnode.context.$options.$SkyAccordion.settings.toggler);
		},

		// Creating custom toggler handler

		inserted(el, binding, vnode) {
			if (binding.value != null) {
				vnode.elm.addEventListener('click', () => {
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
export default SkyAccordion;
