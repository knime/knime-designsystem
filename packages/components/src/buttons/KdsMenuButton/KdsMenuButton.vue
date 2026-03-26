<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useAttrs,
  useId,
  useTemplateRef,
  watch,
} from "vue";

import KdsMenuContainer from "../../forms/_helper/MenuContainer/KdsMenuContainer.vue";
import type { KdsMenuContainerExpose } from "../../forms/_helper/MenuContainer/types";
import type { KdsPopoverExpose } from "../../overlays/Popover";
import KdsPopover from "../../overlays/Popover/KdsPopover.vue";
import KdsToggleButton from "../KdsToggleButton/KdsToggleButton.vue";

import type { KdsMenuButtonProps } from "./types";

defineOptions({
  inheritAttrs: false,
});

const {
  variant = "outlined",
  menuMaxHeight,
  ...props
} = defineProps<KdsMenuButtonProps>();

const attrs = useAttrs();

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id?: string];
}>();

const toggleButtonProps = computed(() => {
  const { items: _items, ...rest } = props;

  const {
    modelValue: _modelValue,
    "onUpdate:modelValue": _onUpdateModelValue,
    ...safeAttrs
  } = attrs;

  return { ...safeAttrs, ...rest, variant };
});

const isMenuOpen = ref<boolean>(false);
const popoverEl = useTemplateRef<KdsPopoverExpose>("popoverEl");
const menuContainer = useTemplateRef<KdsMenuContainerExpose>("menuContainer");

const menuId = useId();

watch(isMenuOpen, async (menuOpen) => {
  if (!menuOpen) {
    return;
  }

  await nextTick();
  menuContainer.value?.focus();
});

const onItemClick = (itemId: string) => {
  isMenuOpen.value = false;
  emit("itemClick", itemId);
};
</script>

<template>
  <KdsToggleButton
    v-model="isMenuOpen"
    v-bind="toggleButtonProps"
    aria-haspopup="menu"
    :aria-expanded="isMenuOpen"
    :aria-controls="menuId"
    :style="popoverEl?.anchorStyle"
  />

  <KdsPopover
    ref="popoverEl"
    v-model="isMenuOpen"
    placement="bottom-left"
    aria-label="Menu"
  >
    <KdsMenuContainer
      :id="menuId"
      ref="menuContainer"
      :items="props.items"
      :menu-max-height="menuMaxHeight"
      @item-click="onItemClick"
    />
  </KdsPopover>
</template>
