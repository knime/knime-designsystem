<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";

import KdsToggleButton from "../../../buttons/KdsToggleButton.vue";
import KdsLabel from "../../KdsLabel.vue";
import KdsSubText from "../../KdsSubText.vue";
import KdsBaseInput from "../BaseInput.vue";
import type { KdsPatternInputProps } from "../types";

import {
  buildRegexFromPatternInput,
  parseRegexToPatternInputValue,
} from "./patternRegex";

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

const inputId = computed(() => props.id ?? useId());
const labelId = computed(() => `${inputId.value}-label`);
const subTextId = computed(() => `${inputId.value}-subtext`);

const ariaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);
const ariaDescribedby = computed(() =>
  props.subText ? subTextId.value : undefined,
);

const caseSensitiveAriaLabel = computed(() =>
  caseSensitive.value ? "Case-sensitive" : "Case-insensitive",
);
const excludeMatchesAriaLabel = computed(() =>
  excludeMatches.value ? "Exclude matches" : "Include matches",
);
const patternModeAriaLabel = computed(() =>
  useRegex.value ? "Use regex pattern" : "Use wildcard pattern",
);

// (no additional computed needed; case sensitivity is applied by consumers when compiling)
</script>

<template>
  <div class="pattern-input">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />

    <KdsBaseInput
      :id="inputId"
      v-model="uiValue"
      type="text"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :error="props.error"
      :validating="props.validating"
      :name="props.name"
      :autocomplete="props.autocomplete"
      leading-icon="filter"
      clearable
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
      @update:model-value="rebuildRegexFromUi"
    >
      <template #trailing>
        <div class="button-wrapper">
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
        </div>
      </template>
    </KdsBaseInput>

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
.pattern-input {
  display: flex;
  flex-direction: column;
}

.button-wrapper {
  display: flex;
  flex-shrink: 0;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
}
</style>
