import{b as k,c as C,a as R}from"./storybook-vnuYObB_.js";import{d as B,c as v,r as O,z as r,A as o,B as e,a5 as D,a6 as g,a7 as I,a8 as M,a9 as F,aa as H,ab as q,ac as A}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const L={class:"pattern-demo"},W={class:"meta"},K={class:"pattern"},N={class:"value"},Y={key:0,class:"error"},U={class:"value"},Q={class:"table","aria-label":"Pattern demo table"},X={key:0},z={key:1},j={key:0},G={key:1},J={key:2},$=B({__name:"PatternDemo",props:{pattern:{}},setup(d){const s=d,t=v(()=>["a","A","abc","column1","column10","Column1","col","","123"]),a=v(()=>{if(s.pattern==="")return{regexp:null,error:null};try{return{regexp:new RegExp(s.pattern),error:null}}catch(l){return{regexp:null,error:l instanceof Error?l.message:String(l)}}}),p=v(()=>t.value.map(l=>({value:l,matches:a.value.regexp?a.value.regexp.test(l):!1}))),m=O(""),b=v(()=>a.value.regexp?a.value.regexp.test(m.value):null);return(l,n)=>(o(),r("div",L,[e("div",W,[e("div",K,[n[1]||(n[1]=e("span",{class:"label"},"Compiled RegExp:",-1)),e("code",N,g(s.pattern||"(empty)"),1)]),a.value.error?(o(),r("div",Y,[n[2]||(n[2]=e("span",{class:"label"},"Error:",-1)),e("span",U,g(a.value.error),1)])):D("",!0)]),e("table",Q,[n[3]||(n[3]=e("thead",null,[e("tr",null,[e("th",null,"Value"),e("th",null,"Matches")])],-1)),e("tbody",null,[(o(!0),r(I,null,M(p.value,i=>(o(),r("tr",{key:i.value},[e("td",null,[e("code",null,g(i.value===""?"(empty string)":i.value),1)]),e("td",null,[a.value.error?(o(),r("span",X,"—")):(o(),r("span",z,g(i.matches?"Yes":"No"),1))])]))),128)),e("tr",null,[e("td",null,[F(e("input",{"onUpdate:modelValue":n[0]||(n[0]=i=>m.value=i),class:"custom-input",type:"text",placeholder:"Enter custom value","aria-label":"Custom test value"},null,512),[[H,m.value]])]),e("td",null,[a.value.error?(o(),r("span",j,"—")):b.value===null?(o(),r("span",G,"No")):(o(),r("span",J,g(b.value?"Yes":"No"),1))])])])])]))}}),Z=q($,[["__scopeId","data-v-5ea54cb9"]]);$.__docgenInfo={exportName:"default",displayName:"PatternDemo",description:"",tags:{},props:[{name:"pattern",required:!0,type:{name:"string"}}],sourceFiles:["/home/runner/work/knime-designsystem/knime-designsystem/packages/components/src/forms/inputs/PatternInput/PatternDemo.vue"]};const{useArgs:ee}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:u,userEvent:c,within:ae}=__STORYBOOK_MODULE_TEST__,oe={title:"Components/forms/KdsPatternInput",component:A,tags:["autodocs"],parameters:{docs:{description:{component:"An input field for pattern-based filtering. It exposes a single regex v-model and provides built-in toggles for case sensitivity, include/exclude matches, and wildcard/regex mode. Toggle changes are encoded into the emitted regex so consumers don't need separate option bindings."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1498-12041"}},argTypes:{modelValue:{control:"text",description:"Regex string (v-model)",table:{category:"Model"}},ariaLabel:{control:"text",description:"Accessible label used when no visible label is rendered",table:{category:"Props"}},label:{control:"text",table:{category:"Props"}},placeholder:{control:"text",table:{category:"Props"}},name:{control:"text",table:{category:"Props"}},autocomplete:{control:"text",table:{category:"Props"}},subText:{control:"text",table:{category:"Props"}},disabled:{control:"boolean",table:{category:"Props"}},readonly:{control:"boolean",table:{category:"Props"}},required:{control:"boolean",table:{category:"Props"}},error:{control:"boolean",table:{category:"Props"}},validating:{control:"boolean",description:"Shows a spinner next to the subtext when true",table:{category:"Props"}},preserveSubTextSpace:{control:"boolean",table:{category:"Props"}}},args:{modelValue:"",label:"Pattern",ariaLabel:void 0,placeholder:"",name:"",autocomplete:"",subText:"",required:!1,disabled:!1,readonly:!1,validating:!1,error:!1,preserveSubTextSpace:!1},decorators:[d=>{const[s,t]=ee();return{components:{story:d,PatternDemo:Z},setup(){return{args:s,updateArgs:t}},template:`
          <story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />
          <PatternDemo :pattern="args.modelValue" />
          `}}]},y={args:{placeholder:"^column([1-9]|10)$"}},h={args:{modelValue:"^column([1-9]|10)$"}},f={args:{modelValue:"^(?!.*^column([1-9]|10)$).*$"}},w={args:{modelValue:"^column([1-9]|10)$",disabled:!0}},x={args:{modelValue:"^column([1-9]|10)$",readonly:!0}},T={args:{modelValue:"(",error:!0,subText:"Invalid pattern"}},V={args:{modelValue:"^column([1-9]|10)$",validating:!0,subText:"Validating pattern"}},_=k({parameters:{chromatic:{disableSnapshot:!0}},component:A,combinationsProps:[{label:["Pattern"],ariaLabel:[void 0],modelValue:["","^column([1-9]|10)$"],placeholder:["","{pattern}"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Message"]},{label:[void 0],ariaLabel:["Pattern"],modelValue:["","^column([1-9]|10)$"],placeholder:["","{pattern}"],disabled:[!1,!0],readonly:[!1,!0],error:[!1,!0],validating:[!1,!0],subText:[void 0,"Message"]}],pseudoStates:["hover","active","focus"]}),P=C({component:A,wrapperStyle:"width: 218px",designsToCompare:{".PatternInput":{props:{},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-11564":{placeholder:"{Pattern}"}}}}}),S={...R({component:A,width:340}),args:{label:"Very long label that should be truncated when the container is too small",modelValue:"^a-very-very-very-long-pattern-with-a-lot-of-characters-and-groups([0-9]+)$",subText:"Very long helper text that should wrap to multiple lines when needed"}},E={args:{label:"Pattern",ariaLabel:void 0,modelValue:"",placeholder:"^column([1-9]|10)$",disabled:!1,readonly:!1,required:!1,error:!1,validating:!1,subText:"",preserveSubTextSpace:!1,name:"",autocomplete:""},play:async({canvasElement:d,step:s})=>{const t=ae(d),a=t.getByRole("textbox",{name:"Pattern"});await s("Tab navigation (empty)",async()=>{a.blur(),await c.tab(),await u(a).toHaveFocus(),await c.tab();const p=t.getByRole("button",{name:"Match case-insensitive"});await u(p).toHaveFocus()}),await s("Type, clear, and toggle",async()=>{await c.click(a),await c.type(a,"abc"),await u(a).toHaveValue("abc");const p=await t.findByRole("button",{name:"Clear"});await c.tab(),await u(p).toHaveFocus(),await c.keyboard("{Enter}"),await u(a).toHaveValue("");const m=await t.findByRole("button",{name:"Match case-insensitive"});await c.click(m);const b=await t.findByRole("button",{name:"Match case-sensitive"});await u(b).toHaveAttribute("aria-pressed","true")})}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "^column([1-9]|10)$"
  }
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "^column([1-9]|10)$"
  }
}`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "^(?!.*^column([1-9]|10)$).*$"
  }
}`,...f.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "^column([1-9]|10)$",
    disabled: true
  }
}`,...w.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "^column([1-9]|10)$",
    readonly: true
  }
}`,...x.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "(",
    error: true,
    subText: "Invalid pattern"
  }
}`,...T.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "^column([1-9]|10)$",
    validating: true,
    subText: "Validating pattern"
  }
}`,...V.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  component: KdsPatternInput,
  combinationsProps: [{
    label: ["Pattern"],
    ariaLabel: [undefined],
    modelValue: ["", "^column([1-9]|10)$"],
    placeholder: ["", "{pattern}"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Message"]
  }, {
    label: [undefined],
    ariaLabel: ["Pattern"],
    modelValue: ["", "^column([1-9]|10)$"],
    placeholder: ["", "{pattern}"],
    disabled: [false, true],
    readonly: [false, true],
    error: [false, true],
    validating: [false, true],
    subText: [undefined, "Message"]
  }],
  pseudoStates: ["hover", "active", "focus"]
})`,..._.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsPatternInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".PatternInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-11564": {
          placeholder: "{Pattern}"
        }
      }
    }
  }
})`,...P.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsPatternInput,
    width: 340
  }),
  args: {
    label: "Very long label that should be truncated when the container is too small",
    modelValue: "^a-very-very-very-long-pattern-with-a-lot-of-characters-and-groups([0-9]+)$",
    subText: "Very long helper text that should wrap to multiple lines when needed"
  }
}`,...S.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Pattern",
    ariaLabel: undefined,
    modelValue: "",
    placeholder: "^column([1-9]|10)$",
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
      name: "Pattern"
    });
    await step("Tab navigation (empty)", async () => {
      input.blur();
      await userEvent.tab();
      await expect(input).toHaveFocus();
      await userEvent.tab();
      const caseToggle = canvas.getByRole("button", {
        name: "Match case-insensitive"
      });
      await expect(caseToggle).toHaveFocus();
    });
    await step("Type, clear, and toggle", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "abc");
      await expect(input).toHaveValue("abc");

      // Wait for clear button to appear after typing
      const clearButton = await canvas.findByRole("button", {
        name: "Clear"
      });
      await userEvent.tab();
      await expect(clearButton).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await expect(input).toHaveValue("");

      // After clearing, the clear button disappears. Wait for toggle to be focusable.
      const caseToggle = await canvas.findByRole("button", {
        name: "Match case-insensitive"
      });
      await userEvent.click(caseToggle);

      // Wait for toggle state to update - the name changes when pressed
      const caseToggleActive = await canvas.findByRole("button", {
        name: "Match case-sensitive"
      });
      await expect(caseToggleActive).toHaveAttribute("aria-pressed", "true");
    });
  }
}`,...E.parameters?.docs?.source}}};const se=["Default","WithValue","WithEncodedOptions","Disabled","Readonly","WithError","Validating","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{_ as AllCombinations,y as Default,P as DesignComparator,w as Disabled,E as Interaction,x as Readonly,S as TextOverflow,V as Validating,f as WithEncodedOptions,T as WithError,h as WithValue,se as __namedExportsOrder,oe as default};
