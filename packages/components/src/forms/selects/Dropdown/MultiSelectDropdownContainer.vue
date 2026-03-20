<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";

import { KdsListItemButton } from "../../_helper/List/KdsListItemButton";
import { KdsListContainer } from "../../_helper/List/ListContainer";
import type { KdsListOption } from "../../_helper/List/ListContainer";
import BaseInput from "../../inputs/BaseInput.vue";

import type {
  KdsDropdownOption,
  KdsMultiSelectDropdownContainerProps,
} from "./types";

const ADD_NEW_VALUE_ID = `__kds-add-new-${useId()}__`;

const props = withDefaults(
  defineProps<KdsMultiSelectDropdownContainerProps>(),
  {
    loading: false,
    allowNewValues: false,
  },
);

const emit = defineEmits<{
  /** Emitted when the user adds a new value via the search field (only when `allowNewValues` is true). The parent must append a matching option to `possibleValues` and add the id to `modelValue`. */
  addValue: [text: string];
}>();

const modelValue = defineModel<string[]>({ default: () => [] });

const searchValue = defineModel<string>("searchValue", { default: "" });
const searchEl = useTemplateRef("searchEl");
const listContainerRef = useTemplateRef("listContainer");

/** Snapshot of selected IDs captured when the container is opened, used to keep sort order stable. */
const initialSelectedIds = ref(new Set<string>());

const knownIds = computed(() => new Set(props.possibleValues.map((o) => o.id)));

const syntheticMissingOptions = computed<KdsDropdownOption[]>(() =>
  modelValue.value
    .filter((id) => !knownIds.value.has(id))
    .map((id) => ({ id, text: id })),
);

const filteredOptions = computed<KdsDropdownOption[]>(() => {
  const normalizedQuery = searchValue.value.trim().toLowerCase();

  if (normalizedQuery.length === 0) {
    return props.possibleValues;
  }

  return props.possibleValues.filter((option) =>
    option.text.toLowerCase().includes(normalizedQuery),
  );
});

const canAddNewValue = computed(() => {
  const trimmed = searchValue.value.trim();
  if (!props.allowNewValues || trimmed.length === 0) {
    return false;
  }
  const lower = trimmed.toLowerCase();
  const existsInOptions = props.possibleValues.some(
    (o) => o.text.toLowerCase() === lower,
  );
  const idCollision = knownIds.value.has(trimmed);
  const alreadySelected = modelValue.value.includes(trimmed);
  return !existsInOptions && !idCollision && !alreadySelected;
});

const listOptions = computed<KdsListOption[]>(() => {
  const selectedSet = new Set(modelValue.value);

  const addNewItem: KdsListOption[] = canAddNewValue.value
    ? [
        {
          id: ADD_NEW_VALUE_ID,
          text: searchValue.value.trim(),
          accessory: { type: "icon", name: "plus" },
          separator: true,
        },
      ]
    : [];

  const missingItems: KdsListOption[] = syntheticMissingOptions.value.map(
    (option) => ({
      id: option.id,
      text: option.text,
      selected: true,
      missing: true,
    }),
  );

  const regularItems: KdsListOption[] = filteredOptions.value
    .map((option) => ({
      id: option.id,
      text: option.text,
      subText: option.subText,
      special: option.special,
      accessory: option.accessory,
      selected: selectedSet.has(option.id),
      disabled: option.disabled,
    }))
    .slice()
    .sort(
      (a, b) =>
        Number(initialSelectedIds.value.has(b.id)) -
        Number(initialSelectedIds.value.has(a.id)),
    );

  return [...addNewItem, ...missingItems, ...regularItems];
});

const visibleEnabledIds = computed(() =>
  filteredOptions.value.filter((o) => !o.disabled).map((o) => o.id),
);

const anyVisibleSelected = computed(() =>
  visibleEnabledIds.value.some((id) => modelValue.value.includes(id)),
);

const onItemClick = (id: string) => {
  if (id === ADD_NEW_VALUE_ID) {
    const trimmed = searchValue.value.trim();
    if (trimmed.length > 0) {
      emit("addValue", trimmed);
      searchValue.value = "";
    }
    return;
  }
  modelValue.value = modelValue.value.includes(id)
    ? modelValue.value.filter((entryId) => entryId !== id)
    : [...modelValue.value, id];
};

const onSelectAllOrClearAll = () => {
  const ids = new Set(visibleEnabledIds.value);
  if (anyVisibleSelected.value) {
    modelValue.value = modelValue.value.filter((id) => !ids.has(id));
  } else {
    const alreadySelected = new Set(modelValue.value);
    const toAdd = visibleEnabledIds.value.filter(
      (id) => !alreadySelected.has(id),
    );
    modelValue.value = [...modelValue.value, ...toAdd];
  }
};

defineExpose({
  focus: () => {
    initialSelectedIds.value = new Set(modelValue.value);
    searchEl.value?.focus();
  },
});
</script>

<template>
  <div class="kds-multi-select-dropdown-options">
    <div class="kds-multi-select-dropdown-search">
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
      class="kds-multi-select-dropdown-list"
      :class="{
        multiline: props.possibleValues.some((o) => o.subText !== undefined),
      }"
      :possible-values="props.loading ? [] : listOptions"
      :loading="props.loading"
      :empty-text="props.emptyText"
      controlled-externally
      aria-label="Dropdown options"
      @item-click="$event && onItemClick($event)"
    />

    <div
      v-if="!props.loading && visibleEnabledIds.length > 0"
      class="kds-multi-select-dropdown-footer"
    >
      <KdsListItemButton
        :label="anyVisibleSelected ? 'Clear all' : 'Select all'"
        :leading-icon="anyVisibleSelected ? 'trash' : 'checkmark'"
        :disabled="filteredOptions.every((o) => o.disabled)"
        @click="onSelectAllOrClearAll"
      />
    </div>
  </div>
</template>

<style scoped>
.kds-multi-select-dropdown-options {
  display: flex;
  flex-direction: column;
  min-width: var(--kds-dimension-component-width-12x);
  background: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}

.kds-multi-select-dropdown-search {
  padding: var(--kds-spacing-container-0-25x);
  border-bottom: var(--kds-border-base-subtle);
}

.kds-multi-select-dropdown-list {
  max-height: var(--kds-dimension-component-height-12x);

  &.multiline {
    max-height: var(--kds-dimension-component-height-20x);
  }
}

.kds-multi-select-dropdown-footer {
  padding: var(--kds-spacing-container-0-25x);
  border-top: var(--kds-border-base-subtle);
}
</style>
