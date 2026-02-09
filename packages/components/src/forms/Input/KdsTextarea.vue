<script setup lang="ts">
import KdsFormField from "../KdsFormField.vue";

import BaseInput from "./BaseInput.vue";
import type { KdsTextareaProps } from "./types";

const props = withDefaults(defineProps<KdsTextareaProps>(), {
  placeholder: "",
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<string>({ default: "" });
</script>

<template>
  <KdsFormField
    :id="props.id"
    :label="props.label"
    :sub-text="props.subText"
    :error="props.error"
    :validating="props.validating"
    :preserve-sub-text-space="props.preserveSubTextSpace"
  >
    <template #default="slotProps">
      <BaseInput
        v-bind="slotProps"
        v-model="modelValue"
        component="textarea"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :name="props.name"
        :autocomplete="props.autocomplete"
      />
    </template>
  </KdsFormField>
</template>
