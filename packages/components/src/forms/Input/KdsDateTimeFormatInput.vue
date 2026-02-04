<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";

import KdsButton from "../../buttons/KdsButton.vue";
import KdsPopover from "../../overlays/Popover/KdsPopover.vue";
import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";
import KdsValueSwitch from "../RadioButton/KdsValueSwitch.vue";

import KdsBaseInput from "./BaseInput.vue";
import MenuList from "./MenuList/MenuList.vue";
import { dateFormats } from "./constants";
import type {
  KdsDateFormatCategory,
  KdsDateTimeFormatInputProps,
  KdsDateTimeFormatOption,
  KdsTemporalType,
} from "./types";

const props = withDefaults(defineProps<KdsDateTimeFormatInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  placeholder: "Format",
  emptyText: "No entries in this list",
  allDefaultFormats: () => dateFormats,
});

const typedDateFormats = computed(() => props.allDefaultFormats ?? []);

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

const modelValue = defineModel<string>({ default: "" });
const open = ref(false);

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
  const seen = new Set<string>(recent);
  const options: string[] = [recent];

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

const generatedId = useId();
const inputId = computed(() => `${generatedId}-input`);
const labelId = computed(() => `${generatedId}-label`);
const subTextId = computed(() => `${generatedId}-subtext`);

const formatButtonId = computed(() => `${generatedId}-format-button`);
const listboxId = computed(() => `${generatedId}-format-listbox`);

const ariaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);
const ariaDescribedby = computed(() =>
  props.subText || props.validating || props.preserveSubTextSpace
    ? subTextId.value
    : undefined,
);

const popoverContentEl = ref<HTMLElement | null>(null);
const formatButtonWrapperEl = ref<HTMLElement | null>(null);

watch(
  () => open.value,
  (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        const firstRadio =
          popoverContentEl.value?.querySelector<HTMLButtonElement>(
            'button[role="radio"]:not(:disabled)',
          );
        firstRadio?.focus();
      });
      return;
    }

    nextTick(() => {
      const button =
        formatButtonWrapperEl.value?.querySelector<HTMLButtonElement>(
          ":scope button",
        );
      button?.focus();
    });
  },
  { immediate: true },
);

const isMenuItemActiveElement = () =>
  document.activeElement instanceof HTMLElement &&
  document.activeElement.getAttribute("data-menu-item") === "true";

watch(modelValue, () => {
  if (!open.value) {
    return;
  }

  if (props.disabled || props.readonly) {
    return;
  }

  if (!isMenuItemActiveElement()) {
    return;
  }

  open.value = false;
});

const handleListKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    event.preventDefault();
    open.value = false;
    return;
  }

  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
    return;
  }

  const buttons = Array.from(
    popoverContentEl.value?.querySelectorAll<HTMLButtonElement>(
      '[data-menu-item="true"]',
    ) ?? [],
  );

  if (buttons.length === 0) {
    return;
  }

  const currentIndex = buttons.findIndex((b) => b === document.activeElement);
  const fallbackIndex = Math.max(
    0,
    buttons.findIndex((b) => b.getAttribute("aria-selected") === "true"),
  );

  const baseIndex = currentIndex >= 0 ? currentIndex : fallbackIndex;
  const delta = event.key === "ArrowDown" ? 1 : -1;
  const nextIndex = Math.min(
    Math.max(baseIndex + delta, 0),
    buttons.length - 1,
  );

  event.preventDefault();
  buttons[nextIndex]?.focus();
};

const handlePopoverKeydownCapture = (event: KeyboardEvent) => {
  if (event.key !== "Escape") {
    return;
  }

  event.preventDefault();
  open.value = false;
};
</script>

<template>
  <div class="date-time-format-input">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />

    <KdsPopover v-model="open" placement="bottom-left">
      <template #activator>
        <KdsBaseInput
          :id="inputId"
          v-model="modelValue"
          type="text"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :required="props.required"
          :error="props.error"
          :validating="props.validating"
          :name="props.name"
          :autocomplete="props.autocomplete"
          :aria-labelledby="ariaLabelledby"
          :aria-describedby="ariaDescribedby"
        >
          <template #trailing>
            <div ref="formatButtonWrapperEl" class="format-button-wrapper">
              <KdsButton
                :id="formatButtonId"
                type="button"
                size="xsmall"
                variant="outlined"
                leading-icon="date-time"
                aria-label="Open date/time format picker"
                title="Open date/time format picker"
                :disabled="props.disabled || props.readonly"
                :aria-haspopup="'dialog'"
                :aria-expanded="open"
                @click.stop="open = !open"
              />
            </div>
          </template>
        </KdsBaseInput>
      </template>

      <div
        ref="popoverContentEl"
        class="popover-content"
        @click.stop
        @keydown.capture="handlePopoverKeydownCapture"
      >
        <KdsValueSwitch
          v-model="selectedMode"
          size="small"
          :possible-values="modeOptions"
        />

        <KdsValueSwitch
          v-model="selectedLocale"
          size="small"
          :possible-values="localeOptions"
        />

        <MenuList
          :id="listboxId"
          v-model="modelValue"
          aria-label="Date/time formats"
          :items="menuItems"
          :empty-text="props.emptyText"
          @keydown="handleListKeydown"
        />
      </div>
    </KdsPopover>

    <KdsSubText
      :id="subTextId"
      :sub-text="props.subText"
      :error="props.error"
      :validating="props.validating"
      :preserve-sub-text-space="props.preserveSubTextSpace"
    />
  </div>
</template>

<style scoped>
.date-time-format-input {
  display: flex;
  flex-direction: column;
}

.format-button-wrapper {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

.popover-content {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
  padding: var(--kds-spacing-container-0-75x);
}
</style>
