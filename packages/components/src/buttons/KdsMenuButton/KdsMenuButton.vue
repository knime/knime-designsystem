<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useAttrs,
  useId,
  useTemplateRef,
  watchEffect,
} from "vue";

import KdsMenuContainer from "../../forms/_helper/MenuContainer/KdsMenuContainer.vue";
import type { KdsPopoverExpose } from "../../overlays/Popover";
import KdsPopover from "../../overlays/Popover/KdsPopover.vue";
import KdsToggleButton from "../KdsToggleButton/KdsToggleButton.vue";

import type { KdsMenuButtonProps } from "./types";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<KdsMenuButtonProps>(), {
  variant: "outlined",
  menuMaxHeight: undefined,
});

const attrs = useAttrs();

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id: string];
}>();

const toggleButtonProps = computed(() => {
  const { items: _items, menuMaxHeight: _menuMaxHeight, ...rest } = props;

  const {
    modelValue: _modelValue,
    "onUpdate:modelValue": _onUpdateModelValue,
    ...safeAttrs
  } = attrs;

  return { ...safeAttrs, ...rest };
});

const isMenuOpen = ref<boolean>(false);
const popoverEl = useTemplateRef<KdsPopoverExpose>("popoverEl");
const menuContainer = useTemplateRef("menuContainer");
const toggleButton = useTemplateRef("toggleButton");

const menuId = useId();
const onItemClick = (itemId: string) => {
  isMenuOpen.value = false;
  emit("itemClick", itemId);
};

watchEffect(() => {
  if (isMenuOpen.value) {
    nextTick(() => menuContainer.value?.focus());
  }
});
</script>

<template>
  <KdsToggleButton
    ref="toggleButton"
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
    popover-aria-label="Menu"
  >
    <KdsMenuContainer
      :id="menuId"
      ref="menuContainer"
      :items="props.items"
      :menu-max-height="props.menuMaxHeight"
      @item-click="onItemClick"
    />
  </KdsPopover>
</template>
