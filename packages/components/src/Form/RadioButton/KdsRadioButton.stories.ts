import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsRadioButton from "./KdsRadioButton.vue";

type Story = StoryObj<typeof KdsRadioButton>;

const meta: Meta<typeof KdsRadioButton> = {
  title: "Components/Form/KdsRadioButton",
  component: KdsRadioButton as Meta<typeof KdsRadioButton>["component"],
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "boolean" },
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
    subText: {
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
          "A radio button component that follows the WAI-ARIA radio design pattern. It displays a circular control with an inner dot when selected.",
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
    label: "Label",
    modelValue: false,
  },
};

export const Selected: Story = {
  args: {
    label: "Label",
    modelValue: true,
  },
};

export const WithSubText: Story = {
  args: {
    label: "Label",
    subText: "Helper text",
    modelValue: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    subText: "Helper text",
    modelValue: true,
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    subText: "Helper text",
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
      label: ["Label"],
    },
    {
      modelValue: [false, true],
      disabled: [false, true],
      error: [false, true],
      label: ["Label"],
      subText: ["Helper text"],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsRadioButton,
  designsToCompare: {
    Default: {
      props: {
        label: "Label",
        modelValue: false,
        subText: "{SubText content}",
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
        label: "Label",
        modelValue: true,
        subText: "{SubText content}",
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
    label:
      "This is a very long radio label that should overflow and wrap properly when the container is too narrow",
    subText:
      "This is a very long helper text that should also overflow and wrap properly when there is not enough space",
    modelValue: false,
  },
};
