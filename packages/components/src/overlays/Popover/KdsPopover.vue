<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { onBeforeUnmount, ref, unref, useId, watch } from "vue";

import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  placement: "bottom-right",
  paddingSize: "medium",
});

const open = defineModel<boolean>({ default: false });
const popoverEl = ref<HTMLElement | null>(null);

const popoverId = useId();
const anchorName = `--anchor-${popoverId}`;

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

const setA11yAttributes = (
  el: HTMLElement | null,
  options: { expanded: boolean; popoverId: string } | null,
) => {
  if (!el) {
    return;
  }

  if (options === null) {
    el.removeAttribute("aria-expanded");
    el.removeAttribute("aria-controls");
    el.removeAttribute("aria-haspopup");
    return;
  }

  el.setAttribute("aria-expanded", String(options.expanded));
  el.setAttribute("aria-controls", options.popoverId);
  el.setAttribute("aria-haspopup", "dialog");
};

// Sync the open state with the native popover element's open state
watch(open, (isOpen) => {
  if (isOpen) {
    popoverEl.value?.showPopover?.();
  } else {
    popoverEl.value?.hidePopover?.();
  }

  const activatorElement = resolveElement(unref(props.activatorEl));
  activatorElement?.setAttribute("aria-expanded", String(isOpen));
});

watch(
  () => [unref(props.anchorEl), unref(props.activatorEl)],
  ([nextAnchorEl, nextActivatorEl], prev) => {
    const [prevAnchorEl, prevActivatorEl] = prev ?? [null, null];

    const prevAnchor =
      resolveElement(prevAnchorEl ?? null) ?? resolveElement(prevActivatorEl);
    prevAnchor?.style.removeProperty("anchor-name");

    // Clean up a11y attributes from previous activator
    const prevActivator = resolveElement(prevActivatorEl);
    setA11yAttributes(prevActivator, null);

    const nextAnchor =
      resolveElement(nextAnchorEl ?? null) ?? resolveElement(nextActivatorEl);
    nextAnchor?.style.setProperty("anchor-name", anchorName);

    // Set a11y attributes on new activator
    const nextActivator = resolveElement(nextActivatorEl);
    setA11yAttributes(nextActivator, { expanded: open.value, popoverId });
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  const anchor =
    resolveElement(unref(props.anchorEl) ?? null) ??
    resolveElement(unref(props.activatorEl));
  anchor?.style.removeProperty("anchor-name");

  const activator = resolveElement(unref(props.activatorEl));
  setA11yAttributes(activator, null);
});
</script>

<template>
  <div
    :id="popoverId"
    ref="popoverEl"
    class="kds-popover"
    :class="['floating', props.placement, props.paddingSize]"
    :popover="unref(props.activatorEl) ? 'auto' : undefined"
    :style="{ 'position-anchor': anchorName }"
    role="dialog"
    @toggle="open = $event.newState === 'open'"
  >
    <slot />
  </div>
</template>

<style scoped>
.kds-popover {
  overflow: visible;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  background: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-37x);
  box-shadow: var(--kds-elevation-level-3);

  &.medium {
    padding: var(--kds-spacing-container-0-75x);
  }

  &.small {
    padding: var(--kds-spacing-container-0-25x);
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.top-left {
    inset: auto anchor(right) anchor(top) auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    position-try-fallbacks:
      --kds-popover-try-top-right, --kds-popover-try-bottom-left,
      --kds-popover-try-bottom-right, --kds-popover-try-top-left;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.top-right {
    inset: auto auto anchor(top) anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    position-try-fallbacks:
      --kds-popover-try-top-left, --kds-popover-try-bottom-right,
      --kds-popover-try-bottom-left, --kds-popover-try-top-right;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.bottom-left {
    inset: anchor(bottom) anchor(right) auto auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    position-try-fallbacks:
      --kds-popover-try-bottom-right, --kds-popover-try-top-left,
      --kds-popover-try-top-right, --kds-popover-try-bottom-left;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  &.floating.bottom-right {
    inset: anchor(bottom) auto auto anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
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
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-top-right {
  inset: auto auto anchor(top) anchor(left);
  margin: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x)
    var(--kds-spacing-container-0-25x) 0;
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-bottom-left {
  inset: anchor(bottom) anchor(right) auto auto;
  margin: var(--kds-spacing-container-0-25x) 0
    var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
}

/* noinspection CssInvalidFunction,CssInvalidAtRule */
@position-try --kds-popover-try-bottom-right {
  inset: anchor(bottom) auto auto anchor(left);
  margin: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x)
    var(--kds-spacing-container-0-25x) 0;
}
</style>
