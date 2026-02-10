<script setup lang="ts">
import KdsIcon from "../Icon/KdsIcon.vue";
import KdsLoadingSpinner from "../LoadingSpinner/KdsLoadingSpinner.vue";

import type { KdsSubTextProps } from "./types";

const props = withDefaults(defineProps<KdsSubTextProps>(), {
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const spinnerStyle = "onSurface" as const;
</script>

<template>
  <div
    v-if="
      props.subText ||
      props.preserveSubTextSpace ||
      props.validating ||
      props.error
    "
    :id="props.id"
    :class="{
      subtext: true,
      error: props.error,
    }"
  >
    <template v-if="props.error">
      <KdsIcon name="circle-error" size="small" aria-label="Error" />
    </template>
    <template v-else-if="props.validating">
      <KdsLoadingSpinner
        size="small"
        :style="spinnerStyle"
        aria-label="Validating"
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
