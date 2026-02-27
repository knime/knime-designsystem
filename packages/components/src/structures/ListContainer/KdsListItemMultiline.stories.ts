import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, within } from "storybook/test";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook.ts";

import KdsListItemMultiline from "./KdsListItemMultiline.vue";
import {
  avatarAccessory,
  colorSwatchAccessory,
  dataTypeAccessory,
  demoAccessories,
  iconAccessory,
  liveStatusAccessory,
} from "./demo-accessories";

const meta: Meta<typeof KdsListItemMultiline> = {
  component: KdsListItemMultiline,
  title: "Form fields/ListContainer/ListItemMultiline",
  tags: ["autodocs"],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<ul role="listbox" style="list-style: none; padding: 0; margin: 0;"><story /></ul>',
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsListItemMultiline` to display a clickable list row with an optional leading avatar, a single-line title, and a two-line subtext. It supports selected and missing states.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=15397-26950",
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
      description: "Single-line label shown in the list item.",
      table: { category: "props" },
    },
    subText: {
      control: "text",
      description: "Two-line subtext shown below the label.",
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
    selected: {
      control: "boolean",
      description: "Applies selected styling and shows a checkmark.",
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
    id: "multiline-item",
    label: "Label",
    subText: "Subtext",
    accessory: undefined,
    selected: false,
    active: false,
    missing: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof KdsListItemMultiline>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole("option");

    await expect(option).toHaveAttribute("aria-selected", "false");
    await expect(option).not.toHaveAttribute("aria-disabled", "true");
    await expect(canvas.getByText("Label")).toBeInTheDocument();
    await expect(canvas.getByText("Subtext")).toBeInTheDocument();
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

export const AccessoryLiveStatus: Story = {
  args: {
    accessory: liveStatusAccessory,
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

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsListItemMultiline,
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

export const DesignComparator: Story = {
  ...buildDesignComparatorStory({
    component: KdsListItemMultiline,
    wrapperStyle: { width: "316px" },
    designsToCompare: {
      Default: {
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
      Selected: {
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
      Missing: {
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
      Overflow: {
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
  }),
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsListItemMultiline,
  combinationsProps: [
    {
      id: ["combo-item"],
      selected: [false, true],
      label: ["Label"],
      subText: [
        "Subtext",
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
      missing: [false],
      disabled: [false, true],
      active: [false, true],
    },
    {
      id: ["combo-item"],
      selected: [false],
      label: ["Label"],
      subText: [
        "Subtext",
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
      missing: [true],
      disabled: [false, true],
      active: [false, true],
    },
  ],
  pseudoStates: ["hover", "active"],
});
