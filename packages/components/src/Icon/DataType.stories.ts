import type { Meta, StoryObj } from "@storybook/vue3-vite";

import DataType from "./DataType.vue";
import { typeIconNames } from "./constants";

const meta: Meta<typeof DataType> = {
  title: "Components/DataType",
  component: DataType,
  tags: ["autodocs"],
  argTypes: {
    iconName: {
      control: { type: "select" },
      options: typeIconNames,
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

type Story = StoryObj<typeof DataType>;

export const DataTypeStory: Story = {
  args: {
    iconName: "string-datatype",
    iconTitle: "String",
    size: "medium",
  },
};
