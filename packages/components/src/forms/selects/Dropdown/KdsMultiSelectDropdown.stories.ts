import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import KdsMultiSelectDropdown from "./KdsMultiSelectDropdown.vue";
import type { KdsDropdownOption } from "./types";

type Story = StoryObj<typeof KdsMultiSelectDropdown>;

const baseOptions: KdsDropdownOption[] = [
  { id: "a", text: "Label" },
  {
    id: "b",
    text: "Column",
    accessory: { type: "dataType", name: "string-datatype" },
  },
  { id: "c", text: "Other" },
  { id: "d", text: "Disabled", disabled: true },
  { id: "e", text: "Fifth option" },
];

const meta: Meta<typeof KdsMultiSelectDropdown> = {
  title: "Form Fields/MultiSelectDropdown",
  component: KdsMultiSelectDropdown as Meta<
    typeof KdsMultiSelectDropdown
  >["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Multi selection dropdown with searchable options and keyboard navigation via list container.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5107-19153",
    },
  },
  argTypes: {
    modelValue: {
      control: "object",
      description: "Selected option ids",
      table: { category: "model" },
    },
    possibleValues: {
      control: "object",
      table: { category: "props" },
    },
    placeholder: {
      control: "text",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
    loading: {
      control: "boolean",
      table: { category: "props" },
    },
    allowNewValues: {
      control: "boolean",
      table: { category: "props" },
    },
    label: {
      control: "text",
      table: { category: "props" },
    },
    ariaLabel: {
      control: "text",
      table: { category: "props" },
    },
    description: {
      control: "text",
      table: { category: "props" },
    },
    subText: {
      control: "text",
      table: { category: "props" },
    },
    error: {
      control: "boolean",
      table: { category: "props" },
    },
    validating: {
      control: "boolean",
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: [],
    possibleValues: baseOptions,
    placeholder: "Select",
    disabled: false,
    loading: false,
    allowNewValues: false,
    label: "Multi select",
    ariaLabel: undefined,
    description: "",
    subText: "",
    error: false,
    validating: false,
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsMultiSelectDropdown },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsMultiSelectDropdown v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Select/ });

    // Mouse: open dropdown and select an option
    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("option", { name: "Label" }));
    await expect(trigger).toHaveTextContent("Selected (1/5)");

    // Keyboard: navigate and select inside the open dropdown
    const filterInput = canvas.getByRole("searchbox", {
      name: "Filter options",
    });
    await userEvent.click(filterInput);
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    await expect(trigger).toHaveTextContent("Selected (2/5)");
  },
};

export const WithSelection: Story = {
  args: {
    modelValue: ["a", "b", "e"],
  },
};

export const MissingValue: Story = {
  args: {
    modelValue: ["missing-id"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", {
      name: /\(Missing\) missing-id/,
    });

    await userEvent.click(trigger);
    const missingOption = canvas.getByRole("option", { name: /missing-id/ });
    await expect(missingOption).toBeInTheDocument();

    await userEvent.click(missingOption);
    await expect(trigger).toHaveTextContent("Select");
  },
};

export const WithError: Story = {
  args: {
    modelValue: ["a", "b"],
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Select/ });
    await expect(trigger).toBeDisabled();
    await userEvent.click(trigger);
    await expect(canvas.queryByRole("searchbox")).toBeNull();
  },
};

export const AllowNewValues: Story = {
  args: {
    allowNewValues: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Select/ });

    // Open dropdown
    await userEvent.click(trigger);
    const filterInput = canvas.getByRole("searchbox", {
      name: "Filter options",
    });

    // Type a new value
    await userEvent.type(filterInput, "New item");

    // Click the add option inside the list
    const addOption = canvas.getByRole("option", { name: "New item" });
    await userEvent.click(addOption);

    // Trigger should show selected count (new item is added as a real option)
    await expect(trigger).toHaveTextContent("Selected (1/6)");
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsMultiSelectDropdown,
    width: 220,
  }),
  args: {
    modelValue: ["a", "b", "c"],
    possibleValues: [
      {
        id: "a",
        text: "A very long entry label that should be truncated in the trigger",
      },
      {
        id: "b",
        text: "Second very long value to validate summary overflow behavior",
      },
      {
        id: "c",
        text: "Third extremely verbose selected text entry for overflow checks",
      },
    ],
    placeholder: "Select",
    disabled: false,
    error: false,
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsMultiSelectDropdown,
  wrapperStyle: { width: "218px" },
  designsToCompare: {
    "Trigger States": {
      props: {
        possibleValues: baseOptions,
        placeholder: "Select",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5107-19154":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5107-19165":
          {
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5107-19176":
          {
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5476-26845":
          {
            modelValue: ["a", "b"],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=16524-77650":
          {
            modelValue: ["Label"],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5476-26867":
          {
            modelValue: ["a", "b"],
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5476-27133":
          {
            disabled: true,
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsMultiSelectDropdown,
  combinationsProps: [
    {
      possibleValues: [baseOptions],
      modelValue: [[], ["a", "b"], ["missing-id"]],
      placeholder: ["Select"],
      label: ["Multi select"],
      error: [false, true],
      disabled: [false, true],
    } as never,
  ],
  pseudoStates: ["hover", "focus-visible"],
});
