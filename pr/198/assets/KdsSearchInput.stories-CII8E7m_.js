import{b as f,c as v,a as x}from"./storybook-vnuYObB_.js";import{w}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:A}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:r,userEvent:o,within:T}=__STORYBOOK_MODULE_TEST__,F={title:"Components/forms/KdsSearchInput",component:w,tags:["autodocs"],parameters:{docs:{description:{component:"A search input field component with built-in search icon and a clear button that appears when the input has a value. Supports validation states, helper/error text, and keyboard accessible clearing."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4516-7057"}},argTypes:{modelValue:{control:"text",description:"v-model binding for the input value",table:{category:"Model"}},ariaLabel:{control:"text",description:"Accessible label used when no visible label is rendered",table:{category:"Props"}},id:{control:"text",description:"ID for the input element",table:{category:"Props"}},label:{control:"text",description:"Label shown above the input",table:{category:"Props"}},placeholder:{control:"text",description:"Placeholder shown when the input is empty",table:{category:"Props"}},name:{control:"text",table:{category:"Props"}},autocomplete:{control:"text",table:{category:"Props"}},subText:{control:"text",description:"Helper text or error message shown below the input",table:{category:"Props"}},disabled:{control:"boolean",table:{category:"Props"}},readonly:{control:"boolean",table:{category:"Props"}},required:{control:"boolean",table:{category:"Props"}},error:{control:"boolean",table:{category:"Props"}},validating:{control:"boolean",description:"Shows a spinner next to the subtext when true",table:{category:"Props"}},preserveSubTextSpace:{control:"boolean",table:{category:"Props"}}},args:{modelValue:"",id:"",label:void 0,ariaLabel:"Search",placeholder:"Search",name:"",autocomplete:"",disabled:!1,readonly:!1,required:!1,error:!1,validating:!1,subText:"",preserveSubTextSpace:!1},decorators:[S=>{const[a,t]=A();return{components:{story:S},setup(){return{args:a,updateArgs:t}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},n={},s={args:{label:"Search",ariaLabel:void 0}},l={args:{modelValue:"Searchterm"}},c={args:{readonly:!0,modelValue:"Searchterm"}},i={args:{disabled:!0}},d={args:{subText:"Helper text goes here"}},u={args:{modelValue:"Searchterm",validating:!0,subText:"Validation message"}},p={args:{modelValue:"Searchterm",error:!0,subText:"Error message"}},m=f({parameters:{chromatic:{disableSnapshot:!0}},component:w,combinationsProps:[{ariaLabel:["Search"],label:[void 0,"Search"],modelValue:["","Searchterm"],placeholder:["Search","Placeholder"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Helper text"]}],pseudoStates:["hover","active","focus"]}),h=v({component:w,wrapperStyle:"width: 218px",designsToCompare:{".SearchInput":{props:{},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16750":{placeholder:"Search"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16760":{placeholder:"Search",parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16770":{modelValue:"|",parameters:{pseudo:{focus:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16780":{modelValue:"Search"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16790":{modelValue:"Search",error:!0,subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35622":{modelValue:"Search",validating:!0,subText:"{Validation message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16800":{placeholder:"Search",disabled:!0}}}}}),b={...x({component:w,width:300}),args:{label:"Very long label that should be truncated when the container is too small",placeholder:"Very long placeholder text that should be truncated",modelValue:"Very long value that should be truncated",subText:"Very long helper text that should wrap to multiple lines when needed"}},g={args:{modelValue:"",id:"",label:void 0,ariaLabel:"Search",placeholder:"Search",name:"",autocomplete:"",disabled:!1,readonly:!1,required:!1,error:!1,validating:!1,subText:"",preserveSubTextSpace:!1},play:async({canvasElement:S,step:a})=>{const t=T(S),e=t.getByRole("searchbox",{name:"Search"});await a("Type into the input",async()=>{await o.click(e),await o.type(e,"Searchterm"),await r(e).toHaveValue("Searchterm")}),await a("Tab to clear button and clear while keeping focus on the input",async()=>{const y=t.getByRole("button",{name:"Clear"});await o.tab(),await r(y).toHaveFocus(),await o.click(y),await r(e).toHaveValue(""),await r(e).toHaveFocus()})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Search",
    ariaLabel: undefined
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Searchterm"
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    readonly: true,
    modelValue: "Searchterm"
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    subText: "Helper text goes here"
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Searchterm",
    validating: true,
    subText: "Validation message"
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Searchterm",
    error: true,
    subText: "Error message"
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
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
})`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
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
})`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
    await step("Tab to clear button and clear while keeping focus on the input", async () => {
      const clearButton = canvas.getByRole("button", {
        name: "Clear"
      });
      await userEvent.tab();
      await expect(clearButton).toHaveFocus();
      await userEvent.click(clearButton);
      await expect(input).toHaveValue("");
      await expect(input).toHaveFocus();
    });
  }
}`,...g.parameters?.docs?.source}}};const O=["Default","WithLabel","WithValue","Readonly","Disabled","WithSubText","Validating","WithError","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{m as AllCombinations,n as Default,h as DesignComparator,i as Disabled,g as Interaction,c as Readonly,b as TextOverflow,u as Validating,p as WithError,s as WithLabel,d as WithSubText,l as WithValue,O as __namedExportsOrder,F as default};
