import { useTemplateRef } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../../test-utils/storybook";
import BaseInput from "../../../inputs/BaseInput.vue";

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
  title: "Form Fields/_Helper/ListContainer",
  component: KdsListContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A standalone listbox container that renders options with keyboard navigation, " +
          "mouse interaction, and accessibility support. Emits an `itemClick` event " +
          "when an option is clicked or activated via Enter / Space.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3616-40417",
    },
  },
  argTypes: {
    ariaLabel: {
      control: "text",
      table: { category: "props" },
    },
    possibleValues: {
      control: "object",
      table: { category: "props" },
    },
    emptyText: {
      control: "text",
      table: { category: "props" },
    },
    controlledExternally: {
      control: "boolean",
      table: { category: "props" },
    },
    onItemClick: {
      table: { disable: true },
    },
  },
  args: {
    ariaLabel: "List container",
    possibleValues: baseOptions,
    emptyText: "No entries found",
    controlledExternally: false,
    onItemClick: fn(),
  },
} satisfies Meta<typeof KdsListContainer>;

export default meta;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox");
    const firstOption = canvas.getByRole("option", { name: "Label 1" });
    const lastOption = canvas.getByRole("option", { name: "Label 5" });

    // --- Mouse: mouseover activates an option ---
    const thirdOption = canvas.getByRole("option", { name: "Label 3" });
    await userEvent.hover(thirdOption);
    await expect(thirdOption).toHaveClass("active");

    // --- Mouseleave clears active when not focused ---
    await userEvent.unhover(thirdOption);
    await expect(thirdOption).not.toHaveClass("active");

    // --- Mouse: click emits itemClick ---
    await userEvent.click(thirdOption);
    await expect(args.onItemClick).toHaveBeenCalledWith("option-3");

    // --- Re-focus restores the last active item ---
    await userEvent.tab();
    await userEvent.tab({ shift: true });
    await expect(listbox).toHaveFocus();
    await expect(thirdOption).toHaveClass("active");

    // --- ArrowDown moves to the next option ---
    await userEvent.keyboard("{ArrowDown}");
    const fourthOption = canvas.getByRole("option", { name: "Label 4" });
    await expect(fourthOption).toHaveClass("active");
    await expect(thirdOption).not.toHaveClass("active");

    // --- Enter emits itemClick ---
    await userEvent.keyboard("{Enter}");
    await expect(args.onItemClick).toHaveBeenCalledWith("option-4");

    // --- Space emits itemClick ---
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard(" ");
    await expect(args.onItemClick).toHaveBeenCalledWith("option-5");

    // --- ArrowUp from the first item wraps to the last ---
    await userEvent.keyboard("{Home}");
    await expect(firstOption).toHaveClass("active");
    await userEvent.keyboard("{ArrowUp}");
    await expect(lastOption).toHaveClass("active");

    // --- ArrowDown from the last item wraps to the first ---
    await userEvent.keyboard("{ArrowDown}");
    await expect(firstOption).toHaveClass("active");

    // --- Home jumps to the first ---
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    await userEvent.keyboard("{Home}");
    await expect(firstOption).toHaveClass("active");

    // --- End jumps to the last ---
    await userEvent.keyboard("{End}");
    await expect(lastOption).toHaveClass("active");

    // --- Blur clears active state ---
    await userEvent.tab();
    await expect(lastOption).not.toHaveClass("active");

    // --- Mouseleave preserves active when focused ---
    await userEvent.click(listbox);
    await userEvent.hover(thirdOption);
    await expect(thirdOption).toHaveClass("active");
    await userEvent.unhover(thirdOption);
    await expect(thirdOption).toHaveClass("active");
  },
};

