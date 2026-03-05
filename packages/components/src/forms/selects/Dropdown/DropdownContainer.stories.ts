import { ref, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import {
  kdsColorSwatchTypes,
  kdsIconNames,
  kdsLiveStatusStatuses,
  kdsTypeIconNames,
} from "../../../accessories";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import DropdownContainer from "./DropdownContainer.vue";
import type { KdsDropdownOption } from "./types";

type Story = StoryObj<typeof DropdownContainer>;

function options(
  length: number,
  generator: (idx: number) => Partial<KdsDropdownOption>,
): KdsDropdownOption[] {
  return Array.from({ length }, (_, idx) => ({
    id: `option-id-${idx + 1}`,
    text: `Label ${idx + 1}`,
    ...generator(idx),
  }));
}

const meta = {
  title: "Form fields/KdsDropdown/DropdownContainer",
  component: DropdownContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The internal dropdown list panel used by `KdsDropdown`. " +
          "It provides search and list rendering with optional accessories and subtext.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8379-28006",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      table: { category: "model" },
    },
    possibleValues: {
      control: "object",
      table: { category: "props" },
    },
    noEntriesText: {
      control: "text",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: null,
    possibleValues: options(5, () => ({})),
    noEntriesText: "No entries found",
  },
  render: (args) => {
    const [, updateArgs] = useArgs();

    return {
      components: { DropdownContainer },
      setup() {
        const modelValue = ref<string | null>(args.modelValue ?? null);
        watchEffect(() => (modelValue.value = args.modelValue ?? null));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<DropdownContainer v-bind="args" v-model="modelValue" />',
    };
  },
} satisfies Meta<typeof DropdownContainer>;

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // --- Mouse: click selects the first option ---
    const firstOption = canvas.getByRole("option", { name: "Label 1" });
    await userEvent.click(firstOption);
    await expect(firstOption).toHaveAttribute("aria-selected", "true");

    // Click same option again — stays selected
    await userEvent.click(firstOption);
    await expect(firstOption).toHaveAttribute("aria-selected", "true");

    // --- Keyboard: ArrowDown + Enter selects ---
    const filterInput = canvas.getByRole("searchbox", {
      name: "Filter options",
    });
    await userEvent.click(filterInput);
    await expect(filterInput).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}{Enter}");
    const secondOption = canvas.getByRole("option", { name: "Label 2" });
    await expect(secondOption).toHaveAttribute("aria-selected", "true");

    // --- Search filtering ---
    await userEvent.clear(filterInput);
    await userEvent.type(filterInput, "Label 3");

    // Only "Label 3" should be visible
    await expect(canvas.getByRole("option", { name: "Label 3" })).toBeVisible();
    await expect(
      canvas.queryByRole("option", { name: "Label 1" }),
    ).not.toBeInTheDocument();

    // --- No entries text ---
    await userEvent.clear(filterInput);
    await userEvent.type(filterInput, "zzz");
    await expect(canvas.getByText("No entries found")).toBeVisible();

    // Clear search to restore all options
    await userEvent.clear(filterInput);
    await expect(canvas.getAllByRole("option")).toHaveLength(5);
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "option-id-2",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // option-id-2 should be selected on initial render
    const selectedOption = canvas.getByRole("option", { name: "Label 2" });
    await expect(selectedOption).toHaveAttribute("aria-selected", "true");

    // Other options should not be selected
    await expect(
      canvas.getByRole("option", { name: "Label 1" }),
    ).toHaveAttribute("aria-selected", "false");
  },
};

export const NoEntriesText: Story = {
  args: {
    possibleValues: [],
    noEntriesText: "Nothing matches",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Nothing matches")).toBeVisible();
  },
};

export const ManyOptions: Story = {
  args: {
    possibleValues: options(100, () => ({})),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvasElement.querySelector(
      ".kds-dropdown-container",
    ) as HTMLElement;

    // Container height is capped (single-line: 192px)
    await expect(container.scrollHeight).toBeGreaterThan(
      container.clientHeight,
    );
    await expect(container.clientHeight).toBeLessThanOrEqual(192);

    // Navigate to a far item via keyboard — it should scroll into view
    const filterInput = canvas.getByRole("searchbox", {
      name: "Filter options",
    });
    await userEvent.click(filterInput);

    for (let i = 0; i < 20; i++) {
      await userEvent.keyboard("{ArrowDown}");
    }

    const activeOption = canvas.getByRole("option", { name: "Label 21" });
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeOption.getBoundingClientRect();
    await expect(itemRect.bottom).toBeLessThanOrEqual(containerRect.bottom + 1);
    await expect(itemRect.top).toBeGreaterThanOrEqual(containerRect.top - 1);

    // Click an item, then verify keyboard navigation still works (focus returns to search)
    await userEvent.click(canvas.getByRole("option", { name: "Label 5" }));
    await expect(filterInput).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(
      canvas.getByRole("option", { name: "Label 6" }),
    ).toHaveAttribute("aria-selected", "true");
  },
};

