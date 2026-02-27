import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsCheckboxGroup from "./KdsCheckboxGroup.vue";
import { kdsCheckboxGroupAlignments } from "./enums";
import type { KdsCheckboxGroupProps } from "./types";

type Story = StoryObj<typeof KdsCheckboxGroup>;

const twoOptions: KdsCheckboxGroupProps["possibleValues"] = [
  "Option A",
  "Option B",
];

const optionsWithHelperText: KdsCheckboxGroupProps["possibleValues"] = [
  { text: "Option A", id: "Option A", helperText: "Helper text" },
  { text: "Option B", id: "Option B", helperText: "Helper text" },
];

const optionsWithError: KdsCheckboxGroupProps["possibleValues"] = [
  { text: "Option A", id: "Option A", error: true },
  { text: "Option B", id: "Option B" },
];

const optionsWithHelperTextAndError: KdsCheckboxGroupProps["possibleValues"] = [
  { text: "Option A", id: "Option A", helperText: "Helper text", error: true },
  { text: "Option B", id: "Option B", helperText: "Helper text" },
];

const meta: Meta<typeof KdsCheckboxGroup> = {
  title: "Form Fields/CheckboxGroup",
  component: KdsCheckboxGroup as Meta<typeof KdsCheckboxGroup>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A checkbox group component that renders a list of possible values from a data array and manages multiple selections via v-model.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9202-7631",
    },
  },
  argTypes: {
    modelValue: {
      control: { type: "object" },
      description:
        "The currently selected option ids. Array of strings representing selected checkboxes.",
      table: { category: "model" },
    },
    // @ts-expect-error – Storybook doesn't type emit handlers in argTypes for DefineComponent
    "update:modelValue": {
      description: "Emitted when the checkbox state changes",
      table: { category: "model" },
    },
    id: {
      control: { type: "text" },
      description: "Id for label linkage.",
      table: { category: "props" },
    },
    label: {
      control: { type: "text" },
      description: "Required label for group.",
      table: { category: "props" },
    },
    possibleValues: {
      control: { type: "object" },
      description:
        "Required possibleValues array. Each entry may be a plain string or an object with text, id, and optional disabled/helperText/error for advanced settings.",
      table: { category: "props" },
    },
    alignment: {
      control: { type: "select" },
      options: kdsCheckboxGroupAlignments,
      description:
        "Layout of the checkboxes: vertical (column) or horizontal (row, wrapping).",
      table: { category: "props" },
    },
    disabled: {
      control: { type: "boolean" },
      description:
        "Disables the whole group (and therefore all possible values) and prevents interaction.",
      table: { category: "props" },
    },
    error: {
      control: { type: "boolean" },
      description:
        "Whether the group is in an error state. Shows subText in error styling.",
      table: { category: "props" },
    },
    subText: {
      control: { type: "text" },
      description:
        "Optional helper or error text shown below the possible values and referenced via aria-describedby.",
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: { type: "boolean" },
      description:
        "Reserve space for subtext to prevent layout shifts when helper text or errors appear",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: ["Option A"],
    // @ts-expect-error – Storybook reactive-arg workaround; not in ComponentPropsAndSlots
    "update:modelValue": (value: string[]) => {
      const [_, updateArgs] = useArgs();
      updateArgs({ modelValue: value });
    },
    id: "checkbox-group",
    label: "Label",
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    alignment: "vertical",
    disabled: false,
    error: false,
    subText: "",
    preserveSubTextSpace: false,
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");
    const scope = within(group);

    const optionA = scope.getByRole("checkbox", { name: "Option A" });
    const optionB = scope.getByRole("checkbox", { name: "Option B" });

    // Initially, Option A is checked
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("aria-checked", "false");

    // Click to check Option B
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("aria-checked", "true");

    // Click to uncheck Option A
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "false");
    await expect(optionB).toHaveAttribute("aria-checked", "true");

    // Space key to toggle
    optionA.focus();
    await userEvent.keyboard(" ");
    await expect(optionA).toHaveAttribute("aria-checked", "true");

    // Enter key to toggle
    await userEvent.keyboard("{Enter}");
    await expect(optionA).toHaveAttribute("aria-checked", "false");

    // Tab navigation between checkboxes
    optionA.focus();
    await userEvent.tab();
    await expect(optionB).toHaveFocus();

    // Reset state
    await userEvent.click(optionA);
    await userEvent.click(optionB);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("aria-checked", "false");
  },
};

export const MultipleSelections: Story = {
  args: {
    modelValue: ["Option A", "Option C"],
  },
};

