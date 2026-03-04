<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from "vue";

import BaseInput from "../../inputs/BaseInput.vue";
import { KdsListContainer } from "../ListContainer";
import type { KdsListOption } from "../ListContainer";

import type { KdsDropdownOption } from "./types";

type DropdownOptionWithMissing = KdsDropdownOption & { missing: boolean };

type KdsDropdownContainerProps = {
  noEntriesText: string;
  possibleValues: KdsDropdownOption[];
};

const props = defineProps<KdsDropdownContainerProps>();

const modelValue = defineModel<string | null>({ default: null });

const searchValue = ref("");

const searchEl = useTemplateRef("searchEl");
const listContainerRef = useTemplateRef("listContainer");

const optionsWithSyntheticMissing = computed<DropdownOptionWithMissing[]>(
  () => {
    const baseOptions = props.possibleValues.map((option) => ({
      ...option,
      missing: false,
    }));

    if (!modelValue.value) {
      return baseOptions;
    }

    const hasSelected = props.possibleValues.some(
      (o) => o.id === modelValue.value,
    );
    if (hasSelected) {
      return baseOptions;
    }

    return [
      {
        id: modelValue.value,
        text: modelValue.value,
        missing: true,
      },
      ...baseOptions,
    ];
  },
);

const filteredOptions = computed(() => {
  const normalizedQuery = searchValue.value.trim().toLowerCase();

  const base = optionsWithSyntheticMissing.value;
  if (normalizedQuery.length === 0) {
    return base;
  }

  return base.filter((option) =>
    option.text.toLowerCase().includes(normalizedQuery),
  );
});

const listOptions = computed<KdsListOption[]>(() =>
  filteredOptions.value.map((option) => ({
    id: option.id,
    text: option.text,
    subText: option.subText,
    accessory: option.accessory,
    disabled: option.disabled || option.missing,
    selected: option.id === modelValue.value,
    special: option.special,
    missing: option.missing,
  })),
);

const focusSearch = () => {
  nextTick(() => searchEl.value?.focus());
};

defineExpose({ focusSearch });
</script>

<template>
  <div class="kds-dropdown-container">
    <div class="kds-dropdown-container-sticky-top">
      <BaseInput
        ref="searchEl"
        v-model="searchValue"
        type="search"
        placeholder="Search"
        :aria-label="'Filter options'"
        :aria-activedescendant="listContainerRef?.activeId"
        leading-icon="search"
        :clearable="true"
        @keydown="listContainerRef?.handleKeydown($event)"
        @focus="listContainerRef?.handleFocus()"
        @blur="listContainerRef?.handleBlur()"
      />
    </div>

    <KdsListContainer
      ref="listContainer"
      :possible-values="listOptions"
      :no-entries-text="props.noEntriesText"
      controlled-externally
      aria-label="Dropdown options"
      @toggle-item="modelValue = $event"
    />
  </div>
</template>

<style scoped>
.kds-dropdown-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}

.kds-dropdown-container-sticky-top {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: var(--kds-spacing-container-0-25x);
  background-color: var(--kds-color-surface-default);
  border-bottom: var(--kds-border-base-subtle);
}
</style>
