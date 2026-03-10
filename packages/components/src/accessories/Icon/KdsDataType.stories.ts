import type { Meta, StoryObj } from "@storybook/vue3-vite";

import {
  buildAllCombinationsStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";

import KdsDataType from "./KdsDataType.vue";
import { kdsDataTypeSizes, kdsTypeIconNames } from "./enums";

const meta: Meta<typeof KdsDataType> = {
  title: "Accessories/DataType",
  component: KdsDataType,
  tags: ["autodocs"],
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

export const TextOverflow: Story = {
  ...buildTextOverflowStory({ component: KdsDataType }),
  args: {
    iconName: "string-datatype",
    iconTitle: "A very long data type title that should overflow",
    size: "medium",
    disabled: false,
  },
};

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
