import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import { TwinListPage } from "./KdsTwinList.pageobject";
import KdsTwinList from "./KdsTwinList.vue";
import { kdsTwinListSearchModes } from "./enums";
import type {
  KdsTwinListPossibleType,
  KdsTwinListPossibleValue,
} from "./types";

type Story = StoryObj<typeof KdsTwinList>;

// ── Shared data ──────────────────────────────────────────────────────────────

const simplePossibleValues: KdsTwinListPossibleValue[] = [
  { id: "a", text: "Alpha" },
  { id: "b", text: "Bravo" },
  { id: "c", text: "Charlie" },
  { id: "d", text: "Delta" },
  { id: "e", text: "Echo" },
];

const typedPossibleValues: KdsTwinListPossibleValue[] = [
  {
    id: "column-1",
    text: "String Column 1",
    accessory: { type: "dataType", name: "string-datatype" },
    type: "string",
  },
  {
    id: "column-2",
    text: "Number Column 1",
    accessory: { type: "dataType", name: "number-double-datatype" },
    type: "number",
  },
  {
    id: "column-3",
    text: "String Column 2",
    accessory: { type: "dataType", name: "string-datatype" },
    type: "string",
  },
  {
    id: "column-4",
    text: "Boolean Column 1",
    accessory: { type: "dataType", name: "boolean-datatype" },
    type: "boolean",
  },
  {
    id: "column-5",
    text: "Date Column 1",
    accessory: { type: "dataType", name: "string-datatype" },
    type: "date-time",
  },
  {
    id: "column-6",
    text: "Number Column 2",
    accessory: { type: "dataType", name: "number-double-datatype" },
    type: "number",
  },
  {
    id: "column-7",
    text: "Number Column 3",
    accessory: { type: "dataType", name: "number-double-datatype" },
    type: "number",
  },
  {
    id: "column-8",
    text: "String Column 3",
    accessory: { type: "dataType", name: "string-datatype" },
    type: "string",
  },
];

