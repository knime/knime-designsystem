import { ref, watch } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../test-utils/storybook";

import KdsInfoToggleButton from "./KdsInfoToggleButton.vue";

const meta = {
  title: "Buttons/KdsInfoToggleButton",
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
    disabled: { control: "boolean" },
    hidden: { control: "boolean" },
  },
  args: {
    modelValue: false,
    hidden: false,
  },
} satisfies Meta<typeof KdsInfoToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: false,
  },
  args: {
    modelValue: false,
  },
  render: (args) => ({
    components: { KdsInfoToggleButton },
    setup() {
      const { modelValue: initialModelValue, ...rest } = args;
      const localModelValue = ref(initialModelValue);

      watch(
        () => args.modelValue,
        (newValue) => {
          localModelValue.value = newValue;
        },
      );

      return {
        rest,
        localModelValue,
      };
    },
    template: '<KdsInfoToggleButton v-bind="rest" v-model="localModelValue" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getButton = () =>
      canvas.getByRole("button", {
        name: "Click for more information",
      });

    // Deterministic start state
    await expect(getButton()).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(getButton());
    await expect(getButton()).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(getButton());
    await expect(getButton()).toHaveAttribute("aria-pressed", "false");
  },
};

export const Selected: Story = {
  parameters: {
    docs: false,
  },
  args: {
    modelValue: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: false,
  },
  args: {
    disabled: true,
  },
};

export const OnlyVisibleOnHover: Story = {
  parameters: {
    docs: false,
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
      <div class="hover-wrapper" @mouseover="args.hidden = false" @mouseleave="args.hidden = true">
        <div class="hint">Hover this area to show the button, toggle it to keep it visible</div>
        <div class="anchor">
          <KdsInfoToggleButton v-bind="args" />
        </div>
      </div>
    `,
  }),
};

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

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsInfoToggleButton,
  designsToCompare: {
    Default: {
      props: {
        modelValue: false,
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219224":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219228":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219244":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219248":
          { disabled: true },
      },
    },
    Selected: {
      props: {
        modelValue: true,
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219252":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219232":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219236":
          { parameters: { pseudo: { active: true } } },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6837-219240":
          { disabled: true },
      },
    },
  },
});
