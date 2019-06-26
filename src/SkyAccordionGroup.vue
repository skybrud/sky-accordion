<template>
	<div class="sky-accordion-group">
		<slot/>
	</div>
</template>

<script>
export default {
	name: 'SkyAccordionGroup',
	props: {
		onlyOneActive: {
			default: false,
			type: Boolean,
		},
	},
	data() {
		return {};
	},

	// computed props for accessing elements
	computed: {
		elements() {
			return this.$children;
		},
		elementsCount() {
			return this.$children.length;
		},
		activeElements() {
			return this.$children.filter(el => el.status);
		},
		inActiveElements() {
			return this.$children.filter(el => !el.status);
		},
	},
	methods: {
		closeAll() {
			this.$children.forEach((el) => {
				el.close();
			});
		},
		openAll() {
			this.$children.forEach((el) => {
				el.open();
			});
		},
	},
};
</script>
