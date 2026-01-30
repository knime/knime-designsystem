<script setup lang="ts">
import { computed, useId } from "vue";

import KdsToggleButton from "../../buttons/KdsToggleButton.vue";
import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type { KdsPatternInputEmits, KdsPatternInputProps } from "./types";

const props = withDefaults(defineProps<KdsPatternInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const emit = defineEmits<KdsPatternInputEmits>();

const modelValue = defineModel<string>({ default: "" });
const caseSensitive = defineModel<boolean>("caseSensitive", { default: false });
const excludeMatches = defineModel<boolean>("excludeMatches", {
  default: false,
});
const useRegex = defineModel<boolean>("useRegex", { default: false });

const generatedId = useId();
const inputId = computed(() => `${generatedId}-input`);
const labelId = computed(() => `${generatedId}-label`);
const subTextId = computed(() => `${generatedId}-subtext`);

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

const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

const handleInput = (value: string) => {
  emit("input", value);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit("keydown", event);
};
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
      v-model="modelValue"
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
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @keydown="handleKeydown"
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
          />

          <KdsToggleButton
            v-model="excludeMatches"
            size="xsmall"
            variant="outlined"
            leading-icon="arrows-order"
            :title="excludeMatchesAriaLabel"
            :aria-label="excludeMatchesAriaLabel"
            :disabled="props.disabled || props.readonly"
          />

          <KdsToggleButton
            v-model="useRegex"
            size="xsmall"
            variant="outlined"
            leading-icon="regex"
            :title="patternModeAriaLabel"
            :aria-label="patternModeAriaLabel"
            :disabled="props.disabled || props.readonly"
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