const filterTypes: KdsTwinListPossibleType[] = [
  {
    id: "string",
    text: "String",
    accessory: { type: "dataType", name: "string-datatype" },
  },
  {
    id: "number",
    text: "Number",
    accessory: { type: "dataType", name: "number-double-datatype" },
  },
  {
    id: "boolean",
    text: "Boolean",
    accessory: { type: "dataType", name: "boolean-datatype" },
  },
  {
    id: "date-time",
    text: "Date&Time",
    accessory: { type: "dataType", name: "date-time-local-datatype" },
  },
];

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof KdsTwinList> = {
  title: "Form Fields/TwinList",
  component: KdsTwinList as Meta<typeof KdsTwinList>["component"],
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3433-26697",
    },
  },
  argTypes: {
    mode: {
      control: { type: "select" },
      options: kdsTwinListSearchModes,
      table: { category: "model" },
    },
    manuallyIncluded: {
      control: { type: "object" },
      table: { category: "model" },
    },
    manuallyExcluded: {
      control: { type: "object" },
      table: { category: "model" },
    },
    includeUnknownValues: {
      control: { type: "select" },
      options: [true, false, null],
      table: { category: "model" },
    },
    pattern: {
      control: { type: "text" },
      table: { category: "model" },
    },
    caseSensitive: {
      control: "boolean",
      table: { category: "model" },
    },
    excludeMatches: {
      control: "boolean",
      table: { category: "model" },
    },
    useRegex: {
      control: "boolean",
      table: { category: "model" },
    },
    selectedTypes: {
      control: { type: "object" },
      table: { category: "model" },
    },
    possibleValues: {
      control: { type: "object" },
      table: { category: "props" },
    },
    enablePatternFilter: {
      control: "boolean",
      table: { category: "props" },
    },
    filterTypes: {
      control: { type: "object" },
      table: { category: "props" },
    },
    loading: {
      control: "boolean",
      table: { category: "props" },
    },
    excludeLabel: {
      control: { type: "text" },
      table: { category: "props" },
    },
    includeLabel: {
      control: { type: "text" },
      table: { category: "props" },
    },
    unknownValuesText: {
      control: { type: "text" },
      table: { category: "props" },
    },
    emptyStateLabel: {
      control: { type: "text" },
      table: { category: "props" },
    },
    label: {
      control: { type: "text" },
      table: { category: "form field props" },
    },
    ariaLabel: {
      control: { type: "text" },
      table: { category: "form field props" },
    },
    description: {
      control: { type: "text" },
      table: { category: "form field props" },
    },
    subText: {
      control: { type: "text" },
      table: { category: "form field props" },
    },
    error: {
      control: "boolean",
      table: { category: "form field props" },
    },
    validating: {
      control: "boolean",
      table: { category: "form field props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
    preserveSubTextSpace: {
      control: "boolean",
      table: { category: "form field props" },
    },
  },
  args: {
    mode: "manual",
    manuallyIncluded: [],
    manuallyExcluded: simplePossibleValues.map(({ id }) => id),
    includeUnknownValues: null,
    pattern: "",
    selectedTypes: [],
    caseSensitive: false,
    excludeMatches: false,
    useRegex: false,
    possibleValues: simplePossibleValues,
    filterTypes: undefined,
    enablePatternFilter: false,
    loading: false,
    excludeLabel: "Exclude",
    includeLabel: "Include",
    unknownValuesText: "Unknown columns",
    emptyStateLabel: "No entries in this list",
    label: "Label",
    ariaLabel: undefined,
    description: "",
    subText: "",
    error: false,
    validating: false,
    disabled: false,
    preserveSubTextSpace: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsTwinList },
      setup() {
        const mode = ref(args.mode);
        const manuallyIncluded = ref(args.manuallyIncluded);
        const manuallyExcluded = ref(args.manuallyExcluded);
        const includeUnknownValues = ref(args.includeUnknownValues);
        const pattern = ref(args.pattern);
        const selectedTypes = ref(args.selectedTypes);
        const caseSensitive = ref(args.caseSensitive);
        const excludeMatches = ref(args.excludeMatches);
        const useRegex = ref(args.useRegex);

        watchEffect(() => {
          mode.value = args.mode;
          manuallyIncluded.value = args.manuallyIncluded;
          manuallyExcluded.value = args.manuallyExcluded;
          includeUnknownValues.value = args.includeUnknownValues;
          pattern.value = args.pattern;
          selectedTypes.value = args.selectedTypes;
          caseSensitive.value = args.caseSensitive;
          excludeMatches.value = args.excludeMatches;
          useRegex.value = args.useRegex;
        });

        watchEffect(() =>
          updateArgs({
            mode: mode.value,
            manuallyIncluded: manuallyIncluded.value,
            manuallyExcluded: manuallyExcluded.value,
            includeUnknownValues: includeUnknownValues.value,
            pattern: pattern.value,
            selectedTypes: selectedTypes.value,
            caseSensitive: caseSensitive.value,
            excludeMatches: excludeMatches.value,
            useRegex: useRegex.value,
          }),
        );

        return {
          args,
          mode,
          manuallyIncluded,
          manuallyExcluded,
          includeUnknownValues,
          pattern,
          selectedTypes,
          caseSensitive,
          excludeMatches,
          useRegex,
        };
      },
      template: `
        <KdsTwinList
          v-bind="args"
          v-model:mode="mode"
          v-model:manually-included="manuallyIncluded"
          v-model:manually-excluded="manuallyExcluded"
          v-model:include-unknown-values="includeUnknownValues"
          v-model:pattern="pattern"
          v-model:selected-types="selectedTypes"
          v-model:case-sensitive="caseSensitive"
          v-model:exclude-matches="excludeMatches"
          v-model:use-regex="useRegex"
        />
      `,
    };
  },
};

