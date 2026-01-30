import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsTextInput from "./KdsTextInput.vue";

type Story = StoryObj<typeof KdsTextInput>;

const meta: Meta<typeof KdsTextInput> = {
  title: "Components/forms/KdsTextInput",
  component: KdsTextInput as Meta<typeof KdsTextInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A text input field component with label and helper/error text support. " +
          "Supports leading/trailing icons, validation states, and accessibility features.",
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
      table: { category: "Model" },
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
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "Props" },
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
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
  },
  args: {
    modelValue: "",
    label: "Label",
    placeholder: "",
    leadingIcon: undefined,
    trailingIcon: undefined,
    required: false,
    disabled: false,
    readonly: false,
    validating: false,
    error: false,
    subText: "",
    preserveSubTextSpace: false,
    name: "",
    autocomplete: "",
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
    placeholder: "Enter text",
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "Some value",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leadingIcon: "search",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Email",
    placeholder: "your@email.com",
    trailingIcon: "checkmark",
  },
};

export const Required: Story = {
  args: {
    placeholder: "Enter text",
    required: true,
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: "Read only value",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Enter text",
    disabled: true,
  },
};

export const WithSubText: Story = {
  args: {
    placeholder: "Enter text",
    subText: "Helper text goes here",
  },
};

export const Validating: Story = {
  args: {
    modelValue: "Checking...",
    validating: true,
    subText: "Validation message",
  },
};

export const WithError: Story = {
  args: {
    modelValue: "Invalid value",
    error: true,
    subText: "Error message",
  },
};

export const NameAndAutocomplete: Story = {
  args: {
    label: "Email",
    placeholder: "your@email.com",
    name: "email",
    autocomplete: "email",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsTextInput,
  combinationsProps: [
    {
      label: ["Label"],
      modelValue: ["", "Value"],
      placeholder: ["", "Placeholder"],
      disabled: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Helper text"],
      leadingIcon: [undefined, "search"],
      trailingIcon: [undefined, "checkmark"],
    },
  ],
  pseudoStates: ["hover", "active", "focus", "focus-visible"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsTextInput,
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
    leadingIcon: "search",
    trailingIcon: "checkmark",
  },
};

export const Interaction: Story = {
  args: {
    label: "Label",
    modelValue: "",
    placeholder: "Enter text",
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    validating: false,
    subText: "",
    preserveSubTextSpace: false,
    leadingIcon: undefined,
    trailingIcon: undefined,
    name: "",
    autocomplete: "",
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

    await step("Tab focus", async () => {
      await userEvent.tab();
      await expect(input).toHaveFocus();
    });
  },
};
