<script>
import { SkyReveal } from '../node_modules/sky-reveal/src/';

const defaultConfig = {
	offset: 50,
	deeplink: false,
};

export default {
	name: 'SkyAccordion',
	components: { SkyReveal },
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
			config: Object.assign({}, defaultConfig, this.options),
			pageYOffset: 0,
			deepLinked: false,
			isOpen: this.open,
			accId: null,
		};
	},
	beforeMount() {
		// Assign external id to accId, if external Id is undefined generate random Id if accId is null
		this.accId = this.id && this.id.toString();

		this.deepLinked = this.accId === window.location.hash.substr(1);

		this.isOpen = this.deepLinked
			? this.deepLinked
			: this.isOpen;
	},
	mounted() {
		if (this.deepLinked) {
			this.pageYOffset = this.currentYOffset(this.$el);

			this.$nextTick(() => {
				this.scroll(this.pageYOffset);
			});
		}
	},
	methods: {
		currentYOffset(el) {
			return el.getBoundingClientRect().top + window.pageYOffset - this.config.offset;
		},
		scroll(yPosition) {
			window.scrollTo(0, yPosition);
		},
		toggle() {
			this.isOpen = !this.isOpen;

			if (this.config.deeplink && this.id) {
				window.history.replaceState(undefined, undefined, `#${this.id}`);
			}
		},
	},
};
</script>

<style src="./SkyAccordion.scss"></style>
<template src="./SkyAccordion.html"></template>
