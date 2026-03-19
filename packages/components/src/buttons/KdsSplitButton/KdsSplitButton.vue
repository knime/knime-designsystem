<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  ref,
  useId,
  useTemplateRef,
  watch,
} from "vue";

import type { KdsPopoverExpose } from "../../overlays/Popover";
import KdsPopover from "../../overlays/Popover/KdsPopover.vue";
import BaseButton from "../BaseButton.vue";
import KdsMenuContainer from "../KdsMenuButton/MenuContainer/KdsMenuContainer.vue";

import type { KdsSplitButtonProps } from "./types";

const props = withDefaults(defineProps<KdsSplitButtonProps>(), {
  variant: "filled",
  size: "medium",
  alternativeActions: () => [],
  contextMenuAriaLabel: "Menu",
});

const emit = defineEmits<{
  "click:primary": [event: MouseEvent];
  "click:alternativeAction": [id: string];
}>();

const buttonClasses = computed(() => ({
  "kds-split-button": true,
  [props.variant]: true,
  [props.size]: true,
  disabled: props.disabled,
}));

const primaryButtonClasses = computed(() => ({
  "kds-split-button-primary": true,
  [props.variant]: true,
}));

const menuItems = computed(() =>
  props.alternativeActions.map((action) => ({
    id: action.id,
    text: action.label,
    accessory: action.leadingIcon
      ? { type: "icon" as const, name: action.leadingIcon }
      : undefined,
    disabled: action.disabled,
  })),
);

const isMenuOpen = ref(false);
const popoverEl = useTemplateRef<KdsPopoverExpose>("popoverEl");
const menuContainer = useTemplateRef("menuContainer");
const secondaryButton = useTemplateRef("secondaryButton");
const menuId = useId();

function handlePrimaryClick(e: MouseEvent) {
  emit("click:primary", e);
}

function handleSecondaryClick() {
  isMenuOpen.value = !isMenuOpen.value;
}

const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

function onItemClick(itemId: string) {
  isMenuOpen.value = false;

  const action = props.alternativeActions.find((a) => a.id === itemId);
  if (!action || props.disabled) {
    return;
  }

  if (action.to) {
    if (router) {
      router.push(action.to);
      return;
    }
    if (typeof action.to === "string" && typeof window !== "undefined") {
      window.location.assign(action.to);
      return;
    }
    emit("click:alternativeAction", action.id);
    return;
  }

  if (action.href) {
    if (typeof window !== "undefined") {
      window.location.assign(action.href);
    }
    emit("click:alternativeAction", action.id);
    return;
  }

  emit("click:alternativeAction", action.id);
}

watch(isMenuOpen, (open) => {
  if (open) {
    nextTick(() => menuContainer.value?.focus());
  } else {
    nextTick(() => secondaryButton.value?.focus());
  }
});
</script>

<template>
  <div :class="buttonClasses">
    <BaseButton
      :class="primaryButtonClasses"
      :size="props.size"
      :variant="props.variant"
      :disabled="props.disabled"
      :title="props.title"
      :label="props.label"
      :leading-icon="props.leadingIcon"
      :aria-label="props.primaryAriaLabel"
      remove-border-radius="right"
      @click="handlePrimaryClick"
    />

    <div class="kds-split-button-secondary-anchor">
      <BaseButton
        ref="secondaryButton"
        class="kds-split-button-secondary"
        remove-border-radius="left"
        :size="props.size"
        :variant="props.variant"
        leading-icon="chevron-down"
        :disabled="props.disabled"
        aria-label="Change option"
        aria-haspopup="menu"
        :aria-expanded="isMenuOpen"
        :aria-controls="menuId"
        :style="popoverEl?.anchorStyle"
        @click="handleSecondaryClick"
      />

      <KdsPopover
        ref="popoverEl"
        v-model="isMenuOpen"
        placement="bottom-left"
        :popover-aria-label="props.contextMenuAriaLabel"
      >
        <KdsMenuContainer
          :id="menuId"
          ref="menuContainer"
          :items="menuItems"
          :menu-max-height="props.menuMaxHeight"
          @item-click="onItemClick"
        />
      </KdsPopover>
    </div>
  </div>
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

  &.disabled {
    cursor: default;
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
