import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { sizes } from "../constants";

import { variants } from "./BaseButton.types";
import LinkButton from "./LinkButton.vue";

const vueExampleCode = `
// RouterLinkButton.vue
<script setup lang="ts">
import type { RouterLinkProps } from "vue-router";

import { LinkButton, type LinkButtonProps } from "@knime/kds-components";

const props = defineProps<LinkButtonProps & RouterLinkProps>();
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

const props = defineProps<LinkButtonProps & NuxtLinkProps>();
</script>

<template>
  <LinkButton v-bind="props" />
</template>
`.trim();

const meta: Meta<typeof LinkButton> = {
  title: "Components/Buttons/LinkButton",
  component: LinkButton as FunctionalComponent,
  decorators: [
    () => ({
      template:
        "<story/>" +
        "<p>Same styles as <code>Button</code>, but rendered as an <code>&lt;a&gt;</code> element. Does use <code>RouterLink</code>/<code>NuxtLink</code> if globally available.</p>" +
        "<p>For accurate typing, please wrap it in the consuming app like this:</p>" +
        "<h5>Vue</h5>" +
        `<pre><code>${vueExampleCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>` +
        "<h5>Nuxt</h5>" +
        `<pre><code>${nuxtExampleCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`,
    }),
  ],
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
  args: {
    variant: "filled",
    label: "Button",
    to: "https://www.knime.com",
  },
};

export const Disabled: Story = {
  args: {
    variant: "filled",
    label: "Button",
    to: "https://www.knime.com",
    disabled: true,
  },
};
