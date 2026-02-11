import{b as y,c as v,a as T}from"./storybook-BgwB2tEM.js";import{x as h}from"./iframe-DNHZNOPe.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:A}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:w,userEvent:a,within:V}=__STORYBOOK_MODULE_TEST__,F={title:"Components/forms/KdsTextInput",component:h,tags:["autodocs"],parameters:{docs:{description:{component:"A text input field component with label and helper/error text support. Supports validation states and accessibility features."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4420-29613"}},argTypes:{modelValue:{control:"text",description:"v-model binding for the input value",table:{category:"Model"}},ariaLabel:{control:"text",description:"Accessible label used when no visible label is rendered",table:{category:"Props"}},label:{control:"text",description:"Label shown above the input",table:{category:"Props"}},placeholder:{control:"text",description:"Placeholder shown when the input is empty",table:{category:"Props"}},name:{control:"text",table:{category:"Props"}},autocomplete:{control:"text",table:{category:"Props"}},subText:{control:"text",description:"Helper text or error message shown below the input",table:{category:"Props"}},disabled:{control:"boolean",table:{category:"Props"}},readonly:{control:"boolean",table:{category:"Props"}},required:{control:"boolean",table:{category:"Props"}},error:{control:"boolean",table:{category:"Props"}},validating:{control:"boolean",description:"Shows a spinner next to the subtext when true",table:{category:"Props"}},preserveSubTextSpace:{control:"boolean",table:{category:"Props"}}},args:{modelValue:"",label:"Label",ariaLabel:void 0,placeholder:"",name:"",autocomplete:"",required:!1,disabled:!1,readonly:!1,validating:!1,error:!1,subText:"",preserveSubTextSpace:!1},decorators:[x=>{const[t,f]=A();return{components:{story:x},setup(){return{args:t,updateArgs:f}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},r={args:{placeholder:"Enter text"}},n={args:{modelValue:"Some value"}},o={args:{placeholder:"Enter text",required:!0}},s={args:{readonly:!0,modelValue:"Read only value"}},l={args:{placeholder:"Enter text",disabled:!0}},d={args:{placeholder:"Enter text",subText:"Helper text goes here"}},i={args:{modelValue:"Checking...",validating:!0,subText:"Validation message"}},u={args:{modelValue:"Invalid value",error:!0,subText:"Error message"}},c={args:{label:"Email",placeholder:"your@email.com",name:"email",autocomplete:"email"}},p=y({parameters:{chromatic:{disableSnapshot:!0}},component:h,combinationsProps:[{label:["Label"],ariaLabel:[void 0],modelValue:["","Value"],placeholder:["","Placeholder"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Helper text"]},{label:[void 0],ariaLabel:["Text input"],modelValue:["","Value"],placeholder:["","Placeholder"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Helper text"]}],pseudoStates:["hover","active","focus"]}),m=v({component:h,wrapperStyle:"width: 218px",designsToCompare:{".TextInput":{props:{},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31293":{placeholder:"{text}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31309":{placeholder:"{text}",parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31359":{modelValue:"|",parameters:{pseudo:{focus:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31387":{modelValue:"{text}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-50384":{modelValue:"{text}",error:!0,subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35518":{modelValue:"{text}",validating:!0,subText:"{Validation message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31415":{placeholder:"{text}",disabled:!0}}}}}),b={...T({component:h,width:300}),args:{label:"Very long label that should be truncated when the container is too small",modelValue:"Very long value that should be truncated when the container is too small",subText:"Very long helper text that should wrap to multiple lines when needed"}},g={args:{label:"Label",ariaLabel:void 0,modelValue:"",placeholder:"Enter text",disabled:!1,readonly:!1,required:!1,error:!1,validating:!1,subText:"",preserveSubTextSpace:!1,name:"",autocomplete:""},play:async({canvasElement:x,step:t})=>{const e=V(x).getByRole("textbox",{name:"Label"});await t("Type into the input",async()=>{await a.click(e),await a.clear(e),await a.type(e,"Hello"),await w(e).toHaveValue("Hello"),await a.clear(e),await w(e).toHaveValue("")}),await t("Tab focus",async()=>{e.blur(),await a.tab(),await w(e).toHaveFocus()})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text"
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Some value"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text",
    required: true
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    readonly: true,
    modelValue: "Read only value"
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text",
    disabled: true
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text",
    subText: "Helper text goes here"
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Checking...",
    validating: true,
    subText: "Validation message"
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Invalid value",
    error: true,
    subText: "Error message"
  }
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email",
    placeholder: "your@email.com",
    name: "email",
    autocomplete: "email"
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  component: KdsTextInput,
  combinationsProps: [{
    label: ["Label"],
    ariaLabel: [undefined],
    modelValue: ["", "Value"],
    placeholder: ["", "Placeholder"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Helper text"]
  }, {
    label: [undefined],
    ariaLabel: ["Text input"],
    modelValue: ["", "Value"],
    placeholder: ["", "Placeholder"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Helper text"]
  }],
  pseudoStates: ["hover", "active", "focus"]
})`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsTextInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".TextInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31293": {
          placeholder: "{text}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31309": {
          placeholder: "{text}",
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31359": {
          modelValue: "|",
          parameters: {
            pseudo: {
              focus: true
            },
            figmaOffset: {
              x: -3,
              y: -3
            }
          }
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31387": {
          modelValue: "{text}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-50384": {
          modelValue: "{text}",
          error: true,
          subText: "{Error message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35518": {
          modelValue: "{text}",
          validating: true,
          subText: "{Validation message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31415": {
          placeholder: "{text}",
          disabled: true
        }
      }
    }
  }
})`,...m.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsTextInput,
    width: 300
  }),
  args: {
    label: "Very long label that should be truncated when the container is too small",
    modelValue: "Very long value that should be truncated when the container is too small",
    subText: "Very long helper text that should wrap to multiple lines when needed"
  }
}`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    ariaLabel: undefined,
    modelValue: "",
    placeholder: "Enter text",
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    validating: false,
    subText: "",
    preserveSubTextSpace: false,
    name: "",
    autocomplete: ""
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", {
      name: "Label"
    });
    await step("Type into the input", async () => {
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.type(input, "Hello");
      await expect(input).toHaveValue("Hello");
      await userEvent.clear(input);
      await expect(input).toHaveValue("");
    });
    await step("Tab focus", async () => {
      input.blur();
      await userEvent.tab();
      await expect(input).toHaveFocus();
    });
  }
}`,...g.parameters?.docs?.source}}};const O=["Default","WithValue","Required","Readonly","Disabled","WithSubText","Validating","WithError","NameAndAutocomplete","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{p as AllCombinations,r as Default,m as DesignComparator,l as Disabled,g as Interaction,c as NameAndAutocomplete,s as Readonly,o as Required,b as TextOverflow,i as Validating,u as WithError,d as WithSubText,n as WithValue,O as __namedExportsOrder,F as default};
