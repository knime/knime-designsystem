<script setup lang="ts">
import { useTemplateRef } from "vue";

import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import type { KdsUsernameInputProps } from "./types";

const {
  disabled = false,
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  ...props
} = defineProps<KdsUsernameInputProps>();

const modelValue = defineModel<string>({ default: "" });

const baseInput = useTemplateRef("baseInput");

defineExpose<KdsFormFieldExpose>({
  focus: () => baseInput.value?.focus(),
});
</script>

<template>
  <BaseFormFieldWrapper
    v-bind="props"
    :error="error"
    :validating="validating"
    :preserve-sub-text-space="preserveSubTextSpace"
  >
    <template #default="slotProps">
      <BaseInput
        ref="baseInput"
        v-bind="slotProps"
        v-model="modelValue"
        type="text"
        leading-icon="user"
        :placeholder="props.placeholder"
        :disabled="disabled"
        :error="error"
        :autocomplete="props.autocomplete"
      />
    </template>
  </BaseFormFieldWrapper>
</template>
