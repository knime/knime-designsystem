<script setup lang="ts">
import { computed, ref, useId } from "vue";

import KdsButton from "../../../buttons/KdsButton.vue";
import KdsPopover from "../../../overlays/Popover/KdsPopover.vue";
import KdsLabel from "../../KdsLabel.vue";
import KdsSubText from "../../KdsSubText.vue";
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

const formatButtonWrapperEl = ref<HTMLElement | null>(null);
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
      <template #activator="{ props: popoverActivatorProps }">
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
                v-bind="popoverActivatorProps"
                type="button"
                size="xsmall"
                variant="outlined"
                leading-icon="date-time"
                aria-label="Open date/time format picker"
                title="Open date/time format picker"
                :disabled="props.disabled || props.readonly"
                @click.stop="open = !open"
              />
            </div>
          </template>
        </KdsBaseInput>
      </template>

      <DateTimeFormatPopover
        :id="listboxId"
        :model-value="modelValue"
        :empty-text="props.emptyText"
        :all-default-formats="props.allDefaultFormats"
        :allowed-formats="props.allowedFormats"
        @update:model-value="
          (value) => {
            modelValue = value;
            open = false;
          }
        "
        @close="open = false"
      />
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
</style>
