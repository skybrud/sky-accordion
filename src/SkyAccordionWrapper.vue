<template>
	<div :class="classes">
		<slot :isActive="status" />
	</div>
</template>

<script>
export default {
	name: 'SkyAccordionWrapper',
	props: {
		active: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			// toggle + content HTML Element
			nodes: {},
			status: false,
		};
	},
	computed: {
		baseClass() {
			return `${this.$options.$SkyAccordion.settings.kebabName}-wrapper`;
		},
		classes() {
			return [
				this.baseClass,
				{ [`${this.baseClass}--is-active`]: this.status },
			];
		},
	},
	// status watcher - change toggle element when status changes
	watch: {
		active(status) {
			if (status != null) {
				this.status = status;
			}
		},

		status(newValue, oldValue) {
			this._emit('statusChange', { vm: this, status: newValue, oldStatus: oldValue });

			if (this.$parent.onlyOneActive === false) {
				newValue ? this.open() : this.close();
			} else if (newValue === true && oldValue === false) {
				const active = this.$parent.$children
					.filter(el => el.status && el._uid !== this._uid);

				if (active.length) {
					active.forEach((el) => {
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

	mounted() {
		this.nodes.toggle = this.$el.querySelector(`.${this.$options.$SkyAccordion.settings.toggler}`);
		this.nodes.content = this.$el.querySelector(`.${this.$options.$SkyAccordion.settings.content}`);
		this.$emit('afterNodesBinding', { vm: this, nodes: this.nodes });

		if (this.nodes.toggle !== null) {
			this.nodes.toggle.addEventListener('click', () => {
				this.toggle();
			});
		}

		if (this.active != null) {
			this.status = this.active;
		}
	},

	// collapse basic instance methods

	methods: {
		toggle() {
			this._emit('beforeToggle', this);
			this.status = !this.status;
			this._emit('afterToggle', this);
		},
		close() {
			this._emit('beforeClose', this);
			this.status = false;
			this._emit('afterClose', this);
		},
		open() {
			this._emit('beforeOpen', this);
			this.status = true;
			this._emit('afterOpen', this);
		},
		_emit(event, payload) {
			this.$parent && this.$parent.$el.className.indexOf(`${this.$options.$SkyAccordion.settings.kebabName}-group`) !== -1
				? this.$parent.$parent.$emit(event, payload)
				: this.$parent.$emit(event, payload);
		},
	},
};
</script>

<style src="./SkyAccordion.scss"></style>
