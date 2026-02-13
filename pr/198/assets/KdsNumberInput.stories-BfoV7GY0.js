import{b as A,c as h,a as V}from"./storybook-vnuYObB_.js";import{v}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:T}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:n,userEvent:a,within:E}=__STORYBOOK_MODULE_TEST__,N={title:"Components/forms/KdsNumberInput",component:v,tags:["autodocs"],parameters:{docs:{description:{component:"A number input field component with unit display and +/- step buttons. Supports min/max constraints, validation states, and accessibility features."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14820"}},argTypes:{modelValue:{control:"number",description:"v-model binding for the numeric value (use NaN for empty)",table:{category:"Model"}},ariaLabel:{control:"text",description:"Accessible label used when no visible label is rendered",table:{category:"Props"}},label:{control:"text",table:{category:"Props"}},placeholder:{control:"text",table:{category:"Props"}},name:{control:"text",table:{category:"Props"}},autocomplete:{control:"text",table:{category:"Props"}},unit:{control:"text",table:{category:"Props"}},min:{control:"number",table:{category:"Props"}},max:{control:"number",table:{category:"Props"}},step:{control:"number",table:{category:"Props"}},subText:{control:"text",table:{category:"Props"}},disabled:{control:"boolean",table:{category:"Props"}},readonly:{control:"boolean",table:{category:"Props"}},required:{control:"boolean",table:{category:"Props"}},error:{control:"boolean",table:{category:"Props"}},validating:{control:"boolean",description:"Shows a spinner next to the subtext when true",table:{category:"Props"}},preserveSubTextSpace:{control:"boolean",table:{category:"Props"}}},args:{modelValue:NaN,label:"Label",ariaLabel:void 0,placeholder:"",name:"",autocomplete:"",unit:"",min:void 0,max:void 0,step:.1,disabled:!1,readonly:!1,required:!1,error:!1,validating:!1,subText:"",preserveSubTextSpace:!1},decorators:[y=>{const[t,r]=T();return{components:{story:y},setup(){return{args:t,updateArgs:r}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},s={args:{placeholder:"Enter number",unit:"ms"}},i={args:{modelValue:42,unit:"ms"}},l={args:{modelValue:5,min:0,max:10,step:1,unit:"kg"}},u={args:{modelValue:42,unit:"ms",disabled:!0}},d={args:{modelValue:42,unit:"ms",readonly:!0}},c={args:{modelValue:42,unit:"ms",error:!0,subText:"Error message"}},m={args:{modelValue:42,unit:"ms",validating:!0,subText:"Validation message"}},p=A({parameters:{chromatic:{disableSnapshot:!0}},component:v,combinationsProps:[{label:["Label"],ariaLabel:[void 0],modelValue:[NaN,42],unit:["ms"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Message"]},{label:[void 0],ariaLabel:["Number input"],modelValue:[NaN,42],unit:["ms"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Message"]}],pseudoStates:["hover","active","focus","focus-visible"]}),b=h({component:v,wrapperStyle:"width: 218px",designsToCompare:{".NumberInput":{props:{},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14821":{placeholder:"{value}",unit:"{unit}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14830":{placeholder:"{value}",unit:"{unit}",parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14839":{modelValue:NaN,unit:"{unit}",parameters:{pseudo:{focus:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14848":{modelValue:42,unit:"{unit}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14857":{modelValue:42,unit:"{unit}",error:!0,subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35547":{modelValue:42,unit:"{unit}",validating:!0,subText:"{Validation message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14866":{modelValue:42,unit:"{unit}",disabled:!0}}}}}),g={...V({component:v,width:300}),args:{label:"Very long label that should be truncated",modelValue:+"12345678901234567890",unit:"UNIT",subText:"Very long helper text that should wrap to multiple lines when needed"}},w={args:{label:"Label",modelValue:NaN,placeholder:"Enter number",unit:"ms",min:0,max:2,step:1,disabled:!1,readonly:!1,required:!1,error:!1,validating:!1,subText:"",preserveSubTextSpace:!1,name:"",autocomplete:""},play:async({canvasElement:y,step:t})=>{const r=E(y),e=r.getByRole("spinbutton",{name:"Label"});await t("Increment/decrement via buttons",async()=>{const f=r.getAllByRole("button"),x=f[0],o=f[1];await a.click(o),await n(e).toHaveValue(0),await a.click(o),await n(e).toHaveValue(1),await a.click(o),await n(e).toHaveValue(2),await a.click(o),await n(e).toHaveValue(2),await a.click(x),await n(e).toHaveValue(1)}),await t("Arrow key stepping",async()=>{await a.click(e),await a.keyboard("{ArrowDown}"),await n(e).toHaveValue(0),await a.keyboard("{ArrowDown}"),await n(e).toHaveValue(0)}),await t("Cleanup invalid input on blur",async()=>{await a.click(e),await a.clear(e),await a.type(e,"1e3"),await a.tab(),await n(e).toHaveValue(2)})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter number",
    unit: "ms"
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: 42,
    unit: "ms"
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: 5,
    min: 0,
    max: 10,
    step: 1,
    unit: "kg"
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: 42,
    unit: "ms",
    disabled: true
  }
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: 42,
    unit: "ms",
    readonly: true
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: 42,
    unit: "ms",
    error: true,
    subText: "Error message"
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: 42,
    unit: "ms",
    validating: true,
    subText: "Validation message"
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  component: KdsNumberInput,
  combinationsProps: [{
    label: ["Label"],
    ariaLabel: [undefined],
    // eslint-disable-next-line no-magic-numbers
    modelValue: [NaN, 42],
    unit: ["ms"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Message"]
  }, {
    label: [undefined],
    ariaLabel: ["Number input"],
    // eslint-disable-next-line no-magic-numbers
    modelValue: [NaN, 42],
    unit: ["ms"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Message"]
  }],
  pseudoStates: ["hover", "active", "focus", "focus-visible"]
})`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsNumberInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".NumberInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14821": {
          placeholder: "{value}",
          unit: "{unit}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14830": {
          placeholder: "{value}",
          unit: "{unit}",
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14839": {
          modelValue: NaN,
          unit: "{unit}",
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14848": {
          modelValue: 42,
          unit: "{unit}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14857": {
          modelValue: 42,
          unit: "{unit}",
          error: true,
          subText: "{Error message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35547": {
          modelValue: 42,
          unit: "{unit}",
          validating: true,
          subText: "{Validation message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14866": {
          modelValue: 42,
          unit: "{unit}",
          disabled: true
        }
      }
    }
  }
})`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsNumberInput,
    width: 300
  }),
  args: {
    label: "Very long label that should be truncated",
    modelValue: Number("12345678901234567890"),
    unit: "UNIT",
    subText: "Very long helper text that should wrap to multiple lines when needed"
  }
}`,...g.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label",
    modelValue: NaN,
    placeholder: "Enter number",
    unit: "ms",
    min: 0,
    max: 2,
    step: 1,
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
    const input = canvas.getByRole("spinbutton", {
      name: "Label"
    });
    await step("Increment/decrement via buttons", async () => {
      const buttons = canvas.getAllByRole("button");
      const decrease = buttons[0];
      const increase = buttons[1];
      await userEvent.click(increase);
      await expect(input).toHaveValue(0);
      await userEvent.click(increase);
      await expect(input).toHaveValue(1);
      await userEvent.click(increase);
      await expect(input).toHaveValue(2);
      await userEvent.click(increase);
      await expect(input).toHaveValue(2);
      await userEvent.click(decrease);
      await expect(input).toHaveValue(1);
    });
    await step("Arrow key stepping", async () => {
      await userEvent.click(input);
      await userEvent.keyboard("{ArrowDown}");
      await expect(input).toHaveValue(0);
      await userEvent.keyboard("{ArrowDown}");
      await expect(input).toHaveValue(0);
    });
    await step("Cleanup invalid input on blur", async () => {
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.type(input, "1e3");

      // move focus away to trigger blur cleanup and clamping to max=2
      await userEvent.tab();
      await expect(input).toHaveValue(2);
    });
  }
}`,...w.parameters?.docs?.source}}};const F=["Default","WithValue","WithMinMax","Disabled","Readonly","WithError","Validating","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{p as AllCombinations,s as Default,b as DesignComparator,u as Disabled,w as Interaction,d as Readonly,g as TextOverflow,m as Validating,c as WithError,l as WithMinMax,i as WithValue,F as __namedExportsOrder,N as default};
