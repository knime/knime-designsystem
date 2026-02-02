<script setup lang="ts">
/**
 * Internal base popover wrapper.
 *
 * Provides consistent styling and layout for popover content used by higher-level overlay components.
 */

import { type CSSProperties, computed, ref, useId, watchEffect } from "vue";
import type { MaybeRef } from "@vueuse/core";

type BasePopoverSide = "top" | "bottom";
type BasePopoverAlign = "start" | "center" | "end";
type BasePopoverPlacement = `${BasePopoverSide}-${BasePopoverAlign}`;

type BasePopoverProps = {
  /**
   * Where the popover should be positioned relative to its anchor.
   */
  placement?: BasePopoverPlacement;

  /**
   * Anchor element used for CSS Anchor Positioning.
   *
   * Accepts either a Vue ref (template ref) or a raw element.
   */
  anchor: MaybeRef<HTMLElement | null>;
};

const props = withDefaults(defineProps<BasePopoverProps>(), {
  placement: "top-center",
});

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
  const placement = props.placement ?? "top-center";
  const [side, align] = placement.split("-");

  const positionTryFallbacks = (() => {
    if (side === "top") {
      if (align === "start") {
        return "--kds-base-popover-try-bottom-start, --kds-base-popover-try-top-start";
      }
      if (align === "end") {
        return "--kds-base-popover-try-bottom-end, --kds-base-popover-try-top-end";
      }
      return "--kds-base-popover-try-top-start, --kds-base-popover-try-top-end, --kds-base-popover-try-bottom-center, --kds-base-popover-try-bottom-start, --kds-base-popover-try-bottom-end";
    }

    if (align === "start") {
      return "--kds-base-popover-try-top-start, --kds-base-popover-try-bottom-start";
    }
    if (align === "end") {
      return "--kds-base-popover-try-top-end, --kds-base-popover-try-bottom-end";
    }
    return "--kds-base-popover-try-top-center, --kds-base-popover-try-bottom-center";
  })();

  const common: CSSProperties = {
    positionAnchor: anchorName,
    position: "fixed",
    zIndex: 1000,
    // If the preferred placement doesn't fit, try flipping to the opposite side.
    // Note: this is supported in the target browsers for this repo.
    ...({ positionTryFallbacks } as unknown as CSSProperties),
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

  if (side === "top") {
    return {
      ...common,
      bottom: "anchor(top)",
      marginBottom: gap,
      ...alignedX,
    } satisfies CSSProperties;
  }

  return {
    ...common,
    top: "anchor(bottom)",
    marginTop: gap,
    ...alignedX,
  } satisfies CSSProperties;
});
</script>

<template>
  <div class="content" :style="popoverStyles">
    <slot />
  </div>
</template>

<style scoped>
/* stylelint-disable at-rule-descriptor-value-no-unknown */
/* stylelint-disable-next-line at-rule-no-unknown */
@position-try --kds-base-popover-try-top-center {
  top: auto;

  /* noinspection CssInvalidFunction */
  bottom: anchor(top);
  margin-top: 0;
  margin-bottom: 8px;
}

/* stylelint-disable-next-line at-rule-no-unknown */
@position-try --kds-base-popover-try-top-start {
  top: auto;

  /* noinspection CssInvalidFunction */
  bottom: anchor(top);
  margin-top: 0;
  margin-bottom: 8px;
}

/* stylelint-disable-next-line at-rule-no-unknown */
@position-try --kds-base-popover-try-top-end {
  top: auto;

  /* noinspection CssInvalidFunction */
  bottom: anchor(top);
  margin-top: 0;
  margin-bottom: 8px;
}

/* stylelint-disable-next-line at-rule-no-unknown */
@position-try --kds-base-popover-try-bottom-center {
  /* noinspection CssInvalidFunction */
  top: anchor(bottom);
  bottom: auto;
  margin-top: 8px;
  margin-bottom: 0;
}

/* stylelint-disable-next-line at-rule-no-unknown */
@position-try --kds-base-popover-try-bottom-start {
  /* noinspection CssInvalidFunction */
  top: anchor(bottom);
  bottom: auto;
  margin-top: 8px;
  margin-bottom: 0;
}

/* stylelint-disable-next-line at-rule-no-unknown */
@position-try --kds-base-popover-try-bottom-end {
  /* noinspection CssInvalidFunction */
  top: anchor(bottom);
  bottom: auto;
  margin-top: 8px;
  margin-bottom: 0;
}

/* stylelint-enable at-rule-descriptor-value-no-unknown */

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
