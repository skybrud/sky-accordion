import Vue from 'vue';

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

export default SkyAccordionStore;