<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  pattern: string;
}>();

type DemoRow = {
  value: string;
  matches: boolean;
};

const testValues = computed(() => [
  "a",
  "A",
  "abc",
  "column1",
  "column10",
  "Column1",
  "col",
  "",
  "123",
]);

const compiled = computed(() => {
  if (props.pattern === "") {
    return { regexp: null as RegExp | null, error: null as string | null };
  }

  try {
    return { regexp: new RegExp(props.pattern), error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { regexp: null, error: message };
  }
});

const rows = computed<DemoRow[]>(() =>
  testValues.value.map((value) => ({
    value,
    matches: compiled.value.regexp ? compiled.value.regexp.test(value) : false,
  })),
);

const customText = ref("");

const customMatch = computed(() => {
  if (!compiled.value.regexp) {
    return null;
  }

  return compiled.value.regexp.test(customText.value);
});
</script>

<template>
  <div class="pattern-demo">
    <div class="meta">
      <div class="pattern">
        <span class="label">Compiled RegExp:</span>
        <code class="value">{{ props.pattern || "(empty)" }}</code>
      </div>

      <div v-if="compiled.error" class="error">
        <span class="label">Error:</span>
        <span class="value">{{ compiled.error }}</span>
      </div>
    </div>

    <table class="table" aria-label="Pattern demo table">
      <thead>
        <tr>
          <th>Value</th>
          <th>Matches</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.value">
          <td>
            <code>{{ row.value === "" ? "(empty string)" : row.value }}</code>
          </td>
          <td>
            <span v-if="compiled.error">—</span>
            <span v-else>{{ row.matches ? "Yes" : "No" }}</span>
          </td>
        </tr>

        <tr>
          <td>
            <input
              v-model="customText"
              class="custom-input"
              type="text"
              placeholder="Enter custom value"
              aria-label="Custom test value"
            />
          </td>
          <td>
            <span v-if="compiled.error">—</span>
            <span v-else-if="customMatch === null">No</span>
            <span v-else>{{ customMatch ? "Yes" : "No" }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.pattern-demo {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-5x);
  width: fit-content;
  padding: var(--kds-spacing-container-0-75x);
  margin-top: var(--kds-spacing-container-1x);
  border: 1px solid var(--kds-color-border-subtle);
  border-radius: var(--kds-border-radius-container-0-25x);
}

.meta {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-12x);
}

.pattern,
.error {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
  align-items: baseline;
}

.label {
  font: var(--kds-font-base-subtext-medium);
  color: var(--kds-color-text-and-icon-neutral);
}

.value {
  font: var(--kds-font-base-subtext-medium);
  color: var(--kds-color-text-and-icon-muted);
}

.table th,
.table td {
  padding: var(--kds-spacing-container-0-12x);
  font: var(--kds-font-base-subtext-medium);
  color: var(--kds-color-text-and-icon-neutral);
  text-align: left;
  border-bottom: 1px solid var(--kds-color-border-subtle);
}

.table th {
  font: var(--kds-font-base-subtext-medium);
}

.custom-input {
  padding: var(--kds-spacing-container-0-12x) var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-subtext-medium);
  color: var(--kds-color-text-and-icon-neutral);
  background: var(--kds-color-background-input-initial);
  border: 1px solid var(--kds-color-border-subtle);
  border-radius: var(--kds-border-radius-container-0-25x);
}

.custom-input::placeholder {
  color: var(--kds-color-text-and-icon-muted);
}

.custom-input:focus-visible {
  outline: 2px solid var(--kds-color-border-primary);
  outline-offset: 2px;
}
</style>
