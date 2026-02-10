<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "./KdsLabel.vue";
import KdsSubText from "./KdsSubText.vue";
import type { KdsSubTextProps } from "./types";

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
} & Omit<KdsSubTextProps, "id">;

const props = defineProps<KdsFormFieldProps>();

const fallbackId = useId();
const inputId = computed(() => props.id ?? fallbackId);
const labelId = computed(() => `${inputId.value}-label`);
const subTextId = computed(() => `${inputId.value}-subtext`);
</script>

<template>
  <div class="kds-form-field">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />
    <slot
      :id="inputId"
      :aria-labelledby="props.label ? labelId : undefined"
      :aria-describedby="props.subText ? subTextId : undefined"
      :aria-label="ariaLabel"
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
