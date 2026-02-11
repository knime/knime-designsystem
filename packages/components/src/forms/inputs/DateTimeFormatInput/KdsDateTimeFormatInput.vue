<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

import { KdsToggleButton } from "../../../buttons";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import KdsBaseInput from "../BaseInput.vue";

import DateTimeFormatPopover from "./DateTimeFormatPopover.vue";
import type { KdsDateTimeFormatInputProps } from "./types";

const props = withDefaults(defineProps<KdsDateTimeFormatInputProps>(), {
  disabled: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  placeholder: "Format",
  allDefaultFormats: undefined,
});

const modelValue = defineModel<string>({ default: "" });
const open = ref(false);

const popoverEl = useTemplateRef("popoverEl");
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <div :style="popoverEl?.anchorStyle">
        <KdsBaseInput
          v-bind="slotProps"
          v-model="modelValue"
          type="text"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :error="props.error"
          :validating="props.validating"
          :autocomplete="props.autocomplete"
        >
          <template #trailing>
            <KdsToggleButton
              v-model="open"
              size="xsmall"
              variant="outlined"
              leading-icon="date-time"
              aria-label="Open date/time format picker"
              :aria-controls="popoverEl?.popoverId"
              aria-haspopup="dialog"
              :disabled="props.disabled"
              :title="
                open
                  ? 'Close date/time format picker'
                  : 'Open date/time format picker'
              "
            />
          </template>
        </KdsBaseInput>

        <KdsPopover
          ref="popoverEl"
          v-model="open"
          placement="bottom-right"
          popover-aria-label="Date time format selection dialog"
        >
          <DateTimeFormatPopover
            :selection="modelValue"
            :empty-text="props.emptyText"
            :all-default-formats="props.allDefaultFormats"
            :allowed-formats="props.allowedFormats"
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
