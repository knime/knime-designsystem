import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import DateTimeFormatPopover from "./DateTimeFormatPopover.vue";
import type { KdsDateTimeFormatEntry, KdsTemporalType } from "./types";

type Story = StoryObj<typeof DateTimeFormatPopover>;

const sampleDefaultFormats: KdsDateTimeFormatEntry[] = [
  {
    format: "yyyy-MM-dd",
    temporalType: "DATE",
    category: "STANDARD",
    example: "2025-08-30",
  },
  {
    format: "MM/dd/yyyy",
    temporalType: "DATE",
    category: "STANDARD",
    example: "08/30/2025",
  },
  {
    format: "dd.M.yy",
    temporalType: "DATE",
    category: "STANDARD",
    example: "30.8.25",
  },
  {
    format: "{Format}",
    temporalType: "DATE",
    category: "STANDARD",
    example: "{Example of today's date}",
  },
  {
    format: "yyyy-MM-dd HH:mm",
    temporalType: "DATE_TIME",
    category: "STANDARD",
    example: "2025-08-30 14:05",
  },
  {
    format: "HH:mm",
    temporalType: "TIME",
    category: "STANDARD",
    example: "14:05",
  },
  {
    format: "yyyy-MM-dd HH:mm XXX",
    temporalType: "ZONED_DATE_TIME",
    category: "STANDARD",
    example: "2025-08-30 14:05 +02:00",
  },
  {
    format: "dd.MM.yyyy",
    temporalType: "DATE",
    category: "EUROPEAN",
    example: "30.08.2025",
  },
  {
    format: "MM-dd-yyyy",
    temporalType: "DATE",
    category: "AMERICAN",
    example: "08-30-2025",
  },
];

const onlyDateAllowedFormats: KdsTemporalType[] = ["DATE"];

const meta: Meta<typeof DateTimeFormatPopover> = {
  title: "Form Fields/DateTimeFormatInput/DateTimeFormatPopover",
  component: DateTimeFormatPopover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Popover content that lists available date and time formats and allows switching temporal type and locale/category.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-37391",
    },
  },
  argTypes: {
    selection: {
      control: "text",
      table: { category: "model" },
      description: "Currently selected format string.",
    },
    allowedFormats: {
      control: "object",
      table: { category: "props" },
      description:
        "Optional list of allowed temporal types (DATE, TIME, DATE_TIME, ZONED_DATE_TIME). If omitted, there are no restrictions.",
    },
    allDefaultFormats: {
      control: "object",
      table: { category: "props" },
    },
  },
  args: {
    selection: "MM/dd/yyyy",
    allowedFormats: undefined,
    allDefaultFormats: sampleDefaultFormats,
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

export const DesignComparator: StoryObj<typeof DateTimeFormatPopover> =
  buildDesignComparatorStory({
    component: DateTimeFormatPopover,
    designsToCompare: {
      DateTimeFormatPopover: {
        props: {
          allDefaultFormats: sampleDefaultFormats,
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-37302":
            {
              selection: "MM/dd/yyyy",
              parameters: { figmaOffset: { x: -20, y: -20 } },
            },
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6203-37392":
            {
              selection: "",
              parameters: { figmaOffset: { x: -20, y: -20 } },
            },
        },
      },
    },
  });

export const AllCombinations: Story = buildAllCombinationsStory({
  component: DateTimeFormatPopover,
  columns: 3,
  combinationsProps: {
    default: {
      allDefaultFormats: [sampleDefaultFormats],
      allowedFormats: [undefined, onlyDateAllowedFormats],
      selection: ["", "MM/dd/yyyy"],
    },
    combinations: [],
  },
  pseudoStates: ["hover", "focus-visible"],
});
