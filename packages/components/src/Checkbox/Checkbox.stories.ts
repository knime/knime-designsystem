import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../test-utils/storybook";

import Checkbox from "./Checkbox.vue";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox as FunctionalComponent, // only because of the generic typing of Checkbox
  tags: ["autodocs"],
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
    title: {
      control: { type: "text" },
    },
  },
  args: {
    "onUpdate:modelValue": fn(),
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
        modelValue: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51009":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51255":
          {
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51573":
          {
            helperText: "Helper text",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51588":
          {
            helperText: "Helper text",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51627":
          {
            error: true,
            helperText: "Error message",
          },
      },
    },
    Checked: {
      props: {
        label: "Label",
        modelValue: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51100":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51273":
          {
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-197571":
          {
            helperText: "Helper text",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-199107":
          {
            helperText: "Helper text",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51641":
          {
            error: true,
            helperText: "Error message",
          },
      },
    },
    Indeterminate: {
      props: {
        label: "Label",
        modelValue: "indeterminate",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-170318":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-170321":
          {
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200078":
          {
            helperText: "Helper text",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200090":
          {
            helperText: "Helper text",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-181407":
          {
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
