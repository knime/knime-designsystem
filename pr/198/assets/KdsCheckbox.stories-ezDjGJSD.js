import{b as f,c as T,a as x}from"./storybook-vnuYObB_.js";import{o as g}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:F}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:n,userEvent:s,waitFor:o,within:q}=__STORYBOOK_MODULE_TEST__,C={title:"Components/forms/KdsCheckbox",component:g,tags:["autodocs"],argTypes:{modelValue:{control:{type:"select"},options:[!1,!0,"indeterminate"],description:"v-model binding for the checkbox state",table:{category:"Model"}},label:{control:{type:"text"},description:"Required label of the checkbox",table:{category:"Props",required:!0}},disabled:{control:{type:"boolean"},table:{category:"Props"}},subText:{control:{type:"text"},table:{category:"Props"}},error:{control:{type:"boolean"},table:{category:"Props"}},preserveSubTextSpace:{control:{type:"boolean"},table:{category:"Props"}}},args:{modelValue:!1,label:"Label",disabled:!1,subText:"",error:!1,preserveSubTextSpace:!1},decorators:[A=>{const[t,h]=F();return{components:{story:A},setup(){return{args:t,updateArgs:h}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}],parameters:{docs:{description:{component:"A checkbox component that follows the WAI-ARIA tri-state checkbox design pattern. Supports checked, unchecked, and indeterminate states."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=278-4921&p=f"}}},a={args:{label:"Label",modelValue:!1}},r={args:{label:"Label",modelValue:!0}},d={args:{label:"Label",modelValue:"indeterminate"}},i={args:{label:"Label",subText:"Sub text",modelValue:!1}},u={args:{label:"Label",modelValue:!0,disabled:!0}},m={args:{label:"Label",subText:"Error message",modelValue:!1,error:!0}},p={args:{label:void 0,title:"Checkbox title",modelValue:!1}},c=f({component:g,combinationsProps:[{modelValue:[!1,!0,"indeterminate"],label:["Label"],disabled:[!1,!0],error:[!1,!0],subText:[void 0,"SubText"]}],pseudoStates:["hover","active","focus-visible"]}),b=T({component:g,designsToCompare:{Default:{props:{label:"Label",modelValue:!1},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51009":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51573":{subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=615-30434":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51582":{parameters:{pseudo:{hover:!0}},subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30585":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51579":{parameters:{pseudo:{active:!0}},subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51117":{parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51576":{subText:"{SubText content}",parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51255":{disabled:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51588":{disabled:!0,subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51627":{error:!0,subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169136":{error:!0,subText:"{Error message}",parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-233133":{error:!0,subText:"{Error message}",parameters:{pseudo:{active:!0}}}}},Checked:{props:{label:"Label",modelValue:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51100":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-197571":{subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30499":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-198316":{parameters:{pseudo:{hover:!0}},subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30590":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-198689":{parameters:{pseudo:{active:!0}},subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51125":{parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-197988":{subText:"{SubText content}",parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51273":{disabled:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-199107":{subText:"{SubText content}",disabled:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51641":{error:!0,subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169146":{error:!0,subText:"{Error message}",parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169204":{error:!0,subText:"{Error message}",parameters:{pseudo:{active:!0}}}}},Indeterminate:{props:{label:"Label",modelValue:"indeterminate"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-170318":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200078":{subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173832":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200084":{parameters:{pseudo:{hover:!0}},subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173842":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200087":{parameters:{pseudo:{active:!0}},subText:"{SubText content}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-181398":{parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200081":{subText:"{SubText content}",parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-170321":{disabled:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200090":{subText:"{SubText content}",disabled:!0},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-181407":{error:!0,subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173473":{error:!0,subText:"{Error message}",parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173463":{error:!0,subText:"{Error message}",parameters:{pseudo:{active:!0}}}}}}}),l={...x({component:g,width:200}),args:{label:"This is a very long checkbox label that should overflow and wrap properly when the container is too narrow",subText:"This is a very long sub text that should also overflow and wrap properly when there is not enough space",modelValue:!1}},w={args:{label:"Label",modelValue:!1,disabled:!1,subText:"",error:!1,preserveSubTextSpace:!1},play:async({canvasElement:A,step:t})=>{const e=q(A).getByRole("checkbox",{name:"Label"});n(e).not.toBeChecked(),await t("Toggle with mouse click",async()=>{await s.click(e),await o(n(e).toBeChecked),await s.click(e),await o(n(e).not.toBeChecked)}),await t("Toggle with keyboard (Space) while focused",async()=>{await n(e).toHaveFocus(),await s.keyboard(" "),await o(n(e).toBeChecked),await s.keyboard(" "),await o(n(e).not.toBeChecked)})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    modelValue: false
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    modelValue: true
  }
}`,...r.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    modelValue: "indeterminate"
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    subText: "Sub text",
    modelValue: false
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    modelValue: true,
    disabled: true
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    subText: "Error message",
    modelValue: false,
    error: true
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: undefined,
    title: "Checkbox title",
    modelValue: false
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsCheckbox,
  combinationsProps: [{
    modelValue: [false, true, "indeterminate"],
    label: ["Label"],
    disabled: [false, true],
    error: [false, true],
    subText: [undefined, "SubText"]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...c.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsCheckbox,
  designsToCompare: {
    Default: {
      props: {
        label: "Label",
        modelValue: false
      },
      variants: {
        // Default state
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51009": {},
        // Default with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51573": {
          subText: "{SubText content}"
        },
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=615-30434": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // :hover with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51582": {
          parameters: {
            pseudo: {
              hover: true
            }
          },
          subText: "{SubText content}"
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30585": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // :active with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51579": {
          parameters: {
            pseudo: {
              active: true
            }
          },
          subText: "{SubText content}"
        },
        // Enabled :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51117": {
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
        // :focus-visible with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51576": {
          subText: "{SubText content}",
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
        // disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51255": {
          disabled: true
        },
        // disabled with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51588": {
          disabled: true,
          subText: "{SubText content}"
        },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51627": {
          error: true,
          subText: "{Error message}"
        },
        // Error :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169136": {
          error: true,
          subText: "{Error message}",
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-233133": {
          error: true,
          subText: "{Error message}",
          parameters: {
            pseudo: {
              active: true
            }
          }
        }
      }
    },
    Checked: {
      props: {
        label: "Label",
        modelValue: true
      },
      variants: {
        // Default
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51100": {},
        // Default with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-197571": {
          subText: "{SubText content}"
        },
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30499": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // :hover with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-198316": {
          parameters: {
            pseudo: {
              hover: true
            }
          },
          subText: "{SubText content}"
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1801-30590": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // :active with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-198689": {
          parameters: {
            pseudo: {
              active: true
            }
          },
          subText: "{SubText content}"
        },
        // Enabled :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51125": {
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
        // :focus-visible with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-197988": {
          subText: "{SubText content}",
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
        // disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51273": {
          disabled: true
        },
        // disabled with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-199107": {
          subText: "{SubText content}",
          disabled: true
        },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51641": {
          error: true,
          subText: "{Error message}"
        },
        // Error :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169146": {
          error: true,
          subText: "{Error message}",
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9171-169204": {
          error: true,
          subText: "{Error message}",
          parameters: {
            pseudo: {
              active: true
            }
          }
        }
      }
    },
    Indeterminate: {
      props: {
        label: "Label",
        modelValue: "indeterminate"
      },
      variants: {
        // Default
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-170318": {},
        // Default with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200078": {
          subText: "{SubText content}"
        },
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173832": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // :hover with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200084": {
          parameters: {
            pseudo: {
              hover: true
            }
          },
          subText: "{SubText content}"
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173842": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // :active with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200087": {
          parameters: {
            pseudo: {
              active: true
            }
          },
          subText: "{SubText content}"
        },
        // Enabled :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-181398": {
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
        // :focus-visible with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200081": {
          subText: "{SubText content}",
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
        // disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-170321": {
          disabled: true
        },
        // disabled with subtext
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200090": {
          subText: "{SubText content}",
          disabled: true
        },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-181407": {
          error: true,
          subText: "{Error message}"
        },
        // Error :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173473": {
          error: true,
          subText: "{Error message}",
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-173463": {
          error: true,
          subText: "{Error message}",
          parameters: {
            pseudo: {
              active: true
            }
          }
        }
      }
    }
  }
})`,...b.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsCheckbox,
    width: 200
  }),
  args: {
    label: "This is a very long checkbox label that should overflow and wrap properly when the container is too narrow",
    subText: "This is a very long sub text that should also overflow and wrap properly when there is not enough space",
    modelValue: false
  }
}`,...l.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    modelValue: false,
    disabled: false,
    subText: "",
    error: false,
    preserveSubTextSpace: false
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", {
      name: "Label"
    });
    expect(checkbox).not.toBeChecked();
    await step("Toggle with mouse click", async () => {
      await userEvent.click(checkbox);
      await waitFor(expect(checkbox).toBeChecked);
      await userEvent.click(checkbox);
      await waitFor(expect(checkbox).not.toBeChecked);
    });
    await step("Toggle with keyboard (Space) while focused", async () => {
      // Checkbox should have focus from previous step
      await expect(checkbox).toHaveFocus();
      await userEvent.keyboard(" ");
      await waitFor(expect(checkbox).toBeChecked);
      await userEvent.keyboard(" ");
      await waitFor(expect(checkbox).not.toBeChecked);
    });
  }
}`,...w.parameters?.docs?.source}}};const v=["Default","Checked","Indeterminate","SubText","Disabled","Error","WithoutLabel","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{c as AllCombinations,r as Checked,a as Default,b as DesignComparator,u as Disabled,m as Error,d as Indeterminate,w as Interaction,i as SubText,l as TextOverflow,p as WithoutLabel,v as __namedExportsOrder,C as default};
