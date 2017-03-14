<script>
import SkyReveal from 'sky-reveal';

export default {
	name: 'sky-accordion',
	components: {
		'sky-reveal': SkyReveal,
	},
	data() {
		return {
			open: false,
			id: Math.random().toString(35).substr(2, 5),
		};
	},
	methods: {
		toggle() {
			this.open = !this.open;
		},
	},
};
</script>

<style src="./sky-accordion.scss"></style>
<template src="./sky-accordion.html"></template>
