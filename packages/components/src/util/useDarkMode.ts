import { computed, watch } from "vue";
import { useDark, useLocalStorage, usePreferredDark } from "@vueuse/core";

export const DARK_MODE_STORAGE_KEY = "KNIME_DARK_MODE";

export type DarkModeType = "light" | "dark" | "system";

// could also be system, but the previous behaviour forced it to light, so we use that
const defaultMode: DarkModeType = "light";

export const useDarkMode = () => {
  // to also save a 'system' option we need to store the preference separately from the effective dark mode
  const userPreference = useLocalStorage<DarkModeType>(
    DARK_MODE_STORAGE_KEY,
    defaultMode,
  );

  const isDark = useDark({
    storageKey: `${DARK_MODE_STORAGE_KEY}_EFFECTIVE`,
    initialValue: defaultMode,
    onChanged: (isDarkValue) => {
      let cssMode: string, themeValue: string;

      if (userPreference.value === "system") {
        cssMode = "light dark";
        themeValue = "system";
      } else {
        cssMode = themeValue = isDarkValue ? "dark" : "light";
      }

      document.documentElement.style.setProperty("color-scheme", cssMode);
      document.documentElement.dataset.theme = themeValue;
    },
  });

  // react on both system and user preference changes, invokes onChanged function in the custom useDark implementation above
  const systemPrefersDark = usePreferredDark();
  watch(
    [userPreference, systemPrefersDark],
    ([preference, systemDark]) => {
      if (preference === "system") {
        isDark.value = systemDark;
      } else {
        isDark.value = preference === "dark";
      }
    },
    { immediate: true },
  );

  const currentMode = computed<DarkModeType>({
    get() {
      return userPreference.value;
    },
    set(value: DarkModeType) {
      userPreference.value = value;
    },
  });

  const isDarkMode = computed(() => {
    return userPreference.value === "dark";
  });

  const isLightMode = computed(() => {
    return userPreference.value === "light";
  });

  const isSystemMode = computed(() => userPreference.value === "system");

  return {
    /** Exposes a writable computed ref to get the current dark mode but also use it in e.g. a v-model to set it */
    currentMode,
    /** Whether or not the current user preference is dark. Note, if the preference is set to 'system' it will return false. */
    isDarkMode,
    /** Whether or not the current user preference is light. Note, if the preference is set to 'system' it will return false. */
    isLightMode,
    /** Whether or not the current user preference is set to 'system'. */
    isSystemMode,
  };
};
