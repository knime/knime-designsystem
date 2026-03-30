<script setup lang="ts">
import { computed, ref } from "vue";

import BaseFieldsetWrapper from "../../_helper/BaseFieldsetWrapper.vue";

import TwinListBody from "./TwinListBody.vue";
import TwinListHeader from "./TwinListHeader.vue";
import { kdsTwinListSearchMode } from "./enums";
import type {
  KdsTwinListModelValue,
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

const allIds = computed(() => possibleValues.map(({ id }) => id));

const effectiveBodyModel = computed<KdsTwinListModelValue>({
  get() {
    switch (mode.value) {
      case kdsTwinListSearchMode.PATTERN: {
        const trimmedPattern = patternRegex.value.trim();
        if (trimmedPattern === "") {
          const included: string[] = [];
          const includedSet = new Set(included);
          return {
            includedValues: included,
            excludedValues: allIds.value.filter((id) => !includedSet.has(id)),
            includeUnknownValues: null,
          };
        }

        let regexp: RegExp | null = null;
        try {
          regexp = new RegExp(`^(?:${trimmedPattern})$`);
        } catch {
          regexp = null;
        }

        const included = regexp
          ? possibleValues
              .filter((item) => regexp.test(item.text))
              .map(({ id }) => id)
          : [];
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
  <BaseFieldsetWrapper
    :id="props.id"
    :label="props.label"
    :ariaLabel="props.ariaLabel"
    :description="props.description"
    :sub-text="props.subText"
    :error="error"
    :validating="validating"
    :preserve-sub-text-space="preserveSubTextSpace"
  >
    <div class="kds-twin-list">
      <TwinListHeader
        v-model:mode="mode"
        v-model:pattern="pattern"
        v-model:search-term="searchTerm"
        v-model:selected-types="selectedTypes"
        v-model:case-sensitive="caseSensitive"
        v-model:exclude-matches="excludeMatches"
        v-model:use-regex="useRegex"
        :disabled="disabled"
        :filter-types="filterTypes"
        :enable-pattern-filter="enablePatternFilter"
        @update:regex="patternRegex = $event"
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
  </BaseFieldsetWrapper>
</template>

<style scoped>
.kds-twin-list {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-37x);
}
</style>
