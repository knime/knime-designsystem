<script setup lang="ts">
import { computed, ref, useAttrs, useTemplateRef } from "vue";

import KdsMenuContainer from "../../overlays/MenuContainer/KdsMenuContainer.vue";
import KdsToggleButton from "../KdsToggleButton/KdsToggleButton.vue";

import type { KdsMenuButtonProps } from "./types";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<KdsMenuButtonProps>(), {
  variant: "outlined",
  placement: "bottom-left",
});

const attrs = useAttrs();

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id: string];
}>();

const toggleButtonProps = computed(() => {
  const { items: _items, placement: _placement, ...rest } = props;

  const {
    modelValue: _modelValue,
    "onUpdate:modelValue": _onUpdateModelValue,
    ...safeAttrs
  } = attrs;

  return { ...safeAttrs, ...rest };
});

const isMenuOpen = ref<boolean>(false);
const menuContainerEl = useTemplateRef("menuContainerEl");

const onItemClick = (event: string) => {
  isMenuOpen.value = false;
  emit("itemClick", event);
};
</script>

<template>
  <KdsToggleButton
    v-model="isMenuOpen"
    v-bind="toggleButtonProps"
    aria-haspopup="menu"
    :aria-expanded="isMenuOpen"
    :aria-controls="menuContainerEl?.popoverEl?.popoverId"
    :style="menuContainerEl?.popoverEl?.anchorStyle"
    @keydown="menuContainerEl?.listContainerEl?.handleKeydown($event)"
    @focus="menuContainerEl?.listContainerEl?.handleFocus()"
    @blur="menuContainerEl?.listContainerEl?.handleBlur()"
  />

  <KdsMenuContainer
    ref="menuContainerEl"
    v-model="isMenuOpen"
    :items="items"
    :placement="placement"
    @item-click="onItemClick"
  />
</template>

<style scoped></style>
