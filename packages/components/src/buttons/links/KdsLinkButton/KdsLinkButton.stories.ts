import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { kdsButtonSizes, kdsButtonVariants } from "../../enums";
import { buildWrappingComponentDocs } from "../docs";

import KdsLinkButton from "./KdsLinkButton.vue";

const meta: Meta<typeof KdsLinkButton> = {
  title: "Buttons/LinkButton",
  component: KdsLinkButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Same styles as \`KdsButton\`, but rendered as an \`<a>\` element.${buildWrappingComponentDocs(
          "KdsLinkButton",
        )}`,
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=345-19622",
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: kdsButtonSizes,
    },
    variant: {
      control: { type: "select" },
      options: kdsButtonVariants,
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
    to: {
      control: "text",
      description:
        "URL or path string to navigate to. To support typed routes and route-location objects, please create an app-level wrapper (e.g. with `RouterLink`/`NuxtLink`) as described above.",
    },
    ariaLabel: { control: "text" },
    title: { control: "text" },
  },
  args: {
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof KdsLinkButton>;

export const Filled: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "filled",
    label: "Button",
    to: "https://www.knime.com",
  },
};

export const Disabled: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "filled",
    label: "Button",
    to: "https://www.knime.com",
    disabled: true,
  },
};
