import { describe, expect, it, vi } from "vitest";
import { computed, ref } from "vue";

import { useIndexSelection } from "../useIndexSelection.ts";

describe("useIndexSelection", () => {
  it("computes the selectedIndex from selectedId", () => {
    const disabled = ref(false);
    const optionIds = ref(["a", "b", "c"] as const);
    const selectedId = ref<"a" | "b" | "c" | null>("b");

    const api = useIndexSelection({
      disabled,
      optionIds,
      selectedId,
      focusOptionAtIndex: vi.fn(),
    });

    expect(api.selectedIndex.value).toBe(1);
    selectedId.value = "c";
    expect(api.selectedIndex.value).toBe(2);
  });

  it("returns proper tabIndex values", () => {
    const disabled = ref(false);
    const optionIds = ref(["a", "b"] as const);
    const selectedId = ref<"a" | "b" | null>(null);

    const api = useIndexSelection({
      disabled,
      optionIds,
      selectedId,
      focusOptionAtIndex: vi.fn(),
    });

    // no selection -> first option tabbable
    expect(api.tabIndexForOption(0)).toBe(0);
    expect(api.tabIndexForOption(1)).toBe(-1);

    selectedId.value = "b";
    expect(api.tabIndexForOption(0)).toBe(-1);
    expect(api.tabIndexForOption(1)).toBe(0);

    disabled.value = true;
    expect(api.tabIndexForOption(0)).toBeUndefined();
  });

  it("handles keyboard navigation and updates selection + focus", () => {
    const disabled = computed(() => false);
    const optionIds = ref(["a", "b", "c"] as const);
    const selectedId = ref<"a" | "b" | "c" | null>("a");
    const focusOptionAtIndex = vi.fn();

    const api = useIndexSelection({
      disabled,
      optionIds,
      selectedId,
      focusOptionAtIndex,
    });

    const event = {
      key: "ArrowRight",
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    api.handleKeyDown(event, 0);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(selectedId.value).toBe("b");
    expect(focusOptionAtIndex).toHaveBeenCalledWith(1);
  });

  it("does nothing when disabled", () => {
    const disabled = ref(true);
    const optionIds = ref(["a", "b"] as const);
    const selectedId = ref<"a" | "b" | null>("a");
    const focusOptionAtIndex = vi.fn();

    const api = useIndexSelection({
      disabled,
      optionIds,
      selectedId,
      focusOptionAtIndex,
    });

    const event = {
      key: "ArrowRight",
      preventDefault: vi.fn(),
    } as unknown as KeyboardEvent;

    api.handleKeyDown(event, 0);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(selectedId.value).toBe("a");
    expect(focusOptionAtIndex).not.toHaveBeenCalled();
  });
});
