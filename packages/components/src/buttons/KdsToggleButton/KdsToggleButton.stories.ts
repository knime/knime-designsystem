import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/internal/preview-api";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { buildAllCombinationsStory } from "../../test-utils/storybook";
import { kdsButtonSizes } from "../enums";

import KdsToggleButton from "./KdsToggleButton.vue";
import { kdsToggleButtonVariant, kdsToggleButtonVariants } from "./enums";

const vModelExampleCode = `html
<script setup lang="ts">
import { ref } from "vue";

const isExpanded = ref(false);
</script>

<template>
  <KdsToggleButton v-model="isExpanded" />
</template>
`.trim();

const meta: Meta<typeof KdsToggleButton> = {
  title: "Buttons/ToggleButton",
  component: KdsToggleButton as unknown as FunctionalComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Same styles as `KdsButton`, but with an on/off state. " +
          "Compared to `Chips`, this component is used to trigger an action like open popover or change a view. " +
          "Used in Rich Text Editor or as Base for Vertical Menu.\n\n" +
          "Can be used with `v-model`:\n" +
          `\`\`\`${vModelExampleCode}\`\`\`\n`,
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=5958-176469",
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: kdsButtonSizes,
    },
    variant: {
      control: { type: "select" },
      options: kdsToggleButtonVariants,
    },
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
    ariaLabel: { control: "text" },
    title: { control: "text" },
    modelValue: { control: { type: "boolean" } },
  },
  args: {
    "onUpdate:modelValue": fn(),
  },
  decorators: [
    (story) => {
      const [currentArgs, updateArgs] = useArgs();
      return {
        components: { story },
        setup() {
          return {
            args: currentArgs,
            updateArgs,
          };
        },
        template:
          '<story v-bind="args" @update:modelValue="(value) => updateArgs({ modelValue: value })" />',
      };
    },
  ],
};
export default meta;

type Story = StoryObj<typeof KdsToggleButton>;

export const Outlined: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "outlined",
    label: "Button",
  },
};

export const Transparent: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "transparent",
    label: "Button",
  },
};

export const Disabled: Story = {
  parameters: {
    docs: false,
  },
  args: {
    variant: "outlined",
    label: "Button",
    disabled: true,
  },
};

export const AllCombinationsOutlined: Story = buildAllCombinationsStory({
  component: KdsToggleButton,
  combinationsProps: [
    {
      size: kdsButtonSizes,
      variant: [kdsToggleButtonVariant.OUTLINED],
      disabled: [false, true],
      label: ["Button"],
      leadingIcon: [undefined, "ai-general"],
      trailingIcon: [undefined, "ai-general"],
      modelValue: [false, true],
    },
    {
      size: kdsButtonSizes,
      variant: [kdsToggleButtonVariant.OUTLINED],
      disabled: [false, true],
      leadingIcon: ["ai-general"],
      ariaLabel: ["Icon only button"],
      modelValue: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});

export const AllCombinationsTransparent: Story = buildAllCombinationsStory({
  component: KdsToggleButton,
  combinationsProps: [
    {
      size: kdsButtonSizes,
      variant: [kdsToggleButtonVariant.TRANSPARENT],
      disabled: [false, true],
      label: ["Button"],
      leadingIcon: [undefined, "ai-general"],
      trailingIcon: [undefined, "ai-general"],
      modelValue: [false, true],
    },
    {
      size: kdsButtonSizes,
      variant: [kdsToggleButtonVariant.TRANSPARENT],
      disabled: [false, true],
      leadingIcon: ["ai-general"],
      ariaLabel: ["Icon only button"],
      modelValue: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
