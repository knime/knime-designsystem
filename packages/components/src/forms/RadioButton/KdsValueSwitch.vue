<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import { useElementSize } from "@vueuse/core";

import BaseFieldsetWrapper from "../_helper/BaseFieldsetWrapper.vue";

import ValueSwitchItem from "./ValueSwitchItem.vue";
import type { KdsValueSwitchOption, KdsValueSwitchProps } from "./types";
import { useRadioSelection } from "./useRadioSelection";
import { useValueSwitchIconHiding } from "./useValueSwitchIconHiding";

const {
  disabled = false,
  size = "medium",
  variant = "default",
  ...props
} = defineProps<KdsValueSwitchProps>();

const modelValue = defineModel<string>();

const options = computed(
  () =>
    props.possibleValues.map((o) => {
      if (typeof o === "string") {
        return { text: o, id: o };
      }
      return o;
    }) satisfies KdsValueSwitchOption[],
);

const fieldsetWrapper = useTemplateRef("fieldsetWrapper");
const { width } = useElementSize(fieldsetWrapper);
const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
  width,
  options,
});

const optionContainer = useTemplateRef("optionContainer");
const { tabIndexForOption, handleClick, handleKeyDown } = useRadioSelection({
  selectedId: modelValue,
  options,
  globalDisable: computed(() => disabled),
  optionContainer,
});
</script>

<template>
  <BaseFieldsetWrapper
    :id="props.id"
    ref="fieldsetWrapper"
    :label="props.label"
    role="radiogroup"
    :class="{
      'value-switch': true,
      'size-small': size === 'small',
    }"
    :aria-invalid="props.error || undefined"
    :sub-text="props.subText"
    :preserve-sub-text-space="props.preserveSubTextSpace"
    :error="props.error"
  >
    <div ref="optionContainer" :class="{ options: true, error: props.error }">
      <ValueSwitchItem
        v-for="(option, index) in options"
        :key="option.id"
        :ref="(el) => setItemEl(option.id, el)"
        v-bind="option"
        :hide-icons="shouldHideIcons"
        :selected="modelValue === option.id"
        :disabled="disabled || option.disabled"
        :size="size"
        :variant="variant"
        :tab-index="tabIndexForOption(index)"
        @click="() => handleClick(index)"
        @keydown="handleKeyDown($event, index)"
      />
    </div>
  </BaseFieldsetWrapper>
</template>

<style scoped>
.value-switch {
  align-items: flex-start;
}

.options {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--kds-spacing-container-none);
  align-items: flex-start;
  width: fit-content;
  min-width: 0;
  max-width: 100%;
  padding: calc(
    var(--kds-spacing-container-0-12x) - var(--kds-core-border-width-xs)
  );
  overflow: hidden;
  background: var(--kds-color-surface-muted);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-fake-border-xs-muted);

  &:has(:focus-visible) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-44x);
  }

  &.error {
    border: var(--kds-border-action-error);
    box-shadow: none;
  }
}
</style>
