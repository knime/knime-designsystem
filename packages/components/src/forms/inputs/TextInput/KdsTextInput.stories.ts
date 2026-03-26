import { ref, useTemplateRef, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, waitFor, within } from "storybook/test";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsTextInput from "./KdsTextInput.vue";

type Story = StoryObj<typeof KdsTextInput>;

const meta: Meta<typeof KdsTextInput> = {
  title: "Form Fields/TextInput",
  component: KdsTextInput as Meta<typeof KdsTextInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A text input field component with label and helper/error text support. " +
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
      description: "v-model binding for the input value",
      table: { category: "model" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
      table: { category: "props" },
    },
    label: {
      control: "text",
      description: "Label shown above the input",
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
    autocomplete: {
      control: "text",
      table: { category: "props" },
    },
    subText: {
      control: "text",
      description: "Helper text or error message shown below the input",
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
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "props" },
    },
    suggestions: {
      control: "object",
      description:
        "Optional list of suggestion strings displayed in a popover. " +
        "The user can still enter free text; selecting a suggestion fills the input.",
      table: { category: "props" },
    },
    suggestionsHeadline: {
      control: "text",
      description:
        "An optional headline displayed in the suggestions dropdown popover if suggestions are provided.",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: "",
    label: "Label",
    description: "",
    ariaLabel: undefined,
    placeholder: "",
    autocomplete: "",
    disabled: false,
    validating: false,
    error: false,
    subText: "",
    preserveSubTextSpace: false,
    suggestions: undefined,
    suggestionsHeadline: undefined,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsTextInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsTextInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });

    await step("Type into the input", async () => {
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.type(input, "Hello");
      await expect(input).toHaveValue("Hello");

      await userEvent.clear(input);
      await expect(input).toHaveValue("");
    });

    await step("Click label to focus input", async () => {
      input.blur();
      const label = canvas.getByText("Label");
      await userEvent.click(label);
      await expect(input).toHaveFocus();
    });

    await step("Tab focus", async () => {
      input.blur();
      await userEvent.tab();
      await expect(input).toHaveFocus();
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "Some value",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });
    await expect(input).toHaveValue("Some value");
  },
};

export const WithDescription: Story = {
  args: {
    placeholder: "Enter text",
    description:
      "This is a helpful description that explains what this field is for. " +
      "It appears in a popover when clicking the info button.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox", { name: /label/i });
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

export const Disabled: Story = {
  args: {
    placeholder: "Enter text",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });
    await expect(input).toBeDisabled();
  },
};

export const WithSubText: Story = {
  args: {
    placeholder: "Enter text",
    subText: "Helper text goes here",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Helper text goes here")).toBeInTheDocument();
  },
};

export const Validating: Story = {
  args: {
    modelValue: "Checking...",
    validating: true,
    subText: "Validation message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Validation message")).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    modelValue: "Invalid value",
    error: true,
    subText: "Error message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Error message")).toBeInTheDocument();
  },
};

export const Autocomplete: Story = {
  args: {
    label: "Email",
    placeholder: "your@email.com",
    autocomplete: "email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Email" });
    await expect(input).toHaveAttribute("autocomplete", "email");
  },
};

