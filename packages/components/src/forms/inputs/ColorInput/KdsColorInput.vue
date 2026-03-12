<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import type { KdsHexColor } from "../../../accessories";
import KdsColorSwatch from "../../../accessories/ColorSwatch/KdsColorSwatch.vue";
import { KdsToggleButton } from "../../../buttons";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";

import ColorPicker from "./ColorPicker.vue";
import { normalizeHexColor } from "./colorUtils";
import type { KdsColorInputProps } from "./types";
import { useColorInputValidationOnFocusOut } from "./useColorInputValidationOnFocusOut";

const {
  placeholder = "#FFFFFF",
  disabled = false,
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  autocomplete,
} = defineProps<KdsColorInputProps>();

const modelValue = defineModel<string>({ default: "" });
const open = ref(false);

const popoverEl = useTemplateRef("popoverEl");

const swatchColor = computed<KdsHexColor>(
  () => (normalizeHexColor(modelValue.value) ?? "#FFFFFF") as KdsHexColor,
);

const { handleFocusOut } = useColorInputValidationOnFocusOut(modelValue);

const onClickColorSwatch = () => {
  if (!props.disabled) {
    open.value = !open.value;
  }
};
</script>

<template>
  <BaseFormFieldWrapper v-bind="$props">
    <template #default="slotProps">
      <div :style="popoverEl?.anchorStyle" @focusout="handleFocusOut">
        <BaseInput
          v-bind="slotProps"
          v-model="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :error="error"
          :autocomplete="autocomplete"
        >
          <template #leading>
            <KdsColorSwatch
              size="large"
              :color="swatchColor"
              :aria-hidden="true"
              :style="{ cursor: props.disabled ? 'default' : 'pointer' }"
              @click="onClickColorSwatch"
            />
          </template>
          <template #trailing>
            <KdsToggleButton
              v-model="open"
              size="xsmall"
              variant="outlined"
              leading-icon="color-picker"
              aria-label="Open color picker"
              :aria-controls="popoverEl?.popoverId"
              aria-haspopup="dialog"
              :disabled="disabled"
              :title="open ? 'Close color picker' : 'Open color picker'"
            />
          </template>
        </BaseInput>

        <KdsPopover
          ref="popoverEl"
          v-model="open"
          placement="bottom-right"
          role="dialog"
          popover-aria-label="Color picker"
        >
          <ColorPicker v-model="modelValue" />
        </KdsPopover>
      </div>
    </template>
  </BaseFormFieldWrapper>
</template>
