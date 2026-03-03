import { type Ref, ref } from "vue";
import { useMutationObserver, useResizeObserver } from "@vueuse/core";

export function elementOverflowsHorizontally(
  element: HTMLElement | null,
): boolean {
  if (!element) {
    return false;
  }
  return element.scrollWidth > element.clientWidth;
}

export function elementOverflowsVertically(
  element: HTMLElement | null,
): boolean {
  if (!element) {
    return false;
  }
  return element.scrollHeight > element.clientHeight;
}

/**
 * Tracks whether the content of an element is visually truncated.
 *
 * Detects both horizontal truncation (e.g. `text-overflow: ellipsis`)
 * and vertical truncation (e.g. `-webkit-line-clamp`).
 *
 * This can be used to set tooltips or other UI affordances when text is cut off.
 * Changing the size of the provided element based on this composable may result in an infinite loop!
 *
 * @param elementRef - A ref pointing to the element that might be truncated.
 * @returns An object containing a reactive `isTruncated` ref.
 */
export function useKdsIsTruncated(elementRef: Ref<HTMLElement | null>) {
  const isTruncated = ref(false);

  const checkTruncation = () => {
    isTruncated.value =
      elementOverflowsHorizontally(elementRef.value) ||
      elementOverflowsVertically(elementRef.value);
  };

  useResizeObserver(elementRef, checkTruncation);

  // Observe changes to the element's subtree, including text-node updates,
  // so content changes without size changes still re-check truncation.
  useMutationObserver(elementRef, checkTruncation, {
    childList: true,
    characterData: true,
    subtree: true,
    // Also observe attribute changes (especially class/style) that can affect
    // truncation without necessarily triggering a resize event.
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  return { isTruncated };
}
