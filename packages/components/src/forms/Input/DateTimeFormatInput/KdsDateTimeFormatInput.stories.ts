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

const sampleOptions = [
  { id: "yyyy-MM-dd", label: "Label", example: "(Example)" },
  { id: "dd.MM.yyyy", label: "Label", example: "(Example)" },
  { id: "MM/dd/yyyy", label: "Label", example: "(Example)" },
  { id: "yyyy-MM-dd HH:mm", label: "Label", example: "(Example)" },
  { id: "dd.M.yyyy", label: "Label", example: "(Example)" },
];

const meta: Meta<typeof KdsDateTimeFormatInput> = {
  title: "Components/forms/KdsDateTimeFormatInput",
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

export const PopoverOpen: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Opens the popover via interaction (since the open state is internal-only).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formatButton = canvas.getByLabelText("Open date/time format picker");
    await userEvent.click(formatButton);
    await expect(canvas.findAllByRole("listbox")).toHaveLength(1);
  },
};

export const PopoverEmpty: Story = {
  args: {
    allDefaultFormats: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Overrides `allDefaultFormats` with an empty list to demonstrate the empty state.",
      },
    },
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
  pseudoStates: ["hover", "active", "focus", "focus-visible"],
});

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsDateTimeFormatInput,
  componentStyle: "width: 218px",
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
            modelValue: "yyyy-MM-dd",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29546":
          {
            modelValue: "yyyy-MM-dd",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29573":
          {
            modelValue: "yyyy-MM-dd",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-29596":
          {
            modelValue: "yyyy-MM-dd",
            disabled: true,
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-36487":
          {
            modelValue: "yyyy-MM-dd",
            // open is internal-only; popover variants are handled in `.DateTimeFormatPopover`
          },
      },
    },
    ".DateTimeFormatPopover": {
      props: {
        modelValue: "yyyy-MM-dd",
        formatOptions: sampleOptions,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-37302":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-37392":
          {
            formatOptions: [],
          },
      },
    },
  },
});

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
