import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/internal/preview-api";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../test-utils/storybook";

import KdsInfoToggleButton from "./KdsInfoToggleButton.vue";

const meta = {
  title: "Components/Buttons/KdsInfoToggleButton",
  component: KdsInfoToggleButton as unknown as FunctionalComponent,
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
    disabled: { control: "boolean" },
    visible: { control: "boolean" },
    modelValue: { control: { type: "boolean" } },
  },
  args: {
    modelValue: false,
    visible: true,
    "onUpdate:modelValue": fn(),
  },
  decorators: [
    (story) => {
      const [currentArgs, updateArgs] = useArgs();

      return {
        components: { story },
        setup() {
          const onUpdateModelValue = (value: boolean) => {
            currentArgs["onUpdate:modelValue"]?.(value);
            updateArgs({ modelValue: value });
          };

          return {
            args: currentArgs,
            onUpdateModelValue,
          };
        },
        template:
          '<story :disabled="args.disabled" :visible="args.visible" :model-value="args.modelValue" v-on="{ \'update:modelValue\': onUpdateModelValue }" />',
      };
    },
  ],
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

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsInfoToggleButton,
  combinationsProps: [
    {
      modelValue: [false, true],
      disabled: [false, true],
      visible: [false, true],
    },
  ],
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

export const Interaction: Story = {
  parameters: {
    docs: false,
  },
  args: {
    modelValue: false,
    visible: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: "Click for more information",
    });

    // Deterministic start state
    await expect(button).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(button);
    await expect(button).toHaveAttribute("aria-pressed", "false");
  },
};
