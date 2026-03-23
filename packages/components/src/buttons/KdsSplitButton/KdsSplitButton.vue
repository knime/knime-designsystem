<script setup lang="ts">
import { computed, nextTick, ref, useId, useTemplateRef, watch } from "vue";

import KdsMenuContainer from "../../forms/_helper/MenuContainer/KdsMenuContainer.vue";
import type { KdsPopoverExpose } from "../../overlays/Popover";
import KdsPopover from "../../overlays/Popover/KdsPopover.vue";
import BaseButton from "../BaseButton.vue";

import type { KdsSplitButtonProps } from "./types";

const props = withDefaults(defineProps<KdsSplitButtonProps>(), {
  variant: "filled",
  size: "medium",
  alternativeActions: () => [],
});

const emit = defineEmits<{
  "click:primary": [event: MouseEvent];
  "click:alternativeAction": [id: string];
}>();

const isMenuOpen = ref(false);
const popoverEl = useTemplateRef<KdsPopoverExpose>("popoverEl");
const menuContainer = useTemplateRef("menuContainer");
const secondaryButton = useTemplateRef<HTMLElement>("secondaryButton");
const menuId = useId();

const buttonClasses = computed(() => ({
  "kds-split-button": true,
  [props.variant ?? "filled"]: true,
  [props.size ?? "medium"]: true,
  disabled: props.disabled,
}));

function onItemClick(itemId: string) {
  isMenuOpen.value = false;
  emit("click:alternativeAction", itemId);
}

watch(isMenuOpen, (open) => {
  if (open) {
    nextTick(() => menuContainer.value?.focus());
  } else {
    // No-op on close: avoid calling focus() on a component instance that does not expose it.
  }
});
</script>

<template>
  <div :class="buttonClasses">
    <BaseButton
      class="kds-split-button-primary"
      :class="[props.variant]"
      :size="props.size"
      :variant="props.variant"
      :disabled="props.disabled"
      :title="props.title"
      :label="props.label"
      :leading-icon="props.leadingIcon"
      :aria-label="props.ariaLabel"
      remove-border-radius="right"
      @click="emit('click:primary', $event)"
    />

    <BaseButton
      ref="secondaryButton"
      class="kds-split-button-secondary"
      remove-border-radius="left"
      :size="props.size"
      :variant="props.variant"
      leading-icon="chevron-down"
      :disabled="props.disabled"
      aria-label="More options"
      aria-haspopup="menu"
      :aria-expanded="isMenuOpen"
      :aria-controls="menuId"
      :style="popoverEl?.anchorStyle"
      @click="isMenuOpen = !isMenuOpen"
    />
  </div>
  <KdsPopover
    ref="popoverEl"
    v-model="isMenuOpen"
    placement="bottom-left"
    popover-aria-label="Actions"
  >
    <KdsMenuContainer
      :id="menuId"
      ref="menuContainer"
      :items="props.alternativeActions"
      :menu-max-height="props.menuMaxHeight"
      aria-label="Actions"
      @item-click="onItemClick"
      @keydown.escape="isMenuOpen = false"
    />
  </KdsPopover>
</template>

<style scoped>
.kds-split-button {
  display: flex;

  &.filled {
    gap: var(--kds-spacing-container-0-10x);
  }

  &.outlined {
    gap: var(--kds-spacing-container-none);
  }

  & .kds-split-button-primary.outlined {
    border-right: none;
  }
}

.kds-split-button-primary {
  flex-shrink: 1;
  min-width: 0;
}

.kds-split-button-secondary {
  flex-shrink: 0;
}
</style>
