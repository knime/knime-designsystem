<script lang="ts" setup>
import { computed, ref, useId } from "vue";

import KdsIcon from "../../Icon/KdsIcon.vue";

import type { KdsValueSwitchOption, KdsValueSwitchProps } from "./types.ts";

const props = withDefaults(defineProps<KdsValueSwitchProps>(), {
  disabled: false,
  size: "medium",
});

const modelValue = defineModel<string | null | undefined>();

const possibleValues = computed(
  () =>
    props.possibleValues.map((o) => {
      if (typeof o === "string") {
        return { text: o, id: o };
      }
      return o;
    }) satisfies KdsValueSwitchOption[],
);

const labelId = useId();
const descriptionId = useId();

const optionContainerEls = ref<Array<HTMLElement | null>>([]);

const isOptionDisabled = (index: number) =>
  props.disabled || possibleValues.value[index]?.disabled === true;

const selectedIndex = computed(() =>
  possibleValues.value.findIndex((option) => option.id === modelValue.value),
);

const firstEnabledIndex = computed(() =>
  possibleValues.value.findIndex((_, index) => !isOptionDisabled(index)),
);

const anyOptionHasError = computed(() =>
  possibleValues.value.some((o) => o.error),
);

const hasError = computed(() => props.error || anyOptionHasError.value);

const tabIndexForOption = (index: number) => {
  if (isOptionDisabled(index)) {
    return undefined;
  }

  if (selectedIndex.value >= 0) {
    return selectedIndex.value === index ? 0 : -1;
  }

  return firstEnabledIndex.value === index ? 0 : -1;
};

const focusOption = (index: number) => {
  const button = optionContainerEls.value[index]?.querySelector(
    'button[role="radio"]',
  ) as HTMLButtonElement | null;
  button?.focus();
};

const selectIndex = (index: number) => {
  if (isOptionDisabled(index)) {
    return;
  }
  modelValue.value = possibleValues.value[index].id;
};

const nextEnabledIndex = (startIndex: number, direction: 1 | -1) => {
  if (props.possibleValues.length === 0) {
    return -1;
  }

  let index = startIndex;
  for (let i = 0; i < props.possibleValues.length; i++) {
    index =
      (index + direction + props.possibleValues.length) %
      props.possibleValues.length;
    if (!isOptionDisabled(index)) {
      return index;
    }
  }

  return -1;
};

const moveSelection = (currentIndex: number, direction: 1 | -1) => {
  const nextIndex = nextEnabledIndex(currentIndex, direction);
  if (nextIndex >= 0) {
    selectIndex(nextIndex);
    focusOption(nextIndex);
  }
};

const goToFirstEnabled = () => {
  if (firstEnabledIndex.value >= 0) {
    selectIndex(firstEnabledIndex.value);
    focusOption(firstEnabledIndex.value);
  }
};

const goToLastEnabled = () => {
  for (let i = props.possibleValues.length - 1; i >= 0; i--) {
    if (!isOptionDisabled(i)) {
      selectIndex(i);
      focusOption(i);
      break;
    }
  }
};

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  if (props.disabled) {
    return;
  }

  switch (event.key) {
    case "ArrowDown":
    case "ArrowRight": {
      event.preventDefault();
      moveSelection(index, 1);
      return;
    }

    case "ArrowUp":
    case "ArrowLeft": {
      event.preventDefault();
      moveSelection(index, -1);
      return;
    }

    case "Home": {
      event.preventDefault();
      goToFirstEnabled();
      return;
    }

    case "End": {
      event.preventDefault();
      goToLastEnabled();
      return;
    }

    case " ":
    case "Enter": {
      event.preventDefault();
      selectIndex(index);
    }
  }
};
</script>

