<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";

import { KdsListContainer } from "../../../structures";
import BaseInput from "../BaseInput.vue";

import type { KdsDropdownOption } from "./types";

type DropdownOptionWithMissing = KdsDropdownOption & { missing: boolean };

type KdsDropdownContainerProps = {
  noEntriesText: string;
  possibleValues: KdsDropdownOption[];
  required?: boolean;
};

const props = defineProps<KdsDropdownContainerProps>();

const modelValue = defineModel<string | null>({ default: null });
const open = defineModel<boolean>("open");

const containerId = useId();
const searchValue = ref("");
const activeId = ref<string | null>(null);

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

const listItems = computed(() =>
  filteredOptions.value.map((option) => ({
    id: `${containerId}-${option.id}`,
    optionId: option.id,
    label: option.text,
    accessory: option.accessory,
    disabled: Boolean(option.disabled) || option.missing,
    missing: option.missing,
    selected: option.id === modelValue.value,
    active: `${containerId}-${option.id}` === activeId.value,
  })),
);

const enabledItems = computed(() =>
  listItems.value.filter((item) => !item.disabled),
);

const moveActive = (delta: number) => {
  if (enabledItems.value.length === 0) {
    return;
  }

  const currentEnabledIdx = enabledItems.value.findIndex(
    (item) => item.id === activeId.value,
  );

  let nextEnabledIdx: number;
  if (currentEnabledIdx === -1) {
    nextEnabledIdx = delta > 0 ? 0 : enabledItems.value.length - 1;
  } else {
    nextEnabledIdx = Math.min(
      Math.max(currentEnabledIdx + delta, 0),
      enabledItems.value.length - 1,
    );
  }

  activeId.value = enabledItems.value[nextEnabledIdx].id;
};

const ensureActiveId = () => {
  if (activeId.value) {
    return;
  }

  const selected = listItems.value.find((i) => i.selected && !i.disabled);
  if (selected) {
    activeId.value = selected.id;
    return;
  }

  const firstEnabled = listItems.value.find((i) => !i.disabled);
  activeId.value = firstEnabled?.id ?? null;
};

watch(listItems, () => {
  // Keep activeId valid after filtering
  const current = listItems.value.find((i) => i.id === activeId.value);
  if (current && !current.disabled) {
    return;
  }

  activeId.value = null;
  ensureActiveId();
});

const applyById = (prefixedId: string | null) => {
  if (!prefixedId) {
    return;
  }

  const optionId = prefixedId.replace(`${containerId}-`, "");
  const option = filteredOptions.value.find((o) => o.id === optionId);
  if (!option || option.disabled || option.missing) {
    return;
  }

  if (modelValue.value === option.id) {
    modelValue.value = props.required ? option.id : null;
  } else {
    modelValue.value = option.id;
  }

  searchValue.value = "";
  open.value = false;
};

const onItemClick = (prefixedId: string) => {
  applyById(prefixedId);
};

const onKeydown = (event: KeyboardEvent) => {
  if (listItems.value.length === 0) {
    return;
  }

  ensureActiveId();

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      moveActive(1);
      break;

    case "ArrowUp":
      event.preventDefault();
      moveActive(-1);
      break;

    case "Home":
      event.preventDefault();
      if (enabledItems.value.length > 0) {
        activeId.value = enabledItems.value[0].id;
      }
      break;

    case "End":
      event.preventDefault();
      if (enabledItems.value.length > 0) {
        activeId.value = enabledItems.value[enabledItems.value.length - 1].id;
      }
      break;

    case "Enter":
      event.preventDefault();
      applyById(activeId.value);
      break;
  }
};

watch(open, (isOpen) => {
  if (isOpen) {
    // Reset activeId to the current selection when opening
    const selected = listItems.value.find((i) => i.selected && !i.disabled);
    if (selected) {
      activeId.value = selected.id;
    } else {
      activeId.value = null;
      ensureActiveId();
    }
    nextTick(() => searchEl.value?.focus());
  }
});
</script>

<template>
  <div class="kds-dropdown-container" @keydown.capture="onKeydown">
    <div class="kds-dropdown-container-sticky-top">
      <BaseInput
        :id="`${containerId}-search`"
        ref="searchEl"
        v-model="searchValue"
        type="search"
        :aria-label="'Filter options'"
        :aria-activedescendant="activeId ?? undefined"
        leading-icon="search"
        :clearable="true"
      />
    </div>

    <KdsListContainer
      :items="listItems"
      :empty-text="props.noEntriesText"
      @item-click="onItemClick"
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
