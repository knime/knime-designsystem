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
          "An input field for pattern-based filtering. Its v-model always contains the visible input text, while the `update:regex` event emits a compiled regex string based on the current toggles. " +
          "Consumers can use the optional toggle v-models for external control when needed.",
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
      description: "Visible pattern text",
      table: { category: "model" },
    },
    caseSensitive: {
      control: "boolean",
      table: { category: "model" },
    },
    excludeMatches: {
      control: "boolean",
      table: { category: "model" },
    },
    useRegex: {
      control: "boolean",
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
    caseSensitive: false,
    excludeMatches: false,
    useRegex: false,
    label: "Pattern",
    description: "",
    ariaLabel: undefined,
    placeholder: "",
    autocomplete: "",
    subText: "",
    disabled: false,
    validating: false,
    error: false,
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsPatternInput, PatternDemo },
      setup() {
        const modelValue = ref(args.modelValue);
        const caseSensitive = ref(args.caseSensitive);
        const excludeMatches = ref(args.excludeMatches);
        const useRegex = ref(args.useRegex);
        const regex = ref("");
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => (caseSensitive.value = args.caseSensitive));
        watchEffect(() => (excludeMatches.value = args.excludeMatches));
        watchEffect(() => (useRegex.value = args.useRegex));
        watchEffect(() =>
          updateArgs({
            modelValue: modelValue.value,
            caseSensitive: caseSensitive.value,
            excludeMatches: excludeMatches.value,
            useRegex: useRegex.value,
          }),
        );
        return {
          args,
          modelValue,
          caseSensitive,
          excludeMatches,
          useRegex,
          regex,
        };
      },
      template: `
        <KdsPatternInput
          v-bind="args"
          v-model="modelValue"
          v-model:case-sensitive="caseSensitive"
          v-model:exclude-matches="excludeMatches"
          v-model:use-regex="useRegex"
          @update:regex="regex = $event"
        />
        <PatternDemo :pattern="regex" />
      `,
    };
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: "^column([1-9]|10)$",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: "Pattern" });

    await step("Tab navigation (empty)", async () => {
      input.blur();
      await user.tab();
      await expect(input).toHaveFocus();

      await user.tab();
      const caseToggle = canvas.getByRole("button", {
        name: "Case sensitivity",
      });
      await expect(caseToggle).toHaveFocus();
    });

    await step("Type, clear, and toggle", async () => {
      await user.click(input);
      await user.type(input, "abc");
      await expect(input).toHaveValue("abc");

      // Wait for clear button to appear after typing
      const clearButton = await canvas.findByRole("button", { name: "Clear" });
      await user.tab();
      await expect(clearButton).toHaveFocus();

      await user.keyboard("{Enter}");
      await expect(input).toHaveValue("");

      // After clearing, the clear button disappears. Wait for toggle to be focusable.
      const caseToggle = await canvas.findByRole("button", {
        name: "Case sensitivity",
      });
      await user.click(caseToggle);

      // The accessible name stays the same; only aria-pressed changes
      await expect(caseToggle).toHaveAttribute("aria-pressed", "true");
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
    useRegex: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Pattern" });
    await expect(input).toHaveValue("^column([1-9]|10)$");
  },
};

export const WithEncodedOptions: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
    useRegex: true,
    excludeMatches: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Pattern" });
    await expect(input).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
    useRegex: true,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Pattern" });
    await expect(input).toBeDisabled();
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

    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: /pattern/i });
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

export const WithError: Story = {
  args: {
    modelValue: "(",
    useRegex: true,
    error: true,
    subText: "Invalid pattern",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Invalid pattern")).toBeInTheDocument();
  },
};

export const Validating: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
    useRegex: true,
    validating: true,
    subText: "Validating pattern",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Validating pattern")).toBeInTheDocument();
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
    const user = userEvent.setup();
    const button = canvas.getByRole("button", { name: "Focus Pattern Input" });
    const input = canvas.getByRole("textbox", { name: "Pattern" });

    await expect(input).not.toHaveFocus();
    await user.click(button);
    await expect(input).toHaveFocus();
  },
};

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

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsPatternInput,
  combinationsProps: {
    default: {
      label: ["Pattern"],
      ariaLabel: [undefined],
      modelValue: ["", "^column([1-9]|10)$"],
      useRegex: [false, true],
      caseSensitive: [false],
      excludeMatches: [false],
      placeholder: ["", "{pattern}"],
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
