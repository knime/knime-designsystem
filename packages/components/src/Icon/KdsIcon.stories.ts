import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsIcon from "./KdsIcon.vue";
import { kdsIconNames, kdsIconSizes } from "./constants";

const meta: Meta<typeof KdsIcon> = {
  title: "Components/KdsIcon",
  component: KdsIcon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays an icon from the KDS icon set. The icon color inherits the text color of the parent element.",
      },
    },
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: kdsIconNames,
    },
    size: {
      control: { type: "select" },
      options: kdsIconSizes,
    },
  },
};
export default meta;

type Story = StoryObj<typeof KdsIcon>;

export const IconStory: Story = {
  args: {
    name: "placeholder",
    size: "medium",
  },
};
