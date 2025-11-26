import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { kdsSizes } from "../constants";

import KdsLinkButton from "./KdsLinkButton.vue";
import { kdsButtonVariants } from "./constants";

const vueExampleCode = `html
// RouterLinkButton.vue
<script setup lang="ts">
import type { RouterLinkProps } from "vue-router";

import { KdsLinkButton, type KdsLinkButtonProps } from "@knime/kds-components";

export type RouterLinkButtonProps = Omit<KdsLinkButtonProps, "to"> & RouterLinkProps;

const props = defineProps<RouterLinkButtonProps>();
</script>

<template>
  <KdsLinkButton v-bind="props" />
</template>
`.trim();

const nuxtExampleCode = `html
// NuxtLinkButton.vue
<script setup lang="ts">
import type { NuxtLinkProps } from "#app";

import { KdsLinkButton, type KdsLinkButtonProps } from "@knime/kds-components";

export type NuxtLinkButtonProps = Omit<KdsLinkButtonProps, "to"> & NuxtLinkProps;

const props = defineProps<NuxtLinkButtonProps>();
</script>

<template>
  <KdsLinkButton v-bind="props" />
</template>
`.trim();

const meta: Meta<typeof KdsLinkButton> = {
  title: "Components/Buttons/KdsLinkButton",
  component: KdsLinkButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Same styles as `KdsButton`, but rendered as an `<a>` element. Does use `RouterLink`/`NuxtLink` if globally available.\n\n" +
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
      options: kdsSizes,
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
        "any URL; passed to RouterLink/NuxtLink component if globally available",
    },
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
