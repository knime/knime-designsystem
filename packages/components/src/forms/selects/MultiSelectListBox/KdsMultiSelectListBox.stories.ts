import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, fireEvent, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import KdsMultiSelectListBox from "./KdsMultiSelectListBox.vue";
import type { KdsMultiSelectListBoxOption } from "./types";

type Story = StoryObj<typeof KdsMultiSelectListBox>;

const baseOptions: KdsMultiSelectListBoxOption[] = [
  { id: "apple", text: "Apple" },
  { id: "banana", text: "Banana" },
  { id: "cherry", text: "Cherry" },
  { id: "date", text: "Date" },
  { id: "elderberry", text: "Elderberry" },
  { id: "fig", text: "Fig" },
  { id: "grape", text: "Grape" },
  { id: "honeydew", text: "Honeydew" },
];

const meta: Meta<typeof KdsMultiSelectListBox> = {
  title: "Form Fields/MultiSelectListBox",
  component: KdsMultiSelectListBox as Meta<
    typeof KdsMultiSelectListBox
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
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=22062-18302",
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
    label: "Fruit list",
    ariaLabel: undefined,
    description: undefined,
    subText: "",
    error: false,
    validating: false,
    preserveSubTextSpace: false,
    disabled: false,
    size: 0,
    bottomValue: undefined,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsMultiSelectListBox },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsMultiSelectListBox v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const listbox = canvas.getByRole("listbox", { name: "Fruit list" });

    // Keyboard: ArrowDown from initial state selects first item
    const appleOption = canvas.getByRole("option", { name: "Apple" });
    listbox.focus();
    await user.keyboard("{ArrowDown}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");

    // Mouse: click to select Apple (keeps selection, resets nav index)
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
    const dateOption = await canvas.findByRole("option", { name: "Date" });
    await expect(dateOption).toHaveAttribute("aria-selected", "true");
    const honeydewOption = await canvas.findByRole("option", {
      name: "Honeydew",
    });
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

    // Mouse: Shift+Click to select a range (anchor stays at initial click)
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

    // Shift+Click again: range extends from banana (anchor), not from date
    const elderberryOption = await canvas.findByRole("option", {
      name: "Elderberry",
    });
    await user.keyboard("{Shift>}");
    await user.click(elderberryOption);
    await user.keyboard("{/Shift}");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    await expect(dateOption).toHaveAttribute("aria-selected", "true");
    await expect(elderberryOption).toHaveAttribute("aria-selected", "true");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: Ctrl+A to select all
    listbox.focus();
    await user.keyboard("{Control>}a{/Control}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    await expect(honeydewOption).toHaveAttribute("aria-selected", "true");

    // Keyboard: Home selects first item
    await user.keyboard("{Home}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: End selects last item
    await user.keyboard("{End}");
    await expect(honeydewOption).toHaveAttribute("aria-selected", "true");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: Shift+ArrowUp extends selection upward
    await user.keyboard("{Shift>}{ArrowUp}{/Shift}");
    const grapeOption = await canvas.findByRole("option", { name: "Grape" });
    await expect(grapeOption).toHaveAttribute("aria-selected", "true");
    await expect(honeydewOption).toHaveAttribute("aria-selected", "true");

    // Keyboard: Shift+ArrowDown extends selection downward (back to honeydew only)
    await user.keyboard("{Shift>}{ArrowDown}{/Shift}");
    await expect(honeydewOption).toHaveAttribute("aria-selected", "true");
    await expect(grapeOption).toHaveAttribute("aria-selected", "false");

    // aria-activedescendant tracks keyboard nav
    await expect(listbox).toHaveAttribute(
      "aria-activedescendant",
      honeydewOption.id,
    );

    // Mouse: drag from Apple to Cherry selects the full range
    const draggedAppleOption = canvas.getByRole("option", { name: "Apple" });
    const draggedBananaOption = canvas.getByRole("option", { name: "Banana" });
    const draggedCherryOption = canvas.getByRole("option", { name: "Cherry" });
    await fireEvent.mouseDown(draggedAppleOption);
    await fireEvent.mouseMove(draggedCherryOption);
    await fireEvent.mouseUp(draggedCherryOption);
    await expect(draggedAppleOption).toHaveAttribute("aria-selected", "true");
    await expect(draggedBananaOption).toHaveAttribute("aria-selected", "true");
    await expect(draggedCherryOption).toHaveAttribute("aria-selected", "true");

    // Blur resets aria-activedescendant
    await user.click(canvasElement);
    await expect(listbox).not.toHaveAttribute("aria-activedescendant");
  },
};

