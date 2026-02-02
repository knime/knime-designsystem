<script setup lang="ts">
import { computed, ref, useId } from "vue";

import KdsIcon from "../../Icon/KdsIcon.vue";
import KdsButton from "../../buttons/KdsButton.vue";

import type { KdsBaseInputEmits, KdsBaseInputProps } from "./types";

const props = withDefaults(defineProps<KdsBaseInputProps>(), {
  type: "text",
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  clearable: false,
});

const emit = defineEmits<KdsBaseInputEmits>();

const modelValue = defineModel<string>({ default: "" });

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);

const hasValue = computed(() => modelValue.value.length > 0);

const showUnitPlaceholder = computed(
  () => Boolean(props.unit) && modelValue.value.trim().length === 0,
);

const inputRef = ref<HTMLInputElement | null>(null);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  modelValue.value = target.value;
  emit("input", target.value);
};

const clear = () => {
  modelValue.value = "";
  emit("input", "");
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
      <div
        v-if="props.leadingIcon || $slots.leading"
        class="icon-wrapper leading"
      >
        <slot name="leading">
          <KdsIcon v-if="props.leadingIcon" :name="props.leadingIcon" />
        </slot>
      </div>

      <input
        :id="inputId"
        ref="inputRef"
        :value="modelValue"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :name="props.name"
        :autocomplete="props.autocomplete"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="props.ariaDescribedby"
        :aria-invalid="props.error"
        :class="{ 'input-field': true, 'has-value': hasValue }"
        @input="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keydown="emit('keydown', $event)"
      />

      <span
        v-if="props.unit"
        :class="{
          unit: true,
          placeholder: showUnitPlaceholder,
          disabled: props.disabled,
        }"
      >
        {{ props.unit }}
      </span>

      <KdsButton
        v-if="props.clearable && hasValue && !props.disabled && !props.readonly"
        type="button"
        size="xsmall"
        variant="transparent"
        leading-icon="x-close"
        aria-label="Clear"
        title="Clear"
        @click="clear"
      />

      <slot name="trailing" />

      <div v-if="props.trailingIcon" class="icon-wrapper trailing" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0;
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);

  &:has(input:focus) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
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

.field-wrapper {
  display: flex;
  flex: 1 0 0;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
  min-width: 0;
}

.icon-wrapper {
  display: flex;
  flex-shrink: 0;
  align-items: center;

  &.leading {
    padding-left: var(--kds-spacing-container-0-12x);
  }

  &.trailing {
    padding-right: var(--kds-spacing-container-0-12x);
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

  /* hide native steppers, we provide our own in NumberInput */
  &[type="number"] {
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      appearance: none;
    }
  }

  &::placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }

  &:disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;

    &::placeholder {
      color: var(--kds-color-text-and-icon-disabled);
    }
  }
}

.unit {
  flex-shrink: 0;
  min-width: 0;
  padding-right: var(--kds-spacing-container-0-25x);
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;

  &.placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
  }
}

.container:focus-within .unit {
  color: var(--kds-color-text-and-icon-neutral);
}
</style>
