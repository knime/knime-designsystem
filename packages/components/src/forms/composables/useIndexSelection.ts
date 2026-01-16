import type { Ref } from "vue";
import { computed } from "vue";

type KdsIndexSelectionOption = {
  id: string;
  disabled?: boolean;
  error?: boolean;
  [x: string]: unknown;
};

export const useIndexSelection = ({
  selectedId,
  options,
  globalDisable,
  globalError,
  optionContainer,
}: {
  selectedId: Ref<string | null | undefined>;
  options: Ref<readonly KdsIndexSelectionOption[]>;
  globalDisable?: Ref<boolean>;
  globalError?: Ref<boolean>;
  optionContainer?: Ref<HTMLElement | null>;
}) => {
  const focusOptionAtIndex = (index: number) => {
    const radios = optionContainer?.value?.querySelectorAll<HTMLButtonElement>(
      'button[role="radio"]',
    );
    radios?.[index]?.focus();
  };

  const isIndexDisabled = (index: number) =>
    globalDisable?.value || options.value[index]?.disabled === true;

  const hasError = computed(
    () => globalError?.value || options.value.some((o) => o.error),
  );

  const selectedIndex = computed(() =>
    options.value.findIndex((o) => o.id === selectedId.value),
  );

  const firstEnabledIndex = computed(() =>
    options.value.findIndex((_, index) => !isIndexDisabled(index)),
  );

  const tabIndexForOption = (index: number) => {
    if (isIndexDisabled(index)) {
      return undefined;
    }

    if (selectedIndex.value >= 0) {
      return selectedIndex.value === index ? 0 : -1;
    }

    return firstEnabledIndex.value === index ? 0 : -1;
  };

  const selectIndex = (index: number) => {
    if (isIndexDisabled(index)) {
      return;
    }

    selectedId.value = options.value[index]?.id;
  };

  const nextEnabledIndex = (startIndex: number, direction: 1 | -1) => {
    const total = options.value.length;
    if (total === 0) {
      return -1;
    }

    let index = startIndex;
    for (let i = 0; i < total; i++) {
      index = (index + direction + total) % total;
      if (!isIndexDisabled(index)) {
        return index;
      }
    }

    return -1;
  };

  const moveSelection = (currentIndex: number, direction: 1 | -1) => {
    const nextIndex = nextEnabledIndex(currentIndex, direction);

    if (nextIndex < 0) {
      return;
    }

    selectIndex(nextIndex);
    focusOptionAtIndex(nextIndex);
  };

  const goToFirstEnabled = () => {
    const nextIndex = firstEnabledIndex.value;
    if (nextIndex < 0) {
      return;
    }

    selectIndex(nextIndex);
    focusOptionAtIndex(nextIndex);
  };

  const goToLastEnabled = () => {
    for (let i = options.value.length - 1; i >= 0; i--) {
      if (!isIndexDisabled(i)) {
        selectIndex(i);
        focusOptionAtIndex(i);
        break;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent, currentIndex: number) => {
    if (globalDisable?.value) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight": {
        event.preventDefault();
        moveSelection(currentIndex, 1);
        return;
      }

      case "ArrowUp":
      case "ArrowLeft": {
        event.preventDefault();
        moveSelection(currentIndex, -1);
        return;
      }

      case "Home": {
        event.preventDefault();
        goToFirstEnabled();
        return;
      }

      case "End": {
        event.preventDefault();
        goToLastEnabled();
        return;
      }

      case " ":
      case "Enter": {
        event.preventDefault();
        selectIndex(currentIndex);
      }
    }
  };

  return {
    hasError,
    selectedIndex,
    tabIndexForOption,
    handleClick: selectIndex,
    handleKeyDown,
  };
};
