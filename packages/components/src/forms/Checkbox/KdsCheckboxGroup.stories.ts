import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsCheckboxGroup from "./KdsCheckboxGroup.vue";
import type { KdsCheckboxGroupProps } from "./types.ts";

type Story = StoryObj<typeof KdsCheckboxGroup>;

const twoOptions: KdsCheckboxGroupProps["possibleValues"] = [
  "Option A",
  "Option B",
];

const optionsWithError: KdsCheckboxGroupProps["possibleValues"] = [
  { text: "Option A", id: "Option A", error: true, helperText: "Helper text" },
  { text: "Option B", id: "Option B" },
];

const optionsWithHelperText: KdsCheckboxGroupProps["possibleValues"] = [
  { text: "Option A", id: "Option A", helperText: "Helper text" },
  { text: "Option B", id: "Option B", helperText: "Helper text" },
];

const meta: Meta<typeof KdsCheckboxGroup> = {
  title: "Components/forms/KdsCheckboxGroup",
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
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=9202-7631&p=f&m=dev",
    },
  },
  argTypes: {
    modelValue: {
      control: { type: "object" },
      description:
        "The currently selected option ids. Array of strings representing selected checkboxes.",
      table: { category: "Model" },
    },
    "onUpdate:modelValue": {
      table: { category: "Model" },
      description: "Emitted when the model changes (v-model update).",
    },
    id: {
      control: { type: "text" },
      description: "Id for label linkage.",
      table: { category: "Props" },
    },
    label: {
      control: { type: "text" },
      description: "Group label.",
      table: { category: "Props" },
    },
    possibleValues: {
      control: { type: "object" },
      description:
        "Required possibleValues array. Each entry may be a plain string or an object with text, id, and optional disabled/helperText/error for advanced settings.",
      table: { category: "Props" },
    },
    alignment: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description:
        "Layout of the checkboxes: vertical (column) or horizontal (row, wrapping).",
      table: { category: "Props" },
    },
    disabled: {
      control: { type: "boolean" },
      description:
        "Disables the whole group (and therefore all possible values) and prevents interaction.",
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
        "Reserve space for subtext to prevent layout shifts when helper text or errors appear",
      table: { category: "Props" },
    },
  },
  args: {
    modelValue: ["Option A"],
    "onUpdate:modelValue": fn(),
    id: "checkbox-group",
    label: "Label",
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
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

export const MultipleSelections: Story = {
  args: {
    modelValue: ["Option A", "Option C"],
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

export const WithOptionsHelperText: Story = {
  args: {
    possibleValues: optionsWithHelperText,
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
      { text: "Option A", id: "Option A", error: true },
      { text: "Option B", id: "Option B" },
    ],
    subText: "Selected option has an error",
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    modelValue: ["Option A"],
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsCheckboxGroup,
  combinationsProps: [
    {
      label: ["Label", undefined],
      subText: [undefined, "Additional information"],
      preserveSubTextSpace: [false, true],
      possibleValues: [twoOptions, optionsWithError, optionsWithHelperText],
      modelValue: [[], ["Option A"], ["Option A", "Option B"]],
      alignment: ["vertical", "horizontal"],
      disabled: [false, true],
    },
  ],
});

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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=7118-319636&p=f&m=dev":
          {
            alignment: "vertical",
            possibleValues: [
              { text: "Label", id: "a" },
              { text: "Label", id: "b" },
              { text: "Label", id: "c" },
              { text: "Label", id: "d" },
            ],
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-38239&p=f&m=dev":
          {
            alignment: "vertical",
            modelValue: "a",
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-9884&p=f&m=dev":
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=14198-38462&p=f&m=dev":
          {
            alignment: "horizontal",
            modelValue: "a",
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

export const Interaction: Story = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => ({
    components: { KdsCheckboxGroup },
    template: `
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsCheckboxGroup
            id="radio-group-1"
            label="Interactive group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
              { text: 'Option C (disabled)', id: 'c', disabled: true },
              { text: 'Option D', id: 'd' },
            ]"
            v-model="interactive"
           />
        </div>

        <div>
          <KdsCheckboxGroup
            id="radio-group-2"
            label="Disabled group"
            :possible-values="[
              { text: 'Option A', id: 'a' },
              { text: 'Option B', id: 'b' },
            ]"
            v-model="disabledGroup"
            disabled
          />
        </div>
      </div>
    `,
    data() {
      return {
        interactive: ["a"],
        disabledGroup: ["a"],
      };
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const groups = canvas.getAllByRole("group");

    // -------- Interactive group --------
    const interactiveGroup = groups[0];
    const interactiveScope = within(interactiveGroup);

    const optionA = interactiveScope.getByRole("checkbox", {
      name: "Option A",
    });
    const optionB = interactiveScope.getByRole("checkbox", {
      name: "Option B",
    });
    const optionC = interactiveScope.getByRole("checkbox", {
      name: "Option C (disabled)",
    });
    const optionD = interactiveScope.getByRole("checkbox", {
      name: "Option D",
    });

    // Initially, Option A is checked
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("aria-checked", "false");
    await expect(optionC).toBeDisabled();
    await expect(optionD).toHaveAttribute("aria-checked", "false");

    // Click to check Option B
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("aria-checked", "true");

    // Click to uncheck Option A
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "false");
    await expect(optionB).toHaveAttribute("aria-checked", "true");

    // Space key to check Option D
    optionD.focus();
    await userEvent.keyboard(" ");
    await expect(optionD).toHaveAttribute("aria-checked", "true");

    // Enter key to uncheck Option D
    await userEvent.keyboard("{Enter}");
    await expect(optionD).toHaveAttribute("aria-checked", "false");

    // Tab navigation should work
    optionA.focus();
    await userEvent.tab();
    await expect(optionB).toHaveFocus();
    await userEvent.tab();
    // Skip disabled option C
    await expect(optionD).toHaveFocus();

    // Reset state
    await userEvent.click(optionB);
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("aria-checked", "false");

    // -------- Disabled group --------
    const disabledGroup = groups[1];
    const disabledScope = within(disabledGroup);

    const disabledA = disabledScope.getByRole("checkbox", { name: "Option A" });
    const disabledB = disabledScope.getByRole("checkbox", { name: "Option B" });

    await expect(disabledA).toBeDisabled();
    await expect(disabledB).toBeDisabled();

    // Neither click nor keyboard should change selection
    await userEvent.click(disabledB);
    await expect(disabledA).toHaveAttribute("aria-checked", "true");
    await expect(disabledB).toHaveAttribute("aria-checked", "false");
  },
};
