import{b as D,c as U,a as Y}from"./storybook-vnuYObB_.js";import{u as n}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const{useArgs:G}=__STORYBOOK_MODULE_PREVIEW_API__,{expect:e,userEvent:t,within:s}=__STORYBOOK_MODULE_TEST__,L={title:"Components/forms/KdsValueSwitch",component:n,tags:["autodocs"],parameters:{docs:{description:{component:"`KdsValueSwitch` is a radio-group based value selector. It renders a list of options from `possibleValues` and manages the selection via `v-model` (roving tabIndex + arrow-key navigation). Use it for mutually exclusive choices.\n\nAccessibility notes:\n- If you omit `label`, you should provide an accessible name via `aria-label`/`aria-labelledby` on the component (depending on what the component supports) or by wrapping it with an external label.\n- For icon-only options, provide a `title` for each option so each radio has an accessible name."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2007-6814&m=dev"}},argTypes:{modelValue:{control:{type:"text"},description:"Currently selected option id (from `possibleValues`). Can be `undefined` if no option is selected.",table:{category:"Model"}},id:{control:{type:"text"},description:"Optional id for the root element. Useful for external labeling and testing.",table:{category:"Props"}},label:{control:{type:"text"},description:"Optional group label. Recommended for accessibility; if omitted ensure the group still has an accessible name.",table:{category:"Props"}},possibleValues:{control:{type:"object"},description:"Options to render. Use `string[]` for simple cases or an array of objects for richer options: `{ id, text?, title?, leadingIcon?, trailingIcon? }`.\n\n- `id` is the value used for v-model.\n- `text` is the visible label.\n- For icon-only options omit `text` and provide `title` (used as accessible label).",table:{category:"Props"}},variant:{control:{type:"select"},options:["default","muted"],description:"Visual variant of the value switch. Use `muted` for less prominent use cases (e.g. node dialogs).",table:{category:"Props"}},size:{control:{type:"select"},options:["medium","small"],description:"Size of the value switch (affects height, padding and typography).",table:{category:"Props"}},disabled:{control:{type:"boolean"},description:"Disables the entire group and prevents mouse/keyboard interaction.",table:{category:"Props"}},error:{control:{type:"boolean"},description:"Marks the value switch as invalid (group-level validation) and exposes `aria-invalid`.",table:{category:"Props"}},subText:{control:{type:"text"},description:"Optional helper or error text shown below the options. It is referenced via `aria-describedby`.",table:{category:"Props"}},preserveSubTextSpace:{control:{type:"boolean"},description:"Reserve space for `subText` to prevent layout shifts when helper/error text appears.",table:{category:"Props"}}},args:{modelValue:"Option A",id:"value-switch",label:"Label",possibleValues:["Option A","Option B","Option C","Option D"],variant:"default",size:"medium",disabled:!1,error:!1,subText:"",preserveSubTextSpace:!1},decorators:[f=>{const[o,l]=G();return{components:{story:f},setup(){return{args:o,updateArgs:l}},template:'<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />'}}]},c={args:{modelValue:"Option A"}},p={args:{modelValue:"a",possibleValues:[{text:"Option A",id:"a",leadingIcon:"placeholder"},{text:"Option B",id:"b",trailingIcon:"placeholder"},{text:"Option C",id:"c",leadingIcon:"placeholder",trailingIcon:"placeholder"}]}},m={args:{modelValue:"a",possibleValues:[{id:"a",leadingIcon:"view-cards",title:"Cards"},{id:"b",leadingIcon:"list",title:"List"},{id:"c",leadingIcon:"mini-map",title:"Mini map"}]}},b={args:{modelValue:"Option A",size:"small"}},v={args:{modelValue:"Option A",variant:"muted"}},g={args:{modelValue:"Option A",disabled:!0}},x={render:()=>({components:{KdsValueSwitch:n},template:`
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsValueSwitch
          label="Preserve sub text space (no text)"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :preserve-sub-text-space="true"
        />

        <KdsValueSwitch
          label="With sub text"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          sub-text="Additional information about this selection"
        />
      </div>
    `}),parameters:{controls:{disable:!0},actions:{disable:!0}}},w={args:{modelValue:"Option A",error:!0,subText:"Error message"}},A={parameters:{docs:{description:{story:"Example with an external `<label>` element. The external label is connected via `for`/`id`, so the radiogroup still has an accessible name even though the component `label` prop is omitted."}}},render:()=>({components:{KdsValueSwitch:n},template:`
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-value-switch">External label</label>

        <KdsValueSwitch
          id="custom-value-switch"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :label="undefined"
        />
      </div>
    `})},h=D({parameters:{chromatic:{disableSnapshot:!0}},component:n,combinationsProps:[{id:["value-switch-id"],possibleValues:[["Option A","Option B"],[{text:"Option A",id:"Option A",leadingIcon:"search"},{text:"Option B",id:"Option B",trailingIcon:"chevron-right"}],[{id:"Option A",leadingIcon:"view-cards",title:"Cards"},{id:"Option B",leadingIcon:"list",title:"List"}]],modelValue:["Option A"],size:["medium","small"],variant:["default","muted"],label:["Label"],disabled:[!1,!0],subText:[void 0,"Additional information"],error:[!1,!0]}],pseudoStates:["hover","active","focus-visible"]}),V=U({component:n,designsToCompare:{Default:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-14147&m=dev":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-31010&p=f&m=dev":{parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}}}},Muted:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",variant:"muted"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7684-91713&m=dev":{}}},Small:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",size:"small"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-14191&m=dev":{}}},SmallMuted:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",size:"small",variant:"muted"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7684-91743&m=dev":{}}},Error:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",error:!0,subText:"{SubText content}"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2082-20723&m=dev":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-31011&m=dev":{parameters:{pseudo:{focusVisible:!0},figmaOffset:{x:-3,y:-3}}}}},ErrorMuted:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",error:!0,subText:"{SubText content}",variant:"muted"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-106492&m=dev":{}}},SmallError:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",size:"small",error:!0,subText:"{SubText content}"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-13594&m=dev":{}}},SmallErrorMuted:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",size:"small",error:!0,subText:"{SubText content}",variant:"muted"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-106458&m=dev":{}}},DisabledDefault:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",disabled:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7588-143386&m=dev":{}}},DisabledMuted:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"}],modelValue:"a",variant:"muted",disabled:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-97819&m=dev":{}}},SmallDisabledDefault:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"},{text:"{Value}",id:"c"},{text:"{Value}",id:"d"},{text:"{Value}",id:"e"}],modelValue:"a",size:"small",disabled:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7588-143387&m=dev":{}}},SmallDisabledMuted:{props:{possibleValues:[{text:"{Value}",id:"a"},{text:"{Value}",id:"b"}],modelValue:"a",size:"small",variant:"muted",disabled:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-97820&m=dev":{}}}}}),O={...Y({component:n,width:200}),args:{label:"This is a very long group label that should overflow and wrap properly when the container is too narrow",possibleValues:[{text:"Option A",id:"a",leadingIcon:"placeholder",trailingIcon:"placeholder"},{text:"Option B",id:"b",trailingIcon:"placeholder"},{text:"Option C",id:"c",leadingIcon:"placeholder"},{text:"Option D",id:"d"},{id:"f",leadingIcon:"placeholder",title:"Option E"}],modelValue:"a",subText:"General sub text for the entire value switch"}},y={args:{label:"Label"},parameters:{controls:{disable:!0},actions:{disable:!0}},render:()=>({components:{KdsValueSwitch:n},template:`
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsValueSwitch
            label="Interactive group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
              { text: 'Option C', id: 'c' },
              { text: 'Option D', id: 'd' },
            ]"
            sub-text="Group sub text"
            v-model="interactive"
          />
        </div>

        <div>
          <KdsValueSwitch
            label="Error group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
            ]"
            sub-text="Error message"
            error
            v-model="errorGroup"
          />
        </div>

        <div>
          <KdsValueSwitch
            label="Icon-only group"
            :possible-values="[
              { id: 'cards', leadingIcon: 'view-cards', title: 'Cards' },
              { id: 'list', leadingIcon: 'list', title: 'List' },
            ]"
            v-model="iconOnly"
          />
        </div>

        <div>
          <KdsValueSwitch
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
    `,data(){return{interactive:"a",errorGroup:"a",iconOnly:"cards",disabledGroup:"a"}}}),play:async({canvasElement:f})=>{const o=s(f),l=o.getByRole("radiogroup",{name:"Interactive group"}),d=s(l),a=d.getByRole("radio",{name:"Option A"}),i=d.getByRole("radio",{name:"Option B"}),C=d.getByRole("radio",{name:"Option C"}),k=d.getByRole("radio",{name:"Option D"});await e(a).toHaveAttribute("aria-checked","true"),await e(a).toHaveAttribute("tabindex","0"),await e(i).toHaveAttribute("tabindex","-1"),await e(l).toHaveAttribute("aria-describedby"),await t.click(i),await e(i).toHaveAttribute("aria-checked","true"),await e(i).toHaveAttribute("tabindex","0"),await e(a).toHaveAttribute("tabindex","-1"),i.focus(),await t.keyboard("{ArrowRight}"),await e(C).toHaveAttribute("aria-checked","true"),await e(C).toHaveFocus(),await t.keyboard("{ArrowLeft}"),await e(i).toHaveAttribute("aria-checked","true"),await e(i).toHaveFocus(),await t.keyboard("{Home}"),await e(a).toHaveAttribute("aria-checked","true"),await e(a).toHaveFocus(),await t.keyboard("{End}"),await e(k).toHaveAttribute("aria-checked","true"),await e(k).toHaveFocus(),await t.keyboard(" "),await e(k).toHaveAttribute("aria-checked","true");const S=o.getByRole("radiogroup",{name:"Error group"}),H=s(S),B=H.getByRole("radio",{name:"Option A"}),E=H.getByRole("radio",{name:"Option B"});await e(S).toHaveAttribute("aria-invalid","true"),await e(S).toHaveAttribute("aria-describedby"),await t.click(E),await e(E).toHaveAttribute("aria-checked","true"),await e(B).toHaveAttribute("aria-checked","false");const q=o.getByRole("radiogroup",{name:"Icon-only group"}),R=s(q),u=R.getByRole("radio",{name:"Cards"}),T=R.getByRole("radio",{name:"List"});await e(u).toHaveAttribute("aria-checked","true"),await t.click(T),await e(T).toHaveAttribute("aria-checked","true"),await e(u).toHaveAttribute("aria-checked","false");const K=o.getByRole("radiogroup",{name:"Disabled group"}),I=s(K),r=I.getByRole("radio",{name:"Option A"}),F=I.getByRole("radio",{name:"Option B"});await e(r).toBeDisabled(),await e(F).toBeDisabled(),await t.click(F),await e(r).toHaveAttribute("aria-checked","true"),r.focus(),await t.keyboard("{ArrowRight}"),await e(r).toHaveAttribute("aria-checked","true"),await t.click(a),await e(a).toHaveAttribute("aria-checked","true"),await e(a).toHaveAttribute("tabindex","0"),await t.click(B),await e(B).toHaveAttribute("aria-checked","true"),await e(E).toHaveAttribute("aria-checked","false"),await t.click(u),await e(u).toHaveAttribute("aria-checked","true"),await e(T).toHaveAttribute("aria-checked","false"),await e(r).toHaveAttribute("aria-checked","true"),await e(F).toHaveAttribute("aria-checked","false")}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Option A"
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "a",
    possibleValues: [{
      text: "Option A",
      id: "a",
      leadingIcon: "placeholder"
    }, {
      text: "Option B",
      id: "b",
      trailingIcon: "placeholder"
    }, {
      text: "Option C",
      id: "c",
      leadingIcon: "placeholder",
      trailingIcon: "placeholder"
    }]
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "a",
    possibleValues: [{
      id: "a",
      leadingIcon: "view-cards",
      title: "Cards"
    }, {
      id: "b",
      leadingIcon: "list",
      title: "List"
    }, {
      id: "c",
      leadingIcon: "mini-map",
      title: "Mini map"
    }]
  }
}`,...m.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Option A",
    size: "small"
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Option A",
    variant: "muted"
  }
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Option A",
    disabled: true
  }
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      KdsValueSwitch
    },
    template: \`
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsValueSwitch
          label="Preserve sub text space (no text)"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :preserve-sub-text-space="true"
        />

        <KdsValueSwitch
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
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    modelValue: "Option A",
    error: true,
    subText: "Error message"
  }
}`,...w.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Example with an external \`<label>\` element. The external label is connected via \`for\`/\`id\`, so the radiogroup still has an accessible name even though the component \`label\` prop is omitted."
      }
    }
  },
  render: () => ({
    components: {
      KdsValueSwitch
    },
    template: \`
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-value-switch">External label</label>

        <KdsValueSwitch
          id="custom-value-switch"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :label="undefined"
        />
      </div>
    \`
  })
}`,...A.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  component: KdsValueSwitch,
  combinationsProps: [{
    id: ["value-switch-id"],
    possibleValues: [["Option A", "Option B"], [{
      text: "Option A",
      id: "Option A",
      leadingIcon: "search"
    }, {
      text: "Option B",
      id: "Option B",
      trailingIcon: "chevron-right"
    }], [{
      id: "Option A",
      leadingIcon: "view-cards",
      title: "Cards"
    }, {
      id: "Option B",
      leadingIcon: "list",
      title: "List"
    }]],
    modelValue: ["Option A"],
    size: ["medium", "small"],
    variant: ["default", "muted"],
    label: ["Label"],
    disabled: [false, true],
    subText: [undefined, "Additional information"],
    error: [false, true]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...h.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsValueSwitch,
  designsToCompare: {
    Default: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-14147&m=dev": {},
        // Focus (Figma bounding box includes outline)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-31010&p=f&m=dev": {
          parameters: {
            pseudo: {
              focusVisible: true
            },
            figmaOffset: {
              x: -3,
              y: -3
            }
          }
        }
      }
    },
    Muted: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        variant: "muted"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7684-91713&m=dev": {}
      }
    },
    Small: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        size: "small"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-14191&m=dev": {}
      }
    },
    SmallMuted: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        size: "small",
        variant: "muted"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7684-91743&m=dev": {}
      }
    },
    Error: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        error: true,
        subText: "{SubText content}"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2082-20723&m=dev": {},
        // Error + :focus-visible (Accessibility example)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-31011&m=dev": {
          parameters: {
            pseudo: {
              focusVisible: true
            },
            figmaOffset: {
              x: -3,
              y: -3
            }
          }
        }
      }
    },
    ErrorMuted: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        error: true,
        subText: "{SubText content}",
        variant: "muted"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-106492&m=dev": {}
      }
    },
    SmallError: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        size: "small",
        error: true,
        subText: "{SubText content}"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2408-13594&m=dev": {}
      }
    },
    SmallErrorMuted: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        size: "small",
        error: true,
        subText: "{SubText content}",
        variant: "muted"
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-106458&m=dev": {}
      }
    },
    DisabledDefault: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        disabled: true
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7588-143386&m=dev": {}
      }
    },
    DisabledMuted: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }],
        modelValue: "a",
        variant: "muted",
        disabled: true
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-97819&m=dev": {}
      }
    },
    SmallDisabledDefault: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }, {
          text: "{Value}",
          id: "c"
        }, {
          text: "{Value}",
          id: "d"
        }, {
          text: "{Value}",
          id: "e"
        }],
        modelValue: "a",
        size: "small",
        disabled: true
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7588-143387&m=dev": {}
      }
    },
    SmallDisabledMuted: {
      props: {
        possibleValues: [{
          text: "{Value}",
          id: "a"
        }, {
          text: "{Value}",
          id: "b"
        }],
        modelValue: "a",
        size: "small",
        variant: "muted",
        disabled: true
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7691-97820&m=dev": {}
      }
    }
  }
})`,...V.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: KdsValueSwitch,
    width: 200
  }),
  args: {
    label: "This is a very long group label that should overflow and wrap properly when the container is too narrow",
    possibleValues: [{
      text: "Option A",
      id: "a",
      leadingIcon: "placeholder",
      trailingIcon: "placeholder"
    }, {
      text: "Option B",
      id: "b",
      trailingIcon: "placeholder"
    }, {
      text: "Option C",
      id: "c",
      leadingIcon: "placeholder"
    }, {
      text: "Option D",
      id: "d"
    }, {
      id: "f",
      leadingIcon: "placeholder",
      title: "Option E"
    }],
    modelValue: "a",
    subText: "General sub text for the entire value switch"
  }
}`,...O.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
      KdsValueSwitch
    },
    template: \`
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsValueSwitch
            label="Interactive group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
              { text: 'Option C', id: 'c' },
              { text: 'Option D', id: 'd' },
            ]"
            sub-text="Group sub text"
            v-model="interactive"
          />
        </div>

        <div>
          <KdsValueSwitch
            label="Error group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
            ]"
            sub-text="Error message"
            error
            v-model="errorGroup"
          />
        </div>

        <div>
          <KdsValueSwitch
            label="Icon-only group"
            :possible-values="[
              { id: 'cards', leadingIcon: 'view-cards', title: 'Cards' },
              { id: 'list', leadingIcon: 'list', title: 'List' },
            ]"
            v-model="iconOnly"
          />
        </div>

        <div>
          <KdsValueSwitch
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
        errorGroup: "a",
        iconOnly: "cards",
        disabledGroup: "a"
      };
    }
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // -------- Interactive group --------
    const interactiveGroup = canvas.getByRole("radiogroup", {
      name: "Interactive group"
    });
    const interactiveScope = within(interactiveGroup);
    const optionA = interactiveScope.getByRole("radio", {
      name: "Option A"
    });
    const optionB = interactiveScope.getByRole("radio", {
      name: "Option B"
    });
    const optionC = interactiveScope.getByRole("radio", {
      name: "Option C"
    });
    const optionD = interactiveScope.getByRole("radio", {
      name: "Option D"
    });

    // Initial state from v-model
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");
    await expect(optionB).toHaveAttribute("tabindex", "-1");

    // Group sub text should be wired via aria-describedby
    await expect(interactiveGroup).toHaveAttribute("aria-describedby");

    // Mouse: selection changes
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("tabindex", "0");
    await expect(optionA).toHaveAttribute("tabindex", "-1");

    // Keyboard: ArrowRight moves selection
    optionB.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(optionC).toHaveAttribute("aria-checked", "true");
    await expect(optionC).toHaveFocus();

    // ArrowLeft goes back
    await userEvent.keyboard("{ArrowLeft}");
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveFocus();

    // Home -> first
    await userEvent.keyboard("{Home}");
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveFocus();

    // End -> last
    await userEvent.keyboard("{End}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Space on focused option selects it (common for radios)
    await userEvent.keyboard(" ");
    await expect(optionD).toHaveAttribute("aria-checked", "true");

    // -------- Error group --------
    const errorGroup = canvas.getByRole("radiogroup", {
      name: "Error group"
    });
    const errorScope = within(errorGroup);
    const errorA = errorScope.getByRole("radio", {
      name: "Option A"
    });
    const errorB = errorScope.getByRole("radio", {
      name: "Option B"
    });

    // Group-level validation should be exposed via aria-invalid
    await expect(errorGroup).toHaveAttribute("aria-invalid", "true");
    await expect(errorGroup).toHaveAttribute("aria-describedby");
    await userEvent.click(errorB);
    await expect(errorB).toHaveAttribute("aria-checked", "true");
    await expect(errorA).toHaveAttribute("aria-checked", "false");

    // -------- Icon-only group --------
    const iconOnlyGroup = canvas.getByRole("radiogroup", {
      name: "Icon-only group"
    });
    const iconOnlyScope = within(iconOnlyGroup);
    const cards = iconOnlyScope.getByRole("radio", {
      name: "Cards"
    });
    const list = iconOnlyScope.getByRole("radio", {
      name: "List"
    });
    await expect(cards).toHaveAttribute("aria-checked", "true");
    await userEvent.click(list);
    await expect(list).toHaveAttribute("aria-checked", "true");
    await expect(cards).toHaveAttribute("aria-checked", "false");

    // -------- Disabled group --------
    const disabledGroup = canvas.getByRole("radiogroup", {
      name: "Disabled group"
    });
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

    // Reset state so the interaction test can be re-run deterministically.
    // We reset every group that we modified above.

    // Interactive group back to initial: "a".
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");

    // Error group back to initial: "a".
    await userEvent.click(errorA);
    await expect(errorA).toHaveAttribute("aria-checked", "true");
    await expect(errorB).toHaveAttribute("aria-checked", "false");

    // Icon-only group back to initial: "cards".
    await userEvent.click(cards);
    await expect(cards).toHaveAttribute("aria-checked", "true");
    await expect(list).toHaveAttribute("aria-checked", "false");

    // Disabled group should never have changed, but assert initial selection again.
    await expect(disabledA).toHaveAttribute("aria-checked", "true");
    await expect(disabledB).toHaveAttribute("aria-checked", "false");
  }
}`,...y.parameters?.docs?.source}}};const z=["Default","WithIcons","IconOnly","Small","Muted","Disabled","WithSubText","Error","ExternalLabel","AllCombinations","DesignComparator","TextOverflow","Interaction"];export{h as AllCombinations,c as Default,V as DesignComparator,g as Disabled,w as Error,A as ExternalLabel,m as IconOnly,y as Interaction,v as Muted,b as Small,O as TextOverflow,p as WithIcons,x as WithSubText,z as __namedExportsOrder,L as default};
