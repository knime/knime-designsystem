<script setup lang="ts">
import { computed, useId, useTemplateRef } from "vue";

import KdsSubText from "../../_helper/KdsSubText.vue";
import type { KdsFormFieldExpose } from "../../types";
import BaseInput from "../BaseInput.vue";

import PasswordInput from "./_helper/PasswordInput.vue";
import type {
  KdsCredentialsInputProps,
  KdsCredentialsInputValue,
} from "./types";

const props = defineProps<KdsCredentialsInputProps>();

const showUsername = computed(() => props.showUsername ?? true);
const showPassword = computed(() => props.showPassword ?? true);
const showKey = computed(() => props.showKey ?? false);

const disabled = computed(() => props.disabled ?? false);
const showVisibilityToggle = computed(() => props.showVisibilityToggle ?? true);
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

const passwordField = computed(() => ({
  placeholder: "Password",
  autocomplete: "current-password",
  subText: undefined,
  error: false,
  validating: false,
  ...props.passwordField,
}));

const keyField = computed(() => ({
  name: "Key",
  placeholder: undefined,
  autocomplete: "off",
  subText: undefined,
  error: false,
  validating: false,
  ...props.keyField,
}));

const modelValue = defineModel<KdsCredentialsInputValue>({
  default: {
    username: "",
    password: "",
    key: "",
  },
});

const usernameValue = computed({
  get: () => modelValue.value.username,
  set: (value: string) => {
    modelValue.value = { ...modelValue.value, username: value };
  },
});

const passwordValue = computed({
  get: () => modelValue.value.password,
  set: (value: string) => {
    modelValue.value = { ...modelValue.value, password: value };
  },
});

const keyValue = computed({
  get: () => modelValue.value.key,
  set: (value: string) => {
    modelValue.value = { ...modelValue.value, key: value };
  },
});

const keyName = computed(() => keyField.value.name || "Key");
const keyPlaceholder = computed(
  () => keyField.value.placeholder || keyName.value,
);

const usernameInput = useTemplateRef("usernameInput");
const passwordInput = useTemplateRef("passwordInput");
const keyInput = useTemplateRef("keyInput");
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

const buildAriaDescribedby = (externalId?: string, internalId?: string) =>
  [externalId, internalId].filter(Boolean).join(" ") || undefined;

const usernameAriaDescribedby = computed(() =>
  buildAriaDescribedby(
    usernameField.value.ariaDescribedby,
    usernameField.value.subText ? usernameSubTextId.value : undefined,
  ),
);

const passwordAriaDescribedby = computed(() =>
  buildAriaDescribedby(
    passwordField.value.ariaDescribedby,
    passwordField.value.subText ? passwordSubTextId.value : undefined,
  ),
);

const keyAriaDescribedby = computed(() =>
  buildAriaDescribedby(
    keyField.value.ariaDescribedby,
    keyField.value.subText ? keySubTextId.value : undefined,
  ),
);