export const ProgrammaticFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how to programmatically focus the text input using the exposed `focus()` method via a template ref.",
      },
    },
  },
  render: () => ({
    components: { KdsTextInput, KdsButton },
    setup() {
      const textInputRef =
        useTemplateRef<InstanceType<typeof KdsTextInput>>("textInputRef");
      const handleFocusClick = () => {
        textInputRef.value?.focus();
      };
      return { handleFocusClick };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <KdsTextInput ref="textInputRef" label="Text Input" />
        <KdsButton @click="handleFocusClick" label="Focus Text Input" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Focus Text Input" });
    const input = canvas.getByRole("textbox", { name: "Text Input" });

    await expect(input).not.toHaveFocus();
    await userEvent.click(button);
    await expect(input).toHaveFocus();
  },
};

export const WithSuggestions: Story = {
  args: {
    placeholder: "Start typing a fruit…",
    suggestions: [
      "Apple",
      "Banana",
      "Cherry",
      "Date",
      "Elderberry",
      "Fig",
      "Grape",
    ],
    suggestionsHeadline: "Suggested fruits",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Label" });

    await step("Open suggestions on focus and select via click", async () => {
      await userEvent.click(input);
      const option = await canvas.findByRole("option", { name: "Cherry" });
      await expect(option).toBeInTheDocument();
      await userEvent.click(option);
      await expect(input).toHaveValue("Cherry");
    });

    await step("Filter suggestions while typing", async () => {
      await userEvent.clear(input);
      await userEvent.type(input, "Gr");
      await expect(
        canvas.getByRole("option", { name: "Grape" }),
      ).toBeInTheDocument();
      await expect(
        canvas.queryByRole("option", { name: "Apple" }),
      ).not.toBeInTheDocument();
    });

    await step(
      "Show suggestions headline if suggestions are available",
      async () => {
        const headline = await canvas.findByText("Suggested fruits");
        await expect(headline).toBeInTheDocument();
        await userEvent.type(input, "X");
        expect(canvas.queryByText("Suggested fruits")).not.toBeInTheDocument();
        await userEvent.clear(input);
      },
    );

    await step("Select via keyboard (ArrowDown + Enter)", async () => {
      await userEvent.clear(input);
      input.blur();
      await userEvent.click(input);
      await canvas.findByRole("option", { name: "Apple" });
      await userEvent.type(input, "Ban");
      await waitFor(() => {
        expect(
          canvas.queryByRole("option", { name: "Apple" }),
        ).not.toBeInTheDocument();
      });
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");
      await expect(input).toHaveValue("Banana");
    });

    await step("Close suggestions with Escape", async () => {
      await userEvent.clear(input);
      await userEvent.type(input, "A");
      await expect(
        canvas.getByRole("option", { name: "Apple" }),
      ).toBeInTheDocument();
      await userEvent.keyboard("{Escape}");
      await expect(input).toHaveValue("A");
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "false");
      });
      await waitFor(() => {
        expect(
          canvas.queryByRole("option", { name: "Apple" }),
        ).not.toBeInTheDocument();
      });
    });

    await step("Reopen suggestions when typing after Escape", async () => {
      await userEvent.type(input, "p");
      await expect(
        canvas.getByRole("option", { name: "Apple" }),
      ).toBeInTheDocument();
    });
    await step("Allow free text input", async () => {
      await userEvent.clear(input);
      await userEvent.type(input, "Kiwi");
      await expect(input).toHaveValue("Kiwi");
    });

    await step("Hide popover when no suggestions match free text", async () => {
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "false");
      });
      await expect(canvas.queryByRole("option")).not.toBeInTheDocument();
    });

    await step(
      "Reopen popover when clearing to match suggestions again",
      async () => {
        await userEvent.clear(input);
        await waitFor(() => {
          expect(input).toHaveAttribute("aria-expanded", "true");
        });
        await expect(
          canvas.getByRole("option", { name: "Apple" }),
        ).toBeInTheDocument();
        input.blur();
      },
    );
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsTextInput,
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      modelValue: ["", "Value"],
      placeholder: ["", "Placeholder"],
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

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsTextInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".TextInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31293":
          {
            placeholder: "{text}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31309":
          {
            placeholder: "{text}",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31359":
          {
            modelValue: "|",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31387":
          {
            modelValue: "{text}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-50384":
          {
            modelValue: "{text}",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35518":
          {
            modelValue: "{text}",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3498-31415":
          {
            placeholder: "{text}",
            disabled: true,
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsTextInput,
    width: 300,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    modelValue:
      "Very long value that should be truncated when the container is too small",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};
