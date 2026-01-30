<script setup lang="ts">
import { computed, nextTick, ref, toRef, useId, watch } from "vue";
import { onClickOutside, useElementBounding } from "@vueuse/core";
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/vue";

import BasePopover from "./BasePopover.vue";
import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  placement: "top",
  mainContainer: () => document.body,
  ignoredClickOutsideTarget: null,
});
const open = defineModel<boolean>({ default: false });
const referenceEl = ref<HTMLElement | null>(null);
const floatingEl = ref<HTMLElement | null>(null);
const floatingArrow = ref<HTMLElement | null>(null);
const focusCatch = ref<HTMLElement | null>(null);
const popoverId = useId();

const teleportTarget = computed<HTMLElement>(() => {
  // Storybook (and some app shells) can temporarily hand us an object that's not a DOM Node.
  // Vue Teleport expects an Element; if it's not, patching can crash (parent.insertBefore).
  const target = props.mainContainer;
  return target instanceof HTMLElement ? target : document.body;
});

const safeMainContainer = computed<HTMLElement>(() => {
  const target = props.mainContainer;
  return target instanceof HTMLElement ? target : document.body;
});

const boundaryPaddingPx = 8;
const { x, y, width, height } = useElementBounding(safeMainContainer);
const boundingRect = computed(() => ({
  x: x.value,
  y: y.value,
  width: width.value,
  height: height.value,
}));

/**
 * Floating UI setup
 */
const placement = toRef(props, "placement");
const middleware = computed(() => {
  return [
    shift({
      rootBoundary: boundingRect.value,
      padding: boundaryPaddingPx,
    }),
    flip({
      rootBoundary: boundingRect.value,
    }),
    offset(boundaryPaddingPx),
    arrow({ element: floatingArrow }),
  ];
});
const {
  floatingStyles,
  middlewareData,
  placement: resolvedPlacement,
} = useFloating(referenceEl, floatingEl, {
  placement,
  strategy: "fixed",
  whileElementsMounted: autoUpdate,
  middleware,
  open,
});

const actualBasePlacement = computed(() => {
  return (
    ((resolvedPlacement.value ?? placement.value).split("-")[0] as
      | "top"
      | "right"
      | "bottom"
      | "left") ?? "top"
  );
});

/**
 * Click/Focus outside to close popover
 */
function focusActivatorButton() {
  const button = referenceEl.value?.querySelector<HTMLButtonElement>("button");
  button?.focus({ preventScroll: true });
}

function closePopover() {
  open.value = false;
  // Restore focus back to the activator without causing the page to scroll.
  nextTick(() => focusActivatorButton());
}

const ignoredClickOutsideTarget = computed<(HTMLElement | null)[]>(() => {
  const targets = props.ignoredClickOutsideTarget;
  if (targets === null) {
    return [referenceEl.value];
  }
  if (Array.isArray(targets)) {
    return [referenceEl.value, ...targets];
  }
  return [referenceEl.value, targets];
});
onClickOutside(floatingEl, () => closePopover(), {
  ignore: ignoredClickOutsideTarget,
});

watch(open, (isOpen) => {
  if (isOpen) {
    // Focus the popover when it opens; prevent scroll jumps in Storybook.
    nextTick(() => {
      focusCatch.value?.focus({ preventScroll: true });
    });
  }
});
</script>

<template>
  <div class="kds-popover">
    <div
      ref="referenceEl"
      class="activator"
      :data-open="open"
      :aria-expanded="open"
      :aria-controls="popoverId"
      aria-haspopup="dialog"
    >
      <slot name="activator" />
    </div>

    <Teleport v-if="$slots.default" :to="teleportTarget">
      <div
        v-if="open"
        :id="popoverId"
        ref="floatingEl"
        class="floating"
        :data-open="open"
        :data-placement="actualBasePlacement"
        :style="floatingStyles"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        @keydown.esc="closePopover"
      >
        <BasePopover
          :style="{ 'max-width': width - 2 * boundaryPaddingPx + 'px' }"
        >
          <div tabindex="0" @focus="closePopover" />
          <div ref="focusCatch" class="focus-catch" tabindex="-1" />
          <slot />
          <div tabindex="0" @focus="closePopover" />
        </BasePopover>

        <div
          ref="floatingArrow"
          class="arrow"
          :style="{
            left:
              middlewareData.arrow?.x != null
                ? `${middlewareData.arrow.x}px`
                : '',
            top:
              middlewareData.arrow?.y != null
                ? `${middlewareData.arrow.y}px`
                : '',
          }"
          aria-hidden="true"
        />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.activator {
  /* Shrink-wrap to the activator content so the reference box matches the toggle button.
     This fixes horizontal misalignment in some story layouts. */
  display: inline-flex;
}

.floating {
  position: fixed;
  z-index: 1000;

  /* Ensure the arrow isn't clipped by an ancestor with overflow (rare but can happen in app shells). */
  overflow: visible;

  .focus-catch {
    outline: none;
  }

  &:has(.focus-catch:focus-visible) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-37x);
  }

  .arrow {
    position: absolute;

    /* Keep above host background; using -1 can hide it completely depending on stacking contexts. */
    z-index: 0;

    /* Square rotated 45deg = diamond arrow */
    width: 12px;
    height: 12px;
    background: var(--kds-color-surface-default);
    border-radius: 2px;
    transform: rotate(45deg);
  }

  &[data-placement="top"] .arrow {
    bottom: -6px;
  }

  &[data-placement="bottom"] .arrow {
    top: -6px;
  }

  &[data-placement="left"] .arrow {
    right: -6px;
  }

  &[data-placement="right"] .arrow {
    left: -6px;
  }
}
</style>