export const WithOptionsHelperText: Story = {
  args: {
    possibleValues: optionsWithHelperText,
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
      { text: "Option A", id: "Option A", helperText: "Helper text" },
      {
        text: "Option B",
        id: "Option B",
        helperText: "Very long helper text that causes problems",
      },
      { text: "Option C", id: "Option C", helperText: "Helper text" },
    ],
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

export const DisabledOption: Story = {
  args: {
    possibleValues: [
      { text: "Option A", id: "Option A" },
      { text: "Option B", id: "Option B" },
      {
        text: "Option C (disabled)",
        id: "Option C (disabled)",
        disabled: true,
      },
      { text: "Option D", id: "Option D" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");
    const scope = within(group);

    const optionB = scope.getByRole("checkbox", { name: "Option B" });
    const optionC = scope.getByRole("checkbox", {
      name: "Option C (disabled)",
    });
    const optionD = scope.getByRole("checkbox", { name: "Option D" });

    await expect(optionC).toBeDisabled();

    // Tab navigation should skip the disabled option
    optionB.focus();
    await userEvent.tab();
    await expect(optionD).toHaveFocus();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");
    const scope = within(group);

    const optionA = scope.getByRole("checkbox", { name: "Option A" });
    const optionB = scope.getByRole("checkbox", { name: "Option B" });

    await expect(optionA).toBeDisabled();
    await expect(optionB).toBeDisabled();

    // Click should not change selection
    await userEvent.click(optionB);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("aria-checked", "false");

    // Keyboard should not change selection
    optionA.focus();
    await userEvent.keyboard(" ");
    await expect(optionA).toHaveAttribute("aria-checked", "true");
  },
};

export const Error: Story = {
  args: {
    error: true,
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    subText: "Please select at least one option",
  },
};

export const ErrorInOption: Story = {
  args: {
    possibleValues: [
      {
        text: "Option A",
        id: "Option A",
        error: true,
        helperText: "Still grey",
      },
      { text: "Option B", id: "Option B" },
    ],
    subText: "Selected option has an error",
  },
};

export const WithCustomLabel: Story = {
  render: () => ({
    components: { KdsCheckboxGroup },
    template: `
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-checkbox-group">Custom label</label>

        <KdsCheckboxGroup
          id="custom-checkbox-group"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          :model-value="['Option A']"
          :label="undefined"
        />
      </div>
    `,
  }),
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsCheckboxGroup,
    width: 200,
  }),
  args: {
    label:
      "This is a very long group label that should overflow and wrap properly when the container is too narrow",
    possibleValues: [
      {
        text: "Short label",
        id: "a",
        helperText: "Short helper",
      },
      {
        text: "This is a very long option label that should overflow and wrap properly",
        id: "b",
        helperText: "Helper text that is also quite long and may wrap",
      },
      {
        text: "This is another very long option label that should overflow and wrap properly",
        id: "c",
        helperText: "Another helper text that is also quite long and may wrap",
      },
    ],
    modelValue: ["a"],
    alignment: "horizontal",
    subText: "General sub text for the entire checkbox group",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsCheckboxGroup,
  designsToCompare: {
    "Component Source": {
      props: {
        label: "{Label}",
        possibleValues: [
          { text: "Label", id: "a" },
          { text: "Label", id: "b" },
          { text: "Label", id: "c" },
          { text: "Label", id: "d" },
        ],
        modelValue: [],
      },
      variants: {
        // Variants from Figma frame 14198:4812
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-319636":
          {
            alignment: "vertical",
            possibleValues: [
              { text: "Label", id: "a" },
              { text: "Label", id: "b" },
              { text: "Label", id: "c" },
              { text: "Label", id: "d" },
            ],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-38239":
          {
            alignment: "vertical",
            modelValue: ["a"],
            possibleValues: [
              {
                text: "Label",
                id: "a",
                error: true,
              },
              { text: "Label", id: "b" },
              { text: "Label", id: "c" },
              { text: "Label", id: "d" },
            ],
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-9884":
          {
            alignment: "horizontal",
            possibleValues: [
              { text: "Label", id: "a" },
              { text: "Label", id: "b" },
              { text: "Label", id: "c" },
              { text: "Label", id: "d" },
              { text: "Label", id: "e" },
              { text: "Label", id: "f" },
              { text: "Label", id: "g" },
            ],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-38462":
          {
            alignment: "horizontal",
            modelValue: ["a"],
            possibleValues: [
              {
                text: "Label",
                id: "a",
                error: true,
              },
              { text: "Label", id: "b" },
              { text: "Label", id: "c" },
              { text: "Label", id: "d" },
              { text: "Label", id: "e" },
              { text: "Label", id: "f" },
              { text: "Label", id: "g" },
            ],
            subText: "{Error message}",
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsCheckboxGroup,
  combinationsProps: [
    {
      label: ["Label"],
      disabled: [false, true],
      alignment: kdsCheckboxGroupAlignments,
      subText: [undefined, "Additional information"],
      possibleValues: [twoOptions, optionsWithHelperText],
      modelValue: [[], ["Option A"], ["Option A", "Option B"]],
    },
    {
      label: ["Label"],
      alignment: kdsCheckboxGroupAlignments,
      subText: ["Error information"],
      possibleValues: [optionsWithError, optionsWithHelperTextAndError],
      modelValue: [[], ["Option A"], ["Option A", "Option B"]],
    },
    {
      label: ["Label"],
      error: [true],
      alignment: kdsCheckboxGroupAlignments,
      subText: ["Please select at least one option"],
      possibleValues: [twoOptions],
      modelValue: [[]],
    },
  ],
});