export const WithSelection: Story = {
  args: {
    modelValue: ["apple", "cherry", "grape"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const listbox = canvas.getByRole("listbox", { name: "Fruit list" });
    const appleOption = canvas.getByRole("option", { name: "Apple" });
    const bananaOption = canvas.getByRole("option", { name: "Banana" });
    const cherryOption = canvas.getByRole("option", { name: "Cherry" });
    const grapeOption = canvas.getByRole("option", { name: "Grape" });

    // Initial selected values are rendered correctly
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(cherryOption).toHaveAttribute("aria-selected", "true");
    await expect(grapeOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");

    // Ctrl+Click toggles a preselected value off without affecting others
    await user.keyboard("{Control>}");
    await user.click(cherryOption);
    await user.keyboard("{/Control}");
    await expect(cherryOption).toHaveAttribute("aria-selected", "false");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(grapeOption).toHaveAttribute("aria-selected", "true");

    // Keyboard navigation from the Ctrl+Click position replaces selection with the active item
    listbox.focus();
    await user.keyboard("{ArrowUp}");
    await expect(bananaOption).toHaveAttribute("aria-selected", "true");
    await expect(appleOption).toHaveAttribute("aria-selected", "false");
    await expect(grapeOption).toHaveAttribute("aria-selected", "false");
  },
};

export const ManyItemsWithVirtualScrolling: Story = {
  args: {
    possibleValues: Array.from({ length: 1000 }, (_, i) => ({
      id: `item-${i}`,
      text: `Item ${i + 1}`,
    })),
    size: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const listbox = canvas.getByRole("listbox", { name: "Fruit list" });

    // Virtual scrolling: only a subset of 1000 items should be rendered in the DOM
    const initialOptions = canvas.getAllByRole("option");
    await expect(initialOptions.length).toBeLessThan(1000);

    // First item should be visible
    const item1 = canvas.getByRole("option", { name: "Item 1" });
    await expect(item1).toBeInTheDocument();

    // Keyboard: End jumps to last item — virtual list must scroll and render it
    listbox.focus();
    await user.keyboard("{End}");
    const item1000 = await canvas.findByRole("option", { name: "Item 1000" });
    await expect(item1000).toHaveAttribute("aria-selected", "true");

    // Item 1 should no longer be in the DOM (virtualized away)
    expect(canvas.queryByRole("option", { name: "Item 1" })).toBeNull();

    // Keyboard: Home jumps back to first item
    await user.keyboard("{Home}");
    const item1Again = await canvas.findByRole("option", { name: "Item 1" });
    await expect(item1Again).toHaveAttribute("aria-selected", "true");

    // Item 1000 should no longer be in the DOM
    expect(canvas.queryByRole("option", { name: "Item 1000" })).toBeNull();

    // Navigate down past the visible area — items scroll into view
    for (let i = 0; i < 20; i++) {
      await user.keyboard("{ArrowDown}");
    }
    const item21 = await canvas.findByRole("option", { name: "Item 21" });
    await expect(item21).toHaveAttribute("aria-selected", "true");

    // Shift+End from item 21 selects all items from 21 to 1000
    await user.keyboard("{Shift>}{End}{/Shift}");
    const lastItem = await canvas.findByRole("option", { name: "Item 1000" });
    await expect(lastItem).toHaveAttribute("aria-selected", "true");

    // Navigate back to top, select a mid-range item, then Shift+Click far away
    await user.keyboard("{Home}");
    const firstItem = await canvas.findByRole("option", { name: "Item 1" });
    await expect(firstItem).toHaveAttribute("aria-selected", "true");

    // ArrowDown a few times to item 5, then Shift+End for large shift selection
    for (let i = 0; i < 4; i++) {
      await user.keyboard("{ArrowDown}");
    }
    const item5 = await canvas.findByRole("option", { name: "Item 5" });
    await expect(item5).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Shift>}{End}{/Shift}");
    const lastItemAgain = await canvas.findByRole("option", {
      name: "Item 1000",
    });
    await expect(lastItemAgain).toHaveAttribute("aria-selected", "true");

    // Go home and verify Ctrl+A selects all 1000 items
    await user.keyboard("{Home}");
    await user.keyboard("{Control>}a{/Control}");

    // Scroll to end to verify last item is selected after Ctrl+A
    await user.keyboard("{End}");
    const lastAfterCtrlA = await canvas.findByRole("option", {
      name: "Item 1000",
    });
    await expect(lastAfterCtrlA).toHaveAttribute("aria-selected", "true");

    // Scroll to beginning to verify first item is also selected
    await user.keyboard("{Home}");
    const firstAfterCtrlA = await canvas.findByRole("option", {
      name: "Item 1",
    });
    await expect(firstAfterCtrlA).toHaveAttribute("aria-selected", "true");
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

    // Shift+End from Apple includes bottom value
    await user.keyboard("{Home}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Shift>}{End}{/Shift}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(bottomOption).toHaveAttribute("aria-selected", "true");
  },
};

export const EmptyWithBottomValue: Story = {
  args: {
    possibleValues: [],
    bottomValue: { id: "row-id", text: "Row ID" },
    size: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Bottom value should still be visible
    const bottomOption = canvas.getByRole("option", { name: "Row ID" });
    await expect(bottomOption).toBeInTheDocument();

    // Empty state overlay should NOT be shown when bottomValue exists
    expect(canvas.queryByText("No entries in this list")).toBeNull();

    // Click bottom value works
    await user.click(bottomOption);
    await expect(bottomOption).toHaveAttribute("aria-selected", "true");
  },
};

export const EmptyList: Story = {
  args: {
    possibleValues: [],
    size: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const listbox = canvas.getByRole("listbox", { name: "Fruit list" });

    // Empty state overlay should be visible
    await expect(
      canvas.getByText("No entries in this list"),
    ).toBeInTheDocument();

    // Keyboard nav should not error on empty list
    listbox.focus();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Home}");
    await user.keyboard("{End}");
    await user.keyboard("{Shift>}{End}{/Shift}");
    await user.keyboard("{Shift>}{Home}{/Shift}");
  },
};

export const Disabled: Story = {
  args: {
    modelValue: ["apple"],
    disabled: true,
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: "scrollable-region-focusable", enabled: false }],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const listbox = canvas.getByRole("listbox", { name: "Fruit list" });
    const appleOption = canvas.getByRole("option", { name: "Apple" });
    const bananaOption = canvas.getByRole("option", { name: "Banana" });

    // Mouse: clicking should not change selection when disabled
    await user.click(bananaOption);
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");

    // Keyboard: ArrowDown should not change selection when disabled
    listbox.focus();
    await user.keyboard("{ArrowDown}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: Ctrl+A should not select all when disabled
    await user.keyboard("{Control>}a{/Control}");
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: Home/End should not change selection when disabled
    await user.keyboard("{Home}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{End}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");

    // Keyboard: Shift+ArrowDown should not change selection when disabled
    await user.keyboard("{Shift>}{ArrowDown}{/Shift}");
    await expect(appleOption).toHaveAttribute("aria-selected", "true");
    await expect(bananaOption).toHaveAttribute("aria-selected", "false");

    // aria-disabled should be set on the listbox
    await expect(listbox).toHaveAttribute("aria-disabled", "true");
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsMultiSelectListBox,
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

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsMultiSelectListBox,
  wrapperStyle: { width: "300px" },
  designsToCompare: {
    "Wrapped Field": {
      props: {
        modelValue: ["label-5", "label-7", "label-8"],
        possibleValues: Array.from({ length: 13 }, (_, i) => ({
          id: `label-${i + 1}`,
          text: "Label",
        })),
        label: "{Label}",
        size: 0,
        description: "Info",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=22062-19665":
          {
            parameters: { figmaOffset: { x: 0, y: -1 } },
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsMultiSelectListBox,
  combinationsProps: [
    {
      label: ["Label", undefined],
      possibleValues: [baseOptions],
      modelValue: [[], ["apple", "cherry"]],
      ariaLabel: ["Fruit list"],
      disabled: [false, true],
      size: [5],
      bottomValue: [undefined, { id: "row-id", text: "Row ID" }],
    } as never,
  ],
  pseudoStates: ["hover", "focus-visible"],
  parameters: {
    a11y: {
      config: {
        rules: [{ id: "scrollable-region-focusable", enabled: false }],
      },
    },
  },
});
