import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsDateTimeFormatInput from "./KdsDateTimeFormatInput.vue";
import type { KdsDateTimeFormatEntry } from "./types";

type Story = StoryObj<typeof KdsDateTimeFormatInput>;

/**
 * Representative subset of date/time formats used by stories.
 * Covers all temporal types (DATE, TIME, DATE_TIME, ZONED_DATE_TIME),
 * all categories (RECENT, STANDARD, EUROPEAN, AMERICAN), and the
 * specific format strings referenced by play tests.
 */
const dateTimeFormats: KdsDateTimeFormatEntry[] = [
  // ── DATE / STANDARD ──
  {
    format: "yyyy-MM-dd",
    temporalType: "DATE",
    category: "STANDARD",
    example: "2026-02-04",
  },
  {
    format: "yyyy-MM",
    temporalType: "DATE",
    category: "STANDARD",
    example: "2026-02",
  },
  {
    format: "yyyyMMdd",
    temporalType: "DATE",
    category: "STANDARD",
    example: "20260204",
  },
  {
    format: "yyyy-MMM-dd",
    temporalType: "DATE",
    category: "STANDARD",
    example: "2026-Feb.-04",
  },

  // ── DATE / EUROPEAN ──
  {
    format: "dd/MM/yyyy",
    temporalType: "DATE",
    category: "EUROPEAN",
    example: "04/02/2026",
  },
  {
    format: "dd.MM.yyyy",
    temporalType: "DATE",
    category: "EUROPEAN",
    example: "04.02.2026",
  },
  {
    format: "d. MMMM yyyy",
    temporalType: "DATE",
    category: "EUROPEAN",
    example: "4. Februar 2026",
  },

  // ── DATE / AMERICAN ──
  {
    format: "MM/dd/yyyy",
    temporalType: "DATE",
    category: "AMERICAN",
    example: "02/04/2026",
  },
  {
    format: "MMM d, yyyy",
    temporalType: "DATE",
    category: "AMERICAN",
    example: "Feb. 4, 2026",
  },
  {
    format: "M/d/yyyy",
    temporalType: "DATE",
    category: "AMERICAN",
    example: "2/4/2026",
  },

  // ── DATE_TIME / STANDARD ──
  {
    format: "yyyy-MM-dd HH:mm",
    temporalType: "DATE_TIME",
    category: "STANDARD",
    example: "2026-02-04 09:02",
  },
  {
    format: "yyyy-MM-dd HH:mm:ss",
    temporalType: "DATE_TIME",
    category: "STANDARD",
    example: "2026-02-04 09:02:48",
  },
  {
    format: "yyyy-MM-dd'T'HH:mm:ss",
    temporalType: "DATE_TIME",
    category: "STANDARD",
    example: "2026-02-04T09:02:48",
  },

  // ── DATE_TIME / EUROPEAN ──
  {
    format: "dd/MM/yyyy HH:mm",
    temporalType: "DATE_TIME",
    category: "EUROPEAN",
    example: "04/02/2026 09:02",
  },
  {
    format: "dd.MM.yyyy HH:mm:ss",
    temporalType: "DATE_TIME",
    category: "EUROPEAN",
    example: "04.02.2026 09:02:48",
  },

  // ── DATE_TIME / AMERICAN ──
  {
    format: "MM/dd/yyyy HH:mm",
    temporalType: "DATE_TIME",
    category: "AMERICAN",
    example: "02/04/2026 09:02",
  },
  {
    format: "MM/dd/yyyy h:mm a",
    temporalType: "DATE_TIME",
    category: "AMERICAN",
    example: "02/04/2026 9:02 AM",
  },

  // ── TIME / STANDARD ──
  {
    format: "HH:mm",
    temporalType: "TIME",
    category: "STANDARD",
    example: "09:02",
  },
  {
    format: "HH:mm:ss",
    temporalType: "TIME",
    category: "STANDARD",
    example: "09:02:48",
  },
  {
    format: "h:mm a",
    temporalType: "TIME",
    category: "STANDARD",
    example: "9:02 AM",
  },

  // ── TIME / EUROPEAN ──
  {
    format: "HH:mm",
    temporalType: "TIME",
    category: "EUROPEAN",
    example: "09:02",
  },
  {
    format: "H:mm:ss",
    temporalType: "TIME",
    category: "EUROPEAN",
    example: "9:02:48",
  },

  // ── TIME / AMERICAN ──
  {
    format: "h:mm a",
    temporalType: "TIME",
    category: "AMERICAN",
    example: "9:02 AM",
  },
  {
    format: "h:mm:ss a",
    temporalType: "TIME",
    category: "AMERICAN",
    example: "9:02:48 AM",
  },

  // ── ZONED_DATE_TIME / STANDARD ──
  {
    format: "yyyy-MM-dd'T'HH:mm:ss'Z'",
    temporalType: "ZONED_DATE_TIME",
    category: "STANDARD",
    example: "2026-02-04T09:02:48Z",
  },
  {
    format: "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
    temporalType: "ZONED_DATE_TIME",
    category: "STANDARD",
    example: "2026-02-04T09:02:48.213+01:00",
  },
  {
    format: "yyyy-MM-dd'T'HH:mm:ss.SSSVV'['zzzz']'",
    temporalType: "ZONED_DATE_TIME",
    category: "STANDARD",
    example:
      "2026-02-04T09:02:48.213Europe/Berlin[Mitteleuropäische Normalzeit]",
  },

  // ── ZONED_DATE_TIME / EUROPEAN ──
  {
    format: "yyyy-MM-dd'T'HH:mm:ssXXX",
    temporalType: "ZONED_DATE_TIME",
    category: "EUROPEAN",
    example: "2026-02-04T09:02:48+01:00",
  },
  {
    format: "yyyy-MM-dd'T'HH:mm:ss'['VV']'",
    temporalType: "ZONED_DATE_TIME",
    category: "EUROPEAN",
    example: "2026-02-04T09:02:48[Europe/Berlin]",
  },

  // ── ZONED_DATE_TIME / AMERICAN ──
  {
    format: "yyyy-MM-dd'T'HH:mm:ss.SSSVV",
    temporalType: "ZONED_DATE_TIME",
    category: "AMERICAN",
    example: "2026-02-04T09:02:48.213Europe/Berlin",
  },
  {
    format: "yyyy-MM-dd HH:mm:ss VV",
    temporalType: "ZONED_DATE_TIME",
    category: "AMERICAN",
    example: "2026-02-04 09:02:48 Europe/Berlin",
  },

  // ── RECENT ──
  {
    format: "yyyy-MM-dd",
    temporalType: "DATE_TIME",
    category: "RECENT",
    example: "2026-02-04",
  },
];

