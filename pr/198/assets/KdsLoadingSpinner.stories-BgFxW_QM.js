import{k as t,f as n}from"./iframe-wnIQFRtP.js";import{b as m,c as p}from"./storybook-vnuYObB_.js";import"./preload-helper-PPVm8Dsz.js";const d=["onSurface","onPrimary"],u={title:"Components/accessories/KdsLoadingSpinner",component:n,tags:["autodocs"],parameters:{docs:{description:{component:"A loading spinner component that displays an animated circular progress indicator. It supports different sizes and color variants for use on different backgrounds."}}},argTypes:{size:{control:{type:"select"},options:t,description:"The size of the loading spinner",table:{category:"Props",type:{summary:"xsmall | small | medium | large"},defaultValue:{summary:"medium"}}},variant:{control:{type:"select"},options:d,description:"The color variant of the spinner",table:{category:"Props",type:{summary:"onSurface | onPrimary"},defaultValue:{summary:"onSurface"}}}},args:{size:"medium",variant:"onSurface"}},e={args:{size:"medium",variant:"onSurface"}},s={args:{variant:"onPrimary"},render:r=>({components:{KdsLoadingSpinner:n},setup(){return{args:r}},template:`
      <div style="background: var(--kds-color-background-primary-bold-initial); padding: 20px; display: inline-block;">
        <KdsLoadingSpinner v-bind="args" />
      </div>
    `})},o={render:r=>({components:{KdsLoadingSpinner:n},setup(){return{args:r,kdsSizes:t}},template:`
      <div style="display: flex; gap: 20px; align-items: center;">
        <div v-for="size in kdsSizes" :key="size" style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsLoadingSpinner v-bind="args" :size="size" />
          <span style="font-size: 12px; color: var(--kds-color-text-and-icon-subtle);">{{ size }}</span>
        </div>
      </div>
    `})},i=m({component:n,combinationsProps:[{size:t,variant:d}],pseudoStates:[]}),a=p({component:n,designsToCompare:{onSurface:{props:{variant:"onSurface"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1148-4371":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180241":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180289":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11810-180337":{size:"xsmall"}}},onPrimary:{props:{variant:"onPrimary"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-8786":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180238":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180286":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11810-180334":{size:"xsmall"}}}}});e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    size: "medium",
    variant: "onSurface"
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "onPrimary"
  },
  render: args => ({
    components: {
      KdsLoadingSpinner
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="background: var(--kds-color-background-primary-bold-initial); padding: 20px; display: inline-block;">
        <KdsLoadingSpinner v-bind="args" />
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      KdsLoadingSpinner
    },
    setup() {
      return {
        args,
        kdsSizes
      };
    },
    template: \`
      <div style="display: flex; gap: 20px; align-items: center;">
        <div v-for="size in kdsSizes" :key="size" style="display: flex; flex-direction: column; gap: 8px; align-items: center;">
          <KdsLoadingSpinner v-bind="args" :size="size" />
          <span style="font-size: 12px; color: var(--kds-color-text-and-icon-subtle);">{{ size }}</span>
        </div>
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsLoadingSpinner,
  combinationsProps: [{
    size: kdsSizes,
    variant: kdsLoadingSpinnerVariants
  }],
  pseudoStates: [] // no hover/focus/active states for this component
})`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsLoadingSpinner,
  designsToCompare: {
    onSurface: {
      props: {
        variant: "onSurface"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1148-4371": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180241": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180289": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11810-180337": {
          size: "xsmall"
        }
      }
    },
    onPrimary: {
      props: {
        variant: "onPrimary"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-8786": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180238": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11804-180286": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11810-180334": {
          size: "xsmall"
        }
      }
    }
  }
})`,...a.parameters?.docs?.source}}};const y=["Default","OnPrimary","Sizes","AllCombinations","DesignComparator"];export{i as AllCombinations,e as Default,a as DesignComparator,s as OnPrimary,o as Sizes,y as __namedExportsOrder,u as default};
