import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../../test-utils/storybook.ts";

import KdsInfoToggleButton from "./KdsInfoToggleButton.vue";

const SAMPLE_CONTENT =
  "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.";

const meta = {
  title: "Form Fields/_Helper/KdsInfoToggleButton",
  component: KdsInfoToggleButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Triggers a popover or action that shows more information. " +
          "Used for configuration settings, nodes and eChart templates.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=11279-92915",
    },
  },
  argTypes: {
    modelValue: { control: { type: "boolean" }, table: { category: "Model" } },
    content: { control: { type: "text" }, table: { category: "Props" } },
    disabled: { control: "boolean", table: { category: "Props" } },
    hidden: { control: "boolean", table: { category: "Props" } },
    default: {
      control: false,
      description:
        "Custom content for the popover. When provided, overrides the `content` prop.",
      table: { category: "Slots" },
    },
  },
  args: {
    modelValue: false,
    content: SAMPLE_CONTENT,
    disabled: false,
    hidden: false,
  },
} satisfies Meta<typeof KdsInfoToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getButton = () =>
      canvas.getByRole("button", {
        name: "Click for more information",
      });

    await expect(getButton()).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(getButton());
    await expect(getButton()).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(getButton());
    await expect(getButton()).toHaveAttribute("aria-pressed", "false");
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const OnlyVisibleOnHover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `hidden` is true, the button is invisible until hovered or focused. " +
          "Once toggled open, it remains visible.",
      },
    },
  },
  args: {
    hidden: true,
  },
  render: (args) => ({
    components: { KdsInfoToggleButton },
    setup() {
      return { args };
    },
    template: `
      <div
        style="padding: 16px; border: 1px dashed var(--kds-color-border-neutral);"
        @mouseenter="args.hidden = false"
        @mouseleave="args.hidden = true"
      >
        <span>Hover this area to show the button</span>
        <KdsInfoToggleButton v-bind="args" />
      </div>
    `,
  }),
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsInfoToggleButton,
  designsToCompare: {
    Default: {
      props: {
        modelValue: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219224":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219228":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219244":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219248":
          { disabled: true },
      },
    },
    Selected: {
      props: {
        modelValue: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219252":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219232":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219236":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219240":
          { disabled: true },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsInfoToggleButton,
  combinationsProps: [
    {
      modelValue: [false, true],
      disabled: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
