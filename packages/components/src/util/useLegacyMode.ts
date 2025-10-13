import { ref, watch } from "vue";

export const useLegacyMode = (initialValue: boolean = false) => {
  const legacyMode = ref(initialValue);

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
