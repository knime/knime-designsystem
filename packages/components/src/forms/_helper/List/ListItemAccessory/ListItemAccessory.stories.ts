import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../../../test-utils/storybook";

import ListItemAccessory from "./ListItemAccessory.vue";
import { kdsListItemAccessorySizes } from "./enums";
import type { KdsListItemAccessory } from "./types";

type Story = StoryObj<typeof ListItemAccessory>;

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const iconAccessory: KdsListItemAccessory = {
  type: "icon",
  name: "placeholder",
};

const dataTypeAccessory: KdsListItemAccessory = {
  type: "dataType",
  name: "string-datatype",
};

const colorSwatchAccessory: KdsListItemAccessory = {
  type: "colorSwatch",
  color: "#ffffff",
  title: "White",
};

const avatarAccessory: KdsListItemAccessory = {
  type: "avatar",
  initials: "FV",
  title: "FV Avatar",
};

const liveStatusAccessory: KdsListItemAccessory = {
  type: "liveStatus",
  status: "green",
  title: "Green",
};

const accessoryOptions: Record<string, KdsListItemAccessory> = {
  Icon: iconAccessory,
  DataType: dataTypeAccessory,
  ColorSwatch: colorSwatchAccessory,
  Avatar: avatarAccessory,
  LiveStatus: liveStatusAccessory,
};

const meta: Meta<typeof ListItemAccessory> = {
  component: ListItemAccessory,
  title: "Form Fields/_Helper/ListItem/Accessory",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Internal helper that renders the leading accessory of a `KdsListItem`. " +
          "Delegates to `KdsIcon`, `KdsDataType`, `KdsColorSwatch`, `KdsAvatar`, or `KdsLiveStatus` " +
          "depending on the `accessory.type`.",
      },
    },
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=11972-120894`,
    },
  },
  argTypes: {
    accessory: {
      control: "select",
      options: Object.keys(accessoryOptions),
      mapping: accessoryOptions,
      description:
        "The accessory descriptor (icon, data type, color swatch, avatar, or live status).",
      table: { category: "props" },
    },
    size: {
      control: "select",
      options: kdsListItemAccessorySizes,
      description: "Size of the accessory.",
      table: { category: "props" },
    },
  },
  args: {
    accessory: iconAccessory,
    size: "medium",
  },
};

export default meta;

export const Default: Story = {};

// There is no Text so TextOverflow story does not make sense here.

export const DesignComparator: Story = buildDesignComparatorStory({
  component: ListItemAccessory,
  designsToCompare: {
    Icon: {
      props: { accessory: iconAccessory },
      variants: {
        [`${figmaBaseUrl}?node-id=11972-120895`]: { size: "large" },
        [`${figmaBaseUrl}?node-id=15624-74885`]: { size: "medium" },
        [`${figmaBaseUrl}?node-id=15624-61003`]: { size: "small" },
      },
    },
    "Data Type": {
      props: { accessory: dataTypeAccessory },
      variants: {
        [`${figmaBaseUrl}?node-id=11972-120897`]: { size: "large" },
        [`${figmaBaseUrl}?node-id=15624-74887`]: { size: "medium" },
        [`${figmaBaseUrl}?node-id=15624-44962`]: { size: "small" },
      },
    },
    "Color Swatch": {
      props: { accessory: colorSwatchAccessory },
      variants: {
        [`${figmaBaseUrl}?node-id=11972-120899`]: { size: "large" },
        [`${figmaBaseUrl}?node-id=15624-74889`]: { size: "medium" },
        [`${figmaBaseUrl}?node-id=15624-44964`]: { size: "small" },
      },
    },
    Avatar: {
      props: { accessory: avatarAccessory },
      variants: {
        [`${figmaBaseUrl}?node-id=11972-120901`]: { size: "large" },
        [`${figmaBaseUrl}?node-id=16542-78166`]: { size: "medium" },
        [`${figmaBaseUrl}?node-id=16542-84323`]: { size: "small" },
      },
    },
    "Live Status": {
      props: { accessory: liveStatusAccessory },
      variants: {
        [`${figmaBaseUrl}?node-id=16542-98042`]: { size: "large" },
        [`${figmaBaseUrl}?node-id=16542-98096`]: { size: "medium" },
        [`${figmaBaseUrl}?node-id=16542-98109`]: { size: "small" },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: ListItemAccessory,
  combinationsProps: [
    {
      accessory: [
        iconAccessory,
        dataTypeAccessory,
        colorSwatchAccessory,
        avatarAccessory,
        liveStatusAccessory,
      ],
      size: kdsListItemAccessorySizes,
    },
  ],
});
