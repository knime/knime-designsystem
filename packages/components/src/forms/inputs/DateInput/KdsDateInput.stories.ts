import { ref, useTemplateRef, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsDateInput from "./KdsDateInput.vue";

type Story = StoryObj<typeof KdsDateInput>;

const meta: Meta<typeof KdsDateInput> = {
  title: "Form Fields/DateInput",
  component: KdsDateInput as Meta<typeof KdsDateInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A date input field component with label and helper/error text support. " +
          "Includes a calendar picker that opens in a popover when clicking the calendar toggle button. " +
          "The expected date format is yyyy-MM-dd (e.g. 2026-03-11). " +
          "Supports validation states and accessibility features.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4420-29613",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the date value in yyyy-MM-dd format",
      table: { category: "model" },
    },
    label: {
      control: "text",
      description: "Label shown above the input",
      table: { category: "props" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
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
      description: "Placeholder shown when the input is empty",
      table: { category: "props" },
    },
    datePickerMin: {
      control: "text",
      description: "Minimum selectable date passed to the date picker",
      table: { category: "props" },
    },
    datePickerMax: {
      control: "text",
      description: "Maximum selectable date passed to the date picker",
      table: { category: "props" },
    },
    disabled: {
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
    subText: {
      control: "text",
      description: "Helper text or error message shown below the input",
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: "",
    label: "Label",
    ariaLabel: undefined,
    description: "",
    placeholder: "",
    datePickerMin: undefined,
    datePickerMax: undefined,
    disabled: false,
    validating: false,
    error: false,
    subText: "",
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsDateInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsDateInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: "yyyy-MM-dd",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: /label/i });

    await step("Type and clear date values", async () => {
      await user.click(input);
      await user.type(input, "2026-03-11");
      await expect(input).toHaveValue("2026-03-11");

      await user.clear(input);
      await expect(input).toHaveValue("");
    });

    await step("Test date parsing and normalization", async () => {
      await user.type(input, "March 11, 2026");
      await user.tab();

      await expect(input).toHaveValue("2026-03-11");
      await expect(input).not.toHaveAttribute("aria-invalid", "true");
    });

    await step("Test keyboard navigation", async () => {
      // Clear input and reset focus
      await user.clear(input);
      input.blur();

      // Tab should focus the input first
      await user.tab();
      await expect(input).toHaveFocus();

      // Tab again should move to calendar button
      await user.tab();
      const calendarButton = canvas.getByRole("button", {
        name: "Open date picker",
      });
      await expect(calendarButton).toHaveFocus();
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "2026-03-11",
  },
};

export const WithDescription: Story = {
  args: {
    placeholder: "yyyy-MM-dd",
    description:
      "This is a helpful description that explains what this field is for. " +
      "It appears in a popover when clicking the info button.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: /label/i });
    await user.hover(input);

    const infoButton = await canvas.findByRole("button", {
      name: "Click for more information",
    });
    await expect(infoButton).toBeInTheDocument();

    await user.click(infoButton);

    const description = await canvas.findByText(
      /This is a helpful description that explains what this field is for\./i,
    );
    await expect(description).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "yyyy-MM-dd",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox", { name: /label/i });
    await expect(input).toBeDisabled();

    const calendarButton = canvas.getByRole("button", {
      name: "Open date picker",
    });
    await expect(calendarButton).toBeDisabled();
  },
};

export const WithSubText: Story = {
  args: {
    placeholder: "yyyy-MM-dd",
    subText: "Helper text goes here",
  },
};

export const Validating: Story = {
  args: {
    modelValue: "2026-03-11",
    validating: true,
    subText: "Validation message",
  },
};

export const WithError: Story = {
  args: {
    modelValue: "not-a-date",
    error: true,
    subText: "Error message",
  },
};

export const InvalidFormatAutoError: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When the user leaves the field with a value that cannot be parsed as a date, " +
          'the component automatically sets the error state and shows an "Invalid date format" subtext.',
      },
    },
  },
  args: {
    placeholder: "yyyy-MM-dd",
    modelValue: "",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: /label/i });

    await user.type(input, "its-a-fig-not-a-date");
    await user.tab();

    const errorText = await canvas.findByText(/Invalid date format/i);

    await expect(errorText).toBeInTheDocument();
    await expect(input).toHaveAttribute("aria-invalid", "true");
  },
};

export const CalendarPicker: Story = {
  args: {
    placeholder: "yyyy-MM-dd",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const calendarButton = canvas.getByRole("button", {
      name: "Open date picker",
    });

    await expect(calendarButton).toHaveAttribute("aria-pressed", "false");

    await user.click(calendarButton);
    await expect(calendarButton).toHaveAttribute("aria-pressed", "true");

    await user.click(calendarButton);
    await expect(calendarButton).toHaveAttribute("aria-pressed", "false");
  },
};

export const ProgrammaticFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how to programmatically focus the date input using the exposed `focus()` method via a template ref.",
      },
    },
  },
  render: () => ({
    components: { KdsDateInput, KdsButton },
    setup() {
      const dateInputRef =
        useTemplateRef<InstanceType<typeof KdsDateInput>>("dateInputRef");
      const handleFocusClick = () => {
        dateInputRef.value?.focus();
      };
      return { handleFocusClick };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <KdsDateInput ref="dateInputRef" label="Date Input" />
        <KdsButton @click="handleFocusClick" label="Focus Date Input" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const button = canvas.getByRole("button", { name: "Focus Date Input" });
    const input = canvas.getByRole("textbox", { name: "Date Input" });

    await expect(input).not.toHaveFocus();
    await user.click(button);
    await expect(input).toHaveFocus();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsDateInput,
    width: 300,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    modelValue: "2026-03-11",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsDateInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".DateInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-97113":
          {
            placeholder: "{yyyy-MM-dd}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-97122":
          {
            placeholder: "{yyyy-MM-dd}",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-97131":
          {
            modelValue: "2026-03-11",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-97142":
          {
            modelValue: "2026-03-11",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-97151":
          {
            modelValue: "2026-03-11",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35890":
          {
            modelValue: "2026-03-11",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-97160":
          {
            placeholder: "{yyyy-MM-dd}",
            disabled: true,
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsDateInput,
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      modelValue: ["", "2026-03-11"],
      placeholder: ["yyyy-MM-dd"],
      disabled: [false],
      error: [false],
      validating: [false],
      subText: [undefined, "Message"],
    },
    combinations: [
      { validating: [true], subText: ["Validation message"] },
      { error: [true], subText: ["Error message"] },
      { disabled: [true] },
    ],
  },
  pseudoStates: ["hover", "focus"],
});
