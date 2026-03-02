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

  // Observes direct child and text-node changes only — does not detect
  // mutations in nested descendants (subtree is intentionally omitted).
  useMutationObserver(elementRef, checkTruncation, {
    childList: true,
    characterData: true,
  });

  return { isTruncated };
}
