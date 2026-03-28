<script setup lang="ts">
// import "v-calendar/dist/style.css"; // Took them out because of error with storybook build. Will add them back once we have a solution for the build issue.

import { computed, ref, useTemplateRef } from "vue";
// import { DatePicker } from "v-calendar"; // Took them out because of error with storybook build. Will add them back once we have a solution for the build issue.

import KdsToggleButton from "../../../buttons/KdsToggleButton/KdsToggleButton.vue";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import { useKdsDarkMode } from "../../../util/useKdsDarkMode.ts";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import {
  formatDateToString,
  parseDateString,
  tryParseAnyDate,
} from "./dateUtils.ts";
import type { KdsDateInputProps } from "./types.ts";

const {
  disabled = false,
  error = false,
  autocomplete,
  placeholder = "yyyy-MM-dd",
  datePickerMin,
  datePickerMax,
  subText,
} = defineProps<KdsDateInputProps>();

const { isDarkMode } = useKdsDarkMode();

const modelValue = defineModel<string>({ default: "" });
const baseInput = useTemplateRef("baseInput");
const popoverIsVisible = ref(false);
const legacyDateFormat = "yyyy-MM-dd";
const popoverRef = useTemplateRef("popoverRef");

const inputError = ref(false);

const invalidDateFormatMessage =
  "Invalid date format. The expected date format is yyyy-MM-dd (e.g. 2026-03-11).";
const effectiveError = computed(() => error || inputError.value);
const effectiveSubText = computed(() =>
  inputError.value ? invalidDateFormatMessage : subText,
);

const datePickerValue = computed(() => {
  if (typeof modelValue.value !== "string") {
    return null;
  }
  return parseDateString(modelValue.value);
});

const onDatePickerInput = (date: Date | string | null) => {
  modelValue.value = formatDateToString(date);
  inputError.value = false;
  popoverIsVisible.value = false;
};

const onTextInputBlur = () => {
  if (!modelValue.value) {
    inputError.value = false;
    return;
  }
  const parsed = tryParseAnyDate(modelValue.value);

  if (parsed) {
    modelValue.value = formatDateToString(parsed);
    inputError.value = false;
  } else {
    inputError.value = true;
  }
};

defineExpose<KdsFormFieldExpose>({
  focus: () => baseInput.value?.focus(),
});
</script>

<template>
  <BaseFormFieldWrapper
    v-bind="$props"
    :error="effectiveError"
    :sub-text="effectiveSubText"
  >
    <template #default="slotProps">
      <BaseInput
        ref="baseInput"
        v-bind="slotProps"
        v-model="modelValue"
        type="text"
        :placeholder
        :disabled
        :error="effectiveError"
        :autocomplete
        :style="popoverRef?.anchorStyle"
        :aria-controls="popoverRef?.popoverId"
        @blur="onTextInputBlur"
      >
        <template #trailing>
          <KdsToggleButton
            v-model="popoverIsVisible"
            type="button"
            size="xsmall"
            variant="outlined"
            leading-icon="calendar"
            ariaLabel="Open date picker"
            :disabled
            :aria-controls="popoverRef?.popoverId"
            aria-haspopup="dialog"
            :aria-expanded="popoverIsVisible"
            :title="popoverIsVisible ? 'Close date picker' : 'Open date picker'"
          />

          <KdsPopover
            ref="popoverRef"
            v-model="popoverIsVisible"
            placement="bottom-right"
            role="dialog"
            aria-label="Date picker"
          >
            <DatePicker
              v-if="popoverIsVisible"
              :model-value="datePickerValue"
              :is-dark="isDarkMode"
              class="v-calendar-date-picker"
              :is-required="true"
              color="masala"
              :popover="{
                placement: 'bottom',
                visibility: 'click',
              }"
              :masks="{ L: legacyDateFormat }"
              :max-date="datePickerMax"
              :min-date="datePickerMin"
              @popover-will-hide="popoverIsVisible = false"
              @popover-will-show="popoverIsVisible = true"
              @update:model-value="onDatePickerInput"
            />
          </KdsPopover>
        </template>
      </BaseInput>
    </template>
  </BaseFormFieldWrapper>
</template>

