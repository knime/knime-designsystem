import{b as E,c as V,a as S}from"./storybook-vnuYObB_.js";import{y as r}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:R}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:v,userEvent:n,within:A}=__STORYBOOK_MODULE_TEST__,f=3,T=4,L={title:"Components/forms/KdsTextarea",component:r,tags:["autodocs"],parameters:{docs:{description:{component:"A textarea component for multi-line text input. Grows automatically with content (no internal scrolling)."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8426"}},argTypes:{modelValue:{control:"text",description:"v-model binding for the textarea value",table:{category:"Model"}},label:{control:"text",description:"Visible label text",table:{category:"Props"}},ariaLabel:{control:"text",description:"Accessible label used when no visible label is rendered",table:{category:"Props"}},id:{control:"text",description:"Id for associating labels and hint/error text",table:{category:"Props"}},placeholder:{control:"text",table:{category:"Props"}},rows:{control:{type:"number",min:1},table:{category:"Props"}},name:{control:"text",table:{category:"Props"}},autocomplete:{control:"text",table:{category:"Props"}},subText:{control:"text",table:{category:"Props"}},disabled:{control:"boolean",table:{category:"Props"}},readonly:{control:"boolean",table:{category:"Props"}},required:{control:"boolean",table:{category:"Props"}},error:{control:"boolean",table:{category:"Props"}},validating:{control:"boolean",table:{category:"Props"}},preserveSubTextSpace:{control:"boolean",table:{category:"Props"}}},args:{modelValue:"",label:"Label",ariaLabel:void 0,id:"",placeholder:"",rows:f,name:"",autocomplete:"",required:!1,disabled:!1,readonly:!1,validating:!1,error:!1,subText:"",preserveSubTextSpace:!1},decorators:[t=>{const[a,o]=R();return{components:{story:t},setup(){return{args:a,updateArgs:o}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},s={args:{placeholder:"Enter text"},play:async({canvasElement:t,step:a})=>{const e=A(t).getByRole("textbox",{name:"Label"});await a("Type multiple lines",async()=>{await n.click(e),await n.clear(e),await n.type(e,"Hello{enter}World"),await v(e).toHaveValue(`Hello
World`)})}},l={args:{modelValue:`First line
Second line`}},d={args:{rows:T,placeholder:"Enter text"}},i={args:{modelValue:"Delete to invalidate",required:!0}},c={args:{readonly:!0,modelValue:"Read only value"},play:async({canvasElement:t,step:a})=>{const e=A(t).getByRole("textbox",{name:"Label"});await a("Is readonly",async()=>{await v(e).toHaveAttribute("readonly")}),await a("Typing does not change value",async()=>{await n.click(e),await n.type(e,"X"),await v(e).toHaveValue("Read only value")})}},u={args:{disabled:!0,placeholder:"Enter text"},play:async({canvasElement:t,step:a})=>{const e=A(t).getByRole("textbox",{name:"Label"});await a("Is disabled",async()=>{await v(e).toBeDisabled()})}},m={args:{placeholder:"Enter text",subText:"Helper text goes here"}},p={args:{modelValue:"Checking...",validating:!0,subText:"Validation message"}},b={args:{modelValue:"Invalid value",error:!0,subText:"Error message"}},g={args:{label:void 0,ariaLabel:"Textarea",placeholder:"Enter text"}},x={parameters:{docs:{description:{story:"Example with an external `<label>` element. The external label is connected via `for`/`id`, so the textarea still has an accessible name even though the component `label` prop is omitted."}}},render:()=>({components:{KdsTextarea:r},template:`
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-textarea">External label</label>

        <KdsTextarea
          id="custom-textarea"
          aria-label="External label"
          placeholder="Enter text"
        />
      </div>
    `})},w=E({parameters:{chromatic:{disableSnapshot:!0}},component:r,combinationsProps:[{label:["Label"],ariaLabel:[void 0],modelValue:["",`Value
Second line`],rows:[f,T],placeholder:["","Placeholder"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Message"]},{label:[void 0],ariaLabel:["Textarea"],modelValue:["",`Value
Second line`],rows:[f,T],placeholder:["","Placeholder"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Message"]}],pseudoStates:["hover","focus"]}),y=V({component:r,wrapperStyle:"width: 456px",designsToCompare:{".Textarea":{props:{label:void 0,ariaLabel:"Textarea"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8429":{placeholder:"{text}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8438":{placeholder:"{text}",parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8447":{modelValue:"|",parameters:{pseudo:{focus:!0},figmaOffset:{x:-3,y:-3}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8458":{modelValue:"{text}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8467":{modelValue:"{text}",error:!0,subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35740":{modelValue:"{text}",validating:!0,subText:"{Validation message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8476":{placeholder:"{text}",disabled:!0}}}}}),h={...S({component:r,width:300,height:220}),args:{label:"Very long label that should be truncated when the container is too small",modelValue:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",subText:"Very long helper text that should wrap to multiple lines when needed"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text"
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", {
      name: "Label"
    });
    await step("Type multiple lines", async () => {
      await userEvent.click(textarea);
      await userEvent.clear(textarea);
      await userEvent.type(textarea, "Hello{enter}World");
      await expect(textarea).toHaveValue("Hello\\nWorld");
    });
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "First line\\nSecond line"
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    rows: fourRows,
    placeholder: "Enter text"
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Delete to invalidate",
    required: true
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    readonly: true,
    modelValue: "Read only value"
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", {
      name: "Label"
    });
    await step("Is readonly", async () => {
      await expect(textarea).toHaveAttribute("readonly");
    });
    await step("Typing does not change value", async () => {
      await userEvent.click(textarea);
      await userEvent.type(textarea, "X");
      await expect(textarea).toHaveValue("Read only value");
    });
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    placeholder: "Enter text"
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox", {
      name: "Label"
    });
    await step("Is disabled", async () => {
      await expect(textarea).toBeDisabled();
    });
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text",
    subText: "Helper text goes here"
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Checking...",
    validating: true,
    subText: "Validation message"
  }
}`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Invalid value",
    error: true,
    subText: "Error message"
  }
}`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: undefined,
    ariaLabel: "Textarea",
    placeholder: "Enter text"
  }
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Example with an external \`<label>\` element. The external label is connected via \`for\`/\`id\`, so the textarea still has an accessible name even though the component \`label\` prop is omitted."
      }
    }
  },
  render: () => ({
    components: {
      KdsTextarea
    },
    template: \`
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-textarea">External label</label>

        <KdsTextarea
          id="custom-textarea"
          aria-label="External label"
          placeholder="Enter text"
        />
      </div>
    \`
  })
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  component: KdsTextarea,
  combinationsProps: [{
    label: ["Label"],
    ariaLabel: [undefined],
    modelValue: ["", "Value\\nSecond line"],
    rows: [defaultRows, fourRows],
    placeholder: ["", "Placeholder"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Message"]
  }, {
    label: [undefined],
    ariaLabel: ["Textarea"],
    modelValue: ["", "Value\\nSecond line"],
    rows: [defaultRows, fourRows],
    placeholder: ["", "Placeholder"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Message"]
  }],
  pseudoStates: ["hover", "focus"]
})`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsTextarea,
  wrapperStyle: "width: 456px",
  designsToCompare: {
    ".Textarea": {
      props: {
        label: undefined,
        ariaLabel: "Textarea"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8429": {
          placeholder: "{text}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8438": {
          placeholder: "{text}",
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8447": {
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8458": {
          modelValue: "{text}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8467": {
          modelValue: "{text}",
          error: true,
          subText: "{Error message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35740": {
          modelValue: "{text}",
          validating: true,
          subText: "{Validation message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4961-8476": {
          placeholder: "{text}",
          disabled: true
        }
      }
    }
  }
})`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsTextarea,
    width: 300,
    height: 220
  }),
  args: {
    label: "Very long label that should be truncated when the container is too small",
    modelValue: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    subText: "Very long helper text that should wrap to multiple lines when needed"
  }
}`,...h.parameters?.docs?.source}}};const C=["Default","WithValue","FourRows","Required","Readonly","Disabled","WithSubText","Validating","WithError","WithAriaLabel","ExternalLabel","AllCombinations","DesignComparator","TextOverflow"];export{w as AllCombinations,s as Default,y as DesignComparator,u as Disabled,x as ExternalLabel,d as FourRows,c as Readonly,i as Required,h as TextOverflow,p as Validating,g as WithAriaLabel,b as WithError,m as WithSubText,l as WithValue,C as __namedExportsOrder,L as default};
