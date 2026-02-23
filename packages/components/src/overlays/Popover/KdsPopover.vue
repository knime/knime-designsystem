<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { onBeforeUnmount, unref, useId, useTemplateRef, watch } from "vue";

import type { KdsPopoverProps } from "./types";

const props = withDefaults(defineProps<KdsPopoverProps>(), {
  placement: "bottom-right",
  role: "dialog",
  fullWidth: false,
});

const open = defineModel<boolean>({ default: false });
const popoverEl = useTemplateRef("popoverEl");

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
  el.setAttribute("aria-haspopup", props.role);
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
    :class="['floating', props.placement, { 'full-width': props.fullWidth }]"
    :popover="unref(props.activatorEl) ? 'auto' : undefined"
    :style="{ 'position-anchor': anchorName }"
    :role="props.role"
    @toggle="open = $event.newState === 'open'"
  >
    <slot />
  </div>
</template>

<style scoped>
.kds-popover {
  padding: 0;
  overflow: visible;
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  border: none;

  /* noinspection CssInvalidFunction */
  &.full-width {
    min-inline-size: anchor-size(width);
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
