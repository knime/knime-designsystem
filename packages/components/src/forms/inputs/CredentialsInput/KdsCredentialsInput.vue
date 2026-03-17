<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";

import KdsToggleButton from "../../../buttons/KdsToggleButton/KdsToggleButton.vue";
import KdsSubText from "../../_helper/KdsSubText.vue";
import type { KdsFormFieldExpose } from "../../types";
import BaseInput from "../BaseInput.vue";

import type {
  KdsCredentialsInputProps,
  KdsCredentialsInputValue,
} from "./types";

const props = withDefaults(defineProps<KdsCredentialsInputProps>(), {
  label: undefined,
  ariaLabel: "Credentials",
  showUsername: true,
  showPassword: true,
  showKey: true,
  usernamePlaceholder: "Username",
  passwordPlaceholder: "Password",
  keyPlaceholder: "Key",
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

const isPasswordFocused = ref(false);
const isKeyFocused = ref(false);

const showPassword = ref(false);
const showKey = ref(false);

const passwordInputType = computed(() =>
  showPassword.value ? "text" : "password",
);
const keyInputType = computed(() => (showKey.value ? "text" : "password"));

const showPasswordToggle = computed(
  () =>
    props.showVisibilityToggle &&
    props.showPassword &&
    (isPasswordFocused.value || passwordValue.value.length > 0),
);
const showKeyToggle = computed(
  () =>
    props.showVisibilityToggle &&
    props.showKey &&
    (isKeyFocused.value || keyValue.value.length > 0),
);

const usernameInput = useTemplateRef("usernameInput");
const passwordInput = useTemplateRef("passwordInput");
const keyInput = useTemplateRef("keyInput");
const idPrefix = useId();

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
    class="kds-credentials-input"
    :aria-label="props.label ? undefined : props.ariaLabel"
  >
    <legend v-if="props.label" class="kds-credentials-input-legend">
      {{ props.label }}
    </legend>

    <div class="kds-credentials-input-fields">
      <div v-if="props.showUsername" class="kds-credentials-input-field">
        <BaseInput
          ref="usernameInput"
          v-model="usernameValue"
          type="text"
          leading-icon="user"
          :placeholder="props.usernamePlaceholder"
          :aria-label="props.usernamePlaceholder"
          :disabled="props.disabled"
          :error="props.usernameError"
          :autocomplete="props.usernameAutocomplete"
        />
        <KdsSubText
          :id="`${idPrefix}-username-subtext`"
          :sub-text="props.usernameSubText"
          :error="props.usernameError"
          :validating="props.usernameValidating"
          :preserve-sub-text-space="props.preserveSubTextSpace"
        />
      </div>

      <div v-if="props.showPassword" class="kds-credentials-input-field">
        <BaseInput
          ref="passwordInput"
          v-model="passwordValue"
          :type="passwordInputType"
          leading-icon="lock"
          :placeholder="props.passwordPlaceholder"
          :aria-label="props.passwordPlaceholder"
          :disabled="props.disabled"
          :error="props.passwordError"
          :autocomplete="props.passwordAutocomplete"
          @focus="isPasswordFocused = true"
          @blur="isPasswordFocused = false"
        >
          <template #trailing>
            <KdsToggleButton
              v-if="showPasswordToggle"
              v-model="showPassword"
              variant="outlined"
              size="xsmall"
              leading-icon="eye"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :title="showPassword ? 'Hide password' : 'Show password'"
              :disabled="props.disabled"
            />
          </template>
        </BaseInput>
        <KdsSubText
          :id="`${idPrefix}-password-subtext`"
          :sub-text="props.passwordSubText"
          :error="props.passwordError"
          :validating="props.passwordValidating"
          :preserve-sub-text-space="props.preserveSubTextSpace"
        />
      </div>

      <div v-if="props.showKey" class="kds-credentials-input-field">
        <BaseInput
          ref="keyInput"
          v-model="keyValue"
          :type="keyInputType"
          leading-icon="key"
          :placeholder="props.keyPlaceholder"
          :aria-label="props.keyPlaceholder"
          :disabled="props.disabled"
          :error="props.keyError"
          :autocomplete="props.keyAutocomplete"
          @focus="isKeyFocused = true"
          @blur="isKeyFocused = false"
        >
          <template #trailing>
            <KdsToggleButton
              v-if="showKeyToggle"
              v-model="showKey"
              variant="outlined"
              size="xsmall"
              leading-icon="eye"
              :aria-label="showKey ? 'Hide key' : 'Show key'"
              :title="showKey ? 'Hide key' : 'Show key'"
              :disabled="props.disabled"
            />
          </template>
        </BaseInput>
        <KdsSubText
          :id="`${idPrefix}-key-subtext`"
          :sub-text="props.keySubText"
          :error="props.keyError"
          :validating="props.keyValidating"
          :preserve-sub-text-space="props.preserveSubTextSpace"
        />
      </div>
    </div>
  </fieldset>
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
