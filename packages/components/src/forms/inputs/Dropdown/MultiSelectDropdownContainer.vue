<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";

import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";
import { KdsListItemSingleline } from "../../../structures";
import BaseInput from "../BaseInput.vue";

import type { KdsDropdownOption } from "./types";

type KdsMultiSelectDropdownContainerProps = {
  noEntriesText: string;
  possibleValues: KdsDropdownOption[];
  allowNewValues?: boolean;
  selectAllText: string;
  clearAllText: string;
  required?: boolean;
  minSelected?: number;
  maxSelected?: number;
};

const props = withDefaults(
  defineProps<KdsMultiSelectDropdownContainerProps>(),
  {
    allowNewValues: false,
    required: false,
    minSelected: 0,
    maxSelected: undefined,
  },
);

const modelValue = defineModel<string[]>({ default: () => [] });
const open = defineModel<boolean>("open");

const containerId = useId();
const searchValue = ref("");
const activeId = ref<string | null>(null);
const searchEl = ref<InstanceType<typeof BaseInput> | null>(null);

const createdValues = ref<string[]>([]);
const selectionSnapshotAtOpen = ref<string[]>([]);

const effectiveMin = computed(() =>
  Math.max(props.minSelected ?? 0, props.required ? 1 : 0),
);

const possibleValueIds = computed(
  () => new Set(props.possibleValues.map((o) => o.id)),
);
const createdValueIds = computed(() => new Set(createdValues.value));

const missingSelectedIds = computed(() =>
  modelValue.value.filter(
    (id) => !possibleValueIds.value.has(id) && !createdValueIds.value.has(id),
  ),
);

const filteredPossibleValues = computed(() => {
  const normalizedQuery = searchValue.value.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return props.possibleValues;
  }
  return props.possibleValues.filter((option) =>
    option.text.toLowerCase().includes(normalizedQuery),
  );
});

const sortedPossibleValues = computed(() => {
  const selectedAtOpen = new Set(selectionSnapshotAtOpen.value);
  const values = filteredPossibleValues.value;
  if (selectedAtOpen.size === 0) {
    return values;
  }

  const selected: KdsDropdownOption[] = [];
  const unselected: KdsDropdownOption[] = [];

  for (const option of values) {
    if (selectedAtOpen.has(option.id)) {
      selected.push(option);
    } else {
      unselected.push(option);
    }
  }

  return [...selected, ...unselected];
});

const hasSelection = computed(() => modelValue.value.length > 0);

const canClearAll = computed(() => effectiveMin.value === 0);

const actionRow = computed(() => {
  if (hasSelection.value === false) {
    return {
      id: `${containerId}-action`,
      label: props.selectAllText,
      icon: "checkmark" as const,
      disabled: false,
      type: "selectAll" as const,
    };
  }

  return {
    id: `${containerId}-action`,
    label: props.clearAllText,
    icon: "x-close" as const,
    disabled: !canClearAll.value,
    type: "clearAll" as const,
  };
});

const showAddNewRow = computed(() => {
  if (props.allowNewValues === false) {
    return false;
  }

  const query = searchValue.value.trim();
  if (query.length === 0) {
    return false;
  }

  const normalizedQuery = query.toLowerCase();
  const hasExactTextMatch = props.possibleValues.some(
    (o) => o.text.toLowerCase() === normalizedQuery,
  );
  if (hasExactTextMatch) {
    return false;
  }

  if (createdValues.value.some((v) => v.toLowerCase() === normalizedQuery)) {
    return false;
  }

  return true;
});

const addNewRow = computed(() => {
  if (showAddNewRow.value === false) {
    return null;
  }

  const value = searchValue.value.trim();
  return {
    id: `${containerId}-add-${value}`,
    value,
    label: value,
  };
});

type OptionRow = {
  id: string;
  optionId: string;
  label: string;
  disabled: boolean;
  selected: boolean;
  active: boolean;
  missing: boolean;
  specialContent: boolean;
  accessory?: KdsDropdownOption["accessory"];
  type: "missing" | "option" | "created";
};

