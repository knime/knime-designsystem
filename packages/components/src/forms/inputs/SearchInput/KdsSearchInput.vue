<script setup lang="ts">
import BaseFormFieldWrapper from "../../BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";
import type { KdsSearchInputProps } from "../types";

const props = withDefaults(defineProps<KdsSearchInputProps>(), {
  placeholder: "Search",
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
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseInput
        v-bind="slotProps"
        v-model="modelValue"
        type="search"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :error="props.error"
        :name="props.name"
        :autocomplete="props.autocomplete"
        leading-icon="search"
        :clearable="true"
      />
    </template>
  </BaseFormFieldWrapper>
</template>
