import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { sizes } from "../constants";

import { variants } from "./BaseButton.vue";
import LinkButton from "./LinkButton.vue";

const vueExampleCode = `
// RouterLinkButton.vue
<script setup lang="ts">
import type { RouterLinkProps } from "vue-router";

import { LinkButton, type LinkButtonProps } from "@knime/kds-components";

export type RouterLinkButtonProps = Omit<LinkButtonProps, "to"> & RouterLinkProps;

const props = defineProps<RouterLinkButtonProps>();
</script>

<template>
  <LinkButton v-bind="props" />
</template>
`.trim();

const nuxtExampleCode = `
// NuxtLinkButton.vue
<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

import { LinkButton, type LinkButtonProps } from "@knime/kds-components";

export type NuxtLinkButtonProps = Omit<LinkButtonProps, "to"> & NuxtLinkProps;

const props = defineProps<NuxtLinkButtonProps>();
</script>

<template>
  <LinkButton v-bind="props" />
</template>
`.trim();

const meta: Meta<typeof LinkButton> = {
  title: "Components/Buttons/LinkButton",
  component: LinkButton as FunctionalComponent, // only because of the generic typing of LinkButton
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Same styles as `Button`, but rendered as an `<a>` element. Does use `RouterLink`/`NuxtLink` if globally available.\n\n" +
          "For accurate typing, please wrap it in the consuming app like this:\n" +
          "#### Vue\n" +
          `\`\`\`${vueExampleCode}\`\`\`\n` +
          "#### Nuxt\n" +
          `\`\`\`${nuxtExampleCode}\`\`\``,
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
      options: sizes,
    },
    variant: {
      control: { type: "select" },
      options: variants,
    },
    destructive: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    icon: {
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
        "any URL; passed to RouterLink/NuxtLink component if globally available",
    },
  },
  args: {
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof LinkButton>;

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
