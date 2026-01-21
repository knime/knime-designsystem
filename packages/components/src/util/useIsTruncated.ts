import { type Ref, onMounted, onUnmounted, ref, watchEffect } from "vue";

export function useIsTruncated(elementRef: Ref<HTMLElement | null>) {
  const isTruncated = ref(false);

  const checkTruncation = () => {
    if (elementRef.value) {
      isTruncated.value =
        elementRef.value.scrollWidth > elementRef.value.clientWidth;
    }
  };

  onMounted(() => {
    const observer = new ResizeObserver(checkTruncation);
    if (elementRef.value) {
      observer.observe(elementRef.value);
    }
    onUnmounted(() => observer.disconnect());
  });

  watchEffect(checkTruncation);

  return { isTruncated };
}