export const ManyMultilineOptions: Story = {
  args: {
    possibleValues: options(100, (idx) => ({
      subText: `Description for item ${idx + 1}`,
    })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvasElement.querySelector(
      ".kds-dropdown-container",
    ) as HTMLElement;

    // Container height is capped (multiline: 320px)
    await expect(container.scrollHeight).toBeGreaterThan(
      container.clientHeight,
    );
    await expect(container.clientHeight).toBeLessThanOrEqual(320);

    // Navigate to a far item via keyboard — it should scroll into view
    const filterInput = canvas.getByRole("searchbox", {
      name: "Filter options",
    });
    await userEvent.click(filterInput);

    for (let i = 0; i < 20; i++) {
      await userEvent.keyboard("{ArrowDown}");
    }

    const activeOption = canvas.getByRole("option", {
      name: /^Label 21\b/,
    });
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeOption.getBoundingClientRect();
    await expect(itemRect.bottom).toBeLessThanOrEqual(containerRect.bottom + 1);
    await expect(itemRect.top).toBeGreaterThanOrEqual(containerRect.top - 1);
  },
};

export const MissingValue: Story = {
  args: {
    modelValue: "missing",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const missingOption = canvas.getByRole("option", {
      name: /\(Missing\)\s*missing/i,
    });
    await expect(missingOption).toHaveAttribute("aria-disabled", "true");
  },
};

export const WithDisabledOptions: Story = {
  args: {
    possibleValues: [
      { id: "1", text: "Disabled option", disabled: true },
      { id: "2", text: "Enabled option" },
      { id: "3", text: "Another enabled option" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Disabled option should have aria-disabled
    const disabledOption = canvas.getByRole("option", {
      name: "Disabled option",
    });
    await expect(disabledOption).toHaveAttribute("aria-disabled", "true");

    // Clicking a disabled option should not select it
    await userEvent.click(disabledOption);
    await expect(disabledOption).toHaveAttribute("aria-selected", "false");

    // Clicking an enabled option should select it
    const enabledOption = canvas.getByRole("option", {
      name: "Enabled option",
    });
    await userEvent.click(enabledOption);
    await expect(enabledOption).toHaveAttribute("aria-selected", "true");

    // Keyboard navigation skips the disabled option: ArrowDown from first enabled → second enabled
    const filterInput = canvas.getByRole("searchbox", {
      name: "Filter options",
    });
    await userEvent.click(filterInput);
    await userEvent.keyboard("{ArrowDown}{Enter}");
    const thirdOption = canvas.getByRole("option", {
      name: "Another enabled option",
    });
    await expect(thirdOption).toHaveAttribute("aria-selected", "true");
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: DropdownContainer,
    width: 200,
  }),
  args: {
    possibleValues: [
      {
        id: "long",
        text: "A very very very very very long option label that should overflow",
        accessory: { type: "dataType", name: "string-datatype" },
      },
      {
        id: "short",
        text: "A short label",
        accessory: { type: "dataType", name: "string-datatype" },
      },
    ],
    noEntriesText: "No entries found",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: DropdownContainer,
  wrapperStyle: {
    width: "213px",
  },
  designsToCompare: {
    "Content=Label": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(6, () => ({ text: "Label" })),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=12016-39111":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Content=Columns": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(6, () => ({
          text: "Label",
          accessory: { type: "dataType", name: "string-datatype" },
        })),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6011-442435":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Content=Color swatch": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(13, () => ({
          text: "Color",
          accessory: { type: "colorSwatch", color: "#FFF" },
        })),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15625-75490":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Content=ColorGradient": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(7, () => ({})),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15631-134134":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Content=Color palette": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(7, () => ({})),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15634-51078":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Content=User": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(6, () => ({
          text: "Username",
          subText: "user.name@mail.com",
          accessory: { type: "avatar", initials: "FV" },
        })),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15406-68752":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Content=Label with subtext": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(7, () => ({
          text: "Label",
          subText: "Short description mix max 2 lines",
        })),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15406-69501":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Content=Icon with label and subtext": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(7, () => ({
          text: "Label",
          subText: "Short description mix max 2 lines",
          accessory: { type: "icon", name: "placeholder" },
        })),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15752-52963":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
    "Content=Live status": {
      props: {
        noEntriesText: "No entries found",
        possibleValues: options(7, () => ({
          text: "Label",
          subText: "Short description mix max 2 lines",
          accessory: { type: "liveStatus", status: "green" },
        })),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=16542-99195":
          {
            parameters: { figmaOffset: { x: -20, y: -20 } },
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: DropdownContainer,
  combinationsProps: [
    {
      modelValue: [null, "option-id-1", "missing"],
      noEntriesText: ["No entries found"],
      possibleValues: [
        options(3, () => ({})),
        options(3, (idx) => ({
          accessory: { type: "dataType", name: kdsTypeIconNames[idx] },
        })),
        options(3, () => ({ special: true })),
        options(3, (idx) => ({
          accessory: { type: "colorSwatch", color: kdsColorSwatchTypes[idx] },
        })),
        options(3, (idx) => ({
          subText: `Subtext ${idx + 1}`,
        })),
        options(3, (idx) => ({
          accessory: { type: "icon", name: kdsIconNames[idx] },
          subText: `Subtext ${idx + 1}`,
        })),
        options(3, (idx) => ({
          accessory: { type: "liveStatus", status: kdsLiveStatusStatuses[idx] },
        })),
      ],
    },
  ],
  pseudoStates: ["hover", "focus"],
});
