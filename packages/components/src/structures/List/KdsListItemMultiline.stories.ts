import type { Meta, StoryObj } from "@storybook/vue3-vite";

import type { KdsAccessory } from "../../accessories";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsListItemMultiline from "./KdsListItemMultiline.vue";

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
  title: "Avatar",
};

const meta: Meta<typeof KdsListItemMultiline> = {
  component: KdsListItemMultiline,
  title: "Structures/KdsListItemMultiline",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsListItemMultiline` to display a clickable list row with an optional leading avatar, a single-line title, and a two-line subtitle. It supports selected and missing states.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-26950&p=f",
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Single-line title shown in the list item.",
      table: { category: "Props" },
    },
    subtitle: {
      control: "text",
      description: "Two-line subtitle shown below the title.",
      table: { category: "Props" },
    },
    accessory: {
      control: "object",
      description:
        "Optional leading accessory (icon, data type, color swatch, or avatar).",
      table: { category: "Props" },
    },
    selected: {
      control: "boolean",
      description: "Applies selected styling and shows a checkmark.",
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
    title: "Title",
    subtitle: "Subtitle",
    accessory: avatarAccessory,
    selected: false,
    missing: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof KdsListItemMultiline>;

export const Default: Story = {};

export const WithoutAccessory: Story = {
  args: {
    accessory: undefined,
  },
};

export const AccessoryAvatar: Story = {
  args: {
    accessory: avatarAccessory,
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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsListItemMultiline,
    width: 240,
  }),
  args: {
    title:
      "This is a very long title that should overflow with an ellipsis when there is not enough space",
    subtitle:
      "This is a longer subtitle that should be clamped to two lines. Additional content beyond two lines must be cut off to keep the row height stable.",
    accessory: avatarAccessory,
    disabled: false,
  },
};

export const DesignComparator: Story = {
  ...buildDesignComparatorStory({
    component: KdsListItemMultiline,
    wrapperStyle: { width: "316px" },
    designsToCompare: {
      Default: {
        props: {
          title: "Title",
          subtitle: "Here is a description that can be maximum 2 lines long",
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
      Selected: {
        props: {
          title: "Title",
          subtitle: "Here is a description that can be maximum 2 lines long",
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
      Missing: {
        props: {
          title: "Title",
          subtitle: "Here is a description that can be maximum 2 lines long",
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
    },
  }),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListItemMultiline,
  combinationsProps: [
    {
      title: ["Title"],
      subtitle: [
        "Subtitle",
        "Subtitle that is long enough to overflow and should be clamped to two lines in the UI to prevent the row height from expanding.",
      ],
      accessory: [
        undefined,
        iconAccessory,
        dataTypeAccessory,
        colorSwatchAccessory,
        avatarAccessory,
      ],
      selected: [false, true],
      missing: [false],
      disabled: [false, true],
    },
    {
      title: ["Title"],
      subtitle: [
        "Subtitle",
        "Subtitle that is long enough to overflow and should be clamped to two lines in the UI to prevent the row height from expanding.",
      ],
      accessory: [
        undefined,
        iconAccessory,
        dataTypeAccessory,
        colorSwatchAccessory,
        avatarAccessory,
      ],
      selected: [false],
      missing: [true],
      disabled: [false, true],
    },
  ],
  pseudoStates: ["hover", "active"],
});
