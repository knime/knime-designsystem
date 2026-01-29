<!-- Sample component -->
<script setup lang="ts">
import MyButton from "../../packages/components/src/buttons/KdsButton.vue";

interface User {
  name: string;
}

defineProps<{ user: User | null }>();
defineEmits<{
  (e: "login"): void;
  (e: "logout"): void;
  (e: "createAccount"): void;
}>();
</script>

<template>
  <header>
    <div class="storybook-header">
      <div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
              fill="#FFF"
            />
            <path
              d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
              fill="#555AB9"
            />
            <path
              d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
              fill="#91BAF8"
            />
          </g>
        </svg>
        <h1>Acme</h1>
      </div>
      <div>
        <span v-if="user" class="welcome"
          >Welcome, <b>{{ user.name }}</b
          >!</span
        >
        <my-button
          v-if="user"
          size="small"
          label="Log out"
          @click="$emit('logout')"
        />
        <my-button
          v-if="!user"
          size="small"
          label="Log in"
          @click="$emit('login')"
        />
        <my-button
          v-if="!user"
          primary
          size="small"
          label="Sign up"
          @click="$emit('createAccount')"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.storybook-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--kds-spacing-container-1-25x) var(--kds-spacing-container-1-5x);
  font-family: var(--kds-core-font-family-roboto);
  border-bottom: var(--kds-border-base-subtle);
}

.storybook-header svg {
  display: inline-block;
  vertical-align: top;
}

.storybook-header h1 {
  display: inline-block;
  margin: var(--kds-spacing-container-0-37x) 0
    var(--kds-spacing-container-0-37x) var(--kds-spacing-container-0-5x);
  font-size: var(--kds-core-font-size-1-25x);
  font-weight: var(--kds-core-font-weight-strong);
  line-height: var(--kds-core-line-height-singleline);
  vertical-align: top;
}

.storybook-header button + button {
  margin-left: var(--kds-spacing-container-0-5x);
}

.storybook-header .welcome {
  margin-right: var(--kds-spacing-container-0-5x);
  font-size: var(--kds-core-font-size-0-87x);
  color: var(--kds-color-text-and-icon-neutral);
}
</style>
