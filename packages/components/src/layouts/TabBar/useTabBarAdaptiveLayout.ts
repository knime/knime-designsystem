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
 * Adapts the tab bar layout when space is constrained:
 *
 * 1. **Icon hiding**: icons are removed first to free up space for labels.
 * 2. **Ellipsis**: labels shrink down to `min(natural label width, minTabWidth)`,
 *    showing an ellipsis when they are larger.
 */
export const useTabBarAdaptiveLayout = ({
  width,
  tabs,
  containerEl,
  fullWidth,
  minTabWidth,
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
  /**
   * Whether the tab bar is in full-width mode.
   * When true, per-tab min-width adjustments are skipped.
   */
  fullWidth?: Ref<boolean>;
  /**
   * CSS custom property name for the minimum tab width (e.g. "--kds-dimension-component-width-4x").
   * Used both for CSS min-width (via v-bind) and as the measurement floor.
   * When omitted, per-tab min-width adjustments are skipped.
   */
  minTabWidth?: string;
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

  /**
   * Sets per-tab min-width so that short labels (e.g. "A") stay at their
   * natural width while long labels can shrink down to the token floor.
   * CSS cannot express `min(intrinsic-size, token)`, so we measure here.
   */
  const updateTabMinWidths = () => {
    if (fullWidth?.value || !minTabWidth) {
      return;
    }
    const el = containerEl.value;
    if (!el) {
      return;
    }
    const tokenPx = parseFloat(
      getComputedStyle(el).getPropertyValue(minTabWidth),
    );
    if (Number.isNaN(tokenPx) || tokenPx <= 0) {
      return;
    }

    const entries = [...itemEls.value.entries()];
    const tabsByKey = new Map(tabs.value.map((tab) => [tab.value, tab]));

    // Temporarily make tabs non-shrinkable with no min-width floor
    // and hide icon accessories so we measure label-only content widths
    // (only icons get hidden before ellipsis; live status stays visible)
    for (const [key, tabEl] of entries) {
      tabEl.style.flexShrink = "0";
      tabEl.style.minWidth = "0";
      if (tabsByKey.get(key)?.accessory?.type === "icon") {
        const accessory = tabEl.firstElementChild;
        if (
          accessory instanceof HTMLElement &&
          !accessory.classList.contains("kds-tab-label")
        ) {
          accessory.style.display = "none";
        }
      }
    }
    const naturalWidths = entries.map(
      ([, tabEl]) => tabEl.getBoundingClientRect().width,
    );

    // Restore flex-shrink, accessory visibility; set min-width per tab
    for (let i = 0; i < entries.length; i++) {
      const [key, tabEl] = entries[i];
      tabEl.style.flexShrink = "";
      if (tabsByKey.get(key)?.accessory?.type === "icon") {
        const accessory = tabEl.firstElementChild;
        if (
          accessory instanceof HTMLElement &&
          !accessory.classList.contains("kds-tab-label")
        ) {
          accessory.style.display = "";
        }
      }
      // Short tabs: keep natural width so they don't inflate to the token value
      // Long tabs: clear inline style so CSS min-width (token) applies as the floor
      tabEl.style.minWidth =
        naturalWidths[i] < tokenPx ? `${naturalWidths[i]}px` : "";
    }
  };

  watch(
    () => [width.value, tabs.value, containerEl.value],
    async () => {
      // First pass: with icons rendered
      shouldHideIconsOnEllipsis.value = false;
      shouldHideIconsOnOverflow.value = false;

      // Second pass: hide icons as soon as any label is truncated or the bar overflows.
      await nextTick();
      updateTabMinWidths();
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
    minTabWidth,
  };
};
