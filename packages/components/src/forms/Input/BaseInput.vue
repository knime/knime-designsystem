<script setup lang="ts">
import { computed, ref, useId } from "vue";

import KdsIcon from "../../Icon/KdsIcon.vue";
import type { KdsIconName } from "../../Icon/types";
import KdsButton from "../../buttons/KdsButton.vue";

import type { KdsBaseInputEmits } from "./types";

type BaseInputProps = {
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
   * ID for the input element. If not provided, a unique ID will be generated.
   */
  id?: string;
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
   * Whether the input is in a validating state (shows loading indicator)
   */
  validating?: boolean;
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
   * Role of the input element (e.g. "combobox")
   */
  role?: string;
  /**
   * aria-haspopup value (e.g. "listbox")
   */
  ariaHaspopup?:
    | "dialog"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | boolean
    | "true"
    | "false";
  /**
   * aria-expanded state (e.g. for combobox)
   */
  ariaExpanded?: boolean;
  /**
   * aria-controls target ID (e.g. listbox ID)
   */
  ariaControls?: string;
  /**
   * aria-activedescendant target ID (e.g. active option ID)
   */
  ariaActivedescendant?: string;
  /**
   * aria-autocomplete value (e.g. "list")
   */
  ariaAutocomplete?: "none" | "inline" | "list" | "both";
  /**
   * Name attribute for the input element
   */
  name?: string;
  /**
   * Autocomplete attribute for the input element
   */
  autocomplete?: string;
  /**
   * Unit shown next to the input value
   */
  unit?: string;
  /**
   * Whether to show a clear button when the input has a value.
   */
  clearable?: boolean;
  /**
   * Text color for the input value.
   */
  textColor?: "neutral" | "subtle" | "danger";
};

const props = withDefaults(defineProps<BaseInputProps>(), {
  type: "text",
  min: undefined,
  max: undefined,
  step: undefined,
  placeholder: undefined,
  id: undefined,
  disabled: false,
  readonly: false,
  required: false,
  leadingIcon: undefined,
  trailingIcon: undefined,
  error: false,
  validating: false,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  role: undefined,
  ariaHaspopup: undefined,
  ariaExpanded: undefined,
  ariaControls: undefined,
  ariaActivedescendant: undefined,
  ariaAutocomplete: undefined,
  name: undefined,
  autocomplete: undefined,
  unit: undefined,
  clearable: false,
  textColor: "neutral",
});

const emit = defineEmits<KdsBaseInputEmits>();

const modelValue = defineModel<string>({ default: "" });

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);

const hasValue = computed(() => modelValue.value.length > 0);

const showUnitPlaceholder = computed(
  () => Boolean(props.unit) && modelValue.value.trim().length === 0,
);

const inputTextColor = computed(() => {
  switch (props.textColor) {
    case "danger":
      return "var(--kds-color-text-and-icon-danger)";
    case "subtle":
      return "var(--kds-color-text-and-icon-subtle)";
    case "neutral":
    default:
      return "var(--kds-color-text-and-icon-neutral)";
  }
});

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
        :role="props.role"
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
        :aria-label="props.ariaLabel"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="props.ariaDescribedby"
        :aria-haspopup="props.ariaHaspopup"
        :aria-expanded="props.ariaExpanded"
        :aria-controls="props.ariaControls"
        :aria-activedescendant="props.ariaActivedescendant"
        :aria-autocomplete="props.ariaAutocomplete"
        :aria-invalid="props.error"
        :style="{ '--kds-base-input-text-color': inputTextColor }"
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

      <div v-if="props.trailingIcon" class="icon-wrapper trailing">
        <KdsIcon :name="props.trailingIcon" />
      </div>
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

  .container.disabled & {
    color: var(--kds-color-text-and-icon-disabled);
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
  color: var(
    --kds-base-input-text-color,
    var(--kds-color-text-and-icon-neutral)
  );
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
