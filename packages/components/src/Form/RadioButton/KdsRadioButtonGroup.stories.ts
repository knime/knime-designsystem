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

const twoOptions: KdsRadioButtonGroupProps["possibleValues"] = [
  "Option A",
  "Option B",
];

const optionsWithError: KdsRadioButtonGroupProps["possibleValues"] = [
  { text: "Option A", id: "a", error: true, subText: "Sub Text" },
  { text: "Option B", id: "b" },
];

const optionsWithSubText: KdsRadioButtonGroupProps["possibleValues"] = [
  { text: "Option A", id: "a", subText: "Helper text" },
  { text: "Option B", id: "b", subText: "Helper text" },
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
          "A radio button group component that renders a list of possible values from a data array and manages selection via v-model.",
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
        "The currently selected option id. Can be null when no option is selected.",
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
    possibleValues: {
      control: { type: "object" },
      description:
        "Required possibleValues array (at least 2 entries). Each entry may be a plain string or an object with text, id, and optional disabled/subText/error for advanced settings.",
      table: { category: "Props" },
    },
    alignment: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description:
        "Layout of the radio buttons: vertical (column) or horizontal (row, wrapping).",
      table: { category: "Props" },
    },
    disabled: {
      control: { type: "boolean" },
      description:
        "Disables the whole group (and therefore all possible values) and prevents interaction.",
      table: { category: "Props" },
    },
    trailingIcon: {
      control: { type: "select" },
      options: kdsIconNames,
      description:
        "Optional icon shown next to the label. Requires trailingIconTitle for the tooltip/title.",
      table: { category: "Props" },
    },
    trailingIconTitle: {
      control: { type: "text" },
      description:
        "Title/tooltip for trailingIcon (accessibility + hover tooltip).",
      table: { category: "Props" },
    },
    subText: {
      control: { type: "text" },
      description:
        "Optional helper or error text shown below the possible values and referenced via aria-describedby.",
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
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
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
    trailingIcon: "re-execution",
    trailingIconTitle: "Needs re-execution",
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
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

export const HorizontalWithHelperTexts: Story = {
  args: {
    alignment: "horizontal",
    possibleValues: [
      { text: "Option A", id: "a", subText: "Helper text" },
      {
        text: "Option B",
        id: "b",
        subText: "Very long helper text that causes problems",
      },
      { text: "Option C", id: "c", subText: "Helper text" },
    ],
  },
};

export const TwoOptions: Story = {
  args: {
    possibleValues: twoOptions,
  },
};

export const WithOptionsSubText: Story = {
  args: {
    possibleValues: optionsWithSubText,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    possibleValues: [
      { text: "Option A", id: "a", error: true },
      { text: "Option B", id: "b" },
    ],
    subText: "Selected option has an error",
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
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
      possibleValues: [twoOptions, optionsWithError, optionsWithSubText],
      modelValue: [null, "a", "b"],
      alignment: ["vertical", "horizontal"],
      disabled: [false, true],
      trailingIcon: [undefined, "re-execution"],
      trailingIconTitle: ["Needs re-execution"],
    },
  ],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsRadioButtonGroup,
  designsToCompare: {
    Default: {
      props: {
        label: "{Label}",
        possibleValues: [
          { text: "Label", id: "a" },
          { text: "Label", id: "b" },
          { text: "Label", id: "c" },
          { text: "Label", id: "d" },
        ],
        modelValue: "a",
        trailingIcon: "re-execution",
        trailingIconTitle: "Needs re-execution",
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
        possibleValues: [
          { text: "Label", id: "a", error: true },
          { text: "Label", id: "b" },
          { text: "Label", id: "c" },
          { text: "Label", id: "d" },
        ],
        modelValue: "a",
        trailingIcon: "re-execution",
        trailingIconTitle: "Needs re-execution",
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
    possibleValues: [
      {
        text: "Short label",
        id: "a",
        subText: "Short helper",
      },
      {
        text: "This is a very long option label that should overflow and wrap properly",
        id: "b",
        subText: "Helper text that is also quite long and may wrap",
      },
      {
        text: "This is another very long option label that should overflow and wrap properly",
        id: "c",
        subText: "Another helper text that is also quite long and may wrap",
      },
    ],
    modelValue: "a",
    trailingIcon: "re-execution",
    trailingIconTitle: "Needs re-execution",
    alignment: "horizontal",
    subText: "General sub text for the entire radio button group",
  },
};
