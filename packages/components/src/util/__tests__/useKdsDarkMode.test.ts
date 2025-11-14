import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useDark, useLocalStorage, usePreferredDark } from "@vueuse/core";

import { KDS_DARK_MODE_STORAGE_KEY, useKdsDarkMode } from "../useKdsDarkMode";

// Mock @vueuse/core
vi.mock("@vueuse/core", () => ({
  useLocalStorage: vi.fn(),
  useDark: vi.fn(),
  usePreferredDark: vi.fn(),
}));

describe("useDarkMode", () => {
  let mockUserPreferenceRef: any,
    mockIsDarkRef: any,
    mockSystemPrefersDarkRef: any,
    mockOnChanged: any;

  beforeEach(() => {
    document.documentElement.style.removeProperty("color-scheme");
    delete document.documentElement.dataset.theme;

    mockUserPreferenceRef = ref("light");
    mockIsDarkRef = ref(false);
    mockSystemPrefersDarkRef = ref(false);
    mockOnChanged = vi.fn();

    vi.mocked(useLocalStorage).mockReturnValue(mockUserPreferenceRef);

    vi.mocked(useDark).mockImplementation((options: any) => {
      mockOnChanged = options.onChanged;
      return mockIsDarkRef;
    });

    vi.mocked(usePreferredDark).mockReturnValue(mockSystemPrefersDarkRef);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default value", () => {
    const { currentMode, isDarkMode, isLightMode, isSystemMode } =
      useKdsDarkMode();

    expect(currentMode.value).toBe("light");
    expect(isDarkMode.value).toBe(false);
    expect(isLightMode.value).toBe(true);
    expect(isSystemMode.value).toBe(false);
  });

  it("uses useLocalStorage and useDark with correct parameters", () => {
    useKdsDarkMode();

    expect(useLocalStorage).toHaveBeenCalledWith(
      KDS_DARK_MODE_STORAGE_KEY,
      "light",
    );
    expect(useDark).toHaveBeenCalledWith({
      storageKey: `${KDS_DARK_MODE_STORAGE_KEY}_EFFECTIVE`,
      initialValue: "light",
      onChanged: expect.any(Function),
    });
    expect(usePreferredDark).toHaveBeenCalled();
  });

  it("updates computed values when mode changes to dark", async () => {
    const { isDarkMode, isLightMode, isSystemMode } = useKdsDarkMode();

    mockUserPreferenceRef.value = "dark";
    await nextTick();

    expect(isDarkMode.value).toBe(true);
    expect(isLightMode.value).toBe(false);
    expect(isSystemMode.value).toBe(false);
  });

  it("updates computed values when mode changes to system", async () => {
    const { isDarkMode, isLightMode, isSystemMode } = useKdsDarkMode();

    mockUserPreferenceRef.value = "system";
    await nextTick();

    expect(isDarkMode.value).toBe(false);
    expect(isLightMode.value).toBe(false);
    expect(isSystemMode.value).toBe(true);
  });

  it("sets color-scheme properties for light mode", () => {
    mockUserPreferenceRef.value = "light";
    useKdsDarkMode();
    mockOnChanged(false); // false = light

    expect(
      document.documentElement.style.getPropertyValue("color-scheme"),
    ).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("sets color-scheme properties for dark mode", () => {
    mockUserPreferenceRef.value = "dark";
    useKdsDarkMode();
    mockOnChanged(true); // true = dark

    expect(
      document.documentElement.style.getPropertyValue("color-scheme"),
    ).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("sets color-scheme properties for system mode", () => {
    mockUserPreferenceRef.value = "system";
    useKdsDarkMode();
    mockOnChanged(false); // should be ignored

    expect(
      document.documentElement.style.getPropertyValue("color-scheme"),
    ).toBe("light dark");
    expect(document.documentElement.dataset.theme).toBe("system");
  });

  it("watches for mode changes and updates color-scheme accordingly", async () => {
    useKdsDarkMode();
    // initial light mode
    mockOnChanged(false);

    expect(
      document.documentElement.style.getPropertyValue("color-scheme"),
    ).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");

    // dark mode
    mockUserPreferenceRef.value = "dark";
    mockIsDarkRef.value = true;
    mockOnChanged(true);
    await nextTick();

    expect(
      document.documentElement.style.getPropertyValue("color-scheme"),
    ).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");

    // system mode
    mockUserPreferenceRef.value = "system";
    mockOnChanged(false);
    await nextTick();

    expect(
      document.documentElement.style.getPropertyValue("color-scheme"),
    ).toBe("light dark");
    expect(document.documentElement.dataset.theme).toBe("system");
  });

  it("returns reactive refs for all exposed properties", () => {
    const { currentMode, isDarkMode, isLightMode, isSystemMode } =
      useKdsDarkMode();

    expect(currentMode).toHaveProperty("value");
    expect(isDarkMode).toHaveProperty("value");
    expect(isLightMode).toHaveProperty("value");
    expect(isSystemMode).toHaveProperty("value");
  });
});
