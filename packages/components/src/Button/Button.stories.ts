import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import MyButton from "./Button.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<typeof MyButton> = {
  title: "Components/Button",
  component: MyButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["x-small", "small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "transparent"],
    },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames], // eslint-disable-line no-undefined
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames], // eslint-disable-line no-undefined
    },
    disabled: { control: "boolean" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
};
export default meta;

type Story = StoryObj<typeof MyButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Filled: Story = {
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=345-19622",
    },
  },
  args: {
    variant: "filled",
    label: "Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
