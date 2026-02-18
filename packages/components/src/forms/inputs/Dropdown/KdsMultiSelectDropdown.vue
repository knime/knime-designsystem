<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { computed, ref } from "vue";

import { KdsPopover } from "../../../overlays";
import BaseFormFieldWrapper from "../../BaseFormFieldWrapper.vue";

import BaseDropdown from "./BaseDropdown.vue";
import MultiSelectDropdownContainer from "./MultiSelectDropdownContainer.vue";
import type { KdsMultiSelectDropdownProps } from "./multiSelectTypes";

const props = withDefaults(defineProps<KdsMultiSelectDropdownProps>(), {
  placeholder: "",
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  noEntriesText: "No entries found",
  allowNewValues: false,
  selectAllText: "Select all",
  clearAllText: "Clear all",
  minSelected: 0,
  maxSelected: undefined,
});

const modelValue = defineModel<string[]>({ default: () => [] });

const open = ref(false);
const activatorEl = ref<HTMLElement | ComponentPublicInstance | null>(null);

const possibleValueById = computed(
  () => new Map(props.possibleValues.map((o) => [o.id, o])),
);

const missingSelectedIds = computed(() =>
  props.allowNewValues
    ? []
    : modelValue.value.filter((id) => !possibleValueById.value.has(id)),
);

const firstMissingId = computed(() => missingSelectedIds.value[0] ?? null);
const isMissingSelected = computed(() => missingSelectedIds.value.length > 0);

const selectedAccessory = computed(() => {
  if (modelValue.value.length !== 1) {
    return undefined;
  }
  const option = possibleValueById.value.get(modelValue.value[0]);
  return option?.accessory;
});

const effectivePlaceholder = computed(() => {
  if (props.placeholder.trim().length > 0) {
    return props.placeholder;
  }
  return props.allowNewValues ? "Add" : "Select";
});

const triggerText = computed(() => {
  if (firstMissingId.value) {
    return `(Missing) ${firstMissingId.value}`;
  }

  if (modelValue.value.length === 0) {
    return effectivePlaceholder.value;
  }

  if (modelValue.value.length === 1) {
    const option = possibleValueById.value.get(modelValue.value[0]);
    return option?.text ?? modelValue.value[0];
  }

  return `Selected (${modelValue.value.length}/${props.possibleValues.length})`;
});

const isPlaceholder = computed(() => modelValue.value.length === 0);
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseDropdown
        v-bind="slotProps"
        ref="activatorEl"
        :open="open"
        :text="triggerText"
        :placeholder="isPlaceholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :error="props.error"
        :missing="isMissingSelected"
        :accessory="selectedAccessory"
        @click="open = !open"
        @update:open="open = $event"
      />

      <KdsPopover
        v-model="open"
        :activator-el="activatorEl"
        placement="bottom-left"
        full-width
        role="listbox"
        aria-multiselectable="true"
      >
        <MultiSelectDropdownContainer
          v-model="modelValue"
          v-model:open="open"
          :possible-values="props.possibleValues"
          :no-entries-text="props.noEntriesText"
          :allow-new-values="props.allowNewValues"
          :select-all-text="props.selectAllText"
          :clear-all-text="props.clearAllText"
          :required="props.required"
          :min-selected="props.minSelected"
          :max-selected="props.maxSelected"
        />
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>
