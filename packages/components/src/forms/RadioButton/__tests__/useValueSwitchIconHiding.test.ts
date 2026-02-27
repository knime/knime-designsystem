import { describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";

import type { KdsValueSwitchOption } from "../types";
import { useValueSwitchIconHiding } from "../useValueSwitchIconHiding";

vi.mock("../../../util/useKdsIsTruncated", () => ({
  elementOverflowsHorizontally: (el: HTMLElement | null) => {
    if (!el) {
      return false;
    }
    // Use a data attribute to simulate overflow
    return el.dataset.overflowing === "true";
  },
}));

const createOption = (
  id: string,
  extras: Partial<{
    text: string;
    leadingIcon: string;
    trailingIcon: string;
  }> = {},
): KdsValueSwitchOption =>
  ({
    id,
    ...extras,
  }) as KdsValueSwitchOption;

describe("useValueSwitchIconHiding", () => {
  it("returns shouldHideIcons as false when no items overflow", async () => {
    const options = ref([
      createOption("a", { text: "A", leadingIcon: "search" }),
      createOption("b", { text: "B", trailingIcon: "arrow" }),
    ]);

    const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
      width: ref(500),
      options,
    });

    // Simulate registering elements
    for (const opt of options.value) {
      const btn = document.createElement("button");
      const label = document.createElement("span");
      label.className = "option-label";
      label.dataset.overflowing = "false";
      btn.appendChild(label);
      setItemEl(opt.id, btn);
    }

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(false);
  });

  it("returns shouldHideIcons as true when a text+icon item overflows", async () => {
    const options = ref([
      createOption("a", { text: "A", leadingIcon: "search" }),
      createOption("b", { text: "B", trailingIcon: "arrow" }),
    ]);

    const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
      width: ref(500),
      options,
    });

    for (const opt of options.value) {
      const btn = document.createElement("button");
      const label = document.createElement("span");
      label.className = "option-label";
      label.dataset.overflowing = "true";
      btn.appendChild(label);
      setItemEl(opt.id, btn);
    }

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(true);
  });

  it("ignores icon-only options (no text) when checking for overflow", async () => {
    const options = ref([
      createOption("a", { leadingIcon: "search" }), // icon-only, no text
      createOption("b", { text: "B", leadingIcon: "arrow" }),
    ]);

    const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
      width: ref(500),
      options,
    });

    // Icon-only item has overflow, but text+icon item does not
    const iconOnlyBtn = document.createElement("button");
    const iconOnlyLabel = document.createElement("span");
    iconOnlyLabel.className = "option-label";
    iconOnlyLabel.dataset.overflowing = "true";
    iconOnlyBtn.appendChild(iconOnlyLabel);
    setItemEl("a", iconOnlyBtn);

    const textBtn = document.createElement("button");
    const textLabel = document.createElement("span");
    textLabel.className = "option-label";
    textLabel.dataset.overflowing = "false";
    textBtn.appendChild(textLabel);
    setItemEl("b", textBtn);

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(false);
  });

  it("ignores text-only options (no icons) when checking for overflow", async () => {
    const options = ref([
      createOption("a", { text: "A" }), // text-only, no icons
      createOption("b", { text: "B", leadingIcon: "arrow" }),
    ]);

    const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
      width: ref(500),
      options,
    });

    // text-only item has overflow, but it has no icons so should be ignored
    const textOnlyBtn = document.createElement("button");
    const textOnlyLabel = document.createElement("span");
    textOnlyLabel.className = "option-label";
    textOnlyLabel.dataset.overflowing = "true";
    textOnlyBtn.appendChild(textOnlyLabel);
    setItemEl("a", textOnlyBtn);

    const iconBtn = document.createElement("button");
    const iconLabel = document.createElement("span");
    iconLabel.className = "option-label";
    iconLabel.dataset.overflowing = "false";
    iconBtn.appendChild(iconLabel);
    setItemEl("b", iconBtn);

    await nextTick();
    await nextTick();

    expect(shouldHideIcons.value).toBe(false);
  });

  it("re-evaluates when width changes", async () => {
    const width = ref(500);
    const options = ref([
      createOption("a", { text: "A", leadingIcon: "search" }),
    ]);

    const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
      width,
      options,
    });

    const btn = document.createElement("button");
    const label = document.createElement("span");
    label.className = "option-label";
    label.dataset.overflowing = "false";
    btn.appendChild(label);
    setItemEl("a", btn);

    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(false);

    // Simulate width change causing overflow
    label.dataset.overflowing = "true";
    width.value = 100;

    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(true);
  });

  it("handles setItemEl with Vue component instances ($el)", async () => {
    const options = ref([
      createOption("a", { text: "A", leadingIcon: "search" }),
    ]);

    const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
      width: ref(500),
      options,
    });

    const btn = document.createElement("button");
    const label = document.createElement("span");
    label.className = "option-label";
    label.dataset.overflowing = "false";
    btn.appendChild(label);

    // Simulate Vue component instance with $el
    setItemEl("a", { $el: btn });

    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(false);
  });

  it("handles missing element gracefully", async () => {
    const options = ref([
      createOption("a", { text: "A", leadingIcon: "search" }),
    ]);

    const { shouldHideIcons } = useValueSwitchIconHiding({
      width: ref(500),
      options,
    });

    // Don't register any elements
    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(false);
  });

  it("ignores non-HTMLButtonElement values in setItemEl", async () => {
    const options = ref([
      createOption("a", { text: "A", leadingIcon: "search" }),
    ]);

    const { shouldHideIcons, setItemEl } = useValueSwitchIconHiding({
      width: ref(500),
      options,
    });

    // Pass non-button elements
    setItemEl("a", null);
    setItemEl("a", "not-an-element");
    setItemEl("a", document.createElement("div"));

    await nextTick();
    await nextTick();
    expect(shouldHideIcons.value).toBe(false);
  });
});
