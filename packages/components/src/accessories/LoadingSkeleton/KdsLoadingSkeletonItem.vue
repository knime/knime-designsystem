<script setup lang="ts">
import type { KdsLoadingSkeletonItemProps } from "./types";

const {
  shape = "text",
  width,
  height,
} = defineProps<KdsLoadingSkeletonItemProps>();
</script>

<template>
  <div :class="['kds-loading-skeleton-item', shape]" />
</template>

<style scoped>
@keyframes knight-rider {
  from {
    background-position-x: 100%;
  }

  to {
    background-position-x: -100%;
  }
}

.kds-loading-skeleton-item {
  background-color: var(--kds-color-border-subtle);
  background-image: linear-gradient(
    90deg,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 2%, transparent)
      0%,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 15%, transparent)
      25%,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 2%, transparent)
      50%,
    transparent 100%
  );
  background-repeat: no-repeat;
  background-size: 200% 100%;
  animation: knight-rider 2s linear 200ms infinite;

  &.text {
    height: var(--kds-dimension-component-height-0-75x);
    border-radius: var(--kds-border-radius-container-pill);
  }

  &.icon-large,
  &.icon-medium,
  &.icon-small {
    border-radius: var(--kds-border-radius-container-pill);
  }

  &.icon-large {
    width: var(--kds-dimension-component-width-1-25x);
    height: var(--kds-dimension-component-height-1-25x);
  }

  &.icon-medium {
    width: var(--kds-dimension-component-width-1x);
    height: var(--kds-dimension-component-height-1x);
  }

  &.icon-small {
    width: var(--kds-dimension-component-width-0-75x);
    height: var(--kds-dimension-component-height-0-75x);
  }

  &.button-large {
    --custom-width: v-bind(width);

    width: calc(var(--custom-width, var(--kds-dimension-component-width-4x)));
    height: var(--kds-dimension-component-height-2-25x);
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  &.button-medium {
    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-75x);
    border-radius: var(--kds-border-radius-container-0-37x);
  }

  &.button-small {
    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-5x);
    border-radius: var(--kds-border-radius-container-0-37x);
  }

  &.button-xsmall {
    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-25x);
    border-radius: var(--kds-border-radius-container-0-25x);
  }

  &.input-field {
    height: var(--kds-dimension-component-height-1-75x);
    border-radius: var(--kds-border-radius-container-0-37x);
  }

  &.label {
    width: 35%;
    height: var(--kds-dimension-component-height-0-75x);
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  &.card {
    --custom-width: v-bind(width);
    --custom-height: v-bind(height);

    width: calc(var(--custom-width, var(--kds-dimension-component-width-4x)));
    height: calc(
      var(--custom-height, var(--kds-dimension-component-height-1-75x))
    );
    border-radius: var(--kds-border-radius-container-0-37x);
  }
}
</style>
