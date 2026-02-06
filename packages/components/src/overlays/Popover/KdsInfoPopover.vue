<script setup lang="ts">
import BasePopover from "./BasePopover.vue";
</script>

<template>
  <BasePopover
    style="
      width: fit-content;
      max-width: 353px;
      padding: var(--kds-spacing-container-0-5x)
        var(--kds-spacing-container-0-75x);
    "
  >
    <slot />
  </BasePopover>
</template>
