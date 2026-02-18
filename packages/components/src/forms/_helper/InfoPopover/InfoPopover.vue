<script setup lang="ts">
/**
 * @slot default - Custom content for the popover. When provided, overrides the `content` prop.
 */

const props = defineProps<{
  /**
   * Content to display inside the info popover. Used when no default slot is provided.
   */
  content?: string;
}>();
</script>

<template>
  <div class="kds-info-popover-content">
    <slot>{{ props.content }}</slot>
  </div>
</template>

<style scoped>
.kds-info-popover-content {
  max-width: var(--kds-dimension-component-width-25x);
  padding: var(--kds-spacing-container-0-75x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: pre-wrap;
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
