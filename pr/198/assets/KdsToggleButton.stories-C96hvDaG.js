import{i as r}from"./def-BoP1xJxP.js";import{k as o,m as l}from"./iframe-DNHZNOPe.js";import{b as u}from"./storybook-BgwB2tEM.js";import{a as s}from"./constants-DLJ5wDyw.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:p}=__STORYBOOK_MODULE_PREVIEW_API__,{fn:m}=__STORYBOOK_MODULE_TEST__,g=`html
<script setup lang="ts">
import { ref } from "vue";

const isExpanded = ref(false);
<\/script>

<template>
  <KdsToggleButton v-model="isExpanded" />
</template>
`.trim(),_={title:"Components/buttons/KdsToggleButton",component:l,tags:["autodocs"],parameters:{docs:{description:{component:`Same styles as \`KdsButton\`, but with an on/off state. Compared to \`Chips\`, this component is used to trigger an action like open popover or change a view. Used in Rich Text Editor or as Base for Vertical Menu.

Can be used with \`v-model\`:
\`\`\`${g}\`\`\`
`}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5958-176469"}},argTypes:{size:{control:{type:"select"},options:o},variant:{control:{type:"select"},options:s},disabled:{control:"boolean"},label:{control:"text"},leadingIcon:{control:{type:"select"},options:[void 0,...r]},trailingIcon:{control:{type:"select"},options:[void 0,...r]},ariaLabel:{control:"text"},title:{control:"text"},modelValue:{control:{type:"boolean"}}},args:{"onUpdate:modelValue":m()},decorators:[i=>{const[d,c]=p();return{components:{story:i},setup(){return{args:d,updateArgs:c}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},e={parameters:{docs:!1},args:{variant:"outlined",label:"Button"}},a={parameters:{docs:!1},args:{variant:"transparent",label:"Button"}},t={parameters:{docs:!1},args:{variant:"outlined",label:"Button",disabled:!0}},n=u({parameters:{chromatic:{disableSnapshot:!0}},component:l,combinationsProps:[{size:o,variant:s,disabled:[!1,!0],label:["Button"],leadingIcon:[void 0,"ai-general"],trailingIcon:[void 0,"ai-general"],modelValue:[!1,!0]},{size:o,variant:s,disabled:[!1,!0],leadingIcon:["ai-general"],ariaLabel:["Icon only button"],modelValue:[!1,!0]}],pseudoStates:["hover","active","focus-visible"]});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    variant: "outlined",
    label: "Button"
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    variant: "transparent",
    label: "Button"
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    variant: "outlined",
    label: "Button",
    disabled: true
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  component: KdsToggleButton,
  combinationsProps: [{
    size: kdsSizes,
    variant: kdsToggleButtonVariants,
    disabled: [false, true],
    label: ["Button"],
    leadingIcon: [undefined, "ai-general"],
    trailingIcon: [undefined, "ai-general"],
    modelValue: [false, true]
  }, {
    size: kdsSizes,
    variant: kdsToggleButtonVariants,
    disabled: [false, true],
    leadingIcon: ["ai-general"],
    ariaLabel: ["Icon only button"],
    modelValue: [false, true]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...n.parameters?.docs?.source}}};const T=["Outlined","Transparent","Disabled","AllCombinations"];export{n as AllCombinations,t as Disabled,e as Outlined,a as Transparent,T as __namedExportsOrder,_ as default};
