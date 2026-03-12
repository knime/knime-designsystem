<script lang="ts" setup>
import { computed, useId } from "vue";

import KdsLabel from "../_helper/KdsLabel.vue";
import KdsSubText from "../_helper/KdsSubText.vue";

import BaseCheckbox from "./BaseCheckbox.vue";
import type {
  KdsCheckboxGroupOption,
  KdsCheckboxGroupProps,
  KdsCheckboxValue,
} from "./types";

const {
  disabled = false,
  error = false,
  alignment = "vertical",
  possibleValues: possibleValuesProp,
  label,
  subText,
  id,
  preserveSubTextSpace,
} = defineProps<KdsCheckboxGroupProps>();

const modelValue = defineModel<string[]>({ default: [] });

const possibleValues = computed(
  () =>
    possibleValuesProp.map((o) => {
      if (typeof o === "string") {
        return { text: o, id: o };
      }
      return o;
    }) satisfies KdsCheckboxGroupOption[],
);

const labelId = useId();
const descriptionId = useId();

const isOptionDisabled = (index: number) =>
  disabled || possibleValues.value[index]?.disabled === true;

const isHorizontal = computed(() => alignment === "horizontal");

const hasError = computed(
  () => error || possibleValues.value.some((o) => o.error),
);

const isChecked = (id: string) => modelValue.value.includes(id);

const handleCheckboxChange = (index: number, checked: KdsCheckboxValue) => {
  if (isOptionDisabled(index)) {
    return;
  }
  const option = possibleValues.value[index];

  if (checked === true) {
    modelValue.value = [...modelValue.value, option.id];
    return;
  }

  modelValue.value = modelValue.value.filter((v) => v !== option.id);
};
</script>

<template>
  <div
    :id="id"
    class="checkbox-group"
    role="group"
    :aria-labelledby="label ? labelId : undefined"
    :aria-describedby="subText ? descriptionId : undefined"
  >
    <KdsLabel v-if="label" :id="labelId" :label="label" />

    <div :class="{ options: true, horizontal: isHorizontal }">
      <div
        v-for="(option, index) in possibleValues"
        :key="option.id"
        class="option"
      >
        <BaseCheckbox
          :disabled="disabled || option.disabled"
          :error="option.error"
          :helper-text="option.helperText"
          :label="option.text"
          :model-value="isChecked(option.id)"
          @update:model-value="
            (checked: KdsCheckboxValue) => handleCheckboxChange(index, checked)
          "
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
.checkbox-group {
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