export default meta;

/**
 * The simplest twinlist: manual mode only, no type filter, no unknown columns.
 * Uses plain string values without accessories or types.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const page = new TwinListPage(canvasElement);
    const { user, excludeList, includeList } = page;

    // Label is rendered
    await expect(within(canvasElement).getByText("Label")).toBeInTheDocument();

    // Both listboxes are present
    await expect(excludeList).toBeInTheDocument();
    await expect(includeList).toBeInTheDocument();

    // =====================================================================
    // Mouse interactions
    // =====================================================================

    // --- Click to select + button to move right ---
    const alphaOption = page.optionIn(excludeList, "Alpha");
    await user.click(alphaOption);
    await expect(alphaOption).toHaveAttribute("aria-selected", "true");
    await user.click(page.moveRightBtn);
    await page.expectOptionIn(includeList, "Alpha");
    await page.expectOptionNotIn(excludeList, "Alpha");

    // --- Click to select in include + button to move left ---
    const alphaInInclude = page.optionIn(includeList, "Alpha");
    await user.click(alphaInInclude);
    await user.click(page.moveLeftBtn);
    await page.expectOptionIn(excludeList, "Alpha");
    await page.expectOptionNotIn(includeList, "Alpha");

    // --- Double-click to move to include ---
    const bravoOption = page.optionIn(excludeList, "Bravo");
    await user.click(bravoOption);
    await user.dblClick(bravoOption);
    await page.expectOptionIn(includeList, "Bravo");
    await page.expectOptionNotIn(excludeList, "Bravo");

    // Double-click in include to move back to exclude
    const bravoInInclude = page.optionIn(includeList, "Bravo");
    await user.click(bravoInInclude);
    await user.dblClick(bravoInInclude);
    await page.expectOptionIn(excludeList, "Bravo");
    await page.expectOptionNotIn(includeList, "Bravo");

    // --- Move all right ---
    await user.click(page.moveAllRightBtn);
    for (const pv of simplePossibleValues) {
      await page.expectOptionIn(includeList, pv.text);
    }

    // --- Move all left ---
    await user.click(page.moveAllLeftBtn);
    for (const pv of simplePossibleValues) {
      await page.expectOptionIn(excludeList, pv.text);
    }

    // =====================================================================
    // Keyboard interactions
    // =====================================================================

    const firstOption = page.optionIn(excludeList, "Alpha");
    await user.click(firstOption);
    await page.expectOptionIn(excludeList, "Alpha", true);

    await user.keyboard("{ArrowDown}");
    await page.expectOptionIn(excludeList, "Bravo", true);

    await user.keyboard("{ArrowUp}");
    await page.expectOptionIn(excludeList, "Alpha", true);

    await user.keyboard("{ArrowRight}");
    await page.expectOptionIn(includeList, "Alpha");
    await page.expectOptionNotIn(excludeList, "Alpha");
    await page.expectOptionIn(excludeList, "Bravo", true);

    await user.click(page.optionIn(includeList, "Alpha"));
    await page.expectOptionIn(includeList, "Alpha", true);
    await user.keyboard("{ArrowLeft}");
    await page.expectOptionIn(excludeList, "Alpha");
    await page.expectOptionNotIn(includeList, "Alpha");

    // Enter key
    await user.click(page.moveAllLeftBtn);
    await user.click(page.optionIn(excludeList, "Alpha"));
    await user.keyboard("{Enter}");
    await page.expectOptionIn(includeList, "Alpha");
    await page.expectOptionNotIn(excludeList, "Alpha");

    await user.click(page.optionIn(includeList, "Alpha"));
    await page.expectOptionIn(includeList, "Alpha", true);
    await user.keyboard("{Enter}");
    await page.expectOptionIn(excludeList, "Alpha");
    await page.expectOptionNotIn(includeList, "Alpha");
  },
};

/**
 * Twinlist in pattern mode – the user provides a wildcard/regex pattern
 * to select matching values.
 */
