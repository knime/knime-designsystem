<script setup lang="ts">
import { computed, ref, useId } from "vue";

import type { KdsSubTextProps } from "../types";

import KdsLabel from "./KdsLabel.vue";
import KdsSubText from "./KdsSubText.vue";

type KdsFormFieldProps = {
  /**
   * Input id
   */
  id?: string;
  /**
   * Label text
   */
  label?: string;
  /**
   * Aria-label for accessibility when a visible label is not desired
   */
  ariaLabel?: string;
  /**
   * Optional description displayed in an info popover next to the label.
   * The info toggle button is only visible when hovering the input field.
   */
  description?: string;
} & Omit<KdsSubTextProps, "id">;

const props = defineProps<KdsFormFieldProps>();

const fallbackId = useId();
const inputId = computed(() => props.id?.trim() || fallbackId);
const labelId = computed(() => `${inputId.value}-label`);
const subTextId = computed(() => `${inputId.value}-subtext`);

const isHovered = ref(false);
</script>

<template>
  <div
    class="kds-form-field"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
      :description="props.description"
      :is-hovered="isHovered"
    />
    <slot
      :id="inputId"
      :aria-labelledby="props.label ? labelId : undefined"
      :aria-describedby="props.subText ? subTextId : undefined"
      :aria-label="props.label ? undefined : props.ariaLabel"
      :aria-invalid="props.error"
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
.kds-form-field {
  display: flex;
  flex-direction: column;
}
</style>
