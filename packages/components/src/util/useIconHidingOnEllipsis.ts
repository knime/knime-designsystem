import type { Ref } from "vue";
import { nextTick, onBeforeUpdate, ref, shallowRef, watch } from "vue";

import { elementOverflowsHorizontally } from "./useKdsIsTruncated";

type IconHidingOnEllipsisParams<
  TItem,
  TKey extends string | number,
  TEl extends HTMLElement,
> = {
  /**
   * Potentially available width to render items
   */
  width: Ref<number>;
  items: Ref<readonly TItem[]>;
  getKey: (item: TItem) => TKey;
  shouldCheckItem: (item: TItem) => boolean;
  labelSelector: string;
  elementCtor: new (...args: never[]) => TEl;
};

/**
 * Computes whether icons in items should be hidden.
 *
 * Global logic: as soon as at least one text+icon item ellipsizes its label
 * (`scrollWidth > clientWidth`), icons are hidden for all text+icon items.
 */
export const useIconHidingOnEllipsis = <
  TItem,
  TKey extends string | number,
  TEl extends HTMLElement,
>({
  width,
  items,
  getKey,
  shouldCheckItem,
  labelSelector,
  elementCtor,
}: IconHidingOnEllipsisParams<TItem, TKey, TEl>) => {
  const itemEls = shallowRef<Map<TKey, TEl>>(new Map());

  onBeforeUpdate(() => {
    itemEls.value = new Map();
  });

  const setItemEl = (key: TKey, el: unknown) => {
    const elementToRegister =
      el && typeof el === "object" && "$el" in el
        ? (el as { $el: unknown }).$el
        : el;

    if (elementToRegister instanceof elementCtor) {
      itemEls.value.set(key, elementToRegister);
    }
  };

  const shouldHideIcons = ref(false);

  const hasLabelEllipsis = (key: TKey) => {
    const el = itemEls.value.get(key);
    if (!el) {
      return false;
    }

    const label = el.querySelector<HTMLElement>(labelSelector);
    return elementOverflowsHorizontally(label);
  };

  const anyItemHasEllipsis = () =>
    items.value.some((item) => {
      if (!shouldCheckItem(item)) {
        return false;
      }

      return hasLabelEllipsis(getKey(item));
    });

  watch(
    () => [width.value, items.value],
    async () => {
      // First pass: try rendering icons
      shouldHideIcons.value = false;

      // Second pass: hide icons when width overflowed.
      await nextTick();
      shouldHideIcons.value = anyItemHasEllipsis();
    },
    {
      immediate: true,
    },
  );

  return {
    shouldHideIcons,
    setItemEl,
  };
};
