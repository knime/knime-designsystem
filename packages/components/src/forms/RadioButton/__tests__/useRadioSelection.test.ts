import { describe, expect, it, vi } from "vitest";
import { computed, ref } from "vue";

import { useRadioSelection } from "../useRadioSelection";

const createOptions = (
  ids: string[],
  disabledIds: string[] = [],
  errorIds: string[] = [],
) =>
  computed(() =>
    ids.map((id) => ({
      id,
      disabled: disabledIds.includes(id),
      error: errorIds.includes(id),
    })),
  );

/**
 * Pass `selectedId: null` or `selectedId: undefined` for "no selection".
 * Omit `selectedId` to default to the first option id.
 */
const createSetup = (
  params: {
    ids?: string[];
    selectedId?: string | null;
    disabledIds?: string[];
    errorIds?: string[];
    globalDisable?: boolean;
    globalError?: boolean;
  } = {},
) => {
  const {
    ids = ["a", "b", "c", "d"],
    disabledIds = [],
    errorIds = [],
    globalDisable = false,
    globalError = false,
  } = params;

  const hasExplicitSelectedId = "selectedId" in params;
  const selectedId = ref<string | undefined>(
    hasExplicitSelectedId ? (params.selectedId ?? undefined) : ids[0],
  );
  const options = createOptions(ids, disabledIds, errorIds);
  const globalDisableRef = ref(globalDisable);
  const globalErrorRef = ref(globalError);

  // Create a mock container with focusable radio buttons
  const container = document.createElement("div");
  ids.forEach((id) => {
    const btn = document.createElement("button");
    btn.role = "radio";
    btn.textContent = id;
    btn.focus = vi.fn();
    container.appendChild(btn);
  });
  const optionContainer = ref(container as unknown as HTMLElement);

  const result = useRadioSelection({
    selectedId,
    options,
    globalDisable: globalDisableRef,
    globalError: globalErrorRef,
    optionContainer,
  });

  return { selectedId, globalDisableRef, container, ...result };
};

