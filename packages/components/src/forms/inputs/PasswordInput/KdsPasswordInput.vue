<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import KdsToggleButton from "../../../buttons/KdsToggleButton/KdsToggleButton.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import type { KdsPasswordInputProps } from "./types";

const {
  disabled = false,
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  variant = "password",
  showVisibilityToggle = true,
  ...props
} = defineProps<KdsPasswordInputProps>();

const modelValue = defineModel<string>({ default: "" });

const showValue = ref(false);
const preventBlurFromToggle = ref(false);

const input = useTemplateRef("input");

const effectiveToggleLabel = computed(
  () => props.toggleLabel ?? (variant === "key" ? "Key" : "Password"),
);

const handleBlur = () => {
  if (preventBlurFromToggle.value) {
    input.value?.focus();
  }
};

defineExpose<KdsFormFieldExpose>({
  focus: () => input.value?.focus(),
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
        ref="input"
        v-bind="slotProps"
        v-model="modelValue"
        :type="showValue && showVisibilityToggle ? 'text' : 'password'"
        :leading-icon="variant === 'key' ? 'key' : 'lock'"
        :placeholder="props.placeholder"
        :disabled="disabled"
        :error="error"
        :autocomplete="props.autocomplete"
        @blur="handleBlur"
      >
        <template #trailing>
          <KdsToggleButton
            v-if="showVisibilityToggle"
            v-model="showValue"
            type="button"
            variant="outlined"
            size="xsmall"
            leading-icon="eye"
            :ariaLabel="
              showValue
                ? `Hide ${effectiveToggleLabel}`
                : `Show ${effectiveToggleLabel}`
            "
            :title="
              showValue
                ? `Hide ${effectiveToggleLabel}`
                : `Show ${effectiveToggleLabel}`
            "
            :disabled="disabled"
            @pointerdown="preventBlurFromToggle = true"
            @pointerup="preventBlurFromToggle = false"
            @pointercancel="preventBlurFromToggle = false"
            @click="preventBlurFromToggle = false"
          />
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>
