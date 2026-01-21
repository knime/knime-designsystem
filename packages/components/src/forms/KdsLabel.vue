<script setup lang="ts">
import type { KdsLabelProps } from "./types.ts";

const props = defineProps<KdsLabelProps>();
</script>

<template>
  <label
    :id="props.id"
    :for="props.for"
    :class="{ label: true, large: props.large }"
  >
    {{ props.label }}
  </label>
</template>

<style scoped>
.label {
  display: block;
  max-width: 100%;
  min-height: var(--kds-dimension-component-height-0-75x);
  padding-bottom: var(--kds-spacing-input-label-spacing-bottom);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font: var(--kds-font-base-title-small-strong);
  color: var(--kds-color-text-and-icon-neutral);

  &.large {
    min-height: var(--kds-dimension-component-height-1x);
    font: var(--kds-font-base-title-medium-strong);
  }
}
</style>
