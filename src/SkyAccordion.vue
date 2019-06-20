<template>
    <li
        :id="accId"
        :class="['sky-accordion', {open : isOpen}]"
    >
        <button
            class="sky-accordion-title"
            tabindex="0"
            @click="toggle">

            <slot name="title" />
        </button>

        <SkyReveal :open="isOpen">
            <div class="sky-accordion-content">
                <slot />
            </div>
        </SkyReveal>
    </li>
</template>

<script src="./SkyAccordion.js"></script>
<style lang="scss" src="./SkyAccordion.scss"></style>
