import { ref, watch } from "vue";

const legacyMode = ref(false);

export const useKdsLegacyMode = (initialValue: boolean = false) => {
  if (legacyMode.value !== initialValue) {
    legacyMode.value = initialValue;
  }

  watch(
    () => legacyMode.value,
    (newValue) => {
      document.documentElement.classList.toggle("kds-legacy", newValue);
    },
    { immediate: true },
  );

  return {
    /** Writable ref to get and/or set the legacy mode; can also be used with v-model */
    legacyMode,
  };
};
