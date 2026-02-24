import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsListItemSingleline from "./KdsListItemSingleline.vue";
import {
  avatarAccessory,
  colorSwatchAccessory,
  dataTypeAccessory,
  demoAccessories,
  iconAccessory,
  liveStatusAccessory,
} from "./demo-accessories";

const meta: Meta<typeof KdsListItemSingleline> = {
  component: KdsListItemSingleline,
  title: "Form fields/ListContainer/ListItemSingleline",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsListItemSingleline` to display a single-line, clickable list row with optional selected/missing styling.",
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
    accessory: {
      control: "select",
      options: Object.keys(demoAccessories),
      mapping: demoAccessories,
      description:
        "Optional leading accessory (icon, data type, color swatch, or avatar).",
      table: { category: "props" },
    },
    special: {
      control: "boolean",
      description:
        "Applies 'special content' styling (used when the content is not a standard data field).",
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
    accessory: undefined,
    selected: false,
    active: false,
    missing: false,
    disabled: false,
    special: false,
  },
};

export default meta;

type Story = StoryObj<typeof KdsListItemSingleline>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-selected", "false");
    await expect(option).not.toHaveAttribute("aria-disabled", "true");
    await expect(canvas.getByText("Label")).toBeInTheDocument();
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
  },
};

export const Active: Story = {
  args: {
    active: true,
  },
};

export const Missing: Story = {
  args: {
    missing: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("(Missing)")).toBeInTheDocument();
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-disabled", "true");
  },
};

export const AccessoryIcon: Story = {
  args: {
    accessory: iconAccessory,
  },
};

export const AccessoryDataType: Story = {
  args: {
    accessory: dataTypeAccessory,
  },
};

export const AccessoryColorSwatch: Story = {
  args: {
    accessory: colorSwatchAccessory,
  },
};

export const AccessoryAvatar: Story = {
  args: {
    accessory: avatarAccessory,
  },
};

export const AccessoryLiveStatus: Story = {
  args: {
    accessory: liveStatusAccessory,
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsListItemSingleline,
    width: 200,
  }),
  args: {
    label:
      "This is a very long single line list item label that should overflow with an ellipsis when there is not enough space",
    accessory: iconAccessory,
    selected: false,
    missing: false,
    disabled: false,
    special: false,
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsListItemSingleline,
  wrapperStyle: { width: "241px" },
  designsToCompare: {
    "Text/Columns, Unselected": {
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
    "Text/Columns, Unselected (Special Content)": {
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
    "Text/Columns, Selected": {
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
    "Unknown Columns, Unselected": {
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
    "Unknown Columns, Selected": {
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
    "Text/Columns, Missing": {
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
    "Text/Columns, Missing (Special Content)": {
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
    Overflow: {
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
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListItemSingleline,
  combinationsProps: [
    {
      id: ["combo-item"],
      selected: [false, true],
      label: ["Label"],
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
      id: ["combo-item"],
      selected: [false],
      label: ["Label"],
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
  pseudoStates: ["hover", "active"],
});
