<script setup lang="ts">
import { computed, ref, useId, useTemplateRef, watch } from "vue";

import type { KdsPopoverExpose } from "../../../overlays/Popover";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type {
  KdsListContainerExpose,
  KdsListOption,
} from "../../_helper/List/ListContainer";
import { KdsListContainer } from "../../_helper/List/ListContainer";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import type { KdsTextInputProps } from "./types";

const props = withDefaults(defineProps<KdsTextInputProps>(), {
  disabled: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<string>({ default: "" });

const baseInput = useTemplateRef("baseInput");
const popoverRef = useTemplateRef<KdsPopoverExpose>("popoverRef");
const listContainerRef =
  useTemplateRef<KdsListContainerExpose>("listContainerRef");
const popoverOpen = ref(false);
const isFocused = ref(false);

const hasSuggestions = computed(() => Boolean(props.suggestions?.length));

const filteredSuggestions = computed<KdsListOption[]>(() => {
  if (!props.suggestions) {
    return [];
  }
  const query = modelValue.value.trim().toLowerCase();
  return props.suggestions
    .filter((s) => query.length === 0 || s.toLowerCase().includes(query))
    .map((s, index) => ({
      id: String(index),
      text: s,
    }));
});

const hasFilteredSuggestions = computed(
  () => filteredSuggestions.value.length > 0,
);

const closePopover = () => {
  popoverOpen.value = false;
  listContainerRef.value?.handleBlur();
};

const onFocus = () => {
  isFocused.value = true;
  if (hasFilteredSuggestions.value) {
    popoverOpen.value = true;
    listContainerRef.value?.handleFocus();
  }
};

const onBlur = () => {
  isFocused.value = false;
  closePopover();
};

watch(hasFilteredSuggestions, (has) => {
  if (!isFocused.value) {
    return;
  }
  if (has) {
    popoverOpen.value = true;
    listContainerRef.value?.handleFocus();
  } else {
    closePopover();
  }
});

const onKeydown = (event: KeyboardEvent) => {
  if (!hasFilteredSuggestions.value) {
    return;
  }

  if (!popoverOpen.value) {
    popoverOpen.value = true;
    listContainerRef.value?.handleFocus();
    listContainerRef.value?.handleKeydown(event);
    return;
  }

  if (event.key === "Escape") {
    closePopover();
    event.preventDefault();
    return;
  }

  listContainerRef.value?.handleKeydown(event);
};

const onItemClick = (id?: string) => {
  const option = filteredSuggestions.value.find((o) => o.id === id);
  if (option) {
    modelValue.value = option.text;
  }
  closePopover();
};

const suggestionId = useId();

defineExpose<KdsFormFieldExpose>({
  focus: () => baseInput.value?.focus(),
});
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
      <BaseInput
        ref="baseInput"
        v-bind="slotProps"
        v-model="modelValue"
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :error="props.error"
        :autocomplete="hasSuggestions ? 'off' : props.autocomplete"
        :role="hasSuggestions ? 'combobox' : undefined"
        :aria-haspopup="hasSuggestions ? 'listbox' : undefined"
        :aria-expanded="hasSuggestions ? popoverOpen : undefined"
        :aria-autocomplete="hasSuggestions ? 'list' : undefined"
        :aria-controls="hasSuggestions ? suggestionId : undefined"
        :aria-activedescendant="listContainerRef?.activeDescendant"
        :style="hasSuggestions ? popoverRef?.anchorStyle : undefined"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />

      <KdsPopover
        v-if="hasSuggestions"
        ref="popoverRef"
        v-model="popoverOpen"
        placement="bottom-left"
        full-width
        popover-type="manual"
      >
        <KdsListContainer
          :id="suggestionId"
          ref="listContainerRef"
          class="kds-text-input-suggestions"
          :possible-values="filteredSuggestions"
          controlled-externally
          aria-label="Suggestions"
          @item-click="onItemClick"
        />
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>

<style scoped>
.kds-text-input-suggestions {
  max-height: var(--kds-dimension-component-height-12x);
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
