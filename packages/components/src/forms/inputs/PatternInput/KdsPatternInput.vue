<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";

import KdsToggleButton from "../../../buttons/KdsToggleButton/KdsToggleButton.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import { buildRegexFromPatternInput } from "./patternRegex.ts";
import type { KdsPatternInputProps } from "./types";

const {
  disabled = false,
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  ...props
} = defineProps<KdsPatternInputProps>();

const emit = defineEmits<{
  "update:regex": [value: string];
}>();

const modelValue = defineModel<string>({ default: "" });

// Toggle states exposed as optional v-models for external control.
const caseSensitive = defineModel<boolean>("caseSensitive", { default: false });
const excludeMatches = defineModel<boolean>("excludeMatches", {
  default: false,
});
const useRegex = defineModel<boolean>("useRegex", { default: false });

watch(
  [modelValue, caseSensitive, excludeMatches, useRegex],
  ([value, cs, em, ur]) => {
    emit(
      "update:regex",
      buildRegexFromPatternInput(value, {
        caseSensitive: cs,
        excludeMatches: em,
        useRegex: ur,
      }),
    );
  },
  { immediate: true },
);

const caseSensitiveAriaLabel = computed(() =>
  caseSensitive.value ? "Match case-sensitive" : "Match case-insensitive",
);
const excludeMatchesAriaLabel = computed(() =>
  excludeMatches.value ? "Exclude matches" : "Include matches",
);
const patternModeAriaLabel = computed(() =>
  useRegex.value ? "Use regex pattern" : "Use wildcard pattern",
);

const baseInput = useTemplateRef("baseInput");

defineExpose<KdsFormFieldExpose>({
  focus: () => baseInput.value?.focus(),
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
        ref="baseInput"
        v-bind="slotProps"
        v-model="modelValue"
        type="text"
        :placeholder="props.placeholder"
        :disabled="disabled"
        :error="error"
        :autocomplete="props.autocomplete"
        leading-icon="filter"
        clearable
      >
        <template #trailing>
          <KdsToggleButton
            v-model="caseSensitive"
            size="xsmall"
            variant="outlined"
            leading-icon="case-sensitive"
            :title="caseSensitiveAriaLabel"
            :ariaLabel="caseSensitiveAriaLabel"
            :disabled="disabled"
          />

          <KdsToggleButton
            v-model="excludeMatches"
            size="xsmall"
            variant="outlined"
            leading-icon="arrows-order"
            :title="excludeMatchesAriaLabel"
            :ariaLabel="excludeMatchesAriaLabel"
            :disabled="disabled"
          />

          <KdsToggleButton
            v-model="useRegex"
            size="xsmall"
            variant="outlined"
            leading-icon="regex"
            :title="patternModeAriaLabel"
            :ariaLabel="patternModeAriaLabel"
            :disabled="disabled"
          />
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>
