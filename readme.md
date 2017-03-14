# sky-accordion
> JS module for grouping collapsing content - uses sky-reveal as collapse/expand engine

## Dependencies
- [sky-reveal](https://github.com/skybrud/sky-reveal)
- [TweenLite](https://github.com/greensock/GreenSock-JS)

## Usage
Import sky-accordion
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