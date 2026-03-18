<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useTemplateRef,
  watch,
  watchEffect,
} from "vue";

import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";

import BaseDropdown from "./BaseDropdown.vue";
import MultiSelectDropdownContainer from "./MultiSelectDropdownContainer.vue";
import type { KdsDropdownOption, KdsMultiSelectDropdownProps } from "./types";

const props = withDefaults(defineProps<KdsMultiSelectDropdownProps>(), {
  placeholder: "Select",
  disabled: false,
  loading: false,
  allowNewValues: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<string[]>({ default: () => [] });

const open = ref(false);
const dropdownContainerEl = useTemplateRef("dropdownContainerEl");
const popoverEl = useTemplateRef("popoverEl");

watchEffect(() => {
  if (open.value) {
    nextTick(() => dropdownContainerEl.value?.focus());
  }
});

/** Options added by the user via the combo-box search field. */
const addedOptions = ref<KdsDropdownOption[]>([]);

/**
 * When `allowNewValues` is false, reset added options whenever possibleValues
 * change (mirrors the old ComboBox behaviour where allPossibleItems syncs
 * with props). When `allowNewValues` is true the additions persist.
 */
watch(
  [() => props.possibleValues, () => props.allowNewValues],
  ([, allowNew]) => {
    if (!allowNew) {
      addedOptions.value = [];
    }
  },
);

const allPossibleValues = computed(() => {
  const baseIds = new Set(props.possibleValues.map((o) => o.id));
  const deduped = addedOptions.value.filter((o) => !baseIds.has(o.id));
  return [...props.possibleValues, ...deduped];
});

const optionById = computed(
  () => new Map(allPossibleValues.value.map((item) => [item.id, item])),
);

const missingIds = computed(() =>
  modelValue.value.filter((id) => !optionById.value.has(id)),
);

const summary = computed(() => {
  if (modelValue.value.length === 0) {
    return undefined;
  }

  if (missingIds.value.length > 0) {
    return `(Missing) ${missingIds.value[0]}`;
  }

  return `Selected (${modelValue.value.length}/${allPossibleValues.value.length})`;
});

const onAddValue = (text: string) => {
  addedOptions.value = [...addedOptions.value, { id: text, text }];
  modelValue.value = [...modelValue.value, text];
};
</script>

<template>
  <BaseFormFieldWrapper
    :id="props.id"
    :label="props.label"
    :aria-label="props.ariaLabel"
    :description="props.description"
    :sub-text="props.subText"
    :error="props.error"
    :validating="props.validating"
    :preserve-sub-text-space="props.preserveSubTextSpace"
  >
    <template #default="slotProps">
      <BaseDropdown
        v-bind="slotProps"
        v-model:open="open"
        :text="summary"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :error="props.error"
        :missing="missingIds.length > 0"
        :style="popoverEl?.anchorStyle"
        :popover-id="popoverEl?.popoverId"
        @click="open = !open"
      />

      <KdsPopover
        ref="popoverEl"
        v-model="open"
        placement="bottom-left"
        role="dialog"
        full-width
        popover-aria-label="Multi select dropdown options"
      >
        <MultiSelectDropdownContainer
          ref="dropdownContainerEl"
          v-model="modelValue"
          :possible-values="allPossibleValues"
          :loading="props.loading"
          :allow-new-values="props.allowNewValues"
          empty-text="No entries found"
          @add-value="onAddValue"
        />
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>
