<script setup lang="ts">
import { computed } from "vue";

import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import type { KdsIconName } from "../../accessories/Icon/types";
import KdsButton from "../../buttons/KdsButton.vue";

type BaseInputProps = {
  /**
   * ID for the input element
   */
  id: string;
  /**
   * The type of input field
   */
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  /**
   * Minimum allowed value (relevant for type="number")
   */
  min?: number;
  /**
   * Maximum allowed value (relevant for type="number")
   */
  max?: number;
  /**
   * Step size (relevant for type="number")
   */
  step?: number;
  /**
   * Placeholder text when input is empty
   */
  placeholder?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether the input is readonly
   */
  readonly?: boolean;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Icon displayed at the start of the input
   */
  leadingIcon?: KdsIconName;
  /**
   * Icon displayed at the end of the input
   */
  trailingIcon?: KdsIconName;
  /**
   * Whether the input has an error state
   */
  error?: boolean;
  /**
   * Name attribute for the input element
   */
  name?: string;
  /**
   * Autocomplete attribute for the input element
   */
  autocomplete?: string;
  /**
   * Accessible label for the input (for aria-label).
   */
  ariaLabel?: string;
  /**
   * ID of element that labels this input (for aria-labelledby)
   */
  ariaLabelledby?: string;
  /**
   * ID of element that describes this input (for aria-describedby)
   */
  ariaDescribedby?: string;
  /**
   * Whether the current value of the input is invalid (for aria-invalid)
   */
  ariaInvalid?: boolean;
  /**
   * Unit shown next to the input value
   */
  unit?: string;
  /**
   * Hints at the type of data that might be entered by the user.
   * Useful for showing an appropriate on-screen keyboard on mobile.
   */
  inputmode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  /**
   * Whether to show a clear button when the input has a value.
   */
  clearable?: boolean;
};

const props = withDefaults(defineProps<BaseInputProps>(), {
  type: "text",
  min: undefined,
  max: undefined,
  step: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  required: false,
  leadingIcon: undefined,
  trailingIcon: undefined,
  error: false,
  name: undefined,
  autocomplete: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  unit: undefined,
  inputmode: undefined,
  clearable: false,
});

type BaseInputEmits = {
  /** Native focus event forwarded from the input element. */
  focus: [event: FocusEvent];
  /** Native blur event forwarded from the input element. */
  blur: [event: FocusEvent];
  /** Native keydown event forwarded from the input element. */
  keydown: [event: KeyboardEvent];
  /** Native input event forwarded from the input element. */
  input: [event: Event];
  /** Native click event forwarded from the input element. */
  click: [event: MouseEvent];
};

const emit = defineEmits<BaseInputEmits>();

const modelValue = defineModel<string>({ default: "" });

const hasValue = computed(() => modelValue.value.length > 0);

const showUnitPlaceholder = computed(
  () => Boolean(props.unit) && modelValue.value.trim().length === 0,
);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  modelValue.value = target.value;

  emit("input", event);
};

const clear = () => {
  modelValue.value = "";
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
    <div v-if="props.leadingIcon" class="icon-wrapper leading">
      <KdsIcon v-if="props.leadingIcon" :name="props.leadingIcon" />
    </div>

    <input
      :id="props.id"
      :value="modelValue"
      :type="props.type"
      :inputmode="props.inputmode"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :name="props.name"
      :autocomplete="props.autocomplete"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :aria-label="props.ariaLabel"
      :aria-labelledby="props.ariaLabelledby"
      :aria-describedby="props.ariaDescribedby"
      :aria-invalid="props.ariaInvalid"
      :class="{ 'input-field': true, 'has-value': hasValue }"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @keydown="emit('keydown', $event)"
      @click="emit('click', $event)"
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
      class="clear-button"
      type="button"
      size="xsmall"
      variant="transparent"
      leading-icon="x-close"
      aria-label="Clear"
      title="Clear"
      @click="clear"
    />

    <div v-if="$slots.trailing" class="trailing-slot">
      <slot name="trailing" />
    </div>

    <div v-if="props.trailingIcon" class="icon-wrapper trailing">
      <KdsIcon :name="props.trailingIcon" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0 var(--kds-spacing-container-0-25x);
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);

  &:has(input:focus:not(:disabled)) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &:has(.input-field:hover:not(:disabled, :focus)) {
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

.icon-wrapper {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  color: var(--kds-color-text-and-icon-subtle);

  &.leading {
    padding-left: var(--kds-spacing-container-0-12x);
  }

  &.trailing {
    padding-right: var(--kds-spacing-container-0-12x);
  }

  .container.disabled & {
    color: var(--kds-color-text-and-icon-disabled);
  }

  .container:focus-within &,
  .container:has(.input-field.has-value) & {
    color: var(--kds-color-text-and-icon-neutral);
  }
}

.input-field {
  flex: 1 0 0;
  min-width: 0;
  height: var(--kds-dimension-component-height-1-75x);
  padding: var(--kds-spacing-container-0-25x);
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-body-small);
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

  /* hide native search cancel button on Safari/WebKit, we provide our own clearable button */
  &[type="search"]::-webkit-search-cancel-button {
    appearance: none;
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
  margin: 0 var(--kds-spacing-container-0-12x);
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;

  &.placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
  }

  .container:focus-within & {
    color: var(--kds-color-text-and-icon-neutral);
  }
}

.clear-button {
  margin-left: var(--kds-spacing-container-0-12x);
}

.trailing-slot {
  display: flex;
  flex-shrink: 0;
  gap: var(--kds-spacing-container-0-12x);
  align-items: center;
  margin-left: var(--kds-spacing-container-0-12x);
}
</style>
