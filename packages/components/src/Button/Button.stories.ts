import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { sizes } from "../constants";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../testUtils/storybook";

import { variants } from "./BaseButton.vue";
import Button from "./Button.vue";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons/Button",
  component: Button as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=345-19622",
    },
  },
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
      options: [undefined, ...iconNames],
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
    },
    icon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
    },
  },
  args: {
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Filled: Story = {
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
      <Button v-bind="args" :variant="variant" v-for="variant in variants" :key="variant" style="margin-bottom: 10px;" />`,
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

export const AllCombinations: Story = buildAllCombinationsStory({
  component: Button,
  combinationsProps: [
    {
      size: sizes,
      variant: variants,
      disabled: [false, true],
      destructive: [false, true],
      label: ["Button"],
      leadingIcon: [undefined, "ai-general"],
      trailingIcon: [undefined, "ai-general"],
    },
    {
      size: sizes,
      variant: variants,
      disabled: [false, true],
      destructive: [false, true],
      icon: ["ai-general"],
    },
  ],
});

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

export const DesignComparator: Story = buildDesignComparatorStory({
  component: Button,
  designsToCompare: {
    label: {
      props: {
        label: "{Label}",
        variant: "outlined",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89691":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89976":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90261":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90546":
          {
            size: "xsmall",
          },
      },
    },
    icon: {
      props: {
        variant: "outlined",
        icon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89762":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90047":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90332":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90617":
          {
            size: "xsmall",
          },
      },
    },
    leadingIcon: {
      props: {
        label: "{Label}",
        variant: "outlined",
        leadingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89833":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90118":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90403":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90688":
          {
            size: "xsmall",
          },
      },
    },
    trailingIcon: {
      props: {
        label: "{Label}",
        variant: "outlined",
        trailingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89904":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90189":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90474":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90759":
          {
            size: "xsmall",
          },
      },
    },
    leadingAndTrailingIcon: {
      props: {
        label: "{Label}",
        variant: "outlined",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197821":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197877":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197933":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197989":
          {
            size: "xsmall",
          },
      },
    },
    filled: {
      props: {
        label: "{Label}",
        variant: "filled",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197804":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197860":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197916":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197972":
          {
            size: "xsmall",
          },
      },
    },
    transparent: {
      props: {
        label: "{Label}",
        variant: "transparent",
        leadingIcon: "placeholder",
        trailingIcon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197838":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197894":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-197950":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8222-198006":
          {
            size: "xsmall",
          },
      },
    },
  },
});