const optionRows = computed<OptionRow[]>(() => {
  const selectedIds = new Set(modelValue.value);
  const rows: OptionRow[] = [];

  for (const missingId of missingSelectedIds.value) {
    rows.push({
      id: `${containerId}-missing-${missingId}`,
      optionId: missingId,
      label: missingId,
      disabled: false,
      selected: true,
      active: `${containerId}-missing-${missingId}` === activeId.value,
      missing: true,
      specialContent: false,
      type: "missing",
    });
  }

  for (const option of sortedPossibleValues.value) {
    const disabled = Boolean(option.disabled);
    const selected = selectedIds.has(option.id);

    const wouldExceedMax =
      !selected &&
      props.maxSelected !== undefined &&
      modelValue.value.length >= props.maxSelected;

    const selectionLimitedDisabled = disabled || wouldExceedMax;

    rows.push({
      id: `${containerId}-${option.id}`,
      optionId: option.id,
      label: option.text,
      accessory: option.accessory,
      disabled: selectionLimitedDisabled,
      selected,
      active: `${containerId}-${option.id}` === activeId.value,
      missing: false,
      specialContent: false,
      type: "option",
    });
  }

  return rows;
});

const enabledRows = computed(() =>
  optionRows.value.filter((row) => !row.disabled),
);

const moveActive = (delta: number) => {
  const navigable: string[] = [];

  if (addNewRow.value) {
    navigable.push(addNewRow.value.id);
  }

  for (const row of enabledRows.value) {
    navigable.push(row.id);
  }

  if (actionRow.value.disabled === false) {
    navigable.push(actionRow.value.id);
  }

  if (navigable.length === 0) {
    return;
  }

  const currentIdx = navigable.findIndex((id) => id === activeId.value);
  let nextIdx: number;
  if (currentIdx === -1) {
    nextIdx = delta > 0 ? 0 : navigable.length - 1;
  } else {
    nextIdx = Math.min(Math.max(currentIdx + delta, 0), navigable.length - 1);
  }

  activeId.value = navigable[nextIdx];
};

const ensureActiveId = () => {
  if (activeId.value) {
    return;
  }

  if (addNewRow.value) {
    activeId.value = addNewRow.value.id;
    return;
  }

  const selected = enabledRows.value.find((r) => r.selected);
  if (selected) {
    activeId.value = selected.id;
    return;
  }

  const firstEnabled = enabledRows.value[0];
  if (firstEnabled) {
    activeId.value = firstEnabled.id;
    return;
  }

  if (actionRow.value.disabled === false) {
    activeId.value = actionRow.value.id;
  }
};

watch([optionRows, addNewRow, actionRow], () => {
  const isStillValid =
    activeId.value === addNewRow.value?.id ||
    activeId.value === actionRow.value.id ||
    optionRows.value.some((r) => r.id === activeId.value && !r.disabled);

  if (isStillValid) {
    return;
  }

  activeId.value = null;
  ensureActiveId();
});

const toggleOption = (id: string) => {
  const selected = modelValue.value.includes(id);

  if (selected) {
    if (modelValue.value.length - 1 < effectiveMin.value) {
      return;
    }
    modelValue.value = modelValue.value.filter((v) => v !== id);
    return;
  }

  if (
    props.maxSelected !== undefined &&
    modelValue.value.length >= props.maxSelected
  ) {
    return;
  }
  modelValue.value = [...modelValue.value, id];
};

const selectAll = () => {
  const selectable = props.possibleValues
    .filter((o) => !o.disabled)
    .map((o) => o.id);

  if (props.maxSelected === undefined) {
    modelValue.value = selectable;
  } else {
    modelValue.value = selectable.slice(0, props.maxSelected);
  }
};

const clearAll = () => {
  if (canClearAll.value) {
    modelValue.value = [];
  }
};

const addNewValue = (value: string) => {
  if (props.allowNewValues === false) {
    return;
  }

  if (
    props.maxSelected !== undefined &&
    modelValue.value.length >= props.maxSelected
  ) {
    return;
  }

  if (!createdValues.value.includes(value)) {
    createdValues.value = [...createdValues.value, value];
  }
  if (!modelValue.value.includes(value)) {
    modelValue.value = [...modelValue.value, value];
  }
  searchValue.value = "";
};

const deleteMissingValue = (id: string) => {
  modelValue.value = modelValue.value.filter((v) => v !== id);
};

