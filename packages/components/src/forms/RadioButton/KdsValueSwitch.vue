<script lang="ts" setup>
import { computed, useId, useTemplateRef } from "vue";
import { useElementSize } from "@vueuse/core";

import KdsLabel from "../_helper/KdsLabel.vue";
import KdsSubText from "../_helper/KdsSubText.vue";

import ValueSwitchItem from "./ValueSwitchItem.vue";
import type { KdsValueSwitchOption, KdsValueSwitchProps } from "./types";
import { useRadioSelection } from "./useRadioSelection";
import { useValueSwitchIconHiding } from "./useValueSwitchIconHiding";

const {
  disabled = false,
  size = "medium",
  variant = "default",
  possibleValues,
  id,
  label,
  subText,
  error,
  preserveSubTextSpace,
} = defineProps<KdsValueSwitchProps>();

const modelValue = defineModel<string>();

const options = computed(
  () =>
    possibleValues.map((o) => {
      if (typeof o === "string") {
        return { text: o, id: o };
      }
      return o;
    }) satisfies KdsValueSwitchOption[],
);

const labelId = useId();
const descriptionId = useId();

const availableWidthContainer = useTemplateRef<HTMLElement>(
  "availableWidthContainer",
);
const { width } = useElementSize(availableWidthContainer);
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
  <div
    :id="id"
    ref="availableWidthContainer"
    role="radiogroup"
    :class="{
      'value-switch': true,
      'size-small': size === 'small',
    }"
    :aria-invalid="error || undefined"
    :aria-labelledby="label ? labelId : undefined"
    :aria-describedby="subText ? descriptionId : undefined"
  >
    <KdsLabel v-if="label" :id="labelId" :label="label" />

    <div ref="optionContainer" :class="{ options: true, error: error }">
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

    <KdsSubText
      :id="descriptionId"
      :sub-text="subText"
      :preserve-sub-text-space="preserveSubTextSpace"
      :error="error"
    />
  </div>
</template>

<style scoped>
.value-switch {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  border: none;
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
