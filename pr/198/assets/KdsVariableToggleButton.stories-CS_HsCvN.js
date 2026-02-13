import{b as g,c as b}from"./storybook-vnuYObB_.js";import{n as e}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const{expect:u,within:w}=__STORYBOOK_MODULE_TEST__,q={title:"Components/buttons/KdsVariableToggleButton",component:e,tags:["autodocs"],parameters:{docs:{description:{component:"Opens a flow variable popover for output settings. Indicates if no variable, an input variable, an output variable, or both are set. Supports an optional error state."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6708-29786"}},argTypes:{modelValue:{control:"boolean"},inSet:{control:"boolean"},outSet:{control:"boolean"},error:{control:"boolean"},disabled:{control:"boolean"},hidden:{control:"boolean"}},args:{modelValue:!1,inSet:!1,outSet:!1,error:!1,disabled:!1,hidden:!1}},n={parameters:{docs:!1}},t={parameters:{docs:!1},render:()=>({components:{KdsVariableToggleButton:e},template:`
      <div style="display: inline-flex; gap: 12px; align-items: center;">
        <KdsVariableToggleButton :disabled="true" />
        <KdsVariableToggleButton :disabled="true" :model-value="true" />
      </div>
    `})},s={parameters:{docs:!1},args:{hidden:!0},render:r=>({components:{KdsVariableToggleButton:e},setup(){return{args:r}},template:`
      <div
        class="hover-wrapper"
        @mouseover="args.hidden = false"
        @mouseleave="args.hidden = true"
      >
        <div class="hint">Hover this area to show the button, toggle it to keep it visible</div>
        <div class="anchor">
          <KdsVariableToggleButton v-bind="args" />
        </div>
      </div>
    `})},o={parameters:{docs:!1},render:()=>({components:{KdsVariableToggleButton:e},template:`
      <div>
        <KdsVariableToggleButton data-testid="none" :in-set="false" :out-set="false" />
        <KdsVariableToggleButton data-testid="in" :in-set="true" :out-set="false" />
        <KdsVariableToggleButton data-testid="out" :in-set="false" :out-set="true" />
        <KdsVariableToggleButton data-testid="in-out" :in-set="true" :out-set="true" />
      </div>
    `}),play:async({canvasElement:r})=>{const m=w(r),l=[{testId:"none",expectedTitle:"No Flow Variable set"},{testId:"in",expectedTitle:"Input Flow Variable"},{testId:"out",expectedTitle:"Output Flow Variable"},{testId:"in-out",expectedTitle:"Input and Output Flow Variable"}];for(const{testId:c,expectedTitle:p}of l){const i=m.getByTestId(c).closest("button");u(i).toBeTruthy(),await u(i).toHaveAttribute("title",p),await u(i).toHaveAttribute("aria-label",p)}}},a=g({component:e,combinationsProps:[{inSet:[!1,!0],outSet:[!1,!0],error:[!1,!0],disabled:[!1,!0],modelValue:[!1,!0]}],pseudoStates:["hover","active","focus-visible"]}),d=b({component:e,designsToCompare:{"No Variable":{props:{inSet:!1,outSet:!1},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2635-14399":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260751":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261536":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261608":{disabled:!0}}},"In Variable":{props:{inSet:!0,outSet:!1},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2648-14565":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260749":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261538":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261606":{disabled:!0}}},"Out Variable":{props:{inSet:!1,outSet:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2990-23734":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260747":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261540":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261604":{disabled:!0}}},"In + Out Variable":{props:{inSet:!0,outSet:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2990-23830":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260745":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261542":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261602":{disabled:!0}}},"Error (In)":{props:{inSet:!0,outSet:!1,error:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260717":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260836":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261678":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261696":{disabled:!0}}},"Error (Out)":{props:{inSet:!1,outSet:!0,error:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260719":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260841":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261673":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261701":{disabled:!0}}},"Error (In + Out)":{props:{inSet:!0,outSet:!0,error:!0},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260721":{},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260846":{parameters:{pseudo:{hover:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261668":{parameters:{pseudo:{active:!0}}},"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261706":{disabled:!0}}}}});n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  render: () => ({
    components: {
      KdsVariableToggleButton
    },
    template: \`
      <div style="display: inline-flex; gap: 12px; align-items: center;">
        <KdsVariableToggleButton :disabled="true" />
        <KdsVariableToggleButton :disabled="true" :model-value="true" />
      </div>
    \`
  })
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  args: {
    hidden: true
  },
  render: args => ({
    components: {
      KdsVariableToggleButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div
        class="hover-wrapper"
        @mouseover="args.hidden = false"
        @mouseleave="args.hidden = true"
      >
        <div class="hint">Hover this area to show the button, toggle it to keep it visible</div>
        <div class="anchor">
          <KdsVariableToggleButton v-bind="args" />
        </div>
      </div>
    \`
  })
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: false
  },
  render: () => ({
    components: {
      KdsVariableToggleButton
    },
    template: \`
      <div>
        <KdsVariableToggleButton data-testid="none" :in-set="false" :out-set="false" />
        <KdsVariableToggleButton data-testid="in" :in-set="true" :out-set="false" />
        <KdsVariableToggleButton data-testid="out" :in-set="false" :out-set="true" />
        <KdsVariableToggleButton data-testid="in-out" :in-set="true" :out-set="true" />
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const cases = [{
      testId: "none",
      expectedTitle: "No Flow Variable set"
    }, {
      testId: "in",
      expectedTitle: "Input Flow Variable"
    }, {
      testId: "out",
      expectedTitle: "Output Flow Variable"
    }, {
      testId: "in-out",
      expectedTitle: "Input and Output Flow Variable"
    }];
    for (const {
      testId,
      expectedTitle
    } of cases) {
      const button = canvas.getByTestId(testId).closest("button");
      expect(button).toBeTruthy();
      await expect(button!).toHaveAttribute("title", expectedTitle);
      await expect(button!).toHaveAttribute("aria-label", expectedTitle);
    }
  }
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: KdsVariableToggleButton,
  combinationsProps: [{
    inSet: [false, true],
    outSet: [false, true],
    error: [false, true],
    disabled: [false, true],
    modelValue: [false, true]
  }],
  pseudoStates: ["hover", "active", "focus-visible"]
})`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`buildDesignComparatorStory({
  component: KdsVariableToggleButton,
  designsToCompare: {
    "No Variable": {
      props: {
        inSet: false,
        outSet: false
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2635-14399": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260751": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261536": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261608": {
          disabled: true
        }
      }
    },
    "In Variable": {
      props: {
        inSet: true,
        outSet: false
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2648-14565": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260749": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261538": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261606": {
          disabled: true
        }
      }
    },
    "Out Variable": {
      props: {
        inSet: false,
        outSet: true
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2990-23734": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260747": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261540": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261604": {
          disabled: true
        }
      }
    },
    "In + Out Variable": {
      props: {
        inSet: true,
        outSet: true
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2990-23830": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260745": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261542": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261602": {
          disabled: true
        }
      }
    },
    "Error (In)": {
      props: {
        inSet: true,
        outSet: false,
        error: true
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260717": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260836": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261678": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261696": {
          disabled: true
        }
      }
    },
    "Error (Out)": {
      props: {
        inSet: false,
        outSet: true,
        error: true
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260719": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260841": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261673": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261701": {
          disabled: true
        }
      }
    },
    "Error (In + Out)": {
      props: {
        inSet: true,
        outSet: true,
        error: true
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260721": {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260846": {
          parameters: {
            pseudo: {
              hover: true
            }
          }
        },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261668": {
          parameters: {
            pseudo: {
              active: true
            }
          }
        },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261706": {
          disabled: true
        }
      }
    }
  }
})`,...d.parameters?.docs?.source}}};const v=["Default","Disabled","OnlyVisibleOnHover","IconStateLogic","AllCombinations","DesignComparator"];export{a as AllCombinations,n as Default,d as DesignComparator,t as Disabled,o as IconStateLogic,s as OnlyVisibleOnHover,v as __namedExportsOrder,q as default};