export const WithDisabledOptions: Story = {
  args: {
    possibleValues: [
      { id: "1", text: "Disabled first", selected: false, disabled: true },
      { id: "2", text: "Enabled option", selected: false },
      { id: "3", text: "Disabled middle", selected: false, disabled: true },
      { id: "4", text: "Another enabled option", selected: false },
      { id: "5", text: "Disabled last", selected: false, disabled: true },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const listbox = canvas.getByRole("listbox");

    // Disabled options render with aria-disabled
    await expect(
      canvas.getByRole("option", { name: "Disabled first" }),
    ).toHaveAttribute("aria-disabled", "true");
    await expect(
      canvas.getByRole("option", { name: "Disabled middle" }),
    ).toHaveAttribute("aria-disabled", "true");
    await expect(
      canvas.getByRole("option", { name: "Disabled last" }),
    ).toHaveAttribute("aria-disabled", "true");

    // Clicking a disabled option does not emit itemClick
    await userEvent.click(
      canvas.getByRole("option", { name: "Disabled first" }),
    );
    await expect(args.onItemClick).not.toHaveBeenCalled();

    // --- Keyboard: focus activates the first *enabled* item ---
    await userEvent.click(listbox);
    const firstEnabled = canvas.getByRole("option", {
      name: "Enabled option",
    });
    await expect(firstEnabled).toHaveClass("active");

    // ArrowDown skips disabled middle → lands on "Another enabled option"
    await userEvent.keyboard("{ArrowDown}");
    const secondEnabled = canvas.getByRole("option", {
      name: "Another enabled option",
    });
    await expect(secondEnabled).toHaveClass("active");

    // Enter emits itemClick with id "4"
    await userEvent.keyboard("{Enter}");
    await expect(args.onItemClick).toHaveBeenCalledWith("4");

    // --- Home jumps to the first enabled item (skips disabled first) ---
    await userEvent.keyboard("{Home}");
    await expect(firstEnabled).toHaveClass("active");

    // --- End jumps to the last enabled item (skips disabled last) ---
    await userEvent.keyboard("{End}");
    await expect(secondEnabled).toHaveClass("active");

    // --- ArrowDown from the last enabled wraps to the first enabled ---
    await userEvent.keyboard("{ArrowDown}");
    await expect(firstEnabled).toHaveClass("active");

    // --- ArrowUp from the first enabled wraps to the last enabled ---
    await userEvent.keyboard("{ArrowUp}");
    await expect(secondEnabled).toHaveClass("active");
  },
};

export const NoEntries: Story = {
  args: {
    possibleValues: [],
    emptyText: "Nothing to show",
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
      {
        id: "5",
        text: "Live status",
        accessory: { type: "liveStatus", status: "red" },
        subText: "stopped",
      },
    ],
  },
};

