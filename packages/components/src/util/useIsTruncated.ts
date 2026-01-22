import { type Ref, ref } from "vue";
import { useResizeObserver } from "@vueuse/core";

export function elementOverflowsHorizontally(
  element: HTMLElement | null,
): boolean {
  if (!element) {
    return false;
  }
  return element.scrollWidth > element.clientWidth;
}

/**
 * Tracks whether the content of a single-line element is visually truncated.
 *
 * This can be used to set tooltips or other UI affordances when text is cut off.
 * Changing the width of the provided element based on this composable may result in an infinite loop!
 *
 * Note: This is intended for horizontal truncation (e.g. `text-overflow: ellipsis`).
 * It does not detect multi-line clamping.
 *
 * @param elementRef - A ref pointing to the element that might be truncated.
 * @returns An object containing a reactive `isTruncated` ref.
 */
export function useIsTruncated(elementRef: Ref<HTMLElement | null>) {
  const isTruncated = ref(false);

  useResizeObserver(elementRef, () => {
    isTruncated.value = elementOverflowsHorizontally(elementRef.value);
  });

  return { isTruncated };
}
