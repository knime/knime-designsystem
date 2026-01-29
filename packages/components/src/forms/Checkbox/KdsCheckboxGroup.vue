<script lang="ts" setup>
import { computed, useId } from "vue";

import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import BaseCheckbox from "./BaseCheckbox.vue";
import type {
  KdsCheckboxGroupOption,
  KdsCheckboxGroupProps,
  KdsCheckboxValue,
} from "./types";

const props = withDefaults(defineProps<KdsCheckboxGroupProps>(), {
  disabled: false,
  alignment: "vertical",
});

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

const labelId = useId();
const descriptionId = useId();

const isOptionDisabled = (index: number) =>
  props.disabled || possibleValues.value[index]?.disabled === true;

const isHorizontal = computed(() => props.alignment === "horizontal");

const anyOptionHasError = computed(() =>
  possibleValues.value.some((o) => o.error),
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
    :id="props.id"
    class="checkbox-group"
    role="group"
    :aria-labelledby="props.label ? labelId : undefined"
    :aria-describedby="props.subText ? descriptionId : undefined"
  >
    <KdsLabel v-if="props.label" :id="labelId" :label="props.label" />

    <div :class="{ options: true, horizontal: isHorizontal }">
      <div
        v-for="(option, index) in possibleValues"
        :key="option.id"
        class="option"
      >
        <BaseCheckbox
          :disabled="props.disabled || option.disabled"
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
      :sub-text="props.subText"
      :preserve-sub-text-space="props.preserveSubTextSpace"
      :error="anyOptionHasError"
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
