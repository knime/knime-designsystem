import { describe, expect, it, vi } from "vitest";

import { usePointerHandler } from "../usePointerHandler";

const createPointerEvent = (
  overrides: Partial<PointerEvent> & { currentTarget?: EventTarget | null },
) =>
  ({
    button: 0,
    pointerId: 1,
    currentTarget: null,
    ...overrides,
  }) as unknown as PointerEvent;

const createMockElement = () => {
  const el = document.createElement("div");
  const captured = new Set<number>();
  el.setPointerCapture = vi.fn((id: number) => captured.add(id));
  el.releasePointerCapture = vi.fn((id: number) => captured.delete(id));
  el.hasPointerCapture = vi.fn((id: number) => captured.has(id));
  return { el, captured };
};

describe("usePointerHandler", () => {
  it("calls updateFromEvent on pointer down with left button", () => {
    const handler = vi.fn();
    const { onPointerDown } = usePointerHandler(handler);
    const { el } = createMockElement();

    const event = createPointerEvent({ currentTarget: el, pointerId: 1 });
    onPointerDown(event);

    expect(handler).toHaveBeenCalledWith(event);
  });

  it("sets activePointerId on pointer down", () => {
    const handler = vi.fn();
    const { onPointerDown, activePointerId } = usePointerHandler(handler);
    const { el } = createMockElement();

    expect(activePointerId.value).toBeNull();

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 42 }));

    expect(activePointerId.value).toBe(42);
  });

  it("captures the pointer on pointer down", () => {
    const handler = vi.fn();
    const { onPointerDown } = usePointerHandler(handler);
    const { el } = createMockElement();

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 5 }));

    expect(el.setPointerCapture).toHaveBeenCalledWith(5);
  });

  it("ignores non-left-button pointer down events", () => {
    const handler = vi.fn();
    const { onPointerDown, activePointerId } = usePointerHandler(handler);
    const { el } = createMockElement();

    onPointerDown(createPointerEvent({ currentTarget: el, button: 2 }));

    expect(handler).not.toHaveBeenCalled();
    expect(activePointerId.value).toBeNull();
  });

  it("ignores pointer down when currentTarget is not an HTMLElement", () => {
    const handler = vi.fn();
    const { onPointerDown, activePointerId } = usePointerHandler(handler);

    onPointerDown(createPointerEvent({ currentTarget: null }));

    expect(handler).not.toHaveBeenCalled();
    expect(activePointerId.value).toBeNull();
  });

  it("calls updateFromEvent on pointer move when pointer is active", () => {
    const handler = vi.fn();
    const { onPointerDown, onPointerMove } = usePointerHandler(handler);
    const { el } = createMockElement();

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    handler.mockClear();

    const moveEvent = createPointerEvent({ pointerId: 1 });
    onPointerMove(moveEvent);

    expect(handler).toHaveBeenCalledWith(moveEvent);
  });

  it("ignores pointer move when no pointer is active", () => {
    const handler = vi.fn();
    const { onPointerMove } = usePointerHandler(handler);

    onPointerMove(createPointerEvent({ pointerId: 1 }));

    expect(handler).not.toHaveBeenCalled();
  });

  it("ignores pointer move from a different pointer id", () => {
    const handler = vi.fn();
    const { onPointerDown, onPointerMove } = usePointerHandler(handler);
    const { el } = createMockElement();

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    handler.mockClear();

    onPointerMove(createPointerEvent({ pointerId: 2 }));

    expect(handler).not.toHaveBeenCalled();
  });

  it("resets activePointerId on pointer up", () => {
    const handler = vi.fn();
    const { onPointerDown, onPointerUp, activePointerId } =
      usePointerHandler(handler);
    const { el } = createMockElement();

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    expect(activePointerId.value).toBe(1);

    onPointerUp(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    expect(activePointerId.value).toBeNull();
  });

  it("releases pointer capture on pointer up", () => {
    const handler = vi.fn();
    const { onPointerDown, onPointerUp } = usePointerHandler(handler);
    const { el } = createMockElement();

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 3 }));
    onPointerUp(createPointerEvent({ currentTarget: el, pointerId: 3 }));

    expect(el.releasePointerCapture).toHaveBeenCalledWith(3);
  });

  it("ignores pointer up from a different pointer id", () => {
    const handler = vi.fn();
    const { onPointerDown, onPointerUp, activePointerId } =
      usePointerHandler(handler);
    const { el } = createMockElement();

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    onPointerUp(createPointerEvent({ currentTarget: el, pointerId: 2 }));

    expect(activePointerId.value).toBe(1);
    expect(el.releasePointerCapture).not.toHaveBeenCalled();
  });

  it("does not release pointer capture when currentTarget is not an HTMLElement on pointer up", () => {
    const handler = vi.fn();
    const { onPointerDown, onPointerUp, activePointerId } =
      usePointerHandler(handler);
    const { el } = createMockElement();

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    onPointerUp(createPointerEvent({ currentTarget: null, pointerId: 1 }));

    expect(activePointerId.value).toBeNull();
    expect(el.releasePointerCapture).not.toHaveBeenCalled();
  });

  it("does not release pointer capture when target does not have capture", () => {
    const handler = vi.fn();
    const { onPointerDown, onPointerUp } = usePointerHandler(handler);
    const { el } = createMockElement();

    const otherEl = document.createElement("div");
    otherEl.setPointerCapture = vi.fn();
    otherEl.releasePointerCapture = vi.fn();
    otherEl.hasPointerCapture = vi.fn(() => false);

    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    onPointerUp(createPointerEvent({ currentTarget: otherEl, pointerId: 1 }));

    expect(otherEl.releasePointerCapture).not.toHaveBeenCalled();
  });

  it("supports a full pointer down → move → up lifecycle", () => {
    const handler = vi.fn();
    const { onPointerDown, onPointerMove, onPointerUp, activePointerId } =
      usePointerHandler(handler);
    const { el } = createMockElement();

    // Pointer down
    onPointerDown(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    expect(activePointerId.value).toBe(1);
    expect(handler).toHaveBeenCalledTimes(1);

    // Pointer move
    onPointerMove(createPointerEvent({ pointerId: 1 }));
    expect(handler).toHaveBeenCalledTimes(2);

    // Another move
    onPointerMove(createPointerEvent({ pointerId: 1 }));
    expect(handler).toHaveBeenCalledTimes(3);

    // Pointer up
    onPointerUp(createPointerEvent({ currentTarget: el, pointerId: 1 }));
    expect(activePointerId.value).toBeNull();

    // Move after up should be ignored
    onPointerMove(createPointerEvent({ pointerId: 1 }));
    expect(handler).toHaveBeenCalledTimes(3);
  });
});
