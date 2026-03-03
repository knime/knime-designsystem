<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { computed, ref, watch } from "vue";

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

const announcement = ref("");

watch(modelValue, (newValue, oldValue) => {
  if (oldValue === undefined) {
    return;
  }
  if (newValue) {
    const option = props.possibleValues.find((o) => o.id === newValue);
    announcement.value = `Selected ${option?.text ?? newValue}`;
  } else {
    announcement.value = "Selection cleared";
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
        popover-aria-label="Dropdown options"
      >
        <DropdownContainer
          v-model="modelValue"
          v-model:open="open"
          :possible-values="props.possibleValues"
          :no-entries-text="props.noEntriesText"
          :required="props.required"
        />
      </KdsPopover>

      <span class="sr-only" aria-live="assertive" aria-atomic="true">
        {{ announcement }}
      </span>
    </template>
  </BaseFormFieldWrapper>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip-path: inset(50%);
}
</style>
