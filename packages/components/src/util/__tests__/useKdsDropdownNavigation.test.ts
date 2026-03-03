import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";

import {
  type KdsDropdownNavigationOptions,
  useKdsDropdownNavigation,
} from "../useKdsDropdownNavigation";

describe("useKdsDropdownNavigation", () => {
  let props: KdsDropdownNavigationOptions;
  let clickSpy: Mock;

  beforeEach(() => {
    clickSpy = vi.fn();
    props = {
      getNextElement: vi.fn((current, direction) => {
        let index: number;
        // Indices between 0 and 9
        if (current === null) {
          index = direction === 1 ? 0 : 9;
        } else {
          index = Math.min(Math.max(current + direction, 0), 9);
        }
        return { index, onClick: () => clickSpy(index) };
      }),
      close: vi.fn(),
    };
  });

  it("sets current index to null per default", () => {
    const { currentIndex } = useKdsDropdownNavigation(props);
    expect(currentIndex.value).toBeNull();
  });

  describe("keyboard navigation", () => {
    const simulateKeydown = (
      callback: (event: KeyboardEvent) => void,
      code: string,
    ) => {
      const eventMethodsMock = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        stopImmediatePropagation: vi.fn(),
      };
      callback({ code, ...eventMethodsMock } as unknown as KeyboardEvent);
      return eventMethodsMock;
    };

    it("navigates to the next element on ArrowDown", () => {
      const { currentIndex, onKeydown } = useKdsDropdownNavigation(props);
      simulateKeydown(onKeydown, "ArrowDown");
      expect(currentIndex.value).toBe(0);
      simulateKeydown(onKeydown, "ArrowDown");
      expect(currentIndex.value).toBe(1);
    });

    it("navigates to the previous element on ArrowUp", () => {
      const { currentIndex, onKeydown } = useKdsDropdownNavigation(props);
      simulateKeydown(onKeydown, "ArrowUp");
      expect(currentIndex.value).toBe(9);
      simulateKeydown(onKeydown, "ArrowUp");
      expect(currentIndex.value).toBe(8);
    });

    it("navigates to the last element on End", () => {
      const simulatedLastIndex = 10;
      props.getLastElement = vi.fn(() => ({
        index: simulatedLastIndex,
        onClick: () => clickSpy(simulatedLastIndex),
      }));
      const { currentIndex, onKeydown } = useKdsDropdownNavigation(props);
      simulateKeydown(onKeydown, "End");
      expect(currentIndex.value).toBe(simulatedLastIndex);
      simulateKeydown(onKeydown, "Enter");
      expect(clickSpy).toHaveBeenCalledWith(simulatedLastIndex);
    });

    it("navigates to the first element on Home", () => {
      const simulatedFirstIndex = -1;
      props.getFirstElement = vi.fn(() => ({
        index: simulatedFirstIndex,
        onClick: () => clickSpy(simulatedFirstIndex),
      }));
      const { currentIndex, onKeydown } = useKdsDropdownNavigation(props);
      simulateKeydown(onKeydown, "Home");
      expect(currentIndex.value).toBe(simulatedFirstIndex);
      simulateKeydown(onKeydown, "Enter");
      expect(clickSpy).toHaveBeenCalledWith(simulatedFirstIndex);
    });

    it("calls close on Escape", () => {
      const { onKeydown } = useKdsDropdownNavigation(props);
      expect(props.close).not.toHaveBeenCalled();
      simulateKeydown(onKeydown, "Escape");
      expect(props.close).toHaveBeenCalled();
    });

    it("calls close on Tab", () => {
      const { onKeydown } = useKdsDropdownNavigation(props);
      expect(props.close).not.toHaveBeenCalled();
      simulateKeydown(onKeydown, "Tab");
      expect(props.close).toHaveBeenCalled();
    });

    it("does not call close on Tab when keepOpenedOnTab is true", () => {
      const { onKeydown } = useKdsDropdownNavigation({
        ...props,
        keepOpenedOnTab: true,
      });
      simulateKeydown(onKeydown, "Tab");
      expect(props.close).not.toHaveBeenCalled();
    });

    describe("select an item", () => {
      it("clicks on focused element on Enter", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);

        simulateKeydown(onKeydown, "ArrowDown");
        simulateKeydown(onKeydown, "Enter");
        expect(clickSpy).toHaveBeenCalledWith(0);

        simulateKeydown(onKeydown, "ArrowDown");
        simulateKeydown(onKeydown, "Enter");
        expect(clickSpy).toHaveBeenCalledWith(1);
      });

      it("clicks on focused element on Space", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);

        simulateKeydown(onKeydown, "ArrowDown");
        simulateKeydown(onKeydown, "Space");
        expect(clickSpy).toHaveBeenCalledWith(0);

        simulateKeydown(onKeydown, "ArrowDown");
        simulateKeydown(onKeydown, "Space");
        expect(clickSpy).toHaveBeenCalledWith(1);
      });

      it("does not click on Space if disableSpaceToClick is true", () => {
        const { onKeydown } = useKdsDropdownNavigation({
          ...props,
          disableSpaceToClick: true,
        });

        simulateKeydown(onKeydown, "ArrowDown");
        simulateKeydown(onKeydown, "Space");
        expect(clickSpy).not.toHaveBeenCalled();

        // make sure Enter still works
        simulateKeydown(onKeydown, "Enter");
        expect(clickSpy).toHaveBeenCalledWith(0);
      });

      it("does not trigger a click if no element is focused", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);

        simulateKeydown(onKeydown, "Enter");
        simulateKeydown(onKeydown, "Space");

        expect(clickSpy).toHaveBeenCalledTimes(0);
      });
    });

    it("allows resetting the navigation", () => {
      const { onKeydown, currentIndex, resetNavigation } =
        useKdsDropdownNavigation(props);
      simulateKeydown(onKeydown, "ArrowDown");
      expect(currentIndex.value).toBe(0);

      resetNavigation();

      expect(currentIndex.value).toBeNull();
      simulateKeydown(onKeydown, "Enter");
      expect(clickSpy).toHaveBeenCalledTimes(0);
    });

    it("allows setting an element via setElement", () => {
      const { currentIndex, setElement } = useKdsDropdownNavigation(props);
      setElement({ index: 5, onClick: () => clickSpy(5) });
      expect(currentIndex.value).toBe(5);
    });

    describe("prevent events", () => {
      const expectEventPrevented = (eventMethodsMock: {
        preventDefault: Mock;
        stopPropagation: Mock;
        stopImmediatePropagation: Mock;
      }) => {
        expect(eventMethodsMock.preventDefault).toHaveBeenCalled();
        expect(eventMethodsMock.stopPropagation).toHaveBeenCalled();
        expect(eventMethodsMock.stopImmediatePropagation).toHaveBeenCalled();
      };
      const expectEventNotPrevented = (eventMethodsMock: {
        preventDefault: Mock;
        stopPropagation: Mock;
        stopImmediatePropagation: Mock;
      }) => {
        expect(eventMethodsMock.preventDefault).not.toHaveBeenCalled();
        expect(eventMethodsMock.stopPropagation).not.toHaveBeenCalled();
        expect(
          eventMethodsMock.stopImmediatePropagation,
        ).not.toHaveBeenCalled();
      };

      it("prevents ArrowDown", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);
        expectEventPrevented(simulateKeydown(onKeydown, "ArrowDown"));
      });

      it("prevents ArrowUp", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);
        expectEventPrevented(simulateKeydown(onKeydown, "ArrowUp"));
      });

      it("prevents Enter if and only if an item is focused", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);
        expectEventNotPrevented(simulateKeydown(onKeydown, "Enter"));
        simulateKeydown(onKeydown, "ArrowDown");
        expectEventPrevented(simulateKeydown(onKeydown, "Enter"));
      });

      it("prevents Space if and only if an item is focused", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);
        expectEventNotPrevented(simulateKeydown(onKeydown, "Space"));
        simulateKeydown(onKeydown, "ArrowDown");
        expectEventPrevented(simulateKeydown(onKeydown, "Space"));
      });

      it("prevents Escape", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);
        expectEventPrevented(simulateKeydown(onKeydown, "Escape"));
      });

      it("does not prevent Tab", () => {
        const { onKeydown } = useKdsDropdownNavigation(props);
        expectEventNotPrevented(simulateKeydown(onKeydown, "Tab"));
      });
    });
  });
});
