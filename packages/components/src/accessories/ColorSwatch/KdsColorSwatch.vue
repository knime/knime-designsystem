<script setup lang="ts">
import { computed } from "vue";

import type { KdsColorSwatchProps, KdsColorSwatchType } from "./types";

const props = withDefaults(defineProps<KdsColorSwatchProps>(), {
  title: undefined,
});

const typeToTokenColor: Record<KdsColorSwatchType, string> = {
  learner: "var(--kds-color-nodes-and-variables-learner)",
  manipulator: "var(--kds-color-nodes-and-variables-manipulator)",
  predictor: "var(--kds-color-nodes-and-variables-predictor)",
  sink: "var(--kds-color-nodes-and-variables-sink)",
  source: "var(--kds-color-nodes-and-variables-source)",
  visualizer: "var(--kds-color-nodes-and-variables-visualizer)",
  other: "var(--kds-color-nodes-and-variables-other)",
};

const isKdsColorSwatchType = (value: string): value is KdsColorSwatchType =>
  Object.prototype.hasOwnProperty.call(typeToTokenColor, value);

const backgroundColor = computed(() => {
  if (isKdsColorSwatchType(props.color)) {
    return typeToTokenColor[props.color];
  }
  return props.color;
});

const accessibleTitle = computed(() => props.title?.trim() ?? "");
const hasTitle = computed(() => accessibleTitle.value.length > 0);
</script>

<template>
  <span
    :role="hasTitle ? 'img' : 'presentation'"
    class="kds-color-swatch"
    :title="hasTitle ? accessibleTitle : undefined"
    :style="{ backgroundColor }"
    :aria-hidden="hasTitle ? undefined : 'true'"
    :aria-label="hasTitle ? accessibleTitle : undefined"
  />
</template>

<style scoped>
.kds-color-swatch {
  display: inline-block;
  width: var(--kds-dimension-icon-0-75x);
  height: var(--kds-dimension-icon-0-75x);
  overflow: hidden;
  line-height: 0;
  border: var(--kds-border-base-muted);
  border-radius: var(--kds-border-radius-container-0-25x);
}
</style>
