<script setup lang="ts">
import { computed } from "vue";

import Checkbox from "../Checkbox/Checkbox.vue";
import InputLabel from "../InputLabel/InputLabel.vue";
import ListContainer from "../ListContainer/ListContainer.vue";

type CheckboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
};

type CheckboxGroupProps = {
  /**
   * The label for the checkbox group
   */
  label?: string;
  /**
   * Whether to show an icon next to the label
   */
  showLabelIcon?: boolean;
  /**
   * Array of checkbox options
   */
  options: CheckboxOption[];
  /**
   * Array of selected values
   */
  modelValue?: string[];
  /**
   * Whether the entire group is disabled
   */
  disabled?: boolean;
  /**
   * Whether the group is in an error state
   */
  error?: boolean;
};

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  label: undefined,
  showLabelIcon: false,
  modelValue: () => [],
  disabled: false,
  error: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the selection changes
   */
  "update:modelValue": [value: string[]];
}>();

const selectedValues = computed(() => props.modelValue || []);

const handleCheckboxChange = (
  optionValue: string,
  isChecked: boolean | "indeterminate",
) => {
  const newSelection = [...selectedValues.value];

  // Convert indeterminate to false for our purposes
  const checked = isChecked === true;

  if (checked) {
    if (!newSelection.includes(optionValue)) {
      newSelection.push(optionValue);
    }
  } else {
    const index = newSelection.indexOf(optionValue);
    if (index > -1) {
      newSelection.splice(index, 1);
    }
  }

  emit("update:modelValue", newSelection);
};

const isOptionSelected = (optionValue: string) => {
  return selectedValues.value.includes(optionValue);
};
</script>

<template>
  <div class="checkbox-group">
    <InputLabel
      v-if="props.label"
      :label="props.label"
      :show-icon="props.showLabelIcon"
    />
    <ListContainer>
      <div
        v-for="option in props.options"
        :key="option.value"
        class="list-item"
      >
        <Checkbox
          :model-value="isOptionSelected(option.value)"
          :label="option.label"
          :helper-text="option.helperText"
          :disabled="props.disabled || option.disabled"
          :error="props.error"
          @update:model-value="
            (checked) =>
              checked !== undefined &&
              handleCheckboxChange(option.value, checked)
          "
        />
      </div>
    </ListContainer>
  </div>
</template>

<style scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
</style>
