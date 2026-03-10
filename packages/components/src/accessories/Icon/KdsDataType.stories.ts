import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../../test-utils/storybook";

import KdsDataType from "./KdsDataType.vue";
import { kdsDataTypeSizes, kdsTypeIconNames } from "./enums";

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

const meta: Meta<typeof KdsDataType> = {
  title: "Accessories/DataType",
  component: KdsDataType,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: `${figmaBaseUrl}?node-id=2356-23324`,
    },
  },
  argTypes: {
    iconName: {
      control: { type: "select" },
      options: kdsTypeIconNames,
      table: { category: "props" },
    },
    iconTitle: {
      control: { type: "text" },
      table: { category: "props" },
    },
    size: {
      control: { type: "select" },
      options: kdsDataTypeSizes,
      table: { category: "props" },
    },
    disabled: {
      control: "boolean",
      table: { category: "props" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof KdsDataType>;

export const DataTypeStory: Story = {
  args: {
    iconName: "string-datatype",
    iconTitle: "String",
    size: "medium",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    iconName: "string-datatype",
    iconTitle: "String",
    size: "medium",
    disabled: true,
  },
};

// TextOverflow story does not apply here

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsDataType,
  designsToCompare: {
    Enabled: {
      props: {
        iconName: "string-datatype",
        iconTitle: "String",
        disabled: false,
      },
      variants: {
        [`${figmaBaseUrl}?node-id=2356-23325`]: { size: "large" },
        [`${figmaBaseUrl}?node-id=2356-23329`]: { size: "medium" },
        [`${figmaBaseUrl}?node-id=2356-23333`]: { size: "small" },
      },
    },
    Disabled: {
      props: {
        iconName: "string-datatype",
        iconTitle: "String",
        disabled: true,
      },
      variants: {
        [`${figmaBaseUrl}?node-id=6417-63869`]: { size: "large" },
        [`${figmaBaseUrl}?node-id=6417-63867`]: { size: "medium" },
        [`${figmaBaseUrl}?node-id=6417-63865`]: { size: "small" },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsDataType,
  combinationsProps: [
    {
      iconName: ["string-datatype"],
      iconTitle: ["String"],
      size: kdsDataTypeSizes,
      disabled: [false, true],
    },
  ],
});
