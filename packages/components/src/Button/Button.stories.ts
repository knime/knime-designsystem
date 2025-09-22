import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { sizes } from "../constants";
import { generateCombinations } from "../utils/storybook";

import { variants } from "./Button.types";
import Button from "./Button.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
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

type Story = StoryObj<typeof Button>;

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

export const Transparent: Story = {
  args: {
    variant: "transparent",
    label: "Button",
  },
};

export const Disabled: Story = {
  args: {
    label: "Button",
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, variants };
    },
    template: `
      <Button v-bind="args" :variant="variant" v-for="variant in variants" :key="variant" style="margin-bottom: 10px;"/>`,
  }),
};

export const Destructive: Story = {
  args: {
    label: "Button",
    destructive: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, variants };
    },
    template: `
      <Button v-bind="args" :variant="variant" v-for="variant in variants" :key="variant" style="margin-bottom: 10px;"/>`,
  }),
};

export const DestructiveDisabled: Story = {
  args: {
    label: "Button",
    destructive: true,
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, variants };
    },
    template: `
      <Button v-bind="args" :variant="variant" v-for="variant in variants" :key="variant" style="margin-bottom: 10px;"/>`,
  }),
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

export const TruncatedLabel: Story = {
  args: {
    label: "Button with veeery loooong label",
    variant: "outlined",
    leadingIcon: "ai-general",
    trailingIcon: "ai-general",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args" /><br>
      Try by resizing the box!
      <div style="width: 200px; padding: 10px; background: lightgray; resize: horizontal; overflow: auto;">
        <Button v-bind="args" />
      </div>`,
  }),
};

export const AllCombinations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { Button },
    setup() {
      const propSpaces = {
        size: sizes,
        variant: variants,
        disabled: [false, true],
        destructive: [false, true],
        label: ["Button", undefined], // eslint-disable-line no-undefined
        leadingIcon: [undefined, "ai-general"], // eslint-disable-line no-undefined
        trailingIcon: [undefined, "ai-general"], // eslint-disable-line no-undefined
        icon: [undefined, "ai-general"], // eslint-disable-line no-undefined
      };
      const combinations = generateCombinations(propSpaces);
      return { combinations };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, auto); gap: 1rem;">
        <div v-for="(props, index) in combinations" :key="index">
          <span style="font-size: 10px; color: gray;">{{ index }}</span> 
          <Button v-bind="props" :title="JSON.stringify(props, null, 2)" />
        </div>
      </div>
    `,
  }),
};
