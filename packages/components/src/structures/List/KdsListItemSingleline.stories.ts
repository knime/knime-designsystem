import type { Meta, StoryObj } from "@storybook/vue3-vite";

import type { KdsAccessory } from "../../accessories";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsListItemSingleline from "./KdsListItemSingleline.vue";

const iconAccessory: KdsAccessory = {
  type: "icon",
  name: "text",
};

const dataTypeAccessory: KdsAccessory = {
  type: "dataType",
  name: "string-datatype",
};

const colorSwatchAccessory: KdsAccessory = {
  type: "colorSwatch",
  color: "#dc3545",
  title: "Danger",
};

const avatarAccessory: KdsAccessory = {
  type: "avatar",
  initials: "AB",
  title: "Alice Brown",
};

const meta: Meta<typeof KdsListItemSingleline> = {
  component: KdsListItemSingleline,
  title: "Structures/KdsListItemSingleline",
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
    label: {
      control: "text",
      description: "Text shown in the list item.",
      table: { category: "Props" },
    },
    accessory: {
      control: "object",
      description:
        "Optional leading accessory (icon, data type, color swatch, or avatar).",
      table: { category: "Props" },
    },
    specialContent: {
      control: "boolean",
      description:
        "Applies 'special content' styling (used when the content is not a standard data field).",
      table: { category: "Props" },
    },
    selected: {
      control: "boolean",
      description: "Applies selected styling.",
      table: { category: "Props" },
    },
    missing: {
      control: "boolean",
      description: "Applies missing/error styling and prepends '(Missing)'.",
      table: { category: "Props" },
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction and dims the content.",
      table: { category: "Props" },
    },
  },
  args: {
    label: "Label",
    accessory: undefined,
    selected: false,
    missing: false,
    disabled: false,
    specialContent: false,
  },
};

export default meta;

type Story = StoryObj<typeof KdsListItemSingleline>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Missing: Story = {
  args: {
    missing: true,
  },
};

export const SpecialContent: Story = {
  args: {
    specialContent: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
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
    specialContent: false,
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsListItemSingleline,
  wrapperStyle: { width: "241px" },
  designsToCompare: {
    "Text/Columns, Unselected": {
      props: {
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
        specialContent: false,
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
        label: "Label",
        selected: false,
        missing: false,
        disabled: false,
        specialContent: true,
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
        label: "Label",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: true,
        missing: false,
        disabled: false,
        specialContent: false,
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
        label: "Unknown columns",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: false,
        missing: false,
        disabled: false,
        specialContent: true,
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
        label: "Unknown columns",
        accessory: { type: "dataType", name: "string-datatype" },
        selected: true,
        missing: false,
        disabled: false,
        specialContent: true,
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
        label: "Label",
        accessory: { type: "dataType", name: "unknown-datatype" },
        selected: false,
        missing: true,
        disabled: false,
        specialContent: false,
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
        label: "Label",
        selected: false,
        missing: true,
        disabled: false,
        specialContent: true,
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
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListItemSingleline,
  combinationsProps: [
    {
      label: ["Label"],
      accessory: [
        undefined,
        iconAccessory,
        dataTypeAccessory,
        colorSwatchAccessory,
        avatarAccessory,
      ],
      specialContent: [false, true],
      selected: [false, true],
      missing: [false],
      disabled: [false, true],
    },
    {
      label: ["Label"],
      accessory: [
        undefined,
        iconAccessory,
        dataTypeAccessory,
        colorSwatchAccessory,
        avatarAccessory,
      ],
      specialContent: [false, true],
      selected: [false],
      missing: [true],
      disabled: [false, true],
    },
  ],
  pseudoStates: ["hover", "active"],
});
