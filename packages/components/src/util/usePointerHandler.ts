import { ref } from "vue";

export const usePointerHandler = (
  updateFromEvent: (event: PointerEvent) => void,
) => {
  const activePointerId = ref<number | null>(null);

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) {
      return;
    }

    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    activePointerId.value = event.pointerId;
    target.setPointerCapture(event.pointerId);
    updateFromEvent(event);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (activePointerId.value !== event.pointerId) {
      return;
    }

    updateFromEvent(event);
  };

  const endPointerInteraction = (event: PointerEvent) => {
    if (activePointerId.value !== event.pointerId) {
      return;
    }

    const target = event.currentTarget;
    if (
      target instanceof HTMLElement &&
      target.hasPointerCapture(event.pointerId)
    ) {
      target.releasePointerCapture(event.pointerId);
    }

    activePointerId.value = null;
  };

  return {
    activePointerId,
    onPointerDown,
    onPointerMove,
    onPointerUp: endPointerInteraction,
  };
};
