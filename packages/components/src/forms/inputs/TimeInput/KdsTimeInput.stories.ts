import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsTimeInput from "./KdsTimeInput.vue";

type Story = StoryObj<typeof KdsTimeInput>;

const meta: Meta<typeof KdsTimeInput> = {
  title: "Form Fields/TimeInput",
  component: KdsTimeInput as Meta<typeof KdsTimeInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A time input field with an picker popover for hours, minutes, seconds, and milliseconds.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-98622",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the time value in HH:mm:ss.SSS format",
      table: { category: "model" },
    },
    label: {
      control: "text",
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
    label: "Label",
    ariaLabel: undefined,
    description: "",
    placeholder: "Set time",
    autocomplete: "",
    subText: "",
    disabled: false,
    error: false,
    validating: false,
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsTimeInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsTimeInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });

    await step("Type and normalize time", async () => {
      await userEvent.click(input);
      await userEvent.type(input, "1:2:3.4");
      await userEvent.tab();
      await expect(input).toHaveValue("01:02:03.004");
    });

    await step("Open time picker via mouse and update values", async () => {
      const toggle = canvas.getByRole("button", { name: "Open time picker" });
      await userEvent.click(toggle);

      const hoursInput = await canvas.findByRole("spinbutton", {
        name: "Hours",
      });
      await userEvent.clear(hoursInput);
      await userEvent.type(hoursInput, "23");

      const minutesInput = canvas.getByRole("spinbutton", {
        name: "Minutes",
      });
      await userEvent.clear(minutesInput);
      await userEvent.type(minutesInput, "15");

      await expect(input).toHaveValue("23:15:03.004");
    });

    await step("Open and close picker via keyboard", async () => {
      const toggle = canvas.getByRole("button", { name: "Close time picker" });
      await expect(toggle).toHaveFocus();

      await userEvent.keyboard("{Enter}");
      await expect(toggle).toHaveAttribute("aria-pressed", "false");

      await userEvent.keyboard("{Enter}");
      await expect(toggle).toHaveAttribute("aria-pressed", "true");
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "23:15:00.000",
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "23:15:00.000",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    modelValue: "23:15:00.000",
    error: true,
    subText: "Error message",
  },
};

export const Validating: Story = {
  args: {
    modelValue: "23:15:00.000",
    validating: true,
    subText: "Validation message",
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsTimeInput,
    width: 218,
  }),
  args: {
    modelValue: "23:15:00.000",
    label:
      "Very long label that should be truncated when the container is too small",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsTimeInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".TimeInput": {
      props: {
        placeholder: "Set time",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-98623":
          {
            modelValue: "",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-98632":
          {
            modelValue: "",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-98641":
          {
            modelValue: "",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-98666":
          {
            modelValue: "23:15:00.000",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-98675":
          {
            modelValue: "23:15:00.000",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35920":
          {
            modelValue: "23:15:00.000",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-98684":
          {
            modelValue: "23:15:00.000",
            disabled: true,
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsTimeInput,
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      modelValue: ["", "23:15:00.000"],
      placeholder: ["Set time"],
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
