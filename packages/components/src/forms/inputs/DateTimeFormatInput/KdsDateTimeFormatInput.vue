<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

import { KdsToggleButton } from "../../../buttons";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";

import DateTimeFormatPopover from "./DateTimeFormatPopover.vue";
import type { KdsDateTimeFormatInputProps } from "./types";

const {
  disabled = false,
  error = false,
  validating = false,
  placeholder = "Format",
  autocomplete,
  allDefaultFormats,
  allowedFormats,
} = defineProps<KdsDateTimeFormatInputProps>();

const modelValue = defineModel<string>({ default: "" });
const open = ref(false);

const popoverEl = useTemplateRef("popoverEl");
</script>

<template>
  <BaseFormFieldWrapper v-bind="$props">
    <template #default="slotProps">
      <div :style="popoverEl?.anchorStyle">
        <BaseInput
          v-bind="slotProps"
          v-model="modelValue"
          type="text"
          :placeholder="placeholder"
          :disabled="disabled"
          :error="error"
          :validating="validating"
          :autocomplete="autocomplete"
        >
          <template #trailing>
            <KdsToggleButton
              v-model="open"
              size="xsmall"
              variant="outlined"
              leading-icon="date-time"
              aria-label="Open date/time format picker"
              :aria-controls="popoverEl?.popoverId"
              :aria-expanded="open"
              aria-haspopup="dialog"
              :disabled="disabled"
              :title="
                open
                  ? 'Close date/time format picker'
                  : 'Open date/time format picker'
              "
            />
          </template>
        </BaseInput>

        <KdsPopover
          ref="popoverEl"
          v-model="open"
          placement="bottom-right"
          popover-aria-label="Date time format selection dialog"
        >
          <DateTimeFormatPopover
            :selection="modelValue"
            :all-default-formats="allDefaultFormats"
            :allowed-formats="allowedFormats"
            @update:selection="
              modelValue = $event;
              open = false;
            "
          />
        </KdsPopover>
      </div>
    </template>
  </BaseFormFieldWrapper>
</template>
