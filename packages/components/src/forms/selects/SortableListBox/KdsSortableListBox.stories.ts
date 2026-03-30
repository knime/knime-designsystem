import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import KdsSortableListBox from "./KdsSortableListBox.vue";
import type { KdsSortableListBoxOption } from "./types";

type Story = StoryObj<typeof KdsSortableListBox>;

const baseOptions: KdsSortableListBoxOption[] = [
  {
    id: "col-name",
    text: "Name",
    accessory: { type: "dataType", name: "string-datatype" },
  },
  {
    id: "col-age",
    text: "Age",
    accessory: { type: "dataType", name: "number-integer-datatype" },
  },
  {
    id: "col-city",
    text: "City",
    accessory: { type: "dataType", name: "string-datatype" },
  },
  {
    id: "col-email",
    text: "Email",
    accessory: { type: "dataType", name: "string-datatype" },
  },
  {
    id: "col-score",
    text: "Score",
    accessory: { type: "dataType", name: "number-double-datatype" },
  },
  {
    id: "col-date",
    text: "Date",
    accessory: { type: "dataType", name: "date-datatype" },
  },
  {
    id: "col-active",
    text: "Active",
    accessory: { type: "dataType", name: "boolean-datatype" },
  },
  {
    id: "col-rating",
    text: "Rating",
    accessory: { type: "dataType", name: "number-double-datatype" },
  },
];

const baseOrder = baseOptions.map((o) => o.id);

const meta: Meta<typeof KdsSortableListBox> = {
  title: "Form Fields/SortableListBox",
  component: KdsSortableListBox as Meta<typeof KdsSortableListBox>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A sortable list box for ordering columns or values. The v-model represents " +
          "the ordered list of item IDs. Selection is handled internally for reordering. " +
          "Supports multi-selection with Ctrl+Click, Shift+Click, and keyboard navigation. " +
          "Provides sort (A-Z / Z-A), reset, and move (Top / Bottom / Up / Down) buttons.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5539-13714",
    },
  },
  argTypes: {
    modelValue: {
      control: "object",
      description: "Ordered array of all item IDs",
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
    useResizeHandle: {
      control: "boolean",
      table: { category: "props" },
    },
    bottomValue: {
      control: "object",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: baseOrder,
    possibleValues: baseOptions,
    label: "Columns",
    ariaLabel: undefined,
    description: undefined,
    subText: "",
    error: false,
    validating: false,
    preserveSubTextSpace: false,
    disabled: false,
    useResizeHandle: true,
    bottomValue: undefined,
    onResetOrder: fn(),
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsSortableListBox },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsSortableListBox v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Mouse: Click to select Name
    const nameOption = canvas.getByRole("option", { name: "Name" });
    await user.click(nameOption);
    await expect(nameOption).toHaveAttribute("aria-selected", "true");

    // Mouse: Click another item replaces selection
    const ageOption = canvas.getByRole("option", { name: "Age" });
    await user.click(ageOption);
    await expect(ageOption).toHaveAttribute("aria-selected", "true");
    await expect(nameOption).toHaveAttribute("aria-selected", "false");

    // Keyboard: Focus and use ArrowDown
    const listbox = canvas.getByRole("listbox", { name: "Columns" });
    listbox.focus();
    await user.keyboard("{ArrowDown}");
    const cityOption = canvas.getByRole("option", { name: "City" });
    await expect(cityOption).toHaveAttribute("aria-selected", "true");

    // Keyboard: ArrowUp
    await user.keyboard("{ArrowUp}");
    await expect(ageOption).toHaveAttribute("aria-selected", "true");

    // Mouse: Shift click to select range
    await user.click(nameOption);
    await user.keyboard("{Shift>}");
    await user.click(cityOption);
    await user.keyboard("{/Shift}");
    await expect(nameOption).toHaveAttribute("aria-selected", "true");
    await expect(ageOption).toHaveAttribute("aria-selected", "true");
    await expect(cityOption).toHaveAttribute("aria-selected", "true");

    // Verify sort buttons exist
    await expect(
      canvas.getByRole("button", { name: "A – Z" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Z – A" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Reset all" }),
    ).toBeInTheDocument();

    // Verify move buttons exist
    await expect(
      canvas.getByRole("button", { name: "Top" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Bottom" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Up" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Down" }),
    ).toBeInTheDocument();

    // Keyboard: Ctrl+A to select all
    listbox.focus();
    await user.keyboard("{Control>}a{/Control}");
    for (const option of baseOptions) {
      await expect(
        canvas.getByRole("option", { name: option.text }),
      ).toHaveAttribute("aria-selected", "true");
    }

    // Reset: click Name to select only Name
    await user.click(nameOption);
    await expect(nameOption).toHaveAttribute("aria-selected", "true");
    await expect(ageOption).toHaveAttribute("aria-selected", "false");
  },
};

export const WithBottomValue: Story = {
  args: {
    bottomValue: {
      id: "any-unknown",
      text: "Any unknown columns",
      accessory: { type: "dataType", name: "unknown-datatype" },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    const anyUnknown = canvas.getByRole("option", {
      name: "Any unknown columns",
    });
    await expect(anyUnknown).toBeInTheDocument();

    // Click to select it
    await user.click(anyUnknown);
    await expect(anyUnknown).toHaveAttribute("aria-selected", "true");
  },
};

export const EmptyList: Story = {
  args: {
    possibleValues: [],
    modelValue: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("No entries in this list"),
    ).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox");
    await expect(listbox).toHaveAttribute("aria-disabled", "true");

    // All move buttons should be disabled
    const topButton = canvas.getByRole("button", { name: "Top" });
    await expect(topButton).toBeDisabled();
    const bottomButton = canvas.getByRole("button", { name: "Bottom" });
    await expect(bottomButton).toBeDisabled();
    const upButton = canvas.getByRole("button", { name: "Up" });
    await expect(upButton).toBeDisabled();
    const downButton = canvas.getByRole("button", { name: "Down" });
    await expect(downButton).toBeDisabled();

    // Sort buttons should be disabled
    await expect(canvas.getByRole("button", { name: "A – Z" })).toBeDisabled();
    await expect(
      canvas.getByRole("button", { name: "Reset all" }),
    ).toBeDisabled();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsSortableListBox,
    width: 300,
  }),
  args: {
    possibleValues: [
      {
        id: "long",
        text: "A very long column name that should overflow and be truncated properly",
        accessory: { type: "dataType", name: "string-datatype" },
      },
      ...baseOptions,
    ],
    modelValue: ["long", ...baseOrder],
    label: "Columns with a very long label that should overflow",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsSortableListBox,
  designsToCompare: {
    Default: {
      props: {
        possibleValues: baseOptions,
        modelValue: baseOrder,
        label: "Columns",
        useResizeHandle: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=22585-106304":
          {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsSortableListBox,
  combinationsProps: [
    {
      possibleValues: [baseOptions],
      modelValue: [baseOrder],
      label: ["Columns"],
      disabled: [false, true],
      useResizeHandle: [false, true],
    },
  ],
  pseudoStates: ["hover"],
  columns: 2,
});
