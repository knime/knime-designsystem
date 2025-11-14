import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

import { useKdsLegacyMode } from "../useKdsLegacyMode";

describe("useLegacyMode", () => {
  beforeEach(() => {
    document.documentElement.classList.toggle("kds-legacy", false);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default value", () => {
    const { legacyMode } = useKdsLegacyMode();

    expect(legacyMode.value).toBe(false);
    expect(document.documentElement.classList.contains("kds-legacy")).toBe(
      false,
    );
  });

  it("uses initial value if set", () => {
    const { legacyMode } = useKdsLegacyMode(true);

    expect(legacyMode.value).toBe(true);
    expect(document.documentElement.classList.contains("kds-legacy")).toBe(
      true,
    );
  });

  it("updates class when value changes", async () => {
    const { legacyMode } = useKdsLegacyMode();
    expect(document.documentElement.classList.contains("kds-legacy")).toBe(
      false,
    );

    legacyMode.value = true;
    await nextTick();
    expect(document.documentElement.classList.contains("kds-legacy")).toBe(
      true,
    );

    legacyMode.value = false;
    await nextTick();
    expect(document.documentElement.classList.contains("kds-legacy")).toBe(
      false,
    );
  });
});
