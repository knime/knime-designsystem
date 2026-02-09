<script setup lang="ts">
import { computed, onBeforeUnmount, ref, unref, useId, watch } from "vue";
import type { ComponentPublicInstance } from "vue";
import { useResizeObserver } from "@vueuse/core";

import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  placement: "bottom-right",
  showArrow: false,
  ignoredClickOutsideTarget: null,
});

const open = defineModel<boolean>({ default: false });
const popoverEl = ref<HTMLElement | null>(null);

const popoverId = useId();
const anchorName = `--${useId()}`;

const resolveElement = (
  el: HTMLElement | ComponentPublicInstance | null | undefined,
): HTMLElement | null => {
  if (!el) {
    return null;
  }

  const maybeInstance = el as ComponentPublicInstance & { $el?: unknown };
  const candidate = maybeInstance.$el ?? el;

  return candidate instanceof HTMLElement ? candidate : null;
};

const hasEffectiveAnchor = computed(() => {
  const resolvedElement =
    resolveElement(unref(props.anchorEl) ?? null) ??
    resolveElement(unref(props.activatorEl));
  return Boolean(resolvedElement);
});

// Track the composed path of the last click to properly handle shadow DOM boundaries
let lastClickComposedPath: EventTarget[] = [];

const onDocumentPointerDown = (e: PointerEvent) => {
  // Use composedPath() to get the full event path including through shadow DOM boundaries
  lastClickComposedPath = e.composedPath();
};

// Check if any element in the composed path is in the ignored list
const isIgnoredTarget = (): boolean => {
  const ignored = props.ignoredClickOutsideTarget;
  if (!ignored) {
    return false;
  }

  const ignoredElements = Array.isArray(ignored) ? ignored : [ignored];

  // Resolve ignored elements to actual DOM elements (they might be Vue component instances)
  const resolvedIgnoredElements = ignoredElements
    .map((el) => resolveElement(el))
    .filter((el): el is HTMLElement => el !== null);
  // Check if any element in the composed path matches an ignored element
  return lastClickComposedPath.some((pathElement) => {
    if (!(pathElement instanceof Node)) {
      return false;
    }
    return resolvedIgnoredElements.some(
      (el) => el === pathElement || el.contains(pathElement),
    );
  });
};

// Sync the open state with the native popover element's open state
watch(open, (isOpen) => {
  const resolvedElement =
    resolveElement(unref(props.anchorEl) ?? null) ??
    resolveElement(unref(props.activatorEl));
  if (!resolvedElement) {
    return;
  }
  if (isOpen) {
    popoverEl.value?.showPopover?.();
  } else {
    popoverEl.value?.hidePopover?.();
  }
});

// Listen for the native toggle event to update the open state
const onNativeToggle = (e: Event) => {
  const toggleEvent = e as ToggleEvent;
  const isOpen = toggleEvent.newState === "open";

  // If popover is closing and the click was on an ignored element, keep it open
  if (!isOpen && isIgnoredTarget()) {
    // Prevent state update and keep popover open
    // We need to re-show it since the native popover already closed
    requestAnimationFrame(() => {
      if (popoverEl.value) {
        popoverEl.value.showPopover?.();
        open.value = true;
      }
    });
    return;
  }

  open.value = isOpen;
};

// Always add document listener to track clicks for shadow DOM support
watch(
  () => props.ignoredClickOutsideTarget,
  (ignored) => {
    if (ignored) {
      document.addEventListener("pointerdown", onDocumentPointerDown, true);
    } else {
      document.removeEventListener("pointerdown", onDocumentPointerDown, true);
    }
  },
  { immediate: true },
);

const setAnchorName = (el: HTMLElement | null, value: string | null) => {
  if (!el) {
    return;
  }

  if (value === null) {
    // Don't remove unrelated anchor-names.
    if (el.style.getPropertyValue("anchor-name") === anchorName) {
      el.style.removeProperty("anchor-name");
    }
    return;
  }

  el.style.setProperty("anchor-name", value);
};

watch(
  () => [unref(props.anchorEl), unref(props.activatorEl)],
  ([nextAnchorEl, nextActivatorEl], prev) => {
    const [prevAnchorEl, prevActivatorEl] = prev ?? [null, null];

    const prevEffective =
      resolveElement(prevAnchorEl ?? null) ??
      resolveElement(prevActivatorEl);
    setAnchorName(prevEffective, null);

    const nextEffective =
      resolveElement(nextAnchorEl ?? null) ??
      resolveElement(nextActivatorEl);
    setAnchorName(nextEffective, anchorName);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  const effective =
    resolveElement(unref(props.anchorEl) ?? null) ??
    resolveElement(unref(props.activatorEl));
  setAnchorName(effective, null);

  // Clean up document listener
  document.removeEventListener("pointerdown", onDocumentPointerDown, true);
});

const activatorWidth = ref(0);

