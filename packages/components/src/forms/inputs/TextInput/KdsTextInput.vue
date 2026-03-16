<script setup lang="ts">
import { useTemplateRef } from "vue";

import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import type { KdsTextInputProps } from "./types";

const {
  disabled = false,
  error = false,
  placeholder,
  autocomplete,
} = defineProps<KdsTextInputProps>();

const modelValue = defineModel<string>({ default: "" });

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
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :autocomplete="autocomplete"
      />
    </template>
  </BaseFormFieldWrapper>
</template>
