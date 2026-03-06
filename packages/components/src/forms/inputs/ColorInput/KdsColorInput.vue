<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import type { KdsHexColor } from "../../../accessories";
import KdsColorSwatch from "../../../accessories/ColorSwatch/KdsColorSwatch.vue";
import { KdsToggleButton } from "../../../buttons";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";
import type { KdsColorInputProps } from "../types";

import ColorPicker from "./ColorPicker.vue";
import { normalizeHexColor } from "./colorUtils";
import { useColorInputValidationOnFocusOut } from "./useColorInputValidationOnFocusOut";

const props = withDefaults(defineProps<KdsColorInputProps>(), {
  placeholder: "#FFFFFF",
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  autocomplete: undefined,
  name: undefined,
});

const modelValue = defineModel<string>({ default: "" });
const open = ref(false);

const popoverEl = useTemplateRef("popoverEl");

const swatchColor = computed<KdsHexColor>(
  () => (normalizeHexColor(modelValue.value) ?? "#FFFFFF") as KdsHexColor,
);

const { handleFocusOut } = useColorInputValidationOnFocusOut(modelValue);
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <div :style="popoverEl?.anchorStyle" @focusout="handleFocusOut">
        <BaseInput
          v-bind="slotProps"
          v-model="modelValue"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :required="props.required"
          :error="props.error"
          :name="props.name"
          :autocomplete="props.autocomplete"
        >
          <template #leading>
            <KdsColorSwatch
              size="large"
              :color="swatchColor"
              :aria-hidden="true"
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
              :disabled="props.disabled || props.readonly"
              :title="open ? 'Close color picker' : 'Open color picker'"
            />
          </template>
        </BaseInput>

        <KdsPopover
          ref="popoverEl"
          v-model="open"
          placement="bottom-right"
          popover-aria-label="Color picker"
        >
          <ColorPicker v-model="modelValue" />
        </KdsPopover>
      </div>
    </template>
  </BaseFormFieldWrapper>
</template>