export const WithPattern: Story = {
  args: {
    mode: "pattern",
    enablePatternFilter: true,
    pattern: "String Column*",
    possibleValues: typedPossibleValues,
  },
  play: async ({ canvasElement }) => {
    const page = new TwinListPage(canvasElement);

    await expect(page.includeList).toHaveAttribute("aria-disabled", "true");
    await expect(page.excludeList).toHaveAttribute("aria-disabled", "true");

    await page.findOptionIn(page.includeList, "String Column 1");
    await page.expectOptionIn(page.includeList, "String Column 2");
    await page.expectOptionIn(page.includeList, "String Column 3");

    await page.expectOptionIn(page.excludeList, "Number Column 1");
  },
};

/**
 * Twinlist with type filter enabled – demonstrates the column selection use
 * case where each value has a data type and the user can filter by type.
 */
export const WithTypeFilter: Story = {
  args: {
    mode: "type",
    filterTypes,
    selectedTypes: ["string"],
    possibleValues: typedPossibleValues,
  },
  play: async ({ canvasElement }) => {
    const page = new TwinListPage(canvasElement);
    const { user } = page;

    await expect(page.modeRadio("Type")).toBeInTheDocument();

    await page.expectOptionIn(page.includeList, "String Column 1");
    await page.expectOptionIn(page.includeList, "String Column 2");
    await page.expectOptionIn(page.includeList, "String Column 3");

    await page.expectOptionIn(page.excludeList, "Number Column 1");
    await page.expectOptionIn(page.excludeList, "Boolean Column 1");

    await user.click(page.modeRadio("Manual"));
    await expect(page.excludeList).not.toHaveAttribute("aria-disabled", "true");
  },
};

/**
 * Twinlist with unknown-columns handling visible – demonstrates the include/
 * exclude toggle for values that are not in the possibleValues list.
 */
export const WithUnknownColumns: Story = {
  args: {
    possibleValues: simplePossibleValues,
    manuallyIncluded: ["a", "b"],
    manuallyExcluded: ["c", "d", "e"],
    includeUnknownValues: true,
    unknownValuesText: "Unknown columns",
  },
  play: async ({ canvasElement }) => {
    const page = new TwinListPage(canvasElement);
    const { user, excludeList, includeList } = page;

    await page.expectOptionIn(includeList, "Alpha");
    await page.expectOptionIn(includeList, "Bravo");

    // Unknown columns sticky item is in the include list (includeUnknownValues: true)
    await page.expectOptionIn(includeList, "Unknown columns");

    await user.click(page.optionIn(includeList, "Unknown columns"));
    await user.click(page.moveLeftBtn);
    await page.expectOptionIn(excludeList, "Unknown columns");
    await page.expectOptionNotIn(includeList, "Unknown columns");
  },
};

/**
 * Twinlist with missing values – values in the model that are not present
 * in possibleValues are shown as "(Missing)" and are removed when moved.
 */
