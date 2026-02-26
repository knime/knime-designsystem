import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsRadioButtonGroup from "./KdsRadioButtonGroup.vue";
import { kdsRadioButtonGroupAlignments } from "./enums";
import type { KdsRadioButtonGroupProps } from "./types.ts";

type Story = StoryObj<typeof KdsRadioButtonGroup>;

const optionsWithError: KdsRadioButtonGroupProps["possibleValues"] = [
  { text: "Option A", id: "Option A", error: true, helperText: "Helper text" },
  { text: "Option B", id: "Option B" },
];

const optionsWithHelperText: KdsRadioButtonGroupProps["possibleValues"] = [
  { text: "Option A", id: "Option A", helperText: "Helper text" },
  { text: "Option B", id: "Option B", helperText: "Helper text" },
];

const meta: Meta<typeof KdsRadioButtonGroup> = {
  title: "Form Fields/RadioButtonGroup",
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
        "The currently selected option id. Can be undefined when no option is selected.",
      table: { category: "model" },
    },
    id: {
      control: { type: "text" },
      description: "Id set for the group to be linked for an external label.",
      table: { category: "props" },
    },
    label: {
      control: { type: "text" },
      description: "Group label as a legend of the fieldset.",
      table: { category: "props" },
    },
    possibleValues: {
      control: { type: "object" },
      description:
        "Required possibleValues array (at least 2 entries). Each entry may be a plain string or an object with text, id, and optional disabled/helperText/error for advanced settings.",
      table: { category: "props" },
    },
    alignment: {
      control: { type: "select" },
      options: kdsRadioButtonGroupAlignments,
      description:
        "Layout of the radio buttons: vertical (column) or horizontal (row, wrapping).",
      table: { category: "props" },
    },
    disabled: {
      control: { type: "boolean" },
      description:
        "Disables the whole group (and therefore all possible values) and prevents interaction.",
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
    modelValue: "Option A",
    id: "radio-button-group",
    label: "Label",
    possibleValues: ["Option A", "Option B", "Option C", "Option D"],
    alignment: "vertical",
    disabled: false,
    subText: "",
    preserveSubTextSpace: false,
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

export const WithOptionsHelperText: Story = {
  args: {
    possibleValues: optionsWithHelperText,
  },
};
export const Horizontal: Story = {
  render: () => ({
    components: { KdsRadioButtonGroup },
    template: `
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Horizontal"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          alignment="horizontal"
          model-value="Option A"
        />

        <KdsRadioButtonGroup
          label="Horizontal with helper texts"
          :possible-values="[
            { text: 'Option A', id: 'Option A', helperText: 'Helper text' },
            {
              text: 'Option B',
              id: 'Option B',
              helperText: 'Very long helper text that causes problems',
            },
            { text: 'Option C', id: 'Option C', helperText: 'Helper text' },
          ]"
          alignment="horizontal"
          model-value="Option A"
        />
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
export const WithSubText: Story = {
  render: () => ({
    components: { KdsRadioButtonGroup },
    template: `
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Preserve sub text space (no text)"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :preserve-sub-text-space="true"
        />

        <KdsRadioButtonGroup
          label="With sub text"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          sub-text="Additional information about this selection"
        />
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
};

export const Error: Story = {
  render: () => ({
    components: { KdsRadioButtonGroup },
    template: `
      <div style="display: grid; gap: 24px; align-items: start;">
        <KdsRadioButtonGroup
          label="Error"
          :possible-values="[
            { text: 'Option A', id: 'Option A', error: true },
            { text: 'Option B', id: 'Option B' },
          ]"
          sub-text="Selected option has an error"
          model-value="Option A"
        />

        <KdsRadioButtonGroup
          label="Error (with option helper text)"
          :possible-values="[
            {
              text: 'Option A',
              id: 'Option A',
              error: true,
              helperText: 'Helper text',
            },
            {
              text: 'Option B',
              id: 'Option B',
              helperText: 'Helper text',
            },
          ]"
          sub-text="Selected option has an error"
          model-value="Option A"
        />
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
};

export const WithCustomLabel: Story = {
  render: () => ({
    components: { KdsRadioButtonGroup },
    template: `
      <div style="display: grid; gap: 8px; align-items: start;">
        <label for="custom-radio-button-group">Custom label</label>

        <KdsRadioButtonGroup
          id="custom-radio-button-group"
          :possible-values="['Option A', 'Option B', 'Option C', 'Option D']"
          model-value="Option A"
          :label="undefined"
        />
      </div>
    `,
  }),
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsRadioButtonGroup,
  combinationsProps: [
    {
      label: ["Label", undefined],
      subText: [undefined, "Additional information"],
      preserveSubTextSpace: [false, true],
      possibleValues: [
        ["Option A", "Option B"],
        optionsWithError,
        optionsWithHelperText,
      ],
      modelValue: [undefined, "Option A", "Option B"],
      alignment: kdsRadioButtonGroupAlignments,
      disabled: [false, true],
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
    modelValue: "a",
    alignment: "horizontal",
    subText: "General sub text for the entire radio button group",
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
    components: { KdsRadioButtonGroup },
    template: `
      <div style="display: grid; gap: 24px; align-items: start;">
        <div>
          <KdsRadioButtonGroup
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
          <KdsRadioButtonGroup
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
        interactive: "a",
        disabledGroup: "a",
      };
    },
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const groups = canvas.getAllByRole("radiogroup");

    // -------- Interactive group --------
    const interactiveGroup = groups[0];
    const interactiveScope = within(interactiveGroup);

    const optionA = interactiveScope.getByRole("radio", { name: "Option A" });
    const optionB = interactiveScope.getByRole("radio", { name: "Option B" });
    const optionC = interactiveScope.getByRole("radio", {
      name: "Option C (disabled)",
    });
    const optionD = interactiveScope.getByRole("radio", { name: "Option D" });

    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");
    await expect(optionB).toHaveAttribute("tabindex", "-1");
    await expect(optionC).toBeDisabled();

    // Mouse: selection changes
    await userEvent.click(optionB);
    await expect(optionB).toHaveAttribute("aria-checked", "true");
    await expect(optionB).toHaveAttribute("tabindex", "0");
    await expect(optionA).toHaveAttribute("tabindex", "-1");

    // Keyboard: ArrowRight moves selection and skips disabled option
    optionB.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Home -> first enabled
    await userEvent.keyboard("{Home}");
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveFocus();

    // End -> last enabled
    await userEvent.keyboard("{End}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");
    await expect(optionD).toHaveFocus();

    // Enter on disabled should not change selection
    optionC.focus();
    await userEvent.keyboard("{Enter}");
    await expect(optionD).toHaveAttribute("aria-checked", "true");

    // Reset state so the interaction test can be re-run deterministically
    await userEvent.click(optionA);
    await expect(optionA).toHaveAttribute("aria-checked", "true");
    await expect(optionA).toHaveAttribute("tabindex", "0");

    // -------- Disabled group --------
    const disabledGroup = groups[1];
    const disabledScope = within(disabledGroup);

    const disabledA = disabledScope.getByRole("radio", { name: "Option A" });
    const disabledB = disabledScope.getByRole("radio", { name: "Option B" });

    await expect(disabledA).toBeDisabled();
    await expect(disabledB).toBeDisabled();

    // Neither click nor keyboard should change selection
    await userEvent.click(disabledB);
    await expect(disabledA).toHaveAttribute("aria-checked", "true");

    disabledA.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(disabledA).toHaveAttribute("aria-checked", "true");
  },
};
