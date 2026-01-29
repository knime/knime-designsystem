<script setup lang="ts">
import { computed, useId } from "vue";

import Icon from "../../Icon/KdsIcon.vue";
import KdsSubText from "../KdsSubText.vue";

import type { BaseCheckboxProps, KdsCheckboxValue } from "./types";

const props = withDefaults(defineProps<BaseCheckboxProps>(), {
  disabled: false,
  error: false,
});

const modelValue = defineModel<KdsCheckboxValue>({ default: false });

const helperId = useId();
const descriptionId = useId();

const isChecked = computed(() => modelValue.value === true);
const isIndeterminate = computed(() => modelValue.value === "indeterminate");
const icon = computed(() => {
  if (isChecked.value) {
    return "checkmark";
  }
  if (isIndeterminate.value) {
    return "minus";
  }
  return null;
});

const ariaChecked = computed(() => {
  if (isIndeterminate.value) {
    return "mixed";
  }
  return isChecked.value;
});

const ariaDescribedBy = computed(() => {
  const ids: string[] = [];

  if (props.helperText) {
    ids.push(helperId);
  }

  if (props.subText) {
    ids.push(descriptionId);
  }

  return ids.length > 0 ? ids.join(" ") : undefined;
});

const handleClick = () => {
  if (props.disabled) {
    return;
  }

  modelValue.value = isIndeterminate.value ? true : !isChecked.value;
};
</script>

<template>
  <div>
    <button
      :class="{
        checkbox: true,
        checked: isChecked,
        indeterminate: isIndeterminate,
        disabled: props.disabled,
        error: props.error,
      }"
      :disabled="props.disabled"
      :title="props.title"
      :aria-label="props.title"
      :aria-checked="ariaChecked"
      :aria-describedby="ariaDescribedBy"
      :aria-invalid="props.error"
      type="button"
      role="checkbox"
      @click="handleClick"
    >
      <div class="control">
        <Icon v-if="icon" :name="icon" class="icon" size="xsmall" />
      </div>
      <div v-if="props.label || props.helperText" class="content">
        <div class="label">{{ props.label }}</div>
        <div v-if="props.helperText" :id="helperId" class="helper-text">
          {{ props.helperText }}
        </div>
      </div>
    </button>
    <div class="subtext-wrapper">
      <KdsSubText
        :id="descriptionId"
        :sub-text="props.subText"
        :preserve-sub-text-space="props.preserveSubTextSpace"
        :error="props.error"
      />
    </div>
  </div>
</template>

<style scoped>
.checkbox {
  --bg-initial: var(--kds-color-background-input-initial);
  --bg-hover: var(--kds-color-background-input-hover);
  --bg-active: var(--kds-color-background-input-active);
  --border: var(--kds-border-action-input);
  --icon-color: var(--kds-color-text-and-icon-selected);
  --text-color: var(--kds-color-text-and-icon-neutral);
  --helper-text-color: var(--kds-color-text-and-icon-muted);

  display: flex;
  gap: var(--kds-spacing-container-0-37x);
  align-items: flex-start;
  padding: 0;
  margin: 0;
  text-align: left;
  cursor: pointer;
  outline: none;
  background: none;
  border: none;

  .control {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: var(--kds-dimension-component-height-0-88x);
    height: var(--kds-dimension-component-height-0-88x);
    color: var(--icon-color);
    background: var(--bg-initial);
    border: var(--border);
    border-radius: var(--kds-border-radius-container-0-25x);
  }

  &:focus-visible .control {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &:hover:not(.disabled) .control {
    background: var(--bg-hover);
  }

  &:active:not(.disabled) .control {
    background: var(--bg-active);
  }

  &.checked,
  &.indeterminate {
    --bg-initial: var(--kds-color-background-selected-initial);
    --bg-hover: var(--kds-color-background-selected-hover);
    --bg-active: var(--kds-color-background-selected-active);
    --border: var(--kds-border-action-selected);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: var(--kds-spacing-container-0-12x);
    text-rendering: geometricprecision;

    & .label {
      padding-top: var(--kds-spacing-container-0-10x);
      font: var(--kds-font-base-interactive-small);
      color: var(--text-color);
    }

    & .helper-text {
      font: var(--kds-font-base-subtext-small);
      color: var(--helper-text-color);
    }
  }

  &.disabled {
    --border: var(--kds-border-action-disabled);
    --icon-color: var(--kds-color-text-and-icon-disabled);
    --text-color: var(--kds-color-text-and-icon-disabled);
    --helper-text-color: var(--kds-color-text-and-icon-disabled);

    cursor: default;
  }

  &.error {
    --border: var(--kds-border-action-error);
    --icon-color: var(--kds-color-text-and-icon-danger);
    --text-color: var(--kds-color-text-and-icon-danger);
    --bg-hover: var(--kds-color-background-danger-hover);
    --bg-active: var(--kds-color-background-danger-active);

    &.checked,
    &.indeterminate {
      --bg-initial: var(--kds-color-background-danger-initial);
    }
  }
}

.subtext-wrapper {
  padding-left: calc(
    var(--kds-dimension-component-height-0-88x) +
      var(--kds-spacing-container-0-37x)
  );
}
</style>
