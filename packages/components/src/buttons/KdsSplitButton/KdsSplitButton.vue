<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import KdsPopover from "../../overlays/Popover/KdsPopover.vue";
import BaseButton from "../BaseButton.vue";

import type {
  KdsSplitButtonAlternativeAction,
  KdsSplitButtonProps,
} from "./types";

const props = withDefaults(defineProps<KdsSplitButtonProps>(), {
  variant: "filled",
  size: "medium",
  alternativeActions: () => [],
});

const emit = defineEmits<{
  "click:primary": [event: MouseEvent];
  "click:secondary": [event: MouseEvent];
  "click:alternative": [
    action: KdsSplitButtonAlternativeAction,
    event: MouseEvent,
  ];
}>();

const contextMenuOpen = ref(false);
const popoverEl = useTemplateRef("popoverEl");

const hasAlternativeActions = computed(
  () => props.alternativeActions?.some((action) => !action.disabled) ?? false,
);

const buttonClasses = computed(() => ({
  "kds-split-button": true,
  [props.variant]: true,
  [props.size]: true,
  disabled: props.disabled,
}));

const primaryButtonClasses = computed(() => ({
  "kds-split-button-primary": true,
  [props.variant]: true,
}));

function handlePrimaryClick(e: MouseEvent) {
  if (!props.disabled) {
    contextMenuOpen.value = false;
    emit("click:primary", e);
  }
}

function handleSecondaryClick(e: MouseEvent) {
  if (!props.disabled) {
    emit("click:secondary", e);
    if (hasAlternativeActions.value) {
      contextMenuOpen.value = !contextMenuOpen.value;
    }
  }
}

function handleAlternativeClick(
  action: KdsSplitButtonAlternativeAction,
  e: MouseEvent,
) {
  if (action.disabled || props.disabled) {
    return;
  }

  contextMenuOpen.value = false;
  emit("click:alternative", action, e);
}
</script>

<template>
  <div :class="buttonClasses">
    <BaseButton
      :class="primaryButtonClasses"
      :size="props.size"
      :variant="props.variant"
      :disabled="props.disabled"
      :title="props.title"
      :label="props.label"
      :leading-icon="props.leadingIcon"
      :aria-label="props.primaryAriaLabel"
      @click="handlePrimaryClick"
    />

    <div
      class="kds-split-button-secondary-anchor"
      :style="popoverEl?.anchorStyle"
    >
      <BaseButton
        :class="'kds-split-button-secondary'"
        :size="props.size"
        :variant="props.variant"
        :leading-icon="'chevron-down'"
        :disabled="props.disabled"
        :aria-label="props.secondaryAriaLabel || 'Open alternative actions'"
        @click="handleSecondaryClick"
      />
    </div>

    <KdsPopover
      v-if="hasAlternativeActions"
      ref="popoverEl"
      v-model="contextMenuOpen"
      role="menu"
      placement="bottom-right"
      :popover-aria-label="props.contextMenuAriaLabel || 'Alternative actions'"
    >
      <ul class="kds-split-button-context-menu" role="menu">
        <li
          v-for="action in props.alternativeActions"
          :key="action.id"
          class="kds-split-button-context-menu-item"
        >
          <button
            type="button"
            class="kds-split-button-context-menu-button"
            role="menuitem"
            :aria-label="action.ariaLabel || action.label"
            :disabled="action.disabled"
            @click="handleAlternativeClick(action, $event)"
          >
            <KdsIcon
              v-if="action.leadingIcon"
              :name="action.leadingIcon"
              size="small"
            />
            <span class="kds-split-button-context-menu-label">
              {{ action.label }}
            </span>
          </button>
        </li>
      </ul>
    </KdsPopover>
  </div>
</template>

<style scoped>
.kds-split-button {
  display: flex;

  &.filled {
    gap: var(--kds-spacing-container-0-10x);
  }

  &.outlined {
    gap: var(--kds-spacing-container-none);
  }

  &.disabled {
    cursor: default;
  }
}

.kds-split-button-primary {
  &.outlined {
    border-top-right-radius: var(--kds-border-radius-container-none);
    border-bottom-right-radius: var(--kds-border-radius-container-none);
  }
}

.kds-split-button-secondary-anchor {
  display: flex;
}

.kds-split-button-context-menu {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-12x);
  padding: var(--kds-spacing-container-0-25x);
  margin: 0;
  list-style: none;
  background: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);
}

.kds-split-button-context-menu-item {
  display: flex;
}

.kds-split-button-context-menu-button {
  display: inline-flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  width: 100%;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding: 0 var(--kds-spacing-container-0-5x);
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-25x);

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &:disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;
  }

  &:hover:not(:disabled) {
    background: var(--kds-color-background-neutral-hover);
  }

  &:active:not(:disabled) {
    background: var(--kds-color-background-neutral-active);
  }
}

.kds-split-button-context-menu-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Size-specific styling */
.kds-split-button.xsmall {
  .kds-split-button-primary {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-25x);
    padding-right: var(--kds-spacing-container-0-25x);
    padding-left: var(--kds-spacing-container-0-25x);
    font: var(--kds-font-base-interactive-xsmall-strong);
    border-radius: var(--kds-border-radius-container-0-25x)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-25x);
  }

  .kds-split-button-secondary {
    gap: var(--kds-spacing-container-none);
    width: var(--kds-dimension-component-height-1-25x) !important;
    height: var(--kds-dimension-component-height-1-25x);
    border-radius: var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-25x)
      var(--kds-border-radius-container-0-25x)
      var(--kds-border-radius-container-none);
  }
}

.kds-split-button.small {
  .kds-split-button-primary {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-5x);
    padding-right: var(--kds-spacing-container-0-37x);
    padding-left: var(--kds-spacing-container-0-37x);
    font: var(--kds-font-base-interactive-small-strong);
    border-radius: var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-37x);
  }

  .kds-split-button-secondary {
    gap: var(--kds-spacing-container-none);
    width: var(--kds-dimension-component-height-1-5x) !important;
    height: var(--kds-dimension-component-height-1-5x);
    border-radius: var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-none);
  }
}

.kds-split-button.medium {
  .kds-split-button-primary {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-75x);
    padding-right: var(--kds-spacing-container-0-37x);
    padding-left: var(--kds-spacing-container-0-37x);
    font: var(--kds-font-base-interactive-medium-strong);
    border-radius: var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-37x);
  }

  .kds-split-button-secondary {
    gap: var(--kds-spacing-container-none);
    width: var(--kds-dimension-component-height-1-75x) !important;
    height: var(--kds-dimension-component-height-1-75x);
    border-radius: var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-0-37x)
      var(--kds-border-radius-container-none);
  }
}

.kds-split-button.large {
  .kds-split-button-primary {
    gap: var(--kds-spacing-container-none);
    height: var(--kds-dimension-component-height-2-25x);
    padding-right: var(--kds-spacing-container-0-5x);
    padding-left: var(--kds-spacing-container-0-5x);
    font: var(--kds-font-base-interactive-large-strong);
    border-radius: var(--kds-border-radius-container-0-50x)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-50x);
  }

  .kds-split-button-secondary {
    gap: var(--kds-spacing-container-none);
    width: var(--kds-dimension-component-height-2-25x) !important;
    height: var(--kds-dimension-component-height-2-25x);
    border-radius: var(--kds-border-radius-container-none)
      var(--kds-border-radius-container-0-50x)
      var(--kds-border-radius-container-0-50x)
      var(--kds-border-radius-container-none);

    /* background-color: var(--kds-color-background-primary-bold-initial); LOOK AGAIN */
  }
}
</style>
