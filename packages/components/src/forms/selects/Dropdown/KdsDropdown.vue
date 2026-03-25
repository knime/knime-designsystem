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

const {
  placeholder = "Select",
  disabled = false,
  loading = false,
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  ...props
} = defineProps<KdsDropdownProps>();

const modelValue = defineModel<string>({ default: "" });

const open = ref(false);
const popoverEl = useTemplateRef("popoverEl");
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
watch(modelValue, () => {
  if (open.value) {
    open.value = false;
  }
});
</script>

<template>
  <BaseFormFieldWrapper
    :id="props.id"
    :label="props.label"
    :aria-label="props.ariaLabel"
    :description="props.description"
    :sub-text="props.subText"
    :error="error"
    :validating="validating"
    :preserve-sub-text-space="preserveSubTextSpace"
  >
    <template #default="slotProps">
      <BaseDropdown
        v-bind="slotProps"
        v-model:open="open"
        :text="
          modelValue && !selectedOption
            ? `(Missing) ${modelValue}`
            : selectedOption?.text
        "
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :missing="!!modelValue && !selectedOption"
        :accessory="selectedOption?.accessory"
        :style="popoverEl?.anchorStyle"
        :popover-id="popoverEl?.popoverId"
        @click="open = !open"
      />

      <KdsPopover
        ref="popoverEl"
        v-model="open"
        placement="bottom-left"
        role="dialog"
        full-width
        aria-label="Searchable dropdown options"
      >
        <DropdownContainer
          ref="dropdownContainerEl"
          v-model="modelValue"
          :possible-values="props.possibleValues"
          :loading="loading"
          empty-text="No entries found"
        />
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>
