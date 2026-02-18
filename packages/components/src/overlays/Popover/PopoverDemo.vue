<script setup lang="ts">
import type { StyleValue } from "vue";
import { ref } from "vue";

import KdsPopover from "./KdsPopover.vue";
import type { KdsPopoverProps } from "./types";

type PopoverDemoProps = {
  /**
   * Content to display inside the popover.
   */
  content?: string;
  /**
   * Custom style for the popover content.
   */
  style?: StyleValue;
} & Omit<KdsPopoverProps, "activatorEl">;

withDefaults(defineProps<PopoverDemoProps>(), {
  content: "Sample popover content",
  placement: "bottom-right",
  style: undefined,
});

const activatorEl = ref<HTMLButtonElement | null>(null);
</script>

<template>
  <KdsPopover
    :activator-el="activatorEl"
    :anchor-el="anchorEl"
    :placement="placement"
  >
    <div :style="[{ padding: 'var(--kds-spacing-container-0-75x)' }, style]">
      {{ content }}
    </div>
  </KdsPopover>
</template>