export const MissingValues: Story = {
  args: {
    manuallyIncluded: ["missing-included-1", "missing-included-2", "b"],
    manuallyExcluded: ["missing-excluded-1", "a", "c", "d", "e"],
    includeUnknownValues: false,
  },
  play: async ({ canvasElement }) => {
    const page = new TwinListPage(canvasElement);
    const { user, excludeList, includeList } = page;

    const excludeOptions = within(excludeList).getAllByRole("option");
    await expect(excludeOptions[0]).toHaveTextContent(
      /\(Missing\).*missing-excluded-1/,
    );

    const includeOptions = within(includeList).getAllByRole("option");
    await expect(includeOptions[0]).toHaveTextContent(
      /\(Missing\).*missing-included-1/,
    );
    await expect(includeOptions[1]).toHaveTextContent(
      /\(Missing\).*missing-included-2/,
    );
    await expect(includeOptions[2]).toHaveTextContent("Bravo");

    await user.click(excludeOptions[0]);
    await user.click(page.moveRightBtn);
    await page.expectOptionNotIn(excludeList, "missing-excluded-1");
    await page.expectOptionNotIn(includeList, "missing-excluded-1");

    const updatedIncludeOptions = within(includeList).getAllByRole("option");
    await user.click(updatedIncludeOptions[0]);
    await user.click(page.moveLeftBtn);
    await page.expectOptionNotIn(includeList, "missing-included-1");
    await page.expectOptionNotIn(excludeList, "missing-included-1");

    const missingIncluded2 = within(includeList).getAllByRole("option")[0];
    await expect(missingIncluded2).toHaveTextContent(
      /\(Missing\).*missing-included-2/,
    );
    await user.click(missingIncluded2);
    await user.dblClick(missingIncluded2);
    await page.expectOptionNotIn(includeList, "missing-included-2");
    await page.expectOptionNotIn(excludeList, "missing-included-2");

    await page.expectOptionIn(includeList, "Bravo");
    await page.expectOptionIn(excludeList, "Alpha");
  },
};

/**
 * Twinlist in loading state – shown while possible values are being fetched.
 * The header remains visible while both lists show a loading indicator.
 */
export const Loading: Story = {
  args: {
    manuallyIncluded: [],
    manuallyExcluded: [],
    loading: true,
    label: "Columns",
    enablePatternFilter: true,
    filterTypes: [],
    possibleValues: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Both lists show "Loading data…" empty state
    const loadingTexts = canvas.getAllByText("Loading data…");
    await expect(loadingTexts.length).toBe(2);
    await expect(canvas.queryByRole("option")).not.toBeInTheDocument();

    // All move buttons are disabled
    await expect(
      canvas.getByRole("button", { name: "Move selected values to include" }),
    ).toBeDisabled();
    await expect(
      canvas.getByRole("button", { name: "Move all values to include" }),
    ).toBeDisabled();
    await expect(
      canvas.getByRole("button", { name: "Move selected values to exclude" }),
    ).toBeDisabled();
    await expect(
      canvas.getByRole("button", { name: "Move all values to exclude" }),
    ).toBeDisabled();

    // Mode switcher is still rendered (with Manual, Pattern, Type)
    const modeSwitch = canvas.getByRole("radiogroup", {
      name: "Selection mode",
    });
    await expect(modeSwitch).toBeInTheDocument();
    await expect(
      within(modeSwitch).getByRole("radio", { name: "Manual" }),
    ).toBeInTheDocument();
    await expect(
      within(modeSwitch).getByRole("radio", { name: "Pattern" }),
    ).toBeInTheDocument();
    await expect(
      within(modeSwitch).getByRole("radio", { name: "Type" }),
    ).toBeInTheDocument();
  },
};

/**
 * Full-featured multimode twinlist with pattern filter, type filter, and
 * unknown columns. Demonstrates switching between modes and verifies that
 * manually chosen values persist when toggling modes, and that the manual
 * search filter does not affect other modes.
 */
