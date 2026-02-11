import{i as e}from"./def-BoP1xJxP.js";import{k as n,i as s}from"./iframe-DNHZNOPe.js";import{k as r}from"./constants-DLJ5wDyw.js";import"./preload-helper-PPVm8Dsz.js";const{fn:a}=__STORYBOOK_MODULE_TEST__,i=`html
// RouterLinkButton.vue
<script setup lang="ts">
import type { RouterLinkProps } from "vue-router";

import { KdsLinkButton, type KdsLinkButtonProps } from "@knime/kds-components";

export type RouterLinkButtonProps = Omit<KdsLinkButtonProps, "to"> & RouterLinkProps;

const props = defineProps<RouterLinkButtonProps>();
<\/script>

<template>
  <KdsLinkButton v-bind="props" />
</template>
`.trim(),p=`html
// NuxtLinkButton.vue
<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

import { KdsLinkButton, type KdsLinkButtonProps } from "@knime/kds-components";

export type NuxtLinkButtonProps = Omit<KdsLinkButtonProps, "to"> & NuxtLinkProps;

const props = defineProps<NuxtLinkButtonProps>();
<\/script>

<template>
  <KdsLinkButton v-bind="props" />
</template>
`.trim(),u={title:"Components/buttons/KdsLinkButton",component:s,tags:["autodocs"],parameters:{docs:{description:{component:`Same styles as \`KdsButton\`, but rendered as an \`<a>\` element. Does use \`RouterLink\`/\`NuxtLink\` if globally available.

For accurate typing, please wrap it in the consuming app like this:
#### Vue
\`\`\`${i}\`\`\`
#### Nuxt
\`\`\`${p}\`\`\``}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=345-19622"}},argTypes:{size:{control:{type:"select"},options:n},variant:{control:{type:"select"},options:r},destructive:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"},leadingIcon:{control:{type:"select"},options:[void 0,...e]},trailingIcon:{control:{type:"select"},options:[void 0,...e]},to:{control:"text",description:"any URL; passed to RouterLink/NuxtLink component if globally available"},ariaLabel:{control:"text"},title:{control:"text"}},args:{onClick:a()}},t={parameters:{docs:!1},args:{variant:"filled",label:"Button",to:"https://www.knime.com"}},o={parameters:{docs:!1},args:{variant:"filled",label:"Button",to:"https://www.knime.com",disabled:!0}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    variant: "filled",
    label: "Button",
    to: "https://www.knime.com"
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    variant: "filled",
    label: "Button",
    to: "https://www.knime.com",
    disabled: true
  }
}`,...o.parameters?.docs?.source}}};const k=["Filled","Disabled"];export{o as Disabled,t as Filled,k as __namedExportsOrder,u as default};
