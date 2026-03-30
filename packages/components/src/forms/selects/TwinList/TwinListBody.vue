<script setup lang="ts">
import { computed, ref, watch } from "vue";

import {
  kdsDimensionComponentHeight1p5x,
  kdsSpacingContainer0p25x,
} from "../../../../../styles/dist/tokens/ts/_tokens.ts";
import { KdsButton } from "../../../buttons/KdsButton";
import { KdsResizeContainer } from "../../../layouts/ResizeContainer";
import { type KdsListOption } from "../../_helper/List/ListContainer";
import {
  KdsMultiSelectListBox,
  type KdsMultiSelectListBoxOption,
} from "../MultiSelectListBox";

import type {
  KdsTwinListModelValue,
  KdsTwinListPossibleValue,
  TwinListBodyProps,
} from "./types";

const {
  disabled = false,
  searchTerm = "",
  excludeLabel = "Exclude",
  includeLabel = "Include",
  unknownValuesText = "Unknown columns",
  loading = false,
  ...props
} = defineProps<TwinListBodyProps>();

const modelValue = defineModel<KdsTwinListModelValue>({ required: true });
const effectiveDisabled = computed(() => disabled || loading);

const leftSelected = ref<string[]>([]);
const rightSelected = ref<string[]>([]);

// Only one list should have a selection at a time.
watch(leftSelected, (ids) => {
  if (ids.length > 0) {
    rightSelected.value = [];
  }
});
watch(rightSelected, (ids) => {
  if (ids.length > 0) {
    leftSelected.value = [];
  }
});

// Clear selection when the body becomes disabled.
watch(effectiveDisabled, (isDisabled) => {
  if (isDisabled) {
    leftSelected.value = [];
    rightSelected.value = [];
  }
});

const knownIds = computed(
  () => new Set(props.possibleValues.map((v) => String(v.id))),
);

const missingExcludedIds = computed(() =>
  modelValue.value.excludedValues
    .map(String)
    .filter((id) => !knownIds.value.has(id)),
);

const missingIncludedIds = computed(() =>
  modelValue.value.includedValues
    .map(String)
    .filter((id) => !knownIds.value.has(id)),
);

const excludedItems = computed(() => {
  const excludedSet = new Set(modelValue.value.excludedValues.map(String));
  return props.possibleValues.filter((v) => excludedSet.has(String(v.id)));
});

const includedItems = computed(() => {
  const includedSet = new Set(modelValue.value.includedValues.map(String));
  return props.possibleValues.filter((v) => includedSet.has(String(v.id)));
});

const matchesSearch = (item: KdsTwinListPossibleValue) =>
  item.text.toLowerCase().includes(searchTerm.toLowerCase());

const toMissingOption = (
  id: string,
  selectedSet: Set<string>,
): KdsListOption => ({
  id,
  text: id,
  missing: true,
  selected: selectedSet.has(id),
});

const filteredExcludedItems = computed(() =>
  searchTerm ? excludedItems.value.filter(matchesSearch) : excludedItems.value,
);

const filteredIncludedItems = computed(() =>
  searchTerm ? includedItems.value.filter(matchesSearch) : includedItems.value,
);

const toListOption = (
  item: KdsTwinListPossibleValue,
  selectedSet: Set<string>,
): KdsListOption => ({
  id: String(item.id),
  text: item.text,
  accessory: item.accessory,
  selected: selectedSet.has(String(item.id)),
});

const leftOptions = computed<KdsListOption[]>(() => {
  const selectedSet = new Set(leftSelected.value);
  return [
    ...missingExcludedIds.value.map((id) => toMissingOption(id, selectedSet)),
    ...filteredExcludedItems.value.map((item) =>
      toListOption(item, selectedSet),
    ),
  ];
});

const rightOptions = computed<KdsListOption[]>(() => {
  const selectedSet = new Set(rightSelected.value);
  return [
    ...missingIncludedIds.value.map((id) => toMissingOption(id, selectedSet)),
    ...filteredIncludedItems.value.map((item) =>
      toListOption(item, selectedSet),
    ),
  ];
});

const UNKNOWN_VALUE_ID = "__unknown-value-option__";

const unknownValueOption = computed<KdsMultiSelectListBoxOption>(() => ({
  text: unknownValuesText,
  id: UNKNOWN_VALUE_ID,
}));

const showUnknownValues = computed(
  () => modelValue.value.includeUnknownValues !== null,
);

const moveRight = (ids: Iterable<string>) => {
  if (effectiveDisabled.value) {
    return;
  }
  const idsToMove = new Set([...ids].map(String));
  if (idsToMove.size === 0) {
    return;
  }
  const moveUnknown = idsToMove.has(UNKNOWN_VALUE_ID);
  idsToMove.delete(UNKNOWN_VALUE_ID);
  const missingIds = new Set(missingExcludedIds.value);
  const knownToMove = new Set(
    [...idsToMove].filter((id) => !missingIds.has(id)),
  );
  modelValue.value = {
    includeUnknownValues: moveUnknown || modelValue.value.includeUnknownValues,
    excludedValues: modelValue.value.excludedValues.filter(
      (id) => !idsToMove.has(String(id)),
    ),
    includedValues: [
      ...modelValue.value.includedValues,
      ...modelValue.value.excludedValues.filter((id) =>
        knownToMove.has(String(id)),
      ),
    ],
  };
  rightSelected.value = [
    ...[...knownToMove],
    ...(moveUnknown ? [UNKNOWN_VALUE_ID] : []),
  ];
};

