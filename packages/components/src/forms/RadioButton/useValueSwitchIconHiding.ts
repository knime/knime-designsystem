import type { Ref } from "vue";
import { nextTick, onBeforeUpdate, ref, watch } from "vue";

import type { KdsValueSwitchOption } from "./types";
/**
 * Computes whether icons in ValueSwitch items should be hidden.
 *
 * Global logic: as soon as at least one text+icon item ellipsizes its label
 * (`scrollWidth > clientWidth`), icons are hidden for all text+icon items.
 * Icon-only items are never affected.
 */
export const useValueSwitchIconHiding = ({
  width,
  options,
}: {
  /**
   * Potentially available width to render options
   */
  width: Ref<number>;
  options: Ref<readonly KdsValueSwitchOption[]>;
}) => {
  const itemEls = ref(new Map<string, HTMLButtonElement>());

  onBeforeUpdate(() => {
    itemEls.value = new Map();
  });

  const setItemEl = (id: string, el: unknown) => {
    const elementToRegister =
      el && typeof el === "object" && "$el" in el
        ? (el as { $el: unknown }).$el
        : el;

    if (elementToRegister instanceof HTMLButtonElement) {
      itemEls.value.set(id, elementToRegister);
    }
  };

  const shouldHideIcons = ref(false);

  const isLabelEllipsized = (id: string) => {
    const el = itemEls.value.get(id);
    if (!el) {
      return false;
    }

    const label = el.querySelector<HTMLElement>(".option-label");
    if (!label) {
      return false;
    }

    return label.scrollWidth > label.clientWidth;
  };

  const hasEllipsizedTextIconItem = () =>
    options.value.some((option) => {
      if (!option.text) {
        return false;
      }

      if (!option.leadingIcon && !option.trailingIcon) {
        return false;
      }

      return isLabelEllipsized(option.id);
    });

  watch(
    () => [width.value, options.value],
    async () => {
      // First pass: try rendering icons
      shouldHideIcons.value = false;

      // Second pass: hide icons when width overflowed.
      await nextTick();
      shouldHideIcons.value = hasEllipsizedTextIconItem();
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
