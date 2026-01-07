import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsLoadingSpinner from "./KdsLoadingSpinner.vue";

const meta: Meta<typeof KdsLoadingSpinner> = {
  title: "Components/KdsLoadingSpinner",
  component: KdsLoadingSpinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xsmall", "small", "medium", "large"],
    },
    style: {
      control: { type: "select" },
      options: ["onTransparent", "onFilled"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof KdsLoadingSpinner>;

export const DataTypeStory: Story = {
  args: {
    size: "medium",
    style: "onTransparent",
  },
};
