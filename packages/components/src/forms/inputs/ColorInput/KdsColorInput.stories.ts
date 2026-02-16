import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsColorInput from "./KdsColorInput.vue";

type Story = StoryObj<typeof KdsColorInput>;

const meta: Meta<typeof KdsColorInput> = {
  title: "Form fields/KdsColorInput",
  component: KdsColorInput as Meta<typeof KdsColorInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A color input component with a swatch preview and a popover-based color picker.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15830-418480",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the hex color value",
      table: { category: "Model" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
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
    label: "Label",
    ariaLabel: undefined,
    placeholder: "#FFFFFF",
    name: "",
    autocomplete: "",
    required: false,
    disabled: false,
    readonly: false,
    validating: false,
    error: false,
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
    placeholder: "#FFFFFF",
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "#5148E5",
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "#5148E5",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    modelValue: "#FFFFFF",
    error: true,
    subText: "Error message",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  component: KdsColorInput,
  combinationsProps: [
    {
      label: ["Label"],
      ariaLabel: [undefined],
      modelValue: ["", "#5148E5"],
      placeholder: ["#FFFFFF"],
      disabled: [false, true],
      readonly: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Helper text"],
    },
    {
      label: [undefined],
      ariaLabel: ["Color input"],
      modelValue: ["", "#5148E5"],
      placeholder: ["#FFFFFF"],
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
  component: KdsColorInput,
  wrapperStyle: "width: 213px",
  designsToCompare: {
    ".ColorInput": {
      props: { placeholder: "#FFFFFF" },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15830-418282":
          {
            modelValue: "",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15830-418481":
          {
            modelValue: "",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15831-421634":
          {
            modelValue: "#FFFFFF",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15831-418513":
          {
            modelValue: "#FFFFFF",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15831-418528":
          {
            modelValue: "#FFFFFF",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15831-418548":
          {
            modelValue: "#FFFFFF",
            validating: true,
            subText: "Validating...",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15831-418571":
          {
            modelValue: "#FFFFFF",
            disabled: true,
          },
      },
    },
  },
});

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsColorInput,
    width: 300,
  }),
  args: {
    label: "Very long label that should be truncated",
    modelValue: "#123456",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};

export const Interaction: Story = {
  args: {
    label: "Color",
    modelValue: "#5148E5",
    placeholder: "#FFFFFF",
    name: "",
    autocomplete: "",
    required: false,
    disabled: false,
    readonly: false,
    validating: false,
    error: false,
    subText: "",
    preserveSubTextSpace: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step("Open/close picker", async () => {
      const button = canvas.getByRole("button", { name: /open color picker/i });
      await userEvent.click(button);

      const dialog = await body.findByRole("dialog");
      await expect(dialog).toBeInTheDocument();

      await userEvent.click(button);
      await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};
