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

const twoOptions: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
];

const optionsWithError: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a", error: true },
  { label: "Option B", value: "b" },
];

const optionsWithHelperText: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a", subText: "Helper text" },
  { label: "Option B", value: "b", subText: "Helper text" },
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
    labelTrailingIcon: {
      control: { type: "text" },
    },
    labelTrailingIconTitle: {
      control: { type: "text" },
    },
    subText: {
      control: { type: "text" },
    },
    preserveSubTextSpace: {
      control: { type: "boolean" },
    },
    options: {
      control: { type: "object" },
    },
  },
  args: {
    label: "Label",
    options: fourOptions,
    modelValue: "a",
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

export const WithTrailingIcon: Story = {
  args: {
    label: "Label",
    labelTrailingIcon: "re-execution",
    labelTrailingIconTitle: "Needs re-execution",
    options: fourOptions,
    modelValue: "a",
  },
};

export const WithSubText: Story = {
  args: {
    subText: "Additional information about this selection",
  },
};

export const PreserveSubTextSpace: Story = {
  args: {
    subText: undefined,
    preserveSubTextSpace: true,
  },
};

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
    options: [
      { label: "Option A", value: "a", error: true },
      { label: "Option B", value: "b" },
    ],
    subText: "Selected option has an error",
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
      subText: [undefined, "Additional information"],
      preserveSubTextSpace: [false, true],
      options: [twoOptions, optionsWithError, optionsWithHelperText],
      modelValue: [null, "a", "b"],
      alignment: ["vertical", "horizontal"],
      disabled: [false, true],
      labelTrailingIcon: [undefined, "re-execution"],
      labelTrailingIconTitle: ["Needs re-execution"],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsRadioButtonGroup,
  designsToCompare: {
    Default: {
      props: {
        label: "{Label}",
        options: [
          { label: "Label", value: "a" },
          { label: "Label", value: "b" },
          { label: "Label", value: "c" },
          { label: "Label", value: "d" },
        ],
        modelValue: "a",
        labelTrailingIcon: "re-execution",
        labelTrailingIconTitle: "Needs re-execution",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-319373&m=dev":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-110389&m=dev":
          {
            alignment: "horizontal",
          },
      },
    },
    Error: {
      props: {
        label: "{Label}",
        options: [
          { label: "Label", value: "a", error: true },
          { label: "Label", value: "b" },
          { label: "Label", value: "c" },
          { label: "Label", value: "d" },
        ],
        modelValue: "a",
        labelTrailingIcon: "re-execution",
        labelTrailingIconTitle: "Needs re-execution",
        subText: "{Error message}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-97153&m=dev":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12591-110317&m=dev":
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
    labelTrailingIcon: "re-execution",
    labelTrailingIconTitle: "Needs re-execution",
  },
};
