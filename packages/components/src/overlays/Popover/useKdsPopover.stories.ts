import { computed, ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { KdsButton } from "../../buttons";
import { convertStoryCodeToSfc } from "../../test-utils/convertStoryCodeToSfc";

import BasePopover from "./BasePopover.vue";
import { kdsPopoverPlacements } from "./constants";
import { useKdsPopover } from "./useKdsPopover";

type UseKdsPopoverStoryHarnessProps = {
  placement: (typeof kdsPopoverPlacements)[number];
};

const scriptExample = `
<script setup lang="ts">
import { ref } from "vue";
import { useKdsPopover } from "@knime/kds-components";

const open = ref(false);
const activatorEl = ref<HTMLElement | null>(null);
const popoverEl = ref<HTMLElement | null>(null);

useKdsPopover({
  open,
  activatorEl,
  popoverEl,
  placement: "bottom-right",
  type: "grid",
});
</script>
`.trim();

const templateExample = `
<template>
  <button ref="activatorEl" type="button" @click="open = !open">Toggle</button>

  <BasePopover ref="popoverEl">
    Popover content
  </BasePopover>
</template>
`.trim();

const meta: Meta<UseKdsPopoverStoryHarnessProps> = {
  title: "Components/overlays/useKdsPopover",
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: kdsPopoverPlacements,
      table: { category: "Props" },
    },
  },
  args: {
    placement: "bottom-right",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=8522-305454",
    },
    docs: {
      source: {
        type: "code",
        language: "html",
        transform: async (source: string) => {
          const result = await convertStoryCodeToSfc(source);
          return result;
        },
      },
      description: {
        component:
          "`useKdsPopover()` is a composable that wires up the native Popover API together with CSS anchor positioning. " +
          "It applies the required attributes/styles to your activator, anchor, and popover elements and keeps the native popover state in sync with the reactive `open` state. " +
          "\n\n**What it does**\n" +
          "- Connects an *activator element* (user interaction target) with a *popover element* (the thing that shows/hides).\n" +
          "- Optionally connects a separate *anchor element* when the popover should be positioned relative to something else.\n" +
          "- Applies placement styles based on `placement`.\n" +
          "\n**Important notes**\n" +
          "- `activatorEl` must be bound directly to a button.\n" +
          "- `popoverEl` must be bound directly to `BasePopover` for styling reasons.\n" +
          "- Opening and closing the popover is synced via open ref.\n" +
          "\n#### Example usage\n" +
          `\n\n\`\`\`html\n${scriptExample}\n\`\`\`` +
          `\n\n\`\`\`html\n${templateExample}\n\`\`\``,
      },
    },
  },
};

export default meta;

type Story = StoryObj<UseKdsPopoverStoryHarnessProps>;

type HarnessOptions = {
  placement: (typeof kdsPopoverPlacements)[number];
  content: string;
  separateAnchor?: boolean;
  popoverTemplate: string;
};

const buildHarness = (options: HarnessOptions) => ({
  components: { KdsButton, BasePopover },
  setup() {
    const open = ref(false);
    const activatorEl = ref<HTMLElement | null>(null);
    const anchorEl = ref<HTMLElement | null>(null);
    const popoverEl = ref<HTMLElement | null>(null);

    useKdsPopover({
      open,
      activatorEl,
      anchorEl: options.separateAnchor ? anchorEl : undefined,
      popoverEl,
      placement: options.placement,
      type: "grid",
    });

    const effectiveAnchorLabel = computed(() =>
      options.separateAnchor
        ? "Anchor (positioning target)"
        : "Anchor (same as activator)",
    );

    return {
      open,
      activatorEl,
      anchorEl,
      popoverEl,
      content: options.content,
      effectiveAnchorLabel,
    };
  },
  template: `
    <div
      style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-1x); align-items: flex-start;"
    >
      <KdsButton
        ref="activatorEl"
        label="Toggle popover"
        variant="outlined"
        @click="open = !open"
      />

      <div
        v-if="${options.separateAnchor ? "true" : "false"}"
        ref="anchorEl"
        style="
          padding: var(--kds-spacing-container-1x);
          border: 1px solid var(--kds-color-border-subtle);
          border-radius: var(--kds-border-radius-container);
          font: var(--kds-font-base-body-small);
          color: var(--kds-color-text-and-icon-default);
          background: var(--kds-color-background-surface);
        "
      >
        {{ effectiveAnchorLabel }}
      </div>

      <BasePopover ref="popoverEl">
        ${options.popoverTemplate}
      </BasePopover>
    </div>
  `,
});

const defaultPopoverTemplate = `
  <div
    style="display: flex; flex-direction: column; gap: var(--kds-spacing-container-0-5x); max-width: 400px"
  >
    <div
      style="font: var(--kds-font-base-body-small); color: var(--kds-color-text-and-icon-subtle);"
    >
      {{ content }}
    </div>
    <button type="button">Focusable element</button>
  </div>
`;

export const Default: Story = {
  render: (args) =>
    buildHarness({
      placement: args.placement,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      popoverTemplate: defaultPopoverTemplate,
    }),
};

export const PlacementRight: Story = {
  name: "Placement: top-right",
  render: () =>
    buildHarness({
      placement: "top-right",
      content:
        "This popover is placed at the top-right. Use it when you want the popover to open diagonally next to the anchor.",
      popoverTemplate: defaultPopoverTemplate,
    }),
};

export const SeparateActivatorAndAnchor: Story = {
  render: () =>
    buildHarness({
      placement: "bottom-right",
      separateAnchor: true,
      content:
        "The activator (button) is different from the anchor element that controls positioning. This is useful when the click target is not the best positioning reference.",
      popoverTemplate: defaultPopoverTemplate,
    }),
};
