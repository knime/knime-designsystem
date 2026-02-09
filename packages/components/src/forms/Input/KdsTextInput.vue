<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type { KdsTextInputProps } from "./types";

const props = withDefaults(defineProps<KdsTextInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<string>({ default: "" });

const inputId = computed(() => props.id ?? useId());
const labelId = computed(() => `${inputId.value}-label`);
const subTextId = computed(() => `${inputId.value}-subtext`);

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
      :description="props.description"
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
