<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type { KdsSearchInputEmits, KdsSearchInputProps } from "./types";

const props = withDefaults(defineProps<KdsSearchInputProps>(), {
  placeholder: "Search",
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const emit = defineEmits<KdsSearchInputEmits>();

const modelValue = defineModel<string>({ default: "" });

const generatedId = useId();
const baseId = computed(() => props.id ?? generatedId);
const labelId = computed(() => `${baseId.value}-label`);
const inputId = computed(() => props.id ?? `${generatedId}-input`);
const subTextId = computed(() => `${baseId.value}-subtext`);

const ariaDescribedby = computed(() =>
  props.subText || props.validating || props.preserveSubTextSpace
    ? subTextId.value
    : undefined,
);
</script>

<template>
  <div class="search-input">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />
    <KdsBaseInput
      :id="inputId"
      v-model="modelValue"
      type="search"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      leading-icon="search"
      :error="props.error"
      :validating="props.validating"
      :name="props.name"
      :autocomplete="props.autocomplete"
      :clearable="true"
      :aria-label="props.label ? undefined : 'Search'"
      :aria-labelledby="props.label ? labelId : undefined"
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
.search-input {
  display: flex;
  flex-direction: column;
}
</style>
