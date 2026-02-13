import type { Ref } from "vue";
import { computed, nextTick, ref, watch } from "vue";

import { useIconHidingOnEllipsis } from "../util/useIconHidingOnEllipsis";

import type { KdsTab } from "./types";
/**
 * Computes whether icons in TabBar items should be hidden.
 *
 * Global logic: as soon as at least one text+icon item ellipsizes its label
 * (`scrollWidth > clientWidth`), icons are hidden for all text+icon items.
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
  tabs: Ref<readonly KdsTab[]>;
  /**
   * Container element that holds the tab items.
   * Used to determine whether the tab bar overflows horizontally.
   */
  containerEl: Ref<HTMLElement | null>;
}) => {
  const { shouldHideIcons: shouldHideIconsOnEllipsis, setItemEl } =
    useIconHidingOnEllipsis({
      width,
      items: tabs,
      getKey: (tab) => tab.value,
      shouldCheckItem: (tab) => Boolean(tab.icon),
      labelSelector: ".label",
      elementCtor: HTMLLabelElement,
    });

  const shouldHideIconsOnOverflow = ref(false);

  const isOverflowing = () => {
    const el = containerEl.value;
    if (!el) {
      return false;
    }

    // Use a small tolerance to avoid flickering due to sub-pixel rounding.
    return el.scrollWidth > el.clientWidth + 1;
  };

  watch(
    () => [width.value, tabs.value, containerEl.value],
    async () => {
      // First pass: with icons rendered
      shouldHideIconsOnOverflow.value = false;

      // Second pass: hide icons as soon as the bar overflows.
      await nextTick();
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
