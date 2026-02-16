<script setup lang="ts">
import { computed, ref, watch } from "vue";

import KdsToggleButton from "../../../buttons/KdsToggleButton.vue";
import BaseFormFieldWrapper from "../../BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";
import type { KdsPatternInputProps } from "../types.ts";

import {
  buildRegexFromPatternInput,
  parseRegexToPatternInputValue,
} from "./patternRegex.ts";

const props = withDefaults(defineProps<KdsPatternInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

// Public API: a single regex string (encoded with options when toggles are used).
const regex = defineModel<string>({ default: "" });

// Internal UI state. This is derived from the regex model on external updates.
const uiValue = ref("");
const caseSensitive = ref(false);
const excludeMatches = ref(false);
const useRegex = ref(false);

const rebuildRegexFromUi = () => {
  regex.value = buildRegexFromPatternInput(uiValue.value, {
    caseSensitive: caseSensitive.value,
    excludeMatches: excludeMatches.value,
    useRegex: useRegex.value,
  });
};

watch(
  () => regex.value,
  (newValue) => {
    uiValue.value = parseRegexToPatternInputValue(newValue, {
      useRegex: useRegex.value,
      excludeMatches: excludeMatches.value,
      caseSensitive: caseSensitive.value,
    });
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
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseInput
        v-bind="slotProps"
        v-model="uiValue"
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :error="props.error"
        :name="props.name"
        :autocomplete="props.autocomplete"
        leading-icon="filter"
        clearable
        @update:model-value="rebuildRegexFromUi"
      >
        <template #trailing>
          <KdsToggleButton
            v-model="caseSensitive"
            size="xsmall"
            variant="outlined"
            leading-icon="case-sensitive"
            :title="caseSensitiveAriaLabel"
            :aria-label="caseSensitiveAriaLabel"
            :disabled="props.disabled || props.readonly"
            @update:model-value="rebuildRegexFromUi"
          />

          <KdsToggleButton
            v-model="excludeMatches"
            size="xsmall"
            variant="outlined"
            leading-icon="arrows-order"
            :title="excludeMatchesAriaLabel"
            :aria-label="excludeMatchesAriaLabel"
            :disabled="props.disabled || props.readonly"
            @update:model-value="rebuildRegexFromUi"
          />

          <KdsToggleButton
            v-model="useRegex"
            size="xsmall"
            variant="outlined"
            leading-icon="regex"
            :title="patternModeAriaLabel"
            :aria-label="patternModeAriaLabel"
            :disabled="props.disabled || props.readonly"
            @update:model-value="rebuildRegexFromUi"
          />
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>
