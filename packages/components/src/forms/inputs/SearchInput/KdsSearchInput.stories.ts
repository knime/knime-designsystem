import { ref, useTemplateRef, watchEffect } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, within } from "storybook/test";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook.ts";

import KdsSearchInput from "./KdsSearchInput.vue";
import type { KdsSearchResult } from "./types.ts";

function options(
  length: number,
  prefix: string,
  generator: (idx: number) => Partial<KdsSearchResult>,
): KdsSearchResult[] {
  return Array.from({ length }, (_, idx) => ({
    id: `${prefix}-result-${idx + 1}`,
    text: `Result ${idx + 1}`,
    ...generator(idx),
    separator: length === idx + 1,
  }));
}

const baseOptions = options(5, "base", () => ({
  accessory: { type: "icon", name: "placeholder" },
}));

const additionalOptions = options(5, "additional", () => ({
  accessory: { type: "icon", name: "placeholder" },
  subText: "Sub text - additional information",
}));

const headline = (idx: number): KdsSearchResult => ({
  id: `headline-id-${idx}`,
  text: `Headline ${idx}`,
  sectionHeadline: true,
});

const button: KdsSearchResult = {
  id: "button-id",
  text: "Static action button",
  accessory: { type: "icon", name: "search" },
};

const results = [
  headline(1),
  ...baseOptions,
  headline(2),
  ...additionalOptions,
  button,
];

type Story = StoryObj<typeof KdsSearchInput>;

const meta: Meta<typeof KdsSearchInput> = {
  title: "Form Fields/SearchInput",
  component: KdsSearchInput as Meta<typeof KdsSearchInput>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A search input field component with built-in search icon and a clear button that appears when the input has a value. " +
          "Supports validation states, helper/error text, keyboard accessible clearing, and instant search results dropdown.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4516-7057",
    },
  },
  argTypes: {
    modelValue: {
      control: "text",
      description: "v-model binding for the input value",
      table: { category: "model" },
    },
    ariaLabel: {
      control: "text",
      description: "Accessible label used when no visible label is rendered",
      table: { category: "props" },
    },
    id: {
      control: "text",
      description: "ID for the input element",
      table: { category: "props" },
    },
    label: {
      control: "text",
      description: "Label shown above the input",
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
    results: {
      control: "object",
      description: "Results to show in the search results container",
      table: { category: "props" },
    },
    resultsMaxHeight: {
      control: "text",
      description: "Max height of the search results container",
      table: { category: "props" },
    },
  },
  args: {
    modelValue: "",
    id: "",
    label: undefined,
    description: "",
    ariaLabel: "Search",
    placeholder: "Search",
    autocomplete: "",
    disabled: false,
    error: false,
    validating: false,
    subText: "",
    preserveSubTextSpace: false,
    results: undefined,
    resultsMaxHeight: undefined,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsSearchInput },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsSearchInput v-bind="args" v-model="modelValue" />',
    };
  },
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("searchbox", { name: "Search" });

    await step("Type search value", async () => {
      await user.click(input);
      await user.type(input, "Searchterm");
      await expect(input).toHaveValue("Searchterm");
    });

    await step(
      "Tab to clear button and clear while keeping focus on the input",
      async () => {
        const clearButton = await canvas.findByRole("button", {
          name: "Clear",
        });
        await user.tab();
        await expect(clearButton).toHaveFocus();

        await user.click(clearButton);
        await expect(input).toHaveValue("");
        await expect(input).toHaveFocus();
      },
    );
  },
};

export const WithLabel: Story = {
  args: {
    label: "Search",
    ariaLabel: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search" });
    await expect(input).toBeInTheDocument();
  },
};

export const WithValue: Story = {
  args: {
    modelValue: "Searchterm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search" });
    await expect(input).toHaveValue("Searchterm");
  },
};

export const WithDescription: Story = {
  args: {
    label: "Search",
    ariaLabel: undefined,
    placeholder: "Search",
    description:
      "This is a helpful description that explains what this field is for. " +
      "It appears in a popover when clicking the info button.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const user = userEvent.setup();
    const input = canvas.getByRole("searchbox", { name: /search/i });
    await user.hover(input);

    const infoButton = await canvas.findByRole("button", {
      name: "Click for more information",
    });
    await expect(infoButton).toBeInTheDocument();

    await user.click(infoButton);

    const description = await canvas.findByText(
      /This is a helpful description that explains what this field is for\./i,
    );
    await expect(description).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search" });
    await expect(input).toBeDisabled();
  },
};

