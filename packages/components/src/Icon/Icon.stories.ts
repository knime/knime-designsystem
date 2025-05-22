import type { Meta, StoryObj } from "@storybook/vue3";

import { iconNames } from "@knime/kds-styles/icons/def";

import Icon, { type IconSize } from "./Icon.vue";

const iconSizes: IconSize[] = ["x-small", "small", "medium", "large"];

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
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
