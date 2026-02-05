import { nextTick, useId, watch, watchEffect } from "vue";
import type { ComponentPublicInstance, Ref } from "vue";

import { kdsPopoverPlacements } from "./constants";
import type { KdsPopoverPlacement } from "./types";

type MaybeElement = HTMLElement | ComponentPublicInstance | null;

const resolveElement = (el: MaybeElement): HTMLElement | null => {
  if (!el) {
    return null;
  }

  // Vue component instance: use root element
  const maybeInstance = el as ComponentPublicInstance & { $el?: unknown };
  const candidate = maybeInstance.$el ?? el;

  return candidate instanceof HTMLElement ? candidate : null;
};

const setOrRemoveAttr = (
  el: MaybeElement,
  name: string,
  value: string | boolean | undefined,
) => {
  const element = resolveElement(el);
  if (!element) {
    return;
  }

  if (value === undefined || value === false) {
    element.removeAttribute(name);
    return;
  }

  element.setAttribute(name, value === true ? "" : String(value));
};

const setStyleProperty = (
  el: MaybeElement,
  property: string,
  value: string | null,
) => {
  const element = resolveElement(el);
  if (!element) {
    return;
  }

  if (value === null) {
    element.style.removeProperty(property);
    return;
  }

  element.style.setProperty(property, value);
};

const placementFallbacks: Record<KdsPopoverPlacement, KdsPopoverPlacement[]> = {
  "top-left": ["top-right", "bottom-left", "bottom-right", "top-left"],
  "top-right": ["top-left", "bottom-right", "bottom-left", "top-right"],
  "bottom-left": ["bottom-right", "top-left", "top-right", "bottom-left"],
  "bottom-right": ["bottom-left", "top-right", "top-left", "bottom-right"],
};

const placementInsets: Record<KdsPopoverPlacement, string> = {
  "top-left": "auto anchor(right) anchor(top) auto",
  "top-right": "auto auto anchor(top) anchor(left)",
  "bottom-left": "anchor(bottom) anchor(right) auto auto",
  "bottom-right": "anchor(bottom) auto auto anchor(left)",
};

const placementMarginAdjustments: Record<
  KdsPopoverPlacement,
  {
    "margin-left"?: string;
    "margin-right"?: string;
  }
> = {
  "top-left": { "margin-right": "0" },
  "top-right": { "margin-left": "0" },
  "bottom-left": { "margin-right": "0" },
  "bottom-right": { "margin-left": "0" },
};

const fallbackInsets: Record<KdsPopoverPlacement, string> = {
  "top-left": "auto anchor(right) anchor(top) auto",
  "top-right": "auto auto anchor(top) anchor(left)",
  "bottom-left": "anchor(bottom) anchor(right) auto auto",
  "bottom-right": "anchor(bottom) auto auto anchor(left)",
};

/**
 * Reusable popover behavior for the native Popover API + CSS anchor positioning.
 *
 * Contract:
 * - You provide references to the relevant DOM elements.
 * - This composable applies the required attributes/styles/classes to these elements.
 * - The composable keeps `open` and the native popover state in sync.
 */
export const useKdsPopover = (params: {
  open: Ref<boolean>;
  activatorEl: Ref<MaybeElement>;
  popoverEl: Ref<MaybeElement>;
  anchorEl?: Ref<MaybeElement>;
  placement?: KdsPopoverPlacement | Ref<KdsPopoverPlacement>;
}) => {
  const popoverId = useId();
  const anchorId = useId();
  const anchorName = `--${anchorId}`;

  const getPlacement = (): KdsPopoverPlacement => {
    const p = params.placement;
    if (!p) {
      return "bottom-right";
    }
    return typeof p === "string" ? p : p.value;
  };

  const syncToNativePopover = async () => {
    await nextTick();

    const el = resolveElement(params.popoverEl.value) as
      | (HTMLElement & {
          showPopover?: () => void;
          hidePopover?: () => void;
        })
      | null;

    if (!el) {
      return;
    }

    if (params.open.value) {
      el.showPopover?.();
    } else {
      el.hidePopover?.();
    }
  };

  watch(
    params.open,
    () => {
      syncToNativePopover().catch(() => undefined);
    },
    { immediate: true },
  );

  const onNativeToggle = (e: Event) => {
    if (e.target !== resolveElement(params.popoverEl.value)) {
      return;
    }

    const isOpen = (
      e.target as unknown as { matches?: (sel: string) => boolean }
    )?.matches?.(":popover-open");

    params.open.value = Boolean(isOpen);
  };

  watchEffect(() => {
    const placement = getPlacement();
    const anchorEl = params.anchorEl?.value ?? params.activatorEl.value;
    const activatorEl = params.activatorEl.value;
    const popoverEl = params.popoverEl.value;

    // Anchor
    setStyleProperty(anchorEl, "anchor-name", anchorName);

    // Activator
    setOrRemoveAttr(activatorEl, "aria-expanded", params.open.value);
    setOrRemoveAttr(activatorEl, "aria-controls", popoverId);
    setOrRemoveAttr(activatorEl, "aria-haspopup", "dialog");

    // Popover
    setOrRemoveAttr(popoverEl, "id", popoverId);
    setOrRemoveAttr(popoverEl, "popover", "auto");
    setStyleProperty(popoverEl, "position-anchor", anchorName);

    // Shared floating reset styles
    setStyleProperty(popoverEl, "margin", "var(--kds-spacing-container-0-5x)");

    // Placement styling (self-contained, no dependency on KdsPopover.vue CSS)
    setStyleProperty(popoverEl, "inset", placementInsets[placement]);

    const marginAdjustment = placementMarginAdjustments[placement];
    setStyleProperty(
      popoverEl,
      "margin-left",
      marginAdjustment["margin-left"] ?? null,
    );
    setStyleProperty(
      popoverEl,
      "margin-right",
      marginAdjustment["margin-right"] ?? null,
    );

    // Always configure fallbacks for *other* placements.
    const fallbacks = placementFallbacks[placement];
    setStyleProperty(
      popoverEl,
      "position-try-fallbacks",
      fallbacks.map((p) => `--kds-popover-try-${p}`).join(", "),
    );

    for (const p of kdsPopoverPlacements) {
      setStyleProperty(
        popoverEl,
        `--kds-popover-try-${p}`,
        `inset: ${fallbackInsets[p]}; margin: 8px 0`,
      );
    }

    // Native toggle listener
    const popoverElement = resolveElement(popoverEl);
    popoverElement?.classList.add("floating");
    popoverElement?.removeEventListener(
      "toggle",
      onNativeToggle as EventListener,
    );
    popoverElement?.addEventListener("toggle", onNativeToggle as EventListener);
  });

  return { popoverId };
};
