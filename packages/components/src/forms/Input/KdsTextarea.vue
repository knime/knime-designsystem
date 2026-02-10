<script setup lang="ts">
import { ref, watch } from "vue";
import { useResizeObserver } from "@vueuse/core";

import KdsFormField from "../KdsFormField.vue";

import type { KdsTextareaProps } from "./types";

const props = withDefaults(defineProps<KdsTextareaProps>(), {
  placeholder: "",
  ariaLabel: undefined,
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<string>({ default: "" });

const textareaElement = ref<HTMLTextAreaElement | null>(null);

function resize() {
  const element = textareaElement.value;
  if (!element) {
    return;
  }

  // Reset height so scrollHeight reflects the full content height for shrinking.
  element.style.height = "auto";

  const scrollHeight = element.scrollHeight;
  const offsetHeight = element.offsetHeight;
  if (scrollHeight <= offsetHeight) {
    return;
  }

  element.style.height = `${scrollHeight}px`;
}

const supportsFieldSizing =
  typeof CSS !== "undefined" && CSS.supports?.("field-sizing", "content");

if (!supportsFieldSizing) {
  useResizeObserver(textareaElement, resize);
  watch(modelValue, resize);
}
</script>

<template>
  <KdsFormField v-bind="props">
    <template #default="slotProps">
      <textarea
        v-bind="slotProps"
        ref="textareaElement"
        v-model="modelValue"
        :class="{
          error: props.error,
          disabled: props.disabled,
        }"
        :rows="3"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :name="props.name"
        :autocomplete="props.autocomplete"
      />
    </template>
  </KdsFormField>
</template>

<style scoped>
textarea {
  box-sizing: border-box;
  width: 100%;
  min-height: var(--kds-dimension-component-height-4x);
  padding: var(--kds-spacing-container-0-5x);
  overflow: hidden;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  resize: none;
  outline: none;
  field-sizing: content;
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);

  &.error {
    border: var(--kds-border-action-error);
  }

  &.disabled {
    border: var(--kds-border-action-disabled);
    border-color: var(--kds-color-border-disabled);
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

  &:hover:not(:disabled, :focus) {
    background: var(--kds-color-background-input-hover);
  }

  &:focus:not(.disabled) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }
}
</style>
