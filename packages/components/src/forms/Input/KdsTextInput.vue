<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type { KdsTextInputEmits, KdsTextInputProps } from "./types";

const props = withDefaults(defineProps<KdsTextInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const emit = defineEmits<KdsTextInputEmits>();

const modelValue = defineModel<string>({ default: "" });

const generatedId = useId();
const inputId = computed(() => `${generatedId}-input`);
const labelId = computed(() => `${generatedId}-label`);
const subTextId = computed(() => `${generatedId}-subtext`);

const ariaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);
const ariaDescribedby = computed(() =>
  props.subText ? subTextId.value : undefined,
);
</script>

<template>
  <div class="text-input">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />
    <KdsBaseInput
      :id="inputId"
      v-model="modelValue"
      type="text"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :error="props.error"
      :validating="props.validating"
      :name="props.name"
      :autocomplete="props.autocomplete"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @input="emit('input', $event)"
      @keydown="emit('keydown', $event)"
    />
    <KdsSubText
      :id="subTextId"
      :sub-text="props.subText"
      :error="props.error"
      :validating="props.validating"
      :preserve-sub-text-space="props.preserveSubTextSpace"
    />
  </div>
</template>

<style scoped>
.text-input {
  display: flex;
  flex-direction: column;
}
</style>