export const WithSectionTitles: Story = {
  args: {
    possibleValues: [
      {
        id: "fruits-header",
        text: "Fruits",
        sectionHeadline: true,
      },
      {
        id: "1",
        text: "Apple",
        accessory: { type: "icon", name: "placeholder" },
      },
      {
        id: "2",
        text: "Banana",
        accessory: { type: "icon", name: "placeholder" },
      },
      {
        id: "3",
        text: "Cherry",
        accessory: { type: "icon", name: "placeholder" },
        separator: true,
      },
      {
        id: "recently-used-header",
        text: "Recently used",
        sectionHeadline: true,
      },
      {
        id: "4",
        text: "Banana",
        accessory: { type: "icon", name: "placeholder" },
      },
      {
        id: "5",
        text: "Cherry",
        accessory: { type: "icon", name: "placeholder" },
      },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Section titles are rendered
    await expect(canvas.getByText("Fruits")).toBeInTheDocument();
    await expect(canvas.getByText("Recently used")).toBeInTheDocument();

    // Divider is rendered between groups
    await expect(
      canvasElement.querySelector(".kds-list-item-divider"),
    ).toBeInTheDocument();

    // Only option items are rendered as options (not section titles/dividers)
    await expect(canvas.getAllByRole("option")).toHaveLength(5);

    // Keyboard navigation skips section titles and dividers
    const listbox = canvas.getByRole("listbox");
    await userEvent.click(listbox);
    const firstOption = canvas.getByRole("option", { name: "Apple" });
    await expect(firstOption).toHaveClass("active");

    // ArrowDown navigates through all options across groups
    await userEvent.keyboard("{ArrowDown}");
    const bananaOptions = canvas.getAllByRole("option", { name: /^Banana/ });
    await expect(bananaOptions[0]).toHaveClass("active");

    // End jumps to last option (in the second group)
    await userEvent.keyboard("{End}");
    const lastOption = canvas.getAllByRole("option", { name: /^Cherry/ })[1];
    await expect(lastOption).toHaveClass("active");

    // Click emits itemClick with correct id
    await userEvent.click(firstOption);
    await expect(args.onItemClick).toHaveBeenCalledWith("1");
  },
};

export const WithExternalControlEl: Story = {
  args: {
    controlledExternally: true,
  },
  render: (args) => ({
    components: { KdsListContainer, BaseInput },
    setup() {
      const listContainer = useTemplateRef("listContainer");
      return { args, listContainer };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 6px">
        <BaseInput
          placeholder="Focus input to control the list"
          aria-label="Focus input to control the list"
          type="search"
          :aria-activedescendant="listContainer?.activeDescendant"
          @keydown="listContainer?.handleKeydown($event)"
          @focus="listContainer?.handleFocus()"
          @blur="listContainer?.handleBlur()"
        />
        <div style="border-radius: var(--kds-border-radius-container-0-37x); box-shadow: var(--kds-elevation-level-3);">
          <KdsListContainer ref="listContainer" v-bind="args" />
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", {
      name: "Focus input to control the list",
    });
    const listbox = canvas.getByRole("listbox");
    const firstOption = canvas.getByRole("option", { name: "Label 1" });
    const lastOption = canvas.getByRole("option", { name: "Label 5" });

    // Listbox is not focusable when controlled externally
    await expect(listbox).not.toHaveAttribute("tabindex");

    // --- Focus on input activates the first item ---
    await userEvent.click(input);
    await expect(input).toHaveFocus();
    await expect(firstOption).toHaveClass("active");

    // --- ArrowDown navigates within the list while input keeps focus ---
    await userEvent.keyboard("{ArrowDown}");
    const secondOption = canvas.getByRole("option", { name: "Label 2" });
    await expect(secondOption).toHaveClass("active");
    await expect(input).toHaveFocus();

    // --- Enter emits itemClick ---
    await userEvent.keyboard("{Enter}");
    await expect(args.onItemClick).toHaveBeenCalledWith("option-2");

    // --- Home / End work from the input ---
    await userEvent.keyboard("{End}");
    await expect(lastOption).toHaveClass("active");
    await userEvent.keyboard("{Home}");
    await expect(firstOption).toHaveClass("active");

    // --- Blur on the input clears active ---
    await userEvent.tab();
    await expect(firstOption).not.toHaveClass("active");

    // --- Mouseover then mouseleave clears active when input is not focused ---
    await userEvent.hover(firstOption);
    await expect(firstOption).toHaveClass("active");
    await userEvent.unhover(firstOption);
    await expect(firstOption).not.toHaveClass("active");

    // --- Mouseleave preserves active when input is focused ---
    await userEvent.click(input);
    await userEvent.hover(firstOption);
    await expect(firstOption).toHaveClass("active");
    await userEvent.unhover(firstOption);
    await expect(firstOption).toHaveClass("active");
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
    emptyText: "No entries found",
  },
};

export const DesignComparator: Story = {
  ...buildDesignComparatorStory({
    component: KdsListContainer,
    wrapperStyle: { width: "213px" },
    designsToCompare: {
      Default: {
        props: {
          ariaLabel: "Options",
          possibleValues: options(13, () => ({
            accessory: { type: "icon", name: "placeholder" },
            text: "Label",
          })),
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3433-24499":
            {},
        },
      },
      Empty: {
        props: {
          ariaLabel: "Options",
          possibleValues: [],
          emptyText: "No entries in this list",
        },
        variants: {
          "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-38479":
            {},
        },
      },
    },
  }),
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListContainer,
  combinationsProps: [
    {
      ariaLabel: ["Options"],
      emptyText: ["No entries found"],
      possibleValues: [options(3, () => ({})), []],
    },
  ],
  pseudoStates: ["hover", "focus-visible"],
});
