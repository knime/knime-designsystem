<script setup lang="ts">
import { computed } from "vue";

import type { KdsLiveStatusProps } from "./types";

const props = withDefaults(defineProps<KdsLiveStatusProps>(), {
  status: "red",
  size: "medium",
  label: "",
  title: undefined,
});

const accessibleTitle = computed(
  () => props.title?.trim() || `Status is ${props.status}`,
);
</script>

<template>
  <span
    :class="['kds-live-status', props.status, `size-${props.size}`]"
    role="img"
    :title="accessibleTitle"
    :aria-label="accessibleTitle"
  >
    <span class="dot" />
    <span v-if="props.label" class="label">{{ props.label }}</span>
  </span>
</template>

<style scoped>
.kds-live-status {
  --dot-color: var(--kds-color-text-and-icon-disabled);

  display: inline-flex;
  flex-shrink: 0;
  gap: 0; /* gap already included in dot */
  align-items: center;
  line-height: 0;

  &.red {
    --dot-color: var(--kds-color-text-and-icon-danger);
  }

  &.orange {
    --dot-color: var(--kds-color-text-and-icon-warning);
  }

  &.green {
    --dot-color: var(--kds-color-text-and-icon-success);
  }

  .dot {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: var(--kds-dimension-icon-1-25x);
    height: var(--kds-dimension-icon-1-25x);

    &::after {
      display: block;
      width: 50%;
      height: 50%;
      content: "";
      background-color: var(--dot-color);
      border-radius: var(--kds-border-radius-container-pill);
    }
  }

  .label {
    font: var(--kds-font-base-subtext-medium);
    color: var(--kds-color-text-and-icon-neutral);
    white-space: nowrap;
  }

  &.size-medium {
    .dot {
      width: var(--kds-dimension-icon-1x);
      height: var(--kds-dimension-icon-1x);
    }

    .label {
      font: var(--kds-font-base-subtext-small);
    }
  }

  &.size-small {
    .dot {
      width: var(--kds-dimension-icon-0-75x);
      height: var(--kds-dimension-icon-0-75x);
    }

    .label {
      font: var(--kds-font-base-subtext-xsmall);
    }
  }
}
</style>
