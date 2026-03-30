import { type Ref, computed } from "vue";

import type { KdsSortableListBoxOption } from "./types";

type UseSortableListBoxReorderOptions = {
  orderedIds: Ref<string[]>;
  selection: Ref<string[]>;
  disabled: Ref<boolean>;
};

export const useSortableListBoxReorder = ({
  orderedIds,
  selection,
  disabled,
}: UseSortableListBoxReorderOptions) => {
  const selectedIndices = computed(() => {
    const selected = new Set(selection.value);
    return orderedIds.value
      .map((id, i) => ({ id, index: i }))
      .filter((v) => selected.has(v.id))
      .map((v) => v.index);
  });

  const canMoveUp = computed(
    () =>
      !disabled.value &&
      selectedIndices.value.length > 0 &&
      selectedIndices.value[0] > 0,
  );

  const canMoveDown = computed(
    () =>
      !disabled.value &&
      selectedIndices.value.length > 0 &&
      selectedIndices.value[selectedIndices.value.length - 1] <
        orderedIds.value.length - 1,
  );

  const reorder = (direction: "up" | "down" | "top" | "bottom"): string[] => {
    const ids = [...orderedIds.value];
    const indices = selectedIndices.value;
    const movingIds = indices.map((i) => ids[i]);
    const remaining = ids.filter((_, i) => !indices.includes(i));

    let insertAt: number;
    if (direction === "top") {
      insertAt = 0;
    } else if (direction === "bottom") {
      insertAt = remaining.length;
    } else if (direction === "up") {
      insertAt = Math.max(0, indices[0] - 1);
    } else {
      insertAt = Math.min(
        remaining.length,
        indices[indices.length - 1] - indices.length + 2,
      );
    }

    remaining.splice(insertAt, 0, ...movingIds);
    return remaining;
  };

  const sortByText = (
    ascending: boolean,
    optionLookup: Map<string, KdsSortableListBoxOption>,
  ): string[] => {
    const sorted = [...orderedIds.value].sort((a, b) => {
      const textA = optionLookup.get(a)?.text ?? a;
      const textB = optionLookup.get(b)?.text ?? b;
      return ascending
        ? textA.localeCompare(textB)
        : textB.localeCompare(textA);
    });
    return sorted;
  };

  return {
    selectedIndices,
    canMoveUp,
    canMoveDown,
    reorder,
    sortByText,
  };
};
