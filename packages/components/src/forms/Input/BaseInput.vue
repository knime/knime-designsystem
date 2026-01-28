<script setup lang="ts">
import { computed, useId } from "vue";

import KdsIcon from "../../Icon/KdsIcon.vue";

import type { KdsBaseInputEmits, KdsBaseInputProps } from "./types";

const props = withDefaults(defineProps<KdsBaseInputProps>(), {
  type: "text",
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
});

const emit = defineEmits<KdsBaseInputEmits>();

const modelValue = defineModel<string>({ default: "" });

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);

const hasValue = computed(() => modelValue.value.length > 0);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  modelValue.value = target.value;
  emit("input", target.value);
};

const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit("keydown", event);
};
</script>

<template>
  <div
    :class="{
      container: true,
      error: props.error,
      disabled: props.disabled,
    }"
  >
    <div class="content">
      <div v-if="props.leadingIcon" class="icon-wrapper leading">
        <KdsIcon :name="props.leadingIcon" size="small" />
      </div>
      <input
        :id="inputId"
        :value="modelValue"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :name="props.name"
        :autocomplete="props.autocomplete"
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="props.ariaDescribedby"
        :aria-invalid="props.error"
        :class="{ 'input-field': true, 'has-value': hasValue }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      <div
        v-if="props.trailingIcon || props.validating"
        class="icon-wrapper trailing"
      >
        <KdsIcon
          v-if="props.validating"
          name="pending-changes"
          size="small"
          aria-label="Validating"
        />
        <KdsIcon
          v-else-if="props.trailingIcon"
          :name="props.trailingIcon"
          size="small"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0;
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);

  &:has(.input-field:focus) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-color: var(--kds-color-focus-outline);
    border-radius: var(--kds-border-radius-container-0-44x);
  }

  &:has(.input-field:hover:not(:disabled, :read-only)) {
    background: var(--kds-color-background-input-hover);
  }

  &.error {
    border: var(--kds-border-action-error);
  }

  &.disabled {
    border: var(--kds-border-action-disabled);
    border-color: var(--kds-color-border-disabled);
  }
}

.content {
  display: flex;
  flex: 1 0 0;
  gap: 0;
  align-items: center;
  min-width: 0;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0 var(--kds-spacing-container-0-25x);
}

.icon-wrapper {
  display: flex;
  flex-shrink: 0;
  align-items: center;

  &.leading {
    padding-left: var(--kds-spacing-container-0-12x);
  }
}

.input-field {
  flex: 1 0 0;
  min-width: 0;
  height: var(--kds-dimension-component-height-1-75x);
  padding: var(--kds-spacing-container-0-25x);
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;
  outline: none;
  background: transparent;
  border: none;

  &::placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }

  &:disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;
  }
}
</style>
