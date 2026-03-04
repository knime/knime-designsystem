<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";

import { useKdsDropdownNavigation } from "../../../util";
import { KdsListItem } from "../../_helper/List/KdsListItem";
import BaseInput from "../../inputs/BaseInput.vue";

import type { KdsDropdownOption } from "./types.ts";

type DropdownOptionWithMissing = KdsDropdownOption & { missing: boolean };

type KdsDropdownContainerProps = {
  noEntriesText: string;
  possibleValues: KdsDropdownOption[];
  required?: boolean;
};

const props = defineProps<KdsDropdownContainerProps>();

const modelValue = defineModel<string | null>({ default: null });

const selectItem = (id: string) => {
  modelValue.value = modelValue.value === id && !props.required ? null : id;
};

const containerId = useId();
const searchValue = ref("");

const searchEl = ref<InstanceType<typeof BaseInput> | null>(null);

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

const enabledOptions = computed(() =>
  filteredOptions.value.filter((option) => !option.disabled && !option.missing),
);

const makeElement = (index: number) => ({
  index,
  onClick: () => selectItem(enabledOptions.value[index].id),
});

const {
  currentIndex,
  onKeydown: onNavKeydown,
  resetNavigation,
  setElement,
} = useKdsDropdownNavigation({
  getNextElement(current, direction) {
    if (enabledOptions.value.length === 0) {
      return { index: -1, onClick: () => {} };
    }
    if (current === null) {
      const idx = direction > 0 ? 0 : enabledOptions.value.length - 1;
      return makeElement(idx);
    }
    const nextIdx = Math.min(
      Math.max(current + direction, 0),
      enabledOptions.value.length - 1,
    );
    return makeElement(nextIdx);
  },
  getFirstElement() {
    if (enabledOptions.value.length === 0) {
      return { index: -1, onClick: () => {} };
    }
    return makeElement(0);
  },
  getLastElement() {
    if (enabledOptions.value.length === 0) {
      return { index: -1, onClick: () => {} };
    }
    return makeElement(enabledOptions.value.length - 1);
  },
  close() {
    searchValue.value = "";
  },
  disableSpaceToClick: true,
});

const activeId = computed(() => {
  if (
    currentIndex.value === null ||
    currentIndex.value < 0 ||
    currentIndex.value >= enabledOptions.value.length
  ) {
    return null;
  }
  return `${containerId}-${enabledOptions.value[currentIndex.value].id}`;
});

const listItems = computed(() => {
  return filteredOptions.value.map((option) => ({
    id: `${containerId}-${option.id}`,
    optionId: option.id,
    label: option.text,
    subText: option.subText,
    accessory: option.accessory,
    disabled: Boolean(option.disabled) || option.missing,
    missing: option.missing,
    selected: option.id === modelValue.value,
    active: `${containerId}-${option.id}` === activeId.value,
    special: option.special,
  }));
});

const ensureActiveIndex = () => {
  if (currentIndex.value !== null) {
    return;
  }

  const selectedIdx = enabledOptions.value.findIndex(
    (o) => o.id === modelValue.value,
  );
  if (selectedIdx !== -1) {
    setElement(makeElement(selectedIdx));
    return;
  }

  if (enabledOptions.value.length > 0) {
    setElement(makeElement(0));
  }
};

watch(filteredOptions, () => {
  // Keep navigation valid after filtering
  if (
    currentIndex.value !== null &&
    currentIndex.value >= 0 &&
    currentIndex.value < enabledOptions.value.length
  ) {
    return;
  }

  resetNavigation();
  ensureActiveIndex();
});

const onKeydown = (event: KeyboardEvent) => {
  if (filteredOptions.value.length === 0) {
    return;
  }

  ensureActiveIndex();
  onNavKeydown(event);
};

const focusSearch = () => {
  resetNavigation();
  const selectedIdx = enabledOptions.value.findIndex(
    (o) => o.id === modelValue.value,
  );
  if (selectedIdx === -1) {
    ensureActiveIndex();
  } else {
    setElement(makeElement(selectedIdx));
  }
  nextTick(() => searchEl.value?.focus());
};

defineExpose({ focusSearch });
</script>

<template>
  <div class="kds-dropdown-container" @keydown.capture="onKeydown">
    <div class="kds-dropdown-container-sticky-top">
      <BaseInput
        :id="`${containerId}-search`"
        ref="searchEl"
        v-model="searchValue"
        type="search"
        placeholder="Search"
        :aria-label="'Filter options'"
        :aria-activedescendant="activeId ?? undefined"
        leading-icon="search"
        :clearable="true"
        @focus-in="ensureActiveIndex"
        @focus-out="activeId = null"
      />
    </div>

    {{ activeId }}

    <!-- eslint-disable-next-line vuejs-accessibility/role-has-required-aria-props, vuejs-accessibility/no-redundant-roles -->
    <div role="listbox" class="kds-dropdown-list">
      <KdsListItem
        v-for="item in listItems"
        :key="item.id"
        v-bind="item"
        @click="selectItem(item.optionId)"
        @mouseover="activeId = item.id"
      />
      <div v-if="listItems.length === 0" class="kds-dropdown-empty">
        {{ props.noEntriesText }}
      </div>
    </div>
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

.kds-dropdown-list {
  padding: var(--kds-spacing-container-0-25x);
  margin: 0;
  overflow-y: auto;
  list-style: none;
}

.kds-dropdown-empty {
  padding: var(--kds-spacing-container-0-5x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-subtle);
  text-align: center;
}
</style>
