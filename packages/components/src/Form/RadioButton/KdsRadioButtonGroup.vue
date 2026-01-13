<script lang="ts" setup>
import { computed, useId } from "vue";

import KdsIcon from "../../Icon/KdsIcon.vue";

import KdsRadioButton from "./KdsRadioButton.vue";
import type {
  KdsRadioButtonGroupProps,
  KdsRadioButtonGroupValue,
} from "./types.ts";

const props = withDefaults(defineProps<KdsRadioButtonGroupProps>(), {
  disabled: false,
  error: false,
  modelValue: null,
  alignment: "vertical",
});

const modelValue = computed(() => props.modelValue ?? null);

const emit = defineEmits<{
  /**
   * Emitted when the radio selection changes
   */
  "update:modelValue": [value: KdsRadioButtonGroupValue | null];
}>();

const legendId = useId();

const optionContainerEls: Array<HTMLElement | null> = [];

const isOptionDisabled = (index: number) =>
  props.disabled || props.options[index]?.disabled === true;

const selectedIndex = computed(() =>
  props.options.findIndex((option) => option.value === modelValue.value),
);

const firstEnabledIndex = computed(() =>
  props.options.findIndex((_, index) => !isOptionDisabled(index)),
);

const isHorizontal = computed(() => props.alignment === "horizontal");

const anyOptionError = computed(() => props.options.some((o) => o.error));

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
  const button = optionContainerEls[index]?.querySelector(
    'button[role="radio"]',
  ) as HTMLButtonElement | null;
  button?.focus();
};

const selectIndex = (index: number) => {
  if (isOptionDisabled(index)) {
    return;
  }
  emit("update:modelValue", props.options[index].value);
};

const nextEnabledIndex = (startIndex: number, direction: 1 | -1) => {
  if (props.options.length === 0) {
    return -1;
  }

  let index = startIndex;
  for (let i = 0; i < props.options.length; i++) {
    index = (index + direction + props.options.length) % props.options.length;
    if (!isOptionDisabled(index)) {
      return index;
    }
  }

  return -1;
};

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  if (props.disabled) {
    return;
  }

  const key = event.key;

  if (
    key === "ArrowDown" ||
    key === "ArrowUp" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "Home" ||
    key === "End"
  ) {
    event.preventDefault();
  }

  if (key === "ArrowDown" || key === "ArrowRight") {
    const nextIndex = nextEnabledIndex(index, 1);
    if (nextIndex >= 0) {
      selectIndex(nextIndex);
      focusOption(nextIndex);
    }
    return;
  }

  if (key === "ArrowUp" || key === "ArrowLeft") {
    const nextIndex = nextEnabledIndex(index, -1);
    if (nextIndex >= 0) {
      selectIndex(nextIndex);
      focusOption(nextIndex);
    }
    return;
  }

  if (key === "Home") {
    if (firstEnabledIndex.value >= 0) {
      selectIndex(firstEnabledIndex.value);
      focusOption(firstEnabledIndex.value);
    }
    return;
  }

  if (key === "End") {
    for (let i = props.options.length - 1; i >= 0; i--) {
      if (!isOptionDisabled(i)) {
        selectIndex(i);
        focusOption(i);
        break;
      }
    }
    return;
  }

  if (key === " " || key === "Enter") {
    event.preventDefault();
    selectIndex(index);
  }
};
</script>

<template>
  <fieldset
    :disabled="props.disabled"
    class="radio-button-group"
    :aria-describedby="props.subText ? legendId + '-subtext' : undefined"
  >
    <legend v-if="props.label" :id="legendId">
      {{ props.label }}
      <span
        v-if="props.labelTrailingIcon"
        :title="props.labelTrailingIconTitle"
        class="icon-wrapper"
      >
        <KdsIcon :name="props.labelTrailingIcon" size="xsmall" />
      </span>
    </legend>

    <div :class="{ options: true, horizontal: isHorizontal }" role="radiogroup">
      <div
        v-for="(option, index) in props.options"
        :key="option.value"
        :ref="(el) => (optionContainerEls[index] = el as HTMLElement | null)"
        class="option"
      >
        <KdsRadioButton
          :disabled="props.disabled || option.disabled"
          :error="option.error"
          :helper-text="option.subText"
          :label="option.label"
          :model-value="modelValue === option.value"
          :tabindex="tabIndexForOption(index)"
          :title="option.title"
          @keydown="(e: KeyboardEvent) => handleKeyDown(e, index)"
          @update:model-value="() => selectIndex(index)"
        />
      </div>
    </div>

    <div
      v-if="props.subText"
      :id="legendId + '-subtext'"
      :class="{ subtext: true, error: anyOptionError }"
    >
      {{ props.subText }}
    </div>
  </fieldset>
</template>

<style scoped>
legend {
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  min-height: var(--kds-dimension-component-height-0-75x);
  padding-bottom: var(--kds-spacing-input-label-spacing-bottom);
  font: var(--kds-font-base-title-small-strong);
  color: var(--kds-color-text-and-icon-neutral);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
}

.radio-button-group {
  padding: 0;
  margin: 0;
  border: none;
}

.options {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
}

.options.horizontal {
  flex-flow: row wrap;
  align-items: flex-start;
}

.option {
  display: flex;
}

.subtext {
  margin-top: var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);

  &.error {
    color: var(--kds-color-text-and-icon-danger);
  }
}
</style>
