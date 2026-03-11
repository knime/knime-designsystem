<script setup lang="ts">
import { ref, useTemplateRef } from "vue";

import { KdsMenuContainer } from "../../overlays/MenuContainer";
import { KdsPopover } from "../../overlays/Popover";
import { KdsToggleButton } from "../KdsToggleButton";

import type { KdsMenuButtonProps } from "./types";

const props = withDefaults(defineProps<KdsMenuButtonProps>(), {
  variant: "outlined",
});

const { possibleValues, ...toggleButtonProps } = props;

const isMenuOpen = ref<boolean>(false);
const popoverEl = useTemplateRef("popoverEl");
</script>

<template>
  <KdsToggleButton
    v-model="isMenuOpen"
    v-bind="toggleButtonProps"
    :aria-controls="popoverEl?.popoverId"
    :style="popoverEl?.anchorStyle"
  />

  <KdsPopover
    ref="popoverEl"
    v-model="isMenuOpen"
    placement="bottom-left"
    popover-aria-label="Menu items"
  >
    <KdsMenuContainer :possible-values="possibleValues" />
  </KdsPopover>
</template>

<style lang="postcss" scoped></style>
