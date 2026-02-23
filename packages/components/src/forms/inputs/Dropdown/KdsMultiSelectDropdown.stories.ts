import type { DefineComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import KdsMultiSelectDropdown from "./KdsMultiSelectDropdown.vue";
import type { KdsMultiSelectDropdownProps } from "./multiSelectTypes";
import type { KdsDropdownOption } from "./types";

type Story = StoryObj;

type KdsMultiSelectDropdownStoryArgs = KdsMultiSelectDropdownProps & {
  modelValue?: string[];
};

const baseOptions = [
  { id: "a", text: "Label" },
  { id: "b", text: "Label" },
  { id: "c", text: "Label" },
  { id: "d", text: "Label" },
  { id: "e", text: "Label" },
] satisfies KdsDropdownOption[];

const meta: Meta = {
  title: "Form fields/KdsMultiSelectDropdown",
  component: KdsMultiSelectDropdown as unknown as Meta["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Multi selection dropdown with a popover list and search field. " +
          "Supports keyboard navigation, select all / clear all, and optional adding new values.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5107-19151",
    },
  },
  argTypes: {
    modelValue: {
      control: "object",
      description: "v-model binding for the selected option values",
      table: { category: "Model" },
    },
    label: { control: "text", table: { category: "Props" } },
    placeholder: { control: "text", table: { category: "Props" } },
    possibleValues: { control: "object", table: { category: "Props" } },
    noEntriesText: { control: "text", table: { category: "Props" } },
    allowNewValues: { control: "boolean", table: { category: "Props" } },
    selectAllText: { control: "text", table: { category: "Props" } },
    clearAllText: { control: "text", table: { category: "Props" } },
    minSelected: { control: "number", table: { category: "Props" } },
    maxSelected: { control: "number", table: { category: "Props" } },
    subText: { control: "text", table: { category: "Props" } },
    disabled: { control: "boolean", table: { category: "Props" } },
    required: { control: "boolean", table: { category: "Props" } },
    error: { control: "boolean", table: { category: "Props" } },
    validating: { control: "boolean", table: { category: "Props" } },
    preserveSubTextSpace: { control: "boolean", table: { category: "Props" } },
  },
  args: {
    modelValue: [],
    label: "Label",
    placeholder: "Select",
    possibleValues: baseOptions,
    noEntriesText: "No entries found",
    allowNewValues: false,
    selectAllText: "Select all",
    clearAllText: "Clear all",
    minSelected: 0,
    maxSelected: undefined,
    disabled: false,
    required: false,
    error: false,
    validating: false,
    subText: "",
    preserveSubTextSpace: false,
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
          '<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />',
      };
    },
  ],
};

export default meta;

export const Default: Story = {};

export const WithValues: Story = {
  args: {
    modelValue: ["a", "c"],
  },
};

export const Error: Story = {
  args: {
    error: true,
    subText: "Error message",
    modelValue: ["a", "c"],
  },
};

export const Validating: Story = {
  args: {
    validating: true,
    subText: "Validation message",
    modelValue: ["a", "c"],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: ["a", "c"],
  },
};

export const MissingValues: Story = {
  args: {
    allowNewValues: false,
    modelValue: ["missing", "a"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox");

    await expect(combobox).toHaveTextContent(/\(Missing\)\s*missing/i);

    await userEvent.click(combobox);
    await userEvent.click(
      canvas.getByRole("button", { name: /remove missing value missing/i }),
    );

    await expect(combobox).not.toHaveTextContent(/\(Missing\)/i);
  },
};

export const AllowNewValues: Story = {
  args: {
    allowNewValues: true,
    modelValue: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox"));

    const filter = await canvas.findByRole("textbox", {
      name: "Filter options",
    });
    await userEvent.type(filter, "New Val");

    await userEvent.click(canvas.getByRole("option", { name: /New Val/i }));
    await expect(canvas.getByRole("combobox")).toHaveTextContent(/New Val/i);
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component:
    KdsMultiSelectDropdown as unknown as DefineComponent<KdsMultiSelectDropdownStoryArgs>,
  combinationsProps: [
    {
      label: ["Label"],
      modelValue: [[], ["a"], ["a", "c"]],
      placeholder: ["{text}"],
      disabled: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Helper text"],
      possibleValues: [
        [
          { id: "a", text: "Label" },
          { id: "b", text: "Label" },
          { id: "c", text: "Label" },
        ] satisfies KdsDropdownOption[],
      ],
    },
  ],
  pseudoStates: ["hover", "active", "focus"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsMultiSelectDropdown,
  wrapperStyle: { width: "218px" },
  designsToCompare: {
    ".MultiSelectDropdown": {
      props: {
        label: undefined,
        ariaLabel: "MultiSelectDropdown",
        placeholder: "Select",
        possibleValues: baseOptions,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5107-19154":
          {
            modelValue: [],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5107-19165":
          {
            modelValue: [],
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5107-19176":
          {
            modelValue: [],
            parameters: {
              pseudo: { focusVisible: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5476-26845":
          {
            modelValue: ["a", "c"],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5476-26867":
          {
            modelValue: ["a", "c"],
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5476-27103":
          {
            modelValue: ["a", "c"],
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5476-27133":
          {
            modelValue: ["a", "c"],
            disabled: true,
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsMultiSelectDropdown,
    width: 250,
  }),
  args: {
    label: "Label",
    placeholder: "{text}",
    possibleValues: [
      {
        id: "long",
        text: "A very very very very very long option label that should overflow",
      },
      ...baseOptions,
    ] satisfies KdsDropdownOption[],
    modelValue: ["long"],
  },
};

export const Interaction: Story = {
  args: {
    label: "Label",
    placeholder: "{text}",
    possibleValues: baseOptions,
    modelValue: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox");

    // Keyboard-only: ArrowDown opens and moves focus into the filter input
    combobox.focus();
    await expect(combobox).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");

    const filterInputFromKeyboard = await canvas.findByRole("textbox", {
      name: "Filter options",
    });
    await expect(filterInputFromKeyboard).toHaveFocus();

    // Select first option, should keep popover open
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByRole("combobox")).toHaveTextContent(
      /^\s*Label\s*$/i,
    );

    // Toggle another option
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(canvas.getByRole("combobox")).toHaveTextContent(
      /Selected\s*\(2\//i,
    );

    // Escape closes popover
    await userEvent.keyboard("{Escape}");
    await expect(
      canvas.queryByRole("textbox", { name: "Filter options" }),
    ).not.toBeInTheDocument();
  },
};
