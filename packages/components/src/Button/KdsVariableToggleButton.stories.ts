import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../test-utils/storybook";

import KdsVariableToggleButton from "./KdsVariableToggleButton.vue";

const meta: Meta<typeof KdsVariableToggleButton> = {
  title: "Components/Buttons/KdsVariableToggleButton",
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
    disabled: { control: "boolean" },
    icon: {
      control: { type: "select" },
      options: ["none", "in", "out", "in-out"],
    },
    error: { control: "boolean" },
  },
  args: {
    disabled: false,
    icon: "none",
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof KdsVariableToggleButton>;

export const Default: Story = {
  parameters: {
    docs: false,
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsVariableToggleButton,
  combinationsProps: [
    {
      icon: ["none", "in", "out", "in-out"],
      error: [false, true],
      disabled: [false, true],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsVariableToggleButton,
  designsToCompare: {
    "No Variable": {
      props: { icon: "none" },
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
      props: { icon: "in" },
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
      props: { icon: "out" },
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
      props: { icon: "in-out" },
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
      props: { icon: "in", error: true },
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
      props: { icon: "out", error: true },
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
      props: { icon: "in-out", error: true },
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
