import { type Ref, onWatcherCleanup, ref, watchEffect } from "vue";

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

  const checkTruncation = () => {
    const el = elementRef.value;
    if (!el) {
      isTruncated.value = false;
      return;
    }

    isTruncated.value = el.scrollWidth > el.clientWidth;
  };

  watchEffect(() => {
    const el = elementRef.value;

    // Always compute the current truncation state when the element changes.
    checkTruncation();

    if (!el) {
      return;
    }

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);

    onWatcherCleanup(() => observer.disconnect());
  });

  return { isTruncated };
}
