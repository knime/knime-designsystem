import { describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";

import type { KdsTabBarItem } from "../types";
import { useTabBarIconHiding } from "../useTabBarIconHiding";

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
  extras: Partial<Pick<KdsTabBarItem, "trailingIcon" | "disabled">> = {},
): KdsTabBarItem => ({
  id: `${value}-id`,
  value,
  label: value,
  panelId: `${value}-panel`,
  ...extras,
});

const createButtonWithLabel = (overflowing: boolean) => {
  const btn = document.createElement("button");
  const label = document.createElement("span");
  label.className = "kds-tab-label";
  label.dataset.overflowing = overflowing ? "true" : "false";
  btn.appendChild(label);
  return btn;
};

const createMockContainer = ({
  scrollWidth = 100,
  clientWidth = 100,
}: {
  scrollWidth?: number;
  clientWidth?: number;
} = {}) => {
  const el = document.createElement("div");
  Object.defineProperty(el, "scrollWidth", { value: scrollWidth });
  Object.defineProperty(el, "clientWidth", { value: clientWidth });
  return el;
};

describe("useTabBarIconHiding", () => {
  it("returns shouldHideIcons as false when no items overflow", async () => {
    const tabs = ref([
      createTab("a", { trailingIcon: "search" }),
      createTab("b", { trailingIcon: "folder" }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
      createTab("a", { trailingIcon: "search" }),
      createTab("b", { trailingIcon: "folder" }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
      createTab("a"), // no icon
      createTab("b", { trailingIcon: "folder" }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
      createTab("a", { trailingIcon: "search" }),
      createTab("b", { trailingIcon: "folder" }),
    ]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
    const tabs = ref([createTab("a", { trailingIcon: "search" })]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
    const tabs = ref([createTab("a", { trailingIcon: "search" })]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
    const tabs = ref([createTab("a", { trailingIcon: "search" })]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
    const tabs = ref([createTab("a", { trailingIcon: "search" })]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
    const tabs = ref([createTab("a", { trailingIcon: "search" })]);

    const { shouldHideIcons } = useTabBarIconHiding({
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
    const tabs = ref([createTab("a", { trailingIcon: "search" })]);

    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
      createTab("a", { trailingIcon: "search" }),
      createTab("b", { trailingIcon: "folder" }),
    ]);

    // Container overflows AND label has ellipsis
    const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
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
});
