<script setup lang="ts">
import { useTemplateRef } from "vue";

import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";
import type { FormFieldExpose, KdsTextInputProps } from "../types";

const props = withDefaults(defineProps<KdsTextInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<string>({ default: "" });

const baseInput = useTemplateRef("baseInput");

defineExpose<FormFieldExpose>({
  focus: () => baseInput.value?.focus(),
});
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseInput
        ref="baseInput"
        v-bind="slotProps"
        v-model="modelValue"
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :error="props.error"
        :name="props.name"
        :autocomplete="props.autocomplete"
      />
    </template>
  </BaseFormFieldWrapper>
</template>
