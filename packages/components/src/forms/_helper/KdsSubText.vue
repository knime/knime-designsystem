<script setup lang="ts">
import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import KdsLoadingSpinner from "../../accessories/LoadingSpinner/KdsLoadingSpinner.vue";
import type { KdsSubTextProps } from "../types";

const {
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  ...props
} = defineProps<KdsSubTextProps>();
</script>

<template>
  <div
    v-if="props.subText || preserveSubTextSpace"
    :id="props.id"
    :class="{
      subtext: true,
      error,
    }"
  >
    <template v-if="error && props.subText">
      <KdsIcon name="circle-error" size="small" aria-label="Error" />
    </template>
    <template v-else-if="validating && props.subText">
      <KdsLoadingSpinner size="small" variant="onSurface" aria-hidden="true" />
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
