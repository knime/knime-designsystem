import { type Ref, ref, watchEffect } from "vue";

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

  watchEffect((onCleanup) => {
    const el = elementRef.value;

    // Always compute the current truncation state when the element changes.
    checkTruncation();

    if (!el) {
      return;
    }

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);

    onCleanup(() => observer.disconnect());
  });

  return { isTruncated };
}
