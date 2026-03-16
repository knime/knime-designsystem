import { ref, watchEffect } from "vue";
import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { useArgs } from "storybook/preview-api";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
  buildTextOverflowStory,
} from "../../test-utils/storybook";
import { kdsButtonSizes } from "../enums";

import KdsToggleButton from "./KdsToggleButton.vue";
import { kdsToggleButtonVariant, kdsToggleButtonVariants } from "./enums";

const figmaBaseUrl =
  "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components";

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
      url: `${figmaBaseUrl}?node-id=5958-176469`,
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
    modelValue: { control: { type: "boolean" }, table: { category: "model" } },
  },
  args: {
    modelValue: false,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return {
      components: { KdsToggleButton },
      setup() {
        const modelValue = ref(args.modelValue);
        watchEffect(() => (modelValue.value = args.modelValue));
        watchEffect(() => updateArgs({ modelValue: modelValue.value }));
        return { args, modelValue };
      },
      template: '<KdsToggleButton v-bind="args" v-model="modelValue" />',
    };
  },
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

export const TextOverflow: Story = {
  ...buildTextOverflowStory({
    component: KdsToggleButton,
    width: 120,
  }),
  args: {
    label:
      "A very long text that gives comprehensive information about the menu",
  },
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: KdsToggleButton,
  designsToCompare: {
    Types: {
      props: { label: "{Label}" },
      variants: {
        [`${figmaBaseUrl}?node-id=11433-153541`]: { variant: "outlined" },
        [`${figmaBaseUrl}?node-id=11433-153550`]: { variant: "transparent" },
      },
    },
  },
});

export const AllCombinations: Story = buildAllCombinationsStory({
  component: KdsToggleButton,
  combinationsProps: [
    {
      size: kdsButtonSizes,
      variant: [
        kdsToggleButtonVariant.OUTLINED,
        kdsToggleButtonVariant.TRANSPARENT,
      ],
      disabled: [false, true],
      label: ["Button"],
      leadingIcon: [undefined, "placeholder"],
      trailingIcon: [undefined, "placeholder"],
      modelValue: [false, true],
    },
    {
      size: kdsButtonSizes,
      variant: [
        kdsToggleButtonVariant.OUTLINED,
        kdsToggleButtonVariant.TRANSPARENT,
      ],
      disabled: [false, true],
      leadingIcon: ["placeholder"],
      ariaLabel: ["Icon only button"],
      modelValue: [false, true],
    },
  ],
  pseudoStates: ["hover", "active", "focus-visible"],
});
