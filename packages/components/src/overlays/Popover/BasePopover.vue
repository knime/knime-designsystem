<script setup lang="ts">
/**
 * Internal base popover wrapper.
 *
 * Provides consistent styling and layout for popover content used by higher-level overlay components.
 */
</script>

<template>
  <div class="content">
    <slot />
  </div>
</template>

<style scoped>
.content {
  padding: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-75x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  background: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
