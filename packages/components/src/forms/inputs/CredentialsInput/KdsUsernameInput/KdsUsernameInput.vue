<script setup lang="ts">
import { useTemplateRef } from "vue";

import BaseFormFieldWrapper from "../../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../../types.ts";
import BaseInput from "../../BaseInput.vue";

import type { KdsUsernameInputProps } from "./types";

const props = withDefaults(defineProps<KdsUsernameInputProps>(), {
  disabled: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<string>({ default: "" });

const baseInput = useTemplateRef("baseInput");

defineExpose<KdsFormFieldExpose>({
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
        leading-icon="user"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :error="props.error"
        :autocomplete="props.autocomplete"
      />
    </template>
  </BaseFormFieldWrapper>
</template>
