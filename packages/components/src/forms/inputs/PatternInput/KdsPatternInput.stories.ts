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

import KdsPatternInput from "./KdsPatternInput.vue";
import PatternDemo from "./PatternDemo.vue";

type Story = StoryObj<typeof KdsPatternInput>;

const meta: Meta<typeof KdsPatternInput> = {
  title: "Form Fields/PatternInput",
  component: KdsPatternInput as Meta<typeof KdsPatternInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An input field for pattern-based filtering. It exposes a single regex v-model and provides built-in toggles for case sensitivity, include/exclude matches, and wildcard/regex mode. " +
          "Toggle changes are encoded into the emitted regex so consumers don't need separate option bindings.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=1498-12041",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "Regex string (v-model)",
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
    modelValue: "",
    label: "Pattern",
    description: "",
    ariaLabel: undefined,
    placeholder: "",
    name: "",
    autocomplete: "",
    subText: "",
    required: false,
    disabled: false,
    readonly: false,
    validating: false,
    error: false,
    preserveSubTextSpace: false,
  },
  decorators: [
    (story) => {
      const [currentArgs, updateArgs] = useArgs();
      return {
        components: { story, PatternDemo },
        setup() {
          return {
            args: currentArgs,
            updateArgs,
          };
        },
        template: `
          <story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />
          <PatternDemo :pattern="args.modelValue" />
          `,
      };
    },
  ],
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: "^column([1-9]|10)$",
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
  },
};

export const WithEncodedOptions: Story = {
  args: {
    modelValue: "^(?!.*^column([1-9]|10)$).*$",
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
    readonly: true,
  },
};

export const WithDescription: Story = {
  args: {
    placeholder: "^column([1-9]|10)$",
    description:
      "This is a helpful description that explains what this field is for. " +
      "It appears in a popover when clicking the info button.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox", { name: /pattern/i });
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
    modelValue: "(",
    error: true,
    subText: "Invalid pattern",
  },
};

export const Validating: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
    validating: true,
    subText: "Validating pattern",
  },
};

export const ProgrammaticFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how to programmatically focus the pattern input using the exposed `focus()` method via a template ref.",
      },
    },
  },
  render: () => ({
    components: { KdsPatternInput, KdsButton },
    setup() {
      const patternInputRef =
        useTemplateRef<InstanceType<typeof KdsPatternInput>>("patternInputRef");
      const handleFocusClick = () => {
        patternInputRef.value?.focus();
      };
      return { handleFocusClick };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <KdsPatternInput ref="patternInputRef" aria-label="Pattern" />
        <KdsButton @click="handleFocusClick" label="Focus Pattern Input" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Focus Pattern Input" });
    const input = canvas.getByRole("textbox", { name: "Pattern" });

    await expect(input).not.toHaveFocus();
    await userEvent.click(button);
    await expect(input).toHaveFocus();
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsPatternInput,
  combinationsProps: {
    default: {
      label: ["Pattern"],
      ariaLabel: [undefined],
      modelValue: ["", "^column([1-9]|10)$"],
      placeholder: ["", "{pattern}"],
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
  component: KdsPatternInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".PatternInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-11564":
          {
            placeholder: "{Pattern}",
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsPatternInput,
    width: 340,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    modelValue:
      "^a-very-very-very-long-pattern-with-a-lot-of-characters-and-groups([0-9]+)$",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};

export const Interaction: Story = {
  args: {
    label: "Pattern",
    ariaLabel: undefined,
    modelValue: "",
    placeholder: "^column([1-9]|10)$",
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
    const input = canvas.getByRole("textbox", { name: "Pattern" });

    await step("Tab navigation (empty)", async () => {
      input.blur();
      await userEvent.tab();
      await expect(input).toHaveFocus();

      await userEvent.tab();
      const caseToggle = canvas.getByRole("button", {
        name: "Match case-insensitive",
      });
      await expect(caseToggle).toHaveFocus();
    });

    await step("Type, clear, and toggle", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "abc");
      await expect(input).toHaveValue("abc");

      // Wait for clear button to appear after typing
      const clearButton = await canvas.findByRole("button", { name: "Clear" });
      await userEvent.tab();
      await expect(clearButton).toHaveFocus();

      await userEvent.keyboard("{Enter}");
      await expect(input).toHaveValue("");

      // After clearing, the clear button disappears. Wait for toggle to be focusable.
      const caseToggle = await canvas.findByRole("button", {
        name: "Match case-insensitive",
      });
      await userEvent.click(caseToggle);

      // Wait for toggle state to update - the name changes when pressed
      const caseToggleActive = await canvas.findByRole("button", {
        name: "Match case-sensitive",
      });
      await expect(caseToggleActive).toHaveAttribute("aria-pressed", "true");
    });
  },
};
