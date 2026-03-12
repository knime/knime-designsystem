import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, userEvent, within } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import type { KdsListOption } from "../../forms/_helper/List/ListContainer";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";
import { kdsButtonSizes } from "../enums";

import KdsMenuButton from "./KdsMenuButton.vue";
import {
  kdsMenuButtonPlacements,
  kdsMenuButtonVariant,
  kdsMenuButtonVariants,
} from "./enums";

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
      options: kdsMenuButtonVariants,
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
    possibleValues: {
      control: "object",
      table: { category: "props" },
    },
    placement: {
      control: { type: "select" },
      options: kdsMenuButtonPlacements,
      table: { category: "props" },
    },
  },
  args: {
    label: "{Label}",
    possibleValues: baseOptions,
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
    possibleValues: baseOptions,
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
    possibleValues: baseOptions,
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
    possibleValues: baseOptions,
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
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsMenuButton,
  designsToCompare: {
    Types: {
      props: { label: "{Label}", possibleValues: baseOptions },
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
        kdsMenuButtonVariant.OUTLINED,
        kdsMenuButtonVariant.TRANSPARENT,
      ],
      disabled: [false, true],
      label: ["{label}"],
      leadingIcon: [undefined, "placeholder"],
      trailingIcon: [undefined, "placeholder"],
      possibleValues: [baseOptions],
      placement: ["bottom-left"],
    },
    {
      size: kdsButtonSizes,
      variant: [
        kdsMenuButtonVariant.OUTLINED,
        kdsMenuButtonVariant.TRANSPARENT,
      ],
      disabled: [false, true],
      leadingIcon: ["placeholder"],
      ariaLabel: ["Icon only button"],
      possibleValues: [baseOptions],
      placement: ["bottom-left"],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