const applyByPrefixedId = (prefixedId: string | null) => {
  if (!prefixedId) {
    return;
  }

  if (addNewRow.value && prefixedId === addNewRow.value.id) {
    addNewValue(addNewRow.value.value);
    return;
  }

  if (prefixedId === actionRow.value.id) {
    if (actionRow.value.type === "selectAll") {
      selectAll();
    } else {
      clearAll();
    }
    return;
  }

  const row = optionRows.value.find((r) => r.id === prefixedId);
  if (!row || row.disabled) {
    return;
  }

  if (row.type === "missing") {
    deleteMissingValue(row.optionId);
    return;
  }

  toggleOption(row.optionId);
};

const onKeydown = (event: KeyboardEvent) => {
  if (optionRows.value.length === 0 && !addNewRow.value) {
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
      activeId.value = addNewRow.value?.id ?? enabledRows.value[0]?.id ?? null;
      break;

    case "End":
      event.preventDefault();
      activeId.value = actionRow.value.disabled
        ? (enabledRows.value[enabledRows.value.length - 1]?.id ?? null)
        : actionRow.value.id;
      break;

    case "Enter":
    case " ":
      event.preventDefault();
      applyByPrefixedId(activeId.value);
      break;

    case "Escape":
      event.preventDefault();
      open.value = false;
      searchValue.value = "";
      break;
  }
};

watch(open, (isOpen) => {
  if (isOpen) {
    selectionSnapshotAtOpen.value = [...modelValue.value];
    activeId.value = null;
    ensureActiveId();
    nextTick(() => searchEl.value?.focus());
  }
});
</script>

<template>
  <div class="kds-multi-select-dropdown-container" @keydown.capture="onKeydown">
    <div class="kds-multi-select-dropdown-container-sticky-top">
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

    <div class="kds-multi-select-dropdown-container-list" role="presentation">
      <KdsListItemSingleline
        v-if="addNewRow"
        :id="addNewRow.id"
        :label="addNewRow.label"
        :accessory="{ type: 'icon', name: 'plus' }"
        :special-content="true"
        :active="addNewRow.id === activeId"
        @click="applyByPrefixedId(addNewRow.id)"
      />

      <template v-if="optionRows.length">
        <KdsListItemSingleline
          v-for="row in optionRows"
          :id="row.id"
          :key="row.id"
          :label="row.label"
          :accessory="row.accessory"
          :selected="row.selected"
          :active="row.active"
          :missing="row.missing"
          :disabled="row.disabled"
          :special-content="row.specialContent"
          @click="applyByPrefixedId(row.id)"
        >
          <template v-if="row.type === 'missing'" #trailing>
            <KdsIcon name="trash" size="small" />
          </template>
        </KdsListItemSingleline>
      </template>

      <div v-else class="kds-multi-select-dropdown-empty-state">
        <span class="kds-multi-select-dropdown-empty-text">
          {{ props.noEntriesText }}
        </span>
      </div>
    </div>

    <div class="kds-multi-select-dropdown-container-sticky-bottom">
      <KdsListItemSingleline
        :id="actionRow.id"
        :label="actionRow.label"
        :accessory="{ type: 'icon', name: actionRow.icon }"
        :disabled="actionRow.disabled"
        :active="actionRow.id === activeId"
        @click="applyByPrefixedId(actionRow.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.kds-multi-select-dropdown-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}

.kds-multi-select-dropdown-container-sticky-top {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: var(--kds-spacing-container-0-25x);
  background-color: var(--kds-color-surface-default);
  border-bottom: var(--kds-border-base-subtle);
}

.kds-multi-select-dropdown-container-list {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-10x);
  padding: var(--kds-spacing-container-0-25x);
}

.kds-multi-select-dropdown-container-sticky-bottom {
  position: sticky;
  bottom: 0;
  z-index: 1;
  padding: var(--kds-spacing-container-0-25x);
  background-color: var(--kds-color-surface-default);
  border-top: var(--kds-border-base-subtle);
}

.kds-multi-select-dropdown-empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding: var(--kds-spacing-container-0-5x);
}

.kds-multi-select-dropdown-empty-text {
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-muted);
  text-align: center;
}

.kds-multi-select-dropdown-delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}
</style>
