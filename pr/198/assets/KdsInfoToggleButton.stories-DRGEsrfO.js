import{b as g,c as b}from"./storybook-vnuYObB_.js";import{g as l}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:f}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:p,userEvent:u,within:w}=__STORYBOOK_MODULE_TEST__,y={title:"Components/buttons/KdsInfoToggleButton",component:l,tags:["autodocs"],parameters:{docs:{description:{component:"Triggers a popover or action that shows more information. Used for configuration settings, nodes and eChart templates."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11279-92915"}},argTypes:{modelValue:{control:{type:"boolean"},table:{category:"Model"}},disabled:{control:"boolean"},hidden:{control:"boolean"}},args:{modelValue:!1,hidden:!1},decorators:[n=>{const[m,e]=f();return{components:{story:n},setup(){return{args:m,onUpdateModelValue:c=>{m["onUpdate:modelValue"]?.(c),e({modelValue:c})}}},template:`<story :disabled="args.disabled" :hidden="args.hidden" :title="args.title" :icon="args.icon" :model-value="args.modelValue" v-on="{ 'update:modelValue': onUpdateModelValue }" />`}}]},s={parameters:{docs:!1},args:{modelValue:!1}},a={parameters:{docs:!1},args:{modelValue:!0}},o={parameters:{docs:!1},args:{disabled:!0}},t={parameters:{docs:!1},args:{hidden:!0},render:n=>({components:{KdsInfoToggleButton:l},setup(){return{args:n}},template:`
      <div class="hover-wrapper" @mouseover="args.hidden = false" @mouseleave="args.hidden = true">
        <div class="hint">Hover this area to show the button, toggle it to keep it visible</div>
        <div class="anchor">
          <KdsInfoToggleButton v-bind="args" />
        </div>
      </div>
    `})},r=g({component:l,combinationsProps:[{modelValue:[!1,!0],disabled:[!1,!0]}],pseudoStates:["hover","active","focus-visible"]}),d=b({component:l,designsToCompare:{Default:{props:{modelValue:!1},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219224":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219228":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219244":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219248":{disabled:!0}}},Selected:{props:{modelValue:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219252":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219232":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219236":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219240":{disabled:!0}}}}}),i={parameters:{docs:!1},args:{modelValue:!1},play:async({canvasElement:n})=>{const e=w(n).getByRole("button",{name:"Click for more information"});await p(e).toHaveAttribute("aria-pressed","false"),await u.click(e),await p(e).toHaveAttribute("aria-pressed","true"),await u.click(e),await p(e).toHaveAttribute("aria-pressed","false")}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    modelValue: false
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    modelValue: true
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    disabled: true
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    hidden: true
  },
  render: args => ({
    components: {
      KdsInfoToggleButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="hover-wrapper" @mouseover="args.hidden = false" @mouseleave="args.hidden = true">
        <div class="hint">Hover this area to show the button, toggle it to keep it visible</div>
        <div class="anchor">
          <KdsInfoToggleButton v-bind="args" />
        </div>
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsInfoToggleButton,
  combinationsProps: [{
    modelValue: [false, true],
    disabled: [false, true]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsInfoToggleButton,
  designsToCompare: {
    Default: {
      props: {
        modelValue: false
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219224": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219228": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219244": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219248": {
          disabled: true
        }
      }
    },
    Selected: {
      props: {
        modelValue: true
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219252": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219232": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219236": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219240": {
          disabled: true
        }
      }
    }
  }
})`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    modelValue: false
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: "Click for more information"
    });

    // Deterministic start state
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-pressed", "false");
  }
}`,...i.parameters?.docs?.source}}};const E=["Default","Selected","Disabled","OnlyVisibleOnHover","AllCombinations","DesignComparator","Interaction"];export{r as AllCombinations,s as Default,d as DesignComparator,o as Disabled,i as Interaction,t as OnlyVisibleOnHover,a as Selected,E as __namedExportsOrder,y as default};
