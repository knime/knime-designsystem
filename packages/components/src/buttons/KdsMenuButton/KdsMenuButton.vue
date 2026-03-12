<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";

import { KdsMenuContainer } from "../../overlays/MenuContainer";
import { KdsPopover } from "../../overlays/Popover";
import { KdsToggleButton } from "../KdsToggleButton";

import type { KdsMenuButtonProps } from "./types";

const props = withDefaults(defineProps<KdsMenuButtonProps>(), {
  variant: "outlined",
});

const toggleButtonProps = computed(() => {
  const { possibleValues: _possibleValues, ...rest } = props;
  return rest;
});

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id: string];
}>();

const isMenuOpen = ref<boolean>(false);
const popoverEl = useTemplateRef("popoverEl");

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
    :aria-controls="popoverEl?.popoverId"
    :style="popoverEl?.anchorStyle"
  />

  <KdsPopover
    ref="popoverEl"
    v-model="isMenuOpen"
    placement="bottom-left"
    popover-aria-label="Menu items"
  >
    <KdsMenuContainer
      :possible-values="possibleValues"
      @item-click="onItemClick"
    />
  </KdsPopover>
</template>

<style lang="postcss" scoped></style>
