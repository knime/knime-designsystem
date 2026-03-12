import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import type { KdsMenuItem } from "../../overlays/MenuContainer";
import { kdsPopoverPlacements } from "../../overlays/Popover";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";
import {
  kdsToggleButtonVariant,
  kdsToggleButtonVariants,
} from "../KdsToggleButton";
import { kdsButtonSizes } from "../enums";

import KdsMenuButton from "./KdsMenuButton.vue";

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

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsMenuButton> = {
  title: "Buttons/MenuButton",
  component: KdsMenuButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays a menu to the user — such as a set of actions or functions — triggered by a button. " +
          "It is a combination of a KdsToggleButton with a KdsMenuContainer",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=19388-198105`,
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: kdsButtonSizes,
      table: { category: "props" },
    },
    variant: {
      control: { type: "select" },
      options: kdsToggleButtonVariants,
      table: { category: "props" },
    },
    disabled: { control: "boolean", table: { category: "props" } },
    label: { control: "text", table: { category: "props" } },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "props" },
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "props" },
    },
    ariaLabel: { control: "text", table: { category: "props" } },
    title: { control: "text", table: { category: "props" } },
    items: {
      control: "object",
      table: { category: "props" },
    },
    placement: {
      control: { type: "select" },
      options: kdsPopoverPlacements,
      table: { category: "props" },
    },
  },
  args: {
    label: "{Label}",
    items: baseOptions,
  },
};
export default meta;

type Story = StoryObj<typeof KdsMenuButton>;

export const Outlined: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "outlined",
    label: "Toggle menu",
    items: baseOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button");

    // Mouse interaction: click to open and close the menu
    await userEvent.click(toggleButton);
    const menu = await canvas.findByRole("menu");
    await expect(menu).toBeVisible();
    await userEvent.click(toggleButton);
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument();

    // Keyboard interaction: tab to the button, open menu, navigate and select
    toggleButton.blur();
    await userEvent.tab();
    await expect(toggleButton).toHaveFocus();
    await userEvent.keyboard("[Enter]");
    const keyboardMenu = await canvas.findByRole("menu");
    await expect(keyboardMenu).toBeVisible();
    await userEvent.keyboard("[ArrowDown]");
    await userEvent.keyboard("[Enter]");
    await expect(canvas.queryByRole("menu")).not.toBeInTheDocument();
  },
};

export const Transparent: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "transparent",
    label: "Toggle menu",
    items: baseOptions,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "outlined",
    label: "Toggle menu",
    disabled: true,
    items: baseOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button");

    await userEvent.click(toggleButton);

    const menu = canvas.queryByRole("menu");
    await expect(menu).not.toBeInTheDocument();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsMenuButton,
    width: 120,
  }),
  args: {
    label:
      "A very long text that gives comprehensive information about the menu",
    items: [
      {
        id: "long",
        text: "A very very very very very long option label that should overflow",
        accessory: { type: "icon", name: "placeholder" },
      },
      {
        id: "short",
        text: "Short",
      },
    ],
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsMenuButton,
  designsToCompare: {
    Types: {
      props: { label: "{Label}", items: baseOptions },
      variants: {
        [`${figmaBaseUrl}?node-id=19388-216947`]: { variant: "outlined" },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsMenuButton,
  combinationsProps: [
    {
      size: kdsButtonSizes,
      variant: [
        kdsToggleButtonVariant.OUTLINED,
        kdsToggleButtonVariant.TRANSPARENT,
      ],
      disabled: [false, true],
      label: ["{label}"],
      leadingIcon: [undefined, "placeholder"],
      trailingIcon: [undefined, "placeholder"],
      items: [baseOptions],
      placement: ["bottom-left"],
    },
    {
      size: kdsButtonSizes,
      variant: [
        kdsToggleButtonVariant.OUTLINED,
        kdsToggleButtonVariant.TRANSPARENT,
      ],
      disabled: [false, true],
      leadingIcon: ["placeholder"],
      ariaLabel: ["Icon only button"],
      items: [baseOptions],
      placement: ["bottom-left"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