describe("useRadioSelection", () => {
  describe("tabIndexForOption", () => {
    it("assigns tabindex 0 to selected option and -1 to others", () => {
      const { tabIndexForOption } = createSetup({ selectedId: "b" });

      expect(tabIndexForOption(0)).toBe(-1);
      expect(tabIndexForOption(1)).toBe(0);
      expect(tabIndexForOption(2)).toBe(-1);
      expect(tabIndexForOption(3)).toBe(-1);
    });

    it("assigns tabindex 0 to first enabled option when nothing is selected", () => {
      const { tabIndexForOption } = createSetup({
        selectedId: undefined,
      });

      expect(tabIndexForOption(0)).toBe(0);
      expect(tabIndexForOption(1)).toBe(-1);
    });

    it("assigns tabindex 0 to first enabled option when first option is disabled and nothing is selected", () => {
      const { tabIndexForOption } = createSetup({
        selectedId: undefined,
        disabledIds: ["a"],
      });

      expect(tabIndexForOption(0)).toBeUndefined();
      expect(tabIndexForOption(1)).toBe(0);
      expect(tabIndexForOption(2)).toBe(-1);
    });

    it("returns undefined for disabled options", () => {
      const { tabIndexForOption } = createSetup({
        disabledIds: ["b"],
      });

      expect(tabIndexForOption(1)).toBeUndefined();
    });

    it("returns undefined for all options when globally disabled", () => {
      const { tabIndexForOption } = createSetup({
        globalDisable: true,
      });

      expect(tabIndexForOption(0)).toBeUndefined();
      expect(tabIndexForOption(1)).toBeUndefined();
    });
  });

  describe("handleClick (selectIndex)", () => {
    it("selects the clicked option", () => {
      const { handleClick, selectedId } = createSetup();

      handleClick(2);
      expect(selectedId.value).toBe("c");
    });

    it("does not select a disabled option", () => {
      const { handleClick, selectedId } = createSetup({
        disabledIds: ["c"],
      });

      handleClick(2);
      expect(selectedId.value).toBe("a");
    });

    it("does not select when globally disabled", () => {
      const { handleClick, selectedId } = createSetup({
        globalDisable: true,
      });

      handleClick(1);
      expect(selectedId.value).toBe("a");
    });
  });

  const createKeyEvent = (key: string) =>
    new KeyboardEvent("keydown", { key, bubbles: true });

  describe("handleKeyDown", () => {
    it("arrowRight moves to the next enabled option", () => {
      const { handleKeyDown, selectedId } = createSetup();

      handleKeyDown(createKeyEvent("ArrowRight"), 0);
      expect(selectedId.value).toBe("b");
    });

    it("arrowDown moves to the next enabled option", () => {
      const { handleKeyDown, selectedId } = createSetup();

      handleKeyDown(createKeyEvent("ArrowDown"), 0);
      expect(selectedId.value).toBe("b");
    });

    it("arrowLeft moves to the previous enabled option", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: "c",
      });

      handleKeyDown(createKeyEvent("ArrowLeft"), 2);
      expect(selectedId.value).toBe("b");
    });

    it("arrowUp moves to the previous enabled option", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: "c",
      });

      handleKeyDown(createKeyEvent("ArrowUp"), 2);
      expect(selectedId.value).toBe("b");
    });

    it("arrowRight wraps from last to first", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: "d",
      });

      handleKeyDown(createKeyEvent("ArrowRight"), 3);
      expect(selectedId.value).toBe("a");
    });

    it("arrowLeft wraps from first to last", () => {
      const { handleKeyDown, selectedId } = createSetup();

      handleKeyDown(createKeyEvent("ArrowLeft"), 0);
      expect(selectedId.value).toBe("d");
    });

    it("arrowRight skips disabled options", () => {
      const { handleKeyDown, selectedId } = createSetup({
        disabledIds: ["b"],
      });

      handleKeyDown(createKeyEvent("ArrowRight"), 0);
      expect(selectedId.value).toBe("c");
    });

    it("arrowLeft skips disabled options", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: "c",
        disabledIds: ["b"],
      });

      handleKeyDown(createKeyEvent("ArrowLeft"), 2);
      expect(selectedId.value).toBe("a");
    });

    it("does nothing when all options are disabled via global flag", () => {
      const { handleKeyDown, selectedId } = createSetup({
        globalDisable: true,
      });

      handleKeyDown(createKeyEvent("ArrowRight"), 0);
      expect(selectedId.value).toBe("a");
    });

    it("does not move when nextEnabledIndex finds no enabled option", () => {
      const { handleKeyDown, selectedId } = createSetup({
        ids: ["a", "b"],
        selectedId: "a",
        disabledIds: ["a", "b"],
      });

      // globalDisable is false, so handleKeyDown enters the switch,
      // but all options are individually disabled → nextEnabledIndex returns -1
      handleKeyDown(createKeyEvent("ArrowRight"), 0);
      expect(selectedId.value).toBe("a");
    });

    it("home selects the first enabled option", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: "c",
      });

      handleKeyDown(createKeyEvent("Home"), 2);
      expect(selectedId.value).toBe("a");
    });

    it("home skips disabled first options", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: "c",
        disabledIds: ["a"],
      });

      handleKeyDown(createKeyEvent("Home"), 2);
      expect(selectedId.value).toBe("b");
    });

    it("home does nothing when all options are disabled", () => {
      const { handleKeyDown, selectedId } = createSetup({
        ids: ["a", "b"],
        selectedId: "a",
        disabledIds: ["a", "b"],
      });

      handleKeyDown(createKeyEvent("Home"), 0);
      expect(selectedId.value).toBe("a");
    });

    it("end selects the last enabled option", () => {
      const { handleKeyDown, selectedId } = createSetup();

      handleKeyDown(createKeyEvent("End"), 0);
      expect(selectedId.value).toBe("d");
    });

    it("end skips disabled last options", () => {
      const { handleKeyDown, selectedId } = createSetup({
        disabledIds: ["d"],
      });

      handleKeyDown(createKeyEvent("End"), 0);
      expect(selectedId.value).toBe("c");
    });

    it("space selects the current option", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: undefined,
      });

      handleKeyDown(createKeyEvent(" "), 1);
      expect(selectedId.value).toBe("b");
    });

    it("enter selects the current option", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: undefined,
      });

      handleKeyDown(createKeyEvent("Enter"), 2);
      expect(selectedId.value).toBe("c");
    });

    it("space does not select a disabled option", () => {
      const { handleKeyDown, selectedId } = createSetup({
        selectedId: "a",
        disabledIds: ["b"],
      });

      handleKeyDown(createKeyEvent(" "), 1);
      expect(selectedId.value).toBe("a");
    });

    it("prevents default on all handled keys", () => {
      const { handleKeyDown } = createSetup();

      for (const key of [
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End",
        " ",
        "Enter",
      ]) {
        const event = createKeyEvent(key);
        const preventSpy = vi.spyOn(event, "preventDefault");
        handleKeyDown(event, 0);
        expect(preventSpy).toHaveBeenCalled();
      }
    });

    it("does not prevent default on unhandled keys", () => {
      const { handleKeyDown } = createSetup();

      const event = createKeyEvent("Tab");
      const preventSpy = vi.spyOn(event, "preventDefault");
      handleKeyDown(event, 0);
      expect(preventSpy).not.toHaveBeenCalled();
    });

    it("focuses the option after keyboard navigation", () => {
      const { handleKeyDown, container } = createSetup();

      handleKeyDown(createKeyEvent("ArrowRight"), 0);

      const radios = container.querySelectorAll<HTMLButtonElement>(
        'button[role="radio"]',
      );
      expect(radios[1].focus).toHaveBeenCalled();
    });
  });

  describe("hasError", () => {
    it("returns false when no errors", () => {
      const { hasError } = createSetup();

      expect(hasError.value).toBe(false);
    });

    it("returns true when globalError is true", () => {
      const { hasError } = createSetup({ globalError: true });

      expect(hasError.value).toBe(true);
    });

    it("returns true when any option has error", () => {
      const { hasError } = createSetup({ errorIds: ["b"] });

      expect(hasError.value).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("handles empty options list", () => {
      const { handleKeyDown, selectedId, tabIndexForOption } = createSetup({
        ids: [],
        selectedId: undefined,
      });

      // nextEnabledIndex returns -1 for empty list
      handleKeyDown(createKeyEvent("ArrowRight"), 0);
      expect(selectedId.value).toBeUndefined();

      // No options, so tabIndexForOption returns -1
      expect(tabIndexForOption(0)).toBe(-1);
    });

    it("works without optionContainer", () => {
      const selectedId = ref<string | undefined>("a");
      const options = createOptions(["a", "b", "c"]);

      const { handleKeyDown } = useRadioSelection({
        selectedId,
        options,
      });

      // Should still select, just no focus call
      handleKeyDown(createKeyEvent("ArrowRight"), 0);
      expect(selectedId.value).toBe("b");
    });
  });
});
