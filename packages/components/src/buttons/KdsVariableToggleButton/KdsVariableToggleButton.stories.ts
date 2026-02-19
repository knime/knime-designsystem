import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../test-utils/storybook";

import KdsVariableToggleButton from "./KdsVariableToggleButton.vue";

const meta: Meta<typeof KdsVariableToggleButton> = {
  title: "Buttons/KdsVariableToggleButton",
  component: KdsVariableToggleButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Opens a flow variable popover for output settings. " +
          "Indicates if no variable, an input variable, an output variable, or both are set. " +
          "Supports an optional error state.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6708-29786",
    },
  },
  argTypes: {
    modelValue: { control: "boolean" },
    inSet: { control: "boolean" },
    outSet: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    hidden: { control: "boolean" },
  },
  args: {
    modelValue: false,
    inSet: false,
    outSet: false,
    error: false,
    disabled: false,
    hidden: false,
  },
};

export default meta;

type Story = StoryObj<typeof KdsVariableToggleButton>;

export const Default: Story = {
  parameters: {
    docs: false,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: false,
  },
  render: () => ({
    components: { KdsVariableToggleButton },
    template: `
      <div style="display: inline-flex; gap: 12px; align-items: center;">
        <KdsVariableToggleButton :disabled="true" />
        <KdsVariableToggleButton :disabled="true" :model-value="true" />
      </div>
    `,
  }),
};

export const OnlyVisibleOnHover: Story = {
  parameters: {
    docs: false,
  },
  args: {
    hidden: true,
  },
  render: (args) => ({
    components: { KdsVariableToggleButton },
    setup() {
      return { args };
    },
    template: `
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
    `,
  }),
};

export const IconStateLogic: Story = {
  parameters: {
    docs: false,
  },
  render: () => ({
    components: { KdsVariableToggleButton },
    template: `
      <div>
        <KdsVariableToggleButton data-testid="none" :in-set="false" :out-set="false" />
        <KdsVariableToggleButton data-testid="in" :in-set="true" :out-set="false" />
        <KdsVariableToggleButton data-testid="out" :in-set="false" :out-set="true" />
        <KdsVariableToggleButton data-testid="in-out" :in-set="true" :out-set="true" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cases = [
      {
        testId: "none",
        expectedTitle: "No Flow Variable set",
      },
      {
        testId: "in",
        expectedTitle: "Input Flow Variable",
      },
      {
        testId: "out",
        expectedTitle: "Output Flow Variable",
      },
      {
        testId: "in-out",
        expectedTitle: "Input and Output Flow Variable",
      },
    ];

    for (const { testId, expectedTitle } of cases) {
      const button = canvas.getByTestId(testId).closest("button");
      expect(button).toBeTruthy();
      await expect(button!).toHaveAttribute("title", expectedTitle);
      await expect(button!).toHaveAttribute("aria-label", expectedTitle);
    }
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsVariableToggleButton,
  combinationsProps: [
    {
      inSet: [false, true],
      outSet: [false, true],
      error: [false, true],
      disabled: [false, true],
      modelValue: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsVariableToggleButton,
  designsToCompare: {
    "No Variable": {
      props: { inSet: false, outSet: false },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2635-14399":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260751":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261536":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261608":
          { disabled: true },
      },
    },
    "In Variable": {
      props: { inSet: true, outSet: false },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2648-14565":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260749":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261538":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261606":
          { disabled: true },
      },
    },
    "Out Variable": {
      props: { inSet: false, outSet: true },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2990-23734":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260747":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261540":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261604":
          { disabled: true },
      },
    },
    "In + Out Variable": {
      props: { inSet: true, outSet: true },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2990-23830":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260745":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261542":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261602":
          { disabled: true },
      },
    },
    "Error (In)": {
      props: { inSet: true, outSet: false, error: true },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260717":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260836":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261678":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261696":
          { disabled: true },
      },
    },
    "Error (Out)": {
      props: { inSet: false, outSet: true, error: true },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260719":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260841":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261673":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261701":
          { disabled: true },
      },
    },
    "Error (In + Out)": {
      props: { inSet: true, outSet: true, error: true },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260721":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-260846":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261668":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-261706":
          { disabled: true },
      },
    },
  },
});
