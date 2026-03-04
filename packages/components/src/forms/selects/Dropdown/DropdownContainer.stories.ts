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
    required: {
      control: "boolean",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: null,
    possibleValues: options(5, () => ({})),
    noEntriesText: "No entries found",
    required: false,
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

    // Click to select the first option
    await userEvent.click(canvas.getByRole("option", { name: "Label" }));

    // Verify selection: the first option should be selected
    const firstOption = canvas.getByRole("option", { name: "Label" });
    await expect(firstOption).toHaveAttribute("aria-selected", "true");

    // Focus the search input
    const filterInput = canvas.getByRole("textbox", {
      name: "Filter options",
    });
    filterInput.focus();
    await expect(filterInput).toHaveFocus();

    // ArrowDown + Enter selects the first option
    await userEvent.keyboard("{ArrowDown}{Enter}");

    await expect(firstOption).toHaveAttribute("aria-selected", "true");

    // TODO test search functionality and empty text
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "option-id-2",
  },
  play: async () => {
    // TODO add play tests, option-id-2 should be selected on initial render
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
      { id: "1", text: "Enabled option", disabled: true },
      { id: "2", text: "Disabled option" },
      { id: "3", text: "Another enabled option" },
    ],
  },
  play: async () => {
    // TODO add play tests, option-id-2 should be selected on initial render since 1 is disabled
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox");
    await expect(combobox).toHaveAttribute("aria-required", "true");

    // TODO check that selecting an selected option does not deselect it, since it's required
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
      required: [false],
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
