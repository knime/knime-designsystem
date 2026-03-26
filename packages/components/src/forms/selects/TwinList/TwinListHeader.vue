<script setup lang="ts">
import { computed, watch } from "vue";

import { KdsValueSwitch } from "../../RadioButton";
import { KdsSearchInput } from "../../inputs";
import { KdsPatternInput } from "../../inputs/PatternInput";
import { KdsMultiSelectDropdown } from "../Dropdown";

import { kdsTwinListSearchMode } from "./enums";
import type { KdsTwinListSearchMode, TwinListHeaderProps } from "./types";

const {
  filterTypes = undefined,
  enablePatternFilter = false,
  disabled = false,
} = defineProps<TwinListHeaderProps>();

const emit = defineEmits<{
  "update:regex": [value: string];
}>();

const mode = defineModel<KdsTwinListSearchMode>("mode", {
  default: kdsTwinListSearchMode.MANUAL,
});
const pattern = defineModel<string>("pattern", { default: "" });
const searchTerm = defineModel<string>("searchTerm", { default: "" });
const selectedTypes = defineModel<string[]>("selectedTypes", {
  default: () => [],
});
const caseSensitive = defineModel<boolean>("caseSensitive", { default: false });
const excludeMatches = defineModel<boolean>("excludeMatches", {
  default: false,
});
const useRegex = defineModel<boolean>("useRegex", { default: false });

const modes = computed(() => [
  { id: kdsTwinListSearchMode.MANUAL, text: "Manual" },
  ...(enablePatternFilter
    ? [{ id: kdsTwinListSearchMode.PATTERN, text: "Pattern" }]
    : []),
  ...(filterTypes ? [{ id: kdsTwinListSearchMode.TYPE, text: "Type" }] : []),
]);

watch(
  [mode, () => enablePatternFilter, () => filterTypes],
  () => {
    if (!modes.value.some(({ id }) => id === mode.value)) {
      mode.value = kdsTwinListSearchMode.MANUAL;
    }
  },
  { immediate: true },
);

watch(mode, (newMode, oldMode) => {
  if (
    oldMode === kdsTwinListSearchMode.MANUAL &&
    newMode !== kdsTwinListSearchMode.MANUAL
  ) {
    searchTerm.value = "";
  }
});
</script>

<template>
  <KdsValueSwitch
    v-if="modes.length > 1"
    v-model="mode"
    ariaLabel="Selection mode"
    :disabled="disabled"
    size="small"
    variant="muted"
    :possible-values="modes"
  />

  <KdsSearchInput
    v-if="mode === kdsTwinListSearchMode.MANUAL"
    v-model="searchTerm"
    ariaLabel="Search values"
    placeholder="Search"
    :disabled="disabled"
  />

  <KdsPatternInput
    v-else-if="mode === kdsTwinListSearchMode.PATTERN"
    v-model="pattern"
    v-model:case-sensitive="caseSensitive"
    v-model:exclude-matches="excludeMatches"
    v-model:use-regex="useRegex"
    ariaLabel="Pattern"
    placeholder="Pattern"
    :disabled="disabled"
    @update:regex="emit('update:regex', $event)"
  />

  <KdsMultiSelectDropdown
    v-else
    v-model="selectedTypes"
    :possible-values="filterTypes ?? []"
    :loading="filterTypes?.length === 0"
    ariaLabel="Selected types"
    :disabled="disabled"
  />
</template>
