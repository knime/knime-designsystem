<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { computed, ref } from "vue";

import { KdsPopover } from "../../../overlays";
import BaseFormFieldWrapper from "../../BaseFormFieldWrapper.vue";

import BaseDropdown from "./BaseDropdown.vue";
import DropdownContainer from "./DropdownContainer.vue";
import type { KdsDropdownProps } from "./types";

const props = withDefaults(defineProps<KdsDropdownProps>(), {
  placeholder: "",
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  noEntriesText: "No entries found",
});

const modelValue = defineModel<string | null>({ default: null });

const open = ref(false);
const activatorEl = ref<HTMLElement | ComponentPublicInstance | null>(null);

const selectedOption = computed(() =>
  props.possibleValues.find((o) => o.id === modelValue.value),
);

const isMissingSelected = computed(
  () => Boolean(modelValue.value) && !selectedOption.value,
);

const selectedAccessory = computed(() => selectedOption.value?.accessory);

const triggerText = computed(() => {
  if (!modelValue.value) {
    return props.placeholder;
  }

  if (!selectedOption.value) {
    return `(Missing) ${modelValue.value}`;
  }

  return selectedOption.value.text;
});

const isPlaceholder = computed(() => !modelValue.value);
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
        aria-haspopup="listbox"
      >
        <DropdownContainer
          v-model="modelValue"
          v-model:open="open"
          :possible-values="props.possibleValues"
          :no-entries-text="props.noEntriesText"
          :required="props.required"
        />
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>
