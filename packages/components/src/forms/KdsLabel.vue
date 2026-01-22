<script setup lang="ts">
import { ref } from "vue";

import { useIsTruncated } from "../util";

import type { KdsLabelProps } from "./types.ts";

const props = defineProps<KdsLabelProps>();

const labelEl = ref<HTMLLabelElement | null>(null);
const { isTruncated } = useIsTruncated(labelEl);
</script>

<template>
  <label
    :id="props.id"
    ref="labelEl"
    :for="props.for"
    :class="{ label: true, large: props.large }"
    :title="isTruncated ? props.label : undefined"
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
  text-overflow: ellipsis;
  font: var(--kds-font-base-title-small-strong);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;
}
</style>
