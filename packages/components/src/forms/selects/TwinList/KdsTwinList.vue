<script setup lang="ts">
import { computed, ref, watch } from "vue";

import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";

import TwinListBody from "./TwinListBody.vue";
import TwinListHeader from "./TwinListHeader.vue";
import { kdsTwinListSearchMode } from "./enums";
import type {
  KdsTwinListModelValue,
  KdsTwinListPossibleValue,
  KdsTwinListProps,
  KdsTwinListSearchMode,
} from "./types.ts";

const {
  disabled = false,
  possibleValues,
  filterTypes = undefined,
  enablePatternFilter = false,
  loading = false,
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  ...props
} = defineProps<KdsTwinListProps>();

const mode = defineModel<KdsTwinListSearchMode>("mode", {
  default: kdsTwinListSearchMode.MANUAL,
});
const manuallyIncluded = defineModel<string[]>("manuallyIncluded", {
  default: () => [],
});
const manuallyExcluded = defineModel<string[]>("manuallyExcluded", {
  default: () => [],
});
const includeUnknownValues = defineModel<boolean | null>(
  "includeUnknownValues",
  { default: null },
);
const pattern = defineModel<string>("pattern", { default: "" });
const selectedTypes = defineModel<string[]>("selectedTypes", {
  default: () => [],
});
const caseSensitive = defineModel<boolean>("caseSensitive", { default: false });
const excludeMatches = defineModel<boolean>("excludeMatches", {
  default: false,
});
const useRegex = defineModel<boolean>("useRegex", { default: false });

const searchTerm = ref("");
const patternRegex = ref("");

// Reset search term when leaving manual mode – the search filter only applies
// to manual mode and should not leak to pattern/type modes.
watch(mode, () => {
  searchTerm.value = "";
});

const allIds = computed(() => possibleValues.map(({ id }) => id));

const effectiveBodyModel = computed<KdsTwinListModelValue>({
  get() {
    switch (mode.value) {
      case kdsTwinListSearchMode.PATTERN: {
        function patternMatcher(item: KdsTwinListPossibleValue) {
          if (patternRegex.value.trim() === "") {
            return false;
          }
          try {
            return new RegExp(`^(?:${patternRegex.value})$`).test(item.text);
          } catch {
            return false;
          }
        }
        const included = possibleValues
          .filter(patternMatcher)
          .map(({ id }) => id);
        const includedSet = new Set(included);
        return {
          includedValues: included,
          excludedValues: allIds.value.filter((id) => !includedSet.has(id)),
          includeUnknownValues: null,
        };
      }
      case kdsTwinListSearchMode.TYPE: {
        const included = possibleValues
          .filter((item) => selectedTypes.value.includes(item.type ?? ""))
          .map(({ id }) => id);
        const includedSet = new Set(included);
        return {
          includedValues: included,
          excludedValues: allIds.value.filter((id) => !includedSet.has(id)),
          includeUnknownValues: null,
        };
      }
      default:
        return {
          includedValues: manuallyIncluded.value,
          excludedValues: manuallyExcluded.value,
          includeUnknownValues: includeUnknownValues.value,
        };
    }
  },
  set(value) {
    manuallyIncluded.value = value.includedValues;
    manuallyExcluded.value = value.excludedValues;
    includeUnknownValues.value = value.includeUnknownValues;
  },
});
</script>

<template>
  <BaseFormFieldWrapper
    v-bind="props"
    :error="error"
    :validating="validating"
    :preserve-sub-text-space="preserveSubTextSpace"
  >
    <div class="kds-twin-list">
      <TwinListHeader
        ref="headerRef"
        v-model:mode="mode"
        v-model:pattern="pattern"
        v-model:pattern-regex="patternRegex"
        v-model:search-term="searchTerm"
        v-model:selected-types="selectedTypes"
        v-model:case-sensitive="caseSensitive"
        v-model:exclude-matches="excludeMatches"
        v-model:use-regex="useRegex"
        :disabled="disabled"
        :filter-types="filterTypes"
        :enable-pattern-filter="enablePatternFilter"
      />
      <TwinListBody
        v-model="effectiveBodyModel"
        :disabled="disabled || mode !== kdsTwinListSearchMode.MANUAL"
        :possible-values="possibleValues"
        :search-term="searchTerm"
        :exclude-label="props.excludeLabel"
        :include-label="props.includeLabel"
        :unknown-values-text="props.unknownValuesText"
        :empty-state-label="props.emptyStateLabel"
        :loading="loading"
      />
    </div>
  </BaseFormFieldWrapper>
</template>

<style scoped>
.kds-twin-list {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-37x);
}
</style>