const moveLeft = (ids: Iterable<string>) => {
  if (effectiveDisabled.value) {
    return;
  }
  const idsToMove = new Set([...ids].map(String));
  if (idsToMove.size === 0) {
    return;
  }
  const moveUnknown = idsToMove.has(UNKNOWN_VALUE_ID);
  idsToMove.delete(UNKNOWN_VALUE_ID);
  const missingIds = new Set(missingIncludedIds.value);
  const knownToMove = new Set(
    [...idsToMove].filter((id) => !missingIds.has(id)),
  );
  modelValue.value = {
    includeUnknownValues: !moveUnknown && modelValue.value.includeUnknownValues,
    includedValues: modelValue.value.includedValues.filter(
      (id) => !idsToMove.has(String(id)),
    ),
    excludedValues: [
      ...modelValue.value.excludedValues,
      ...modelValue.value.includedValues.filter((id) =>
        knownToMove.has(String(id)),
      ),
    ],
  };
  leftSelected.value = [
    ...[...knownToMove],
    ...(moveUnknown ? [UNKNOWN_VALUE_ID] : []),
  ];
};
</script>

<template>
  <KdsResizeContainer
    :number-of-handles="2"
    :height="320"
    :min-height="200"
    :handle-gap="`${kdsSpacingContainer0p25x * 2 + kdsDimensionComponentHeight1p5x}px`"
  >
    <template #default="{ contentStyle }">
      <div class="kds-twin-list-body" :style="contentStyle">
        <div class="kds-list-column">
          <div class="kds-list-header">
            <span class="kds-list-label">{{ excludeLabel }}</span>
            <span v-if="!loading && searchTerm" class="kds-list-count">
              {{ leftOptions.length }} of {{ excludedItems.length }}
            </span>
          </div>
          <KdsMultiSelectListBox
            v-model="leftSelected"
            class="kds-list-box"
            :possible-values="leftOptions"
            :ariaLabel="excludeLabel"
            :disabled="effectiveDisabled"
            :loading="loading"
            :empty-state-label="props.emptyStateLabel"
            :bottom-value="
              showUnknownValues && modelValue.includeUnknownValues === false
                ? unknownValueOption
                : undefined
            "
            @double-click-on-item="moveRight(leftSelected)"
            @double-click-shift="moveRight"
            @key-arrow-right="moveRight"
            @key-enter="moveRight"
          />
        </div>

        <div class="kds-button-column">
          <KdsButton
            leading-icon="chevron-right"
            ariaLabel="Move selected values right"
            title="Move selected values right"
            variant="transparent"
            size="small"
            :disabled="effectiveDisabled || leftSelected.length === 0"
            @click="moveRight(leftSelected)"
          />
          <KdsButton
            leading-icon="chevron-right-double"
            ariaLabel="Move all values right"
            title="Move all values right"
            variant="transparent"
            size="small"
            :disabled="
              effectiveDisabled ||
              (excludedItems.length === 0 &&
                (!showUnknownValues ||
                  modelValue.includeUnknownValues === true))
            "
            @click="
              moveRight([
                ...modelValue.excludedValues,
                ...(showUnknownValues && !modelValue.includeUnknownValues
                  ? [UNKNOWN_VALUE_ID]
                  : []),
              ])
            "
          />
          <KdsButton
            leading-icon="chevron-left"
            ariaLabel="Move selected values left"
            title="Move selected values left"
            variant="transparent"
            size="small"
            :disabled="effectiveDisabled || rightSelected.length === 0"
            @click="moveLeft(rightSelected)"
          />
          <KdsButton
            leading-icon="chevron-left-double"
            ariaLabel="Move all values left"
            title="Move all values left"
            variant="transparent"
            size="small"
            :disabled="
              effectiveDisabled ||
              (includedItems.length === 0 &&
                (!showUnknownValues ||
                  modelValue.includeUnknownValues === false))
            "
            @click="
              moveLeft([
                ...modelValue.includedValues,
                ...(showUnknownValues && modelValue.includeUnknownValues
                  ? [UNKNOWN_VALUE_ID]
                  : []),
              ])
            "
          />
        </div>

        <div class="kds-list-column">
          <div class="kds-list-header">
            <span class="kds-list-label">{{ includeLabel }}</span>
            <span v-if="!loading && searchTerm" class="kds-list-count">
              {{ rightOptions.length }} of {{ includedItems.length }}
            </span>
          </div>
          <KdsMultiSelectListBox
            v-model="rightSelected"
            class="kds-list-box"
            :possible-values="rightOptions"
            :ariaLabel="includeLabel"
            :disabled="effectiveDisabled"
            :loading="loading"
            :empty-state-label="props.emptyStateLabel"
            :bottom-value="
              showUnknownValues && modelValue.includeUnknownValues === true
                ? unknownValueOption
                : undefined
            "
            @double-click-on-item="moveLeft(rightSelected)"
            @double-click-shift="moveLeft"
            @key-arrow-left="moveLeft"
            @key-enter="moveLeft"
          />
        </div>
      </div>
    </template>
  </KdsResizeContainer>
</template>

<style scoped>
.kds-twin-list-body {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr) var(--kds-dimension-component-width-1-5x)
    minmax(0, 1fr);
  gap: var(--kds-spacing-container-0-25x);
}

.kds-list-column {
  display: flex;
  flex-direction: column;
  min-block-size: 0;

  & .kds-list-box {
    flex: 1;
    min-block-size: 0;
  }
}

.kds-list-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--kds-spacing-input-label-spacing-bottom);
}

.kds-list-label {
  font: var(--kds-font-base-title-small);
  color: var(--kds-color-text-and-icon-neutral);
}

.kds-list-count {
  font: var(--kds-font-base-title-xsmall);
  color: var(--kds-color-text-and-icon-muted);
}

.kds-button-column {
  display: flex;
  flex-direction: column;
  padding-top: var(--kds-spacing-container-4x);
}
</style>
