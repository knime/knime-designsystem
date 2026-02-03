<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type { KdsCredentialsApiKeyProps } from "./types";

const API_KEY_PLACEHOLDER = "Key";

const props = withDefaults(defineProps<KdsCredentialsApiKeyProps>(), {
  label: "",
  subText: "",
  preserveSubTextSpace: false,

  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
});

const apiKey = defineModel<string>("apiKey", { default: "" });

const baseId = useId();

const labelId = computed(() => `${baseId}-label`);

const apiKeyInputId = computed(() => `${baseId}-api-key-input`);
const apiKeySubTextId = computed(() => `${baseId}-api-key-subtext`);

const showSubText = computed(
  () =>
    Boolean(props.subText) || props.preserveSubTextSpace || props.validating,
);

const ariaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);

const ariaLabel = computed(() => (props.label ? undefined : "API key"));
</script>

<template>
  <div class="credentials-api-key">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="apiKeyInputId"
      :label="props.label"
    />

    <KdsBaseInput
      :id="apiKeyInputId"
      v-model="apiKey"
      type="password"
      :placeholder="API_KEY_PLACEHOLDER"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :error="props.error"
      :validating="props.validating"
      leading-icon="key"
      name="apiKey"
      autocomplete="off"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :aria-describedby="showSubText ? apiKeySubTextId : undefined"
    />

    <KdsSubText
      :id="apiKeySubTextId"
      :sub-text="props.subText"
      :error="props.error"
      :validating="props.validating"
      :preserve-sub-text-space="props.preserveSubTextSpace"
    />
  </div>
</template>

<style scoped>
.credentials-api-key {
  display: flex;
  flex-direction: column;
}
</style>
