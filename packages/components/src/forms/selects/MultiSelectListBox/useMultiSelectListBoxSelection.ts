import {
  type Ref,
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

import type { KdsMultiSelectListBoxOption } from "./types";

const CLICK_META_KEY_TIMEOUT = 250;

type UseMultiSelectListBoxSelectionOptions = {
  /** Writable model ref for the selected ids */
  modelValue: Ref<string[]>;
  /** All selectable values (including the optional bottom value) */
  allValues: Ref<KdsMultiSelectListBoxOption[]>;
  /** Whether the component is disabled */
  disabled: Ref<boolean>;
  /** Generate a DOM id for an option id (used for aria-activedescendant) */
  generateOptionId: (itemId: string) => string;
  /** Callback to scroll the list so that the given index is visible */
  scrollToIndex: (index: number) => void;
};

export const useMultiSelectListBoxSelection = ({
  modelValue,
  allValues,
  disabled,
  generateOptionId,
  scrollToIndex,
}: UseMultiSelectListBoxSelectionOptions) => {
  const currentKeyNavIndex = ref(-1);
  const isKeyboardNavigating = ref(false);
  const shiftStartIndex = ref(-1);
  const draggingStartIndex = ref(-1);
  const draggingInverseMode = ref(false);

  // Clamp keyboard nav index when the list shrinks
  watch(
    () => allValues.value.length,
    (length) => {
      const maxIndex = length - 1;
      if (maxIndex < 0) {
        currentKeyNavIndex.value = -1;
      } else {
        currentKeyNavIndex.value = Math.min(
          Math.max(currentKeyNavIndex.value, 0),
          maxIndex,
        );
      }
    },
  );

  const isCurrentValue = (id: string) => modelValue.value.includes(id);

  const activeDescendantId = computed(() => {
    if (!isKeyboardNavigating.value) {
      return undefined;
    }
    const item = allValues.value[currentKeyNavIndex.value];
    return item ? generateOptionId(item.id) : undefined;
  });

  // --- Selection mutations ---

  const setSelectedNoShiftReset = (values: string[]) => {
    modelValue.value = values;
  };

  const setSelected = (values: string[]) => {
    shiftStartIndex.value = -1;
    setSelectedNoShiftReset(values);
  };

  const toggleSelection = (value: string) => {
    if (modelValue.value.includes(value)) {
      setSelected(modelValue.value.filter((v) => v !== value));
    } else {
      setSelected([...modelValue.value, value]);
    }
  };

  const setSelectedToIndex = (index: number) => {
    const item = allValues.value[index];
    if (item) {
      setSelected([item.id]);
    }
  };

  const getPossibleValuesInSection = (first: number, second: number) => {
    const start = Math.max(0, Math.min(first, second));
    const end = Math.max(0, first, second);
    return allValues.value.slice(start, end + 1).map((x) => x.id);
  };

  // --- Click handlers ---

  const handleCtrlClick = (value: string, index: number) => {
    currentKeyNavIndex.value = index;
    toggleSelection(value);
  };

  let metaClickTimer: ReturnType<typeof setTimeout> | null = null;

  const cancelPendingMetaClick = () => {
    if (metaClickTimer !== null) {
      clearTimeout(metaClickTimer);
      metaClickTimer = null;
    }
  };

  const debouncedHandleCtrlClick = (value: string, index: number) => {
    cancelPendingMetaClick();
    metaClickTimer = setTimeout(() => {
      handleCtrlClick(value, index);
      metaClickTimer = null;
    }, CLICK_META_KEY_TIMEOUT);
  };

  const handleClick = (event: MouseEvent, value: string, index: number) => {
    if (disabled.value) {
      return;
    }
    isKeyboardNavigating.value = false;
    cancelPendingMetaClick();
    event.preventDefault();
    if (event.metaKey) {
      debouncedHandleCtrlClick(value, index);
      return;
    }
    if (event.ctrlKey) {
      handleCtrlClick(value, index);
      return;
    }
    if (event.shiftKey) {
      setSelectedNoShiftReset(
        getPossibleValuesInSection(currentKeyNavIndex.value, index),
      );
      return;
    }
    currentKeyNavIndex.value = index;
    setSelected([value]);
  };

  // --- Drag handlers ---

  const getDataOptionIndex = (target: HTMLElement): string | undefined =>
    target.closest<HTMLElement>("[data-option-index]")?.dataset.optionIndex;

  const onStartDrag = (e: MouseEvent) => {
    if (disabled.value || e.shiftKey) {
      return;
    }
    isKeyboardNavigating.value = false;
    if (e.ctrlKey || e.metaKey) {
      draggingInverseMode.value = true;
    }
    const index = getDataOptionIndex(e.target as HTMLElement);
    if (index !== undefined) {
      draggingStartIndex.value = Number(index);
    }
  };

  const onDrag = (e: MouseEvent) => {
    if (draggingStartIndex.value === -1) {
      return;
    }
    const dataIndex = getDataOptionIndex(e.target as HTMLElement);
    if (dataIndex === undefined) {
      return;
    }
    let sectionValues = getPossibleValuesInSection(
      draggingStartIndex.value,
      Number(dataIndex),
    );
    if (draggingInverseMode.value) {
      sectionValues = modelValue.value.filter(
        (x) => !sectionValues.includes(x),
      );
    }
    setSelected(sectionValues);
  };

  const onStopDrag = () => {
    draggingStartIndex.value = -1;
    draggingInverseMode.value = false;
  };

  // --- Keyboard navigation ---

  const isOutOfRange = (index: number) =>
    index < 0 || index >= allValues.value.length;

  const navigateTo = (next: number, select: "single" | "shift") => {
    if (select === "shift") {
      if (shiftStartIndex.value === -1) {
        shiftStartIndex.value = Math.max(0, currentKeyNavIndex.value);
      }
      setSelectedNoShiftReset(
        getPossibleValuesInSection(shiftStartIndex.value, next),
      );
    } else {
      setSelectedToIndex(next);
    }
    currentKeyNavIndex.value = next;
    scrollToIndex(next);
  };

  const onArrowDown = () => {
    if (disabled.value || isOutOfRange(currentKeyNavIndex.value + 1)) {
      return;
    }
    isKeyboardNavigating.value = true;
    navigateTo(currentKeyNavIndex.value + 1, "single");
  };

  const onArrowUp = () => {
    if (disabled.value || isOutOfRange(currentKeyNavIndex.value - 1)) {
      return;
    }
    isKeyboardNavigating.value = true;
    navigateTo(currentKeyNavIndex.value - 1, "single");
  };

  const onArrowDownShift = () => {
    if (disabled.value || isOutOfRange(currentKeyNavIndex.value + 1)) {
      return;
    }
    isKeyboardNavigating.value = true;
    navigateTo(currentKeyNavIndex.value + 1, "shift");
  };

  const onArrowUpShift = () => {
    if (disabled.value || isOutOfRange(currentKeyNavIndex.value - 1)) {
      return;
    }
    isKeyboardNavigating.value = true;
    navigateTo(currentKeyNavIndex.value - 1, "shift");
  };

  const onEndKey = () => {
    if (disabled.value || allValues.value.length === 0) {
      return;
    }
    isKeyboardNavigating.value = true;
    navigateTo(allValues.value.length - 1, "single");
  };

  const onHomeKey = () => {
    if (disabled.value || allValues.value.length === 0) {
      return;
    }
    isKeyboardNavigating.value = true;
    navigateTo(0, "single");
  };

  const onEndKeyShift = () => {
    if (disabled.value || allValues.value.length === 0) {
      return;
    }
    isKeyboardNavigating.value = true;
    navigateTo(allValues.value.length - 1, "shift");
  };

  const onHomeKeyShift = () => {
    if (disabled.value || allValues.value.length === 0) {
      return;
    }
    isKeyboardNavigating.value = true;
    navigateTo(0, "shift");
  };

  const onCtrlA = () => {
    if (!disabled.value) {
      isKeyboardNavigating.value = true;
      setSelected(allValues.value.map((x) => x.id));
    }
  };

  const onBlur = () => {
    isKeyboardNavigating.value = false;
  };

  // --- Lifecycle ---

  onMounted(() => {
    globalThis.addEventListener("mouseup", onStopDrag);
    const lastItem = modelValue.value[modelValue.value.length - 1];
    if (lastItem) {
      const idx = allValues.value.findIndex((x) => x.id === lastItem);
      if (idx >= 0) {
        currentKeyNavIndex.value = idx;
      }
    }
  });

  onBeforeUnmount(() => {
    globalThis.removeEventListener("mouseup", onStopDrag);
    cancelPendingMetaClick();
  });

  return {
    currentKeyNavIndex,
    isKeyboardNavigating,
    isCurrentValue,
    activeDescendantId,
    handleClick,
    onStartDrag,
    onDrag,
    onArrowDown,
    onArrowUp,
    onArrowDownShift,
    onArrowUpShift,
    onEndKey,
    onHomeKey,
    onEndKeyShift,
    onHomeKeyShift,
    onCtrlA,
    onBlur,
  };
};
