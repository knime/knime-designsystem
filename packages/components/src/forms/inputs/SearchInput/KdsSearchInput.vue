<script setup lang="ts">
import { useTemplateRef } from "vue";

import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import type { KdsSearchInputProps } from "./types";

const {
  placeholder = "Search",
  disabled = false,
  error = false,
  autocomplete,
} = defineProps<KdsSearchInputProps>();

const modelValue = defineModel<string>({ default: "" });

const emit = defineEmits<{
  /** Native focus event forwarded from the input element. */
  focus: [event: FocusEvent];
  /** Native blur event forwarded from the input element. */
  blur: [event: FocusEvent];
  /** Native keydown event forwarded from the input element. */
  keydown: [event: KeyboardEvent];
}>();

const baseInput = useTemplateRef("baseInput");

defineExpose<KdsFormFieldExpose>({
  focus: () => baseInput.value?.focus(),
});
</script>

<template>
  <BaseFormFieldWrapper v-bind="$props">
    <template #default="slotProps">
      <BaseInput
        ref="baseInput"
        v-bind="slotProps"
        v-model="modelValue"
        type="search"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :autocomplete="autocomplete"
        leading-icon="search"
        :clearable="true"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keydown="emit('keydown', $event)"
      />
    </template>
  </BaseFormFieldWrapper>
</template>
