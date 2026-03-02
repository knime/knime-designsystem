import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import DateTimeFormatPopover from "./DateTimeFormatPopover.vue";
import KdsDateTimeFormatInput from "./KdsDateTimeFormatInput.vue";

type Story = StoryObj<typeof DateTimeFormatPopover>;

const sampleOptions = [
  { id: "yyyy-MM-dd", label: "Label", example: "(Example)" },
  { id: "dd.MM.yyyy", label: "Label", example: "(Example)" },
  { id: "MM/dd/yyyy", label: "Label", example: "(Example)" },
  { id: "yyyy-MM-dd HH:mm", label: "Label", example: "(Example)" },
  { id: "dd.M.yyyy", label: "Label", example: "(Example)" },
];

const meta: Meta<typeof DateTimeFormatPopover> = {
  title: "Form-fields/KdsDateTimeFormatInput/DateTimeFormatPopover",
  component: DateTimeFormatPopover,
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
  },
  args: {
    allowedFormats: undefined,
    allDefaultFormats: undefined,
    emptyText: "No entries in this list",
  },
};

export default meta;

export const Default: Story = {};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: DateTimeFormatPopover,
    width: 260,
  }),
  args: {},
};

export const DesignComparatorPopover: StoryObj<typeof DateTimeFormatPopover> =
  buildDesignComparatorStory({
    component: DateTimeFormatPopover,
    designsToCompare: {
      DateTimeFormatPopover: {
        props: {
          allowedFormats: sampleOptions,
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-37302":
            {
              selection: "yyyy-MM",
              parameters: { figmaOffset: { x: -16, y: -16 } },
            },
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-37392":
            {
              parameters: { figmaOffset: { x: -16, y: -16 } },
            },
        },
      },
    },
  });

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsDateTimeFormatInput,
  combinationsProps: {
    default: {},
  },
  pseudoStates: [],
});
