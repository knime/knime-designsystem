import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import { kdsIconNames } from "../../Icon/constants";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsRadioButtonGroup from "./KdsRadioButtonGroup.vue";
import type { KdsRadioButtonGroupProps } from "./types.ts";

type Story = StoryObj<typeof KdsRadioButtonGroup>;

const twoOptions: KdsRadioButtonGroupProps["options"] = [
  "Option A",
  "Option B",
];

const optionsWithError: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a", error: true },
  { label: "Option B", value: "b" },
];

const optionsWithSubText: KdsRadioButtonGroupProps["options"] = [
  { label: "Option A", value: "a", subText: "Helper text" },
  { label: "Option B", value: "b", subText: "Helper text" },
];

const meta: Meta<typeof KdsRadioButtonGroup> = {
  title: "Components/Form/KdsRadioButtonGroup",
  component: KdsRadioButtonGroup as Meta<
    typeof KdsRadioButtonGroup
  >["component"],
  tags: ["autodocs"],
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
  argTypes: {
    modelValue: {
      control: { type: "text" },
      description:
        "The currently selected option value. Can be null when no option is selected.",
      table: { category: "Model" },
    },
    "onUpdate:modelValue": {
      table: { category: "Model" },
      description: "Emitted when the model changes (v-model update).",
    },
    label: {
      control: { type: "text" },
      description: "Group label as a legend of the fieldset.",
      table: { category: "Props" },
    },
    options: {
      control: { type: "object" },
      description:
        "Required options array (at least 2 entries). Each option may be a plain string or an object with label, value, and optional disabled/subText/error for advanced settings.",
      table: { category: "Props" },
    },
    alignment: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description:
        "Layout of the options: vertical (column) or horizontal (row, wrapping).",
      table: { category: "Props" },
    },
    disabled: {
      control: { type: "boolean" },
      description:
        "Disables the whole group (and therefore all options) and prevents interaction.",
      table: { category: "Props" },
    },
    labelTrailingIcon: {
      control: { type: "select" },
      options: kdsIconNames,
      description:
        "Optional icon shown next to the label. Requires labelTrailingIconTitle for the tooltip/title.",
      table: { category: "Props" },
    },
    labelTrailingIconTitle: {
      control: { type: "text" },
      description:
        "Title/tooltip for labelTrailingIcon (accessibility + hover tooltip).",
      table: { category: "Props" },
    },
    subText: {
      control: { type: "text" },
      description:
        "Optional helper or error text shown below the options and referenced via aria-describedby.",
      table: { category: "Props" },
    },
    preserveSubTextSpace: {
      control: { type: "boolean" },
      description:
        "Reserves space for subText even when it's empty to prevent layout jumps.",
      table: { category: "Props" },
    },
  },
  args: {
    label: "Label",
    options: ["Option A", "Option B", "Option C", "Option D"],
    modelValue: "Option A",
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
};

export default meta;

export const Default: Story = {};

export const WithTrailingIcon: Story = {
  args: {
    label: "Label",
    labelTrailingIcon: "re-execution",
    labelTrailingIconTitle: "Needs re-execution",
    options: ["Option A", "Option B", "Option C", "Option D"],
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

export const WithOptionsSubText: Story = {
  args: {
    options: optionsWithSubText,
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
    options: ["Option A", "Option B", "Option C", "Option D"],
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
      options: [twoOptions, optionsWithError, optionsWithSubText],
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
