<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useTemplateRef,
  watch,
  watchEffect,
} from "vue";

import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
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

const modelValue = defineModel<string | null>({ default: null });

const open = ref(false);
const popoverEl = useTemplateRef("popoverEl");
const dropdownContainerEl = useTemplateRef("dropdownContainerEl");

const selectedOption = computed(() =>
  props.possibleValues.find((o) => o.id === modelValue.value),
);

/** Focus search field on opening of dropdown */
watchEffect(() => {
  if (open.value) {
    nextTick(() => dropdownContainerEl.value?.focusSearch());
  }
});

/** Close dropdown on value selection */
watch(modelValue, () => {
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
        :style="popoverEl?.anchorStyle"
        :aria-expanded="open"
        :popover-id="popoverEl?.popoverId"
        aria-haspopup="listbox"
        @click="open = !open"
        @update:open="open = $event"
      />

      <KdsPopover
        ref="popoverEl"
        v-model="open"
        placement="bottom-left"
        role="dialog"
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
