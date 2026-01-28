import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsTextInput from "./KdsTextInput.vue";

const meta: Meta<typeof KdsTextInput> = {
  title: "Components/forms/KdsTextInput",
  component: KdsTextInput,
  parameters: {
    docs: {
      description: {
        component:
          "A text input field component with label and helper/error text support. " +
          "Supports leading/trailing icons, validation states, and accessibility features.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4420-29613",
    },
  },
  argTypes: {
    modelValue: { control: "text" },
    label: { control: "text" },
    subText: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "boolean" },
    validating: { control: "boolean" },
    preserveSubTextSpace: { control: "boolean" },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
    },
    name: { control: "text" },
    autocomplete: { control: "text" },
  },
  args: {
    onFocus: fn(),
    onBlur: fn(),
    onInput: fn(),
    onKeydown: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof KdsTextInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Label",
    placeholder: "Enter text",
  },
};

export const WithValue: Story = {
  args: {
    label: "Label",
    modelValue: "Some value",
  },
};

export const WithSubText: Story = {
  args: {
    label: "Label",
    placeholder: "Enter text",
    subText: "Helper text goes here",
  },
};

export const WithError: Story = {
  args: {
    label: "Label",
    modelValue: "Invalid value",
    error: true,
    subText: "Error message",
  },
};

export const Validating: Story = {
  args: {
    label: "Label",
    modelValue: "Checking...",
    validating: true,
    subText: "Validation message",
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    placeholder: "Enter text",
    disabled: true,
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leadingIcon: "search",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Email",
    placeholder: "your@email.com",
    trailingIcon: "checkmark",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsTextInput,
  combinationsProps: [
    {
      label: ["Label"],
      modelValue: ["", "Value"],
      placeholder: ["Placeholder"],
      disabled: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Helper text"],
      leadingIcon: [undefined, "search"],
      trailingIcon: [undefined, "checkmark"],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsTextInput,
  designsToCompare: {
    ".TextInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31293":
          {
            placeholder: "Placeholder",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31309":
          {
            placeholder: "Hover",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31359":
          {
            placeholder: "Focus",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31387":
          {
            modelValue: "With Value",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-50384":
          {
            modelValue: "Value",
            error: true,
            subText: "Error message",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35518":
          {
            modelValue: "Value",
            validating: true,
            subText: "Validation message",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31415":
          {
            placeholder: "Disabled",
            disabled: true,
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsTextInput,
    width: 300,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    modelValue:
      "Very long value that should be truncated when the container is too small",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
    leadingIcon: "search",
    trailingIcon: "checkmark",
  },
};
