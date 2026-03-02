import { afterEach, describe, expect, it, vi } from "vitest";
import { type Ref, computed, nextTick, ref } from "vue";
import { useMutationObserver, useResizeObserver } from "@vueuse/core";

import {
  elementOverflowsHorizontally,
  elementOverflowsVertically,
  useKdsIsTruncated,
} from "../useKdsIsTruncated";

vi.mock("@vueuse/core", () => ({
  useResizeObserver: vi.fn(),
  useMutationObserver: vi.fn(),
}));

const createMockElement = (
  overrides: Partial<
    Pick<
      HTMLElement,
      "scrollWidth" | "clientWidth" | "scrollHeight" | "clientHeight"
    >
  > = {},
): HTMLElement =>
  ({
    scrollWidth: 100,
    clientWidth: 100,
    scrollHeight: 50,
    clientHeight: 50,
    ...overrides,
  }) as unknown as HTMLElement;

describe("elementOverflowsHorizontally", () => {
  it("returns false for null element", () => {
    expect(elementOverflowsHorizontally(null)).toBe(false);
  });

  it("returns false when scrollWidth equals clientWidth", () => {
    expect(
      elementOverflowsHorizontally(
        createMockElement({ scrollWidth: 100, clientWidth: 100 }),
      ),
    ).toBe(false);
  });

  it("returns false when scrollWidth is less than clientWidth", () => {
    expect(
      elementOverflowsHorizontally(
        createMockElement({ scrollWidth: 80, clientWidth: 100 }),
      ),
    ).toBe(false);
  });

  it("returns true when scrollWidth exceeds clientWidth", () => {
    expect(
      elementOverflowsHorizontally(
        createMockElement({ scrollWidth: 200, clientWidth: 100 }),
      ),
    ).toBe(true);
  });

  it("returns true when scrollWidth exceeds clientWidth by 1 pixel", () => {
    expect(
      elementOverflowsHorizontally(
        createMockElement({ scrollWidth: 101, clientWidth: 100 }),
      ),
    ).toBe(true);
  });

  it("handles zero-width elements", () => {
    expect(
      elementOverflowsHorizontally(
        createMockElement({ scrollWidth: 0, clientWidth: 0 }),
      ),
    ).toBe(false);
  });
});

describe("elementOverflowsVertically", () => {
  it("returns false for null element", () => {
    expect(elementOverflowsVertically(null)).toBe(false);
  });

  it("returns false when scrollHeight equals clientHeight", () => {
    expect(
      elementOverflowsVertically(
        createMockElement({ scrollHeight: 50, clientHeight: 50 }),
      ),
    ).toBe(false);
  });

  it("returns false when scrollHeight is less than clientHeight", () => {
    expect(
      elementOverflowsVertically(
        createMockElement({ scrollHeight: 30, clientHeight: 50 }),
      ),
    ).toBe(false);
  });

  it("returns true when scrollHeight exceeds clientHeight", () => {
    expect(
      elementOverflowsVertically(
        createMockElement({ scrollHeight: 100, clientHeight: 50 }),
      ),
    ).toBe(true);
  });

  it("returns true when scrollHeight exceeds clientHeight by 1 pixel", () => {
    expect(
      elementOverflowsVertically(
        createMockElement({ scrollHeight: 51, clientHeight: 50 }),
      ),
    ).toBe(true);
  });

  it("handles zero-height elements", () => {
    expect(
      elementOverflowsVertically(
        createMockElement({ scrollHeight: 0, clientHeight: 0 }),
      ),
    ).toBe(false);
  });
});

