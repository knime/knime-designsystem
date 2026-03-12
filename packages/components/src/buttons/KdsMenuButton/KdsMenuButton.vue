<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useAttrs,
  useTemplateRef,
  watchEffect,
} from "vue";

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

/** Focus search field on opening of dropdown */
watchEffect(() => {
  if (isMenuOpen.value) {
    nextTick(() => menuContainerEl.value?.focus());
  }
});
</script>

<template>
  <KdsToggleButton
    v-model="isMenuOpen"
    v-bind="toggleButtonProps"
    aria-haspopup="menu"
    :aria-expanded="isMenuOpen"
    :aria-controls="menuContainerEl?.popoverEl?.popoverId"
    :style="menuContainerEl?.popoverEl?.anchorStyle"
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