const meta: Meta<typeof KdsDateTimeFormatInput> = {
  title: "Form Fields/DateTimeFormatInput",
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
      table: { category: "model" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
      table: { category: "props" },
    },
    label: {
      control: "text",
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
    allowedFormats: {
      control: "object",
      description:
        "Optional list of allowed temporal types (DATE, TIME, DATE_TIME, ZONED_DATE_TIME). If omitted, there are no restrictions.",
      table: { category: "props" },
    },
    allDefaultFormats: {
      control: "object",
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
    description: "",
    ariaLabel: undefined,
    placeholder: "Format",
    autocomplete: "",
    allowedFormats: undefined,
    allDefaultFormats: dateTimeFormats,
    subText: "",
    disabled: false,
    error: false,
    validating: false,
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsDateTimeFormatInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsDateTimeFormatInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: "Label" });

    await step("Type into the input", async () => {
      await user.click(input);
      await user.type(input, "yyyy-MM-dd");
      await expect(input).toHaveValue("yyyy-MM-dd");

      await user.clear(input);
      await expect(input).toHaveValue("");
    });

    await step("Open popover via mouse and select a format", async () => {
      const formatButton = canvas.getByRole("button", {
        name: "Open date/time format picker",
      });
      await user.click(formatButton);

      const dialog = await canvas.findByRole("listbox", {
        name: "Date/time formats",
      });
      await expect(dialog).toBeInTheDocument();

      // Default locale is "Recent" which has no entries → switch to "ISO"
      const isoTab = canvas.getByRole("radio", { name: "ISO" });
      await user.click(isoTab);

      const firstOption = (await canvas.findAllByRole("option"))[0];
      await user.click(firstOption);

      // Popover closes and input is updated with the first ISO date format
      await expect(input).toHaveValue("yyyy-MM-dd");
    });

    await step("Open popover via keyboard and select a format", async () => {
      // After the mouse step the native Popover API restores focus to the
      // toggle button that opened it.
      const formatButton = canvas.getByRole("button", {
        name: "Open date/time format picker",
      });
      await expect(formatButton).toHaveFocus();

      await user.keyboard("{Enter}");
      const listbox = await canvas.findByRole("listbox", {
        name: "Date/time formats",
      });
      await expect(listbox).toBeInTheDocument();

      listbox.focus();
      await user.keyboard("{ArrowDown}{Enter}");

      await expect(input).toHaveValue("yyyy-MM");
      await expect(
        canvas.queryByRole("listbox", { name: "Date/time formats" }),
      ).not.toBeInTheDocument();
    });
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "yyyy-MM-dd",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });
    await expect(input).toHaveValue("yyyy-MM-dd");
  },
};

