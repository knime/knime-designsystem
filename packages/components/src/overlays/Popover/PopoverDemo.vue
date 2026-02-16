<script setup lang="ts">
import { ref } from "vue";

import KdsPopover from "./KdsPopover.vue";
import type { KdsPopoverProps } from "./types";

type PopoverDemoProps = {
  /**
   * Content to display inside the popover.
   */
  content?: string;
} & Omit<KdsPopoverProps, "activatorEl">;

withDefaults(defineProps<PopoverDemoProps>(), {
  content: "Sample popover content",
  placement: "bottom-right",
});

const activatorEl = ref<HTMLButtonElement | null>(null);
</script>

<template>
  <div>
    <KdsPopover
      :activator-el="activatorEl"
      :anchor-el="anchorEl"
      :placement="placement"
    >
      <div style="padding: var(--kds-spacing-container-0-75x)">
        {{ content }}
      </div>
    </KdsPopover>
  </div>
</template>
