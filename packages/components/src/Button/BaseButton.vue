<script lang="ts">
export const variants = ["filled", "outlined", "transparent"] as const;
export type Variant = (typeof variants)[number];
</script>

<script setup lang="ts" generic="UNUSED">
import { type Component, computed } from "vue";

import type { IconName } from "@knime/kds-styles/img/icons/def";

import Icon from "../Icon/Icon.vue";
import type { Size } from "../types";

export type BaseButtonProps =
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

type BaseButtonPropsWithComponent = BaseButtonProps & {
  component?: string | Component;
};

const props = withDefaults(defineProps<BaseButtonPropsWithComponent>(), {
  component: "button",
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
  props.size,
  props.variant,
  { destructive: props.destructive },
  { disabled: props.disabled },
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
    @click="onClick($event)"
  >
    <template v-if="props.label">
      <Icon
        v-if="props.leadingIcon"
        aria-hidden="true"
        :name="props.leadingIcon"
        :size="iconSize"
      />
      <span class="label">{{ props.label }}</span>
      <Icon
        v-if="props.trailingIcon"
        aria-hidden="true"
        :name="props.trailingIcon"
        :size="iconSize"
      />
    </template>
    <Icon
      v-else-if="props.icon"
      aria-hidden="true"
      :name="props.icon"
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
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-focus-outline-offset);
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
      calc(var(--kds-spacing-container-0-25x) - var(--kds-border-width-base-s)); /* needed as border in Figma is not increasing the width */

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
      calc(var(--kds-spacing-container-0-37x) - var(--kds-border-width-base-s)); /* needed as border in Figma is not increasing the width */

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
      calc(var(--kds-spacing-container-0-37x) - var(--kds-border-width-base-s)); /* needed as border in Figma is not increasing the width */

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
      calc(var(--kds-spacing-container-0-5x) - var(--kds-border-width-base-s)); /* needed as border in Figma is not increasing the width */

    font: var(--kds-font-base-interactive-large-strong);
    border-radius: var(
      --kds-legacy-button-border-radius,
      var(--kds-border-radius-container-0-50x)
    );

    & .label {
      padding: 0 var(--kds-spacing-container-0-25x);
    }
  }
}
</style>
