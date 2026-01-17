<script setup lang="ts">
import KdsIcon from "../Icon/KdsIcon.vue";

import type { KdsSubTextProps } from "./types.ts";

const props = withDefaults(defineProps<KdsSubTextProps>(), {
  error: false,
  preserveSubTextSpace: false,
});
</script>

<template>
  <div
    v-if="props.subText || props.preserveSubTextSpace"
    :id="props.id"
    :class="{ subtext: true, error: props.error }"
  >
    <template v-if="props.error && props.subText">
      <KdsIcon
        class="subtext-icon"
        name="circle-error"
        size="small"
        aria-label="Error"
      />
    </template>
    <span class="subtext-text">{{ props.subText }}</span>
  </div>
</template>

<style scoped>
.subtext {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  min-height: 1lh;
  margin-top: var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);

  &.error {
    color: var(--kds-color-text-and-icon-danger);
  }

  & .subtext-text {
    min-width: 0;
  }
}
</style>
