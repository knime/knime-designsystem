<script lang="ts" setup>
import { computed, ref, useId } from "vue";
import { useElementSize } from "@vueuse/core";

import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import ValueSwitchItem from "./ValueSwitchItem.vue";
import type { KdsValueSwitchOption, KdsValueSwitchProps } from "./types.ts";
import { useRadioSelection } from "./useRadioSelection.ts";
import { useValueSwitchIconHiding } from "./useValueSwitchIconHiding";

const props = withDefaults(defineProps<KdsValueSwitchProps>(), {
  disabled: false,
  size: "medium",
  variant: "default",
});

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

const labelId = useId();
const descriptionId = useId();

const availableWidthContainer = ref<HTMLElement | null>(null);
const { width } = useElementSize(availableWidthContainer);
const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
  width,
  options,
});

const optionContainer = ref<HTMLElement | null>(null);
const { tabIndexForOption, handleClick, handleKeyDown } = useRadioSelection({
  selectedId: modelValue,
  options,
  globalDisable: computed(() => props.disabled),
  optionContainer,
});
</script>

<template>
  <div
    :id="props.id"
    ref="availableWidthContainer"
    role="radiogroup"
    :class="{
      'value-switch': true,
      'size-small': props.size === 'small',
    }"
    :aria-invalid="props.error || undefined"
    :aria-labelledby="props.label ? labelId : undefined"
    :aria-describedby="props.subText ? descriptionId : undefined"
  >
    <KdsLabel v-if="props.label" :id="labelId" :label="props.label" />

    <div ref="optionContainer" :class="{ options: true, error: props.error }">
      <ValueSwitchItem
        v-for="(option, index) in options"
        :key="option.id"
        :ref="(el) => setItemEl(option.id, el)"
        v-bind="option"
        :hide-icons="shouldHideIcons"
        :selected="modelValue === option.id"
        :disabled="props.disabled || option.disabled"
        :size="props.size"
        :variant="props.variant"
        :tab-index="tabIndexForOption(index)"
        :title="option.title"
        @click="() => handleClick(index)"
        @keydown="handleKeyDown($event, index)"
      />
    </div>

    <KdsSubText
      :id="descriptionId"
      :sub-text="props.subText"
      :preserve-sub-text-space="props.preserveSubTextSpace"
      :error="props.error"
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

  &:focus-within:has(:focus-visible) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-44x);
  }

  &.error {
    border: var(--kds-border-action-error);
  }
}
</style>
