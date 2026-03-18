<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";

import KdsToggleButton from "../../../buttons/KdsToggleButton/KdsToggleButton.vue";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";

import TimeInputPopover from "./TimeInputPopover.vue";
import {
  formatTimeInput,
  getEmptyTimeValue,
  normalizeTimeValue,
  parseTimeInput,
} from "./timeUtils";
import type { KdsTimeInputProps, KdsTimeInputValue } from "./types";

const props = withDefaults(defineProps<KdsTimeInputProps>(), {
  disabled: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  placeholder: "Set time",
});

const modelValue = defineModel<string>({ default: "" });
const open = ref(false);
const popoverEl = useTemplateRef("popoverEl");
const popoverValue = ref<KdsTimeInputValue>(getEmptyTimeValue());

const syncPopoverFromModel = (value: string) => {
  const parsed = parseTimeInput(value);
  popoverValue.value = parsed ?? getEmptyTimeValue();
};

watch(
  () => open.value,
  (isOpen) => {
    if (isOpen) {
      syncPopoverFromModel(modelValue.value);
    }
  },
);

watch(
  () => modelValue.value,
  (next) => {
    if (!open.value) {
      return;
    }

    const parsed = parseTimeInput(next);
    if (parsed) {
      popoverValue.value = parsed;
    }
  },
);

const onPopoverValueUpdate = (newValue: KdsTimeInputValue) => {
  const normalized = normalizeTimeValue(newValue);
  popoverValue.value = normalized;
  modelValue.value = formatTimeInput(normalized);
};

const onInputBlur = () => {
  if (!modelValue.value.trim()) {
    return;
  }

  const parsed = parseTimeInput(modelValue.value);
  if (parsed) {
    modelValue.value = formatTimeInput(parsed);
    return;
  }

  modelValue.value = formatTimeInput(popoverValue.value);
};
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <div :style="popoverEl?.anchorStyle">
        <BaseInput
          v-bind="slotProps"
          v-model="modelValue"
          type="text"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :error="props.error"
          :validating="props.validating"
          :autocomplete="props.autocomplete"
          :aria-controls="popoverEl?.popoverId"
          @blur="onInputBlur"
        >
          <template #trailing>
            <KdsToggleButton
              v-model="open"
              type="button"
              size="xsmall"
              variant="outlined"
              leading-icon="time"
              aria-label="Open time picker"
              :disabled="props.disabled"
              :aria-controls="popoverEl?.popoverId"
              aria-haspopup="dialog"
              :aria-expanded="open"
              :title="open ? 'Close time picker' : 'Open time picker'"
            />
          </template>
        </BaseInput>

        <KdsPopover
          ref="popoverEl"
          v-model="open"
          placement="bottom-right"
          role="dialog"
          popover-aria-label="Time picker"
        >
          <TimeInputPopover
            v-if="open"
            :model-value="popoverValue"
            @update:model-value="onPopoverValueUpdate"
          />
        </KdsPopover>
      </div>
    </template>
  </BaseFormFieldWrapper>
</template>
