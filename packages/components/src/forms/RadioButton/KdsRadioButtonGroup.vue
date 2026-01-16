<script lang="ts" setup>
import { computed, ref, useId } from "vue";

import KdsRadioButton from "./KdsRadioButton.vue";
import type {
  KdsRadioButtonGroupOption,
  KdsRadioButtonGroupProps,
} from "./types.ts";
import { useRadioSelection } from "./useRadioSelection.ts";

const props = withDefaults(defineProps<KdsRadioButtonGroupProps>(), {
  disabled: false,
  alignment: "vertical",
});

const modelValue = defineModel<string | null | undefined>();

const options = computed(
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

const optionContainer = ref<HTMLElement | null>(null);

const { tabIndexForOption, handleClick, handleKeyDown, hasError } =
  useRadioSelection({
    selectedId: modelValue,
    options,
    globalDisable: computed(() => props.disabled),
    optionContainer,
  });
</script>

<template>
  <div
    :id="props.id"
    class="radio-button-group"
    role="radiogroup"
    :aria-labelledby="props.label ? labelId : undefined"
    :aria-describedby="props.subText ? descriptionId : undefined"
  >
    <div v-if="props.label" :id="labelId" class="label">
      {{ props.label }}
    </div>

    <div
      ref="optionContainer"
      :class="{ options: true, horizontal: props.alignment === 'horizontal' }"
    >
      <div v-for="(option, index) in options" :key="option.id" class="option">
        <KdsRadioButton
          :disabled="props.disabled || option.disabled"
          :error="option.error"
          :helper-text="option.helperText"
          :text="option.text"
          :model-value="modelValue === option.id"
          :tabindex="tabIndexForOption(index)"
          :name="groupName"
          @keydown="(e: KeyboardEvent) => handleKeyDown(e, index)"
          @update:model-value="() => handleClick(index)"
        />
      </div>
    </div>

    <div
      v-if="props.subText || props.preserveSubTextSpace"
      :id="descriptionId"
      :class="{ subtext: true, error: hasError }"
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
