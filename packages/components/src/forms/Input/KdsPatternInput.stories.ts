import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsPatternInput from "./KdsPatternInput.vue";

type Story = StoryObj<typeof KdsPatternInput>;

const meta: Meta<typeof KdsPatternInput> = {
  title: "Components/forms/KdsPatternInput",
  component: KdsPatternInput as Meta<typeof KdsPatternInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An input field for pattern-based filtering, with built-in toggles for case sensitivity, include/exclude matches, and wildcard/regex mode. " +
          "Includes a conditional clear button and accessibility labels for all toggle states.",
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
      description: "v-model binding for the input value",
      table: { category: "Model" },
    },
    caseSensitive: {
      control: "boolean",
      description: "v-model binding for case sensitivity toggle",
      table: { category: "Model" },
    },
    excludeMatches: {
      control: "boolean",
      description: "v-model binding for include/exclude matches toggle",
      table: { category: "Model" },
    },
    useRegex: {
      control: "boolean",
      description: "v-model binding for wildcard/regex mode toggle",
      table: { category: "Model" },
    },
    label: {
      control: "text",
      table: { category: "Props" },
    },
    placeholder: {
      control: "text",
      table: { category: "Props" },
    },
    name: {
      control: "text",
      table: { category: "Props" },
    },
    autocomplete: {
      control: "text",
      table: { category: "Props" },
    },
    subText: {
      control: "text",
      table: { category: "Props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "Props" },
    },
    readonly: {
      control: "boolean",
      table: { category: "Props" },
    },
    required: {
      control: "boolean",
      table: { category: "Props" },
    },
    error: {
      control: "boolean",
      table: { category: "Props" },
    },
    validating: {
      control: "boolean",
      description: "Shows a spinner next to the subtext when true",
      table: { category: "Props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "Props" },
    },
  },
  args: {
    modelValue: "",
    caseSensitive: false,
    excludeMatches: false,
    useRegex: false,
    label: "Pattern",
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
        components: { story },
        setup() {
          return {
            args: currentArgs,
            updateArgs,
          };
        },
        template:
          '<story v-bind="args" ' +
          '@update:modelValue="(value) => updateArgs({ modelValue: value })" ' +
          '@update:caseSensitive="(value) => updateArgs({ caseSensitive: value })" ' +
          '@update:excludeMatches="(value) => updateArgs({ excludeMatches: value })" ' +
          '@update:useRegex="(value) => updateArgs({ useRegex: value })" ' +
          "/>",
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

export const WithTogglesEnabled: Story = {
  args: {
    modelValue: "^column([1-9]|10)$",
    caseSensitive: true,
    excludeMatches: true,
    useRegex: true,
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

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsPatternInput,
  combinationsProps: [
    {
      label: ["Pattern"],
      modelValue: ["", "^column([1-9]|10)$"],
      placeholder: ["", "{pattern}"],
      disabled: [false, true],
      readonly: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Message"],
      caseSensitive: [false],
      excludeMatches: [false],
      useRegex: [false],
    },
  ],
  pseudoStates: ["hover", "active", "focus"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsPatternInput,
  componentStyle: "width: 218px",
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
    caseSensitive: false,
    excludeMatches: false,
    useRegex: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Pattern" });

    await step("Tab navigation (empty)", async () => {
      await userEvent.tab();
      await expect(input).toHaveFocus();

      await userEvent.tab();
      const caseToggle = canvas.getByRole("button", {
        name: "Case-insensitive",
      });
      await expect(caseToggle).toHaveFocus();
    });

    await step("Type, clear, and toggle", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "abc");
      await expect(input).toHaveValue("abc");

      await userEvent.tab();
      const clearButton = canvas.getByRole("button", { name: "Clear" });
      await expect(clearButton).toHaveFocus();

      await userEvent.keyboard("{Enter}");
      await expect(input).toHaveValue("");

      await userEvent.tab();
      const caseToggle = canvas.getByRole("button", {
        name: "Case-insensitive",
      });
      await userEvent.keyboard("{Space}");
      await expect(caseToggle).toHaveAttribute("aria-pressed", "true");

      const caseToggleActive = canvas.getByRole("button", {
        name: "Case-sensitive",
      });
      await expect(caseToggleActive).toHaveAttribute("aria-pressed", "true");
    });
  },
};
