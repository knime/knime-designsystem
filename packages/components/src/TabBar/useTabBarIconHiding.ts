import type { Ref } from "vue";

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
}: {
  /**
   * Potentially available width to render tabs
   */
  width: Ref<number>;
  tabs: Ref<readonly KdsTab[]>;
}) => {
  const { shouldHideIcons, setItemEl } = useIconHidingOnEllipsis({
    width,
    items: tabs,
    getKey: (tab) => tab.value,
    shouldCheckItem: (tab) => Boolean(tab.icon),
    labelSelector: ".label",
    elementCtor: HTMLLabelElement,
  });

  return {
    shouldHideIcons,
    setItemEl,
  };
};
