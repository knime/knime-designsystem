import { nextTick, onScopeDispose, useId, watch, watchEffect } from "vue";
import type { ComponentPublicInstance, Ref } from "vue";

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

const spacing4px = "var(--kds-spacing-container-0-25x)";

type KdsPopoverPlacementConfig = {
  inset: string;
  margin: string;
  fallbacks: KdsPopoverPlacement[];
};

const placements: Record<KdsPopoverPlacement, KdsPopoverPlacementConfig> = {
  "top-left": {
    inset: "auto anchor(right) anchor(top) auto",
    // aligned to right edge => no right margin; keep 4px on the opposite side
    margin: `${spacing4px} 0 ${spacing4px} ${spacing4px}`,
    fallbacks: ["top-right", "bottom-left", "bottom-right", "top-left"],
  },
  "top-right": {
    inset: "auto auto anchor(top) anchor(left)",
    // aligned to left edge => no left margin; keep 4px on the opposite side
    margin: `${spacing4px} ${spacing4px} ${spacing4px} 0`,
    fallbacks: ["top-left", "bottom-right", "bottom-left", "top-right"],
  },
  "bottom-left": {
    inset: "anchor(bottom) anchor(right) auto auto",
    // aligned to right edge => no right margin; keep 4px on the opposite side
    margin: `${spacing4px} 0 ${spacing4px} ${spacing4px}`,
    fallbacks: ["bottom-right", "top-left", "top-right", "bottom-left"],
  },
  "bottom-right": {
    inset: "anchor(bottom) auto auto anchor(left)",
    // aligned to left edge => no left margin; keep 4px on the opposite side
    margin: `${spacing4px} ${spacing4px} ${spacing4px} 0`,
    fallbacks: ["bottom-left", "top-right", "top-left", "bottom-right"],
  },
};

// Register composable-specific @position-try rules on first use.
// The native API doesn't support defining @position-try rules per element, only via CSS.
const kdsPopoverTryNamePrefix = "--kds-popover-composable-try-";
let didRegisterTryStyles = false;

const registerPositionTryFallbackStyles = () => {
  if (didRegisterTryStyles) {
    return;
  }
  if (typeof document === "undefined") {
    return;
  }

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-kds", "popover-composable-position-try");

  // @position-try rules are global CSS constructs and can't be defined via inline styles.
  styleEl.textContent = (
    [
      ...Object.entries(placements).map(
        ([placement, { inset, margin }]) =>
          `@position-try ${kdsPopoverTryNamePrefix}${placement} { inset: ${inset}; margin: ${margin}; }`,
      ),
    ] as string[]
  ).join("\n");

  document.head.appendChild(styleEl);
  didRegisterTryStyles = true;
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
  /**
   * Determines the accessible semantics exposed via `aria-haspopup` on the activator.
   */
  type: "menu" | "listbox" | "grid";
}) => {
  registerPositionTryFallbackStyles();

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

    // Avoid throwing in browsers/environments without Popover API.
    if (params.open.value) {
      el.showPopover?.();
    } else {
      el.hidePopover?.();
    }
  };

  watch(params.open, () => {
    syncToNativePopover().catch(() => undefined);
  });

  const onNativeToggle = (e: Event) => {
    if (e.target !== resolveElement(params.popoverEl.value)) {
      return;
    }

    const isOpen = (
      e.target as unknown as { matches?: (sel: string) => boolean }
    )?.matches?.(":popover-open");

    params.open.value = Boolean(isOpen);
  };

  const removeNativeToggleListener = (el: HTMLElement | null) => {
    el?.removeEventListener("toggle", onNativeToggle as EventListener);
  };

  // Keep exactly one native toggle listener attached to the current popover element.
  watch(
    () => resolveElement(params.popoverEl.value),
    (next, prev) => {
      removeNativeToggleListener(prev ?? null);
      next?.addEventListener("toggle", onNativeToggle as EventListener);
    },
    { immediate: true },
  );

  onScopeDispose(() => {
    removeNativeToggleListener(resolveElement(params.popoverEl.value));
  });

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
    setOrRemoveAttr(activatorEl, "aria-haspopup", params.type);

    // Popover
    setOrRemoveAttr(popoverEl, "id", popoverId);
    setOrRemoveAttr(popoverEl, "popover", "auto");
    setStyleProperty(popoverEl, "position-anchor", anchorName);

    const config = placements[placement];
    setStyleProperty(popoverEl, "margin", config.margin);
    setStyleProperty(popoverEl, "inset", config.inset);
    setStyleProperty(
      popoverEl,
      "position-try-fallbacks",
      config.fallbacks.map((p) => `${kdsPopoverTryNamePrefix}${p}`).join(", "),
    );
  });

  return { popoverId };
};
