import { computed, watch } from "vue";
import { useDark, useLocalStorage, usePreferredDark } from "@vueuse/core";

import { kdsDarkModeType } from "./enums";

export const KDS_DARK_MODE_STORAGE_KEY = "KNIME_DARK_MODE";

export type KdsDarkModeType =
  (typeof kdsDarkModeType)[keyof typeof kdsDarkModeType];

// could also be system, but the previous behaviour forced it to light, so we use that
const defaultMode: KdsDarkModeType = kdsDarkModeType.LIGHT;

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

      if (userPreference.value === kdsDarkModeType.SYSTEM) {
        cssMode = "light dark";
        themeValue = kdsDarkModeType.SYSTEM;
      } else {
        cssMode = themeValue = isDarkValue
          ? kdsDarkModeType.DARK
          : kdsDarkModeType.LIGHT;
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
      if (preference === kdsDarkModeType.SYSTEM) {
        isDark.value = systemDark;
      } else {
        isDark.value = preference === kdsDarkModeType.DARK;
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
    return userPreference.value === kdsDarkModeType.DARK;
  });

  const isLightMode = computed(() => {
    return userPreference.value === kdsDarkModeType.LIGHT;
  });

  const isSystemMode = computed(
    () => userPreference.value === kdsDarkModeType.SYSTEM,
  );

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