export const WithSubText: Story = {
  args: {
    subText: "Helper text goes here",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Helper text goes here")).toBeInTheDocument();
  },
};

export const Validating: Story = {
  args: {
    modelValue: "Searchterm",
    validating: true,
    subText: "Validation message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Validation message")).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    modelValue: "Searchterm",
    error: true,
    subText: "Error message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Error message")).toBeInTheDocument();
  },
};

export const ProgrammaticFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how to programmatically focus the search input using the exposed `focus()` method via a template ref.",
      },
    },
  },
  render: () => ({
    components: { KdsSearchInput, KdsButton },
    setup() {
      const searchInputRef =
        useTemplateRef<InstanceType<typeof KdsSearchInput>>("searchInputRef");
      const handleFocusClick = () => {
        searchInputRef.value?.focus();
      };
      return { handleFocusClick };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <KdsSearchInput ref="searchInputRef" aria-label="Search" />
        <KdsButton @click="handleFocusClick" label="Focus Search Input" />
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const button = canvas.getByRole("button", { name: "Focus Search Input" });
    const input = canvas.getByRole("searchbox", { name: "Search" });

    await expect(input).not.toHaveFocus();
    await user.click(button);
    await expect(input).toHaveFocus();
  },
};

export const WithResults: Story = {
  args: {
    label: "Search",
    ariaLabel: undefined,
    results,
    resultsMaxHeight: "var(--kds-dimension-component-height-25x)",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("combobox", { name: "Search" });
    const results = await canvas.findByRole("listbox", { hidden: true });
    const option = await canvas.findByRole("option", {
      name: "Result 1",
      hidden: true,
    });

    await step("Open search results on focus", async () => {
      await user.click(input);
      await expect(results).toBeVisible();
      await expect(option).toBeVisible();
    });

    await step("Close search results on result click", async () => {
      await user.click(option);
      await expect(results).not.toBeVisible();
      await expect(option).not.toBeVisible();
    });

    await step(
      "Close search results on Enter key when option is selected",
      async () => {
        await user.click(input);
        await expect(results).toBeVisible();
        await expect(option).toBeVisible();

        await user.keyboard("{ArrowDown}{Enter}");
        await expect(results).not.toBeVisible();
        await expect(option).not.toBeVisible();
      },
    );
  },
};

export const WithEmptyResults: Story = {
  args: {
    label: "Search",
    ariaLabel: undefined,
    results: [],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("combobox", { name: "Search" });
    const results = await canvas.findByRole("listbox", { hidden: true });

    await step("Shows empty message", async () => {
      await user.click(input);
      await expect(results).toBeVisible();
      await expect(results).toHaveTextContent("No search results");
    });
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsSearchInput,
    width: 300,
  }),
  args: {
    label:
      "Very long label that should be truncated when the container is too small",
    placeholder: "Very long placeholder text that should be truncated",
    modelValue: "Very long value that should be truncated",
    subText:
      "Very long helper text that should wrap to multiple lines when needed",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsSearchInput,
  wrapperStyle: "width: 218px",
  designsToCompare: {
    ".SearchInput": {
      props: {},
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16750":
          {
            placeholder: "Search",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16760":
          {
            placeholder: "Search",
            parameters: { pseudo: { hover: true } },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16770":
          {
            modelValue: "|",
            parameters: {
              pseudo: { focus: true },
              figmaOffset: { x: -3, y: -3 },
            },
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16780":
          {
            modelValue: "Search",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16790":
          {
            modelValue: "Search",
            error: true,
            subText: "{Error message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5351-35622":
          {
            modelValue: "Search",
            validating: true,
            subText: "{Validation message}",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3524-16800":
          {
            placeholder: "Search",
            disabled: true,
          },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsSearchInput,
  combinationsProps: {
    default: {
      label: ["Label"],
      ariaLabel: [undefined],
      modelValue: ["", "Searchterm"],
      placeholder: ["", "Search"],
      disabled: [false],
      error: [false],
      validating: [false],
      subText: [undefined, "Message"],
      results: [undefined, results],
      resultsMaxHeight: [
        undefined,
        "var(--kds-dimension-component-height-25x)",
      ],
    },
    combinations: [
      { validating: [true], subText: ["Validation message"] },
      { error: [true], subText: ["Error message"] },
      { disabled: [true] },
    ],
  },
  pseudoStates: ["hover", "focus"],
});
