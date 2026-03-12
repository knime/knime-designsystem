<script lang="ts" setup>
import { computed, useId, useTemplateRef } from "vue";

import KdsLabel from "../_helper/KdsLabel.vue";
import KdsSubText from "../_helper/KdsSubText.vue";

import KdsRadioButton from "./KdsRadioButton.vue";
import type {
  KdsRadioButtonGroupOption,
  KdsRadioButtonGroupProps,
} from "./types";
import { useRadioSelection } from "./useRadioSelection";

const {
  disabled = false,
  alignment = "vertical",
  possibleValues,
  id,
  label,
  subText,
  preserveSubTextSpace,
} = defineProps<KdsRadioButtonGroupProps>();

const modelValue = defineModel<string>();

const options = computed(
  () =>
    possibleValues.map((o) => {
      if (typeof o === "string") {
        return { text: o, id: o };
      }
      return o;
    }) satisfies KdsRadioButtonGroupOption[],
);

const labelId = useId();
const descriptionId = useId();
const groupName = useId();

const optionContainer = useTemplateRef("optionContainer");

const { tabIndexForOption, handleClick, handleKeyDown, hasError } =
  useRadioSelection({
    selectedId: modelValue,
    options,
    globalDisable: computed(() => disabled),
    optionContainer,
  });
</script>

<template>
  <div
    :id="id"
    class="radio-button-group"
    role="radiogroup"
    :aria-labelledby="label ? labelId : undefined"
    :aria-describedby="subText ? descriptionId : undefined"
  >
    <KdsLabel v-if="label" :id="labelId" :label="label" />

    <div
      ref="optionContainer"
      :class="{ options: true, horizontal: alignment === 'horizontal' }"
    >
      <div v-for="(option, index) in options" :key="option.id" class="option">
        <KdsRadioButton
          :disabled="disabled || option.disabled"
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

    <KdsSubText
      :id="descriptionId"
      :sub-text="subText"
      :preserve-sub-text-space="preserveSubTextSpace"
      :error="hasError"
    />
  </div>
</template>

<style scoped>
.radio-button-group {
  padding: 0;
  margin: 0;
  border: none;
}

.options {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-75x);
}

.options.horizontal {
  flex-flow: row wrap;
  align-items: flex-start;
}
</style>
