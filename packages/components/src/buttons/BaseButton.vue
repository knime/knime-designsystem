<script setup lang="ts">
import { type Component, computed } from "vue";

import KdsIcon from "../Icon/KdsIcon.vue";

import type { BaseButtonProps } from "./types";

type BaseButtonPropsWithComponent = BaseButtonProps & {
  component?: string | Component;
};

const props = withDefaults(defineProps<BaseButtonPropsWithComponent>(), {
  component: "button",
  size: "medium",
  destructive: false,
  success: false,
  error: false,
  disabled: false,
  toggled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const classes = computed(() => [
  "button",
  props.size,
  props.variant,
  { destructive: props.destructive },
  { disabled: props.disabled },
  { toggled: props.toggled },
  { success: props.success },
  { error: props.error },
]);

const iconSize = computed(() => {
  if (props.size === "xsmall") {
    return "small";
  } else {
    return props.size;
  }
});

function onClick(e: MouseEvent) {
  if (!props.disabled) {
    emit("click", e);
  }
}
</script>

<template>
  <Component
    :is="component"
    :class="classes"
    :disabled="props.disabled"
    :title="props.title"
    :aria-label="props.ariaLabel"
    @click="onClick($event)"
  >
    <slot name="leading">
      <KdsIcon
        v-if="props.leadingIcon"
        :name="props.leadingIcon"
        :size="iconSize"
      />
    </slot>
    <span v-if="props.label" class="label">{{ props.label }}</span>
    <KdsIcon
      v-if="props.trailingIcon && props.label"
      :name="props.trailingIcon"
      :size="iconSize"
    />
  </Component>
</template>

<style>
html.kds-legacy {
  --kds-legacy-button-border-radius: var(--kds-border-radius-container-pill);
}
</style>

<style scoped>
.button {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 15px;
  max-width: 100%;
  overflow: hidden;
  cursor: pointer;

  /* for LinkButton */
  &:is(a) {
    text-decoration: none;
  }

  &.disabled {
    cursor: default;
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &.filled {
    color: var(--kds-color-text-and-icon-primary-inverted);
    background-color: var(--kds-color-background-primary-bold-initial);
    border: var(--kds-border-action-transparent);

    &.disabled {
      color: var(--kds-color-text-and-icon-disabled-inverted);
      background-color: var(--kds-color-background-disabled-primary);
    }

    &:not(.disabled) {
      &:hover {
        background-color: var(--kds-color-background-primary-bold-hover);
      }

      &:active {
        background-color: var(--kds-color-background-primary-bold-active);
      }
    }

    &.destructive {
      color: var(--kds-color-text-and-icon-danger-inverted);
      background-color: var(--kds-color-background-danger-bold-initial);

      &.disabled {
        color: var(--kds-color-text-and-icon-disabled-inverted);
        background-color: var(--kds-color-background-disabled-danger);
      }

      &:not(.disabled) {
        &:hover {
          background-color: var(--kds-color-background-danger-bold-hover);
        }

        &:active {
          background-color: var(--kds-color-background-danger-bold-active);
        }
      }
    }
  }

  &.outlined {
    color: var(--kds-color-text-and-icon-neutral);
    background-color: var(--kds-color-background-neutral-initial);
    border: var(--kds-border-action-default);

    &.disabled {
      color: var(--kds-color-text-and-icon-disabled);
      border: var(--kds-border-action-disabled);
    }

    &:not(.disabled) {
      &:hover {
        background-color: var(--kds-color-background-neutral-hover);
      }

      &:active {
        background-color: var(--kds-color-background-neutral-active);
      }
    }

    &.destructive {
      color: var(--kds-color-text-and-icon-danger);
      border: var(--kds-border-action-error);

      &.disabled {
        color: var(--kds-color-text-and-icon-disabled);
        border: var(--kds-border-action-disabled);
      }

      &:not(.disabled) {
        &:hover {
          background-color: var(--kds-color-background-danger-hover);
        }

        &:active {
          background-color: var(--kds-color-background-danger-active);
        }
      }
    }
  }

  &.transparent {
    color: var(--kds-color-text-and-icon-neutral);
    background-color: var(--kds-color-background-neutral-initial);
    border: var(--kds-border-action-transparent);

    &.disabled {
      color: var(--kds-color-text-and-icon-disabled);
    }

    &:not(.disabled) {
      &:hover {
        background-color: var(--kds-color-background-neutral-hover);
      }

      &:active {
        background-color: var(--kds-color-background-neutral-active);
      }
    }

    &.destructive {
      color: var(--kds-color-text-and-icon-danger);

      &.disabled {
        color: var(--kds-color-text-and-icon-disabled);
      }

      &:not(.disabled) {
        &:hover {
          background-color: var(--kds-color-background-danger-hover);
        }

        &:active {
          background-color: var(--kds-color-background-danger-active);
        }
      }
    }
  }

  &.toggled {
    color: var(--kds-color-text-and-icon-selected);
    background-color: var(--kds-color-background-selected-initial);
    border: var(--kds-border-action-selected);

    &.disabled {
      color: var(--kds-color-text-and-icon-disabled);
    }

    &:not(.disabled) {
      &:hover {
        background-color: var(--kds-color-background-selected-hover);
      }

      &:active {
        background-color: var(--kds-color-background-selected-active);
      }
    }
  }

  & .label {
    max-width: 200px;
    padding: 0 var(--kds-spacing-container-0-12x);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-rendering: geometricprecision;
  }

  &.xsmall {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-25x);
    padding: 0
      calc(var(--kds-spacing-container-0-25x) - var(--kds-core-border-width-xs)); /* needed as border in Figma is not increasing the width */

    font: var(--kds-font-base-interactive-xsmall-strong);
    border-radius: var(
      --kds-legacy-button-border-radius,
      var(--kds-border-radius-container-0-25x)
    );
  }

  &.small {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-5x);
    padding: 0
      calc(var(--kds-spacing-container-0-37x) - var(--kds-core-border-width-xs)); /* needed as border in Figma is not increasing the width */

    font: var(--kds-font-base-interactive-small-strong);
    border-radius: var(
      --kds-legacy-button-border-radius,
      var(--kds-border-radius-container-0-37x)
    );
  }

  &.medium {
    gap: var(--kds-spacing-container-0-25x);
    height: var(--kds-dimension-component-height-1-75x);
    padding: 0
      calc(var(--kds-spacing-container-0-37x) - var(--kds-core-border-width-xs)); /* needed as border in Figma is not increasing the width */

    font: var(--kds-font-base-interactive-medium-strong);
    border-radius: var(
      --kds-legacy-button-border-radius,
      var(--kds-border-radius-container-0-37x)
    );
  }

  &.large {
    gap: var(--kds-spacing-container-0-25x);
    height: var(--kds-dimension-component-height-2-25x);
    padding: 0
      calc(var(--kds-spacing-container-0-5x) - var(--kds-core-border-width-xs)); /* needed as border in Figma is not increasing the width */

    font: var(--kds-font-base-interactive-large-strong);
    border-radius: var(
      --kds-legacy-button-border-radius,
      var(--kds-border-radius-container-0-50x)
    );

    & .label {
      padding: 0 var(--kds-spacing-container-0-25x);
    }
  }

  &.success {
    color: var(--kds-color-text-and-icon-success-inverted);
    background-color: var(--kds-color-background-success-bold-initial);
    border: var(--kds-border-action-transparent);
  }

  &.error {
    color: var(--kds-color-text-and-icon-danger-inverted);
    background-color: var(--kds-color-background-danger-bold-initial);
    border: var(--kds-border-action-transparent);
  }
}
</style>
