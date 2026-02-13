import{d as E,r,ad as x,A as T,ae as P,af as S,a6 as A,ag as l,m as b}from"./iframe-wnIQFRtP.js";import{b as K,c as k,a as w}from"./storybook-vnuYObB_.js";import"./preload-helper-PPVm8Dsz.js";const f=E({__name:"PopoverDemo",props:{content:{default:"Sample popover content"},anchorEl:{},placement:{default:"bottom-right"},paddingSize:{default:"medium"}},setup(o){const n=r(null);return(t,a)=>(T(),x(l,{"activator-el":n.value,"anchor-el":o.anchorEl,placement:o.placement,"padding-size":o.paddingSize},{default:P(()=>[S(A(o.content),1)]),_:1},8,["activator-el","anchor-el","placement","padding-size"]))}});f.__docgenInfo={exportName:"default",displayName:"PopoverDemo",description:"",tags:{},props:[{name:"content",defaultValue:{func:!1,value:'"Sample popover content"'}},{name:"placement",defaultValue:{func:!1,value:'"bottom-right"'}},{name:"paddingSize",defaultValue:{func:!1,value:'"medium"'}}],sourceFiles:["/home/runner/work/knime-designsystem/knime-designsystem/packages/components/src/overlays/Popover/PopoverDemo.vue"]};const H=["top-left","top-right","bottom-left","bottom-right"],y=["small","medium"],{expect:e,userEvent:h,within:B}=__STORYBOOK_MODULE_TEST__,D={title:"Components/overlays/KdsPopover",component:l,tags:["autodocs"],argTypes:{modelValue:{control:{type:"boolean"},table:{category:"Model"}},activatorEl:{table:{category:"Props"}},anchorEl:{table:{category:"Props"}},placement:{control:{type:"select"},options:H,table:{category:"Props"}},paddingSize:{control:{type:"select"},options:y,table:{category:"Props"}},default:{control:{type:"text"},description:"Default slot content rendered inside the popover.",table:{category:"Slots"}}},args:{modelValue:!1,activatorEl:null,anchorEl:null,placement:"bottom-right",paddingSize:"medium",default:"This is a basic popover example."},parameters:{docs:{description:{component:`Positioned popover container based on the native Popover API and CSS anchor positioning.

Automatically sets the following a11y attributes on the activatorEl:
- \`aria-expanded\` – synced with the open state
- \`aria-controls\` – points to the popover's ID
- \`aria-haspopup="dialog"\` – indicates the element controls a dialog

Sample usage:
\`\`\`vue
<script setup lang="ts">
import { ref } from "vue";
import { KdsPopover, KdsToggleButton } from "@knime/kds-components";

const isOpen = ref(false);
const activatorEl = ref<HTMLButtonElement | null>(null);
<\/script>

<template>
  <KdsToggleButton
    ref="activatorEl"
    v-model="isOpen"
    label="Toggle popover"
    variant="outlined"
  />

  <KdsPopover
    v-model="isOpen"
    :activator-el="activatorEl"
    placement="bottom-right"
  >
    Popover content goes here.
  </KdsPopover>
</template>
\`\`\`
`}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454"}}},i={render:o=>({components:{KdsToggleButton:b,KdsPopover:l},setup(){const n=r(null);return{args:o,activatorEl:n}},template:`
      <KdsToggleButton
        ref="activatorEl"
        v-model="args.modelValue"
        label="Toggle popover"
        variant="outlined"
        data-testid="toggle-button"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
        :padding-size="args.paddingSize"
        data-testid="popover"
      >
        {{ args.default }}
      </KdsPopover>
    `}),play:async({canvasElement:o})=>{const n=B(o),t=n.getByTestId("toggle-button"),a=n.getByTestId("popover");e(a).not.toBeVisible(),e(t).toHaveAttribute("aria-haspopup","dialog"),e(t).toHaveAttribute("aria-controls",a.id),e(t).toHaveAttribute("aria-expanded","false"),e(t.style.getPropertyValue("anchor-name")).toBe(`--anchor-${a.id}`),await h.click(t),e(a).toBeVisible(),e(t).toHaveAttribute("aria-haspopup","dialog"),e(t).toHaveAttribute("aria-controls",a.id),e(t).toHaveAttribute("aria-expanded","true"),await h.click(t),e(a).not.toBeVisible(),e(t).toHaveAttribute("aria-haspopup","dialog"),e(t).toHaveAttribute("aria-controls",a.id),e(t).toHaveAttribute("aria-expanded","false")}},p={args:{placement:"top-left"},render:o=>({components:{KdsToggleButton:b,KdsPopover:l},setup(){const n=r(null);return{args:o,activatorEl:n}},template:`
      <KdsToggleButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        v-model="args.modelValue"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
      >
        {{ args.default }}
      </KdsPopover>
    `})},c={args:{paddingSize:"small",default:"This popover has small padding (4px)."},render:o=>({components:{KdsToggleButton:b,KdsPopover:l},setup(){const n=r(null);return{args:o,activatorEl:n}},template:`
      <KdsToggleButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        v-model="args.modelValue"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
        :padding-size="args.paddingSize"
      >
        {{ args.default }}
      </KdsPopover>
    `})},d={render:o=>({components:{KdsToggleButton:b,KdsPopover:l},setup(){const n=r(!1),t=r(null),a=r(null);return{args:o,open:n,activatorEl:t,anchorEl:a}},template:`
      <KdsToggleButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        v-model="open"
        data-testid="toggle-button"
      />

      <div
        ref="anchorEl"
        data-testid="anchor-element"
        style="
          margin-top: var(--kds-spacing-container-1x);
          padding: var(--kds-spacing-container-0-5x);
          border: 1px solid var(--kds-color-border-subtle);
        "
      >
        Separate anchor element
      </div>

      <KdsPopover
        v-model="open"
        :activator-el="activatorEl"
        :anchor-el="anchorEl"
        placement="bottom-right"
        data-testid="popover"
      >
        This popover is anchored to a separate element.
      </KdsPopover>
    `}),play:async({canvasElement:o})=>{const n=B(o),t=n.getByTestId("toggle-button"),a=n.getByTestId("anchor-element"),s=n.getByTestId("popover");e(s).not.toBeVisible(),e(t).toHaveAttribute("aria-haspopup","dialog"),e(t).toHaveAttribute("aria-controls",s.id),e(t).toHaveAttribute("aria-expanded","false"),e(a.style.getPropertyValue("anchor-name")).toBe(`--anchor-${s.id}`),e(t.style.getPropertyValue("anchor-name")).toBe(""),e(a).not.toHaveAttribute("aria-haspopup"),e(a).not.toHaveAttribute("aria-controls"),e(a).not.toHaveAttribute("aria-expanded"),await h.click(t),e(s).toBeVisible(),e(t).toHaveAttribute("aria-expanded","true"),e(a).not.toHaveAttribute("aria-expanded"),await h.click(t),e(s).not.toBeVisible(),e(t).toHaveAttribute("aria-expanded","false")}},u={parameters:{docs:{description:{story:"When the activator ref is invalid (null), the popover renders inline without positioning or the native popover behavior."}}},render:()=>({components:{KdsPopover:l},setup(){return{activatorEl:r(null)}},template:`
      <div style="display: flex">
        <KdsPopover
          :activator-el="activatorEl"
          placement="bottom-right"
        >
          This popover is rendered inline because the activator ref is null.
        </KdsPopover>
      </div>
    `})},v=K({component:f,combinationsProps:[{paddingSize:[...y],content:["Sample popover content"]}]}),g={parameters:{chromatic:{disableSnapshot:!0}},...k({component:f,designsToCompare:{Default:{props:{content:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.",style:"max-width: 353px"},variants:{"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454":{parameters:{figmaOffset:{x:-20,y:-16}}}}}}})},m={...w({component:f,width:240}),args:{content:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large."}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      KdsToggleButton,
      KdsPopover
    },
    setup() {
      const activatorEl = ref<HTMLButtonElement | null>(null);
      return {
        args,
        activatorEl
      };
    },
    template: \`
      <KdsToggleButton
        ref="activatorEl"
        v-model="args.modelValue"
        label="Toggle popover"
        variant="outlined"
        data-testid="toggle-button"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
        :padding-size="args.paddingSize"
        data-testid="popover"
      >
        {{ args.default }}
      </KdsPopover>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("toggle-button");
    const popover = canvas.getByTestId("popover");

    // Initially popover should not be visible
    expect(popover).not.toBeVisible();

    // Activator (which is also the anchor) should have correct a11y attributes
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    // Activator (which is also the anchor) should have CSS anchor-name set
    expect(toggleButton.style.getPropertyValue("anchor-name")).toBe(\`--anchor-\${popover.id}\`);

    // Click to open
    await userEvent.click(toggleButton);
    expect(popover).toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // Click to close
    await userEvent.click(toggleButton);
    expect(popover).not.toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    placement: "top-left"
  },
  render: args => ({
    components: {
      KdsToggleButton,
      KdsPopover
    },
    setup() {
      const activatorEl = ref<HTMLButtonElement | null>(null);
      return {
        args,
        activatorEl
      };
    },
    template: \`
      <KdsToggleButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        v-model="args.modelValue"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
      >
        {{ args.default }}
      </KdsPopover>
    \`
  })
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    paddingSize: "small",
    default: "This popover has small padding (4px)."
  },
  render: args => ({
    components: {
      KdsToggleButton,
      KdsPopover
    },
    setup() {
      const activatorEl = ref<HTMLButtonElement | null>(null);
      return {
        args,
        activatorEl
      };
    },
    template: \`
      <KdsToggleButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        v-model="args.modelValue"
      />

      <KdsPopover
        v-model="args.modelValue"
        :activator-el="activatorEl"
        :placement="args.placement"
        :padding-size="args.paddingSize"
      >
        {{ args.default }}
      </KdsPopover>
    \`
  })
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      KdsToggleButton,
      KdsPopover
    },
    setup() {
      const open = ref(false);
      const activatorEl = ref<HTMLButtonElement | null>(null);
      const anchorEl = ref<HTMLElement | null>(null);
      return {
        args,
        open,
        activatorEl,
        anchorEl
      };
    },
    template: \`
      <KdsToggleButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        v-model="open"
        data-testid="toggle-button"
      />

      <div
        ref="anchorEl"
        data-testid="anchor-element"
        style="
          margin-top: var(--kds-spacing-container-1x);
          padding: var(--kds-spacing-container-0-5x);
          border: 1px solid var(--kds-color-border-subtle);
        "
      >
        Separate anchor element
      </div>

      <KdsPopover
        v-model="open"
        :activator-el="activatorEl"
        :anchor-el="anchorEl"
        placement="bottom-right"
        data-testid="popover"
      >
        This popover is anchored to a separate element.
      </KdsPopover>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("toggle-button");
    const anchorElement = canvas.getByTestId("anchor-element");
    const popover = canvas.getByTestId("popover");

    // Initially popover should not be visible
    expect(popover).not.toBeVisible();

    // A11y attributes should be on the activator, NOT the anchor
    expect(toggleButton).toHaveAttribute("aria-haspopup", "dialog");
    expect(toggleButton).toHaveAttribute("aria-controls", popover.id);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    // CSS anchor-name should be on the anchor element, NOT the activator
    expect(anchorElement.style.getPropertyValue("anchor-name")).toBe(\`--anchor-\${popover.id}\`);
    expect(toggleButton.style.getPropertyValue("anchor-name")).toBe("");

    // Anchor element should NOT have a11y attributes
    expect(anchorElement).not.toHaveAttribute("aria-haspopup");
    expect(anchorElement).not.toHaveAttribute("aria-controls");
    expect(anchorElement).not.toHaveAttribute("aria-expanded");

    // Click to open
    await userEvent.click(toggleButton);
    expect(popover).toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    // Anchor should still not have a11y attributes after open
    expect(anchorElement).not.toHaveAttribute("aria-expanded");

    // Click to close
    await userEvent.click(toggleButton);
    expect(popover).not.toBeVisible();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "When the activator ref is invalid (null), the popover renders inline without positioning or the native popover behavior."
      }
    }
  },
  render: () => ({
    components: {
      KdsPopover
    },
    setup() {
      const activatorEl = ref<HTMLButtonElement | null>(null);
      return {
        activatorEl
      };
    },
    template: \`
      <div style="display: flex">
        <KdsPopover
          :activator-el="activatorEl"
          placement="bottom-right"
        >
          This popover is rendered inline because the activator ref is null.
        </KdsPopover>
      </div>
    \`
  })
}`,...u.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`buildAllCombinationsStory({
  component: PopoverDemo,
  combinationsProps: [{
    paddingSize: [...kdsPopoverPaddingSizes],
    content: ["Sample popover content"]
  }]
})`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  ...buildDesignComparatorStory({
    component: PopoverDemo,
    designsToCompare: {
      Default: {
        props: {
          content: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large.",
          style: "max-width: 353px"
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454": {
            parameters: {
              figmaOffset: {
                x: -20,
                y: -16
              }
            }
          }
        }
      }
    }
  })
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...buildTextOverflowStory({
    component: PopoverDemo,
    width: 240
  }),
  args: {
    content: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large."
  }
}`,...m.parameters?.docs?.source}}};const O=["Default","DifferentPopoverPosition","SmallPadding","SeparateAnchorEl","Inline","AllCombinations","DesignComparator","TextOverflow"];export{v as AllCombinations,i as Default,g as DesignComparator,p as DifferentPopoverPosition,u as Inline,d as SeparateAnchorEl,c as SmallPadding,m as TextOverflow,O as __namedExportsOrder,D as default};
