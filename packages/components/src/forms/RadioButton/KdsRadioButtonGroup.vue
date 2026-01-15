<script lang="ts" setup>
import { computed, ref, useId } from "vue";

import KdsRadioButton from "./KdsRadioButton.vue";
import type {
  KdsRadioButtonGroupOption,
  KdsRadioButtonGroupProps,
} from "./types.ts";

const props = withDefaults(defineProps<KdsRadioButtonGroupProps>(), {
  disabled: false,
  alignment: "vertical",
});

const modelValue = defineModel<string | null | undefined>();

const possibleValues = computed(
  () =>
    props.possibleValues.map((o) => {
      if (typeof o === "string") {
        return { text: o, id: o };
      }
      return o;
    }) satisfies KdsRadioButtonGroupOption[],
);

const labelId = useId();
const descriptionId = useId();
const groupName = useId();

const optionContainerEls = ref<Array<HTMLElement | null>>([]);

const isOptionDisabled = (index: number) =>
  props.disabled || possibleValues.value[index]?.disabled === true;

const selectedIndex = computed(() =>
  possibleValues.value.findIndex((option) => option.id === modelValue.value),
);

const firstEnabledIndex = computed(() =>
  possibleValues.value.findIndex((_, index) => !isOptionDisabled(index)),
);

const isHorizontal = computed(() => props.alignment === "horizontal");

const anyOptionError = computed(() =>
  possibleValues.value.some((o) => o.error),
);

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
    class="radio-button-group"
    role="radiogroup"
    :aria-labelledby="props.label ? labelId : undefined"
    :aria-describedby="
      props.subText || props.preserveSubTextSpace ? descriptionId : undefined
    "
  >
    <div v-if="props.label" :id="labelId" class="label">
      {{ props.label }}
    </div>

    <div :class="{ options: true, horizontal: isHorizontal }">
      <div
        v-for="(option, index) in possibleValues"
        :key="option.id"
        :ref="(el) => (optionContainerEls[index] = el as HTMLElement | null)"
        class="option"
      >
        <KdsRadioButton
          :disabled="props.disabled || option.disabled"
          :error="option.error"
          :helper-text="option.helperText"
          :text="option.text"
          :model-value="modelValue === option.id"
          :tabindex="tabIndexForOption(index)"
          :name="groupName"
          @keydown="(e: KeyboardEvent) => handleKeyDown(e, index)"
          @update:model-value="() => selectIndex(index)"
        />
      </div>
    </div>

    <div
      v-if="props.subText || props.preserveSubTextSpace"
      :id="descriptionId"
      :class="{ subtext: true, error: anyOptionError }"
    >
      {{ props.subText }}
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

.radio-button-group {
  padding: 0;
  margin: 0;
  border: none;
}

.options {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-37x) var(--kds-spacing-container-0-75x);
}

.options.horizontal {
  flex-flow: row wrap;
  align-items: flex-start;
}

.subtext {
  min-height: 1lh;
  margin-top: var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);

  &.error {
    color: var(--kds-color-text-and-icon-danger);
  }
}
</style>