defineExpose<KdsFormFieldExpose>({
  focus: () => {
    if (showUsername.value) {
      usernameInput.value?.focus();
      return;
    }

    if (showPassword.value) {
      passwordInput.value?.focus();
      return;
    }

    if (showKey.value) {
      keyInput.value?.focus();
    }
  },
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
      <div v-if="showUsername" class="kds-credentials-input-field">
        <BaseInput
          :id="usernameInputId"
          ref="usernameInput"
          v-model="usernameValue"
          type="text"
          leading-icon="user"
          :placeholder="usernameField.placeholder"
          :aria-label="usernameField.placeholder"
          :aria-describedby="usernameAriaDescribedby"
          :aria-invalid="usernameField.error || undefined"
          :disabled="disabled"
          :error="usernameField.error"
          :autocomplete="usernameField.autocomplete"
        />
        <KdsSubText
          :id="usernameSubTextId"
          :sub-text="usernameField.subText"
          :error="usernameField.error"
          :validating="usernameField.validating"
          :preserve-sub-text-space="preserveSubTextSpace"
        />
      </div>

      <div v-if="showPassword" class="kds-credentials-input-field">
        <PasswordInput
          :id="passwordInputId"
          ref="passwordInput"
          v-model="passwordValue"
          field-name="Password"
          :placeholder="passwordField.placeholder"
          :aria-label="passwordField.placeholder"
          :aria-describedby="passwordAriaDescribedby"
          :disabled="disabled"
          :error="passwordField.error"
          :autocomplete="passwordField.autocomplete"
          leading-icon="lock"
          :show-visibility-toggle="showVisibilityToggle"
        />
        <KdsSubText
          :id="passwordSubTextId"
          :sub-text="passwordField.subText"
          :error="passwordField.error"
          :validating="passwordField.validating"
          :preserve-sub-text-space="preserveSubTextSpace"
        />
      </div>

      <div v-if="showKey" class="kds-credentials-input-field">
        <PasswordInput
          :id="keyInputId"
          ref="keyInput"
          v-model="keyValue"
          :field-name="keyName"
          :placeholder="keyPlaceholder"
          :aria-label="keyName"
          :aria-describedby="keyAriaDescribedby"
          :disabled="disabled"
          :error="keyField.error"
          :autocomplete="keyField.autocomplete"
          leading-icon="key"
          :show-visibility-toggle="showVisibilityToggle"
        />
        <KdsSubText
          :id="keySubTextId"
          :sub-text="keyField.subText"
          :error="keyField.error"
          :validating="keyField.validating"
          :preserve-sub-text-space="preserveSubTextSpace"
        />
      </div>
    </div>
  </fieldset>

  <template v-else>
    <div v-if="showUsername" class="kds-credentials-input-field">
      <BaseInput
        :id="usernameInputId"
        ref="usernameInput"
        v-model="usernameValue"
        type="text"
        leading-icon="user"
        :placeholder="usernameField.placeholder"
        :aria-label="props.ariaLabel || usernameField.placeholder"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="
          buildAriaDescribedby(props.ariaDescribedby, usernameAriaDescribedby)
        "
        :aria-invalid="usernameField.error || undefined"
        :disabled="disabled"
        :error="usernameField.error"
        :autocomplete="usernameField.autocomplete"
      />
      <KdsSubText
        :id="usernameSubTextId"
        :sub-text="usernameField.subText"
        :error="usernameField.error"
        :validating="usernameField.validating"
        :preserve-sub-text-space="preserveSubTextSpace"
      />
    </div>

    <div v-if="showPassword" class="kds-credentials-input-field">
      <PasswordInput
        :id="passwordInputId"
        ref="passwordInput"
        v-model="passwordValue"
        field-name="Password"
        :placeholder="passwordField.placeholder"
        :aria-label="props.ariaLabel || passwordField.placeholder"
        :aria-describedby="
          buildAriaDescribedby(props.ariaDescribedby, passwordAriaDescribedby)
        "
        :disabled="disabled"
        :error="passwordField.error"
        :autocomplete="passwordField.autocomplete"
        leading-icon="lock"
        :show-visibility-toggle="showVisibilityToggle"
      />
      <KdsSubText
        :id="passwordSubTextId"
        :sub-text="passwordField.subText"
        :error="passwordField.error"
        :validating="passwordField.validating"
        :preserve-sub-text-space="preserveSubTextSpace"
      />
    </div>

    <div v-if="showKey" class="kds-credentials-input-field">
      <PasswordInput
        :id="keyInputId"
        ref="keyInput"
        v-model="keyValue"
        :field-name="keyName"
        :placeholder="keyPlaceholder"
        :aria-label="props.ariaLabel || keyName"
        :aria-describedby="
          buildAriaDescribedby(props.ariaDescribedby, keyAriaDescribedby)
        "
        :disabled="disabled"
        :error="keyField.error"
        :autocomplete="keyField.autocomplete"
        leading-icon="key"
        :show-visibility-toggle="showVisibilityToggle"
      />
      <KdsSubText
        :id="keySubTextId"
        :sub-text="keyField.subText"
        :error="keyField.error"
        :validating="keyField.validating"
        :preserve-sub-text-space="preserveSubTextSpace"
      />
    </div>
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
