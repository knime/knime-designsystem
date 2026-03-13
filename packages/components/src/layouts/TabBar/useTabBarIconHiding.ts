import type { Ref } from "vue";
import {
  computed,
  nextTick,
  onBeforeUpdate,
  ref,
  shallowRef,
  watch,
} from "vue";

import { elementOverflowsHorizontally } from "../../util/useKdsIsTruncated";

import type { KdsTabBarItem } from "./types";
/**
 * Computes whether icons in TabBar items should be hidden.
 *
 * Global logic: as soon as at least one text+icon item ellipsizes its label
 * (`scrollWidth > clientWidth`), or the tab bar overflows horizontally,
 * icons are hidden for all text+icon items.
 */
export const useTabBarIconHiding = ({
  width,
  tabs,
  containerEl,
}: {
  /**
   * Potentially available width to render tabs
   */
  width: Ref<number>;
  tabs: Ref<readonly KdsTabBarItem[]>;
  /**
   * Container element that holds the tab items.
   * Used to determine whether the tab bar overflows horizontally.
   */
  containerEl: Ref<HTMLElement | null>;
}) => {
  const itemEls = shallowRef<Map<string | number, HTMLButtonElement>>(
    new Map(),
  );

  onBeforeUpdate(() => {
    itemEls.value = new Map();
  });

  const setItemEl = (key: string | number, el: unknown) => {
    const elementToRegister =
      el && typeof el === "object" && "$el" in el
        ? (el as { $el: unknown }).$el
        : el;

    if (elementToRegister instanceof HTMLButtonElement) {
      itemEls.value.set(key, elementToRegister);
    }
  };

  const hasLabelEllipsis = (key: string | number) => {
    const el = itemEls.value.get(key);
    if (!el) {
      return false;
    }

    const label = el.querySelector<HTMLElement>(".kds-tab-label");
    return elementOverflowsHorizontally(label);
  };

  const anyItemHasEllipsis = () =>
    tabs.value.some((tab) => {
      if (tab.accessory?.type !== "icon") {
        return false;
      }

      return hasLabelEllipsis(tab.value);
    });

  const isOverflowing = () => {
    const el = containerEl.value;
    if (!el) {
      return false;
    }

    // Use a small tolerance to avoid flickering due to sub-pixel rounding.
    return el.scrollWidth > el.clientWidth + 1;
  };

  const shouldHideIconsOnEllipsis = ref(false);
  const shouldHideIconsOnOverflow = ref(false);

  watch(
    () => [width.value, tabs.value, containerEl.value],
    async () => {
      // First pass: with icons rendered
      shouldHideIconsOnEllipsis.value = false;
      shouldHideIconsOnOverflow.value = false;

      // Second pass: hide icons as soon as any label is truncated or the bar overflows.
      await nextTick();
      shouldHideIconsOnEllipsis.value = anyItemHasEllipsis();
      shouldHideIconsOnOverflow.value = isOverflowing();
    },
    { immediate: true },
  );

  const shouldHideIcons = computed(
    () => shouldHideIconsOnOverflow.value || shouldHideIconsOnEllipsis.value,
  );

  return {
    shouldHideIcons,
    setItemEl,
  };
};
