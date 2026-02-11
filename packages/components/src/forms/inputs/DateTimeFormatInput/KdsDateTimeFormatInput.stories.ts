import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsDateTimeFormatInput from "./KdsDateTimeFormatInput.vue";

type Story = StoryObj<typeof KdsDateTimeFormatInput>;

const meta: Meta<typeof KdsDateTimeFormatInput> = {
  title: "Form fields/KdsDateTimeFormatInput",
  component: KdsDateTimeFormatInput as Meta<
    typeof KdsDateTimeFormatInput
  >["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An input field for date/time format strings with an action button that opens a popover to pick a format.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-28594",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the format string",
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
    allowedFormats: {
      control: "object",
      table: { category: "Props" },
      description:
        "Optional list of allowed temporal types (DATE, TIME, DATE_TIME, ZONED_DATE_TIME). If omitted, there are no restrictions.",
    },
    allDefaultFormats: {
      control: "object",
      table: { category: "Props" },
    },
    emptyText: {
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
    placeholder: "Format",
    allowedFormats: undefined,
    allDefaultFormats: undefined,
    emptyText: "No entries in this list",
    name: "",
    autocomplete: "",
    subText: "",
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    validating: false,
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

export const WithValue: Story = {
  args: {
    modelValue: "yyyy-MM-dd",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: "yyyy-MM-dd",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formatButton = canvas.getByLabelText("Open date/time format picker");
    await expect(formatButton).toBeDisabled();
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: "yyyy-MM-dd",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formatButton = canvas.getByLabelText("Open date/time format picker");
    await expect(formatButton).toBeDisabled();
  },
};

export const WithError: Story = {
  args: {
    modelValue: "yyyy-MM-dd",
    error: true,
    subText: "Error message",
  },
};

export const Validating: Story = {
  args: {
    modelValue: "yyyy-MM-dd",
    validating: true,
    subText: "Validation message",
  },
};

export const AllowedFormatsOnlyDate: Story = {
  args: {
    allowedFormats: ["DATE"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Restricts the list to DATE formats only (no time/date-time options).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const formatButton = canvas.getByLabelText("Open date/time format picker");
    await userEvent.click(formatButton);

    // Multiple locales are available for DATE formats, so the locale switch must be rendered.
    const isoLocaleOption = await canvas.findByText("ISO");
    await expect(isoLocaleOption).toBeInTheDocument();

    // There is only one mode ("Date"), so the mode switch must not be rendered.
    await expect(canvas.queryByText("Date & Time")).not.toBeInTheDocument();

    // Ensure ISO is selected so the first option should be the built-in ISO date format.
    await userEvent.click(isoLocaleOption);

    const options = await canvas.findAllByRole("option");
    await expect(options[0]).toHaveTextContent("yyyy-MM-dd");
  },
};

export const OverrideFormats: Story = {
  args: {
    allDefaultFormats: [
      {
        format: "yyyy-MM-dd",
        temporalType: "DATE",
        category: "RECENT",
        example: "2026-02-04",
      },
      {
        format: "yyyy-MM-dd",
        temporalType: "DATE",
        category: "STANDARD",
        example: "2026-02-04",
      },
      {
        format: "dd.MM.yyyy",
        temporalType: "DATE",
        category: "EUROPEAN",
        example: "04.02.2026",
      },
    ],
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsDateTimeFormatInput,
    width: 260,
  }),
  args: {
    modelValue:
      "VeryLongFormatStringThatShouldOverflow-YYYY-MM-DD-hh-mm-ss-SSS-ZZZ",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsDateTimeFormatInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".DateTimeFormatInput": {
      props: {
        placeholder: "{Formatted Value}",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29038":
          {
            modelValue: "",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29440":
          {
            modelValue: "",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29455":
          {
            modelValue: "",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29531":
          {
            modelValue: "{Formatted Value}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29546":
          {
            modelValue: "{Formatted Value}",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29573":
          {
            modelValue: "{Formatted Value}",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29596":
          {
            modelValue: "{Formatted Value}",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-36488":
          {
            modelValue: "{Formatted Value}",
            parameters: { pseudo: { active: true } },
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsDateTimeFormatInput,
  combinationsProps: [
    {
      label: ["Label"],
      modelValue: ["", "yyyy-MM-dd"],
      disabled: [false, true],
      readonly: [false, true],
      error: [false, true],
      validating: [false, true],
      subText: [undefined, "Message"],
    },
  ],
  pseudoStates: ["hover", "focus"],
});
