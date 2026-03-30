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
      table: { category: "props" },
    },
    variant: {
      control: { type: "select" },
      options: kdsButtonVariants,
      table: { category: "props" },
    },
    destructive: { control: "boolean", table: { category: "props" } },
    disabled: { control: "boolean", table: { category: "props" } },
    label: { control: "text", table: { category: "props" } },
    leadingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "props" },
    },
    trailingIcon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
      table: { category: "props" },
    },
    to: {
      control: "text",
      description:
        "URL or path string to navigate to. To support typed routes and route-location objects, please create an app-level wrapper (e.g. with `RouterLink`/`NuxtLink`) as described above.",
      table: { category: "props" },
    },
    target: {
      control: "text",
      description: "Target browsing context for anchor-based links.",
      table: { category: "props" },
    },
    rel: {
      control: "text",
      description: "Relationship of the linked URL.",
      table: { category: "props" },
    },
    download: {
      control: "boolean",
      description:
        "If true, the link will be downloaded instead of navigating to it.",
      table: { category: "props" },
    },
    ariaLabel: { control: "text", table: { category: "props" } },
    title: { control: "text", table: { category: "props" } },
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
