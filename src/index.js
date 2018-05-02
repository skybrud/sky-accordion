import SkyAccordion from './SkyAccordion.vue';

const defaults = {
	registerComponents: true,
};

export { SkyAccordion };

export default {
	install(Vue, options) {
		const { registerComponents } = Object.assign({}, defaults, options);

		if (registerComponents) {
			Vue.component(SkyAccordion.name, SkyAccordion);
		}
	},
};