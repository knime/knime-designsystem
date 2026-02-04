<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";

import MenuItem from "./MenuItem.vue";
import type { MenuListItem, MenuListProps } from "./types.ts";

const props = withDefaults(defineProps<MenuListProps>(), {
  emptyText: "No entries in this list",
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  id: undefined,
});

const modelValue = defineModel<string | undefined>();

const generatedId = useId();
const listboxId = computed(() => props.id ?? `${generatedId}-listbox`);
const optionId = (index: number) => `${listboxId.value}-option-${index}`;

const activeIndex = ref<number>(-1);

const isEmpty = computed(() => props.items.length === 0);

const isSelected = (item: MenuListItem) => modelValue.value === item.id;

const selectedIndex = computed(() =>
  props.items.findIndex((item) => item.id === modelValue.value),
);

const ariaActiveDescendant = computed(() => {
  return activeIndex.value >= 0 ? optionId(activeIndex.value) : undefined;
});

const isIndexDisabled = (index: number) =>
  Boolean(props.items[index]?.disabled);

const clampIndex = (index: number) => {
  return Math.min(Math.max(index, 0), props.items.length - 1);
};

const findNextEnabled = (fromIndex: number, delta: 1 | -1) => {
  if (props.items.length === 0) {
    return -1;
  }

  let next = clampIndex(fromIndex);

  while (next >= 0 && next < props.items.length) {
    if (!isIndexDisabled(next)) {
      return next;
    }
    next += delta;
  }

  return -1;
};

const ensureActiveIndexInitialized = () => {
  if (props.items.length === 0) {
    activeIndex.value = -1;
    return;
  }

  if (activeIndex.value >= 0 && activeIndex.value < props.items.length) {
    return;
  }

  const start = selectedIndex.value >= 0 ? selectedIndex.value : 0;
  const firstTry = findNextEnabled(start, 1);
  activeIndex.value = firstTry >= 0 ? firstTry : findNextEnabled(start, -1);
};

const moveActive = (delta: 1 | -1) => {
  ensureActiveIndexInitialized();
  if (activeIndex.value < 0) {
    return;
  }

  const next = findNextEnabled(activeIndex.value + delta, delta);
  if (next >= 0) {
    activeIndex.value = next;
  }
};

const applyActiveSelection = () => {
  ensureActiveIndexInitialized();
  if (activeIndex.value < 0) {
    return;
  }

  const item = props.items[activeIndex.value];
  if (!item || item.disabled) {
    return;
  }

  modelValue.value = item.id;
};

const onListboxKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      moveActive(1);
      break;

    case "ArrowUp":
      event.preventDefault();
      moveActive(-1);
      break;

    case "Enter":
    case " ":
      event.preventDefault();
      applyActiveSelection();
      break;

    default:
      break;
  }
};

const handleSelect = (item: MenuListItem) => {
  if (item.disabled) {
    return;
  }
  modelValue.value = item.id;
};

watch(
  () => props.items,
  () => {
    if (props.items.length === 0) {
      activeIndex.value = -1;
      return;
    }

    if (activeIndex.value >= props.items.length) {
      activeIndex.value = -1;
    }
  },
  { deep: true },
);

watch(activeIndex, async (index) => {
  if (index < 0) {
    return;
  }

  await nextTick();
  const element = document.getElementById(optionId(index));
  element?.scrollIntoView({ block: "nearest" });
});
</script>

<template>
  <ul
    :id="listboxId"
    role="listbox"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
    :aria-activedescendant="ariaActiveDescendant"
    tabindex="0"
    @focus="ensureActiveIndexInitialized"
    @click.stop
    @keydown="onListboxKeydown"
  >
    <MenuItem
      v-for="(item, index) in props.items"
      :id="optionId(index)"
      :key="item.id"
      :item="item"
      :selected="isSelected(item)"
      :active="index === activeIndex"
      @mouseenter="!item.disabled && (activeIndex = index)"
      @click="
        () => {
          activeIndex = index;
          handleSelect(item);
        }
      "
    />

    <div v-if="isEmpty" class="empty-state">
      {{ props.emptyText }}
    </div>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-12x);
  height: calc(var(--kds-dimension-component-height-1-5x) * 6);
  padding: var(--kds-spacing-container-0-25x);
  margin: 0;
  overflow: auto;
  overscroll-behavior: contain;
  list-style: none;
  border: var(--kds-border-base-subtle);
  border-radius: var(--kds-border-radius-container-0-31x);

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(var(--kds-dimension-component-height-1-5x) * 6);
  padding: var(--kds-spacing-container-0-75x) var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-interactive-small);
  color: var(--kds-color-text-and-icon-muted);
}
</style>
