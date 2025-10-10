import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import Icon from "./Icon.vue";
import { iconSizes } from "./types";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
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
      options: iconNames,
    },
    size: {
      control: { type: "select" },
      options: iconSizes,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const IconStory: Story = {
  args: {
    name: "placeholder",
    size: "medium",
  },
};