<style>
.v-calendar-date-picker {
  --vc-bg: var(--kds-color-surface-default);
  --vc-font-family: var(--kds-core-font-family-roboto);
  --vc-color: var(--kds-color-text-and-icon-neutral);
  --vc-border: transparent;
  --vc-rounded: var(--kds-border-radius-container-0-25x);

  --vc-font-normal: 400;
  --vc-font-medium: 500;
  --vc-font-semibold: 600;
  --vc-font-bold: 700;

  --vc-text-2xs: var(--kds-core-font-size-0-62x);
  --vc-text-xs: var(--kds-core-font-size-0-62x);
  --vc-text-sm: var(--kds-core-font-size-0-75x);
  --vc-text-base: var(--kds-core-font-size-0-75x);
  --vc-text-lg: var(--kds-core-font-size-0-87x);
  --vc-text-xl: var(--kds-core-font-size-1x);
  --vc-text-2xl: var(--kds-core-font-size-1-13x);

  --vc-popover-content-color: var(--vc-color);
  --vc-popover-content-bg: var(--kds-color-surface-default);
  --vc-popover-content-border: var(--kds-color-border-neutral);

  box-shadow: var(--kds-elevation-level-3);

  & .vc-highlight-content-solid {
    font-weight: var(--kds-core-font-weight-medium);
    color: var(--kds-color-text-and-icon-selected);
    background-color: var(--kds-color-background-selected-initial);
  }

  & button,
  & .vc-arrow {
    color: var(--kds-color-text-and-icon-neutral);
    background-color: var(--kds-color-background-neutral-initial);
    border: var(--kds-border-action-transparent);

    &.vc-prev,
    &.vc-next {
      width: var(--kds-dimension-component-width-1-25x);
      height: var(--kds-dimension-component-height-1-25x);
      border-radius: var(--kds-border-radius-container-0-25x);
    }

    &:hover,
    &.vc-arrow:hover {
      background-color: var(--kds-color-background-neutral-hover);
    }

    &:active,
    &.vc-arrow:active {
      background-color: var(--kds-color-background-neutral-active);
    }

    &:focus-within {
      box-shadow: none;
    }
  }

  & .vc-pane {
    width: max-content;
    min-width: initial;

    & .vc-weeks {
      display: grid;
      gap: 4px;
      width: max-content;
      min-width: initial;

      & .vc-week {
        gap: 4px;

        & .vc-day {
          min-height: var(--kds-dimension-component-height-1-5x);
          border-radius: var(--kds-border-radius-container-0-25x);

          & .vc-highlight {
            border-radius: var(--kds-border-radius-container-0-25x);
          }

          & .vc-day-content {
            width: var(--kds-dimension-component-height-1-5x);
            height: var(--kds-dimension-component-height-1-5x);
            border-radius: var(--kds-border-radius-container-0-25x);
          }

          &:focus-within {
            background-color: var(--kds-color-background-neutral-active);
            box-shadow: none;
          }
        }
      }
    }
  }

  .vc-focus:focus-within {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    box-shadow: none;
  }
}

.vc-popover-content {
  --vc-popover-content-color: var(--kds-color-text-and-icon-neutral);
  --vc-popover-content-bg: var(--kds-color-surface-muted);
  --vc-popover-content-border: transparent;

  box-shadow: var(--kds-elevation-level-3);

  & .vc-nav-item,
  & .vc-nav-arrow,
  & .vc-nav-title {
    width: initial;
    height: var(--kds-dimension-component-height-1-5x);
    padding: 0 var(--kds-spacing-container-0-25x);
    font-size: var(--kds-core-font-size-0-75x);
    font-weight: var(--kds-core-font-weight-regular);
    line-height: var(--kds-core-line-height-singleline);
    color: var(--kds-color-text-and-icon-neutral);
    background-color: var(--kds-color-background-neutral-initial);
    border: var(--kds-border-action-transparent);

    &.is-left,
    &.is-right {
      width: var(--kds-dimension-component-width-1-25x);
      height: var(--kds-dimension-component-height-1-25x);
      padding: 0;
      margin-top: 2px;
      border-radius: var(--kds-border-radius-container-0-25x);
    }

    &:hover,
    &.vc-arrow:hover {
      background-color: var(--kds-color-background-neutral-hover);
    }

    &:active,
    &.vc-arrow:active {
      background-color: var(--kds-color-background-neutral-active);
    }

    &:focus-within {
      box-shadow: none;
    }

    &.is-active {
      color: var(--kds-color-text-and-icon-selected);
      background-color: var(--kds-color-background-selected-initial);
      box-shadow: none;

      &:hover {
        background-color: var(--kds-color-background-selected-hover);
      }
    }
  }
}
</style>
