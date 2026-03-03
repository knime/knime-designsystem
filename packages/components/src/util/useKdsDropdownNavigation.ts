import { type Ref, readonly, ref } from "vue";

const preventEvent = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

export type KdsDropdownNavigationElement = {
  index: number;
  onClick: () => unknown;
};

export type KdsDropdownNavigationOptions = {
  /**
   * callback for retrieving the next clickable item and an index
   */
  getNextElement(
    current: number | null,
    direction: -1 | 1,
  ): KdsDropdownNavigationElement;
  /**
   * callback for retrieving the first clickable item and an index.
   * When provided, navigating to this item via the home key is possible
   */
  getFirstElement?(): KdsDropdownNavigationElement;
  /**
   * callback for retrieving the last clickable item and an index.
   * When provided, navigating to this item via the end key is possible
   */
  getLastElement?(): KdsDropdownNavigationElement;
  /**
   * method called when the dropdown is to be closed
   */
  close(): void;
  /**
   * disables use of Space key to click on item
   */
  disableSpaceToClick?: boolean;
  /**
   * Per default, the dropdown will trigger close when tabbing out of it.
   * Set this to true to keep the dropdown open when tabbing
   */
  keepOpenedOnTab?: boolean;
};

type KdsDropdownNavigationOutput = {
  /**
   * current index of the current element. null if no element is selected
   */
  currentIndex: Readonly<Ref<number | null>>;
  /**
   * unsets the current element and its index
   */
  resetNavigation: () => void;
  /**
   * callback to be triggered on keydown
   */
  onKeydown: (event: KeyboardEvent) => void;
  /**
   * sets the current element and its index
   */
  setElement: (item: KdsDropdownNavigationElement) => void;
};

export function useKdsDropdownNavigation({
  getNextElement,
  getFirstElement,
  getLastElement,
  close,
  disableSpaceToClick,
  keepOpenedOnTab,
}: KdsDropdownNavigationOptions): KdsDropdownNavigationOutput {
  const currentIndex: Ref<number | null> = ref(null);

  const noop = () => {
    // Empty function that doesn't do anything. Used as the default value
    // to initialize or reset the `currentElementClickHandler`
  };

  let currentElementClickHandler: KdsDropdownNavigationElement["onClick"] =
    noop;

  const resetNavigation = () => {
    currentIndex.value = null;
    currentElementClickHandler = noop;
  };

  const setElement = (item: KdsDropdownNavigationElement) => {
    currentIndex.value = item.index;
    currentElementClickHandler = item.onClick;
  };

  const setNextElement = (step: -1 | 1) => {
    setElement(getNextElement(currentIndex.value, step));
  };

  const resetAndClose = () => {
    resetNavigation();
    close();
  };

  const onKeydown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowDown":
        preventEvent(event);
        setNextElement(1);
        break;
      case "ArrowUp":
        preventEvent(event);
        setNextElement(-1);
        break;
      case "Enter":
      case "Space": {
        const isSpace = event.code === "Space";
        const hasCurrentIndex = currentIndex.value !== null;
        const canClick = !isSpace || !disableSpaceToClick;

        if (hasCurrentIndex && canClick) {
          preventEvent(event);
          currentElementClickHandler();
        }
        break;
      }
      case "Home":
        if (getFirstElement) {
          setElement(getFirstElement());
        }
        break;
      case "End":
        if (getLastElement) {
          setElement(getLastElement());
        }
        break;
      case "Escape":
        preventEvent(event);
        resetAndClose();
        break;
      case "Tab":
        if (!keepOpenedOnTab) {
          resetAndClose();
        }
        break;
    }
  };

  return {
    onKeydown,
    currentIndex: readonly(currentIndex),
    resetNavigation,
    setElement,
  };
}
