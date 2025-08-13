<script setup lang="ts">
import { computed } from "vue";

import type { IconName } from "@knime/kds-styles/img/icons/def";

import Icon from "../Icon/Icon.vue";

interface Props {
  label: string;
  leadingIcon?: IconName | null;
  trailingIcon?: IconName | null;
  variant?: "filled" | "outlined" | "transparent";
  size?: "x-small" | "small" | "medium" | "large";
  destructive?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  leadingIcon: null,
  trailingIcon: null,
  size: "medium",
  variant: "filled",
  destructive: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const classes = computed(() => [
  "button",
  `button--${props.size}`,
  `button--${props.variant}`,
  { "button--disabled": props.disabled },
]);
</script>

<template>
  <button :class="classes" :disabled="disabled" @click="emit('click', $event)">
    <Icon
      v-if="leadingIcon"
      class="button__icon button__icon--leading"
      aria-hidden="true"
      :name="leadingIcon"
      :size="props.size"
      color="var(--kds-color-text-and-icon-neutral)"
    />

    <!-- <span
      v-if="leadingIcon"
      class="button__icon button__icon--leading"
      aria-hidden="true"
      >{{ leadingIcon }}</span
    > -->
    <span class="button-label">{{ label }}</span>
    <!-- <span
      v-if="trailingIcon"
      class="button__icon button__icon--trailing"
      aria-hidden="true"
      >{{ trailingIcon }}</span
    > -->
  </button>
</template>

<style scoped>
/* stylelint-disable */

.button {
  text-rendering: geometricprecision;
  font: var(--kds-font-interactive-medium-m);
  position: relative;
  display: flex;
  height: var(--kds-dimension-action-height-1-75x);
  padding: 0 var(--kds-spacing-container-0-5x);
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: var(--kds-spacing-container-0-25x);
  border-radius: var(--kds-border-radius-container-0-37x);
  cursor: pointer;
  transition: all var(--transition-speed) ease;

  & .button-label {
    padding: 0 var(--kds-spacing-container-0-25x);
  }

  &.button--medium {
    /* Default styles are already set */
  }

  &.button--large {
    height: var(--kds-dimension-action-height-2-25x);
    font-size: var(--font-size-large);
    padding: 0 var(--kds-spacing-container-0-75x);
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  &.button--small {
    height: var(--kds-dimension-action-height-1_5x);
    gap: var(--kds-spacing-container-0_12x);
    font-size: var(--font-size-small);
  }

  &:focus-visible {
    outline: 2px solid var(--kds-color-focus-outline);
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.button--filled {
    color: var(--kds-color-text-and-icon-primary-inverted);
    background-color: var(--kds-color-background-primary-bold-initial);
    border: var(--kds-border-action-transparent);

    &:not(:disabled) {
      &:hover {
        background-color: var(--kds-color-background-primary-bold-hover);
      }

      &:active {
        background-color: var(--kds-color-background-primary-bold-active);
      }
    }

    /* apply semi transparent overlay for disabled state */
    &.button--disabled::before {
      content: "";
      position: absolute;
      top: calc(-1 * var(--border-width));
      left: calc(-1 * var(--border-width));
      width: calc(100% + 2 * var(--border-width));
      height: calc(100% + 2 * var(--border-width));
      background-color: var(--kds-color-background-disabled-default);
      pointer-events: none;
      border-radius: inherit;
    }
  }

  &.button--outlined {
    background-color: var(--kds-color-background-neutral-initial);
    color: var(--kds-color-text-and-icon-neutral);
    border: var(--kds-border-action-default);

    &:not(:disabled) {
      &:hover {
        background-color: var(--kds-color-background-primary-hover);
        color: var(--kds-color-text-and-icon-primary-bold);
      }

      &:active {
        background-color: var(--kds-color-background-primary-active);
        color: var(--kds-color-text-and-icon-primary);
      }
    }

    &.button--disabled {
      color: var(--kds-color-text-and-icon-disabled);
      border: var(--kds-border-action-disabled);
    }
  }

  &.button--transparent {
    background-color: var(--kds-color-background-neutral-initial);
    border: var(--kds-border-action-transparent);
    color: var(--kds-color-text-and-icon-neutral);

    &:not(:disabled) {
      &:hover {
        background-color: var(--kds-color-background-primary-hover);
        color: var(--kds-color-text-and-icon-primary-bold);
      }

      &:active {
        background-color: var(--kds-color-background-primary-active);
        color: var(--kds-color-text-and-icon-primary);
      }
    }

    &.button--disabled {
      color: var(--kds-color-text-and-icon-disabled);
    }
  }

  &.button__icon {
    font-size: 1.2em;
    line-height: 0;

    &.button--leading {
      margin-right: var(--spacing-xs);
    }

    &.button--trailing {
      margin-left: var(--spacing-xs);
    }
  }
}
</style>
