import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import KdsMultiselectListBox from "./KdsMultiselectListBox.vue";
import type { KdsMultiselectListBoxOption } from "./types";

type Story = StoryObj<typeof KdsMultiselectListBox>;

const baseOptions: KdsMultiselectListBoxOption[] = [
  { id: "apple", text: "Apple" },
  { id: "banana", text: "Banana" },
  { id: "cherry", text: "Cherry" },
  { id: "date", text: "Date" },
  { id: "elderberry", text: "Elderberry" },
  { id: "fig", text: "Fig" },
  { id: "grape", text: "Grape" },
  { id: "honeydew", text: "Honeydew" },
];

const manyOptions: KdsMultiselectListBoxOption[] = Array.from(
  { length: 1000 },
  (_, i) => ({
    id: `item-${i}`,
    text: `Item ${i + 1}`,
  }),
);

const meta: Meta<typeof KdsMultiselectListBox> = {
  title: "Form Fields/MultiselectListBox",
  component: KdsMultiselectListBox as Meta<
    typeof KdsMultiselectListBox
  >["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A multiselect list box allowing users to select multiple items from a scrollable list. " +
          "Supports Ctrl+Click, Shift+Click, drag selection, and keyboard navigation (Arrow keys, Home, End, Shift+Home, Shift+End, Ctrl+A).",
      },
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
    ariaLabel: {
      control: "text",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
    size: {
      control: { type: "number", min: 0 },
      table: { category: "props" },
    },
    bottomValue: {
      control: "object",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: [],
    possibleValues: baseOptions,
    ariaLabel: "Fruit list",
    disabled: false,
    size: 5,
    bottomValue: undefined,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsMultiselectListBox },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsMultiselectListBox v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const listbox = canvas.getByRole("listbox", { name: "Fruit list" });

    // Mouse: click to select Apple
    const appleOption = canvas.getByRole("option", { name: "Apple" });
    await user.click(appleOption);
    await expect(appleOption).toHaveAttribute("aria-selected", "true");

    // Mouse: click another item replaces selection
    const bananaOption = canvas.getByRole("option", { name: "Banana" });
    await user.click(bananaOption);
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: focus the list and use ArrowDown
    listbox.focus();
    await user.keyboard("{ArrowDown}");
    const cherryOption = canvas.getByRole("option", { name: "Cherry" });
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: ArrowUp
    await user.keyboard("{ArrowUp}");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: Shift+End — select from Banana (current) to Honeydew (last)
    await user.keyboard("{Shift>}{End}{/Shift}");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    const dateOption = canvas.getByRole("option", { name: "Date" });
    await expect(dateOption).toHaveAttribute("aria-selected", "true");
    const honeydewOption = canvas.getByRole("option", { name: "Honeydew" });
    await expect(honeydewOption).toHaveAttribute("aria-selected", "true");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");

    // Reset: click Cherry to select only Cherry
    await user.click(cherryOption);
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");
    await expect(honeydewOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: Shift+Home — select from Cherry (current) to Apple (first)
    listbox.focus();
    await user.keyboard("{Shift>}{Home}{/Shift}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    await expect(dateOption).toHaveAttribute("aria-selected", "false");

    // Mouse: Ctrl+Click to toggle individual items
    await user.keyboard("{Control>}");
    await user.click(appleOption);
    await user.keyboard("{/Control}");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Control>}");
    await user.click(appleOption);
    await user.keyboard("{/Control}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");

    // Mouse: Shift+Click to select a range
    await user.click(bananaOption);
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");

    await user.keyboard("{Shift>}");
    await user.click(dateOption);
    await user.keyboard("{/Shift}");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    await expect(dateOption).toHaveAttribute("aria-selected", "true");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: Ctrl+A to select all
    listbox.focus();
    await user.keyboard("{Control>}a{/Control}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    await expect(honeydewOption).toHaveAttribute("aria-selected", "true");
  },
};

export const WithSelection: Story = {
  args: {
    modelValue: ["apple", "cherry", "grape"],
  },
};

export const Disabled: Story = {
  args: {
    modelValue: ["apple"],
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const bananaOption = canvas.getByRole("option", { name: "Banana" });

    // Clicking should not change selection when disabled
    await user.click(bananaOption);
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");

    const appleOption = canvas.getByRole("option", { name: "Apple" });
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
  },
};

export const WithAccessory: Story = {
  args: {
    possibleValues: [
      { id: "a", text: "Normal item" },
      { id: "b", text: "Another normal item" },
      {
        id: "c",
        text: "With icon",
        accessory: { type: "icon", name: "placeholder" },
      },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    possibleValues: manyOptions,
    size: 8,
  },
};

export const EmptyList: Story = {
  args: {
    possibleValues: [],
    size: 5,
  },
};

export const AutoSized: Story = {
  args: {
    size: 0,
  },
};

export const WithBottomValue: Story = {
  args: {
    possibleValues: baseOptions,
    bottomValue: { id: "row-id", text: "Row ID" },
    size: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Click bottom value — should select it like any other item
    const bottomOption = canvas.getByRole("option", { name: "Row ID" });
    await user.click(bottomOption);
    await expect(bottomOption).toHaveAttribute("aria-selected", "true");

    // Click a scrollable item — should deselect bottom value and select scrollable
    const appleOption = canvas.getByRole("option", { name: "Apple" });
    await user.click(appleOption);
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(bottomOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: navigate down to the end (into bottom value)
    const listbox = canvas.getByRole("listbox", { name: "Fruit list" });
    listbox.focus();
    await user.keyboard("{End}");
    await expect(bottomOption).toHaveAttribute("aria-selected", "true");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsMultiselectListBox,
    width: 250,
  }),
  args: {
    possibleValues: [
      {
        id: "long",
        text: "A very very very very very long option label that should overflow and be truncated",
      },
      ...baseOptions,
    ],
    ariaLabel: "Fruit list",
    size: 5,
  },
};

// DesignComparator story disabled - no Figma design yet

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsMultiselectListBox,
  combinationsProps: [
    {
      possibleValues: [baseOptions],
      modelValue: [[], ["apple", "cherry"]],
      ariaLabel: ["Fruit list"],
      disabled: [false, true],
      size: [5],
      bottomValue: [undefined, { id: "row-id", text: "Row ID" }],
    } as never,
  ],
  pseudoStates: ["hover", "focus-visible"],
});
