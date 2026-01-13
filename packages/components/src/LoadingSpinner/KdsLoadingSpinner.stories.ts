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
      options: ["onSurface", "onPrimary"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof KdsLoadingSpinner>;

export const Default: Story = {
  args: {
    size: "medium",
    style: "onSurface",
  },
};
