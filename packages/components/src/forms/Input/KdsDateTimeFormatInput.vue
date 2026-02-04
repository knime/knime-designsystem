<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";

import KdsIcon from "../../Icon/KdsIcon.vue";
import KdsButton from "../../buttons/KdsButton.vue";
import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";
import KdsValueSwitch from "../RadioButton/KdsValueSwitch.vue";

import KdsBaseInput from "./BaseInput.vue";
import type {
  KdsDateTimeFormatInputProps,
  KdsDateTimeFormatOption,
} from "./types";

const props = withDefaults(defineProps<KdsDateTimeFormatInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  placeholder: "{Formatted Value}",
  formatOptions: () => [],
  emptyText: "No entries in this list",
  modeOptions: () => ["Date", "Date & Time", "Time", "Zoned Date & Time"],
  localeOptions: () => ["Recent", "ISO", "European", "United States"],
});

const modelValue = defineModel<string>({ default: "" });
const open = defineModel<boolean>("open", { default: false });

const selectedMode = ref(props.modeOptions[0] ?? "Date");
const selectedLocale = ref(props.localeOptions[0] ?? "Recent");

const generatedId = useId();
const inputId = computed(() => `${generatedId}-input`);
const labelId = computed(() => `${generatedId}-label`);
const subTextId = computed(() => `${generatedId}-subtext`);

const formatButtonId = computed(() => `${generatedId}-format-button`);
const popoverId = computed(() => `${generatedId}-format-popover`);
const listboxId = computed(() => `${generatedId}-format-listbox`);

const ariaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);
const ariaDescribedby = computed(() =>
  props.subText || props.validating || props.preserveSubTextSpace
    ? subTextId.value
    : undefined,
);

const anchorName = computed(() => `--kds-date-time-format-${generatedId}`);

const popoverEl = ref<HTMLElement | null>(null);
const formatButtonWrapperEl = ref<HTMLElement | null>(null);

const showPopover = () => {
  if (!popoverEl.value) {
    return;
  }

  try {
    (popoverEl.value as unknown as { showPopover: () => void }).showPopover();
  } catch {
    // no-op
  }
};

const hidePopover = () => {
  if (!popoverEl.value) {
    return;
  }

  try {
    (popoverEl.value as unknown as { hidePopover: () => void }).hidePopover();
  } catch {
    // no-op
  }
};

