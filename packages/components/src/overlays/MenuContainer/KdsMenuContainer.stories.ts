import { ref, useTemplateRef } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import KdsToggleButton from "../../buttons/KdsToggleButton/KdsToggleButton.vue";
import type { KdsListOption } from "../../forms/_helper/List/ListContainer";
import KdsPopover from "../Popover/KdsPopover.vue";

import KdsMenuContainer from "./KdsMenuContainer.vue";

type Story = StoryObj<typeof KdsMenuContainer>;

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
  title: "Overlays/MenuContainer",
  component: KdsMenuContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A styled card to display MenuItems in context menus (e.g. right click or on Buttons, Split Buttons)",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4962-87031",
    },
  },
  argTypes: {
    possibleValues: {
      control: "object",
      table: { category: "props" },
    },
    onItemClick: {
      table: { disable: true },
    },
  },
  args: {
    possibleValues: baseOptions,
    onItemClick: fn(),
  },
  render: (args) => ({
    components: { KdsToggleButton, KdsPopover, KdsMenuContainer },
    setup() {
      const popoverRef = useTemplateRef("popoverRef");
      const isMenuOpen = ref<boolean>(false);
      return { args, popoverRef, isMenuOpen };
    },
    template: `
        <KdsToggleButton
          v-model="isMenuOpen"
          label="Toggle menu"
          variant="outlined"
          aria-haspopup="menu"
          :aria-expanded="isMenuOpen"
          :aria-controls="popoverRef?.popoverId"
          :style="popoverRef?.anchorStyle"
        />

        <KdsPopover
          ref="popoverRef"
          v-model="isMenuOpen"
          role="menu"
          placement="bottom-left"
          popover-aria-label="Menu items"
        >
          <KdsMenuContainer
            :possible-values="args.possibleValues"
            @item-click="isMenuOpen = false"
          />
        </KdsPopover>
      `,
  }),
} satisfies Meta<typeof KdsMenuContainer>;

export default meta;

export const Default: Story = {};

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
};

export const NoEntries: Story = {
  args: {
    possibleValues: [],
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

// TextOverflow story is not applicable for KdsMenuContainer as it has no text content or visual prop variants

// DesignComparator story is not applicable for KdsMenuContainer as it has no visual prop variants and requires an activator element

// AllCombinations story is not applicable for KdsMenuContainer as it has no visual prop variants and requires an activator element
