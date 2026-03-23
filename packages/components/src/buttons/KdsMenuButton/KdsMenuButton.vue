<script setup lang="ts">
import {
  type StyleValue,
  computed,
  ref,
  useAttrs,
  useId,
  useTemplateRef,
} from "vue";

import KdsListContainer from "../../forms/_helper/List/ListContainer/KdsListContainer.vue";
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
  itemClick: [id?: string];
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
const popoverEl = useTemplateRef("popoverEl");
const listContainerEl = useTemplateRef("listContainerEl");

const menuId = useId();

const maxHeightStyle = computed<StyleValue>(() => {
  if (!props.menuMaxHeight) {
    return {};
  }

  return {
    maxHeight: props.menuMaxHeight,
    overflowY: "auto",
  };
});

const onItemClick = (itemId?: string) => {
  if (!itemId) {
    return;
  }
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
    @focus="listContainerEl?.handleFocus"
    @keydown="isMenuOpen && listContainerEl?.handleKeydown"
    @blur="isMenuOpen = false"
  />

  <KdsPopover
    ref="popoverEl"
    v-model="isMenuOpen"
    placement="bottom-left"
    aria-label="Menu"
  >
    <div class="kds-menu-container" :style="maxHeightStyle">
      <KdsListContainer
        :id="menuId"
        ref="listContainerEl"
        :possible-values="items"
        empty-text="Menu is empty"
        aria-label="Actions"
        role="menu"
        controlled-externally
        @item-click="onItemClick"
      />
    </div>
  </KdsPopover>
</template>

<style scoped>
.kds-menu-container {
  max-width: var(--kds-dimension-component-width-20x);
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
