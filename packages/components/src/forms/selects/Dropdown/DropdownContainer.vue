<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import type { KdsListOption } from "../../_helper/List/ListContainer";
import { KdsListContainer } from "../../_helper/List/ListContainer";
import BaseInput from "../../inputs/BaseInput.vue";

import type { DropdownContainerProps, KdsDropdownOption } from "./types";

const props = defineProps<DropdownContainerProps>();

const modelValue = defineModel<string>({ default: "" });

const searchValue = ref("");

const searchEl = useTemplateRef("searchEl");
const listContainerRef = useTemplateRef("listContainer");

type DropdownOptionWithMissing = KdsDropdownOption & { missing?: boolean };

const optionsWithSyntheticMissing = computed<DropdownOptionWithMissing[]>(
  () => {
    if (!modelValue.value) {
      return props.possibleValues;
    }

    const hasSelected = props.possibleValues.some(
      (o) => o.id === modelValue.value,
    );
    if (hasSelected) {
      return props.possibleValues;
    }

    return [
      {
        id: modelValue.value,
        text: modelValue.value,
        missing: true,
      },
      ...props.possibleValues,
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

const hasMultiline = computed(() =>
  props.possibleValues.some((o) => o.subText !== undefined),
);

defineExpose({
  focus: () => searchEl.value?.focus(),
});
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
        :aria-activedescendant="listContainerRef?.activeDescendant"
        leading-icon="search"
        :clearable="true"
        @keydown="listContainerRef?.handleKeydown($event)"
        @focus="listContainerRef?.handleFocus()"
        @blur="listContainerRef?.handleBlur()"
      />
    </div>

    <KdsListContainer
      ref="listContainer"
      class="kds-dropdown-container-list"
      :class="{ multiline: hasMultiline }"
      :possible-values="props.loading ? [] : listOptions"
      :loading="props.loading"
      :empty-text="props.emptyText"
      controlled-externally
      aria-label="Dropdown options"
      @item-click="modelValue = $event"
    />
  </div>
</template>

<style scoped>
.kds-dropdown-container {
  display: flex;
  flex-direction: column;
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}

.kds-dropdown-container-sticky-top {
  padding: var(--kds-spacing-container-0-25x);
  background-color: var(--kds-color-surface-default);
  border-bottom: var(--kds-border-base-subtle);
}

.kds-dropdown-container-list {
  max-height: var(--kds-dimension-component-height-12x);

  &.multiline {
    max-height: var(--kds-dimension-component-height-20x);
  }
}
</style>
