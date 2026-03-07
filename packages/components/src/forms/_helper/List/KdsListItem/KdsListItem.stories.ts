import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../../../test-utils/storybook.ts";

import KdsListItem from "./KdsListItem.vue";
import {
  avatarAccessory,
  colorSwatchAccessory,
  dataTypeAccessory,
  demoAccessories,
  iconAccessory,
  liveStatusAccessory,
} from "./demo-accessories.ts";
import { kdsListItemVariants } from "./enums.ts";

const meta: Meta<typeof KdsListItem> = {
  component: KdsListItem,
  title: "Form Fields/_Helper/ListItem",
  tags: ["autodocs"],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<ul role="listbox" aria-label="Listbox" style="list-style: none; padding: 0; margin: 0;"><story /></ul>',
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsListItem` to display a clickable list row. When only `label` is provided it renders as a single-line item. When `subText` is also provided it renders as a multiline item with a bold title and a two-line subtext.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35265",
    },
  },
  argTypes: {
    id: {
      control: "text",
      description:
        "Unique identifier for the list item (also used as DOM id for aria-activedescendant patterns).",
      table: { category: "props" },
    },
    label: {
      control: "text",
      description: "Text shown in the list item.",
      table: { category: "props" },
    },
    subText: {
      control: "text",
      description:
        "Two-line subtext shown below the label. When provided, the item renders in multiline mode.",
      table: { category: "props" },
    },
    variant: {
      control: "select",
      options: kdsListItemVariants,
      description:
        "Visual size variant of the list item. Influences accessory/icon sizing, gaps and typography.",
      table: { category: "props" },
    },
    shortcut: {
      control: "text",
      description:
        "Optional shortcut text shown at the end of the row (e.g. 'Ctrl + 1'). Only shown when the item is not selected and not missing.",
      table: { category: "props" },
    },
    accessory: {
      control: "select",
      options: Object.keys(demoAccessories),
      mapping: demoAccessories,
      description:
        "Optional leading accessory (icon, data type, color swatch, avatar, or live status).",
      table: { category: "props" },
    },
    special: {
      control: "boolean",
      description:
        "Applies 'special content' styling (used when the content is not a standard data field). Only applies in singleline mode.",
      table: { category: "props" },
    },
    selected: {
      control: "boolean",
      description: "Applies selected styling.",
      table: { category: "props" },
    },
    active: {
      control: "boolean",
      description: "Highlights the item as the current keyboard-active option.",
      table: { category: "props" },
    },
    missing: {
      control: "boolean",
      description: "Applies missing/error styling and prepends '(Missing)'.",
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction and dims the content.",
      table: { category: "props" },
    },
  },
  args: {
    id: "list-item-1",
    label: "Label",
    subText: undefined,
    variant: "small",
    shortcut: undefined,
    accessory: undefined,
    selected: false,
    active: false,
    missing: false,
    disabled: false,
    special: false,
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof KdsListItem>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-selected", "false");
    await expect(option).not.toHaveAttribute("aria-disabled", "true");
    await expect(canvas.getByText("Label")).toBeInTheDocument();

    // No trailing icon in default state
    await expect(option.querySelectorAll(".kds-icon").length).toBe(0);

    // Click emits event
    await userEvent.click(option);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Multiline: Story = {
  args: {
    subText: "Subtext",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-selected", "false");
    await expect(option).not.toHaveAttribute("aria-disabled", "true");
    await expect(canvas.getByText("Label")).toBeInTheDocument();
    await expect(canvas.getByText("Subtext")).toBeInTheDocument();
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-selected", "true");

    // Exactly one trailing icon (checkmark) is rendered
    const icons = option.querySelectorAll(".kds-icon");
    await expect(icons.length).toBe(1);
    await expect(icons[0]).toBeInTheDocument();

    // No "(Missing)" prefix
    await expect(canvas.queryByText("(Missing)")).not.toBeInTheDocument();
  },
};

export const Active: Story = {
  args: {
    active: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(canvas.getByText("Label")).toBeInTheDocument();

    // No trailing icon in active-only state
    await expect(option.querySelectorAll(".kds-icon").length).toBe(0);
  },
};

export const Missing: Story = {
  args: {
    missing: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(canvas.getByText("(Missing)")).toBeInTheDocument();

    // Exactly one trailing icon (trash) is rendered
    const icons = option.querySelectorAll(".kds-icon");
    await expect(icons.length).toBe(1);
    await expect(icons[0]).toBeInTheDocument();
  },
};

export const SpecialContent: Story = {
  args: {
    special: true,
  },
};

export const Shortcut: Story = {
  args: {
    shortcut: "Ctrl + 1",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Ctrl + 1")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-list-item-trailing-item"),
    ).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-disabled", "true");

    // No trailing icons when disabled (not selected, not missing)
    await expect(option.querySelectorAll(".kds-icon").length).toBe(0);

    await userEvent.click(option);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const AccessoryIcon: Story = {
  args: {
    accessory: iconAccessory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Label")).toBeInTheDocument();
    // KdsIcon renders an svg with class kds-icon directly (no wrapper container)
    await expect(canvasElement.querySelector(".kds-icon")).toBeInTheDocument();
    // Verify no other accessory types are rendered
    await expect(
      canvasElement.querySelector(".kds-data-type-icon-container"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-color-swatch"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-avatar"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-live-status"),
    ).not.toBeInTheDocument();
  },
};

export const AccessoryDataType: Story = {
  args: {
    accessory: dataTypeAccessory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Label")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-data-type-icon-container"),
    ).toBeInTheDocument();
    // Verify no other accessory types are rendered
    await expect(
      canvasElement.querySelector(".kds-color-swatch"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-avatar"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-live-status"),
    ).not.toBeInTheDocument();
  },
};

export const AccessoryColorSwatch: Story = {
  args: {
    accessory: colorSwatchAccessory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Label")).toBeInTheDocument();
    await expect(
      canvas.getByRole("img", { name: "Danger" }),
    ).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-color-swatch"),
    ).toBeInTheDocument();
    // Verify no other accessory types are rendered
    await expect(
      canvasElement.querySelector(".kds-data-type-icon-container"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-avatar"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-live-status"),
    ).not.toBeInTheDocument();
  },
};

export const AccessoryAvatar: Story = {
  args: {
    accessory: avatarAccessory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Label")).toBeInTheDocument();
    await expect(
      canvas.getByRole("img", { name: "Avatar" }),
    ).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-avatar"),
    ).toBeInTheDocument();
    // Verify no other accessory types are rendered
    await expect(
      canvasElement.querySelector(".kds-color-swatch"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-data-type-icon-container"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-live-status"),
    ).not.toBeInTheDocument();
  },
};

export const AccessoryLiveStatus: Story = {
  args: {
    accessory: liveStatusAccessory,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Label")).toBeInTheDocument();
    await expect(
      canvas.getByRole("img", { name: "Running" }),
    ).toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-live-status"),
    ).toBeInTheDocument();
    // Verify no other accessory types are rendered
    await expect(
      canvasElement.querySelector(".kds-color-swatch"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-data-type-icon-container"),
    ).not.toBeInTheDocument();
    await expect(
      canvasElement.querySelector(".kds-avatar"),
    ).not.toBeInTheDocument();
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsListItem,
    width: 240,
  }),
  args: {
    label:
      "This is a very long label that should overflow with an ellipsis when there is not enough space",
    subText:
      "This is a longer subtext that should be clamped to two lines. Additional content beyond two lines must be cut off to keep the row height stable.",
    accessory: avatarAccessory,
    disabled: false,
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsListItem,
  wrapperStyle: { width: "316px" },
  designsToCompare: {
    "Variant, Small (Overview)": {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139128":
          {},
      },
    },
    "Variant, Large (Overview)": {
      props: {
        id: "design-comparator-item",
        variant: "large",
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-26950":
          {},
      },
    },
    "Small, Singleline": {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
        special: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139129":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139150":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139171":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139192":
          { disabled: true },
      },
    },
    "Small, Selected": {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: true,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139211":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139228":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139245":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Small, Missing": {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        accessory: { type: "dataType", name: "unknown-datatype" },
        selected: false,
        missing: true,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187599":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187616":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-187633":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Large, Singleline": {
      props: {
        id: "design-comparator-item",
        variant: "large",
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188099":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188091":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188083":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188076":
          { disabled: true },
      },
    },
    "Large, Selected": {
      props: {
        id: "design-comparator-item",
        variant: "large",
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: true,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188127":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188135":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188143":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Large, Missing": {
      props: {
        id: "design-comparator-item",
        variant: "large",
        label: "Label",
        accessory: { type: "dataType", name: "unknown-datatype" },
        selected: false,
        missing: true,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188223":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188233":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18047-188243":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Small, Multiline": {
      props: {
        id: "design-comparator-item",
        variant: "small",
        label: "Label",
        subText: "{Subtext}",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139139":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=18026-139160":
          { parameters: { pseudo: { hover: true } } },
      },
    },
    "Large, Multiline": {
      props: {
        id: "design-comparator-item",
        variant: "large",
        label: "Label",
        subText: "Here is a description that can be maximum 2 lines long",
        accessory: { type: "avatar", initials: "FV" },
        selected: false,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-19115":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-26962":
          { parameters: { pseudo: { hover: true } } },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListItem,
  combinationsProps: [
    {
      id: ["item"],
      variant: kdsListItemVariants,
      selected: [false, true],
      label: ["Label"],
      subText: [
        undefined,
        "Subtext that is long enough to overflow and should be clamped to two lines in the UI to prevent the row height from expanding.",
      ],
      shortcut: [undefined, "Ctrl + 1"],
      accessory: [
        undefined,
        iconAccessory,
        dataTypeAccessory,
        colorSwatchAccessory,
        avatarAccessory,
        liveStatusAccessory,
      ],
      special: [false, true],
      missing: [false],
      disabled: [false, true],
      active: [false, true],
    },
    {
      id: ["item"],
      variant: kdsListItemVariants,
      selected: [false],
      label: ["Label"],
      subText: [
        undefined,
        "Subtext that is long enough to overflow and should be clamped to two lines in the UI to prevent the row height from expanding.",
      ],
      shortcut: [undefined],
      accessory: [
        undefined,
        iconAccessory,
        dataTypeAccessory,
        colorSwatchAccessory,
        avatarAccessory,
        liveStatusAccessory,
      ],
      special: [false, true],
      missing: [true],
      disabled: [false, true],
      active: [false, true],
    },
  ],
  // focus does not apply — list items receive focus via aria-activedescendant on the parent listbox, not directly
  pseudoStates: ["hover", "active"],
});
