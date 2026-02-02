import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsDropdown from "./KdsDropdown.vue";

type Story = StoryObj<typeof KdsDropdown>;

const baseOptions = [
  { value: "a", label: "Label", dataTypeIconName: "string-datatype" },
  { value: "b", label: "Label", dataTypeIconName: "string-datatype" },
  { value: "c", label: "Label", dataTypeIconName: "string-datatype" },
  { value: "d", label: "Label", dataTypeIconName: "string-datatype" },
];

const meta: Meta<typeof KdsDropdown> = {
  title: "Components/forms/KdsDropdown",
  component: KdsDropdown as Meta<typeof KdsDropdown>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Single selection dropdown with optional search inside the list. " +
          "Supports keyboard navigation and missing values.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4516-7427",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the selected option value",
      table: { category: "Model" },
    },
    open: {
      control: "boolean",
      description: "Controls the open state (v-model:open)",
      table: { category: "Model" },
    },
    label: {
      control: "text",
      table: { category: "Props" },
    },
    placeholder: {
      control: "text",
      table: { category: "Props" },
    },
    options: {
      control: "object",
      table: { category: "Props" },
    },
    searchable: {
      control: "boolean",
      table: { category: "Props" },
    },
    noEntriesText: {
      control: "text",
      table: { category: "Props" },
    },
    subText: {
      control: "text",
      table: { category: "Props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "Props" },
    },
    required: {
      control: "boolean",
      table: { category: "Props" },
    },
    error: {
      control: "boolean",
      table: { category: "Props" },
    },
    validating: {
      control: "boolean",
      table: { category: "Props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "Props" },
    },
    ariaLabel: {
      control: "text",
      table: { category: "Props" },
    },
  },
  args: {
    modelValue: null,
    open: false,
    label: "Label",
    placeholder: "{text}",
    options: baseOptions,
    searchable: true,
    noEntriesText: "No entries found",
    disabled: false,
    required: false,
    error: false,
    validating: false,
    subText: "",
    preserveSubTextSpace: false,
    ariaLabel: "Dropdown",
  },
  decorators: [
    (story) => {
      const [currentArgs, updateArgs] = useArgs();
      return {
        components: { story },
        setup() {
          return { args: currentArgs, updateArgs };
        },
        template:
          '<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" @update:open="(value) => updateArgs({ open: value })" />',
      };
    },
  ],
};

export default meta;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    modelValue: "a",
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
};

export const NoEntriesFound: Story = {
  args: {
    open: true,
    options: [],
  },
};

export const MissingValue: Story = {
  args: {
    open: true,
    modelValue: "missing",
    options: [
      {
        value: "missing",
        label: "Label",
        missing: true,
        dataTypeIconName: "string-datatype",
      },
      ...baseOptions,
    ],
  },
};

export const Error: Story = {
  args: {
    error: true,
    subText: "Error message",
  },
};

export const Validating: Story = {
  args: {
    validating: true,
    subText: "Validation message",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsDropdown,
  combinationsProps: [
    {
      modelValue: [null, "a"],
      placeholder: ["{text}"],
      disabled: [false, true],
      error: [false, true],
      validating: [false, true],
      searchable: [false, true],
      options: [baseOptions],
      label: ["Label"],
      subText: [undefined, "Helper text"],
    },
  ],
  pseudoStates: ["hover", "active", "focus", "focus-visible"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsDropdown,
  componentStyle: "width: 213px",
  designsToCompare: {
    ".Dropdown": {
      props: {
        label: undefined,
        ariaLabel: "Dropdown",
        options: baseOptions,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15392":
          {
            placeholder: "{text}",
            modelValue: null,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15391":
          {
            placeholder: "{text}",
            modelValue: null,
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15388":
          {
            modelValue: "a",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15417":
          {
            modelValue: "a",
            error: true,
            subText: "Error message",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35693":
          {
            modelValue: "a",
            validating: true,
            subText: "Validation message",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3594-15389":
          {
            open: true,
            modelValue: "a",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7410-161699":
          {
            open: true,
            modelValue: "missing",
            options: [
              {
                value: "missing",
                label: "Label",
                missing: true,
                dataTypeIconName: "string-datatype",
              },
              ...baseOptions,
            ],
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsDropdown,
    width: 250,
  }),
  args: {
    label: "Label",
    placeholder: "{text}",
    options: [
      {
        value: "long",
        label:
          "A very very very very very long option label that should overflow",
        dataTypeIconName: "string-datatype",
      },
      ...baseOptions,
    ],
    modelValue: "long",
  },
};

export const Interaction: Story = {
  args: {
    label: "Label",
    placeholder: "{text}",
    options: baseOptions,
    modelValue: null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const combobox = canvas.getByRole("combobox");

    await userEvent.click(combobox);
    await userEvent.keyboard("{ArrowDown}{Space}{Enter}");

    await expect(canvas.getByRole("combobox")).toHaveValue("Label");

    await userEvent.click(canvas.getByRole("combobox"));
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Space}{Escape}");

    await expect(canvas.getByRole("combobox")).toHaveValue("Label");
  },
};
