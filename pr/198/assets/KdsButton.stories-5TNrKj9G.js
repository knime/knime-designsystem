import{i as w}from"./def-BoP1xJxP.js";import{k as v,_ as e}from"./iframe-DNHZNOPe.js";import{a as f,c as F,b}from"./storybook-BgwB2tEM.js";import{k as n}from"./constants-DLJ5wDyw.js";import"./preload-helper-PPVm8Dsz.js";const{fn:q}=__STORYBOOK_MODULE_TEST__,z={title:"Components/buttons/KdsButton",component:e,tags:["autodocs"],parameters:{design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=345-19622"}},argTypes:{size:{control:{type:"select"},options:v},variant:{control:{type:"select"},options:n},destructive:{control:"boolean"},disabled:{control:"boolean"},label:{control:"text"},leadingIcon:{control:{type:"select"},options:[void 0,...w]},trailingIcon:{control:{type:"select"},options:[void 0,...w]},ariaLabel:{control:"text"},title:{control:"text"}},args:{onClick:q()}},a={args:{variant:"filled",label:"Button"}},s={args:{variant:"outlined",label:"Button"}},t={args:{variant:"transparent",label:"Button"}},o={args:{label:"Button",disabled:!0},render:A=>({components:{KdsButton:e},setup(){return{args:A,kdsButtonVariants:n}},template:`
      <KdsButton v-bind="args" :variant="variant" v-for="variant in kdsButtonVariants" :key="variant" style="margin-bottom: 10px;" />`})},i={args:{label:"Button",destructive:!0},render:A=>({components:{KdsButton:e},setup(){return{args:A,kdsButtonVariants:n}},template:`
      <KdsButton v-bind="args" :variant="variant" v-for="variant in kdsButtonVariants" :key="variant" style="margin-bottom: 10px;"/>`})},r={args:{label:"Button",variant:"outlined",leadingIcon:"ai-general",trailingIcon:"ai-general"}},l={args:{variant:"outlined",leadingIcon:"ai-general",ariaLabel:"Icon only button",title:"Icon only button"}},d={...f({component:e}),args:{label:"Button with veeery loooong label",variant:"outlined",leadingIcon:"ai-general",trailingIcon:"ai-general"}},m=F({component:e,designsToCompare:{label:{props:{label:"{Label}",variant:"outlined"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89691":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89976":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90261":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90546":{size:"xsmall"}}},leadingIcon:{props:{variant:"outlined",leadingIcon:"placeholder",ariaLabel:"Icon only button"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89762":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90047":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90332":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90617":{size:"xsmall"}}},leadingIconWithLabel:{props:{label:"{Label}",variant:"outlined",leadingIcon:"placeholder"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89833":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90118":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90403":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90688":{size:"xsmall"}}},trailingIconWithLabel:{props:{label:"{Label}",variant:"outlined",trailingIcon:"placeholder"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89904":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90189":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90474":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90759":{size:"xsmall"}}},leadingAndTrailingIcon:{props:{label:"{Label}",variant:"outlined",leadingIcon:"placeholder",trailingIcon:"placeholder"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197821":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197877":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197933":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197989":{size:"xsmall"}}},filled:{props:{label:"{Label}",variant:"filled",leadingIcon:"placeholder",trailingIcon:"placeholder"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197804":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197860":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197916":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197972":{size:"xsmall"}}},transparent:{props:{label:"{Label}",variant:"transparent",leadingIcon:"placeholder",trailingIcon:"placeholder"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197838":{size:"large"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197894":{size:"medium"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197950":{size:"small"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-198006":{size:"xsmall"}}}}}),c=b({component:e,combinationsProps:[{size:["xsmall"],variant:n,disabled:[!1,!0],destructive:[!1,!0],label:["Button"],leadingIcon:[void 0,"ai-general"],trailingIcon:[void 0,"ai-general"]},{size:["xsmall"],variant:n,disabled:[!1,!0],destructive:[!1,!0],leadingIcon:["ai-general"],ariaLabel:["Icon only button"]}],pseudoStates:["hover","active","focus-visible"]}),u=b({component:e,combinationsProps:[{size:["small"],variant:n,disabled:[!1,!0],destructive:[!1,!0],label:["Button"],leadingIcon:[void 0,"ai-general"],trailingIcon:[void 0,"ai-general"]},{size:["small"],variant:n,disabled:[!1,!0],destructive:[!1,!0],leadingIcon:["ai-general"],ariaLabel:["Icon only button"]}],pseudoStates:["hover","active","focus-visible"]}),g=b({component:e,combinationsProps:[{size:["medium"],variant:n,disabled:[!1,!0],destructive:[!1,!0],label:["Button"],leadingIcon:[void 0,"ai-general"],trailingIcon:[void 0,"ai-general"]},{size:["medium"],variant:n,disabled:[!1,!0],destructive:[!1,!0],leadingIcon:["ai-general"],ariaLabel:["Icon only button"]}],pseudoStates:["hover","active","focus-visible"]}),p=b({component:e,combinationsProps:[{size:["large"],variant:n,disabled:[!1,!0],destructive:[!1,!0],label:["Button"],leadingIcon:[void 0,"ai-general"],trailingIcon:[void 0,"ai-general"]},{size:["large"],variant:n,disabled:[!1,!0],destructive:[!1,!0],leadingIcon:["ai-general"],ariaLabel:["Icon only button"]}],pseudoStates:["hover","active","focus-visible"]});a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "filled",
    label: "Button"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outlined",
    label: "Button"
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "transparent",
    label: "Button"
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button",
    disabled: true
  },
  render: args => ({
    components: {
      KdsButton
    },
    setup() {
      return {
        args,
        kdsButtonVariants
      };
    },
    template: \`
      <KdsButton v-bind="args" :variant="variant" v-for="variant in kdsButtonVariants" :key="variant" style="margin-bottom: 10px;" />\`
  })
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button",
    destructive: true
  },
  render: args => ({
    components: {
      KdsButton
    },
    setup() {
      return {
        args,
        kdsButtonVariants
      };
    },
    template: \`
      <KdsButton v-bind="args" :variant="variant" v-for="variant in kdsButtonVariants" :key="variant" style="margin-bottom: 10px;"/>\`
  })
}`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button",
    variant: "outlined",
    leadingIcon: "ai-general",
    trailingIcon: "ai-general"
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outlined",
    leadingIcon: "ai-general",
    ariaLabel: "Icon only button",
    title: "Icon only button"
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsButton
  }),
  args: {
    label: "Button with veeery loooong label",
    variant: "outlined",
    leadingIcon: "ai-general",
    trailingIcon: "ai-general"
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsButton,
  designsToCompare: {
    label: {
      props: {
        label: "{Label}",
        variant: "outlined"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89691": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89976": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90261": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90546": {
          size: "xsmall"
        }
      }
    },
    leadingIcon: {
      props: {
        variant: "outlined",
        leadingIcon: "placeholder",
        ariaLabel: "Icon only button"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89762": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90047": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90332": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90617": {
          size: "xsmall"
        }
      }
    },
    leadingIconWithLabel: {
      props: {
        label: "{Label}",
        variant: "outlined",
        leadingIcon: "placeholder"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89833": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90118": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90403": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90688": {
          size: "xsmall"
        }
      }
    },
    trailingIconWithLabel: {
      props: {
        label: "{Label}",
        variant: "outlined",
        trailingIcon: "placeholder"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89904": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90189": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90474": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90759": {
          size: "xsmall"
        }
      }
    },
    leadingAndTrailingIcon: {
      props: {
        label: "{Label}",
        variant: "outlined",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197821": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197877": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197933": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197989": {
          size: "xsmall"
        }
      }
    },
    filled: {
      props: {
        label: "{Label}",
        variant: "filled",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197804": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197860": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197916": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197972": {
          size: "xsmall"
        }
      }
    },
    transparent: {
      props: {
        label: "{Label}",
        variant: "transparent",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197838": {
          size: "large"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197894": {
          size: "medium"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197950": {
          size: "small"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-198006": {
          size: "xsmall"
        }
      }
    }
  }
})`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsButton,
  combinationsProps: [{
    size: ["xsmall"],
    variant: kdsButtonVariants,
    disabled: [false, true],
    destructive: [false, true],
    label: ["Button"],
    leadingIcon: [undefined, "ai-general"],
    trailingIcon: [undefined, "ai-general"]
  }, {
    size: ["xsmall"],
    variant: kdsButtonVariants,
    disabled: [false, true],
    destructive: [false, true],
    leadingIcon: ["ai-general"],
    ariaLabel: ["Icon only button"]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsButton,
  combinationsProps: [{
    size: ["small"],
    variant: kdsButtonVariants,
    disabled: [false, true],
    destructive: [false, true],
    label: ["Button"],
    leadingIcon: [undefined, "ai-general"],
    trailingIcon: [undefined, "ai-general"]
  }, {
    size: ["small"],
    variant: kdsButtonVariants,
    disabled: [false, true],
    destructive: [false, true],
    leadingIcon: ["ai-general"],
    ariaLabel: ["Icon only button"]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsButton,
  combinationsProps: [{
    size: ["medium"],
    variant: kdsButtonVariants,
    disabled: [false, true],
    destructive: [false, true],
    label: ["Button"],
    leadingIcon: [undefined, "ai-general"],
    trailingIcon: [undefined, "ai-general"]
  }, {
    size: ["medium"],
    variant: kdsButtonVariants,
    disabled: [false, true],
    destructive: [false, true],
    leadingIcon: ["ai-general"],
    ariaLabel: ["Icon only button"]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsButton,
  combinationsProps: [{
    size: ["large"],
    variant: kdsButtonVariants,
    disabled: [false, true],
    destructive: [false, true],
    label: ["Button"],
    leadingIcon: [undefined, "ai-general"],
    trailingIcon: [undefined, "ai-general"]
  }, {
    size: ["large"],
    variant: kdsButtonVariants,
    disabled: [false, true],
    destructive: [false, true],
    leadingIcon: ["ai-general"],
    ariaLabel: ["Icon only button"]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...p.parameters?.docs?.source}}};const K=["Filled","Outlined","Transparent","Disabled","Destructive","LeadingAndTrailingIcon","IconOnly","TextOverflow","DesignComparator","AllCombinationsXsmall","AllCombinationsSmall","AllCombinationsMedium","AllCombinationsLarge"];export{p as AllCombinationsLarge,g as AllCombinationsMedium,u as AllCombinationsSmall,c as AllCombinationsXsmall,m as DesignComparator,i as Destructive,o as Disabled,a as Filled,l as IconOnly,r as LeadingAndTrailingIcon,s as Outlined,d as TextOverflow,t as Transparent,K as __namedExportsOrder,z as default};
