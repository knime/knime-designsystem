<script setup lang="ts">
import { onBeforeUnmount, ref, unref, useId, watch } from "vue";
import type { ComponentPublicInstance } from "vue";
import { useElementSize } from "@vueuse/core";

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

// Sync the open state with the native popover element's open state
watch(open, (isOpen) => {
  if (!props.activatorEl) {
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
  const isOpen = (
    e.target as unknown as { matches?: (sel: string) => boolean }
  )?.matches?.(":popover-open");

  open.value = Boolean(isOpen);
};

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
  () => [props.anchorEl, unref(props.activatorEl)],
  ([nextAnchorEl, nextActivatorEl], prev) => {
    const [prevAnchorEl, prevActivatorEl] = prev ?? [null, null];

    const prevEffective =
      resolveElement(unref(prevAnchorEl) ?? null) ??
      resolveElement(unref(prevActivatorEl));
    setAnchorName(prevEffective, null);

    const nextEffective =
      resolveElement(unref(nextAnchorEl) ?? null) ??
      resolveElement(unref(nextActivatorEl));
    setAnchorName(nextEffective, anchorName);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  const effective =
    resolveElement(unref(props.anchorEl) ?? null) ??
    resolveElement(unref(props.activatorEl));
  setAnchorName(effective, null);
});

const { width: activatorWidth } = useElementSize(
  () => resolveElement(unref(props.activatorEl)) ?? null,
);
</script>

<template>
  <div
    :id="popoverId"
    ref="popoverEl"
    class="kds-popover"
    :class="['floating', props.placement, { 'show-arrow': props.showArrow }]"
    popover="auto"
    :style="
      'position-anchor: ' +
      anchorName +
      '; --kds-popover-activator-width: ' +
      activatorWidth +
      'px'
    "
    @toggle="onNativeToggle"
  >
    <div
      v-if="props.showArrow"
      class="arrow"
      :style="'position-anchor: ' + anchorName"
    />
    <slot />
  </div>
</template>

<style scoped>
.kds-popover {
  --kds-popover-activator-width: 50px;
  --kds-popover-arrow-size: var(--kds-spacing-container-0-37x);
  --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2) auto auto
    var(--kds-popover-activator-width);

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
  .floating.top-left {
    inset: auto anchor(right) anchor(top) auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    --kds-popover-arrow-inset: auto auto
      calc(var(--kds-popover-arrow-size) / -2)
      var(--kds-popover-activator-width);

    position-try-fallbacks:
      --kds-popover-try-top-right, --kds-popover-try-bottom-left,
      --kds-popover-try-bottom-right, --kds-popover-try-top-left;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  .floating.top-right {
    inset: auto auto anchor(top) anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    --kds-popover-arrow-inset: auto auto
      calc(var(--kds-popover-arrow-size) / -2)
      var(--kds-popover-activator-width);

    position-try-fallbacks:
      --kds-popover-try-top-left, --kds-popover-try-bottom-right,
      --kds-popover-try-bottom-left, --kds-popover-try-top-right;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  .floating.bottom-left {
    inset: anchor(bottom) anchor(right) auto auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2)
      var(--kds-popover-activator-width) auto auto;

    position-try-fallbacks:
      --kds-popover-try-bottom-right, --kds-popover-try-top-left,
      --kds-popover-try-top-right, --kds-popover-try-bottom-left;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  .floating.bottom-right {
    inset: anchor(bottom) auto auto anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2) auto
      auto var(--kds-popover-activator-width);

    position-try-fallbacks:
      --kds-popover-try-bottom-left, --kds-popover-try-top-right,
      --kds-popover-try-top-left, --kds-popover-try-bottom-right;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  @position-try --kds-popover-try-top-left {
    inset: auto anchor(right) anchor(top) auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    /* stylelint-disable-next-line at-rule-descriptor-no-unknown */
    --kds-popover-arrow-inset: auto auto
      calc(var(--kds-popover-arrow-size) / -2)
      var(--kds-popover-activator-width);
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  @position-try --kds-popover-try-top-right {
    inset: auto auto anchor(top) anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    /* stylelint-disable-next-line at-rule-descriptor-no-unknown */
    --kds-popover-arrow-inset: auto auto
      calc(var(--kds-popover-arrow-size) / -2)
      var(--kds-popover-activator-width);
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  @position-try --kds-popover-try-bottom-left {
    inset: anchor(bottom) anchor(right) auto auto;
    margin: var(--kds-spacing-container-0-25x) 0
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x);
    /* stylelint-disable-next-line at-rule-descriptor-no-unknown */
    --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2)
      var(--kds-popover-activator-width) auto auto;
  }

  /* noinspection CssInvalidFunction,CssInvalidAtRule */
  @position-try --kds-popover-try-bottom-right {
    inset: anchor(bottom) auto auto anchor(left);
    margin: var(--kds-spacing-container-0-25x)
      var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-25x) 0;
    /* stylelint-disable-next-line at-rule-descriptor-no-unknown */
    --kds-popover-arrow-inset: calc(var(--kds-popover-arrow-size) / -2) auto
      auto var(--kds-popover-activator-width);
  }
  /* stylelint-enable declaration-property-value-no-unknown, at-rule-descriptor-value-no-unknown */
}
</style>
