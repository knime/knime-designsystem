<script setup lang="ts">
import { computed } from "vue";

import KdsIcon from "../Icon/KdsIcon.vue";

import type { KdsInlineMessageProps } from "./types";

const props = withDefaults(defineProps<KdsInlineMessageProps>(), {
  title: "",
  variant: "info",
  message: undefined,
});

const classes = computed(() => ["kds-inline-message", props.variant]);

const iconName = computed(() => {
  switch (props.variant) {
    case "success":
      return "circle-success";
    case "error":
      return "circle-error";
    case "warning":
      return "warning";
    case "info":
    default:
      return "circle-info";
  }
});
</script>

<template>
  <div :class="classes">
    <div class="header">
      <KdsIcon class="icons" :name="iconName" size="small" />
      <div class="title">
        {{ props.title }}
      </div>
    </div>

    <div v-if="props.message || $slots.default" class="body">
      <div class="message">
        <slot>{{ props.message }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kds-inline-message {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-25x);
  justify-content: center;
  padding: var(--kds-spacing-container-0-5x);

  .header {
    display: flex;
    gap: var(--kds-spacing-container-0-25x);
    align-items: center;
  }

  .header .icons {
    align-self: var(--kds-dimension-icon-0-75x);
    width: var(--kds-dimension-component-width-0-75x);
    height: var(--kds-dimension-component-height-0-75x);
    color: var(--icon-color);
  }

  .icons :deep(svg) {
    stroke-width: var(--icon-stroke-width);
  }

  .title {
    font: var(--kds-font-base-title-small-strong);
    color: var(--kds-color-text-and-icon-neutral);
  }

  .message {
    font: var(--kds-font-base-body-small);
    color: var(--kds-color-text-and-icon-neutral);
  }

  .body {
    gap: var(--kds-spacing-container-0-5x);
    padding-left: var(--kds-spacing-container-1x);
  }

  &.info {
    --icon-color: var(--kds-color-text-and-icon-info);
    --icon-stroke-width: var(--kds-border-width-icon-stroke-m);

    background-color: var(--kds-color-background-static-info-muted);
    border: var(--kds-border-base-info);
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  &.success {
    --icon-color: var(--kds-color-text-and-icon-success);
    --icon-stroke-width: var(--kds-border-width-icon-stroke-m);

    background-color: var(--kds-color-background-static-success-muted);
    border: var(--kds-border-base-success);
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  &.error {
    --icon-color: var(--kds-color-text-and-icon-danger);
    --icon-stroke-width: var(--kds-border-width-icon-stroke-m);

    background-color: var(--kds-color-background-static-danger-muted);
    border: var(--kds-border-base-danger);
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  &.warning {
    --icon-color: var(--kds-color-text-and-icon-warning);
    --icon-stroke-width: var(--kds-border-width-icon-stroke-m);

    background-color: var(--kds-color-background-static-warning-muted);
    border: var(--kds-border-base-warning);
    border-radius: var(--kds-border-radius-container-0-50x);
  }
}
</style>
