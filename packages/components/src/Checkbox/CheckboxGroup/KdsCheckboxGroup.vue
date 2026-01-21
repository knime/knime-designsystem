<script lang="ts" setup>
import { computed, ref, useId } from "vue";

import KdsCheckbox from "../KdsCheckbox.vue";

import type { KdsCheckboxGroupOption, KdsCheckboxGroupProps } from "./types.ts";

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

const optionContainerEls = ref<Array<HTMLElement | null>>([]);

const isOptionDisabled = (index: number) =>
  props.disabled || possibleValues.value[index]?.disabled === true;

const isHorizontal = computed(() => props.alignment === "horizontal");

const anyOptionHasError = computed(() =>
  possibleValues.value.some((o) => o.error),
);

const isChecked = (id: string) => modelValue.value.includes(id);

const handleCheckboxChange = (index: number, checked: boolean) => {
  if (isOptionDisabled(index)) {
    return;
  }
  const option = possibleValues.value[index];
  if (checked) {
    if (!isChecked(option.id)) {
      modelValue.value = [...modelValue.value, option.id];
    }
  } else {
    modelValue.value = modelValue.value.filter((v) => v !== option.id);
  }
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
        <KdsCheckbox
          :disabled="props.disabled || option.disabled"
          :error="option.error"
          :helper-text="option.helperText"
          :label="option.text"
          :model-value="isChecked(option.id)"
          @update:model-value="
            (checked: boolean) => handleCheckboxChange(index, checked)
          "
        />
      </div>
    </div>

    <div
      v-if="props.subText || props.preserveSubTextSpace"
      :id="descriptionId"
      :class="{ subtext: true, error: anyOptionHasError }"
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

.checkbox-group {
  padding: 0;
  margin: 0;
  border: none;
}

.options {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
  padding: var(--kds-spacing-container-0-25x) 0;
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
