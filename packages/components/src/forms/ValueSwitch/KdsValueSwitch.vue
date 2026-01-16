<script lang="ts" setup>
import { computed, ref, useId } from "vue";

import KdsIcon from "../../Icon/KdsIcon.vue";

import ValueSwitchItem from "./ValueSwitchItem.vue";
import type { KdsValueSwitchOption, KdsValueSwitchProps } from "./types.ts";

const props = withDefaults(defineProps<KdsValueSwitchProps>(), {
  disabled: false,
  size: "medium",
  variant: "default",
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

const optionsEl = ref<HTMLElement | null>(null);

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
  const radios = optionsEl.value?.querySelectorAll<HTMLButtonElement>(
    'button[role="radio"]',
  );
  radios?.[index]?.focus();
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
    role="radiogroup"
    :class="{
      'value-switch': true,
      'size-small': props.size === 'small',
    }"
    :aria-invalid="hasError || undefined"
    :aria-labelledby="props.label ? labelId : undefined"
    :aria-describedby="props.subText ? descriptionId : undefined"
  >
    <div v-if="props.label" :id="labelId" class="label">
      {{ props.label }}
    </div>

    <div ref="optionsEl" :class="{ options: true, error: hasError }">
      <ValueSwitchItem
        v-for="(option, index) in possibleValues"
        :key="option.id"
        v-bind="option"
        :selected="modelValue === option.id"
        :disabled="props.disabled"
        :size="props.size"
        :variant="props.variant"
        :tab-index="tabIndexForOption(index)"
        @click="() => selectIndex(index)"
        @keydown="(e: KeyboardEvent) => handleKeyDown(e, index)"
      />
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
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
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
  display: inline-flex;
  flex-flow: row wrap;
  gap: var(--kds-spacing-container-none);
  align-items: flex-start;
  width: fit-content;
  padding: var(--kds-spacing-container-0-12x);
  background: var(--kds-color-surface-muted);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-fake-border-xs-muted);

  &:focus-within:has(:focus-visible) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-44x);
  }

  &.error {
    border: var(--kds-border-action-error);
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
</style>
