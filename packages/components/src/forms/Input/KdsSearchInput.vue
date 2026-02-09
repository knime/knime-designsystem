<script setup lang="ts">
import KdsFormField from "../KdsFormField.vue";

import BaseInput from "./BaseInput.vue";
import type { KdsSearchInputProps } from "./types";

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
        type="search"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :name="props.name"
        :autocomplete="props.autocomplete"
        leading-icon="search"
        :clearable="true"
        :aria-label="props.label ? undefined : 'Search'"
      />
    </template>
  </KdsFormField>
</template>
