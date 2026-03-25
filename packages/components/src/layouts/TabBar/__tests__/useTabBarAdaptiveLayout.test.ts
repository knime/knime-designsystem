import { describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";

import type { KdsTabBarItem } from "../types";
import { useTabBarAdaptiveLayout } from "../useTabBarAdaptiveLayout";

vi.mock("../../../util/useKdsIsTruncated", () => ({
  elementOverflowsHorizontally: (el: HTMLElement | null) => {
    if (!el) {
      return false;
    }
    // Use a data attribute to simulate overflow
    return el.dataset.overflowing === "true";
  },
}));

const createTab = (
  value: string,
  extras: Partial<Pick<KdsTabBarItem, "accessory" | "disabled">> = {},
): KdsTabBarItem => ({
  id: `${value}-id`,
  value,
  label: value,
  panelId: `${value}-panel`,
  ...extras,
});

const createButtonWithLabel = (
  overflowing: boolean,
  {
    naturalWidth,
    hasAccessory,
  }: { naturalWidth?: number; hasAccessory?: boolean } = {},
) => {
  const btn = document.createElement("button");
  if (hasAccessory) {
    const accessory = document.createElement("span");
    accessory.className = "kds-tab-icon";
    btn.appendChild(accessory);
  }
  const label = document.createElement("span");
  label.className = "kds-tab-label";
  label.dataset.overflowing = overflowing ? "true" : "false";
  btn.appendChild(label);
  if (naturalWidth !== undefined) {
    vi.spyOn(btn, "getBoundingClientRect").mockReturnValue({
      width: naturalWidth,
      height: 0,
      x: 0,
      y: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON: () => "",
    });
  }
  return btn;
};

const createMockContainer = ({
  scrollWidth = 100,
  clientWidth = 100,
  tokenPx,
}: {
  scrollWidth?: number;
  clientWidth?: number;
  tokenPx?: number;
} = {}) => {
  const el = document.createElement("div");
  Object.defineProperty(el, "scrollWidth", { value: scrollWidth });
  Object.defineProperty(el, "clientWidth", { value: clientWidth });
  if (tokenPx !== undefined) {
    el.style.setProperty("--kds-test-min-width", `${tokenPx}px`);
  }
  return el;
};

describe("useTabBarAdaptiveLayout", () => {
  it("returns shouldHideIcons as false when no items overflow", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
      createTab("b", { accessory: { type: "icon", name: "folder" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(createMockContainer()),
    });

    for (const tab of tabs.value) {
      setItemEl(tab.value, createButtonWithLabel(false));
    }

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(false);
  });

  it("returns shouldHideIcons as true when a text+icon item has label ellipsis", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
      createTab("b", { accessory: { type: "icon", name: "folder" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(createMockContainer()),
    });

    setItemEl("a", createButtonWithLabel(true));
    setItemEl("b", createButtonWithLabel(false));

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(true);
  });

  it("ignores tabs without icons when checking for ellipsis", async () => {
    const tabs = ref([
      createTab("a"), // no accessory
      createTab("b", { accessory: { type: "icon", name: "folder" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(createMockContainer()),
    });

    // Tab without icon has overflow, but should be ignored
    setItemEl("a", createButtonWithLabel(true));
    setItemEl("b", createButtonWithLabel(false));

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(false);
  });

  it("returns shouldHideIcons as true when the container overflows horizontally", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
      createTab("b", { accessory: { type: "icon", name: "folder" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(
        createMockContainer({ scrollWidth: 600, clientWidth: 400 }),
      ),
    });

    setItemEl("a", createButtonWithLabel(false));
    setItemEl("b", createButtonWithLabel(false));

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(true);
  });

  it("does not consider sub-pixel overflow as real overflow (tolerance)", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(
        createMockContainer({ scrollWidth: 401, clientWidth: 400 }),
      ),
    });

    setItemEl("a", createButtonWithLabel(false));

    await nextTick();
    await nextTick();

    // 401 > 400 + 1 is false, so no overflow
    expect(shouldHideIcons.value).toBe(false);
  });

  it("re-evaluates when width changes", async () => {
    const width = ref(500);
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width,
      tabs,
      containerEl: ref(createMockContainer()),
    });

    const btn = createButtonWithLabel(false);
    setItemEl("a", btn);

    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(false);

    // Simulate width change causing label overflow
    btn.querySelector("span")!.dataset.overflowing = "true";
    width.value = 100;

    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(true);
  });

  it("handles null containerEl gracefully", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(null),
    });

    setItemEl("a", createButtonWithLabel(false));

    await nextTick();
    await nextTick();

    // No container → no overflow check → only ellipsis matters
    expect(shouldHideIcons.value).toBe(false);
  });

  it("handles setItemEl with Vue component instances ($el)", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(createMockContainer()),
    });

    const btn = createButtonWithLabel(false);
    setItemEl("a", { $el: btn });

    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(false);
  });

  it("handles missing element gracefully", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
    ]);

    const { shouldHideIcons } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(createMockContainer()),
    });

    // Don't register any elements
    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(false);
  });

  it("ignores non-HTMLButtonElement values in setItemEl", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(createMockContainer()),
    });

    setItemEl("a", null);
    setItemEl("a", "not-an-element");
    setItemEl("a", document.createElement("div"));

    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(false);
  });

  it("hides icons when either ellipsis or overflow is detected", async () => {
    const tabs = ref([
      createTab("a", { accessory: { type: "icon", name: "search" } }),
      createTab("b", { accessory: { type: "icon", name: "folder" } }),
    ]);

    // Container overflows AND label has ellipsis
    const { shouldHideIcons, setItemEl } = useTabBarAdaptiveLayout({
      width: ref(500),
      tabs,
      containerEl: ref(
        createMockContainer({ scrollWidth: 600, clientWidth: 400 }),
      ),
    });

    setItemEl("a", createButtonWithLabel(true));
    setItemEl("b", createButtonWithLabel(false));

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(true);
  });

  describe("updateTabMinWidths", () => {
    const MIN_TAB_WIDTH_TOKEN = "--kds-test-min-width";

    it("sets inline min-width for short tabs to their natural width", async () => {
      const tabs = ref([createTab("a"), createTab("b")]);
      const container = createMockContainer({ tokenPx: 64 });

      const { setItemEl } = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(container),
        minTabWidth: MIN_TAB_WIDTH_TOKEN,
      });

      const btnA = createButtonWithLabel(false, { naturalWidth: 30 });
      const btnB = createButtonWithLabel(false, { naturalWidth: 50 });
      setItemEl("a", btnA);
      setItemEl("b", btnB);

      await nextTick();
      await nextTick();

      expect(btnA.style.minWidth).toBe("30px");
      expect(btnB.style.minWidth).toBe("50px");
    });

    it("clears inline min-width for tabs wider than the token", async () => {
      const tabs = ref([createTab("a"), createTab("b")]);
      const container = createMockContainer({ tokenPx: 64 });

      const { setItemEl } = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(container),
        minTabWidth: MIN_TAB_WIDTH_TOKEN,
      });

      const btnA = createButtonWithLabel(false, { naturalWidth: 100 });
      const btnB = createButtonWithLabel(false, { naturalWidth: 64 });
      setItemEl("a", btnA);
      setItemEl("b", btnB);

      await nextTick();
      await nextTick();

      expect(btnA.style.minWidth).toBe("");
      expect(btnB.style.minWidth).toBe("");
    });

    it("handles mix of short and long tabs", async () => {
      const tabs = ref([createTab("a"), createTab("b"), createTab("c")]);
      const container = createMockContainer({ tokenPx: 64 });

      const { setItemEl } = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(container),
        minTabWidth: MIN_TAB_WIDTH_TOKEN,
      });

      const btnA = createButtonWithLabel(false, { naturalWidth: 20 });
      const btnB = createButtonWithLabel(false, { naturalWidth: 120 });
      const btnC = createButtonWithLabel(false, { naturalWidth: 45 });
      setItemEl("a", btnA);
      setItemEl("b", btnB);
      setItemEl("c", btnC);

      await nextTick();
      await nextTick();

      expect(btnA.style.minWidth).toBe("20px");
      expect(btnB.style.minWidth).toBe("");
      expect(btnC.style.minWidth).toBe("45px");
    });

    it("skips min-width adjustment when fullWidth is true", async () => {
      const tabs = ref([createTab("a")]);
      const container = createMockContainer({ tokenPx: 64 });

      const { setItemEl } = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(container),
        fullWidth: ref(true),
        minTabWidth: MIN_TAB_WIDTH_TOKEN,
      });

      const btn = createButtonWithLabel(false, { naturalWidth: 30 });
      setItemEl("a", btn);

      await nextTick();
      await nextTick();

      expect(btn.style.minWidth).toBe("");
    });

    it("skips min-width adjustment when minTabWidth is not provided", async () => {
      const tabs = ref([createTab("a")]);
      const container = createMockContainer({ tokenPx: 64 });

      const { setItemEl } = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(container),
      });

      const btn = createButtonWithLabel(false, { naturalWidth: 30 });
      setItemEl("a", btn);

      await nextTick();
      await nextTick();

      expect(btn.style.minWidth).toBe("");
    });

    it("hides icon accessory during measurement so it does not inflate width", async () => {
      const tabs = ref([
        createTab("a", { accessory: { type: "icon", name: "search" } }),
      ]);
      const container = createMockContainer({ tokenPx: 64 });

      const { setItemEl } = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(container),
        minTabWidth: MIN_TAB_WIDTH_TOKEN,
      });

      const btn = createButtonWithLabel(false, {
        naturalWidth: 30,
        hasAccessory: true,
      });
      setItemEl("a", btn);

      await nextTick();
      await nextTick();

      // Accessory visibility should be restored after measurement
      const accessory = btn.querySelector(".kds-tab-icon") as HTMLElement;
      expect(accessory.style.display).toBe("");
      // Min-width based on label-only measurement
      expect(btn.style.minWidth).toBe("30px");
    });

    it("does not hide live status accessory during measurement", async () => {
      const tabs = ref([
        createTab("a", {
          accessory: { type: "liveStatus", status: "green" },
        }),
      ]);
      const container = createMockContainer({ tokenPx: 64 });

      const { setItemEl } = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(container),
        minTabWidth: MIN_TAB_WIDTH_TOKEN,
      });

      const btn = createButtonWithLabel(false, {
        naturalWidth: 30,
        hasAccessory: true,
      });
      setItemEl("a", btn);

      await nextTick();
      await nextTick();

      // Live status accessory should never be hidden
      const accessory = btn.querySelector(".kds-tab-icon") as HTMLElement;
      expect(accessory.style.display).toBe("");
    });

    it("restores flex-shrink after measurement", async () => {
      const tabs = ref([createTab("a")]);
      const container = createMockContainer({ tokenPx: 64 });

      const { setItemEl } = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(container),
        minTabWidth: MIN_TAB_WIDTH_TOKEN,
      });

      const btn = createButtonWithLabel(false, { naturalWidth: 30 });
      setItemEl("a", btn);

      await nextTick();
      await nextTick();

      expect(btn.style.flexShrink).toBe("");
    });

    it("returns minTabWidth for use in v-bind CSS", () => {
      const tabs = ref([createTab("a")]);
      const result = useTabBarAdaptiveLayout({
        width: ref(500),
        tabs,
        containerEl: ref(createMockContainer()),
        minTabWidth: MIN_TAB_WIDTH_TOKEN,
      });

      expect(result.minTabWidth).toBe(MIN_TAB_WIDTH_TOKEN);
    });
  });
});
