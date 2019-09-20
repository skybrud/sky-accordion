> SkyAccordion - a flexible accordion plugin for Vue.js 2, build on vue2-collapse

## Animations !important
This module has no bias towards how animations should be done or what library to use. The Exampels in the bottom of this document shows how to use the incredible static CSS solution as well as how to implement GSAP animations

**Table of contents**
---
- [Getting started](#getting-started)
	- [Quick start](#quick-start)
	- [Usage](#usage)
		- [Basic example](#basic-example)
		- [Grouping elements](#grouping-elements)
		- [Custom toggle element](#custom-toggle-element)
		- [Nesting](#nesting)
- [Plugin](#plugin)
	- [Components](#components)
		- [sky-accordion-wrapper](#sky-accordion-wrapper)
			- [Methods](#methods)
				- [Usage](#usage-1)
			- [Events](#events)
				- [Usage](#usage-2)
			- [Custom properties](#custom-properties)
				- [Usage](#usage-3)
			- [Data properties](#data-properties)
		- [sky-accordion-group](#sky-accordion-group)
			- [Computed properties](#computed-properties)
			- [Custom properties](#custom-properties-1)
			- [Methods](#methods-1)
				- [Usage](#usage-4)
	- [Directives](#directives)
		- [v-sky-accordion-content](#v-sky-accordion-content)
		- [v-sky-accordion-toggle](#v-sky-accordion-toggle)
- [Examples](#examples)
	- [Accordion](#accordion)
	- [Accordion with closeAll + openAll option](#accordion-with-closeall--openall-option)
	- [Single wrapper with header toggle + external button toggle](#single-wrapper-with-header-toggle--external-button-toggle)
	- [Accordion GSAP TweenLite animation](#accordion-gsap-tweenlite-animation)
	- [Single wrapper GSAP Tweelite animation](#single-wrapper-gsap-tweelite-animation)
	- [CSS only animation](#css-only-animation)
- [Todo](#todo)

# Getting started
## Quick start

In order to make the plugin work we need to download necessary dependencies.

``` bash
yarn add sky-accordion
```

Next thing to do is adding the plugin to the Vue.

``` javascript
// Import Vue and sky-accordion
import Vue from 'vue'
import SkyAccordion from 'sky-accordion'

// Loading the plugin into the Vue.
Vue.use(SkyAccordion)
```

## Usage

### Basic example
Every collapse element requires the `<sky-accordion-wrapper></sky-accordion-wrapper>` component which represent single accordion element.

``` html
<sky-accordion-wrapper>
    <div class="header" v-sky-accordion-toggle>
        Click me to toggle content
    </div>
    <div class="my-content" v-sky-accordion-content>
        This is hiddend content
    </div>
</sky-accordion-wrapper>
```

The div element with `header` class thanks to `v-sky-accordion-toggle` directive will be a clickable element which will show and hide the content. Applying `v-sky-accordion-content` to the element with `content` class binds it with the toggle element. While clicking on the header element, the content will be toggled.


### Grouping elements

SkyAccordion allows to wrap more elements into a group components `<sky-accordion-group></sky-accordion-group>`, which helps with code organisation and provides some additional functionality.

``` html
<sky-accordion-group :only-one-active="true">
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
</sky-accordion-group>
```
**By the default, each element will stay opened after toggle action, however setting the `only-one-active` to `true` will prevent group from opening more than one element at the same time- same behaviour as non-grouped elements.**
### Custom toggle element

In some cases developers need to create a custom toggle element which not necessarily has to rendered within the wrapper element. SkyAccordion provides a solution for that cases. Thanks to Vue's API `ref` we can assign an external (located outside the wrapper) toggler.

``` html
<button sky-accordion-toggle="'toggleFirst'">Toggle first element</button>
<button sky-accordion-toggle="'toggleSecond'">Toggle second element</button>

<sky-accordion-wrapper ref="toggleFirst">
    <div class="my-content" v-sky-accordion-content>
        This is hiddend content
    </div>
</sky-accordion-wrapper>
<sky-accordion-wrapper ref="toggleSecond">
    <div class="content" v-sky-accordion-content>
        This is hiddend content
    </div>
</sky-accordion-wrapper>
```

**Notice:**  the `v-sky-accordion-toggle` directive was removed from the `v-sky-accordion-wrapper` component, but it is **valid** to keep secondary toggler within the wrapper.


### Nesting
SkyAccordion allows nesting elements inside each other. The nested element should be rendered within the `v-sky-accordion-content` directive element.

``` html
<sky-accordion-wrapper>
    <div class="header" v-sky-accordion-toggle>
        Click me to toggle content
    </div>
    <div class="content" v-sky-accordion-content>
        <sky-accordion-wrapper>
            <div class="header" v-sky-accordion-toggle>
                Click toggle to toggle content
            </div>
            <div class="content" v-sky-accordion-content>
                This is hiddend content
            </div>
        </sky-accordion-wrapper>
    </div>
</sky-accordion-wrapper>
```

# Plugin
## Components
In this section of documentation you will find more detailed description the plugin. Each custom component provides its own events and methods which can be used in order to extend functionality.

### sky-accordion-wrapper
Wrapper component which should **always** be a parent of elements which are using the `v-sky-accordion-content ` directive and the `v-sky-accordion-toggle` directive (unless the toggle is used with a reference to a `sky-accordion-wrapper` as showcased in the [Custom toggle element](#custom-toggle-element) section).
Each of the `sky-accordion-wrapper` component instances can use following methods, events and stores data, which can be used to perform custom actions.

#### Methods

| Method        | Description |  Parameters |
| ------------- |:-------------:|:-------------:|
| `.open()`    | Open the instance | none
| `.close()`      | Close the instance| none
| `.toggle()` |   Toggle instance (opens if closed, closes if opened)  | none

##### Usage

In this example we are going to create a custom method which will be responsible for opening a referred element. In order to get the instance of the component we are using `ref` once again.

Template:
``` html
<sky-accordion-wrapper ref="openMe">
    <div class="content" v-sky-accordion-content>
        This is hiddend content
    </div>
</sky-accordion-wrapper>
```

Vue instance:
``` javascript
module.exports = {
    ...
    methods : {
        triggerReferedElement : function(){
            this.$refs.openMe.open();
        }
    }
    ...
}
```

You can also make a reference of group component, that allows you to perform actions on multiple elements without creating multiple refs.

Template:
``` html
<sky-accordion-group ref="mygroup">
    <sky-accordion-wrapper>
        <div class="my-content" v-sky-accordion-content>
            This is hiddend content
        </div>
    </sky-accordion-wrapper>
    <sky-accordion-wrapper>
        <div class="my-content" v-sky-accordion-content>
            This is hiddend content
        </div>
    </sky-accordion-wrapper>
</sky-accordion-group>
```

Vue instance:
``` javascript
module.exports = {
    ...
    methods : {
            openSecond : function(){
                this.$refs.mygroup.elements[1].open(); // opens second element
            }
        }
    ...
}
```

#### Events

| Event name        |   Arguments passed  | Description |
| ------------- |:-------------: |:-------------:|
| `beforeToggle`  | `vm {Object}` | Invoked before toggle action, returns component instance object|
| `afterToggle`  | `vm {Object}`| Invoked after toggle action, returns component instance object|
| `beforeClose` |  `vm {Object}`| Invoked before close action, returns component instance object|
| `afterClose` | `vm {Object}`| Invoked after close action, returns component instance object|
| `beforeOpen` |  `vm {Object}`| Invoked before open action, returns component instance object|
| `afterOpen` |  `vm {Object}`| Invoked before close action, returns component instance object|
| `afterNodesBinding` |  `vm {Object}, nodes {Object}`| Invoked during mount event in the component, returns component instance and nodes object with toggle and content DOM elements|
| `onStatusChange` |  `vm {Object}, new_status {Boolean}, old_status {Boolean}`| Invoked whenever status of the element changes from open to close (true is opened, false is closed)|

##### Usage
Events work the same way it is presented in official Vue documentation.

Template:
``` html
    <sky-accordion-wrapper v-on:beforeClose="myCustomAction">
         <div class="header" v-sky-accordion-toggle>
             Click me to toggle content
         </div>
        <div class="my-content" v-sky-accordion-content>
            This is hiddend content
        </div>
    </sky-accordion-wrapper>
```

Vue instance:
``` javascript
module.exports = {
    ...
    methods : {
            myCustomAction : function(vm){
                console.log(vm); // logs component object before closing itself
            }
        }
    ...
}
```

#### Custom properties

Vue collapse wrapper for now accepts only one custom property- `active` which is used for changing the status of the accordion element.

| Custom property | Type |  Description |
| ------------- |:-------------:|:-------------:|
| `v-bind:active`    | Boolean | Changes the default status of the element while rendering.

**Notice:**  the `v-bind:active` property overrides the default status of element, however the default behaviour of the accordion is **not** changed. Setting `:active="true"` to every element of the accordion list which is using `:only-one-active="true"` property on the group component will outcome with opening only the first element.

##### Usage
The status of the collapse element will be set to true while rendering.

Template:
``` html
    <sky-accordion-wrapper  :active="true">
         <div class="header" v-sky-accordion-toggle>
             Click me to toggle content
         </div>
        <div class="my-content" v-sky-accordion-content>
            This is hiddend content
        </div>
    </v-collapse-wrapper>
```

The property is reactive so it can be used for more complex usage as well.

#### Data properties

Every wrapper component stores necessary data properties, which can be used while extending plugin to own needs.

| Data property | Type |  Description |
| ------------- |:-------------:|:-------------:|
| `nodes`    | {Object} | Object stores DOM elements for toggler and the content.
| `nodes.toggle`    | {Dom node} | HTML DOM element represents toggler element for the wrapper component.
| `nodes.content`    | {Dom node} | HTML DOM element represents content element of the wrapper component.
| `status`      |{Boolean}| The status of the component. Status decides whether element is toggled or not.


### sky-accordion-group

This is a group component. Sometimes there is a need of creating several different accordion lists. Grouping list elements helps with this and other different cases.


``` html
<sky-accordion-group :only-one-active="true">
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
</sky-accordion-group>

<sky-accordion-group>
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
    <sky-accordion-wrapper> ... </sky-accordion-wrapper>
</sky-accordion-group>
```

First collapse group will allow only one element to be opened at the same time, while the second group can open all of the elements at the same time.

#### Computed properties

| Computed property | Type |  Description |
| ------------- |:-------------:|:-------------:|
| `elements`    | Array | Returns the array of `sky-accordion-wrapper` objects in the group.
| `elementsCount`    | Integer | Returns the length of elements array.
| `activeElements`    | Array | Returns the array of the **active** `sky-accordion-wrapper` objects in the group.
| `inActiveElements`    | Array | Returns the array of the **in-active** `sky-accordion-wrapper` objects in the group.

#### Custom properties

| Custom property | Type |  Description |
| ------------- |:-------------:|:-------------:|
| `v-bind:only-one-active`    | Boolean | Allow only one accordion element to be opend (`status: true`).


#### Methods

| Method        | Description |  Parameters |
| ------------- |:-------------:|:-------------:|
| `.openAll()`    | Open all instances of `sky-accordion-wrapper` component within group | none
| `.closeAll()`      | Close all instances of `sky-accordion-wrapper` component within group| none

##### Usage

Template:
``` html
<sky-accordion-wrapper ref="mygroup">
    <sky-accordion-wrapper>
        <div class="my-content" v-sky-accordion-content>
            This is hiddend content
        </div>
    </sky-accordion-wrapper>
    <sky-accordion-wrapper>
        <div class="my-content" v-sky-accordion-content>
            This is hiddend content
        </div>
    </sky-accordion-wrapper>
</sky-accordion-wrapper>
```

Vue instance:
``` javascript
module.exports = {
    ...
    methods : {
            openAll : function(){
                this.$refs.mygroup.openAll(); // opens all elements
            }
        }
    ...
}
```

## Directives

### v-sky-accordion-content
This directive ought to be applied on the DOM element which will contain content of single list element. **Only** this element will be able to be toggled on and off within wrapper component. Element with this directive should **not** be a parent of the element with `v-sky-accordion-toggle` directive.

### v-sky-accordion-toggle
The directive changes  a default behavior of the element and allows to click on it in order to toggle list element. Note that this directive should be located within the `<sky-accordion-wrapper></sky-accordion-wrapper>` in order to make it working without manual binding.
However if there is a need to create the toggle element somewhere else, not inside the wrapper component you can use vue's reference to make it work.

# Examples

## Accordion
```html
<SkyAccordionGroup
    ref="mygroup"
    :only-one-active="false"
>
    <SkyAccordionWrapper>
        <template slot-scope="{ isActive }">
            <div
                class="header"
                v-sky-accordion-toggle
            >
                Click me to toggle content {{ isActive }}
            </div>
            <div
                class="my-content"
                v-sky-accordion-content
            >
                Lorem ipsum dolor sit amet adipisicing elit. Et, quod architecto.
                Lorem ipsum dolor sit amet adipisicing elit. Et, quod architecto.
            </div>
        </template>
    </SkyAccordionWrapper>
    <SkyAccordionWrapper>
        <div
            class="header"
            v-sky-accordion-toggle
        >
            ToggleButton
        </div>
        <div
            class="my-content"
            v-sky-accordion-content
        >
            Toggle content
        </div>
    </SkyAccordionWrapper>
</SkyAccordionGroup>
```

## Accordion with closeAll + openAll option
```javascript
export default {
    name: 'ParentComponent',
    methods: {
        closeAll() {
            this.$refs.mygroup.closeAll();
        },
        openAll() {
            this.$refs.mygroup.openAll();
        },
    },
}
```


```html
<ParentComponent>
    <button @click="closeAll()">close all</button>
    <button @click="openAll()">open all</button>

    <SkyAccordionGroup
        ref="mygroup"
        :only-one-active="false"
    >
        <SkyAccordionWrapper>
            <template slot-scope="{ isActive }">
                <div
                    class="header"
                    v-sky-accordion-toggle
                >
                    Click me to toggle content {{ isActive }}
                </div>
                <div
                    class="my-content"
                    v-sky-accordion-content
                >
                    Lorem ipsum dolor sit amet adipisicing elit. Et, quod architecto.
                    Lorem ipsum dolor sit amet adipisicing elit. Et, quod architecto.
                </div>
            </template>
        </SkyAccordionWrapper>
        <SkyAccordionWrapper>
            <div
                class="header"
                v-sky-accordion-toggle
            >
                ToggleButton
            </div>
            <div
                class="my-content"
                v-sky-accordion-content
            >
                Toggle content
            </div>
        </SkyAccordionWrapper>
    </SkyAccordionGroup>
</ParentComponent>
```


## Single wrapper with header toggle + external button toggle
```html
<button v-sky-accordion-toggle="'singleton'">singleton wrapper</button>

<SkyAccordionWrapper ref="singleton">
    <div
        class="header"
        v-sky-accordion-toggle
    >
        Click me to toggle content
    </div>
    <div
        class="my-content"
        v-sky-accordion-content
    >
        <p>
            Lorem ipsum dolor sit amet adipisicing elit. Et, quod architecto.
            Lorem ipsum dolor sit amet adipisicing elit. Et, quod architecto.
            Lorem ipsum dolor sit amet adipisicing elit. Et, quod architecto.
        </p>
    </div>
</SkyAccordionWrapper>
```


## Accordion GSAP TweenLite animation
```javascript
// This import way ensures SSR executes without errors
const GSAP = {};

if (typeof window !== 'undefined') {
    GSAP.TweenLite = require('gsap/all').TweenLite;
    GSAP.CSSPlugin = require('gsap/all').CSSPlugin;
}

export default {
    name: 'ParentComponent',
    mounted() {
        this.$on('statusChange', (payload) => {
            payload.status
                ? this.tweenOpen(payload.vm.nodes.content)
                : this.tweenClose(payload.vm.nodes.content);
        });

        this.$refs.mygroup.inActiveElements.forEach((el) => {
            this.tweenSet(el.nodes.content, 0);
        });
    },
    methods: {
        closeAll() {
            this.$refs.mygroup.closeAll();
        },
        openAll() {
            this.$refs.mygroup.openAll();
        },
        tweenOpen(element) {
            // Enable animation to height auto.
            this.tweenSet(element, 'auto');

            GSAP.TweenLite.from(
                element,
                0.3,
                { height: 0 },
            );
        },
        tweenClose(element) {
            GSAP.TweenLite.to(
                element,
                0.3,
                { height: 0 },
            );
        },
        tweenSet(element, height) {
            GSAP.TweenLite.set(element, { height });
        },
    },
}
```


## Single wrapper GSAP Tweelite animation
```javascript
// This import way ensures SSR executes without errors
const GSAP = {};

if (typeof window !== 'undefined') {
    GSAP.TweenLite = require('gsap/all').TweenLite;
    GSAP.CSSPlugin = require('gsap/all').CSSPlugin;
}

export default {
    name: 'ParentComponent',
    mounted() {
        this.$on('statusChange', (payload) => {
            payload.status
                ? this.tweenOpen(payload.vm.nodes.content)
                : this.tweenClose(payload.vm.nodes.content);
        });

        if (this.$refs.singleton && !this.$refs.singleton.status) {
            this.tweenSet(this.$refs.singleton.nodes.content, 0);
        }
    },
    methods: {
        close() {
            this.$refs.singleton.close();
        },
        open() {
            this.$refs.singleton.open();
        },
        tweenOpen(element) {
            this.tweenSet(element, 'auto');

            GSAP.TweenLite.from(
                element,
                0.3,
                { height: 0 },
            );
        },
        tweenClose(element) {
            GSAP.TweenLite.to(
                element,
                0.3,
                { height: 0 },
            );
        },
        tweenSet(element, height) {
            GSAP.TweenLite.set(element, { height });
        },
    },
}
```


## CSS only animation
```css
.sky-accordion-content {
    max-height: 0;
    transition: max-height 0.3s ease-out;
    overflow: hidden;
}

.sky-accordion-wrapper--is-active .sky-accordion-content {
    transition: max-height 0.3s ease-in;
    max-height: 500px;
}
```

# Todo
- implement [a11y](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/accordion/accordion.html)
- deeplinkage support (determine if to be inside or outside module)