describe("useKdsIsTruncated", () => {
  let resizeCallback: (() => void) | undefined;
  let mutationCallback: (() => void) | undefined;

  afterEach(() => {
    vi.clearAllMocks();
    resizeCallback = undefined;
    mutationCallback = undefined;
  });

  const setupMocks = () => {
    vi.mocked(useResizeObserver).mockImplementation((_target, callback) => {
      resizeCallback = callback as () => void;
      return { stop: vi.fn(), isSupported: computed(() => true) };
    });
    vi.mocked(useMutationObserver).mockImplementation(
      (_target, callback, _options) => {
        mutationCallback = callback as () => void;
        return {
          stop: vi.fn(),
          isSupported: computed(() => true),
          takeRecords: vi.fn(),
        };
      },
    );
  };

  it("returns isTruncated as false initially for null ref", () => {
    setupMocks();
    const elementRef = ref(null) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    expect(isTruncated.value).toBe(false);
  });

  it("registers a resize observer on the element ref", () => {
    setupMocks();
    const elementRef = ref(null) as Ref<HTMLElement | null>;
    useKdsIsTruncated(elementRef);

    expect(useResizeObserver).toHaveBeenCalledWith(
      elementRef,
      expect.any(Function),
    );
  });

  it("registers a mutation observer on the element ref", () => {
    setupMocks();
    const elementRef = ref(null) as Ref<HTMLElement | null>;
    useKdsIsTruncated(elementRef);

    expect(useMutationObserver).toHaveBeenCalledWith(
      elementRef,
      expect.any(Function),
      { childList: true, characterData: true },
    );
  });

  it("detects horizontal truncation on resize", async () => {
    setupMocks();
    const element = createMockElement({ scrollWidth: 200, clientWidth: 100 });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    resizeCallback!();
    await nextTick();

    expect(isTruncated.value).toBe(true);
  });

  it("detects vertical truncation on resize", async () => {
    setupMocks();
    const element = createMockElement({
      scrollHeight: 100,
      clientHeight: 50,
    });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    resizeCallback!();
    await nextTick();

    expect(isTruncated.value).toBe(true);
  });

  it("detects both horizontal and vertical truncation", async () => {
    setupMocks();
    const element = createMockElement({
      scrollWidth: 200,
      clientWidth: 100,
      scrollHeight: 100,
      clientHeight: 50,
    });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    resizeCallback!();
    await nextTick();

    expect(isTruncated.value).toBe(true);
  });

  it("reports not truncated when element fits", async () => {
    setupMocks();
    const element = createMockElement();
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    resizeCallback!();
    await nextTick();

    expect(isTruncated.value).toBe(false);
  });

  it("detects truncation on mutation observer callback", async () => {
    setupMocks();
    const element = createMockElement({ scrollWidth: 300, clientWidth: 100 });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    mutationCallback!();
    await nextTick();

    expect(isTruncated.value).toBe(true);
  });

  it("updates truncation state when element dimensions change", async () => {
    setupMocks();
    const element = createMockElement({ scrollWidth: 200, clientWidth: 100 });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    resizeCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(true);

    (element as any).scrollWidth = 100;
    resizeCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(false);
  });

  it("handles element ref changing from null to an element", async () => {
    setupMocks();
    const elementRef = ref(null) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    resizeCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(false);

    elementRef.value = createMockElement({
      scrollWidth: 200,
      clientWidth: 100,
    });
    resizeCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(true);
  });

  it("handles element ref changing back to null", async () => {
    setupMocks();
    const element = createMockElement({ scrollWidth: 200, clientWidth: 100 });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    resizeCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(true);

    elementRef.value = null;
    mutationCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(false);
  });

  it("transitions from truncated to not truncated via mutation", async () => {
    setupMocks();
    const element = createMockElement({ scrollWidth: 200, clientWidth: 100 });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    mutationCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(true);

    (element as any).scrollWidth = 80;
    mutationCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(false);
  });

  it("handles only vertical truncation via mutation", async () => {
    setupMocks();
    const element = createMockElement({
      scrollHeight: 200,
      clientHeight: 50,
    });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    mutationCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(true);
  });

  it("responds correctly to alternating resize and mutation callbacks", async () => {
    setupMocks();
    const element = createMockElement({ scrollWidth: 200, clientWidth: 100 });
    const elementRef = ref(element) as Ref<HTMLElement | null>;
    const { isTruncated } = useKdsIsTruncated(elementRef);

    resizeCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(true);

    (element as any).scrollWidth = 80;
    mutationCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(false);

    (element as any).scrollHeight = 200;
    resizeCallback!();
    await nextTick();
    expect(isTruncated.value).toBe(true);
  });
});
