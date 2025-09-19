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
  { "button--destructive": props.destructive },
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
        class="button__icon--leading"
        aria-hidden="true"
        :name="props.leadingIcon"
        :size="props.size"
      />
      <span class="button__label">{{ props.label }}</span>
      <Icon
        v-if="props.trailingIcon"
        class="button__icon--trailing"
        aria-hidden="true"
        :name="props.trailingIcon"
        :size="props.size"
      />
    </template>
    <Icon
      v-else-if="props.icon"
      aria-hidden="true"
      :name="props.icon"
      :size="props.size"
    />
    <span v-else>{unsupported props}</span>
  </button>
</template>

<style scoped>
/* TODO decide if we want to use BEM or not */
/* stylelint-disable selector-class-pattern,custom-property-pattern */

.button {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-speed) ease; /* TODO */
  text-rendering: geometricprecision; /* TODO always wanted? */

  &.button--xsmall {
    gap: var(--kds-spacing-container-0_12x);
    height: var(--kds-dimension-component-height-1-25x);
    padding: 0 var(--kds-spacing-container-0-25x);
    font: var(--kds-font-base-interactive-xsmall-strong);
    border-radius: var(--kds-border-radius-container-0-25x);
  }

  &.button--small {
    gap: var(--kds-spacing-container-0_12x);
    height: var(--kds-dimension-component-height-1-5x);
    padding: 0 var(--kds-spacing-container-0-37x);
    font: var(--kds-font-base-interactive-small-strong);
    border-radius: var(--kds-border-radius-container-0-37x);
  }

  &.button--medium {
    gap: var(--kds-spacing-container-0-25x);
    height: var(--kds-dimension-component-height-1-75x);
    padding: 0 var(--kds-spacing-container-0-37x);
    font: var(--kds-font-base-interactive-medium-strong);
    border-radius: var(--kds-border-radius-container-0-37x);
  }

  &.button--large {
    gap: var(--kds-spacing-container-0-25x);
    height: var(--kds-dimension-component-height-2-25x);
    padding: 0 var(--kds-spacing-container-0-5x);
    font: var(--kds-font-base-interactive-large-strong);
    border-radius: var(--kds-border-radius-container-0-50x);
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: 1px; /* TODO move into CSS var? */
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

    &.button--destructive {
      background-color: var(--kds-color-background-danger-bold-initial);
    }

    /* apply semi transparent overlay for disabled state */
    &.button--disabled::before {
      position: absolute;
      top: calc(-1 * var(--border-width));
      left: calc(-1 * var(--border-width));
      width: calc(100% + 2 * var(--border-width));
      height: calc(100% + 2 * var(--border-width));
      pointer-events: none;
      content: "";
      background-color: var(--kds-color-background-disabled-default);
      border-radius: inherit;
    }
  }

  &.button--outlined {
    color: var(--kds-color-text-and-icon-neutral);
    background-color: var(--kds-color-background-neutral-initial);
    border: var(--kds-border-action-default);

    &:not(:disabled) {
      &:hover {
        color: var(--kds-color-text-and-icon-primary-bold);
        background-color: var(--kds-color-background-neutral-hover);
      }

      &:active {
        color: var(--kds-color-text-and-icon-primary);
        background-color: var(--kds-color-background-neutral-active);
      }
    }

    &.button--disabled {
      color: var(--kds-color-text-and-icon-disabled);
      border: var(--kds-border-action-disabled);
    }
  }

  &.button--transparent {
    color: var(--kds-color-text-and-icon-neutral);
    background-color: var(--kds-color-background-neutral-initial);
    border: var(--kds-border-action-transparent);

    &:not(:disabled) {
      &:hover {
        color: var(--kds-color-text-and-icon-primary-bold);
        background-color: var(--kds-color-background-primary-hover);
      }

      &:active {
        color: var(--kds-color-text-and-icon-primary);
        background-color: var(--kds-color-background-primary-active);
      }
    }

    &.button--disabled {
      color: var(--kds-color-text-and-icon-disabled);
    }
  }

  & .button__icon--leading {
    margin-right: var(--spacing-xs);
  }

  & .button__icon--trailing {
    margin-left: var(--spacing-xs);
  }

  & .button__label {
    max-width: 200px;
    padding: 0 var(--kds-spacing-container-0-12x);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
