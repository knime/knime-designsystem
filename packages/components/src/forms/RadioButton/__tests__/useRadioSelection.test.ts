import { afterEach, describe, expect, it } from "vitest";
import { computed, ref } from "vue";

import { useRadioSelection } from "../useRadioSelection.ts";

const createRadioContainer = (ids: string[]) => {
  const container = document.createElement("div");
  container.innerHTML = ids
    .map((id) => `<button role="radio" id="${id}"></button>`)
    .join("\n");
  document.body.appendChild(container);
  return container;
};

afterEach(() => {
  document.body.innerHTML = "";
});

describe("useRadioSelection", () => {
  it("computes the selectedIndex from selectedId", () => {
    const globalDisable = ref(false);
    const options = ref([{ id: "a" }, { id: "b" }, { id: "c" }] as const);
    const selectedId = ref<"a" | "b" | "c" | null>("b");

    const api = useRadioSelection({
      globalDisable,
      options,
      selectedId,
    });

    expect(api.selectedIndex.value).toBe(1);
    selectedId.value = "c";
    expect(api.selectedIndex.value).toBe(2);

    selectedId.value = null;
    expect(api.selectedIndex.value).toBe(-1);
  });

  it("returns proper tabIndex values", () => {
    const globalDisable = ref(false);
    const options = ref([{ id: "a" }, { id: "b" }] as const);
    const selectedId = ref<"a" | "b" | null>(null);

    const api = useRadioSelection({
      globalDisable,
      options,
      selectedId,
    });

    // no selection -> first enabled option tabbable
    expect(api.tabIndexForOption(0)).toBe(0);
    expect(api.tabIndexForOption(1)).toBe(-1);

    selectedId.value = "b";
    expect(api.tabIndexForOption(0)).toBe(-1);
    expect(api.tabIndexForOption(1)).toBe(0);

    globalDisable.value = true;
    expect(api.tabIndexForOption(0)).toBeUndefined();
  });

  it("handles keyboard navigation (ArrowRight) and updates selection + focus", () => {
    const globalDisable = computed(() => false);
    const options = ref([{ id: "a" }, { id: "b" }, { id: "c" }] as const);
    const selectedId = ref<"a" | "b" | "c" | null>("a");

    const container = createRadioContainer(["a", "b", "c"]);

    const api = useRadioSelection({
      globalDisable,
      options,
      selectedId,
      optionContainer: ref(container),
    });

    const event = {
      key: "ArrowRight",
      preventDefault: () => {},
    } as unknown as KeyboardEvent;

    api.handleKeyDown(event, 0);

    expect(selectedId.value).toBe("b");
    expect(document.activeElement).toBe(container.querySelector("#b"));
  });

  it("supports wrapping navigation (ArrowLeft from first goes to last)", () => {
    const globalDisable = computed(() => false);
    const options = ref([{ id: "a" }, { id: "b" }, { id: "c" }] as const);
    const selectedId = ref<"a" | "b" | "c" | null>("a");

    const container = createRadioContainer(["a", "b", "c"]);

    const api = useRadioSelection({
      globalDisable,
      options,
      selectedId,
      optionContainer: ref(container),
    });

    const event = {
      key: "ArrowLeft",
      preventDefault: () => {},
    } as unknown as KeyboardEvent;

    api.handleKeyDown(event, 0);

    expect(selectedId.value).toBe("c");
    expect(document.activeElement).toBe(container.querySelector("#c"));
  });

  it("supports Home/End keys (go to first/last enabled)", () => {
    const globalDisable = computed(() => false);
    const options = ref([
      { id: "a" as const, disabled: true },
      { id: "b" as const },
      { id: "c" as const },
    ]);
    const selectedId = ref<"a" | "b" | "c" | null>("c");

    const container = createRadioContainer(["a", "b", "c"]);

    const api = useRadioSelection({
      globalDisable,
      options,
      selectedId,
      optionContainer: ref(container),
    });

    api.handleKeyDown(
      { key: "Home", preventDefault: () => {} } as unknown as KeyboardEvent,
      2,
    );
    expect(selectedId.value).toBe("b");
    expect(document.activeElement).toBe(container.querySelector("#b"));

    api.handleKeyDown(
      { key: "End", preventDefault: () => {} } as unknown as KeyboardEvent,
      1,
    );
    expect(selectedId.value).toBe("c");
    expect(document.activeElement).toBe(container.querySelector("#c"));
  });

  it("skips disabled options and reports hasError", () => {
    const globalDisable = computed(() => false);
    const options = ref([
      { id: "a" as const, error: false },
      { id: "b" as const, disabled: true, error: true },
      { id: "c" as const, error: false },
    ]);
    const selectedId = ref<"a" | "b" | "c" | null>("a");

    const container = createRadioContainer(["a", "b", "c"]);

    const api = useRadioSelection({
      globalDisable,
      options,
      selectedId,
      optionContainer: ref(container),
    });

    expect(api.hasError.value).toBe(true);

    const event = {
      key: "ArrowRight",
      preventDefault: () => {},
    } as unknown as KeyboardEvent;

    api.handleKeyDown(event, 0);

    // should skip index 1 (disabled) and select index 2
    expect(selectedId.value).toBe("c");
    expect(document.activeElement).toBe(container.querySelector("#c"));

    // disabled option should not be tabbable
    expect(api.tabIndexForOption(1)).toBeUndefined();
  });

  it("does not select a disabled option on Space/Enter", () => {
    const globalDisable = computed(() => false);
    const options = ref([
      { id: "a" as const },
      { id: "b" as const, disabled: true },
    ]);
    const selectedId = ref<"a" | "b" | null>("a");

    const api = useRadioSelection({
      globalDisable,
      options,
      selectedId,
    });

    api.handleKeyDown(
      { key: " ", preventDefault: () => {} } as unknown as KeyboardEvent,
      1,
    );
    expect(selectedId.value).toBe("a");

    api.handleKeyDown(
      { key: "Enter", preventDefault: () => {} } as unknown as KeyboardEvent,
      1,
    );
    expect(selectedId.value).toBe("a");
  });

  it("does nothing when globally disabled", () => {
    const globalDisable = ref(true);
    const options = ref([{ id: "a" }, { id: "b" }] as const);
    const selectedId = ref<"a" | "b" | null>("a");

    const container = createRadioContainer(["a", "b"]);

    const api = useRadioSelection({
      globalDisable,
      options,
      selectedId,
      optionContainer: ref(container),
    });

    api.handleKeyDown(
      {
        key: "ArrowRight",
        preventDefault: () => {},
      } as unknown as KeyboardEvent,
      0,
    );

    expect(selectedId.value).toBe("a");
    expect(document.activeElement).not.toBe(container.querySelector("#b"));
  });
});
