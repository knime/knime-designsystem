<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "./KdsLabel.vue";
import KdsSubText from "./KdsSubText.vue";
import type { KdsLabelProps, KdsSubTextProps } from "./types";

type InputWrapperProps = KdsLabelProps & KdsSubTextProps;

const props = defineProps<InputWrapperProps>();

const fallbackId = useId();
const inputId = computed(() => props.id ?? fallbackId);
const labelId = computed(() => `${inputId.value}-label`);
const subTextId = computed(() => `${inputId.value}-subtext`);

const ariaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);
const ariaDescribedby = computed(() =>
  props.subText || props.validating || props.error
    ? subTextId.value
    : undefined,
);
</script>

<template>
  <div class="input-wrapper">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />
    <slot
      :id="inputId"
      :aria-invalid="props.error"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="ariaDescribedby"
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
