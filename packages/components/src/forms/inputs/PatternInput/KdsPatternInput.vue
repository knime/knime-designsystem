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

const caseSensitiveTitle = computed(() =>
  caseSensitive.value ? "Match case-insensitive" : "Match case-sensitive",
);
const excludeMatchesTitle = computed(() =>
  excludeMatches.value ? "Include matches" : "Exclude matches",
);
const patternModeTitle = computed(() =>
  useRegex.value ? "Use wildcard pattern" : "Use regex pattern",
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
            :title="caseSensitiveTitle"
            ariaLabel="Case sensitivity"
            :disabled="disabled"
          />

          <KdsToggleButton
            v-model="excludeMatches"
            size="xsmall"
            variant="outlined"
            leading-icon="arrows-order"
            :title="excludeMatchesTitle"
            ariaLabel="Exclude matches"
            :disabled="disabled"
          />

          <KdsToggleButton
            v-model="useRegex"
            size="xsmall"
            variant="outlined"
            leading-icon="regex"
            :title="patternModeTitle"
            ariaLabel="Regex mode"
            :disabled="disabled"
          />
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>
