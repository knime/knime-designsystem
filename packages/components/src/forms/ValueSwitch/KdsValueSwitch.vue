<script lang="ts" setup>
import { computed, ref, useId } from "vue";

import KdsIcon from "../../Icon/KdsIcon.vue";
import { useIndexSelection } from "../composables/useIndexSelection.ts";

import ValueSwitchItem from "./ValueSwitchItem.vue";
import type { KdsValueSwitchOption, KdsValueSwitchProps } from "./types.ts";

const props = withDefaults(defineProps<KdsValueSwitchProps>(), {
  disabled: false,
  size: "medium",
  variant: "default",
});

const modelValue = defineModel<string | null | undefined>();

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
const optionContainer = ref<HTMLElement | null>(null);

const { tabIndexForOption, handleClick, handleKeyDown } = useIndexSelection({
  selectedId: modelValue,
  options,
  globalDisable: computed(() => props.disabled),
  optionContainer,
});
</script>

<template>
  <div
    :id="props.id"
    role="radiogroup"
    :class="{
      'value-switch': true,
      'size-small': props.size === 'small',
    }"
    :aria-invalid="props.error || undefined"
    :aria-labelledby="props.label ? labelId : undefined"
    :aria-describedby="props.subText ? descriptionId : undefined"
  >
    <div v-if="props.label" :id="labelId" class="label">
      {{ props.label }}
    </div>

    <div ref="optionContainer" :class="{ options: true, error: props.error }">
      <ValueSwitchItem
        v-for="(option, index) in options"
        :key="option.id"
        v-bind="option"
        :selected="modelValue === option.id"
        :disabled="props.disabled"
        :size="props.size"
        :variant="props.variant"
        :tab-index="tabIndexForOption(index)"
        @click="() => handleClick(index)"
        @keydown="handleKeyDown($event, index)"
      />
    </div>

    <div
      v-if="props.subText || props.preserveSubTextSpace"
      :id="descriptionId"
      :class="{ subtext: true, error: props.error }"
    >
      <template v-if="props.error && props.subText">
        <KdsIcon class="subtext-icon" name="circle-error" size="small" />
      </template>
      <span class="subtext-text">{{ props.subText }}</span>
    </div>
  </div>
</template>

<style scoped>
.label {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  min-height: var(--kds-dimension-component-height-0-75x);
  padding-bottom: var(--kds-spacing-input-label-spacing-bottom);
  font: var(--kds-font-base-title-small-strong);
  color: var(--kds-color-text-and-icon-neutral);
}

.value-switch {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  border: none;
}

.options {
  display: inline-flex;
  flex-flow: row wrap;
  gap: var(--kds-spacing-container-none);
  align-items: flex-start;
  width: fit-content;
  max-width: 100%;
  padding: calc(var(--kds-spacing-container-0-12x) - 1px);
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

.subtext {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  min-height: var(--kds-dimension-component-height-0-75x);
  margin-top: var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);

  &.error {
    color: var(--kds-color-text-and-icon-danger);
  }
}
</style>
