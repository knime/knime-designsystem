<script setup lang="ts" generic="UNUSED">
import { computed } from "vue";

import type { IconName } from "@knime/kds-styles/img/icons/def";

import Icon from "../Icon/Icon.vue";
import type { Size } from "../types";

import type { Variant } from "./Button.types";

type ButtonProps =
  // button with label
  | {
      // common
      variant?: Variant;
      size?: Size;
      destructive?: boolean;
      disabled?: boolean;

      // specific
      label: string;
      leadingIcon?: IconName | null;
      trailingIcon?: IconName | null;

      // not allowed
      icon?: never;
    }
  // button only with icon
  | {
      // common
      variant?: Variant;
      size?: Size;
      destructive?: boolean;
      disabled?: boolean;

      // specific
      icon: IconName;

      // not allowed
      label?: never;
      leadingIcon?: never;
      trailingIcon?: never;
    };

const props = withDefaults(defineProps<ButtonProps>(), {
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
  <button
    :class="classes"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <template v-if="props.label">
      <Icon
        v-if="props.leadingIcon"
        class="button__icon button__icon--leading"
        aria-hidden="true"
        :name="props.leadingIcon"
        :size="props.size"
      />
      <span class="button-label">{{ props.label }}</span>
      <Icon
        v-if="props.trailingIcon"
        class="button__icon button__icon--trailing"
        aria-hidden="true"
        :name="props.trailingIcon"
        :size="props.size"
      />
    </template>
    <Icon
      v-else-if="props.icon"
      class="button__icon"
      aria-hidden="true"
      :name="props.icon"
      :size="props.size"
    />
    <span v-else>{unsupported state}</span>
  </button>
</template>

<style scoped>
/* stylelint-disable */

.button {
  text-rendering: geometricprecision;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: all var(--transition-speed) ease;

  & .button-label {
    padding: 0 var(--kds-spacing-container-0-12x);
  }

  &.button--xsmall {
    border-radius: var(--kds-border-radius-container-0-25x);
    padding: 0 var(--kds-spacing-container-0-25x);
    font: var(--kds-font-base-interactive-xsmall-strong);
    height: var(--kds-dimension-component-height-1-25x);
    gap: var(--kds-spacing-container-0_12x);
  }

  &.button--small {
    border-radius: var(--kds-border-radius-container-0-37x);
    padding: 0 var(--kds-spacing-container-0-37x);
    font: var(--kds-font-base-interactive-small-strong);
    height: var(--kds-dimension-component-height-1-5x);
    gap: var(--kds-spacing-container-0_12x);
  }

  &.button--medium {
    border-radius: var(--kds-border-radius-container-0-37x);
    font: var(--kds-font-base-interactive-medium-strong);
    height: var(--kds-dimension-component-height-1-75x);
    padding: 0 var(--kds-spacing-container-0-37x);
    gap: var(--kds-spacing-container-0-25x);
  }

  &.button--large {
    font: var(--kds-font-base-interactive-large-strong);
    height: var(--kds-dimension-component-height-2-25x);
    padding: 0 var(--kds-spacing-container-0-5x);
    gap: var(--kds-spacing-container-0-25x);
    border-radius: var(--kds-border-radius-container-0-50x);
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
    font-size: 1.2em; /* ? */
    line-height: 0;

    &.button__icon--leading {
      margin-right: var(--spacing-xs);
    }

    &.button__icon--trailing {
      margin-left: var(--spacing-xs);
    }
  }
}
</style>
