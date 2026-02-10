<script lang="ts" setup>
import type { KdsLoadingSpinnerProps } from "./types";

withDefaults(defineProps<KdsLoadingSpinnerProps>(), {
  variant: "onSurface",
  size: "medium",
});
</script>

<template>
  <svg
    :class="['kds-loading-spinner', size]"
    :data-style="variant"
    viewBox="0 0 120 120"
  >
    <circle class="track" cx="60" cy="60" r="50" />
    <circle class="loader" cx="60" cy="60" r="50" />
  </svg>
</template>

<style scoped>
.kds-loading-spinner {
  --icon-width: var(--kds-dimension-icon-1x);
  --icon-height: var(--kds-dimension-icon-1x);
  --icon-stroke-width: 12; /* 10% of size */

  &.xsmall {
    --icon-width: var(--kds-dimension-icon-0-56x);
    --icon-height: var(--kds-dimension-icon-0-56x);
  }

  &.small {
    --icon-width: var(--kds-dimension-icon-0-75x);
    --icon-height: var(--kds-dimension-icon-0-75x);
  }

  &.large {
    --icon-width: var(--kds-dimension-icon-1-25x);
    --icon-height: var(--kds-dimension-icon-1-25x);
  }

  width: var(--icon-width);
  height: var(--icon-height);

  --color-track: var(--kds-color-loading-spinner-track-on-surface);
  --color-loader: var(--kds-color-loading-spinner-progress-on-surface);

  &[data-style="onPrimary"] {
    --color-track: var(--kds-color-loading-spinner-track-on-primary);
    --color-loader: var(--kds-color-loading-spinner-progress-on-primary);
  }

  & .track {
    fill: none;
    stroke: var(--color-track);
    stroke-width: var(--icon-stroke-width);
  }

  & .loader {
    fill: none;
    stroke: var(--color-loader);
    stroke-width: var(--icon-stroke-width);
    stroke-linecap: round;
    stroke-dasharray: 80 240;
    transform: rotate(-90deg);
    transform-origin: center;

    /* REQUIRED for SVG rotation */
    transform-box: fill-box;
    animation: spin 1.2s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(-90deg);
  }

  to {
    transform: rotate(270deg);
  }
}
</style>
