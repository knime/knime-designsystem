import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../test-utils/storybook";

import Checkbox from "./Checkbox.vue";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    modelValue: {
      control: { type: "select" },
      options: [false, true, "indeterminate"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
    helperText: {
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A checkbox component that follows the WAI-ARIA tri-state checkbox design pattern. Supports checked, unchecked, and indeterminate states.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51679",
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: "Label",
    modelValue: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Label",
    modelValue: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Label",
    modelValue: "indeterminate",
  },
};

export const HelperText: Story = {
  args: {
    label: "Label",
    helperText: "Helper text",
    modelValue: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    helperText: "Helper text",
    modelValue: true,
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    helperText: "Error message",
    modelValue: false,
    error: true,
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: Checkbox,
  combinationsProps: [
    {
      modelValue: [false, true, "indeterminate"],
      disabled: [false, true],
      error: [false, true],
      label: [null, "Label"],
    },
    {
      modelValue: [false, true, "indeterminate"],
      disabled: [false, true],
      error: [false, true],
      label: ["Label"],
      helperText: ["Helper text"],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: Checkbox,
  designsToCompare: {
    Default: {
      props: {
        label: "Label",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51009":
          {
            modelValue: false,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51216":
          {
            modelValue: "indeterminate",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51255":
          {
            modelValue: false,
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51627":
          {
            modelValue: false,
            error: true,
            helperText: "Error message",
          },
      },
    },
    Selected: {
      props: {
        label: "Label",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51100":
          {
            modelValue: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51233":
          {
            modelValue: "indeterminate",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51273":
          {
            modelValue: true,
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51641":
          {
            modelValue: true,
            error: true,
            helperText: "Error message",
          },
      },
    },
    "Default + Helper Text": {
      props: {
        label: "Label",
        helperText: "Helper text",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51573":
          {
            modelValue: false,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51585":
          {
            modelValue: "indeterminate",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51588":
          {
            modelValue: false,
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51659":
          {
            modelValue: false,
            error: true,
            helperText: "Error message",
          },
      },
    },
    "Selected + Helper Text": {
      props: {
        label: "Label",
        helperText: "Helper text",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51341":
          {
            modelValue: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51350":
          {
            modelValue: "indeterminate",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51353":
          {
            modelValue: true,
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51668":
          {
            modelValue: true,
            error: true,
            helperText: "Error message",
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: Checkbox,
    width: 200,
  }),
  args: {
    label:
      "This is a very long checkbox label that should overflow and wrap properly when the container is too narrow",
    helperText:
      "This is a very long helper text that should also overflow and wrap properly when there is not enough space",
    modelValue: false,
  },
};
