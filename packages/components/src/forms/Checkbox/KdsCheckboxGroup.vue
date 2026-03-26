<script lang="ts" setup>
import { computed } from "vue";

import BaseFieldsetWrapper from "../_helper/BaseFieldsetWrapper.vue";

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
  ...props
} = defineProps<KdsCheckboxGroupProps>();

const modelValue = defineModel<string[]>({ default: [] });

const possibleValues = computed(
  () =>
    props.possibleValues.map((o) => {
      if (typeof o === "string") {
        return { text: o, id: o };
      }
      return o;
    }) satisfies KdsCheckboxGroupOption[],
);

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
  <BaseFieldsetWrapper
    :id="props.id"
    :label="props.label"
    :sub-text="props.subText"
    :preserve-sub-text-space="props.preserveSubTextSpace"
    :error="hasError"
  >
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
  </BaseFieldsetWrapper>
</template>

<style scoped>
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
