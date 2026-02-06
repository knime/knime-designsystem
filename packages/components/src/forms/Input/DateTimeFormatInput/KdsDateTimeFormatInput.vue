<script setup lang="ts">
import { computed, ref, useId } from "vue";

import KdsButton from "../../../buttons/KdsButton.vue";
import { useKdsPopover } from "../../../overlays/Popover/useKdsPopover";
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

const anchorEl = ref<HTMLElement | null>(null);
const activatorEl = ref<HTMLElement | null>(null);
const popoverEl = ref<HTMLElement | null>(null);

useKdsPopover({
  open,
  activatorEl,
  anchorEl,
  popoverEl,
  placement: "bottom-left",
  type: "listbox",
});
</script>

<template>
  <div class="date-time-format-input">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />

    <KdsBaseInput
      :id="inputId"
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
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
    >
      <template #trailing>
        <KdsButton
          :id="formatButtonId"
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
      :id="listboxId"
      ref="popoverEl"
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
    />

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
</style>
