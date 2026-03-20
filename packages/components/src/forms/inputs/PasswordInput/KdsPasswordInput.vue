<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import KdsToggleButton from "../../../buttons/KdsToggleButton/KdsToggleButton.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import type { KdsPasswordInputProps } from "./types";

const props = withDefaults(defineProps<KdsPasswordInputProps>(), {
  disabled: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  variant: "password",
  showVisibilityToggle: true,
});

const modelValue = defineModel<string>({ default: "" });

const showValue = ref(false);
const preventBlurFromToggle = ref(false);

const input = useTemplateRef("input");

const effectiveToggleLabel = computed(
  () => props.toggleLabel ?? (props.variant === "key" ? "Key" : "Password"),
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
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseInput
        ref="input"
        v-bind="slotProps"
        v-model="modelValue"
        :type="showValue && props.showVisibilityToggle ? 'text' : 'password'"
        :leading-icon="props.variant === 'key' ? 'key' : 'lock'"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :error="props.error"
        :autocomplete="props.autocomplete"
        @blur="handleBlur"
      >
        <template #trailing>
          <KdsToggleButton
            v-if="props.showVisibilityToggle"
            v-model="showValue"
            type="button"
            variant="outlined"
            size="xsmall"
            leading-icon="eye"
            :aria-label="
              showValue
                ? `Hide ${effectiveToggleLabel}`
                : `Show ${effectiveToggleLabel}`
            "
            :title="
              showValue
                ? `Hide ${effectiveToggleLabel}`
                : `Show ${effectiveToggleLabel}`
            "
            :disabled="props.disabled"
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
