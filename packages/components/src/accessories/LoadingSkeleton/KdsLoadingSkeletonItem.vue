<script setup lang="ts">
import type { KdsLoadingSkeletonItemProps } from "./types";

const props = withDefaults(defineProps<KdsLoadingSkeletonItemProps>(), {
  shape: "text",
});
</script>

<template>
  <div :class="['kds-loading-skeleton-item', props.shape]" />
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
    width: var(--kds-dimension-component-width-4x);
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

  &.input {
    height: var(--kds-dimension-component-height-1-75x);
    border-radius: var(--kds-border-radius-container-0-37x);
  }

  &.label {
    width: 35%;
    height: var(--kds-dimension-component-height-0-75x);
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  &.card {
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  /*
  &.button-preset-large {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-50x
    );

    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-2-25x);
  }

  &.button-preset-medium {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-37x
    );

    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-75x);
  }

  &.button-preset-small {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-37x
    );

    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-5x);
  }

  &.button-preset-xsmall {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-25x
    );

    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-25x);
  }

  &.card-preset-default {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-37x
    );

    box-sizing: border-box;
    align-self: stretch;
    width: 100%;
    min-width: 100%;
    height: auto;

    min-height: calc(var(--kds-dimension-component-height-2-5x) * 4);
    margin: 0;
  }
  */
}
</style>
