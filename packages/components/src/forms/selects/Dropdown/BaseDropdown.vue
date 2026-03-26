<script setup lang="ts">
import { computed, useId } from "vue";

import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";
import ListItemAccessory from "../../_helper/List/ListItemAccessory/ListItemAccessory.vue";

import type { BaseDropdownProps } from "./types";

const {
  disabled = false,
  error = false,
  missing = false,
  ariaInvalid = undefined,
  ...props
} = defineProps<BaseDropdownProps>();

const open = defineModel<boolean>("open", { default: false });

const valueTextId = useId();

const ariaLabelledby = computed(() => {
  if (props.ariaLabel) {
    return undefined;
  }
  if (!props.ariaLabelledby) {
    return valueTextId;
  }
  return `${props.ariaLabelledby} ${valueTextId}`;
});

const effectiveAriaLabel = computed(() => {
  if (!props.ariaLabel) {
    return undefined;
  }
  const displayText = props.text ?? props.placeholder;
  return `${props.ariaLabel}, ${displayText}`;
});

const emit = defineEmits<{
  click: [];
  keydown: [event: KeyboardEvent];
}>();

const onKeydown = (event: KeyboardEvent) => {
  if (disabled) {
    return;
  }

  emit("keydown", event);

  switch (event.key) {
    case "ArrowDown":
    case "ArrowUp":
      event.preventDefault();
      if (!open.value) {
        open.value = true;
      }
      break;
  }
};
</script>

<template>
  <button
    :id="props.id"
    class="kds-dropdown-trigger-button"
    type="button"
    :aria-expanded="open"
    :aria-labelledby="ariaLabelledby"
    :aria-describedby="props.ariaDescribedby"
    :aria-label="effectiveAriaLabel"
    :aria-invalid="ariaInvalid"
    :aria-controls="props.popoverId"
    aria-haspopup="dialog"
    :disabled="disabled"
    :class="{ error }"
    @click="!disabled && emit('click')"
    @keydown="onKeydown"
  >
    <span v-if="props.accessory" class="leading" aria-hidden="true">
      <ListItemAccessory :accessory="props.accessory" size="medium" />
    </span>

    <span
      :id="valueTextId"
      class="text"
      :class="{
        placeholder: !props.text && !disabled,
        missing,
      }"
    >
      {{ props.text ?? props.placeholder }}
    </span>

    <span class="trailing" aria-hidden="true">
      <KdsIcon :name="open ? 'chevron-up' : 'chevron-down'" size="small" />
    </span>
  </button>
</template>

<style scoped>
.kds-dropdown-trigger-button {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0
    calc(var(--kds-spacing-container-0-25x) - var(--kds-core-border-width-xs));
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &.error {
    border: var(--kds-border-action-error);
  }

  &:disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;
    border: var(--kds-border-action-disabled);
    border-color: var(--kds-color-border-disabled);
  }

  &:not(:disabled, :focus):hover {
    background: var(--kds-color-background-input-hover);
  }
}

.leading {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: var(--kds-dimension-component-width-1x);
  height: var(--kds-dimension-component-width-1x);
  margin-left: var(--kds-spacing-container-0-12x);
}

.text {
  flex: 1 0 0;
  min-width: 0;
  padding: var(--kds-spacing-container-0-25x);
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;

  &.placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }

  &.missing {
    color: var(--kds-color-text-and-icon-danger);
  }
}

.trailing {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding-right: calc(
    var(--kds-spacing-container-0-12x) + 2 * var(--kds-core-border-width-xs)
  );
}
</style>
