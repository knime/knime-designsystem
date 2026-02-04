<script setup lang="ts">
import { computed, ref, watch } from "vue";

import KdsValueSwitch from "../../RadioButton/KdsValueSwitch.vue";
import type {
  KdsDateFormatCategory,
  KdsDateTimeFormatEntry,
  KdsDateTimeFormatOption,
  KdsTemporalType,
} from "../types";

import MenuList from "./MenuList/MenuList.vue";
import { dateFormats } from "./constants.ts";

type DateTimeFormatPopoverProps = {
  id: string;
  emptyText: string;
  allDefaultFormats?: KdsDateTimeFormatEntry[];
  allowedFormats?: KdsTemporalType[];
};

const props = defineProps<DateTimeFormatPopoverProps>();

const modelValue = defineModel<string>({ default: "" });

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
  const entries = props.allDefaultFormats ?? dateFormats;

  if (!props.allowedFormats || props.allowedFormats.length === 0) {
    return entries;
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

const selectedMode = ref(modeOptions.value[0] ?? "Date");
const selectedLocale = ref(localeOptions.value[0] ?? "ISO");

// Keep the mode/locale switches in sync with the selected format.
const selectedFormatEntry = computed(() => {
  if (!modelValue.value) {
    return null;
  }

  return (
    typedDateFormats.value.find((entry) => entry.format === modelValue.value) ??
    null
  );
});

const selectedModeFromModel = computed(() => {
  const entry = selectedFormatEntry.value;
  return entry ? temporalTypeToModeLabel[entry.temporalType] : null;
});

const selectedLocaleFromModel = computed(() => {
  const entry = selectedFormatEntry.value;
  return entry ? categoryToLocaleLabel[entry.category] : null;
});

type ModeLocaleKey = `${string}__${string}`;

const internalOptionsByModeAndLocale = computed(() => {
  const map = new Map<ModeLocaleKey, KdsDateTimeFormatOption[]>();

  for (const entry of typedDateFormats.value) {
    const modeLabel = temporalTypeToModeLabel[entry.temporalType];
    const localeLabel = categoryToLocaleLabel[entry.category];
    const key = `${modeLabel}__${localeLabel}` as const;

    const options = map.get(key) ?? [];
    options.push({
      id: entry.format,
      label: entry.format,
      example: entry.example,
    });
    map.set(key, options);
  }

  return map;
});

const formatOptions = computed(() => {
  const key = `${selectedMode.value}__${selectedLocale.value}` as ModeLocaleKey;
  return internalOptionsByModeAndLocale.value.get(key) ?? [];
});

const menuItems = computed(() =>
  formatOptions.value.map((option) => ({
    id: option.id,
    text: option.label,
    subtext: option.example,
  })),
);

watch(
  [selectedModeFromModel, selectedLocaleFromModel, modeOptions, localeOptions],
  ([mode, locale, modes, locales]) => {
    if (modes.length === 0 || locales.length === 0) {
      return;
    }

    // If the current model value matches a known entry, prefer that.
    if (mode && modes.includes(mode)) {
      selectedMode.value = mode;
    }

    if (locale && locales.includes(locale)) {
      selectedLocale.value = locale;
    }

    // Fallback: ensure selected values remain valid.
    if (!modes.includes(selectedMode.value)) {
      selectedMode.value = modes[0]!;
    }

    if (!locales.includes(selectedLocale.value)) {
      selectedLocale.value = locales[0]!;
    }
  },
  { immediate: true },
);

watch(modeOptions, (options) => {
  if (options.length === 0) {
    return;
  }

  if (!options.includes(selectedMode.value)) {
    selectedMode.value = options[0]!;
  }
});

watch(localeOptions, (options) => {
  if (options.length === 0) {
    return;
  }

  if (!options.includes(selectedLocale.value)) {
    selectedLocale.value = options[0]!;
  }
});
</script>

<template>
  <div class="popover-content" role="listbox">
    <KdsValueSwitch
      v-if="modeOptions.length > 1"
      v-model="selectedMode"
      size="small"
      :possible-values="modeOptions"
    />

    <KdsValueSwitch
      v-if="localeOptions.length > 1"
      v-model="selectedLocale"
      size="small"
      :possible-values="localeOptions"
    />

    <MenuList
      :id="props.id"
      v-model="modelValue"
      aria-label="Date/time formats"
      :items="menuItems"
      :empty-text="props.emptyText"
    />
  </div>
</template>

<style scoped>
.popover-content {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
  padding: var(--kds-spacing-container-0-75x);
  background: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
