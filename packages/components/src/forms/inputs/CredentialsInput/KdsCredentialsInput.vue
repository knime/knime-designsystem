<script setup lang="ts">
import { computed, useId, useTemplateRef } from "vue";

import type { KdsFormFieldExpose } from "../../types";

import CredentialsFields from "./_helper/CredentialsFields.vue";
import type {
  KdsCredentialsInputProps,
  KdsCredentialsInputValue,
  KdsCredentialsKeyProps,
  KdsCredentialsPasswordProps,
} from "./types";

const props = defineProps<KdsCredentialsInputProps>();

const showUsername = computed(() => props.showUsername ?? true);
const showPassword = computed(() => props.showPassword ?? true);
const showKey = computed(() => props.showKey ?? false);

const disabled = computed(() => props.disabled ?? false);
const preserveSubTextSpace = computed(
  () => props.preserveSubTextSpace ?? false,
);

const usernameField = computed(() => ({
  placeholder: "Username",
  autocomplete: "username",
  subText: undefined,
  error: false,
  validating: false,
  ...props.usernameField,
}));

const passwordField = computed<KdsCredentialsPasswordProps>(() => ({
  placeholder: "Password",
  autocomplete: "current-password",
  subText: undefined,
  error: false,
  validating: false,
  showVisibilityToggle: false,
  ...props.passwordField,
}));

const keyField = computed<KdsCredentialsKeyProps>(() => ({
  name: "Key",
  placeholder: undefined,
  autocomplete: "off",
  subText: undefined,
  error: false,
  validating: false,
  showVisibilityToggle: false,
  ...props.keyField,
}));

const modelValue = defineModel<KdsCredentialsInputValue>({
  default: () => ({
    username: "",
    password: "",
    key: "",
  }),
});
const credentialsFields =
  useTemplateRef<KdsFormFieldExpose>("credentialsFields");
const idPrefix = useId();

const visibleFieldCount = computed(
  () =>
    Number(showUsername.value) +
    Number(showPassword.value) +
    Number(showKey.value),
);

const usesFieldset = computed(() => visibleFieldCount.value > 1);

const groupId = computed(() => props.id?.trim() || `${idPrefix}-group`);
const legendId = computed(() => `${groupId.value}-legend`);

const usernameInputId = computed(() => `${groupId.value}-username`);
const passwordInputId = computed(() => `${groupId.value}-password`);
const keyInputId = computed(() => `${groupId.value}-key`);

const usernameSubTextId = computed(() => `${usernameInputId.value}-subtext`);
const passwordSubTextId = computed(() => `${passwordInputId.value}-subtext`);
const keySubTextId = computed(() => `${keyInputId.value}-subtext`);

defineExpose<KdsFormFieldExpose>({
  focus: () => credentialsFields.value?.focus(),
});
</script>

<template>
  <fieldset
    v-if="usesFieldset"
    :id="groupId"
    class="kds-credentials-input"
    :aria-label="
      props.label || props.ariaLabelledby ? undefined : props.ariaLabel
    "
    :aria-labelledby="props.label ? legendId : props.ariaLabelledby"
    :aria-describedby="props.ariaDescribedby"
  >
    <legend
      v-if="props.label"
      :id="legendId"
      class="kds-credentials-input-legend"
    >
      {{ props.label }}
    </legend>

    <div class="kds-credentials-input-fields">
      <CredentialsFields
        ref="credentialsFields"
        v-model="modelValue"
        inside-fieldset
        :show-username="showUsername"
        :show-password="showPassword"
        :show-key="showKey"
        :disabled="disabled"
        :preserve-sub-text-space="preserveSubTextSpace"
        :username-field="usernameField"
        :password-field="passwordField"
        :key-field="keyField"
        :username-input-id="usernameInputId"
        :password-input-id="passwordInputId"
        :key-input-id="keyInputId"
        :username-sub-text-id="usernameSubTextId"
        :password-sub-text-id="passwordSubTextId"
        :key-sub-text-id="keySubTextId"
      />
    </div>
  </fieldset>

  <template v-else>
    <CredentialsFields
      ref="credentialsFields"
      v-model="modelValue"
      :inside-fieldset="false"
      :group-aria-label="props.ariaLabel"
      :group-aria-labelledby="props.ariaLabelledby"
      :group-aria-describedby="props.ariaDescribedby"
      :show-username="showUsername"
      :show-password="showPassword"
      :show-key="showKey"
      :disabled="disabled"
      :preserve-sub-text-space="preserveSubTextSpace"
      :username-field="usernameField"
      :password-field="passwordField"
      :key-field="keyField"
      :username-input-id="usernameInputId"
      :password-input-id="passwordInputId"
      :key-input-id="keyInputId"
      :username-sub-text-id="usernameSubTextId"
      :password-sub-text-id="passwordSubTextId"
      :key-sub-text-id="keySubTextId"
    />
  </template>
</template>

<style scoped>
.kds-credentials-input {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-25x);
  min-inline-size: 0;
  padding: 0;
  margin: 0;
  border: none;
}

.kds-credentials-input-legend {
  padding: 0;
  margin-bottom: 0;
  font: var(--kds-font-base-body-medium);
  color: var(--kds-color-text-and-icon-neutral);
}

.kds-credentials-input-fields {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-25x);
}

.kds-credentials-input-field {
  display: flex;
  flex-direction: column;
}
</style>
