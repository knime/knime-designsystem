import { useTemplateRef } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsNumberInput from "./KdsNumberInput.vue";

type Story = StoryObj<typeof KdsNumberInput>;

const meta: Meta<typeof KdsNumberInput> = {
  title: "Form Fields/NumberInput",
  component: KdsNumberInput as Meta<typeof KdsNumberInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A number input field component with unit display and +/- step buttons. " +
          "Supports min/max constraints, validation states, and accessibility features. " +
          "Currently uses en-US locale for number formatting. " +
          "User input supports grouping (comma separators) and scientific notation (e.g. 1e-3).",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14820",
    },
  },
  argTypes: {
    modelValue: {
      control: "number",
      description: "v-model binding for the numeric value (use NaN for empty)",
      table: { category: "model" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
      table: { category: "props" },
    },
    label: {
      control: "text",
      table: { category: "props" },
    },
    description: {
      control: "text",
      description:
        "Optional description displayed in an info popover next to the label. " +
        "The info toggle button is only visible when hovering the input field.",
      table: { category: "props" },
    },
    placeholder: {
      control: "text",
      table: { category: "props" },
    },
    name: {
      control: "text",
      table: { category: "props" },
    },
    autocomplete: {
      control: "text",
      table: { category: "props" },
    },
    unit: {
      control: "text",
      table: { category: "props" },
    },
    min: {
      control: "number",
      table: { category: "props" },
    },
    max: {
      control: "number",
      table: { category: "props" },
    },
    step: {
      control: "number",
      description:
        "Step size used for +/- buttons and arrow key increments. " +
        "Use a regular decimal number (e.g. 0.001) or scientific notation (e.g. 1e-3).",
      table: { category: "props" },
    },
    subText: {
      control: "text",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
    readonly: {
      control: "boolean",
      table: { category: "props" },
    },
    required: {
      control: "boolean",
      table: { category: "props" },
    },
    error: {
      control: "boolean",
      table: { category: "props" },
    },
    validating: {
      control: "boolean",
      description: "Shows a spinner next to the subtext when true",
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: NaN,
    label: "Label",
    description: "",
    ariaLabel: undefined,
    placeholder: "",
    name: "",
    autocomplete: "",
    unit: "",
    min: undefined,
    max: undefined,
    step: 0.1,
    disabled: false,
    readonly: false,
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

export const Default: Story = {
  args: {
    placeholder: "Enter number",
    unit: "ms",
  },
};

export const WithValue: Story = {
  args: {
    modelValue: 42,
    unit: "ms",
  },
};

export const WithMinMax: Story = {
  args: {
    modelValue: 5,
    min: 0,
    max: 10,
    step: 1,
    unit: "kg",
  },
};

export const Disabled: Story = {
  args: {
    modelValue: 42,
    unit: "ms",
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    modelValue: 42,
    unit: "ms",
    readonly: true,
  },
};

export const WithDescription: Story = {
  args: {
    placeholder: "Enter number",
    unit: "ms",
    description:
      "This is a helpful description that explains what this field is for. " +
      "It appears in a popover when clicking the info button.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("spinbutton", { name: /label/i });
    await userEvent.hover(input);

    const infoButton = await canvas.findByRole("button", {
      name: "Click for more information",
    });
    await expect(infoButton).toBeInTheDocument();

    await userEvent.click(infoButton);

    const description = await canvas.findByText(
      /This is a helpful description that explains what this field is for\./i,
    );
    await expect(description).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    modelValue: 42,
    unit: "ms",
    error: true,
    subText: "Error message",
  },
};

export const Validating: Story = {
  args: {
    modelValue: 42,
    unit: "ms",
    validating: true,
    subText: "Validation message",
  },
};

export const ProgrammaticFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how to programmatically focus the number input using the exposed `focus()` method via a template ref.",
      },
    },
  },
  render: () => ({
    components: { KdsNumberInput, KdsButton },
    setup() {
      const numberInputRef =
        useTemplateRef<InstanceType<typeof KdsNumberInput>>("numberInputRef");
      const handleFocusClick = () => {
        numberInputRef.value?.focus();
      };
      return { handleFocusClick };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <KdsNumberInput ref="numberInputRef" label="Number Input" />
        <KdsButton @click="handleFocusClick" label="Focus Number Input" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Focus Number Input" });
    const input = canvas.getByRole("spinbutton", { name: "Number Input" });

    await expect(input).not.toHaveFocus();
    await userEvent.click(button);
    await expect(input).toHaveFocus();
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsNumberInput,
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      // eslint-disable-next-line no-magic-numbers
      modelValue: [NaN, 42],
      placeholder: ["", "Enter number"],
      unit: [undefined, "ms"],
      readonly: [false],
      disabled: [false],
      error: [false],
      validating: [false],
      subText: [undefined, "Message"],
    },
    combinations: [
      { readonly: [true] },
      { validating: [true], subText: ["Validation message"] },
      { error: [true], subText: ["Error message"] },
      { disabled: [true] },
    ],
  },
  pseudoStates: ["hover", "focus"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsNumberInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".NumberInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14821":
          {
            placeholder: "{value}",
            unit: "{unit}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14830":
          {
            placeholder: "{value}",
            unit: "{unit}",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14839":
          {
            modelValue: NaN,
            unit: "{unit}",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14848":
          {
            modelValue: 42,
            unit: "{unit}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14857":
          {
            modelValue: 42,
            unit: "{unit}",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35547":
          {
            modelValue: 42,
            unit: "{unit}",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-14866":
          {
            modelValue: 42,
            unit: "{unit}",
            disabled: true,
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsNumberInput,
    width: 300,
  }),
  args: {
    label: "Very long label that should be truncated",
    modelValue: Number("12345678901234567890"),
    unit: "UNIT",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};

export const Interaction: Story = {
  args: {
    label: "Label",
    modelValue: NaN,
    placeholder: "Enter number",
    unit: "ms",
    min: 0,
    max: 2,
    step: 1,
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    validating: false,
    subText: "",
    preserveSubTextSpace: false,
    name: "",
    autocomplete: "",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: "Label" });

    await step("Increment/decrement via buttons", async () => {
      const buttons = canvas.getAllByRole("button");
      const decrease = buttons[0];
      const increase = buttons[1];

      await userEvent.click(increase);
      await expect(input).toHaveValue("0");

      await userEvent.click(increase);
      await expect(input).toHaveValue("1");

      await userEvent.click(increase);
      await expect(input).toHaveValue("2");

      await userEvent.click(increase);
      await expect(input).toHaveValue("2");

      await userEvent.click(decrease);
      await expect(input).toHaveValue("1");
    });

    await step("Arrow key stepping", async () => {
      await userEvent.click(input);
      await userEvent.keyboard("{ArrowDown}");
      await expect(input).toHaveValue("0");

      await userEvent.keyboard("{ArrowDown}");
      await expect(input).toHaveValue("0");
    });

    await step("Cleanup invalid input on blur", async () => {
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.type(input, "1e3");

      // move focus away to trigger blur cleanup and clamping to max=2
      await userEvent.tab();

      await expect(input).toHaveValue("2");
    });
  },
};
