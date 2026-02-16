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
  paddingSize: "medium",
});

const activatorEl = ref<HTMLButtonElement | null>(null);
</script>

<template>
  <KdsPopover
    :activator-el="activatorEl"
    :anchor-el="anchorEl"
    :placement="placement"
    :padding-size="paddingSize"
  >
    {{ content }}
  </KdsPopover>
</template>
