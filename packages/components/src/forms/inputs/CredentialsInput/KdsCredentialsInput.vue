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

const props = withDefaults(defineProps<KdsCredentialsInputProps>(), {
  label: undefined,
  ariaLabel: "Credentials",
  showUsername: true,
  showPassword: true,
  showKey: false,
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  keyPlaceholder: undefined,
  keyName: "Key",
  usernameAutocomplete: "username",
  passwordAutocomplete: "current-password",
  keyAutocomplete: "off",
  usernameSubText: undefined,
  passwordSubText: undefined,
  keySubText: undefined,
  usernameError: false,
  passwordError: false,
  keyError: false,
  usernameValidating: false,
  passwordValidating: false,
  keyValidating: false,
  preserveSubTextSpace: false,
  disabled: false,
  showVisibilityToggle: true,
});

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

const keyPlaceholder = computed(() => props.keyPlaceholder || props.keyName);

const usernameInput = useTemplateRef("usernameInput");
const passwordInput = useTemplateRef("passwordInput");
const keyInput = useTemplateRef("keyInput");
const idPrefix = useId();

const visibleFieldCount = computed(
  () =>
    Number(props.showUsername) +
    Number(props.showPassword) +
    Number(props.showKey),
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
    props.usernameAriaDescribedby,
    props.usernameSubText ? usernameSubTextId.value : undefined,
  ),
);

const passwordAriaDescribedby = computed(() =>
  buildAriaDescribedby(
    props.passwordAriaDescribedby,
    props.passwordSubText ? passwordSubTextId.value : undefined,
  ),
);

const keyAriaDescribedby = computed(() =>
  buildAriaDescribedby(
    props.keyAriaDescribedby,
    props.keySubText ? keySubTextId.value : undefined,
  ),
);

defineExpose<KdsFormFieldExpose>({
  focus: () => {
    if (props.showUsername) {
      usernameInput.value?.focus();
      return;
    }

    if (props.showPassword) {
      passwordInput.value?.focus();
      return;
    }

    if (props.showKey) {
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
      <div v-if="props.showUsername" class="kds-credentials-input-field">
        <BaseInput
          :id="usernameInputId"
          ref="usernameInput"
          v-model="usernameValue"
          type="text"
          leading-icon="user"
          :placeholder="props.usernamePlaceholder"
          :aria-label="props.usernamePlaceholder"
          :aria-describedby="usernameAriaDescribedby"
          :aria-invalid="props.usernameError || undefined"
          :disabled="props.disabled"
          :error="props.usernameError"
          :autocomplete="props.usernameAutocomplete"
        />
        <KdsSubText
          :id="usernameSubTextId"
          :sub-text="props.usernameSubText"
          :error="props.usernameError"
          :validating="props.usernameValidating"
          :preserve-sub-text-space="props.preserveSubTextSpace"
        />
      </div>

      <div v-if="props.showPassword" class="kds-credentials-input-field">
        <PasswordInput
          :id="passwordInputId"
          ref="passwordInput"
          v-model="passwordValue"
          field-name="Password"
          :placeholder="props.passwordPlaceholder"
          :aria-label="props.passwordPlaceholder"
          :aria-describedby="passwordAriaDescribedby"
          :disabled="props.disabled"
          :error="props.passwordError"
          :autocomplete="props.passwordAutocomplete"
          leading-icon="lock"
          :show-visibility-toggle="props.showVisibilityToggle"
        />
        <KdsSubText
          :id="passwordSubTextId"
          :sub-text="props.passwordSubText"
          :error="props.passwordError"
          :validating="props.passwordValidating"
          :preserve-sub-text-space="props.preserveSubTextSpace"
        />
      </div>

      <div v-if="props.showKey" class="kds-credentials-input-field">
        <PasswordInput
          :id="keyInputId"
          ref="keyInput"
          v-model="keyValue"
          :field-name="props.keyName"
          :placeholder="keyPlaceholder"
          :aria-label="props.keyName"
          :aria-describedby="keyAriaDescribedby"
          :disabled="props.disabled"
          :error="props.keyError"
          :autocomplete="props.keyAutocomplete"
          leading-icon="key"
          :show-visibility-toggle="props.showVisibilityToggle"
        />
        <KdsSubText
          :id="keySubTextId"
          :sub-text="props.keySubText"
          :error="props.keyError"
          :validating="props.keyValidating"
          :preserve-sub-text-space="props.preserveSubTextSpace"
        />
      </div>
    </div>
  </fieldset>

  <template v-else>
    <div v-if="props.showUsername" class="kds-credentials-input-field">
      <BaseInput
        :id="usernameInputId"
        ref="usernameInput"
        v-model="usernameValue"
        type="text"
        leading-icon="user"
        :placeholder="props.usernamePlaceholder"
        :aria-label="props.ariaLabel || props.usernamePlaceholder"
        :aria-labelledby="props.ariaLabelledby"
        :aria-describedby="
          buildAriaDescribedby(props.ariaDescribedby, usernameAriaDescribedby)
        "
        :aria-invalid="props.usernameError || undefined"
        :disabled="props.disabled"
        :error="props.usernameError"
        :autocomplete="props.usernameAutocomplete"
      />
      <KdsSubText
        :id="usernameSubTextId"
        :sub-text="props.usernameSubText"
        :error="props.usernameError"
        :validating="props.usernameValidating"
        :preserve-sub-text-space="props.preserveSubTextSpace"
      />
    </div>

    <div v-if="props.showPassword" class="kds-credentials-input-field">
      <PasswordInput
        :id="passwordInputId"
        ref="passwordInput"
        v-model="passwordValue"
        field-name="Password"
        :placeholder="props.passwordPlaceholder"
        :aria-label="props.ariaLabel || props.passwordPlaceholder"
        :aria-describedby="
          buildAriaDescribedby(props.ariaDescribedby, passwordAriaDescribedby)
        "
        :disabled="props.disabled"
        :error="props.passwordError"
        :autocomplete="props.passwordAutocomplete"
        leading-icon="lock"
        :show-visibility-toggle="props.showVisibilityToggle"
      />
      <KdsSubText
        :id="passwordSubTextId"
        :sub-text="props.passwordSubText"
        :error="props.passwordError"
        :validating="props.passwordValidating"
        :preserve-sub-text-space="props.preserveSubTextSpace"
      />
    </div>

    <div v-if="props.showKey" class="kds-credentials-input-field">
      <PasswordInput
        :id="keyInputId"
        ref="keyInput"
        v-model="keyValue"
        :field-name="props.keyName"
        :placeholder="keyPlaceholder"
        :aria-label="props.ariaLabel || props.keyName"
        :aria-describedby="
          buildAriaDescribedby(props.ariaDescribedby, keyAriaDescribedby)
        "
        :disabled="props.disabled"
        :error="props.keyError"
        :autocomplete="props.keyAutocomplete"
        leading-icon="key"
        :show-visibility-toggle="props.showVisibilityToggle"
      />
      <KdsSubText
        :id="keySubTextId"
        :sub-text="props.keySubText"
        :error="props.keyError"
        :validating="props.keyValidating"
        :preserve-sub-text-space="props.preserveSubTextSpace"
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
