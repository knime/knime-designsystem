<script setup lang="ts">
import { ref } from "vue";

import type {
  KdsDropdownContainerEmits,
  KdsDropdownContainerExposed,
  KdsDropdownContainerProps,
} from "./types";

const props = defineProps<KdsDropdownContainerProps>();
const emit = defineEmits<KdsDropdownContainerEmits>();

const popoverEl = ref<HTMLElement | null>(null);

const showPopover = () => {
  if (!popoverEl.value) {
    return;
  }

  try {
    (popoverEl.value as unknown as { showPopover: () => void }).showPopover();
  } catch {
    // no-op
  }
};

const hidePopover = () => {
  if (!popoverEl.value) {
    return;
  }

  try {
    (popoverEl.value as unknown as { hidePopover: () => void }).hidePopover();
  } catch {
    // no-op
  }
};

defineExpose<KdsDropdownContainerExposed>({
  showPopover,
  hidePopover,
});
</script>

<template>
  <div
    ref="popoverEl"
    class="popover"
    popover
    :style="{ 'position-anchor': props.anchorName }"
    @toggle="emit('toggle', $event)"
    @click.stop
  >
    <div v-if="$slots.stickyTop" class="sticky-top">
      <slot name="stickyTop" />
    </div>

    <div v-if="$slots.top" class="top">
      <slot name="top" />
    </div>

    <slot />
  </div>
</template>

<style scoped>
.popover {
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  outline: none;
  background: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);

  &:popover-open {
    display: flex;
  }
}

.popover[popover] {
  position: fixed;
  inset: auto;
  top: calc(anchor(bottom) + var(--kds-spacing-container-0-25x));
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  left: anchor(left);
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  width: anchor-size(width);
  margin: 0;
  position-try-fallbacks: --kds-dropdown-above;
}

@position-try --kds-dropdown-above {
  top: auto;
  bottom: calc(anchor(top) + var(--kds-spacing-container-0-25x));
  /* stylelint-disable-next-line at-rule-descriptor-value-no-unknown */
  left: anchor(left);
  /* stylelint-disable-next-line at-rule-descriptor-value-no-unknown */
  width: anchor-size(width);
}

.sticky-top {
  padding: var(--kds-spacing-container-0-25x);
  border-bottom: var(--kds-border-base-subtle);
}

.top {
  padding: var(--kds-spacing-container-0-25x);
  border-bottom: var(--kds-border-base-subtle);
}
</style>
