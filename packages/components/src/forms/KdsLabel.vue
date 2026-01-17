<script setup lang="ts">
import type { KdsLabelProps } from "./types.ts";

const props = defineProps<KdsLabelProps>();
</script>

<template>
  <div :id="props.id" class="label">
    {{ props.label }}
  </div>
</template>

<style scoped>
.label {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  min-height: var(--kds-dimension-component-height-0-75x);
  padding-bottom: var(--kds-spacing-input-label-spacing-bottom);
  font: var(--kds-font-base-title-small-strong);
  color: var(--kds-color-text-and-icon-neutral);
}
</style>
