import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import MultiSelectDropdownContainer from "./MultiSelectDropdownContainer.vue";
import type { KdsDropdownOption } from "./types";

type Story = StoryObj<typeof MultiSelectDropdownContainer>;

const baseOptions: KdsDropdownOption[] = [
  { id: "a", text: "Label" },
  {
    id: "b",
    text: "Column",
    accessory: { type: "dataType", name: "string-datatype" },
  },
  { id: "c", text: "Another label" },
  { id: "d", text: "Disabled", disabled: true },
];

const meta: Meta<typeof MultiSelectDropdownContainer> = {
  title: "Form Fields/MultiSelectDropdown/MultiSelectDropdownContainer",
  component: MultiSelectDropdownContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Internal container panel used by `KdsMultiSelectDropdown` with search and multi-selection list behavior.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5476-26565",
    },
    a11y: {
      config: {
        rules: [{ id: "scrollable-region-focusable", enabled: false }],
      },
    },
  },
  argTypes: {
    modelValue: {
      control: "object",
      table: { category: "model" },
    },
    searchValue: {
      control: "text",
      table: { category: "model" },
    },
    possibleValues: {
      control: "object",
      table: { category: "props" },
    },
    emptyText: {
      control: "text",
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
  },
  args: {
    modelValue: [],
    searchValue: "",
    possibleValues: baseOptions,
    emptyText: "No entries found",
    loading: false,
    allowNewValues: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return {
      components: { MultiSelectDropdownContainer },
      setup() {
        const modelValue = ref<string[]>(args.modelValue ?? []);
        watchEffect(() => (modelValue.value = args.modelValue ?? []));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));

        const searchValue = ref(args.searchValue ?? "");
        watchEffect(() => (searchValue.value = args.searchValue ?? ""));
        watchEffect(() => updateArgs({ searchValue: searchValue.value }));

        const possibleValues = ref(args.possibleValues ?? []);
        watchEffect(() => (possibleValues.value = args.possibleValues ?? []));

        const onAddValue = (text: string) => {
          const id = text;
          possibleValues.value = [...possibleValues.value, { id, text }];
          modelValue.value = [...modelValue.value, id];
        };

        return { args, modelValue, searchValue, possibleValues, onAddValue };
      },
      template:
        '<MultiSelectDropdownContainer v-bind="args" v-model="modelValue" v-model:search-value="searchValue" :possible-values="possibleValues" @add-value="onAddValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const user = userEvent.setup();
    const filterInput = canvas.getByRole("searchbox", {
      name: "Filter options",
    });
    await user.click(filterInput);

    // Keyboard: Enter selects the focused (first) item
    await user.keyboard("{Enter}");
    await expect(canvas.getByRole("option", { name: "Label" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    // Mouse: click deselects
    await user.click(canvas.getByRole("option", { name: "Label" }));
    await expect(canvas.getByRole("option", { name: "Label" })).toHaveAttribute(
      "aria-selected",
      "false",
    );

    // Search filtering: no results
    await user.type(filterInput, "zzz");
    await expect(canvas.getByText("No entries found")).toBeVisible();

    // Clear search to restore all options
    await user.clear(filterInput);
    await expect(canvas.getAllByRole("option")).toHaveLength(4);
  },
};

export const SelectAllAndClearAll: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const user = userEvent.setup();
    // Initially no selection → item shows "Select all"
    const selectAllItem = canvas.getByRole("button", { name: "Select all" });
    await expect(selectAllItem).toBeVisible();

    // Click "Select all" → all non-disabled options get selected
    await user.click(selectAllItem);

    // Item label changes to "Clear all"
    const clearAllItem = await canvas.findByRole("button", {
      name: "Clear all",
    });
    await expect(clearAllItem).toBeVisible();

    // Verify all non-disabled options are selected
    await expect(canvas.getByRole("option", { name: "Label" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(
      canvas.getByRole("option", { name: "Column" }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      canvas.getByRole("option", { name: "Another label" }),
    ).toHaveAttribute("aria-selected", "true");

    // Disabled option should NOT be selected
    await expect(
      canvas.getByRole("option", { name: "Disabled" }),
    ).toHaveAttribute("aria-selected", "false");

    // Click "Clear all" → everything is deselected
    await user.click(clearAllItem);

    // Item label changes back to "Select all"
    await canvas.findByRole("button", { name: "Select all" });

    // All options should now be deselected
    await expect(canvas.getByRole("option", { name: "Label" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    await expect(
      canvas.getByRole("option", { name: "Column" }),
    ).toHaveAttribute("aria-selected", "false");
    await expect(
      canvas.getByRole("option", { name: "Another label" }),
    ).toHaveAttribute("aria-selected", "false");
  },
};

export const WithSelection: Story = {
  args: {
    modelValue: ["a", "b"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Some visible enabled options selected → button shows "Clear all"
    await expect(
      canvas.getByRole("button", { name: "Clear all" }),
    ).toBeVisible();
  },
};

export const MissingValue: Story = {
  args: {
    modelValue: ["a", "missing-id"],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const missingOption = canvas.getByRole("option", { name: /missing-id/ });
    await expect(missingOption).toHaveAttribute("aria-selected", "true");

    await user.click(missingOption);
    await expect(
      canvas.queryByRole("option", { name: /missing-id/ }),
    ).toBeNull();
  },
};

export const Empty: Story = {
  args: {
    possibleValues: [],
    emptyText: "Nothing matches",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Nothing matches")).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    possibleValues: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading entries")).toBeVisible();

    // Footer item should not be visible during loading
    await expect(
      canvas.queryByRole("button", { name: "Select all" }),
    ).toBeNull();
    await expect(
      canvas.queryByRole("button", { name: "Clear all" }),
    ).toBeNull();
  },
};

export const AllowNewValues: Story = {
  args: {
    allowNewValues: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const filterInput = canvas.getByRole("searchbox", {
      name: "Filter options",
    });

    // Type a new value that doesn't exist in options
    await user.type(filterInput, "Brand new");

    // "Add new" item should appear inside the list with the typed text
    const addOption = canvas.getByRole("option", { name: "Brand new" });
    await expect(addOption).toBeVisible();

    // Click to add the new value
    await user.click(addOption);

    // The value should now be selected as a normal option (not missing)
    const addedOption = canvas.getByRole("option", { name: "Brand new" });
    await expect(addedOption).toHaveAttribute("aria-selected", "true");
    await expect(addedOption).not.toHaveAttribute("aria-disabled", "true");

    // Search field should be cleared after adding
    await expect(filterInput).toHaveValue("");

    // Typing an existing option name should not show the "add new" item
    await user.type(filterInput, "Label");
    await expect(canvas.getAllByRole("option", { name: "Label" })).toHaveLength(
      1,
    );

    // Clear search
    await user.clear(filterInput);

    // Typing an already-selected value should not show the "add new" item
    await user.type(filterInput, "Brand new");
    await expect(
      canvas.getAllByRole("option", { name: /Brand new/ }),
    ).toHaveLength(1);
  },
};

export const ManyItems: Story = {
  args: {
    possibleValues: Array.from({ length: 100 }, (_, i) => ({
      id: `item-${i}`,
      text: `Option ${i + 1}`,
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("option").length).toBe(100);
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: MultiSelectDropdownContainer,
    width: 230,
  }),
  args: {
    modelValue: ["a", "b"],
    possibleValues: [
      {
        id: "a",
        text: "A very very very very long option label for overflow tests",
      },
      {
        id: "b",
        text: "Another very very long option label for overflow checks",
      },
    ],
    emptyText: "No entries found",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: MultiSelectDropdownContainer,
  wrapperStyle: {
    width: "213px",
  },
  designsToCompare: {
    "Select all": {
      props: {
        searchValue: "Lab",
        emptyText: "No entries found",
        possibleValues: [
          { id: "a", text: "Label" },
          { id: "b", text: "Label" },
          { id: "c", text: "Label" },
          { id: "d", text: "Label" },
          { id: "e", text: "Label" },
        ],
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15412-103823":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Clear all": {
      props: {
        searchValue: "",
        emptyText: "No entries found",
        modelValue: ["b"],
        possibleValues: [
          { id: "a", text: "Label" },
          { id: "b", text: "Label" },
          { id: "c", text: "Label" },
          { id: "d", text: "Label" },
          { id: "e", text: "Label" },
        ],
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15412-104175":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: MultiSelectDropdownContainer,
  combinationsProps: [
    {
      modelValue: [
        [],
        ["a", "c"],
        ["missing1", "missing2"],
        ["a", "c", "missing1", "missing2"],
      ],
      possibleValues: [baseOptions],
      emptyText: ["No entries found"],
    } as never,
  ],
});
