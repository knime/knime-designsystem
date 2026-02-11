import{b as m,c,a as b}from"./storybook-BgwB2tEM.js";import{q as i}from"./iframe-DNHZNOPe.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:g}=__STORYBOOK_MODULE_PREVIEW_API__,h={title:"Components/forms/KdsRadioButton",component:i,tags:["autodocs"],argTypes:{modelValue:{control:{type:"boolean"},description:"Whether the radio button is selected (true) or not (false). Radio buttons don't toggle back to false on click.",table:{category:"Model"}},text:{control:{type:"text"},description:"Required text shown next to the control.",table:{category:"Props"}},helperText:{control:{type:"text"},description:"Optional helper text shown under the text and referenced via aria-describedby.",table:{category:"Props"}},disabled:{control:{type:"boolean"},description:"Disables the radio button and prevents interaction.",table:{category:"Props"}},error:{control:{type:"boolean"},description:"Sets the error state (affects styling and sets aria-invalid).",table:{category:"Props"}}},args:{modelValue:!1,text:"Label",helperText:"",disabled:!1,error:!1},decorators:[l=>{const[p,u]=g();return{components:{story:l},setup(){return{args:p,updateArgs:u}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}],parameters:{docs:{description:{component:"A single radio button. **Can only be used as part of KdsRadioButtonGroup!**"}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=327-25185"}}},e={args:{text:"Label",modelValue:!1}},t={args:{text:"Label",modelValue:!0}},n={args:{text:"Label",helperText:"Helper text",modelValue:!1}},o={args:{text:"Label",helperText:"Helper text",modelValue:!0,disabled:!0}},r={args:{text:"Label",helperText:"Helper text",modelValue:!1,error:!0}},s=m({component:i,combinationsProps:[{modelValue:[!1,!0],disabled:[!1,!0],error:[!1,!0],text:["Label"]},{modelValue:[!1,!0],disabled:[!1,!0],error:[!1,!0],text:["Label"],helperText:["Helper text"]}],pseudoStates:["hover","active","focus-visible"]}),a=c({component:i,designsToCompare:{Default:{props:{text:"Label",modelValue:!1,helperText:"{SubText content}"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5573":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5584":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5594":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-30882":{parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5624":{disabled:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5634":{error:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231875":{error:!0,parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231896":{error:!0,parameters:{pseudo:{active:!0}}}}},Selected:{props:{text:"Label",modelValue:!0,helperText:"{SubText content}"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5579":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5599":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5609":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-30883":{parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5629":{disabled:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5639":{error:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231870":{error:!0,parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231901":{error:!0,parameters:{pseudo:{active:!0}}}}}}}),d={...b({component:i,width:200}),args:{text:"This is a very long radio label that should overflow and wrap properly when the container is too narrow",helperText:"This is a very long helper text that should also overflow and wrap properly to test layout stability and accessibility",modelValue:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Label",
    modelValue: false
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Label",
    modelValue: true
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Label",
    helperText: "Helper text",
    modelValue: false
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Label",
    helperText: "Helper text",
    modelValue: true,
    disabled: true
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: "Label",
    helperText: "Helper text",
    modelValue: false,
    error: true
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsRadioButton,
  combinationsProps: [{
    modelValue: [false, true],
    disabled: [false, true],
    error: [false, true],
    text: ["Label"]
  }, {
    modelValue: [false, true],
    disabled: [false, true],
    error: [false, true],
    text: ["Label"],
    helperText: ["Helper text"]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsRadioButton,
  designsToCompare: {
    Default: {
      props: {
        text: "Label",
        modelValue: false,
        helperText: "{SubText content}"
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5573": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5584": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5594": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Enabled :focus-visible
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-30882": {
          parameters: {
            pseudo: {
              focusVisible: true
            },
            figmaOffset: {
              x: -3,
              y: -3
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5624": {
          disabled: true
        },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5634": {
          error: true
        },
        // Error :hover (stateHoverValueFalseErrorTrue)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231875": {
          error: true,
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231896": {
          error: true,
          parameters: {
            pseudo: {
              active: true
            }
          }
        }
      }
    },
    Selected: {
      props: {
        text: "Label",
        modelValue: true,
        helperText: "{SubText content}"
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5579": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5599": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5609": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Enabled :focus-visible
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-30883": {
          parameters: {
            pseudo: {
              focusVisible: true
            },
            figmaOffset: {
              x: -3,
              y: -3
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5629": {
          disabled: true
        },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5639": {
          error: true
        },
        // Error :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231870": {
          error: true,
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231901": {
          error: true,
          parameters: {
            pseudo: {
              active: true
            }
          }
        }
      }
    }
  }
})`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsRadioButton,
    width: 200
  }),
  args: {
    text: "This is a very long radio label that should overflow and wrap properly when the container is too narrow",
    helperText: "This is a very long helper text that should also overflow and wrap properly to test layout stability and accessibility",
    modelValue: false
  }
}`,...d.parameters?.docs?.source}}};const y=["Default","Selected","WithHelperText","Disabled","Error","AllCombinations","DesignComparator","TextOverflow"];export{s as AllCombinations,e as Default,a as DesignComparator,o as Disabled,r as Error,t as Selected,d as TextOverflow,n as WithHelperText,y as __namedExportsOrder,h as default};
