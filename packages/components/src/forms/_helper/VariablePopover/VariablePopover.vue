<script setup lang="ts">
/**
 * @slot default - Custom content for the popover. When provided, overrides the built-in placeholder layout and the `content` prop.
 */
const props = defineProps<{
  /**
   * Content to display inside the info popover. Used when no default slot is provided.
   */
  content?: string;
}>();
</script>

<template>
  <div class="kds-variable-popover" tabindex="0">
    <slot>{{ props.content }}</slot>
  </div>
</template>

<style scoped>
.kds-variable-popover {
  width: var(--kds-dimension-component-width-25x);
  max-width: 100%;
  max-height: var(--kds-dimension-component-height-20x);
  padding: var(--kds-spacing-container-0-75x);
  overflow-y: auto;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: pre-wrap;
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }
}
</style>
