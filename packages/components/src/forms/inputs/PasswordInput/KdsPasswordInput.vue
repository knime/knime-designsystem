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

const isFocused = ref(false);
const showValue = ref(false);
const isTogglingVisibility = ref(false);

const input = useTemplateRef("input");

const leadingIcon = computed(() =>
  props.variant === "second-factor" ? "key" : "lock",
);

const fieldName = computed(() =>
  props.variant === "second-factor" ? "Second factor" : "Password",
);

const showToggle = computed(
  () =>
    props.showVisibilityToggle &&
    (isFocused.value || modelValue.value.length > 0 || showValue.value),
);

const handleBlur = () => {
  if (isTogglingVisibility.value) {
    input.value?.focus();
    return;
  }
  isFocused.value = false;
};

const showLabel = computed(() => `Show ${fieldName.value}`);
const hideLabel = computed(() => `Hide ${fieldName.value}`);

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
        :leading-icon="leadingIcon"
        :placeholder="props.placeholder"
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
            type="button"
            variant="outlined"
            size="xsmall"
            leading-icon="eye"
            :aria-label="showValue ? hideLabel : showLabel"
            :title="showValue ? hideLabel : showLabel"
            :disabled="props.disabled"
            @pointerdown="isTogglingVisibility = true"
            @pointerup="isTogglingVisibility = false"
            @pointercancel="isTogglingVisibility = false"
            @click="isTogglingVisibility = false"
          />
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>
