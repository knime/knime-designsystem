<script setup lang="ts">
import { computed, ref } from "vue";

import KdsValueSwitch from "../../RadioButton/KdsValueSwitch.vue";
import type {
  KdsDateFormatCategory,
  KdsDateTimeFormatEntry,
  KdsTemporalType,
} from "../types";

import MenuList from "./MenuList/MenuList.vue";
import type { MenuListItem } from "./MenuList/types.ts";
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

const selectedFormatEntry = computed(() => {
  if (!modelValue.value) {
    return null;
  }

  return (
    typedDateFormats.value.find((entry) => entry.format === modelValue.value) ??
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

  const fromModel = selectedModeFromModel.value;
  if (fromModel && modes.includes(fromModel)) {
    return fromModel;
  }

  const manual = selectedMode.value;
  if (manual && modes.includes(manual)) {
    return manual;
  }

  return modes[0]!;
});

const effectiveSelectedLocale = computed(() => {
  const locales = localeOptions.value;

  if (locales.length === 0) {
    return "";
  }

  const fromModel = selectedLocaleFromModel.value;
  if (fromModel && locales.includes(fromModel)) {
    return fromModel;
  }

  const manual = selectedLocale.value;
  if (manual && locales.includes(manual)) {
    return manual;
  }

  return locales[0]!;
});

type ModeLocaleKey = `${string}__${string}`;

const internalOptionsByModeAndLocale = computed(() => {
  const map = new Map<ModeLocaleKey, MenuListItem[]>();

  for (const entry of typedDateFormats.value) {
    const modeLabel = temporalTypeToModeLabel[entry.temporalType];
    const localeLabel = categoryToLocaleLabel[entry.category];
    const key = `${modeLabel}__${localeLabel}` as const;

    const options = map.get(key) ?? [];
    options.push({
      id: entry.format,
      text: entry.format,
      subtext: entry.example,
    });
    map.set(key, options);
  }

  return map;
});

const menuItems = computed(() => {
  const mode = effectiveSelectedMode.value;
  const locale = effectiveSelectedLocale.value;

  if (!mode || !locale) {
    return [];
  }

  const key = `${mode}__${locale}` as ModeLocaleKey;
  return internalOptionsByModeAndLocale.value.get(key) ?? [];
});
</script>

<template>
  <div class="popover-content" role="listbox">
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
