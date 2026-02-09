<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
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

const inputId = computed(() => props.id ?? useId());
const labelId = computed(() => `${inputId.value}-label`);
const subTextId = computed(() => `${inputId.value}-subtext`);

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
