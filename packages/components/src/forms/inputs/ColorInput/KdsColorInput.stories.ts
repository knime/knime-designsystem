import { ref, watchEffect } from "vue";
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
  title: "Form Fields/ColorInput",
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
      table: { category: "model" },
    },
    label: {
      control: "text",
      description: "Label shown above the input",
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
  },
  args: {
    modelValue: "",
    label: "Label",
    placeholder: "#FFFFFF",
    autocomplete: "",
    disabled: false,
    validating: false,
    error: false,
    subText: "",
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsColorInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsColorInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholder: "#FFFFFF",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const input = canvas.getByRole("textbox", { name: "Label" });
    const pickerButton = canvas.getByRole("button", {
      name: /open color picker/i,
    });

    await step("Mouse: type a hex value into the input", async () => {
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.type(input, "#FF6600");
      await expect(input).toHaveValue("#FF6600");
    });

    await step("Mouse: open and close color picker", async () => {
      await userEvent.click(pickerButton);

      const dialog = await body.findByRole("dialog");
      await expect(dialog).toBeInTheDocument();

      await userEvent.click(pickerButton);
      await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
    });

    await step("Keyboard: type into the input", async () => {
      await userEvent.click(input);
      await expect(input).toHaveFocus();

      await userEvent.clear(input);
      await userEvent.type(input, "#00FF00");
      await expect(input).toHaveValue("#00FF00");
    });

    await step("Keyboard: tab to picker button and toggle", async () => {
      await userEvent.tab();
      await expect(pickerButton).toHaveFocus();

      await userEvent.keyboard("{Enter}");
      const dialog = await body.findByRole("dialog");
      await expect(dialog).toBeInTheDocument();

      await userEvent.keyboard("{Enter}");
      await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
    });

    await step("Mouse: open and close color picker via swatch", async () => {
      const swatch = canvasElement.querySelector(".kds-color-swatch");
      if (!swatch) {
        throw new Error("Color swatch not found");
      }

      await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
      await userEvent.click(swatch);

      const dialog = await body.findByRole("dialog");
      await expect(dialog).toBeInTheDocument();

      await userEvent.click(swatch);
      await expect(body.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "#5148E5",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });
    await expect(input).toHaveValue("#5148E5");
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "#5148E5",
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });
    const pickerButton = canvas.getByRole("button", {
      name: /open color picker/i,
    });

    await step("Disabled state is applied", async () => {
      await expect(input).toBeDisabled();
      await expect(pickerButton).toBeDisabled();
    });

    await step("Mouse: swatch does not open color picker", async () => {
      const swatch = canvasElement.querySelector(".kds-color-swatch");
      if (!swatch) {
        throw new Error("Color swatch not found");
      }

      await userEvent.click(swatch);
      await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

export const WithError: Story = {
  args: {
    modelValue: "#FFFFFF",
    error: true,
    subText: "Error message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Error message")).toBeInTheDocument();
  },
};

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

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsColorInput,
  combinationsProps: [
    {
      label: ["Label"],
      ariaLabel: ["Aria Label"],
      modelValue: ["", "#5148E5"],
      placeholder: ["#FFFFFF"],
      disabled: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Helper text"],
    },
    {
      label: [undefined],
      ariaLabel: ["Aria Label"],
      modelValue: ["", "#5148E5"],
      placeholder: ["#FFFFFF"],
      disabled: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Helper text"],
    },
  ],
  pseudoStates: ["hover", "focus"],
});
