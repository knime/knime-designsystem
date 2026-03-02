import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsMenuItem from "./KdsMenuItem.vue";
import { kdsMenuItemSizes } from "./types";

const meta: Meta<typeof KdsMenuItem> = {
  component: KdsMenuItem,
  title: "Components/structures/KdsMenuItem",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use `KdsMenuItem` to display selectable entries inside menu containers. It supports an optional leading accessory, optional shortcut text, and an optional trailing icon.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-96781&m=dev",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: kdsMenuItemSizes,
      description: "Controls padding, gap, and typography size.",
      table: { category: "Props" },
    },
    title: {
      control: "text",
      description: "Main label text of the menu item.",
      table: { category: "Props" },
    },
    subtext: {
      control: "text",
      description: "Optional subtext shown below the title.",
      table: { category: "Props" },
    },
    leadingAccessory: {
      control: "select",
      options: [undefined, ...iconNames],
      description: "Optional leading accessory icon.",
      table: { category: "Props" },
    },
    shortcut: {
      control: "text",
      description: "Optional shortcut text displayed on the trailing side.",
      table: { category: "Props" },
    },
    trailingIcon: {
      control: "select",
      options: [undefined, ...iconNames],
      description: "Optional trailing icon displayed after the shortcut.",
      table: { category: "Props" },
    },
    selected: {
      control: "boolean",
      description: "Applies selected styling to the menu item.",
      table: { category: "Props" },
    },
    disabled: {
      control: "boolean",
      description: "Disables interaction and dims the content.",
      table: { category: "Props" },
    },
  },
  args: {
    size: "small",
    title: "Label",
    subtext: "",
    leadingAccessory: undefined,
    shortcut: undefined,
    trailingIcon: undefined,
    selected: false,
    active: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof KdsMenuItem>;

export const Default: Story = {};

export const WittAccessory: Story = {
  args: {
    leadingAccessory: "placeholder",
  },
};

export const WithSubtext: Story = {
  args: {
    subtext: "{Subtext}",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: "chevron-right",
  },
};

export const WithShortcut: Story = {
  args: {
    shortcut: "Ctrl + 1",
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    trailingIcon: "checkmark",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsMenuItem,
    width: 140,
  }),
  args: {
    size: "small",
    title: "Label with a very long name that should truncate",
    subtext: "{Subtext} with extra long content to verify truncation",
    selected: true,
    leadingAccessory: "placeholder",
    shortcut: "Ctrl + Shift + Alt + 1",
    trailingIcon: "chevron-right",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsMenuItem,
  wrapperStyle: { width: "200px" },
  designsToCompare: {
    "Small, no subtext": {
      props: {
        size: "small",
        title: "Label",
        leadingAccessory: "placeholder",
        shortcut: "Ctrl + 1",
        trailingIcon: "chevron-right",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-91937":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-91948":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-91960":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4703-91972":
          { disabled: true },
      },
    },
    "Small, with subtext": {
      props: {
        size: "small",
        title: "Label",
        subtext: "{Subtext}",
        leadingAccessory: "placeholder",
        shortcut: "Ctrl + 1",
        trailingIcon: "chevron-right",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6047-564430":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6047-564793":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6047-564825":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6047-564842":
          { disabled: true },
      },
    },
    "Medium, no subtext": {
      props: {
        size: "medium",
        title: "Label",
        leadingAccessory: "placeholder",
        shortcut: "Ctrl + 1",
        trailingIcon: "chevron-right",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8980-337432":
          {},
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8980-337442":
          { parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8980-337452":
          { parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8980-337462":
          { disabled: true },
      },
    },
    "Small, no subtext (selected)": {
      props: {
        size: "small",
        title: "Label",
        selected: true,
        leadingAccessory: "placeholder",
        shortcut: undefined,
        trailingIcon: undefined,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3499-84688":
          { selected: true },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3499-84725":
          { selected: true, parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3499-84762":
          { selected: true, parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=4962-29599":
          { selected: true, disabled: true },
      },
    },
    "Small, with subtext (selected)": {
      props: {
        size: "small",
        title: "Label",
        subtext: "{Subtext}",
        selected: true,
        leadingAccessory: "placeholder",
        shortcut: undefined,
        trailingIcon: undefined,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6047-564858":
          { selected: true },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6047-564933":
          { selected: true, parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6047-564970":
          { selected: true, parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6047-565007":
          { selected: true, disabled: true },
      },
    },
    "Medium, no subtext (selected)": {
      props: {
        size: "medium",
        title: "Label",
        selected: true,
        leadingAccessory: "placeholder",
        shortcut: undefined,
        trailingIcon: undefined,
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8980-337471":
          { selected: true },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8980-337479":
          { selected: true, parameters: { pseudo: { hover: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8980-337487":
          { selected: true, parameters: { pseudo: { active: true } } },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8980-337495":
          { selected: true, disabled: true },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  component: KdsMenuItem,
  combinationsProps: [
    {
      size: ["small", "medium"],
      title: ["Label"],
      subtext: [undefined, "{Subtext}"],
      selected: [false, true],
      leadingAccessory: [undefined, "placeholder"],
      shortcut: [undefined, "Ctrl + 1"],
      trailingIcon: [undefined, "chevron-right"],
      disabled: [false, true],
      active: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
