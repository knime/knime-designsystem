<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";

import KdsToggleButton from "../../../buttons/KdsToggleButton/KdsToggleButton.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import {
  buildRegexFromPatternInput,
  parseRegexToPatternInputValue,
} from "./patternRegex.ts";
import type { KdsPatternInputProps } from "./types";

const {
  disabled = false,
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  ...props
} = defineProps<KdsPatternInputProps>();

// Public API: a single regex string (encoded with options when toggles are used).
const regex = defineModel<string>({ default: "" });

// Toggle states exposed as optional v-models for external control.
const caseSensitive = defineModel<boolean>("caseSensitive", { default: false });
const excludeMatches = defineModel<boolean>("excludeMatches", {
  default: false,
});
const useRegex = defineModel<boolean>("useRegex", { default: false });

// Raw UI pattern text exposed as optional v-model:pattern for external control.
const pattern = defineModel<string>("pattern", { default: "" });

// Guard to break circular updates between the two watches.
let updatingFromUi = false;

// If regex was provided externally but pattern was not, initialize pattern from
// the regex so the immediate watch below doesn't overwrite the parent value.
if (regex.value && !pattern.value) {
  pattern.value = parseRegexToPatternInputValue(regex.value, {
    useRegex: useRegex.value,
    excludeMatches: excludeMatches.value,
    caseSensitive: caseSensitive.value,
  });
}

// Rebuild the regex whenever the UI inputs change.
watch(
  [pattern, caseSensitive, excludeMatches, useRegex],
  ([pat, cs, em, ur]) => {
    updatingFromUi = true;
    regex.value = buildRegexFromPatternInput(pat, {
      caseSensitive: cs,
      excludeMatches: em,
      useRegex: ur,
    });
    updatingFromUi = false;
  },
  { immediate: true },
);

// When the regex is set externally, parse it back into the UI pattern.
watch(
  () => regex.value,
  (newValue) => {
    if (updatingFromUi) {
      return;
    }
    pattern.value = parseRegexToPatternInputValue(newValue, {
      useRegex: useRegex.value,
      excludeMatches: excludeMatches.value,
      caseSensitive: caseSensitive.value,
    });
  },
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
        v-model="pattern"
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
