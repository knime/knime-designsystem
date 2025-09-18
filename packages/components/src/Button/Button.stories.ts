import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { sizes } from "../constants";

import { variants } from "./Button.types";
import MyButton from "./Button.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<typeof MyButton> = {
  title: "Components/Button",
  component: MyButton,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: sizes,
    },
    variant: {
      control: { type: "select" },
      options: variants,
    },
    destructive: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames], // eslint-disable-line no-undefined
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames], // eslint-disable-line no-undefined
    },
    icon: {
      control: { type: "select" },
      options: [undefined, ...iconNames], // eslint-disable-line no-undefined
    },
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

export const XSmall: Story = {
  args: {
    size: "xsmall",
    label: "Button",
  },
};

export const LeadingIcon: Story = {
  args: {
    label: "Button",
    variant: "outlined",
    leadingIcon: "ai-general",
  },
};

export const TrailingIcon: Story = {
  args: {
    label: "Button",
    variant: "outlined",
    trailingIcon: "ai-general",
  },
};

export const LeadingAndTrailingIcon: Story = {
  args: {
    label: "Button",
    variant: "outlined",
    leadingIcon: "ai-general",
    trailingIcon: "ai-general",
  },
};

export const IconOnly: Story = {
  args: {
    variant: "outlined",
    icon: "ai-general",
  },
};
