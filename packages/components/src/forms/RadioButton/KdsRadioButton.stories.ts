import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsRadioButton from "./KdsRadioButton.vue";

type Story = StoryObj<typeof KdsRadioButton>;

const meta: Meta<typeof KdsRadioButton> = {
  title: "Form Fields/RadioButtonGroup/RadioButton",
  component: KdsRadioButton as Meta<typeof KdsRadioButton>["component"],
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "boolean" },
      description:
        "Whether the radio button is selected (true) or not (false). Radio buttons don't toggle back to false on click.",
      table: { category: "Model" },
    },
    text: {
      control: { type: "text" },
      description: "Required text shown next to the control.",
      table: { category: "Props" },
    },
    helperText: {
      control: { type: "text" },
      description:
        "Optional helper text shown under the text and referenced via aria-describedby.",
      table: { category: "Props" },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the radio button and prevents interaction.",
      table: { category: "Props" },
    },
    error: {
      control: { type: "boolean" },
      description:
        "Sets the error state (affects styling and sets aria-invalid).",
      table: { category: "Props" },
    },
  },
  args: {
    modelValue: false,
    text: "Label",
    helperText: "",
    disabled: false,
    error: false,
  },
  decorators: [
    (story) => {
      const [currentArgs, updateArgs] = useArgs();
      return {
        components: { story },
        setup() {
          return {
            args: currentArgs,
            updateArgs,
          };
        },
        template:
          '<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />',
      };
    },
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A single radio button. **Can only be used as part of KdsRadioButtonGroup!**",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=327-25185",
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    text: "Label",
    modelValue: false,
  },
};

export const Selected: Story = {
  args: {
    text: "Label",
    modelValue: true,
  },
};

export const WithHelperText: Story = {
  args: {
    text: "Label",
    helperText: "Helper text",
    modelValue: false,
  },
};

export const Disabled: Story = {
  args: {
    text: "Label",
    helperText: "Helper text",
    modelValue: true,
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    text: "Label",
    helperText: "Helper text",
    modelValue: false,
    error: true,
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsRadioButton,
  combinationsProps: [
    {
      modelValue: [false, true],
      disabled: [false, true],
      error: [false, true],
      text: ["Label"],
    },
    {
      modelValue: [false, true],
      disabled: [false, true],
      error: [false, true],
      text: ["Label"],
      helperText: ["Helper text"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsRadioButton,
  designsToCompare: {
    Default: {
      props: {
        text: "Label",
        modelValue: false,
        helperText: "{SubText content}",
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5573":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5584":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5594":
          { parameters: { pseudo: { active: true } } },
        // Enabled :focus-visible
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-30882":
          {
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5624":
          { disabled: true },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5634":
          { error: true },
        // Error :hover (stateHoverValueFalseErrorTrue)
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231875":
          { error: true, parameters: { pseudo: { hover: true } } },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231896":
          { error: true, parameters: { pseudo: { active: true } } },
      },
    },
    Selected: {
      props: {
        text: "Label",
        modelValue: true,
        helperText: "{SubText content}",
      },
      variants: {
        // Enabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5579":
          {},
        // Enabled :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5599":
          { parameters: { pseudo: { hover: true } } },
        // Enabled :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5609":
          { parameters: { pseudo: { active: true } } },
        // Enabled :focus-visible
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=2416-30883":
          {
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        // Disabled
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5629":
          { disabled: true },
        // Error
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1827-5639":
          { error: true },
        // Error :hover
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231870":
          { error: true, parameters: { pseudo: { hover: true } } },
        // Error :active
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9223-231901":
          { error: true, parameters: { pseudo: { active: true } } },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsRadioButton,
    width: 200,
  }),
  args: {
    text: "This is a very long radio label that should overflow and wrap properly when the container is too narrow",
    helperText:
      "This is a very long helper text that should also overflow and wrap properly to test layout stability and accessibility",
    modelValue: false,
  },
};
