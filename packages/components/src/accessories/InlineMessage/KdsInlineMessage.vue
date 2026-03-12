<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";

import KdsIcon from "../Icon/KdsIcon.vue";
import type { KdsIconName } from "../Icon/types.ts";

import type { KdsInlineMessageProps } from "./types";

const props = withDefaults(defineProps<KdsInlineMessageProps>(), {
  variant: "info",
  description: undefined,
});

const classes = computed(() => ["kds-inline-message", props.variant]);

const iconName = computed<KdsIconName>(() => {
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

const role = computed<HTMLAttributes["role"]>(() =>
  props.variant === "warning" || props.variant === "error" ? "alert" : "status",
);
</script>

<template>
  <div :class="classes" :role="role">
    <div class="header">
      <KdsIcon class="icon" :name="iconName" size="small" />
      <div class="headline">
        {{ props.headline }}
      </div>
    </div>

    <div v-if="props.description" class="body">
      {{ props.description }}
    </div>
  </div>
</template>

<style scoped>
.kds-inline-message {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-25x);
  align-items: flex-start;
  padding: calc(
    var(--kds-spacing-container-0-5x) - var(--kds-core-border-width-xs)
  );
  color: var(--kds-color-text-and-icon-neutral);
  border-radius: var(--kds-border-radius-container-0-50x);

  .header {
    display: flex;
    gap: var(--kds-spacing-container-0-25x);
    align-items: flex-start;

    .icon {
      align-self: flex-start;
      margin-top: var(--kds-spacing-container-0-12x);
      color: var(--icon-color);
    }

    .headline {
      font: var(--kds-font-base-title-small-strong);
    }
  }

  .body {
    align-self: stretch;
    padding-left: var(--kds-spacing-container-1x);
    font: var(--kds-font-base-body-small);
    color: var(--kds-color-text-and-icon-muted);
  }

  &.info {
    --icon-color: var(--kds-color-text-and-icon-info);

    background-color: var(--kds-color-background-static-info-muted);
    border: var(--kds-border-base-info);
  }

  &.success {
    --icon-color: var(--kds-color-text-and-icon-success);

    background-color: var(--kds-color-background-static-success-muted);
    border: var(--kds-border-base-success);
  }

  &.error {
    --icon-color: var(--kds-color-text-and-icon-danger);

    background-color: var(--kds-color-background-static-danger-muted);
    border: var(--kds-border-base-danger);
  }

  &.warning {
    --icon-color: var(--kds-color-text-and-icon-warning);

    background-color: var(--kds-color-background-static-warning-muted);
    border: var(--kds-border-base-warning);
  }
}
</style>
