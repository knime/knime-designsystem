<script setup lang="ts">
import { computed, ref, useAttrs, useTemplateRef } from "vue";

import KdsMenuContainer from "../../overlays/MenuContainer/KdsMenuContainer.vue";
import KdsPopover from "../../overlays/Popover/KdsPopover.vue";
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
  const {
    possibleValues: _possibleValues,
    placement: _placement,
    ...rest
  } = props;

  return { ...attrs, ...rest };
});

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
    role="menu"
    :placement="placement"
    popover-aria-label="Menu items"
  >
    <KdsMenuContainer
      :possible-values="possibleValues"
      @item-click="onItemClick"
    />
  </KdsPopover>
</template>

<style lang="postcss" scoped></style>
