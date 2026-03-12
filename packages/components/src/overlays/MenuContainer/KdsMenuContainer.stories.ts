import { ref, useTemplateRef } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsToggleButton from "../../buttons/KdsToggleButton/KdsToggleButton.vue";
import KdsPopover from "../Popover/KdsPopover.vue";

import KdsMenuContainer from "./KdsMenuContainer.vue";
import type { KdsMenuItem } from "./types";

type Story = StoryObj<typeof KdsMenuContainer>;

function options(
  length: number,
  generator: (idx: number) => Partial<KdsMenuItem>,
): KdsMenuItem[] {
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
    items: {
      control: "object",
      table: { category: "props" },
    },
  },
  args: {
    items: baseOptions,
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
            :items="args.items"
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
    items: [
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
    items: [],
  },
};

export const WithAccessories: Story = {
  args: {
    items: [
      {
        id: "1",
        text: "Icon option",
        accessory: { type: "icon", name: "placeholder" },
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
