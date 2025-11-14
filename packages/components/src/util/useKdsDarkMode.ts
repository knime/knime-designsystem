import { computed, watch } from "vue";
import { useDark, useLocalStorage, usePreferredDark } from "@vueuse/core";

export const KDS_DARK_MODE_STORAGE_KEY = "KNIME_DARK_MODE";

export type KdsDarkModeType = "light" | "dark" | "system";

// could also be system, but the previous behaviour forced it to light, so we use that
const defaultMode: KdsDarkModeType = "light";

export const useKdsDarkMode = () => {
  // to also save a 'system' option we need to store the preference separately from the effective dark mode
  const userPreference = useLocalStorage<KdsDarkModeType>(
    KDS_DARK_MODE_STORAGE_KEY,
    defaultMode,
  );

  const isDark = useDark({
    storageKey: `${KDS_DARK_MODE_STORAGE_KEY}_EFFECTIVE`,
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

  const currentMode = computed<KdsDarkModeType>({
    get() {
      return userPreference.value;
    },
    set(value: KdsDarkModeType) {
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
