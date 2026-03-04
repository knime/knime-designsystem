<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useTemplateRef,
  watch,
  watchEffect,
} from "vue";

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

const selectedOption = computed(() =>
  props.possibleValues.find((o) => o.id === modelValue.value),
);

/** Focus search field on opening of dropdown */
watchEffect(() => {
  if (open.value) {
    nextTick(() => dropdownContainerEl.value?.focus());
  }
});

/** Close dropdown on value selection */
watch(modelValue, (_, oldValue) => {
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
        :text="
          modelValue && !selectedOption
            ? `(Missing) ${modelValue}`
            : selectedOption?.text
        "
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :error="props.error"
        :missing="!!modelValue && !selectedOption"
        :accessory="selectedOption?.accessory"
        @click="open = !open"
        @update:open="open = $event"
      />

      <KdsPopover
        v-model="open"
        :activator-el="activatorEl"
        placement="bottom-left"
        full-width
        popover-aria-label="Searchable dropdown options"
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
