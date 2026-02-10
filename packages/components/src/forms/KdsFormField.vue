<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "./KdsLabel.vue";
import KdsSubText from "./KdsSubText.vue";
import type { KdsFormFieldProps } from "./types";

const props = defineProps<KdsFormFieldProps>();

const fallbackId = useId();
const inputId = computed(() => props.id ?? fallbackId);
const labelId = computed(() => `${inputId.value}-label`);
const subTextId = computed(() => `${inputId.value}-subtext`);

const label = computed(() =>
  typeof props.label === "string" ? props.label : undefined,
);
const ariaLabel = computed(() =>
  typeof props.label === "object" ? props.label.ariaLabel : undefined,
);
const ariaLabelledby = computed(() =>
  typeof props.label === "string" ? labelId.value : undefined,
);
const ariaDescribedby = computed(() =>
  props.subText || props.validating || props.error
    ? subTextId.value
    : undefined,
);
</script>

<template>
  <div class="input-wrapper">
    <KdsLabel v-if="label" :id="labelId" :for="inputId" :label="label" />
    <slot
      :id="inputId"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
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
.input-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
