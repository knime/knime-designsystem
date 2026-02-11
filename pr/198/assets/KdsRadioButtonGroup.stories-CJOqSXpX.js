import{b as k,c as C,a as E}from"./storybook-BgwB2tEM.js";import{s as t}from"./iframe-DNHZNOPe.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:D}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:e,userEvent:a,within:w}=__STORYBOOK_MODULE_TEST__,G=[{text:"Option A",id:"Option A",error:!0,helperText:"Helper text"},{text:"Option B",id:"Option B"}],R=[{text:"Option A",id:"Option A",helperText:"Helper text"},{text:"Option B",id:"Option B",helperText:"Helper text"}],F={title:"Components/forms/KdsRadioButtonGroup",component:t,tags:["autodocs"],parameters:{docs:{description:{component:"A radio button group component that renders a list of possible values from a data array and manages selection via v-model."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9325-7964&p=f&m=dev"}},argTypes:{modelValue:{control:{type:"text"},description:"The currently selected option id. Can be undefined when no option is selected.",table:{category:"Model"}},id:{control:{type:"text"},description:"Id set for the group to be linked for an external label.",table:{category:"Props"}},label:{control:{type:"text"},description:"Group label as a legend of the fieldset.",table:{category:"Props"}},possibleValues:{control:{type:"object"},description:"Required possibleValues array (at least 2 entries). Each entry may be a plain string or an object with text, id, and optional disabled/helperText/error for advanced settings.",table:{category:"Props"}},alignment:{control:{type:"select"},options:["vertical","horizontal"],description:"Layout of the radio buttons: vertical (column) or horizontal (row, wrapping).",table:{category:"Props"}},disabled:{control:{type:"boolean"},description:"Disables the whole group (and therefore all possible values) and prevents interaction.",table:{category:"Props"}},subText:{control:{type:"text"},description:"Optional helper or error text shown below the possible values and referenced via aria-describedby.",table:{category:"Props"}},preserveSubTextSpace:{control:{type:"boolean"},description:"Reserve space for subtext to prevent layout shifts when helper text or errors appear",table:{category:"Props"}}},args:{modelValue:"Option A",id:"radio-button-group",label:"Label",possibleValues:["Option A","Option B","Option C","Option D"],alignment:"vertical",disabled:!1,subText:"",preserveSubTextSpace:!1},decorators:[O=>{const[y,n]=D();return{components:{story:O},setup(){return{args:y,updateArgs:n}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},p={},d={args:{possibleValues:R}},u={render:()=>({components:{KdsRadioButtonGroup:t},template:`
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Horizontal"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          alignment="horizontal"
          model-value="Option A"
        />

        <KdsRadioButtonGroup
          label="Horizontal with helper texts"
          :possible-values="[
            { text: 'Option A', id: 'Option A', helperText: 'Helper text' },
            {
              text: 'Option B',
              id: 'Option B',
              helperText: 'Very long helper text that causes problems',
            },
            { text: 'Option C', id: 'Option C', helperText: 'Helper text' },
          ]"
          alignment="horizontal"
          model-value="Option A"
        />
      </div>
    `}),parameters:{controls:{disable:!0},actions:{disable:!0}}},c={args:{disabled:!0}},b={render:()=>({components:{KdsRadioButtonGroup:t},template:`
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Preserve sub text space (no text)"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :preserve-sub-text-space="true"
        />

        <KdsRadioButtonGroup
          label="With sub text"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          sub-text="Additional information about this selection"
        />
      </div>
    `}),parameters:{controls:{disable:!0},actions:{disable:!0}}},m={render:()=>({components:{KdsRadioButtonGroup:t},template:`
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Error"
          :possible-values="[
            { text: 'Option A', id: 'Option A', error: true },
            { text: 'Option B', id: 'Option B' },
          ]"
          sub-text="Selected option has an error"
          model-value="Option A"
        />

        <KdsRadioButtonGroup
          label="Error (with option helper text)"
          :possible-values="[
            {
              text: 'Option A',
              id: 'Option A',
              error: true,
              helperText: 'Helper text',
            },
            {
              text: 'Option B',
              id: 'Option B',
              helperText: 'Helper text',
            },
          ]"
          sub-text="Selected option has an error"
          model-value="Option A"
        />
      </div>
    `}),parameters:{controls:{disable:!0},actions:{disable:!0}}},v={render:()=>({components:{KdsRadioButtonGroup:t},template:`
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-radio-button-group">Custom label</label>

        <KdsRadioButtonGroup
          id="custom-radio-button-group"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :label="undefined"
        />
      </div>
    `})},x=k({component:t,combinationsProps:[{label:["Label",void 0],subText:[void 0,"Additional information"],preserveSubTextSpace:[!1,!0],possibleValues:[["Option A","Option B"],G,R],modelValue:[void 0,"Option A","Option B"],alignment:["vertical","horizontal"],disabled:[!1,!0]}]}),g=C({component:t,designsToCompare:{Default:{props:{label:"{Label}",possibleValues:[{text:"Label",id:"a"},{text:"Label",id:"b"},{text:"Label",id:"c"},{text:"Label",id:"d"}],modelValue:"a"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-319373&m=dev":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-110389&m=dev":{alignment:"horizontal"}}},Error:{props:{label:"{Label}",possibleValues:[{text:"Label",id:"a",error:!0},{text:"Label",id:"b"},{text:"Label",id:"c"},{text:"Label",id:"d"}],modelValue:"a",subText:"{Error message}"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-97153&m=dev":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-110317&m=dev":{alignment:"horizontal"}}}}}),h={...E({component:t,width:200}),args:{label:"This is a very long group label that should overflow and wrap properly when the container is too narrow",possibleValues:[{text:"Short label",id:"a",helperText:"Short helper"},{text:"This is a very long option label that should overflow and wrap properly",id:"b",helperText:"Helper text that is also quite long and may wrap"},{text:"This is another very long option label that should overflow and wrap properly",id:"c",helperText:"Another helper text that is also quite long and may wrap"}],modelValue:"a",alignment:"horizontal",subText:"General sub text for the entire radio button group"}},A={args:{label:"Label"},parameters:{controls:{disable:!0},actions:{disable:!0}},render:()=>({components:{KdsRadioButtonGroup:t},template:`
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsRadioButtonGroup
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
          <KdsRadioButtonGroup
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
    `,data(){return{interactive:"a",disabledGroup:"a"}}}),play:async({canvasElement:O})=>{const n=w(O).getAllByRole("radiogroup"),H=n[0],s=w(H),o=s.getByRole("radio",{name:"Option A"}),i=s.getByRole("radio",{name:"Option B"}),B=s.getByRole("radio",{name:"Option C (disabled)"}),r=s.getByRole("radio",{name:"Option D"});await e(o).toHaveAttribute("aria-checked","true"),await e(o).toHaveAttribute("tabindex","0"),await e(i).toHaveAttribute("tabindex","-1"),await e(B).toBeDisabled(),await a.click(i),await e(i).toHaveAttribute("aria-checked","true"),await e(i).toHaveAttribute("tabindex","0"),await e(o).toHaveAttribute("tabindex","-1"),i.focus(),await a.keyboard("{ArrowRight}"),await e(r).toHaveAttribute("aria-checked","true"),await e(r).toHaveFocus(),await a.keyboard("{Home}"),await e(o).toHaveAttribute("aria-checked","true"),await e(o).toHaveFocus(),await a.keyboard("{End}"),await e(r).toHaveAttribute("aria-checked","true"),await e(r).toHaveFocus(),B.focus(),await a.keyboard("{Enter}"),await e(r).toHaveAttribute("aria-checked","true"),await a.click(o),await e(o).toHaveAttribute("aria-checked","true"),await e(o).toHaveAttribute("tabindex","0");const S=n[1],f=w(S),l=f.getByRole("radio",{name:"Option A"}),T=f.getByRole("radio",{name:"Option B"});await e(l).toBeDisabled(),await e(T).toBeDisabled(),await a.click(T),await e(l).toHaveAttribute("aria-checked","true"),l.focus(),await a.keyboard("{ArrowRight}"),await e(l).toHaveAttribute("aria-checked","true")}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"{}",...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    possibleValues: optionsWithHelperText
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      KdsRadioButtonGroup
    },
    template: \`
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Horizontal"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          alignment="horizontal"
          model-value="Option A"
        />

        <KdsRadioButtonGroup
          label="Horizontal with helper texts"
          :possible-values="[
            { text: 'Option A', id: 'Option A', helperText: 'Helper text' },
            {
              text: 'Option B',
              id: 'Option B',
              helperText: 'Very long helper text that causes problems',
            },
            { text: 'Option C', id: 'Option C', helperText: 'Helper text' },
          ]"
          alignment="horizontal"
          model-value="Option A"
        />
      </div>
    \`
  }),
  parameters: {
    controls: {
      disable: true
    },
    actions: {
      disable: true
    }
  }
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      KdsRadioButtonGroup
    },
    template: \`
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Preserve sub text space (no text)"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :preserve-sub-text-space="true"
        />

        <KdsRadioButtonGroup
          label="With sub text"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          sub-text="Additional information about this selection"
        />
      </div>
    \`
  }),
  parameters: {
    controls: {
      disable: true
    },
    actions: {
      disable: true
    }
  }
}`,...b.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      KdsRadioButtonGroup
    },
    template: \`
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Error"
          :possible-values="[
            { text: 'Option A', id: 'Option A', error: true },
            { text: 'Option B', id: 'Option B' },
          ]"
          sub-text="Selected option has an error"
          model-value="Option A"
        />

        <KdsRadioButtonGroup
          label="Error (with option helper text)"
          :possible-values="[
            {
              text: 'Option A',
              id: 'Option A',
              error: true,
              helperText: 'Helper text',
            },
            {
              text: 'Option B',
              id: 'Option B',
              helperText: 'Helper text',
            },
          ]"
          sub-text="Selected option has an error"
          model-value="Option A"
        />
      </div>
    \`
  }),
  parameters: {
    controls: {
      disable: true
    },
    actions: {
      disable: true
    }
  }
}`,...m.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      KdsRadioButtonGroup
    },
    template: \`
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-radio-button-group">Custom label</label>

        <KdsRadioButtonGroup
          id="custom-radio-button-group"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :label="undefined"
        />
      </div>
    \`
  })
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsRadioButtonGroup,
  combinationsProps: [{
    label: ["Label", undefined],
    subText: [undefined, "Additional information"],
    preserveSubTextSpace: [false, true],
    possibleValues: [["Option A", "Option B"], optionsWithError, optionsWithHelperText],
    modelValue: [undefined, "Option A", "Option B"],
    alignment: ["vertical", "horizontal"],
    disabled: [false, true]
  }]
})`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsRadioButtonGroup,
  designsToCompare: {
    Default: {
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
        modelValue: "a"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-319373&m=dev": {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-110389&m=dev": {
          alignment: "horizontal"
        }
      }
    },
    Error: {
      props: {
        label: "{Label}",
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
        modelValue: "a",
        subText: "{Error message}"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-97153&m=dev": {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-110317&m=dev": {
          alignment: "horizontal"
        }
      }
    }
  }
})`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsRadioButtonGroup,
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
    modelValue: "a",
    alignment: "horizontal",
    subText: "General sub text for the entire radio button group"
  }
}`,...h.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
      KdsRadioButtonGroup
    },
    template: \`
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsRadioButtonGroup
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
          <KdsRadioButtonGroup
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
        interactive: "a",
        disabledGroup: "a"
      };
    }
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const groups = canvas.getAllByRole("radiogroup");

    // -------- Interactive group --------
    const interactiveGroup = groups[0];
    const interactiveScope = within(interactiveGroup);
    const optionA = interactiveScope.getByRole("radio", {
      name: "Option A"
    });
    const optionB = interactiveScope.getByRole("radio", {
      name: "Option B"
    });
    const optionC = interactiveScope.getByRole("radio", {
      name: "Option C (disabled)"
    });
    const optionD = interactiveScope.getByRole("radio", {
      name: "Option D"
    });
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");
    await expect(optionB).toHaveAttribute("tabindex", "-1");
    await expect(optionC).toBeDisabled();

    // Mouse: selection changes
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("tabindex", "0");
    await expect(optionA).toHaveAttribute("tabindex", "-1");

    // Keyboard: ArrowRight moves selection and skips disabled option
    optionB.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Home -> first enabled
    await userEvent.keyboard("{Home}");
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveFocus();

    // End -> last enabled
    await userEvent.keyboard("{End}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Enter on disabled should not change selection
    optionC.focus();
    await userEvent.keyboard("{Enter}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");

    // Reset state so the interaction test can be re-run deterministically
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");

    // -------- Disabled group --------
    const disabledGroup = groups[1];
    const disabledScope = within(disabledGroup);
    const disabledA = disabledScope.getByRole("radio", {
      name: "Option A"
    });
    const disabledB = disabledScope.getByRole("radio", {
      name: "Option B"
    });
    await expect(disabledA).toBeDisabled();
    await expect(disabledB).toBeDisabled();

    // Neither click nor keyboard should change selection
    await userEvent.click(disabledB);
    await expect(disabledA).toHaveAttribute("aria-checked", "true");
    disabledA.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(disabledA).toHaveAttribute("aria-checked", "true");
  }
}`,...A.parameters?.docs?.source}}};const q=["Default","WithOptionsHelperText","Horizontal","Disabled","WithSubText","Error","WithCustomLabel","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{x as AllCombinations,p as Default,g as DesignComparator,c as Disabled,m as Error,u as Horizontal,A as Interaction,h as TextOverflow,v as WithCustomLabel,d as WithOptionsHelperText,b as WithSubText,q as __namedExportsOrder,F as default};
