<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";

import { KdsPopover } from "../../../overlays";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";

import BaseDropdown from "./BaseDropdown.vue";
import DropdownContainer from "./DropdownContainer.vue";
import type { KdsDropdownProps } from "./types.ts";

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

const modelValue = defineModel<string>({});

const open = ref(false);
const activatorEl = useTemplateRef<HTMLButtonElement>("activatorEl");
const dropdownContainerEl = useTemplateRef("dropdownContainerEl");

watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => dropdownContainerEl.value?.focusSearch());
  }
});

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

watch(modelValue, (newValue, oldValue) => {
  if (oldValue === undefined) {
    return;
  }
  if (open.value) {
    open.value = false;
  }
});
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseDropdown
        v-bind="slotProps"
        ref="activatorEl"
        :open="open"
        :text="triggerText"
        :placeholder="props.placeholder"
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
        popover-aria-label="Dropdown options"
      >
        <DropdownContainer
          ref="dropdownContainerEl"
          v-model="modelValue"
          :possible-values="props.possibleValues"
          :no-entries-text="props.noEntriesText"
        />
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>
