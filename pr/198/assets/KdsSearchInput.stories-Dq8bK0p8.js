import{b as f,c as x,a as v}from"./storybook-BgwB2tEM.js";import{w as g}from"./iframe-DNHZNOPe.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:A}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:S,userEvent:t,within:T}=__STORYBOOK_MODULE_TEST__,F={title:"Components/forms/KdsSearchInput",component:g,tags:["autodocs"],parameters:{docs:{description:{component:"A search input field component with built-in search icon and optional clear button. Supports validation states, helper/error text, and keyboard accessible clearing."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4516-7057"}},argTypes:{modelValue:{control:"text",description:"v-model binding for the input value",table:{category:"Model"}},ariaLabel:{control:"text",description:"Accessible label used when no visible label is rendered",table:{category:"Props"}},id:{control:"text",description:"ID for the input element",table:{category:"Props"}},label:{control:"text",description:"Label shown above the input",table:{category:"Props"}},placeholder:{control:"text",description:"Placeholder shown when the input is empty",table:{category:"Props"}},name:{control:"text",table:{category:"Props"}},autocomplete:{control:"text",table:{category:"Props"}},subText:{control:"text",description:"Helper text or error message shown below the input",table:{category:"Props"}},disabled:{control:"boolean",table:{category:"Props"}},readonly:{control:"boolean",table:{category:"Props"}},required:{control:"boolean",table:{category:"Props"}},error:{control:"boolean",table:{category:"Props"}},validating:{control:"boolean",description:"Shows a spinner next to the subtext when true",table:{category:"Props"}},preserveSubTextSpace:{control:"boolean",table:{category:"Props"}}},args:{modelValue:"",id:"",label:void 0,ariaLabel:"Search",placeholder:"Search",name:"",autocomplete:"",disabled:!1,readonly:!1,required:!1,error:!1,validating:!1,subText:"",preserveSubTextSpace:!1},decorators:[w=>{const[e,a]=A();return{components:{story:w},setup(){return{args:e,updateArgs:a}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},o={},n={args:{label:"Search",ariaLabel:void 0}},s={args:{modelValue:"Searchterm"}},l={args:{readonly:!0,modelValue:"Searchterm"}},c={args:{disabled:!0}},d={args:{subText:"Helper text goes here"}},i={args:{modelValue:"Searchterm",validating:!0,subText:"Validation message"}},u={args:{modelValue:"Searchterm",error:!0,subText:"Error message"}},p=f({parameters:{chromatic:{disableSnapshot:!0}},component:g,combinationsProps:[{ariaLabel:["Search"],label:[void 0,"Search"],modelValue:["","Searchterm"],placeholder:["Search","Placeholder"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Helper text"]}],pseudoStates:["hover","active","focus"]}),m=x({component:g,wrapperStyle:"width: 218px",designsToCompare:{".SearchInput":{props:{},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16750":{placeholder:"Search"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16760":{placeholder:"Search",parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16770":{modelValue:"|",parameters:{pseudo:{focus:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16780":{modelValue:"Search"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16790":{modelValue:"Search",error:!0,subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35622":{modelValue:"Search",validating:!0,subText:"{Validation message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16800":{placeholder:"Search",disabled:!0}}}}}),h={...v({component:g,width:300}),args:{label:"Very long label that should be truncated when the container is too small",placeholder:"Very long placeholder text that should be truncated",modelValue:"Very long value that should be truncated",subText:"Very long helper text that should wrap to multiple lines when needed"}},b={args:{modelValue:"",id:"",label:void 0,ariaLabel:"Search",placeholder:"Search",name:"",autocomplete:"",disabled:!1,readonly:!1,required:!1,error:!1,validating:!1,subText:"",preserveSubTextSpace:!1},play:async({canvasElement:w,step:e})=>{const a=T(w),r=a.getByRole("searchbox",{name:"Search"});await e("Type into the input",async()=>{await t.click(r),await t.type(r,"Searchterm"),await S(r).toHaveValue("Searchterm")}),await e("Tab to clear button",async()=>{const y=a.getByRole("button",{name:"Clear"});await t.tab(),await S(y).toHaveFocus(),await t.click(y),await S(r).toHaveValue("")})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Search",
    ariaLabel: undefined
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Searchterm"
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    readonly: true,
    modelValue: "Searchterm"
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    subText: "Helper text goes here"
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Searchterm",
    validating: true,
    subText: "Validation message"
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Searchterm",
    error: true,
    subText: "Error message"
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  component: KdsSearchInput,
  combinationsProps: [{
    ariaLabel: ["Search"],
    label: [undefined, "Search"],
    modelValue: ["", "Searchterm"],
    placeholder: ["Search", "Placeholder"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Helper text"]
  }],
  pseudoStates: ["hover", "active", "focus"]
})`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsSearchInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".SearchInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16750": {
          placeholder: "Search"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16760": {
          placeholder: "Search",
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16770": {
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16780": {
          modelValue: "Search"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16790": {
          modelValue: "Search",
          error: true,
          subText: "{Error message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35622": {
          modelValue: "Search",
          validating: true,
          subText: "{Validation message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16800": {
          placeholder: "Search",
          disabled: true
        }
      }
    }
  }
})`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsSearchInput,
    width: 300
  }),
  args: {
    label: "Very long label that should be truncated when the container is too small",
    placeholder: "Very long placeholder text that should be truncated",
    modelValue: "Very long value that should be truncated",
    subText: "Very long helper text that should wrap to multiple lines when needed"
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "",
    id: "",
    label: undefined,
    ariaLabel: "Search",
    placeholder: "Search",
    name: "",
    autocomplete: "",
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    validating: false,
    subText: "",
    preserveSubTextSpace: false
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", {
      name: "Search"
    });
    await step("Type into the input", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "Searchterm");
      await expect(input).toHaveValue("Searchterm");
    });
    await step("Tab to clear button", async () => {
      const clearButton = canvas.getByRole("button", {
        name: "Clear"
      });
      await userEvent.tab();
      await expect(clearButton).toHaveFocus();
      await userEvent.click(clearButton);
      await expect(input).toHaveValue("");
    });
  }
}`,...b.parameters?.docs?.source}}};const O=["Default","WithLabel","WithValue","Readonly","Disabled","WithSubText","Validating","WithError","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{p as AllCombinations,o as Default,m as DesignComparator,c as Disabled,b as Interaction,l as Readonly,h as TextOverflow,i as Validating,u as WithError,n as WithLabel,d as WithSubText,s as WithValue,O as __namedExportsOrder,F as default};