export const Multimode: Story = {
  args: {
    mode: "manual",
    manuallyIncluded: ["column-1", "column-3"],
    manuallyExcluded: [
      "column-2",
      "column-4",
      "column-5",
      "column-6",
      "column-7",
      "column-8",
    ],
    includeUnknownValues: false,
    possibleValues: typedPossibleValues,
    enablePatternFilter: true,
    filterTypes,
    selectedTypes: ["number"],
    pattern: "Boolean*",
  },
  play: async ({ canvasElement }) => {
    const page = new TwinListPage(canvasElement);
    const { user, excludeList, includeList } = page;

    // =====================================================================
    // Start in Manual mode – verify initial manual selections
    // =====================================================================
    await expect(page.modeRadio("Manual")).toBeInTheDocument();
    await expect(page.modeRadio("Pattern")).toBeInTheDocument();
    await expect(page.modeRadio("Type")).toBeInTheDocument();

    await page.expectOptionIn(includeList, "String Column 1");
    await page.expectOptionIn(includeList, "String Column 2");
    await page.expectOptionIn(excludeList, "Number Column 1");

    // Lists are interactive in manual mode
    await expect(excludeList).not.toHaveAttribute("aria-disabled", "true");
    await expect(includeList).not.toHaveAttribute("aria-disabled", "true");

    // Move an extra item to include for later persistence check
    await user.click(page.optionIn(excludeList, "Number Column 1"));
    await user.click(page.moveRightBtn);
    await page.expectOptionIn(includeList, "Number Column 1");

    // =====================================================================
    // Switch to Pattern mode – lists become disabled, pattern-based selection
    // =====================================================================
    await user.click(page.modeRadio("Pattern"));

    await expect(excludeList).toHaveAttribute("aria-disabled", "true");
    await expect(includeList).toHaveAttribute("aria-disabled", "true");

    // Pattern "Boolean*" should include "Boolean Column 1"
    await page.findOptionIn(includeList, "Boolean Column 1");
    await page.expectOptionIn(excludeList, "String Column 1");

    // =====================================================================
    // Switch to Type mode – type-based selection
    // =====================================================================
    await user.click(page.modeRadio("Type"));

    await expect(excludeList).toHaveAttribute("aria-disabled", "true");
    await expect(includeList).toHaveAttribute("aria-disabled", "true");

    // selectedTypes: ["number"] should include all number columns
    await page.findOptionIn(includeList, "Number Column 1");
    await page.expectOptionIn(includeList, "Number Column 2");
    await page.expectOptionIn(includeList, "Number Column 3");
    await page.expectOptionIn(excludeList, "String Column 1");
    await page.expectOptionIn(excludeList, "Boolean Column 1");

    // =====================================================================
    // Switch back to Manual – manually chosen values should persist
    // =====================================================================
    await user.click(page.modeRadio("Manual"));

    await expect(excludeList).not.toHaveAttribute("aria-disabled", "true");
    await expect(includeList).not.toHaveAttribute("aria-disabled", "true");

    // The manual selections from before should still be intact
    // (column-1 String Column 1, column-3 String Column 2, and the moved Number Column 1)
    await page.expectOptionIn(includeList, "String Column 1");
    await page.expectOptionIn(includeList, "String Column 2");
    await page.expectOptionIn(includeList, "Number Column 1");

    // =====================================================================
    // Verify manual search filter does not leak to other modes
    // =====================================================================

    // Type a search term in manual mode
    const searchInput = within(canvasElement).getByRole("searchbox", {
      name: "Search values",
    });
    await user.type(searchInput, "String");

    // Only String columns visible in manual mode
    await page.expectOptionNotIn(excludeList, "Number Column 2");
    await page.expectOptionNotIn(excludeList, "Boolean Column 1");

    // Switch to Pattern mode – search filter should not apply
    await user.click(page.modeRadio("Pattern"));

    // Pattern "Boolean*" should still work, and non-matching items should
    // appear in exclude without being filtered by "String"
    await page.findOptionIn(includeList, "Boolean Column 1");
    await page.expectOptionIn(excludeList, "Number Column 1");

    // Switch to Type mode – search filter should not apply
    await user.click(page.modeRadio("Type"));

    // All number columns visible (not filtered by "String")
    await page.findOptionIn(includeList, "Number Column 1");
    await page.expectOptionIn(includeList, "Number Column 2");
    await page.expectOptionIn(includeList, "Number Column 3");
    await page.expectOptionIn(excludeList, "Boolean Column 1");
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsTwinList,
    width: 320,
  }),
  args: {
    label: "A Very Long Label That Should Also Test Text Overflow Behavior",
    possibleValues: [
      {
        id: "col-1",
        text: "This Is A Very Long String Column Name That Should Overflow",
        accessory: { type: "dataType", name: "string-datatype" },
        type: "string",
      },
      {
        id: "col-2",
        text: "Another Extremely Long Number Column Name For Overflow Testing",
        accessory: { type: "dataType", name: "number-double-datatype" },
        type: "number",
      },
      {
        id: "col-3",
        text: "Yet Another Long Boolean Column With An Excessively Verbose Name",
        accessory: { type: "dataType", name: "boolean-datatype" },
        type: "boolean",
      },
    ] satisfies KdsTwinListPossibleValue[],
    mode: "manual",
    manuallyIncluded: ["col-1"],
    manuallyExcluded: ["col-2", "col-3"],
    includeUnknownValues: true,
    unknownValuesText:
      "Unknown columns with a very long description text for overflow",
    enablePatternFilter: true,
    filterTypes: [
      {
        id: "string",
        text: "String",
        accessory: { type: "dataType", name: "string-datatype" },
      },
      {
        id: "number",
        text: "Number",
        accessory: { type: "dataType", name: "number-double-datatype" },
      },
      {
        id: "boolean",
        text: "Boolean",
        accessory: { type: "dataType", name: "boolean-datatype" },
      },
    ] satisfies KdsTwinListPossibleType[],
    selectedTypes: [],
    emptyStateLabel: "No entries in this list at all whatsoever",
  },
};

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsTwinList,
  wrapperStyle: "width: 320px;",
  designsToCompare: {
    manual: {
      props: {
        label: "{Label}",
        mode: "manual",
        manuallyIncluded: Array.from(
          { length: 9 },
          (_, i) => `column-${i + 1}`,
        ),
        manuallyExcluded: Array.from(
          { length: 11 },
          (_, i) => `column-${i + 10}`,
        ),
        includeUnknownValues: false,
        possibleValues: Array.from(
          { length: 20 },
          (_, i): KdsTwinListPossibleValue => ({
            text: "Column",
            id: `column-${i + 1}`,
            accessory: { type: "dataType", name: "string-datatype" },
          }),
        ),
        disabled: false,
        enablePatternFilter: true,
        filterTypes: [],
        selectedTypes: [],
      },
      variants: {
        [`${figmaBaseUrl}?node-id=3433-26697`]: {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsTwinList,
  combinationsProps: [
    // Manual mode: enabled vs disabled
    {
      label: ["Label"],
      mode: ["manual"],
      disabled: [false, true],
      manuallyIncluded: [["a", "b"]],
      manuallyExcluded: [["c", "d", "e"]],
      includeUnknownValues: [false],
      selectedTypes: [[]],
      possibleValues: [simplePossibleValues],
    },
    // Pattern mode: enabled vs disabled
    {
      label: ["Label"],
      mode: ["pattern"],
      enablePatternFilter: [true],
      filterTypes: [filterTypes],
      pattern: ["A*"],
      disabled: [false, true],
      manuallyIncluded: [[]],
      manuallyExcluded: [simplePossibleValues.map(({ id }) => id)],
      includeUnknownValues: [false],
      selectedTypes: [[]],
      possibleValues: [simplePossibleValues],
    },
    // Type mode: enabled vs disabled
    {
      label: ["Label"],
      mode: ["type"],
      disabled: [false, true],
      enablePatternFilter: [true],
      filterTypes: [filterTypes],
      manuallyIncluded: [[]],
      manuallyExcluded: [typedPossibleValues.map(({ id }) => id)],
      includeUnknownValues: [false],
      selectedTypes: [["string"]],
      possibleValues: [typedPossibleValues],
    },
    // Loading state
    {
      label: ["Label"],
      mode: ["manual"],
      loading: [true],
      manuallyIncluded: [[]],
      manuallyExcluded: [[]],
      includeUnknownValues: [false],
      selectedTypes: [[]],
      possibleValues: [[]],
    },
  ],
  pseudoStates: ["hover", "focus-visible"],
  columns: 2,
});
