import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsRadioButtonGroup from "./KdsRadioButtonGroup.vue";
import type { KdsRadioButtonGroupProps } from "./types.ts";

type Story = StoryObj<typeof KdsRadioButtonGroup>;

const fourOptions: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
  { label: "Option D", value: "d" },
];

const threeOptions: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const twoOptions: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
];

const optionsWithHelperText: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a", helperText: "Helper text" },
  { label: "Option B", value: "b", helperText: "Helper text" },
  { label: "Option C", value: "c" },
  { label: "Option D", value: "d" },
];

const meta: Meta<typeof KdsRadioButtonGroup> = {
  title: "Components/Form/KdsRadioButtonGroup",
  component: KdsRadioButtonGroup as Meta<
    typeof KdsRadioButtonGroup
  >["component"],
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: { type: "text" },
    },
    alignment: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
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
    labelIcon: {
      control: { type: "text" },
    },
    labelIconTitle: {
      control: { type: "text" },
    },
    options: {
      control: { type: "object" },
    },
  },
  args: {
    label: "Label",
    options: fourOptions,
    modelValue: "a",
    labelIcon: "re-execution",
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
          "A radio button group component that renders a list of options from a data array and manages selection via v-model.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9325-7964&p=f&m=dev",
    },
  },
};

export default meta;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    alignment: "horizontal",
  },
};

export const TwoOptions: Story = {
  args: {
    options: twoOptions,
  },
};

export const ThreeOptions: Story = {
  args: {
    options: threeOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    options: optionsWithHelperText,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    options: fourOptions,
    modelValue: "a",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsRadioButtonGroup,
  combinationsProps: [
    {
      label: ["Label"],
      options: [twoOptions, threeOptions, fourOptions, optionsWithHelperText],
      modelValue: [null, "a", "b"],
      alignment: ["vertical", "horizontal"],
      disabled: [false, true],
      error: [false, true],
      labelIcon: [undefined, "re-execution"],
      labelIconTitle: [undefined, "Needs re-execution"],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsRadioButtonGroup,
  designsToCompare: {
    Default: {
      props: {
        label: "Label",
        options: fourOptions,
        modelValue: "a",
        labelIcon: "re-execution",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9325-7964&p=f&m=dev":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12282-131903&m=dev":
          {
            alignment: "horizontal",
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsRadioButtonGroup,
    width: 200,
  }),
  args: {
    label:
      "This is a very long group label that should overflow and wrap properly when the container is too narrow",
    options: [
      {
        label:
          "This is a very long option label that should overflow and wrap properly",
        value: "a",
      },
      {
        label:
          "This is another very long option label that should overflow and wrap properly",
        value: "b",
      },
    ],
    modelValue: "a",
    labelIcon: "re-execution",
  },
};
