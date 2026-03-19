<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import KdsToggleButton from "../../../../buttons/KdsToggleButton/KdsToggleButton.vue";
import type { KdsFormFieldExpose } from "../../../types";
import BaseInput from "../../BaseInput.vue";

import type { PasswordInputProps } from "./types";

const props = withDefaults(defineProps<PasswordInputProps>(), {
  id: undefined,
  placeholder: undefined,
  autocomplete: undefined,
  ariaDescribedby: undefined,
  ariaLabel: undefined,
  error: false,
  disabled: false,
  showVisibilityToggle: true,
});

const modelValue = defineModel<string>({ default: "" });

const isFocused = ref(false);
const showValue = ref(false);
let isTogglingVisibility = false;

const input = useTemplateRef("input");

const showToggle = computed(
  () =>
    props.showVisibilityToggle &&
    (isFocused.value || modelValue.value.length > 0 || showValue.value),
);

const handleBlur = () => {
  if (isTogglingVisibility) {
    input.value?.focus();
    return;
  }
  isFocused.value = false;
};

const handleTogglePointerdown = () => {
  isTogglingVisibility = true;
};

const handleToggleClick = () => {
  isTogglingVisibility = false;
};

const showLabel = computed(() => `Show ${props.fieldName}`);
const hideLabel = computed(() => `Hide ${props.fieldName}`);

defineExpose<KdsFormFieldExpose>({
  focus: () => input.value?.focus(),
});
</script>

<template>
  <BaseInput
    :id="props.id"
    ref="input"
    v-model="modelValue"
    :type="showValue ? 'text' : 'password'"
    :leading-icon="props.leadingIcon"
    :placeholder="props.placeholder"
    :aria-label="props.ariaLabel || props.fieldName"
    :aria-describedby="props.ariaDescribedby"
    :aria-invalid="props.error || undefined"
    :disabled="props.disabled"
    :error="props.error"
    :autocomplete="props.autocomplete"
    @focus="isFocused = true"
    @blur="handleBlur"
  >
    <template #trailing>
      <KdsToggleButton
        v-if="showToggle"
        v-model="showValue"
        variant="outlined"
        size="xsmall"
        leading-icon="eye"
        :aria-label="showValue ? hideLabel : showLabel"
        :title="showValue ? hideLabel : showLabel"
        :disabled="props.disabled"
        @pointerdown="handleTogglePointerdown"
        @click="handleToggleClick"
      />
    </template>
  </BaseInput>
</template>
