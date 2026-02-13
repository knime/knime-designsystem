import{b as R,c as q,a as F}from"./storybook-vnuYObB_.js";import{p as i}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:z}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:e,userEvent:t,within:f}=__STORYBOOK_MODULE_TEST__,V=["Option A","Option B"],C=[{text:"Option A",id:"Option A",helperText:"Helper text"},{text:"Option B",id:"Option B",helperText:"Helper text"}],G=[{text:"Option A",id:"Option A",error:!0},{text:"Option B",id:"Option B"}],K=[{text:"Option A",id:"Option A",helperText:"Helper text",error:!0},{text:"Option B",id:"Option B",helperText:"Helper text"}],I={title:"Components/forms/KdsCheckboxGroup",component:i,tags:["autodocs"],parameters:{docs:{description:{component:"A checkbox group component that renders a list of possible values from a data array and manages multiple selections via v-model."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9202-7631&p=f&m=dev"}},argTypes:{modelValue:{control:{type:"object"},description:"The currently selected option ids. Array of strings representing selected checkboxes.",table:{category:"Model"}},id:{control:{type:"text"},description:"Id for label linkage.",table:{category:"Props"}},label:{control:{type:"text"},description:"Required label for group.",table:{category:"Props"}},possibleValues:{control:{type:"object"},description:"Required possibleValues array. Each entry may be a plain string or an object with text, id, and optional disabled/helperText/error for advanced settings.",table:{category:"Props"}},alignment:{control:{type:"select"},options:["vertical","horizontal"],description:"Layout of the checkboxes: vertical (column) or horizontal (row, wrapping).",table:{category:"Props"}},disabled:{control:{type:"boolean"},description:"Disables the whole group (and therefore all possible values) and prevents interaction.",table:{category:"Props"}},error:{control:{type:"boolean"},description:"Whether the group is in an error state. Shows subText in error styling.",table:{category:"Props"}},subText:{control:{type:"text"},description:"Optional helper or error text shown below the possible values and referenced via aria-describedby.",table:{category:"Props"}},preserveSubTextSpace:{control:{type:"boolean"},description:"Reserve space for subtext to prevent layout shifts when helper text or errors appear",table:{category:"Props"}}},args:{modelValue:["Option A"],id:"checkbox-group",label:"Label",possibleValues:["Option A","Option B","Option C","Option D"]},decorators:[k=>{const[B,r]=z();return{components:{story:k},setup(){return{args:B,updateArgs:r}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},l={},p={args:{modelValue:["Option A","Option C"]}},c={args:{subText:"Additional information about this selection"}},d={args:{subText:void 0,preserveSubTextSpace:!0}},b={args:{alignment:"horizontal"}},u={args:{alignment:"horizontal",possibleValues:[{text:"Option A",id:"Option A",helperText:"Helper text"},{text:"Option B",id:"Option B",helperText:"Very long helper text that causes problems"},{text:"Option C",id:"Option C",helperText:"Helper text"}]}},m={args:{possibleValues:C}},x={args:{disabled:!0}},h={args:{error:!0,possibleValues:["Option A","Option B","Option C","Option D"],subText:"Please select at least one option"}},g={args:{possibleValues:[{text:"Option A",id:"Option A",error:!0,helperText:"Still grey"},{text:"Option B",id:"Option B"}],subText:"Selected option has an error"}},v={args:{label:void 0,possibleValues:["Option A","Option B","Option C","Option D"],modelValue:["Option A"]}},O=R({component:i,combinationsProps:[{label:["Label"],disabled:[!1,!0],alignment:["vertical","horizontal"],subText:[void 0,"Additional information"],possibleValues:[V,C],modelValue:[[],["Option A"],["Option A","Option B"]]},{label:["Label"],alignment:["vertical","horizontal"],subText:["Error information"],possibleValues:[G,K],modelValue:[[],["Option A"],["Option A","Option B"]]},{label:["Label"],error:[!0],alignment:["vertical","horizontal"],subText:["Please select at least one option"],possibleValues:[V],modelValue:[[]]}]}),A=q({component:i,designsToCompare:{"Component Source":{props:{label:"{Label}",possibleValues:[{text:"Label",id:"a"},{text:"Label",id:"b"},{text:"Label",id:"c"},{text:"Label",id:"d"}],modelValue:[]},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-319636&p=f&m=dev":{alignment:"vertical",possibleValues:[{text:"Label",id:"a"},{text:"Label",id:"b"},{text:"Label",id:"c"},{text:"Label",id:"d"}]},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-38239&p=f&m=dev":{alignment:"vertical",modelValue:["a"],possibleValues:[{text:"Label",id:"a",error:!0},{text:"Label",id:"b"},{text:"Label",id:"c"},{text:"Label",id:"d"}],subText:"{Error message}"},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-9884&p=f&m=dev":{alignment:"horizontal",possibleValues:[{text:"Label",id:"a"},{text:"Label",id:"b"},{text:"Label",id:"c"},{text:"Label",id:"d"},{text:"Label",id:"e"},{text:"Label",id:"f"},{text:"Label",id:"g"}]},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-38462&p=f&m=dev":{alignment:"horizontal",modelValue:["a"],possibleValues:[{text:"Label",id:"a",error:!0},{text:"Label",id:"b"},{text:"Label",id:"c"},{text:"Label",id:"d"},{text:"Label",id:"e"},{text:"Label",id:"f"},{text:"Label",id:"g"}],subText:"{Error message}"}}}}}),w={...F({component:i,width:200}),args:{label:"This is a very long group label that should overflow and wrap properly when the container is too narrow",possibleValues:[{text:"Short label",id:"a",helperText:"Short helper"},{text:"This is a very long option label that should overflow and wrap properly",id:"b",helperText:"Helper text that is also quite long and may wrap"},{text:"This is another very long option label that should overflow and wrap properly",id:"c",helperText:"Another helper text that is also quite long and may wrap"}],modelValue:["a"],alignment:"horizontal",subText:"General sub text for the entire checkbox group"}},y={args:{label:"Label"},parameters:{controls:{disable:!0},actions:{disable:!0}},render:()=>({components:{KdsCheckboxGroup:i},template:`
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsCheckboxGroup
            id="checkbox-group-1"
            label="Interactive group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
              { text: 'Option C (disabled)', id: 'c', disabled: true },
              { text: 'Option D', id: 'd' },
            ]"
            v-model="interactive"
           />
        </div>

        <div>
          <KdsCheckboxGroup
            id="checkbox-group-2"
            label="Disabled group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
            ]"
            v-model="disabledGroup"
            disabled
          />
        </div>
      </div>
    `,data(){return{interactive:["a"],disabledGroup:["a"]}}}),play:async({canvasElement:k})=>{const r=f(k).getAllByRole("group"),H=r[0],s=f(H),o=s.getByRole("checkbox",{name:"Option A"}),a=s.getByRole("checkbox",{name:"Option B"}),E=s.getByRole("checkbox",{name:"Option C (disabled)"}),n=s.getByRole("checkbox",{name:"Option D"});await e(o).toHaveAttribute("aria-checked","true"),await e(a).toHaveAttribute("aria-checked","false"),await e(E).toBeDisabled(),await e(n).toHaveAttribute("aria-checked","false"),await t.click(a),await e(a).toHaveAttribute("aria-checked","true"),await e(o).toHaveAttribute("aria-checked","true"),await t.click(o),await e(o).toHaveAttribute("aria-checked","false"),await e(a).toHaveAttribute("aria-checked","true"),n.focus(),await t.keyboard(" "),await e(n).toHaveAttribute("aria-checked","true"),await t.keyboard("{Enter}"),await e(n).toHaveAttribute("aria-checked","false"),o.focus(),await t.tab(),await e(a).toHaveFocus(),await t.tab(),await e(n).toHaveFocus(),await t.click(a),await t.click(o),await e(o).toHaveAttribute("aria-checked","true"),await e(a).toHaveAttribute("aria-checked","false");const D=r[1],L=f(D),S=L.getByRole("checkbox",{name:"Option A"}),T=L.getByRole("checkbox",{name:"Option B"});await e(S).toBeDisabled(),await e(T).toBeDisabled(),await t.click(T),await e(S).toHaveAttribute("aria-checked","true"),await e(T).toHaveAttribute("aria-checked","false")}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: ["Option A", "Option C"]
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    subText: "Additional information about this selection"
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    subText: undefined,
    preserveSubTextSpace: true
  }
}`,...d.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    alignment: "horizontal"
  }
}`,...b.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    alignment: "horizontal",
    possibleValues: [{
      text: "Option A",
      id: "Option A",
      helperText: "Helper text"
    }, {
      text: "Option B",
      id: "Option B",
      helperText: "Very long helper text that causes problems"
    }, {
      text: "Option C",
      id: "Option C",
      helperText: "Helper text"
    }]
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    possibleValues: optionsWithHelperText
  }
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    error: true,
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    subText: "Please select at least one option"
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    possibleValues: [{
      text: "Option A",
      id: "Option A",
      error: true,
      helperText: "Still grey"
    }, {
      text: "Option B",
      id: "Option B"
    }],
    subText: "Selected option has an error"
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: undefined,
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    modelValue: ["Option A"]
  }
}`,...v.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsCheckboxGroup,
  combinationsProps: [{
    label: ["Label"],
    disabled: [false, true],
    alignment: ["vertical", "horizontal"],
    subText: [undefined, "Additional information"],
    possibleValues: [twoOptions, optionsWithHelperText],
    modelValue: [[], ["Option A"], ["Option A", "Option B"]]
  }, {
    label: ["Label"],
    alignment: ["vertical", "horizontal"],
    subText: ["Error information"],
    possibleValues: [optionsWithError, optionsWithHelperTextAndError],
    modelValue: [[], ["Option A"], ["Option A", "Option B"]]
  }, {
    label: ["Label"],
    error: [true],
    alignment: ["vertical", "horizontal"],
    subText: ["Please select at least one option"],
    possibleValues: [twoOptions],
    modelValue: [[]]
  }]
})`,...O.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsCheckboxGroup,
  designsToCompare: {
    "Component Source": {
      props: {
        label: "{Label}",
        possibleValues: [{
          text: "Label",
          id: "a"
        }, {
          text: "Label",
          id: "b"
        }, {
          text: "Label",
          id: "c"
        }, {
          text: "Label",
          id: "d"
        }],
        modelValue: []
      },
      variants: {
        // Variants from Figma frame 14198:4812
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-319636&p=f&m=dev": {
          alignment: "vertical",
          possibleValues: [{
            text: "Label",
            id: "a"
          }, {
            text: "Label",
            id: "b"
          }, {
            text: "Label",
            id: "c"
          }, {
            text: "Label",
            id: "d"
          }]
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-38239&p=f&m=dev": {
          alignment: "vertical",
          modelValue: ["a"],
          possibleValues: [{
            text: "Label",
            id: "a",
            error: true
          }, {
            text: "Label",
            id: "b"
          }, {
            text: "Label",
            id: "c"
          }, {
            text: "Label",
            id: "d"
          }],
          subText: "{Error message}"
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-9884&p=f&m=dev": {
          alignment: "horizontal",
          possibleValues: [{
            text: "Label",
            id: "a"
          }, {
            text: "Label",
            id: "b"
          }, {
            text: "Label",
            id: "c"
          }, {
            text: "Label",
            id: "d"
          }, {
            text: "Label",
            id: "e"
          }, {
            text: "Label",
            id: "f"
          }, {
            text: "Label",
            id: "g"
          }]
        },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-38462&p=f&m=dev": {
          alignment: "horizontal",
          modelValue: ["a"],
          possibleValues: [{
            text: "Label",
            id: "a",
            error: true
          }, {
            text: "Label",
            id: "b"
          }, {
            text: "Label",
            id: "c"
          }, {
            text: "Label",
            id: "d"
          }, {
            text: "Label",
            id: "e"
          }, {
            text: "Label",
            id: "f"
          }, {
            text: "Label",
            id: "g"
          }],
          subText: "{Error message}"
        }
      }
    }
  }
})`,...A.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsCheckboxGroup,
    width: 200
  }),
  args: {
    label: "This is a very long group label that should overflow and wrap properly when the container is too narrow",
    possibleValues: [{
      text: "Short label",
      id: "a",
      helperText: "Short helper"
    }, {
      text: "This is a very long option label that should overflow and wrap properly",
      id: "b",
      helperText: "Helper text that is also quite long and may wrap"
    }, {
      text: "This is another very long option label that should overflow and wrap properly",
      id: "c",
      helperText: "Another helper text that is also quite long and may wrap"
    }],
    modelValue: ["a"],
    alignment: "horizontal",
    subText: "General sub text for the entire checkbox group"
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label"
  },
  parameters: {
    controls: {
      disable: true
    },
    actions: {
      disable: true
    }
  },
  render: () => ({
    components: {
      KdsCheckboxGroup
    },
    template: \`
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsCheckboxGroup
            id="checkbox-group-1"
            label="Interactive group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
              { text: 'Option C (disabled)', id: 'c', disabled: true },
              { text: 'Option D', id: 'd' },
            ]"
            v-model="interactive"
           />
        </div>

        <div>
          <KdsCheckboxGroup
            id="checkbox-group-2"
            label="Disabled group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
            ]"
            v-model="disabledGroup"
            disabled
          />
        </div>
      </div>
    \`,
    data() {
      return {
        interactive: ["a"],
        disabledGroup: ["a"]
      };
    }
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const groups = canvas.getAllByRole("group");

    // -------- Interactive group --------
    const interactiveGroup = groups[0];
    const interactiveScope = within(interactiveGroup);
    const optionA = interactiveScope.getByRole("checkbox", {
      name: "Option A"
    });
    const optionB = interactiveScope.getByRole("checkbox", {
      name: "Option B"
    });
    const optionC = interactiveScope.getByRole("checkbox", {
      name: "Option C (disabled)"
    });
    const optionD = interactiveScope.getByRole("checkbox", {
      name: "Option D"
    });

    // Initially, Option A is checked
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("aria-checked", "false");
    await expect(optionC).toBeDisabled();
    await expect(optionD).toHaveAttribute("aria-checked", "false");

    // Click to check Option B
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("aria-checked", "true");

    // Click to uncheck Option A
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "false");
    await expect(optionB).toHaveAttribute("aria-checked", "true");

    // Space key to check Option D
    optionD.focus();
    await userEvent.keyboard(" ");
    await expect(optionD).toHaveAttribute("aria-checked", "true");

    // Enter key to uncheck Option D
    await userEvent.keyboard("{Enter}");
    await expect(optionD).toHaveAttribute("aria-checked", "false");

    // Tab navigation should work
    optionA.focus();
    await userEvent.tab();
    await expect(optionB).toHaveFocus();
    await userEvent.tab();
    // Skip disabled option C
    await expect(optionD).toHaveFocus();

    // Reset state
    await userEvent.click(optionB);
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("aria-checked", "false");

    // -------- Disabled group --------
    const disabledGroup = groups[1];
    const disabledScope = within(disabledGroup);
    const disabledA = disabledScope.getByRole("checkbox", {
      name: "Option A"
    });
    const disabledB = disabledScope.getByRole("checkbox", {
      name: "Option B"
    });
    await expect(disabledA).toBeDisabled();
    await expect(disabledB).toBeDisabled();

    // Neither click nor keyboard should change selection
    await userEvent.click(disabledB);
    await expect(disabledA).toHaveAttribute("aria-checked", "true");
    await expect(disabledB).toHaveAttribute("aria-checked", "false");
  }
}`,...y.parameters?.docs?.source}}};const U=["Default","MultipleSelections","WithSubText","PreserveSubTextSpace","Horizontal","HorizontalWithHelperTexts","WithOptionsHelperText","Disabled","Error","ErrorInOption","WithoutLabel","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{O as AllCombinations,l as Default,A as DesignComparator,x as Disabled,h as Error,g as ErrorInOption,b as Horizontal,u as HorizontalWithHelperTexts,y as Interaction,p as MultipleSelections,d as PreserveSubTextSpace,w as TextOverflow,m as WithOptionsHelperText,c as WithSubText,v as WithoutLabel,U as __namedExportsOrder,I as default};
