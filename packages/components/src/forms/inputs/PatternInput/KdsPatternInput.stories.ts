import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsPatternInput from "./KdsPatternInput.vue";
import PatternDemo from "./PatternDemo.vue";

type Story = StoryObj<typeof KdsPatternInput>;

const meta: Meta<typeof KdsPatternInput> = {
  title: "Components/forms/KdsPatternInput",
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
      table: { category: "Model" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
      table: { category: "Props" },
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
    label: "Pattern",
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
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  component: KdsPatternInput,
  combinationsProps: [
    {
      label: ["Pattern"],
      ariaLabel: [undefined],
      modelValue: ["", "^column([1-9]|10)$"],
      placeholder: ["", "{pattern}"],
      disabled: [false, true],
      readonly: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Message"],
    },
    {
      label: [undefined],
      ariaLabel: ["Pattern"],
      modelValue: ["", "^column([1-9]|10)$"],
      placeholder: ["", "{pattern}"],
      disabled: [false, true],
      readonly: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Message"],
    },
  ],
  pseudoStates: ["hover", "active", "focus"],
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
