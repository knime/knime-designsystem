<script setup lang="ts">
import type { KdsCardProps } from "./types";

const { variant = "filled", modelValue = false } = defineProps<KdsCardProps>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <div
    class="kds-card"
    :class="[`variant-${variant}`, `value-${modelValue}`]"
    tabindex="0"
    @click="emit('click', $event)"
  >
    <slot />
  </div>
</template>

<style scoped>
.kds-card {
  position: relative;
  display: flex;
  flex-direction: column;
  outline: none;
  border-style: solid;
  border-radius: var(--kds-border-radius-container-0-50x);
  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: calc(var(--kds-core-border-width-l) * -1);
  }
}

/* Variant: Filled, Value: False */
.variant-filled.value-false {
  background: var(--kds-color-surface-default);
  border: var(--kds-border-base-subtle);

  &:hover {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active {
    background: var(--kds-color-background-neutral-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Outlined, Value: False */
.variant-outlined.value-false {
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-base-muted);

  &:hover {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active {
    background: var(--kds-color-background-neutral-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Transparent, Value: False */
.variant-transparent.value-false {
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);

  &:hover {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active {
    background: var(--kds-color-background-neutral-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Filled, Value: True */
.variant-filled.value-true {
  background: var(--kds-color-background-selected-initial);
  border: var(--kds-border-action-selected);

  &:hover {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active {
    background: var(--kds-color-background-selected-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Outlined, Value: True */
.variant-outlined.value-true {
  background: var(--kds-color-background-selected-initial);
  border: var(--kds-border-base-muted);

  &:hover {
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active {
    background: var(--kds-color-background-selected-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}

/* Variant: Transparent, Value: True */
.variant-transparent.value-true {
  background: var(--kds-color-background-selected-initial);
  border: var(--kds-border-action-selected);

  &:hover {
    background: var(--kds-color-background-selected-initial);
    box-shadow: var(--kds-elevation-level-3);
  }

  &:active {
    background: var(--kds-color-background-selected-active);
    box-shadow: var(--kds-elevation-level-1);
  }
}
</style>
