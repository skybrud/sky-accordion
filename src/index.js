import SkyAccordion from './SkyAccordion.vue';

const defaults = {
	registerComponents: true,
	accordionDefaults: {
		offset: 50,
		deeplink: false,
		closeOthersOnOpen: false, // if true, only one accordion will be open at a time
	},
};

export { SkyAccordion };

export default function install(Vue, options) {
	if (install.installed === true) {
		return;
	}

	const { registerComponents, accordionDefaults } = Object.assign({}, defaults, options);

	if (registerComponents) {
		Vue.component(SkyAccordion.name, Object.assign(
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
};
