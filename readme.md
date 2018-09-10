# sky-accordion
> JS module for grouping collapsing content - uses sky-reveal as collapse/expand engine

## Installation
```bash
npm install sky-accordion
```
or
```bash
yarn add sky-accordion
```

## Usage
Begin by importing and installing the SkyAccordion Vue plugin:
```js
import Vue from 'vue';
import SkyAccordion from 'sky-accordion';

// If you want to use the baseline scss add the following line
import '${YOUR-PROJECT-ROOT-PATH}/node_modules/sky-accordion/src/SkyAccordion.scss';

Vue.use(SkyAccordion, {
	registerComponents: true, // Whether or not to auto-register <SkyAccordion /> component
	accordionDefaults: {
		offset: 50, // pixel offset when scrolling to
		deeplink: false, // deeplinkable (using #accordionId)
		closeOthersOnOpen: false, // if true, only one accordion will be open at a time
	},
});

```
The `<sky-accordion>` component registers globally and can now be used.

Basic example:
``` html
<ul class="skyAccordions">
	<sky-accordion>
		<span slot="title">Accordion 1</span>
		<p>This is our accordion</p>
	</sky-accordion>
	<sky-accordion>
		<span slot="title">Accordion 2</span>
		<p>This is our accordion</p>
	</sky-accordion>
	<sky-accordion>
		<span slot="title">Accordion 3</span>
		<p>This is our accordion</p>
	</sky-accordion>
	<sky-accordion>
		<span slot="title">Accordion 4</span>
		<p>This is our accordion</p>
	</sky-accordion>
	<sky-accordion>
		<span slot="title">Accordion 5</span>
		<p>This is our accordion</p>
	</sky-accordion>
</ul>
```

## Misc
Make sure to define collapsed content preview size by setting `min-height` in css.
##### Example
```css
// auto is for no preview - insert pixel or vh/vw value in order to preview some content.
.skyAccordion .skyReveal-content {
    min-height: auto;
}

// Adjust preview gradient
.skyAccordion .skyReveal-content:after {
    /* Other desired styling changes */
    background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
}
```

# Credits
This module is made by the Frontenders at [skybrud.dk](http://www.skybrud.dk/). Feel free to use it in any way you want. Feedback, questions and bugreports should be posted as issues. Pull-requests appreciated!
