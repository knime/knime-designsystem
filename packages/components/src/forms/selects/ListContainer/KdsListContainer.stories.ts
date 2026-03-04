import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../test-utils/storybook";

import KdsListContainer from "./KdsListContainer.vue";
import type { KdsListOption } from "./types";

type Story = StoryObj<typeof KdsListContainer>;

function options(
  length: number,
  generator: (idx: number) => Partial<KdsListOption>,
): KdsListOption[] {
  return Array.from({ length }, (_, idx) => ({
    id: `option-${idx + 1}`,
    text: `Label ${idx + 1}`,
    selected: false,
    ...generator(idx),
  }));
}

const baseOptions = options(5, () => ({}));

const meta = {
  title: "Form fields/KdsListContainer",
  component: KdsListContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A standalone listbox container that renders options with keyboard navigation, " +
          "mouse interaction, and accessibility support. Emits a `toggleItem` event " +
          "when an option is clicked or activated via Enter / Space.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3616-40417",
    },
  },
  argTypes: {
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
    possibleValues: baseOptions,
    noEntriesText: "No entries found",
  },
} satisfies Meta<typeof KdsListContainer>;

export default meta;

export const Default: Story = {
  args: {
    onToggleItem: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox");

    // --- Focus activates the first enabled item ---
    listbox.focus();
    await expect(listbox).toHaveFocus();

    const firstOption = canvas.getByRole("option", { name: "Label 1" });
    await expect(firstOption).toHaveClass("active");

    // --- ArrowDown moves to the next option ---
    await userEvent.keyboard("{ArrowDown}");
    const secondOption = canvas.getByRole("option", { name: "Label 2" });
    await expect(secondOption).toHaveClass("active");
    await expect(firstOption).not.toHaveClass("active");

    // --- Enter emits toggleItem ---
    await userEvent.keyboard("{Enter}");
    await expect(args.onToggleItem).toHaveBeenCalledWith("option-2");

    // --- Blur clears active state ---
    listbox.blur();
    await expect(secondOption).not.toHaveClass("active");
  },
};

export const WithSelectedOption: Story = {
  args: {
    possibleValues: options(5, (idx) => ({ selected: idx === 1 })),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const selectedOption = canvas.getByRole("option", { name: "Label 2" });
    await expect(selectedOption).toHaveAttribute("aria-selected", "true");

    const unselectedOption = canvas.getByRole("option", { name: "Label 1" });
    await expect(unselectedOption).toHaveAttribute("aria-selected", "false");
  },
};

export const WithDisabledOptions: Story = {
  args: {
    possibleValues: [
      { id: "1", text: "Enabled option", selected: false },
      { id: "2", text: "Disabled option", selected: false, disabled: true },
      { id: "3", text: "Another enabled option", selected: false },
    ],
    onToggleItem: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox");

    // Disabled option renders with aria-disabled
    const disabledOption = canvas.getByRole("option", {
      name: "Disabled option",
    });
    await expect(disabledOption).toHaveAttribute("aria-disabled", "true");

    // Clicking a disabled option does not emit toggleItem
    await userEvent.click(disabledOption);
    await expect(args.onToggleItem).not.toHaveBeenCalled();

    // --- Keyboard: ArrowDown skips disabled items ---
    listbox.focus();

    // First enabled option "Enabled option" is active on focus
    const firstEnabled = canvas.getByRole("option", {
      name: "Enabled option",
    });
    await expect(firstEnabled).toHaveClass("active");

    // ArrowDown goes to "Another enabled option" (skips disabled)
    await userEvent.keyboard("{ArrowDown}");
    const thirdOption = canvas.getByRole("option", {
      name: "Another enabled option",
    });
    await expect(thirdOption).toHaveClass("active");

    // Enter emits toggleItem with id "3"
    await userEvent.keyboard("{Enter}");
    await expect(args.onToggleItem).toHaveBeenCalledWith("3");
  },
};

export const MouseInteraction: Story = {
  args: {
    onToggleItem: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // --- Mouseover activates an option ---
    const thirdOption = canvas.getByRole("option", { name: "Label 3" });
    await userEvent.hover(thirdOption);
    await expect(thirdOption).toHaveClass("active");

    // --- Click emits toggleItem ---
    await userEvent.click(thirdOption);
    await expect(args.onToggleItem).toHaveBeenCalledWith("option-3");
  },
};

export const KeyboardWrapAround: Story = {
  args: {
    onToggleItem: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox");

    listbox.focus();

    // First option is active on focus
    const firstOption = canvas.getByRole("option", { name: "Label 1" });
    await expect(firstOption).toHaveClass("active");

    // ArrowUp from the first item wraps to the last
    await userEvent.keyboard("{ArrowUp}");
    const lastOption = canvas.getByRole("option", { name: "Label 5" });
    await expect(lastOption).toHaveClass("active");

    // ArrowDown from the last item wraps to the first
    await userEvent.keyboard("{ArrowDown}");
    await expect(firstOption).toHaveClass("active");

    // Navigate to the middle, then Home jumps to the first
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await userEvent.keyboard("{Home}");
    await expect(firstOption).toHaveClass("active");

    // End jumps to the last
    await userEvent.keyboard("{End}");
    await expect(lastOption).toHaveClass("active");
  },
};

export const SpaceToSelect: Story = {
  args: {
    onToggleItem: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox");

    listbox.focus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard(" ");
    await expect(args.onToggleItem).toHaveBeenCalledWith("option-2");
  },
};

export const NoEntries: Story = {
  args: {
    possibleValues: [],
    noEntriesText: "Nothing to show",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Nothing to show")).toBeVisible();
  },
};

export const WithAccessories: Story = {
  args: {
    possibleValues: [
      {
        id: "1",
        text: "Icon option",
        accessory: { type: "icon", name: "placeholder" },
      },
      {
        id: "2",
        text: "Data type option",
        accessory: { type: "dataType", name: "string-datatype" },
      },
      {
        id: "3",
        text: "Color swatch option",
        accessory: { type: "colorSwatch", color: "#C7DA3E" },
      },
      {
        id: "4",
        text: "Avatar option",
        accessory: { type: "avatar", initials: "FV" },
        subText: "user@mail.com",
      },
    ],
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsListContainer,
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
        text: "Short",
      },
    ],
    noEntriesText: "No entries found",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsListContainer,
  wrapperStyle: { width: "213px" },
  designsToCompare: {
    Default: {
      props: {
        possibleValues: options(13, () => ({
          accessory: { type: "dataType", name: "string-datatype" },
          text: "Label",
        })),
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3433-24499":
          {},
      },
    },
    Empty: {
      props: { possibleValues: [], noEntriesText: "No entries in this list" },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-38479":
          {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListContainer,
  combinationsProps: [
    {
      noEntriesText: ["No entries found"],
      possibleValues: [options(6, () => ({})), []],
    },
  ],
  pseudoStates: ["hover", "focus-visible"],
});
