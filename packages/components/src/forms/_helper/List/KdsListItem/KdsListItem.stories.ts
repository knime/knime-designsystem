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
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35266",
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
    "Singleline, Unselected": {
      props: {
        id: "design-comparator-item",
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
        special: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35267":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35270":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35274":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35278":
          { disabled: true },
      },
    },
    "Singleline, Unselected (Special Content)": {
      props: {
        id: "design-comparator-item",
        label: "Label",
        selected: false,
        missing: false,
        disabled: false,
        special: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-27217":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-27225":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-27234":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-27243":
          { disabled: true },
      },
    },
    "Singleline, Selected": {
      props: {
        id: "design-comparator-item",
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: true,
        missing: false,
        disabled: false,
        special: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35282":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35286":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35290":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Singleline, Unknown Columns Unselected": {
      props: {
        id: "design-comparator-item",
        label: "Unknown columns",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
        special: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-27087":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-31963":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5192-31975":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Singleline, Unknown Columns Selected": {
      props: {
        id: "design-comparator-item",
        label: "Unknown columns",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: true,
        missing: false,
        disabled: false,
        special: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5950-25418":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5951-28656":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5951-28670":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Singleline, Missing": {
      props: {
        id: "design-comparator-item",
        label: "Label",
        accessory: { type: "dataType", name: "unknown-datatype" },
        selected: false,
        missing: true,
        disabled: false,
        special: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35294":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35298":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-35302":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Singleline, Missing (Special Content)": {
      props: {
        id: "design-comparator-item",
        label: "Label",
        selected: false,
        missing: true,
        disabled: false,
        special: true,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-28198":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-28209":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4711-28220":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Singleline, Overflow": {
      props: {
        id: "design-comparator-item",
        label: "Label that is very very very long and needs space",
        selected: false,
        missing: false,
        disabled: false,
        special: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=16020-80680":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15989-20450":
          { accessory: dataTypeAccessory },
      },
    },
    "Multiline, Default": {
      props: {
        id: "design-comparator-item",
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
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-26970":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-26978":
          { disabled: true },
      },
    },
    "Multiline, Selected": {
      props: {
        id: "design-comparator-item",
        label: "Label",
        subText: "Here is a description that can be maximum 2 lines long",
        accessory: { type: "avatar", initials: "FV" },
        selected: true,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-26986":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-26993":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-27000":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Multiline, Missing": {
      props: {
        id: "design-comparator-item",
        label: "Label",
        subText: "Here is a description that can be maximum 2 lines long",
        accessory: { type: "avatar", initials: "FV" },
        selected: false,
        missing: true,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=16020-80764":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=16020-80755":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=16020-80746":
          { parameters: { pseudo: { active: true } } },
      },
    },
    "Multiline, Overflow": {
      props: {
        id: "design-comparator-item",
        label: "Title that is super very long and needs much space more",
        subText:
          "Here is a description that can be maximum 2 lines long and if its longer than it gets truncated to not break the layout, so keep it short",
        accessory: { type: "avatar", initials: "FV" },
        selected: false,
        missing: false,
        disabled: false,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15989-67742":
          {},
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListItem,
  combinationsProps: [
    {
      selected: [false, true],
      label: ["Label"],
      subText: [
        undefined,
        "Subtext that is long enough to overflow and should be clamped to two lines in the UI to prevent the row height from expanding.",
      ],
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
      selected: [false],
      label: ["Label"],
      subText: [
        undefined,
        "Subtext that is long enough to overflow and should be clamped to two lines in the UI to prevent the row height from expanding.",
      ],
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
