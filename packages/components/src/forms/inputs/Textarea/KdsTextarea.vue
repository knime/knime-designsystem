<script setup lang="ts">
import { computed, useTemplateRef, watch } from "vue";
import { useResizeObserver } from "@vueuse/core";

import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import type { KdsTextareaProps } from "../types";

const props = withDefaults(defineProps<KdsTextareaProps>(), {
  placeholder: "",
  rows: 3,
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const normalizedRows = computed(() => Math.max(1, props.rows));

const modelValue = defineModel<string>({ default: "" });

const textareaElement = useTemplateRef("textareaElement");

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

useResizeObserver(textareaElement, resize);
watch(modelValue, resize, { immediate: true });

defineExpose<KdsFormFieldExpose>({
  focus: () => {
    textareaElement.value?.focus();
  },
});
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <textarea
        v-bind="slotProps"
        ref="textareaElement"
        v-model="modelValue"
        :class="{ invalid: props.error }"
        :rows="normalizedRows"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :name="props.name"
        :autocomplete="props.autocomplete"
      />
    </template>
  </BaseFormFieldWrapper>
</template>

<style scoped>
textarea {
  box-sizing: border-box;
  width: 100%;
  padding: var(--kds-spacing-container-0-5x);
  overflow: hidden;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  resize: none;
  outline: none;
  scrollbar-width: none;
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);
  -ms-overflow-style: none;

  &.invalid {
    border: var(--kds-border-action-error);
  }

  &::placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }

  &:disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;
    border: var(--kds-border-action-disabled);
    border-color: var(--kds-color-border-disabled);

    &::placeholder {
      color: var(--kds-color-text-and-icon-disabled);
    }
  }

  &:hover:not(:disabled, :focus) {
    background: var(--kds-color-background-input-hover);
  }

  &:focus:not(:disabled) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
