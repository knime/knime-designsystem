<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { computed, ref } from "vue";

import type { KdsHexColor } from "../../../accessories";
import KdsColorSwatch from "../../../accessories/ColorSwatch/KdsColorSwatch.vue";
import { KdsToggleButton } from "../../../buttons";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import BaseFormFieldWrapper from "../../BaseFormFieldWrapper.vue";
import BaseInput from "../BaseInput.vue";
import type { KdsColorInputProps } from "../types";

import ColorPicker from "./ColorPicker.vue";
import { normalizeHexColor } from "./colorUtils";

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

const containerEl = ref<HTMLElement | null>(null);
const toggleButtonEl = ref<ComponentPublicInstance | null>(null);

const swatchColor = computed<KdsHexColor>(
  () => (normalizeHexColor(modelValue.value) ?? "#FFFFFF") as KdsHexColor,
);
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <BaseInput
        ref="containerEl"
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
            :color="swatchColor"
            :aria-hidden="true"
            style="
              width: var(--kds-dimension-component-width-1-25x);
              height: var(--kds-dimension-component-width-1-25x);
            "
          />
        </template>
        <template #trailing>
          <KdsToggleButton
            ref="toggleButtonEl"
            v-model="open"
            class="picker-button"
            size="xsmall"
            variant="outlined"
            leading-icon="color-picker"
            aria-label="Open color picker"
            :disabled="props.disabled"
            :title="open ? 'Close color picker' : 'Open color picker'"
          />
        </template>
      </BaseInput>

      <KdsPopover
        v-model="open"
        :activator-el="toggleButtonEl"
        :anchor-el="containerEl"
        placement="bottom-left"
      >
        <ColorPicker v-model="modelValue" />
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>