<template>
  <div
    :id="props.id"
    :class="{
      'value-switch': true,
      'size-small': props.size === 'small',
    }"
    role="radiogroup"
    :aria-invalid="hasError || undefined"
    :aria-labelledby="props.label ? labelId : undefined"
    :aria-describedby="props.subText ? descriptionId : undefined"
  >
    <div v-if="props.label" :id="labelId" class="label">
      {{ props.label }}
    </div>

    <div :class="{ options: true, error: hasError }">
      <button
        v-for="(option, index) in possibleValues"
        :key="option.id"
        :ref="(el) => (optionContainerEls[index] = el as HTMLElement | null)"
        :aria-checked="modelValue === option.id"
        :aria-invalid="option.error || undefined"
        :class="{
          option: true,
          selected: modelValue === option.id,
          disabled: props.disabled || option.disabled,
          error: option.error,
        }"
        :disabled="props.disabled || option.disabled"
        :tabindex="tabIndexForOption(index)"
        role="radio"
        type="button"
        @click="() => selectIndex(index)"
        @keydown="(e: KeyboardEvent) => handleKeyDown(e, index)"
      >
        <span class="option-label">{{ option.text }}</span>
        <span v-if="option.helperText" class="sr-only">{{
          option.helperText
        }}</span>
      </button>
    </div>

    <div
      v-if="props.subText || props.preserveSubTextSpace"
      :id="descriptionId"
      :class="{ subtext: true, error: hasError }"
    >
      <template v-if="hasError && props.subText">
        <KdsIcon class="subtext-icon" name="circle-error" size="small" />
      </template>
      <span class="subtext-text">{{ props.subText }}</span>
    </div>
  </div>
</template>

<style scoped>
.label {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  min-height: var(--kds-dimension-component-height-0-75x);
  padding-bottom: var(--kds-spacing-input-label-spacing-bottom);
  font: var(--kds-font-base-title-small-strong);
  color: var(--kds-color-text-and-icon-neutral);
}

.value-switch {
  padding: 0;
  margin: 0;
  border: none;

  --kds-value-switch-height: var(--kds-dimension-component-height-1-5x);
  --kds-value-switch-font: var(--kds-font-base-interactive-medium-strong);
  --kds-value-switch-padding-x: calc(
    var(--kds-spacing-container-0-37x) - var(--kds-core-border-width-xs)
  );

  &.size-small {
    --kds-value-switch-height: var(--kds-dimension-component-height-1-25x);
    --kds-value-switch-font: var(--kds-font-base-interactive-small-strong);
    --kds-value-switch-padding-x: calc(
      var(--kds-spacing-container-0-25x) - var(--kds-core-border-width-xs)
    );
  }
}

.options {
  display: flex;
  flex-flow: row wrap;
  gap: var(--kds-spacing-container-none);
  align-items: flex-start;
  padding: calc(
    var(--kds-spacing-container-0-12x) - var(--kds-core-border-width-xs)
  );
  background: var(--kds-color-surface-muted);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-fake-border-xs-muted);

  &:focus-within {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-44x);
  }

  &.error {
    background: var(--kds-color-background-danger-initial);
    border: var(--kds-border-action-error);
    box-shadow: none;
  }
}

.option {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--kds-value-switch-height);
  padding: 0 var(--kds-value-switch-padding-x);
  font: var(--kds-value-switch-font);
  color: var(--kds-color-text-and-icon-neutral);
  text-align: center;
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-25x);

  &:focus-visible {
    outline: none;
  }

  &:hover:not(:disabled) {
    background: var(--kds-color-background-neutral-hover);
  }

  &:active:not(:disabled) {
    background: var(--kds-color-background-neutral-active);
  }

  &.selected {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);
    border: var(--kds-border-action-selected);

    &:hover:not(:disabled) {
      background: var(--kds-color-background-selected-hover);
    }

    &:active:not(:disabled) {
      background: var(--kds-color-background-selected-active);
    }
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;
  }

  &.error {
    color: var(--kds-color-text-and-icon-danger);
    border: var(--kds-border-action-error);

    &:hover:not(:disabled) {
      background: var(--kds-color-background-danger-hover);
    }

    &:active:not(:disabled) {
      background: var(--kds-color-background-danger-active);
    }

    &.selected {
      background: var(--kds-color-background-danger-initial);

      &:hover:not(:disabled) {
        background: var(--kds-color-background-danger-hover);
      }

      &:active:not(:disabled) {
        background: var(--kds-color-background-danger-active);
      }
    }
  }
}

.subtext {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  min-height: var(--kds-dimension-component-height-0-75x);
  margin-top: var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);

  &.error {
    padding-top: var(--kds-spacing-sub-text-spacing-top);
    color: var(--kds-color-text-and-icon-danger);
  }
}

.subtext-icon {
  flex: none;
  width: var(--kds-dimension-component-width-0-75x);
  height: var(--kds-dimension-component-height-0-75x);
}

.subtext-text {
  font: inherit;
  color: currentcolor;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip-path: inset(50%);
}
</style>
