<script setup lang="ts">
import { computed } from "vue";

import KdsNumberInput from "../NumberInput/KdsNumberInput.vue";

import type { KdsTimeInputValue } from "./types";

const modelValue = defineModel<KdsTimeInputValue>({ required: true });

const updatePart = (key: keyof KdsTimeInputValue, value: number) => {
  modelValue.value = {
    ...modelValue.value,
    [key]: value,
  };
};

const hoursModel = computed({
  get: () => modelValue.value.hours,
  set: (value: number) => updatePart("hours", value),
});

const minutesModel = computed({
  get: () => modelValue.value.minutes,
  set: (value: number) => updatePart("minutes", value),
});

const secondsModel = computed({
  get: () => modelValue.value.seconds,
  set: (value: number) => updatePart("seconds", value),
});

const millisecondsModel = computed({
  get: () => modelValue.value.milliseconds,
  set: (value: number) => updatePart("milliseconds", value),
});
</script>

<template>
  <div class="kds-time-input-popover">
    <KdsNumberInput
      v-model="hoursModel"
      label="Hours"
      aria-label="Hours"
      :min="0"
      :max="23"
      :step="1"
    />
    <KdsNumberInput
      v-model="minutesModel"
      label="Minutes"
      aria-label="Minutes"
      :min="0"
      :max="59"
      :step="1"
    />
    <KdsNumberInput
      v-model="secondsModel"
      label="Seconds"
      aria-label="Seconds"
      :min="0"
      :max="59"
      :step="1"
    />
    <KdsNumberInput
      v-model="millisecondsModel"
      label="Milliseconds"
      aria-label="Milliseconds"
      :min="0"
      :max="999"
      :step="1"
    />
  </div>
</template>

<style scoped>
.kds-time-input-popover {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--kds-spacing-container-0-5x);
  width: var(--kds-dimension-component-width-16x);
  max-width: 100%;
  padding: var(--kds-spacing-container-0-75x);
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
