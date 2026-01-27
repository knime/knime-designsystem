import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsCheckbox from "./KdsCheckbox.vue";

type Story = StoryObj<typeof KdsCheckbox>;

const meta: Meta<typeof KdsCheckbox> = {
  title: "Components/forms/KdsCheckbox",
  component: KdsCheckbox as Meta<typeof KdsCheckbox>["component"],
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "select" },
      options: [false, true, "indeterminate"],
      description: "v-model binding for the checkbox state",
      table: { category: "Model" },
    },
    label: {
      control: { type: "text" },
      description: "Required label of the checkbox",
      table: {
        category: "Props",
        required: true,
      },
    },
    disabled: {
      control: { type: "boolean" },
      table: { category: "Props" },
    },
    subText: {
      control: { type: "text" },
      table: { category: "Props" },
    },
    error: {
      control: { type: "boolean" },
      table: { category: "Props" },
    },
    preserveSubTextSpace: {
      control: { type: "boolean" },
      table: { category: "Props" },
    },
  },
  args: {
    modelValue: false,
    label: "Label",
    disabled: false,
    subText: "",
    error: false,
    preserveSubTextSpace: false,
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

export const SubText: Story = {
  args: {
    label: "Label",
    subText: "Sub text",
    modelValue: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    modelValue: true,
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    subText: "Error message",
    modelValue: false,
    error: true,
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  parameters: {
    a11y: {
      disable: true,
    },
  },
  component: KdsCheckbox,
  combinationsProps: [
    {
      modelValue: [false, true, "indeterminate"],
      label: ["Label"],
      disabled: [false, true],
      error: [false, true],
      subText: [undefined, "SubText"],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsCheckbox,
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
            subText: "{SubText content}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51627":
          {
            error: true,
            subText: "{Error message}",
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-199107":
          {
            subText: "{SubText content}",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3932-51641":
          {
            error: true,
            subText: "{Error message}",
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
            subText: "{SubText content}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9186-200090":
          {
            subText: "{SubText content}",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9175-181407":
          {
            error: true,
            subText: "{Error message}",
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsCheckbox,
    width: 200,
  }),
  args: {
    label:
      "This is a very long checkbox label that should overflow and wrap properly when the container is too narrow",
    subText:
      "This is a very long sub text that should also overflow and wrap properly when there is not enough space",
    modelValue: false,
  },
};
