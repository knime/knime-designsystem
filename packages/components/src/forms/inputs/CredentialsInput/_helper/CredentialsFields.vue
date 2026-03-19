<script setup lang="ts">
import { computed, useTemplateRef } from "vue";

import KdsSubText from "../../../_helper/KdsSubText.vue";
import type { KdsFormFieldExpose } from "../../../types";
import BaseInput from "../../BaseInput.vue";
import type { KdsCredentialsInputValue } from "../types";

import PasswordInput from "./PasswordInput.vue";
import type { CredentialsFieldsProps } from "./types";

const props = defineProps<CredentialsFieldsProps>();

const modelValue = defineModel<KdsCredentialsInputValue>({
  default: () => ({
    username: "",
    password: "",
    key: "",
  }),
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

const keyName = computed(() => props.keyField.name || "Key");
const keyPlaceholder = computed(
  () => props.keyField.placeholder || keyName.value,
);

const usernameInput = useTemplateRef("usernameInput");
const passwordInput = useTemplateRef("passwordInput");
const keyInput = useTemplateRef("keyInput");

const buildAriaDescribedby = (externalId?: string, internalId?: string) =>
  [externalId, internalId].filter(Boolean).join(" ") || undefined;

const usernameFieldAriaDescribedby = computed(() =>
  buildAriaDescribedby(
    props.usernameField.ariaDescribedby,
    props.usernameField.subText ? props.usernameSubTextId : undefined,
  ),
);

const passwordFieldAriaDescribedby = computed(() =>
  buildAriaDescribedby(
    props.passwordField.ariaDescribedby,
    props.passwordField.subText ? props.passwordSubTextId : undefined,
  ),
);

const keyFieldAriaDescribedby = computed(() =>
  buildAriaDescribedby(
    props.keyField.ariaDescribedby,
    props.keyField.subText ? props.keySubTextId : undefined,
  ),
);

const usernameAriaLabel = computed(() =>
  props.insideFieldset
    ? props.usernameField.placeholder
    : props.groupAriaLabel || props.usernameField.placeholder,
);

const passwordAriaLabel = computed(() =>
  props.insideFieldset
    ? props.passwordField.placeholder
    : props.groupAriaLabel || props.passwordField.placeholder,
);

const keyAriaLabel = computed(() =>
  props.insideFieldset ? keyName.value : props.groupAriaLabel || keyName.value,
);

const usernameAriaDescribedby = computed(() =>
  props.insideFieldset
    ? usernameFieldAriaDescribedby.value
    : buildAriaDescribedby(
        props.groupAriaDescribedby,
        usernameFieldAriaDescribedby.value,
      ),
);

const passwordAriaDescribedby = computed(() =>
  props.insideFieldset
    ? passwordFieldAriaDescribedby.value
    : buildAriaDescribedby(
        props.groupAriaDescribedby,
        passwordFieldAriaDescribedby.value,
      ),
);

const keyAriaDescribedby = computed(() =>
  props.insideFieldset
    ? keyFieldAriaDescribedby.value
    : buildAriaDescribedby(
        props.groupAriaDescribedby,
        keyFieldAriaDescribedby.value,
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
  <div v-if="showUsername" class="kds-credentials-input-field">
    <BaseInput
      :id="usernameInputId"
      ref="usernameInput"
      v-model="usernameValue"
      type="text"
      leading-icon="user"
      :placeholder="usernameField.placeholder"
      :aria-label="usernameAriaLabel"
      :aria-labelledby="insideFieldset ? undefined : groupAriaLabelledby"
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
      :aria-label="passwordAriaLabel"
      :aria-describedby="passwordAriaDescribedby"
      :disabled="disabled"
      :error="passwordField.error"
      :autocomplete="passwordField.autocomplete"
      leading-icon="lock"
      :show-visibility-toggle="passwordField.showVisibilityToggle"
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
      :aria-label="keyAriaLabel"
      :aria-describedby="keyAriaDescribedby"
      :disabled="disabled"
      :error="keyField.error"
      :autocomplete="keyField.autocomplete"
      leading-icon="key"
      :show-visibility-toggle="keyField.showVisibilityToggle"
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
