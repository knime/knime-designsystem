<script setup lang="ts">
/**
 * Internal base popover wrapper.
 *
 * Provides consistent styling and layout for popover content used by higher-level overlay components.
 */

import { type CSSProperties, computed, ref, useId, watchEffect } from "vue";
import type { MaybeRef } from "@vueuse/core";

type BasePopoverSide = "top" | "bottom" | "left" | "right";
type BasePopoverAlign = "start" | "center" | "end";

type BasePopoverPlacement =
  | BasePopoverSide
  | `${BasePopoverSide}-${Exclude<BasePopoverAlign, "center">}`;

type BasePopoverProps = {
  /**
   * Where the popover should be positioned relative to its anchor.
   */
  placement: BasePopoverPlacement;

  /**
   * Anchor element used for CSS Anchor Positioning.
   *
   * Accepts either a Vue ref (template ref) or a raw element.
   */
  anchor: MaybeRef<HTMLElement | null>;
};

const props = defineProps<BasePopoverProps>();

const defaultGapPx = 8;
const anchorName = `--kds-base-popover-${useId()}`;

watchEffect(() => {
  const anchorEl = ref(props.anchor).value;
  if (anchorEl) {
    // TS doesn't know about `style.anchorName` yet; use a custom property assignment.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (anchorEl.style as any).anchorName = anchorName;
  }
});

const popoverStyles = computed<CSSProperties>(() => {
  const gap = `${defaultGapPx}px`;
  const [sideRaw, alignRaw] = props.placement.split("-") as [
    BasePopoverSide,
    BasePopoverAlign | undefined,
  ];

  const side: BasePopoverSide = sideRaw;
  const align: BasePopoverAlign = (alignRaw ?? "center") as BasePopoverAlign;

  const common: CSSProperties = {
    positionAnchor: anchorName,
    position: "fixed",
    zIndex: 1000,
  };

  const alignedX: CSSProperties = (() => {
    if (align === "start") {
      return { left: "anchor(left)", translate: "0 0" };
    }

    if (align === "end") {
      return { left: "anchor(right)", translate: "-100% 0" };
    }

    return { left: "anchor(center)", translate: "-50% 0" };
  })();

  const alignedY: CSSProperties = (() => {
    if (align === "start") {
      return { top: "anchor(top)", translate: "0 0" };
    }

    if (align === "end") {
      return { top: "anchor(bottom)", translate: "0 -100%" };
    }

    return { top: "anchor(center)", translate: "0 -50%" };
  })();

  if (side === "top") {
    return {
      ...common,
      bottom: "anchor(top)",
      marginBottom: gap,
      ...alignedX,
    } satisfies CSSProperties;
  }

  if (side === "bottom") {
    return {
      ...common,
      top: "anchor(bottom)",
      marginTop: gap,
      ...alignedX,
    } satisfies CSSProperties;
  }

  if (side === "left") {
    return {
      ...common,
      right: "anchor(left)",
      marginRight: gap,
      ...alignedY,
    } satisfies CSSProperties;
  }

  return {
    ...common,
    left: "anchor(right)",
    marginLeft: gap,
    ...alignedY,
  } satisfies CSSProperties;
});
</script>

<template>
  <div class="content" :style="popoverStyles">
    <slot />
  </div>
</template>

<style scoped>
.content {
  width: 354px;
  padding: var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-75x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  background: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