export const WithDescription: Story = {
  args: {
    description:
      "Choose a format pattern for parsing and formatting date/time values. " +
      "The pattern follows Java DateTimeFormatter conventions.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: /label/i });
    await user.hover(input);

    const infoButton = await canvas.findByRole("button", {
      name: "Click for more information",
    });
    await expect(infoButton).toBeInTheDocument();

    await user.click(infoButton);

    const description = await canvas.findByText(
      /Choose a format pattern for parsing and formatting date\/time values\./i,
    );
    await expect(description).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    modelValue: "yyyy-MM-dd",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Label" });
    await expect(input).toBeDisabled();

    const formatButton = canvas.getByRole("button", {
      name: "Open date/time format picker",
    });
    await expect(formatButton).toBeDisabled();
  },
};

export const WithSubText: Story = {
  args: {
    subText: "Use Java DateTimeFormatter pattern syntax",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Use Java DateTimeFormatter pattern syntax"),
    ).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    modelValue: "invalid-format",
    error: true,
    subText: "Invalid date/time format",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("Invalid date/time format"),
    ).toBeInTheDocument();
  },
};

export const Validating: Story = {
  args: {
    modelValue: "yyyy-MM-dd",
    validating: true,
    subText: "Validating format…",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Validating format…")).toBeInTheDocument();
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

    const user = userEvent.setup();
    const formatButton = canvas.getByRole("button", {
      name: "Open date/time format picker",
    });
    await user.click(formatButton);

    // Multiple locales are available for DATE formats, so the locale switch must be rendered.
    const isoLocaleOption = await canvas.findByText("ISO");
    await expect(isoLocaleOption).toBeInTheDocument();

    // There is only one mode ("Date"), so the mode switch must not be rendered.
    await expect(canvas.queryByText("Date & Time")).not.toBeInTheDocument();

    // Ensure ISO is selected so the first option should be the built-in ISO date format.
    await user.click(isoLocaleOption);

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const user = userEvent.setup();
    const formatButton = canvas.getByRole("button", {
      name: "Open date/time format picker",
    });
    await user.click(formatButton);

    // Custom formats should appear in the popover
    const options = await canvas.findAllByRole("option");
    await expect(options.length).toBeGreaterThan(0);
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
        allDefaultFormats: dateTimeFormats,
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
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      modelValue: ["", "yyyy-MM-dd"],
      placeholder: ["", "Format"],
      disabled: [false],
      error: [false],
      validating: [false],
      subText: [undefined, "Message"],
      allDefaultFormats: [dateTimeFormats],
    },
    combinations: [
      { validating: [true], subText: ["Validation message"] },
      { error: [true], subText: ["Error message"] },
      { disabled: [true] },
    ],
  },
  pseudoStates: ["hover", "focus"],
});
