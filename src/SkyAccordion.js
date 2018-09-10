import { SkyReveal } from 'sky-reveal';
import SkyAccordionStore from './SkyAccordionStore';

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
