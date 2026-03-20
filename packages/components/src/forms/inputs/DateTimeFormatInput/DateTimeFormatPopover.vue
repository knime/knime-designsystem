<script setup lang="ts">
import { computed, ref } from "vue";

import KdsValueSwitch from "../../RadioButton/KdsValueSwitch.vue";
import {
  KdsListContainer,
  type KdsListOption,
} from "../../_helper/List/ListContainer";

import type {
  KdsDateFormatCategory,
  KdsDateTimeFormatEntry,
  KdsTemporalType,
} from "./types";

type DateTimeFormatPopoverProps = {
  allDefaultFormats: KdsDateTimeFormatEntry[];
  allowedFormats?: KdsTemporalType[];
};

const props = defineProps<DateTimeFormatPopoverProps>();

const selection = defineModel<string>("selection", { default: "" });

const temporalTypeToModeLabel: Record<KdsTemporalType, string> = {
  DATE: "Date",
  DATE_TIME: "Date & Time",
  TIME: "Time",
  ZONED_DATE_TIME: "Zoned Date & Time",
};

const categoryToLocaleLabel: Record<KdsDateFormatCategory, string> = {
  RECENT: "Recent",
  STANDARD: "ISO",
  EUROPEAN: "European",
  AMERICAN: "United States",
};

const typedDateFormats = computed(() => {
  const entries = props.allDefaultFormats;

  // If allowedFormats is omitted, there are no restrictions.
  if (props.allowedFormats === undefined) {
    return entries;
  }

  // An explicit empty array means "allow none".
  if (props.allowedFormats.length === 0) {
    return [];
  }

  const allowed = new Set(props.allowedFormats);
  return entries.filter((entry) => allowed.has(entry.temporalType));
});

const modeOptions = computed(() => {
  const seen = new Set<string>();
  const options: string[] = [];

  for (const entry of typedDateFormats.value) {
    const label = temporalTypeToModeLabel[entry.temporalType];
    if (!seen.has(label)) {
      seen.add(label);
      options.push(label);
    }
  }

  return options;
});

const localeOptions = computed(() => {
  const recent = categoryToLocaleLabel.RECENT;
  const seen = new Set<string>();
  const options: string[] = [recent];
  seen.add(recent);

  for (const entry of typedDateFormats.value) {
    const label = categoryToLocaleLabel[entry.category];
    if (!seen.has(label)) {
      seen.add(label);
      options.push(label);
    }
  }

  return options;
});

const selectedFormatEntry = computed(() => {
  if (!selection.value) {
    return null;
  }

  return (
    typedDateFormats.value.find((entry) => entry.format === selection.value) ??
    null
  );
});

// User-driven selections from the switches.
const selectedMode = ref<string | undefined>(undefined);
const selectedLocale = ref<string | undefined>(undefined);

const selectedModeFromModel = computed(() => {
  const entry = selectedFormatEntry.value;
  return entry ? temporalTypeToModeLabel[entry.temporalType] : null;
});

const selectedLocaleFromModel = computed(() => {
  const entry = selectedFormatEntry.value;
  return entry ? categoryToLocaleLabel[entry.category] : null;
});

const effectiveSelectedMode = computed(() => {
  const modes = modeOptions.value;

  if (modes.length === 0) {
    return "";
  }

  // If the user actively selected a mode, keep it (as long as it's valid).
  const manual = selectedMode.value;
  if (manual && modes.includes(manual)) {
    return manual;
  }

  // Otherwise, derive it from the current selected format if possible.
  const fromModel = selectedModeFromModel.value;
  if (fromModel && modes.includes(fromModel)) {
    return fromModel;
  }

  return modes[0]!;
});

const effectiveSelectedLocale = computed(() => {
  const locales = localeOptions.value;

  if (locales.length === 0) {
    return "";
  }

  // If the user actively selected a locale, keep it (as long as it's valid).
  const manual = selectedLocale.value;
  if (manual && locales.includes(manual)) {
    return manual;
  }

  // Otherwise, derive it from the current selected format if possible.
  const fromModel = selectedLocaleFromModel.value;
  if (fromModel && locales.includes(fromModel)) {
    return fromModel;
  }

  return locales[0]!;
});

type ModeLocaleKey = `${string}__${string}`;

const internalOptionsByModeAndLocale = computed(() => {
  const map = new Map<ModeLocaleKey, KdsListOption[]>();

  for (const entry of typedDateFormats.value) {
    const modeLabel = temporalTypeToModeLabel[entry.temporalType];
    const localeLabel = categoryToLocaleLabel[entry.category];
    const key = `${modeLabel}__${localeLabel}` as const;

    const options = map.get(key) ?? [];
    options.push({
      id: encodeURIComponent(entry.format),
      text: entry.format,
      subText: entry.example,
    });
    map.set(key, options);
  }

  return map;
});

const possibleFormats = computed<KdsListOption[]>(() => {
  const mode = effectiveSelectedMode.value;
  const locale = effectiveSelectedLocale.value;

  if (!mode || !locale) {
    return [];
  }

  const key = `${mode}__${locale}` as ModeLocaleKey;
  const options = internalOptionsByModeAndLocale.value.get(key) ?? [];
  return options.map((option) => ({
    ...option,
    selected: option.id === encodeURIComponent(selection.value),
  }));
});
</script>

<template>
  <div class="kds-date-time-format-popover">
    <KdsValueSwitch
      v-if="modeOptions.length > 1"
      :model-value="effectiveSelectedMode"
      size="small"
      :possible-values="modeOptions"
      @update:model-value="
        (value) => {
          selectedMode = value;
        }
      "
    />

    <KdsValueSwitch
      v-if="localeOptions.length > 1"
      :model-value="effectiveSelectedLocale"
      size="small"
      :possible-values="localeOptions"
      @update:model-value="
        (value) => {
          selectedLocale = value;
        }
      "
    />

    <KdsListContainer
      class="kds-date-time-format-popover-list"
      aria-label="Date/time formats"
      variant="large"
      :possible-values="possibleFormats"
      empty-text="No recently used formats"
      @item-click="$event && (selection = decodeURIComponent($event))"
    />
  </div>
</template>

<style scoped>
.kds-date-time-format-popover {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
  width: fit-content;
  max-width: 100%;
  padding: var(--kds-spacing-container-0-75x);
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}

.kds-date-time-format-popover-list {
  width: var(--kds-dimension-component-width-16x);
  min-width: 100%;
  max-width: 100%;
  height: var(--kds-dimension-component-height-12x);
}
</style>
