<script setup lang="ts">
import { computed, ref, useId } from "vue";

import { KdsColorSwatch } from "../../../accessories";
import KdsDataType from "../../../accessories/Icon/KdsDataType.vue";
import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";
import { KdsPopover } from "../../../overlays";
import BaseFormFieldWrapper from "../../BaseFormFieldWrapper.vue";

import DropdownContainer from "./DropdownContainer.vue";
import type { KdsDropdownProps } from "./types";

const props = withDefaults(defineProps<KdsDropdownProps>(), {
  placeholder: "",
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  noEntriesText: "No entries found",
});

const modelValue = defineModel<string | null>({ default: null });

const open = ref(false);

const activatorEl = ref<HTMLElement | null>(null);
const valueTextId = useId();

const selectedOption = computed(() =>
  props.possibleValues.find((o) => o.id === modelValue.value),
);

const isMissingSelected = computed(
  () => Boolean(modelValue.value) && !selectedOption.value,
);

const selectedAccessory = computed(() => selectedOption.value?.accessory);

const triggerValue = computed({
  get: () => {
    if (!modelValue.value) {
      return "";
    }

    if (!selectedOption.value) {
      return `(Missing) ${modelValue.value}`;
    }

    return selectedOption.value.text;
  },
  // read-only input; setter intentionally does nothing
  set: () => undefined,
});

const triggerText = computed(() => {
  if (!modelValue.value) {
    return props.placeholder;
  }

  return triggerValue.value;
});

const onTriggerKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) {
    return;
  }

  switch (event.key) {
    case "ArrowDown":
    case "ArrowUp":
      event.preventDefault();
      if (!open.value) {
        open.value = true;
      }
      break;
  }
};
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <button
        v-bind="slotProps"
        ref="activatorEl"
        class="kds-dropdown-trigger-button"
        type="button"
        role="combobox"
        aria-autocomplete="list"
        :aria-labelledby="
          [slotProps.ariaLabelledby, valueTextId].filter(Boolean).join(' ')
        "
        :aria-readonly="props.readonly || undefined"
        :disabled="props.disabled"
        :class="{
          error: props.error,
          readonly: props.readonly,
          missing: isMissingSelected,
        }"
        @click="open = !open"
        @keydown="onTriggerKeydown"
      >
        <span v-if="selectedAccessory" class="leading" aria-hidden="true">
          <KdsIcon
            v-if="selectedAccessory?.type === 'icon'"
            :name="selectedAccessory.name"
          />
          <KdsDataType
            v-else-if="selectedAccessory?.type === 'dataType'"
            :icon-name="selectedAccessory.name"
          />
          <KdsColorSwatch
            v-else-if="selectedAccessory?.type === 'colorSwatch'"
            :color="selectedAccessory.color"
            :title="selectedAccessory.title"
          />
        </span>

        <span
          :id="valueTextId"
          class="text"
          :class="{ placeholder: !modelValue, missing: isMissingSelected }"
        >
          {{ triggerText }}
        </span>

        <span class="trailing" aria-hidden="true">
          <KdsIcon :name="open ? 'chevron-up' : 'chevron-down'" size="small" />
        </span>
      </button>

      <KdsPopover
        v-model="open"
        :activator-el="activatorEl"
        placement="bottom-left"
        full-width
        role="listbox"
      >
        <DropdownContainer
          ref="dropdownContainerEl"
          v-model="modelValue"
          v-model:open="open"
          :possible-values="props.possibleValues"
          :no-entries-text="props.noEntriesText"
          :required="props.required"
        />
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>

<style scoped>
.kds-dropdown-trigger-button {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0 var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &.error {
    border: var(--kds-border-action-error);
  }

  &:disabled {
    cursor: default;
    border: var(--kds-border-action-disabled);
    border-color: var(--kds-color-border-disabled);
  }

  &:not(:disabled, :focus):hover {
    background: var(--kds-color-background-input-hover);
  }
}

.leading {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: var(--kds-dimension-component-width-1x);
  height: var(--kds-dimension-component-width-1x);
  margin-left: var(--kds-spacing-container-0-12x);

  & > div {
    width: 100%;
    height: 100%;
  }
}

.text {
  flex: 1 0 0;
  min-width: 0;
  padding: var(--kds-spacing-container-0-25x);
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--kds-color-text-and-icon-neutral);
  text-align: left;
  white-space: nowrap;

  &.placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }

  .kds-dropdown-trigger-button:disabled & {
    color: var(--kds-color-text-and-icon-disabled);
  }

  .kds-dropdown-trigger-button.missing & {
    color: var(--kds-color-text-and-icon-danger);
  }
}

.trailing {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding-right: var(--kds-spacing-container-0-12x);
  color: var(--kds-color-text-and-icon-subtle);

  .kds-dropdown-trigger-button:disabled & {
    color: var(--kds-color-text-and-icon-disabled);
  }

  .kds-dropdown-trigger-button:focus-visible &,
  .kds-dropdown-trigger-button:not(:disabled) .text:not(.placeholder) ~ & {
    color: var(--kds-color-text-and-icon-neutral);
  }
}
</style>
