import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import BaseModal from "./BaseModal.vue";

const meta: Meta<typeof BaseModal> = {
  title: "Components/Modal/BaseModal",
  component: BaseModal,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6220-89388",
    },
  },
  argTypes: {
    icon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
    },
  },
  args: {
    onCancel: fn(),
    onConfirm: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof BaseModal>;

export const BaseModalStory: Story = {
  args: {
    icon: "info",
    title: "Are you sure?",
    content: "Do you really want to delete everything?",
  },
};
