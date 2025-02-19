import type { Meta, StoryObj } from "@storybook/vue3";

import Button from "./Button.vue";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    leadingIcon: { control: "text" },
    trailingIcon: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    // eslint-disable-next-line no-console
    onClick: (event) => console.warn("Button clicked", event),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Button text",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    label: "Tertiary Button",
    variant: "tertiary",
  },
};

export const Small: Story = {
  args: {
    label: "Small Button",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    label: "Large Button",
    size: "large",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: "Button with Leading Icon",
    leadingIcon: "→",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Button with Trailing Icon",
    trailingIcon: "←",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
  },
};
