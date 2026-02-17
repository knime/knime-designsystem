import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import KdsButton from "../../../buttons/KdsButton.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsSearchInput from "./KdsSearchInput.vue";

type Story = StoryObj<typeof KdsSearchInput>;

const meta: Meta<typeof KdsSearchInput> = {
  title: "Components/forms/KdsSearchInput",
  component: KdsSearchInput as Meta<typeof KdsSearchInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A search input field component with built-in search icon and a clear button that appears when the input has a value. " +
          "Supports validation states, helper/error text, and keyboard accessible clearing.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4516-7057",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the input value",
      table: { category: "Model" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
      table: { category: "Props" },
    },
    id: {
      control: "text",
      description: "ID for the input element",
      table: { category: "Props" },
    },
    label: {
      control: "text",
      description: "Label shown above the input",
      table: { category: "Props" },
    },
    placeholder: {
      control: "text",
      description: "Placeholder shown when the input is empty",
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
      description: "Helper text or error message shown below the input",
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
    id: "",
    label: undefined,
    ariaLabel: "Search",
    placeholder: "Search",
    name: "",
    autocomplete: "",
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

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Search",
    ariaLabel: undefined,
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "Searchterm",
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: "Searchterm",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithSubText: Story = {
  args: {
    subText: "Helper text goes here",
  },
};

export const Validating: Story = {
  args: {
    modelValue: "Searchterm",
    validating: true,
    subText: "Validation message",
  },
};

export const WithError: Story = {
  args: {
    modelValue: "Searchterm",
    error: true,
    subText: "Error message",
  },
};

export const ProgrammaticFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how to programmatically focus the search input using the exposed `focus()` method via a template ref.",
      },
    },
  },
  render: () => ({
    components: { KdsSearchInput, KdsButton },
    setup() {
      const searchInputRef = ref<InstanceType<typeof KdsSearchInput> | null>(
        null,
      );
      const handleFocusClick = () => {
        searchInputRef.value?.focus();
      };
      return { searchInputRef, handleFocusClick };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <KdsSearchInput ref="searchInputRef" aria-label="Search" />
        <KdsButton @click="handleFocusClick" label="Focus Search Input" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Focus Search Input" });
    const input = canvas.getByRole("searchbox", { name: "Search" });

    await expect(input).not.toHaveFocus();
    await userEvent.click(button);
    await expect(input).toHaveFocus();
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  component: KdsSearchInput,
  combinationsProps: [
    {
      ariaLabel: ["Search"],
      label: [undefined, "Search"],
      modelValue: ["", "Searchterm"],
      placeholder: ["Search", "Placeholder"],
      disabled: [false, true],
      readonly: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Helper text"],
    },
  ],
  pseudoStates: ["hover", "active", "focus"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsSearchInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".SearchInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16750":
          {
            placeholder: "Search",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16760":
          {
            placeholder: "Search",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16770":
          {
            modelValue: "|",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16780":
          {
            modelValue: "Search",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16790":
          {
            modelValue: "Search",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35622":
          {
            modelValue: "Search",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16800":
          {
            placeholder: "Search",
            disabled: true,
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsSearchInput,
    width: 300,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    placeholder: "Very long placeholder text that should be truncated",
    modelValue: "Very long value that should be truncated",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};

export const Interaction: Story = {
  args: {
    modelValue: "",
    id: "",
    label: undefined,
    ariaLabel: "Search",
    placeholder: "Search",
    name: "",
    autocomplete: "",
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    validating: false,
    subText: "",
    preserveSubTextSpace: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search" });

    await step("Type into the input", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "Searchterm");
      await expect(input).toHaveValue("Searchterm");
    });

    await step(
      "Tab to clear button and clear while keeping focus on the input",
      async () => {
        const clearButton = canvas.getByRole("button", { name: "Clear" });
        await userEvent.tab();
        await expect(clearButton).toHaveFocus();

        await userEvent.click(clearButton);
        await expect(input).toHaveValue("");
        await expect(input).toHaveFocus();
      },
    );
  },
};
