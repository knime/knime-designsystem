<script setup lang="ts">
import { computed, ref } from "vue";

import { KdsListItem } from "../../_helper/List/KdsListItem";

import type { KdsListContainerProps } from "./types.ts";

const props = withDefaults(defineProps<KdsListContainerProps>(), {
  noEntriesText: "",
});

const emit = defineEmits<{
  toggleItem: [id: string];
}>();

/** active item id via keyboard or mouseover */
const activeId = ref<string | null>(null);

const enabledValues = computed(() =>
  props.possibleValues.filter((o) => !o.disabled),
);

const findEnabledIndex = (id: string | null) =>
  id === null ? -1 : enabledValues.value.findIndex((o) => o.id === id);

const activateFirst = () => {
  activeId.value =
    enabledValues.value.length > 0 ? enabledValues.value[0].id : null;
};

const onFocus = () => {
  if (activeId.value === null) {
    activateFirst();
  }
};

const onBlur = () => {
  activeId.value = null;
};

const onKeydown = (event: KeyboardEvent) => {
  if (enabledValues.value.length === 0) {
    return;
  }

  const currentIndex = findEnabledIndex(activeId.value);

  switch (event.key) {
    case "ArrowDown": {
      const nextIndex =
        currentIndex < 0 || currentIndex >= enabledValues.value.length - 1
          ? 0
          : currentIndex + 1;
      activeId.value = enabledValues.value[nextIndex].id;
      event.preventDefault();
      break;
    }
    case "ArrowUp": {
      const nextIndex =
        currentIndex <= 0 ? enabledValues.value.length - 1 : currentIndex - 1;
      activeId.value = enabledValues.value[nextIndex].id;
      event.preventDefault();
      break;
    }
    case "Enter":
    case " ":
      if (activeId.value) {
        emit("toggleItem", activeId.value);
        event.preventDefault();
      }
      break;
    case "Home":
      activeId.value = enabledValues.value[0].id;
      event.preventDefault();
      break;
    case "End":
      activeId.value = enabledValues.value[enabledValues.value.length - 1].id;
      event.preventDefault();
      break;
    default:
      break;
  }
};
</script>

<template>
  <div
    role="listbox"
    class="kds-list-container"
    :tabindex="props.controlEl ? -1 : 0"
    @keydown="onKeydown"
    @focus="onFocus"
    @blur="onBlur"
  >
    <KdsListItem
      v-for="item in props.possibleValues"
      :id="item.id"
      :key="item.id"
      :accessory="item.accessory"
      :label="item.text"
      :sub-text="item.subText"
      :selected="item.selected"
      :disabled="item.disabled"
      :active="activeId === item.id"
      :special="item.special"
      @click="emit('toggleItem', item.id)"
      @mouseover="activeId = item.id"
    />
    <div
      v-if="props.possibleValues.length === 0"
      class="kds-list-container-empty"
    >
      {{ props.noEntriesText }}
    </div>
  </div>
</template>

<style scoped>
.kds-list-container {
  display: flex;
  flex-direction: column;
  padding: var(--kds-border-radius-container-0-25x);
  overflow-y: auto;
  list-style: none;

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-31x);
  }
}

.kds-list-container-empty {
  padding: var(--kds-spacing-container-0-5x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-subtle);
  text-align: center;
}
</style>