useResizeObserver(
  () => resolveElement(unref(props.activatorEl)) ?? null,
  (entries) => {
    const target = entries[0]?.target;
    activatorWidth.value =
      target instanceof HTMLElement ? target.getBoundingClientRect().width : 0;
  },
);
</script>

<template>
  <div
    :id="popoverId"
    ref="popoverEl"
    class="kds-popover"
    :class="['floating', props.placement, { 'show-arrow': props.showArrow }]"
    :popover="hasEffectiveAnchor ? 'auto' : undefined"
    :style="{
      'position-anchor': anchorName,
      '--kds-popover-activator-width': `${activatorWidth}px`,
    }"
    @toggle="onNativeToggle"
  >
    <div
      v-if="props.showArrow"
      class="arrow"
      :style="{ 'position-anchor': anchorName }"
    />
    <slot />
  </div>
</template>

<style scoped>
.kds-popover {
  --kds-popover-activator-width: 50px;
  --kds-popover-activator-center: calc(var(--kds-popover-activator-width) / 2);
  --kds-popover-arrow-size: var(--kds-spacing-container-0-37x);
  --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2) auto auto
    var(--kds-popover-activator-center);

  padding: var(--kds-spacing-container-0-75x);
  overflow: visible;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  background: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);

  &.show-arrow {
    --kds-popover-shadow-color: light-dark(
      hsl(210deg 10% 20% / 40%),
      hsl(345deg 0% 10% / 94%)
    );

    box-shadow: none;
    filter: drop-shadow(0 2px 4px var(--kds-popover-shadow-color));

    /* noinspection CssInvalidPropertyValue */
    position-try-fallbacks: none !important;

    .arrow {
      position: absolute;
      inset: var(--kds-popover-arrow-inset);
      width: var(--kds-popover-arrow-size);
      height: var(--kds-popover-arrow-size);
      background: var(--kds-color-surface-default);
      transform: rotate(45deg);
    }
  }

  /* stylelint-disable declaration-property-value-no-unknown, at-rule-descriptor-value-no-unknown */

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.top-left {
    inset: auto anchor(right) anchor(top) auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    --kds-popover-arrow-inset: auto var(--kds-popover-activator-center)
      calc(var(--kds-popover-arrow-size) / -2) auto;

    position-try-fallbacks:
      --kds-popover-try-top-right, --kds-popover-try-bottom-left,
      --kds-popover-try-bottom-right, --kds-popover-try-top-left;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.top-right {
    inset: auto auto anchor(top) anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    --kds-popover-arrow-inset: auto auto
      calc(var(--kds-popover-arrow-size) / -2)
      var(--kds-popover-activator-center);

    position-try-fallbacks:
      --kds-popover-try-top-left, --kds-popover-try-bottom-right,
      --kds-popover-try-bottom-left, --kds-popover-try-top-right;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.bottom-left {
    inset: anchor(bottom) anchor(right) auto auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2)
      var(--kds-popover-activator-center) auto auto;

    position-try-fallbacks:
      --kds-popover-try-bottom-right, --kds-popover-try-top-left,
      --kds-popover-try-top-right, --kds-popover-try-bottom-left;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.bottom-right {
    inset: anchor(bottom) auto auto anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2) auto
      auto var(--kds-popover-activator-center);

    position-try-fallbacks:
      --kds-popover-try-bottom-left, --kds-popover-try-top-right,
      --kds-popover-try-top-left, --kds-popover-try-bottom-right;
  }
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-top-left {
  inset: auto anchor(right) anchor(top) auto;
  margin: var(--kds-spacing-container-0-25x) 0
    var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
  /* stylelint-disable-next-line at-rule-descriptor-no-unknown */
  --kds-popover-arrow-inset: auto var(--kds-popover-activator-center)
    calc(var(--kds-popover-arrow-size) / -2) auto;
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-top-right {
  inset: auto auto anchor(top) anchor(left);
  margin: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x)
    var(--kds-spacing-container-0-25x) 0;
  /* stylelint-disable-next-line at-rule-descriptor-no-unknown */
  --kds-popover-arrow-inset: auto auto calc(var(--kds-popover-arrow-size) / -2)
    var(--kds-popover-activator-center);
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-bottom-left {
  inset: anchor(bottom) anchor(right) auto auto;
  margin: var(--kds-spacing-container-0-25x) 0
    var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
  /* stylelint-disable-next-line at-rule-descriptor-no-unknown */
  --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2)
    var(--kds-popover-activator-center) auto auto;
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-bottom-right {
  inset: anchor(bottom) auto auto anchor(left);
  margin: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x)
    var(--kds-spacing-container-0-25x) 0;
  /* stylelint-disable-next-line at-rule-descriptor-no-unknown */
  --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2) auto auto
    var(--kds-popover-activator-center);
}
/* stylelint-enable declaration-property-value-no-unknown, at-rule-descriptor-value-no-unknown */
</style>
