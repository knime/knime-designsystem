import type { Ref } from "vue";
import { computed } from "vue";

export const useIndexSelection = <TId extends string>({
  disabled,
  optionIds,
  selectedId,
  focusOptionAtIndex,
}: {
  disabled: Ref<boolean>;
  optionIds: Ref<readonly TId[]>;
  selectedId: Ref<TId | null | undefined>;
  focusOptionAtIndex: (index: number) => void;
}) => {
  const selectedIndex = computed(() =>
    optionIds.value.findIndex((id) => id === selectedId.value),
  );

  const tabIndexForOption = (index: number) => {
    if (disabled.value) {
      return undefined;
    }

    if (selectedIndex.value >= 0) {
      return selectedIndex.value === index ? 0 : -1;
    }

    return index === 0 ? 0 : -1;
  };

  const selectIndex = (index: number) => {
    selectedId.value = optionIds.value[index];
  };

  const nextEnabledIndex = (startIndex: number, direction: 1 | -1) =>
    (startIndex + direction + optionIds.value.length) % optionIds.value.length;

  const moveSelection = (currentIndex: number, direction: 1 | -1) => {
    const nextIndex = nextEnabledIndex(currentIndex, direction);
    selectIndex(nextIndex);
    focusOptionAtIndex(nextIndex);
  };

  const goToFirstEnabled = () => {
    selectIndex(0);
    focusOptionAtIndex(0);
  };

  const goToLastEnabled = () => {
    const lastIndex = optionIds.value.length - 1;
    selectIndex(lastIndex);
    focusOptionAtIndex(lastIndex);
  };

  const handleKeyDown = (event: KeyboardEvent, currentIndex: number) => {
    if (disabled.value) {
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
    selectedIndex,
    tabIndexForOption,
    handleClickOnIndex: selectIndex,
    handleKeyDown,
  };
};
