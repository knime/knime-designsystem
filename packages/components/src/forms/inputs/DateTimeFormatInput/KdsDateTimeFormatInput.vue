<script setup lang="ts">
import { ref } from "vue";

import KdsButton from "../../../buttons/KdsButton.vue";
import BaseFormFieldWrapper from "../../BaseFormFieldWrapper.vue";
import KdsBaseInput from "../BaseInput.vue";
import type { KdsDateTimeFormatInputProps } from "../types.ts";

import DateTimeFormatPopover from "./DateTimeFormatPopover.vue";

const props = withDefaults(defineProps<KdsDateTimeFormatInputProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  placeholder: "Format",
  emptyText: "No entries in this list",
  allDefaultFormats: undefined,
});

const modelValue = defineModel<string>({ default: "" });
const open = ref(false);

const anchorEl = ref<HTMLElement | null>(null);
const activatorEl = ref<HTMLElement | null>(null);
</script>

<template>
  <BaseFormFieldWrapper v-bind="props">
    <template #default="slotProps">
      <KdsBaseInput
        v-bind="slotProps"
        ref="anchorEl"
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
      >
        <template #trailing>
          <KdsButton
            ref="activatorEl"
            type="button"
            size="xsmall"
            variant="outlined"
            leading-icon="date-time"
            aria-label="Open date/time format picker"
            title="Open date/time format picker"
            :disabled="props.disabled || props.readonly"
            @click="open = !open"
          />
        </template>
      </KdsBaseInput>

      <DateTimeFormatPopover
        v-model="open"
        :selection="modelValue"
        :activator-el="activatorEl"
        :anchor-el="anchorEl"
        :empty-text="props.emptyText"
        :all-default-formats="props.allDefaultFormats"
        :allowed-formats="props.allowedFormats"
        @update:selection="
          modelValue = $event;
          open = false;
        "
      />
    </template>
  </BaseFormFieldWrapper>
</template>