watch(
  () => open.value,
  (isOpen) => {
    if (!popoverEl.value) {
      return;
    }

    if (isOpen) {
      if (popoverEl.value.matches(":popover-open")) {
        return;
      }

      showPopover();
      nextTick(() => {
        const firstRadio = popoverEl.value?.querySelector<HTMLButtonElement>(
          'button[role="radio"]:not(:disabled)',
        );
        firstRadio?.focus();
      });
      return;
    }

    if (!popoverEl.value.matches(":popover-open")) {
      return;
    }

    hidePopover();
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

const handlePopoverToggle = (event: Event) => {
  const toggleEvent = event as Event & { newState?: "open" | "closed" };
  if (toggleEvent.newState === "open") {
    open.value = true;
  }
  if (toggleEvent.newState === "closed") {
    open.value = false;
  }
};

const formatOptions = computed(() => props.formatOptions);

const selectedId = computed(() => modelValue.value);

const selectFormat = (option: KdsDateTimeFormatOption) => {
  if (props.disabled || props.readonly) {
    return;
  }

  modelValue.value = option.id;
  open.value = false;
};

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
    popoverEl.value?.querySelectorAll<HTMLButtonElement>(
      '[data-format-item="true"]',
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
  <div class="date-time-format-input" :style="{ 'anchor-name': anchorName }">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />

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
            :popovertarget="popoverId"
            aria-haspopup="dialog"
            :aria-expanded="open"
            :aria-controls="popoverId"
          />
        </div>
      </template>
    </KdsBaseInput>

    <KdsSubText
      :id="subTextId"
      :sub-text="props.subText"
      :error="props.error"
      :validating="props.validating"
      :preserve-sub-text-space="props.preserveSubTextSpace"
    />

    <div
      :id="popoverId"
      ref="popoverEl"
      class="popover"
      popover
      :style="{ 'position-anchor': anchorName }"
      @toggle="handlePopoverToggle"
      @click.stop
      @keydown.capture="handlePopoverKeydownCapture"
    >
      <div class="popover-content">
        <KdsValueSwitch
          v-model="selectedMode"
          size="small"
          :possible-values="props.modeOptions"
        />

        <KdsValueSwitch
          v-model="selectedLocale"
          size="small"
          :possible-values="props.localeOptions"
        />

        <div
          class="list-wrapper"
          :class="{ empty: formatOptions.length === 0 }"
        >
          <ul
            v-if="formatOptions.length > 0"
            :id="listboxId"
            class="list"
            role="listbox"
            aria-label="Date/time formats"
            @keydown="handleListKeydown"
          >
            <li v-for="option in formatOptions" :key="option.id" class="item">
              <button
                type="button"
                data-format-item="true"
                :class="{
                  wrapper: true,
                  selected: selectedId === option.id,
                }"
                role="option"
                :aria-selected="selectedId === option.id"
                @click="selectFormat(option)"
              >
                <span class="content">
                  <span class="label">{{ option.label }}</span>
                  <span v-if="option.example" class="subtext">
                    {{ option.example }}
                  </span>
                </span>

                <KdsIcon
                  v-if="selectedId === option.id"
                  name="checkmark"
                  size="xsmall"
                />
              </button>
            </li>
          </ul>

          <div v-else class="empty-state" aria-disabled="true">
            {{ props.emptyText }}
          </div>
        </div>
      </div>
    </div>
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

.popover {
  flex-direction: column;
  width: max-content;
  padding: 0;
  overflow: visible;
  outline: none;
  background: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);

  &:popover-open {
    display: flex;
  }
}

.popover[popover] {
  position: fixed;
  inset: calc(anchor(bottom) + var(--kds-spacing-container-0-25x)) anchor(right)
    auto auto;
  margin: 0;
  position-try-fallbacks: --kds-date-time-format-popover-above;
}

@position-try --kds-date-time-format-popover-above {
  /* stylelint-disable-next-line at-rule-descriptor-value-no-unknown */
  inset: auto anchor(right)
    calc(anchor(top) - var(--kds-spacing-container-0-25x)) auto;
}

.popover-content {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
  padding: var(--kds-spacing-container-0-75x);
}

.list-wrapper {
  overflow: hidden;
  border: var(--kds-border-base-subtle);
  border-radius: var(--kds-border-radius-container-0-31x);

  &.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(var(--kds-dimension-component-height-1-5x) * 4);
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-10x);
  padding: var(--kds-spacing-container-0-25x);
  margin: 0;
  list-style: none;
}

.item {
  min-height: var(--kds-dimension-component-height-1-5x);
}

.wrapper {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: var(--kds-dimension-component-height-1-5x);
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: var(--kds-border-radius-container-0-31x);

  &:hover {
    background: var(--kds-color-background-neutral-hover);
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &.selected {
    background: var(--kds-color-background-selected-initial);

    &:hover {
      background: var(--kds-color-background-selected-hover);
    }
  }
}

.content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-12x);
  align-items: flex-start;
  min-width: 0;
}

.label {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-neutral);
  text-align: left;
  white-space: nowrap;

  .wrapper.selected & {
    color: var(--kds-color-text-and-icon-selected);
  }
}

.subtext {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-subtext-small);
  color: var(--kds-color-text-and-icon-muted);
  text-align: left;
  white-space: nowrap;

  .wrapper.selected & {
    color: var(--kds-color-text-and-icon-selected);
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--kds-spacing-container-0-75x) var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-muted);
}
</style>
