<script setup lang="ts">
import { computed, useId } from "vue";

import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type { KdsCredentialsUserPasswordProps } from "./types";

const USERNAME_PLACEHOLDER = "Username";
const PASSWORD_PLACEHOLDER = "Password";

const props = withDefaults(defineProps<KdsCredentialsUserPasswordProps>(), {
  label: "",
  subText: "",
  preserveSubTextSpace: false,

  disabled: false,
  readonly: false,
  required: false,
  error: false,
  validating: false,
});

const emit = defineEmits<{
  focus: [payload: { field: "username" | "password"; event: FocusEvent }];
  blur: [payload: { field: "username" | "password"; event: FocusEvent }];
  input: [payload: { field: "username" | "password"; value: string }];
  keydown: [payload: { field: "username" | "password"; event: KeyboardEvent }];
}>();

const username = defineModel<string>("username", { default: "" });
const password = defineModel<string>("password", { default: "" });

const baseId = useId();
const labelId = computed(() => `${baseId}-label`);
const subTextId = computed(() => `${baseId}-subtext`);

const usernameInputId = computed(() => `${baseId}-username-input`);
const passwordInputId = computed(() => `${baseId}-password-input`);

const showSubText = computed(
  () =>
    Boolean(props.subText) || props.preserveSubTextSpace || props.validating,
);

const groupAriaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);

const groupAriaDescribedby = computed(() =>
  showSubText.value ? subTextId.value : undefined,
);

const onFocus = (field: "username" | "password", event: FocusEvent) => {
  emit("focus", { field, event });
};

const onBlur = (field: "username" | "password", event: FocusEvent) => {
  emit("blur", { field, event });
};

const onKeydown = (field: "username" | "password", event: KeyboardEvent) => {
  emit("keydown", { field, event });
};

const onInput = (field: "username" | "password", value: string) => {
  emit("input", { field, value });
};
</script>

<template>
  <div class="credentials-user-password">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="usernameInputId"
      :label="props.label"
    />

    <div
      class="fields"
      role="group"
      :aria-labelledby="groupAriaLabelledby"
      :aria-describedby="groupAriaDescribedby"
    >
      <KdsBaseInput
        :id="usernameInputId"
        v-model="username"
        type="text"
        :placeholder="USERNAME_PLACEHOLDER"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :error="props.error"
        :validating="props.validating"
        leading-icon="user"
        name="username"
        autocomplete="username"
        aria-label="Username"
        :aria-describedby="showSubText ? subTextId : undefined"
        @focus="onFocus('username', $event)"
        @blur="onBlur('username', $event)"
        @input="onInput('username', $event)"
        @keydown="onKeydown('username', $event)"
      />

      <KdsBaseInput
        :id="passwordInputId"
        v-model="password"
        type="password"
        :placeholder="PASSWORD_PLACEHOLDER"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :error="props.error"
        :validating="props.validating"
        leading-icon="lock"
        name="password"
        autocomplete="current-password"
        aria-label="Password"
        :aria-describedby="showSubText ? subTextId : undefined"
        @focus="onFocus('password', $event)"
        @blur="onBlur('password', $event)"
        @input="onInput('password', $event)"
        @keydown="onKeydown('password', $event)"
      />
    </div>

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
.credentials-user-password {
  display: flex;
  flex-direction: column;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-25x);
}
</style>
