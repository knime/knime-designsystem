import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsDataType from "./KdsDataType.vue";
import { kdsTypeIconNames } from "./constants";

const meta: Meta<typeof KdsDataType> = {
  title: "Components/KdsDataType",
  component: KdsDataType,
  tags: ["autodocs"],
  argTypes: {
    iconName: {
      control: { type: "select" },
      options: kdsTypeIconNames,
    },
    iconTitle: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
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
  },
};
