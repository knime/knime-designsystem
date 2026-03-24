<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { useVirtualList } from "@vueuse/core";

import KdsEmptyState from "../../../layouts/EmptyState/KdsEmptyState.vue";
import { KdsListItem } from "../../_helper/List/KdsListItem";

import type { KdsMultiselectListBoxProps } from "./types";

const OPTION_LINE_HEIGHT = 24;
const CLICK_META_KEY_TIMEOUT = 250;

const props = withDefaults(defineProps<KdsMultiselectListBoxProps>(), {
  disabled: false,
  size: 0,
  multiselectByClick: false,
});

const modelValue = defineModel<string[]>({ default: () => [] });

const emit = defineEmits<{
  /** Emitted when an item is double-clicked */
  doubleClickOnItem: [id: string, index: number];
  /** Emitted when items are double-clicked while shift is held */
  doubleClickShift: [ids: string[]];
  /** Emitted when the left arrow key is pressed */
  keyArrowLeft: [ids: string[]];
  /** Emitted when the right arrow key is pressed */
  keyArrowRight: [ids: string[]];
}>();

const idPrefix = useId();

const generateOptionId = (itemId: string) => {
  const cleanId = itemId.replace(/[^\w]/gi, "");
  return `${idPrefix}-option-${cleanId}`;
};

// Virtual list setup
const {
  containerProps,
  wrapperProps,
  list: virtualList,
  scrollTo,
} = useVirtualList(
  computed(() => props.possibleValues),
  { itemHeight: OPTION_LINE_HEIGHT },
);

// Keep scroll position when possibleValues change
watch(
  () => props.possibleValues,
  () => {
    const el = containerProps.ref.value as HTMLElement | null;
    if (!el) {
      return;
    }
    const scrollTop = el.scrollTop;
    scrollTo(
      Math.max(
        Math.min(
          Math.floor(scrollTop / OPTION_LINE_HEIGHT),
          props.possibleValues.length - 1,
        ),
        0,
      ),
    );
  },
);

// Navigation state
const currentKeyNavIndex = ref(0);
const isKeyboardNavigating = ref(false);
const shiftStartIndex = ref(-1);
const draggingStartIndex = ref(-1);
const draggingInverseMode = ref(false);

const isCurrentValue = (id: string) => modelValue.value.includes(id);

const cssStyleSize = computed(() => {
  const pxSize = `${props.size * OPTION_LINE_HEIGHT}px`;
  return props.size > 0 ? { height: pxSize } : {};
});

const activeDescendantId = computed(() => {
  if (!isKeyboardNavigating.value) {
    return undefined;
  }
  const item = props.possibleValues[currentKeyNavIndex.value];
  return item ? generateOptionId(item.id) : undefined;
});

// Selection helpers
const setSelectedNoShiftReset = (values: string[]) => {
  modelValue.value = values;
};

const setSelected = (values: string[]) => {
  shiftStartIndex.value = -1;
  setSelectedNoShiftReset(values);
};

const addToSelection = (value: string) => {
  if (!modelValue.value.includes(value)) {
    setSelected([...modelValue.value, value]);
    return true;
  }
  return false;
};

const removeFromSelection = (value: string) => {
  if (modelValue.value.includes(value)) {
    setSelected(modelValue.value.filter((v) => v !== value));
    return true;
  }
  return false;
};

const toggleSelection = (value: string) => {
  if (modelValue.value.includes(value)) {
    removeFromSelection(value);
  } else {
    addToSelection(value);
  }
};

const setSelectedToIndex = (index: number) => {
  const item = props.possibleValues[index];
  if (item) {
    setSelected([item.id]);
  }
};

const getPossibleValuesInSection = (
  firstIndex: number,
  secondIndex: number,
) => {
  const start = Math.min(firstIndex, secondIndex);
  const end = Math.max(firstIndex, secondIndex);
  return props.possibleValues.slice(start, end + 1).map((x) => x.id);
};

// Click handlers
const handleCtrlClick = (value: string, index: number) => {
  currentKeyNavIndex.value = index;
  toggleSelection(value);
};

// Debounced Ctrl/Meta click handler (Mac fires multiple click events with metaKey)
let metaClickTimer: ReturnType<typeof setTimeout> | null = null;
const debouncedHandleCtrlClick = (value: string, index: number) => {
  if (metaClickTimer !== null) {
    clearTimeout(metaClickTimer);
  }
  metaClickTimer = setTimeout(() => {
    handleCtrlClick(value, index);
    metaClickTimer = null;
  }, CLICK_META_KEY_TIMEOUT);
};

const handleShiftClick = (_value: string, clickedIndex: number) => {
  setSelected(
    getPossibleValuesInSection(currentKeyNavIndex.value, clickedIndex),
  );
};

const handleClick = (event: MouseEvent, value: string, index: number) => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = false;
  event.preventDefault();
  if (event.metaKey) {
    debouncedHandleCtrlClick(value, index);
    return;
  }
  if (event.ctrlKey) {
    handleCtrlClick(value, index);
    return;
  }
  if (event.shiftKey) {
    handleShiftClick(value, index);
    return;
  }
  if (!props.multiselectByClick) {
    modelValue.value = [];
  }
  currentKeyNavIndex.value = index;
  toggleSelection(value);
};

const handleDblClick = (id: string, index: number) => {
  if (props.disabled) {
    return;
  }
  emit("doubleClickOnItem", id, index);
};

const handleShiftDblClick = () => {
  if (props.disabled) {
    return;
  }
  emit("doubleClickShift", modelValue.value);
};

// Drag selection
const getDataOptionIndex = (target: HTMLElement): string | undefined =>
  (target.closest("[data-option-index]") as HTMLElement | null)?.dataset
    .optionIndex;

const onStartDrag = (e: MouseEvent) => {
  if (props.disabled || e.shiftKey) {
    return;
  }
  isKeyboardNavigating.value = false;
  if (e.ctrlKey || e.metaKey) {
    draggingInverseMode.value = true;
  }
  const target = e.target as HTMLElement;
  const index = getDataOptionIndex(target);
  if (index) {
    draggingStartIndex.value = Number(index);
  }
};

const onDrag = (e: MouseEvent) => {
  if (draggingStartIndex.value === -1) {
    return;
  }
  const target = e.target as HTMLElement;
  const dataIndex = getDataOptionIndex(target);
  if (!dataIndex) {
    return;
  }
  const index = Number(dataIndex);
  let sectionValues = getPossibleValuesInSection(
    draggingStartIndex.value,
    index,
  );
  if (draggingInverseMode.value) {
    sectionValues = modelValue.value.filter((x) => !sectionValues.includes(x));
  }
  setSelected(sectionValues);
};

const onStopDrag = () => {
  draggingStartIndex.value = -1;
  draggingInverseMode.value = false;
};

// Scroll helpers
const scrollToCurrent = () => {
  const el = containerProps.ref.value as HTMLElement | null;
  if (!el) {
    return;
  }
  const index = currentKeyNavIndex.value;
  if (el.scrollHeight > el.clientHeight) {
    const scrollBottom = el.clientHeight + el.scrollTop;
    const elementTop = index * OPTION_LINE_HEIGHT;
    const elementBottom = elementTop + OPTION_LINE_HEIGHT;
    if (elementTop < el.scrollTop) {
      el.scrollTop = elementTop;
    } else if (elementBottom > scrollBottom) {
      el.scrollTop = elementBottom - el.clientHeight;
    }
  }
};

// Keyboard navigation
const isOutOfRange = (index: number) =>
  index < 0 || index >= props.possibleValues.length;

const onArrowDown = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  const next = currentKeyNavIndex.value + 1;
  if (isOutOfRange(next)) {
    return;
  }
  setSelectedToIndex(next);
  currentKeyNavIndex.value = next;
  scrollToCurrent();
};

const onArrowUp = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  const next = currentKeyNavIndex.value - 1;
  if (isOutOfRange(next)) {
    return;
  }
  setSelectedToIndex(next);
  currentKeyNavIndex.value = next;
  scrollToCurrent();
};

const onArrowDownShift = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  if (shiftStartIndex.value === -1) {
    shiftStartIndex.value = currentKeyNavIndex.value;
  }
  const next = currentKeyNavIndex.value + 1;
  if (isOutOfRange(next)) {
    return;
  }
  setSelectedNoShiftReset(
    getPossibleValuesInSection(shiftStartIndex.value, next),
  );
  currentKeyNavIndex.value = next;
  scrollToCurrent();
};

const onArrowUpShift = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  if (shiftStartIndex.value === -1) {
    shiftStartIndex.value = currentKeyNavIndex.value;
  }
  const next = currentKeyNavIndex.value - 1;
  if (isOutOfRange(next)) {
    return;
  }
  setSelectedNoShiftReset(
    getPossibleValuesInSection(shiftStartIndex.value, next),
  );
  currentKeyNavIndex.value = next;
  scrollToCurrent();
};

const onEndKey = () => {
  isKeyboardNavigating.value = true;
  const next = props.possibleValues.length - 1;
  setSelectedToIndex(next);
  currentKeyNavIndex.value = next;
  const el = containerProps.ref.value as HTMLElement | null;
  if (el) {
    el.scrollTop = el.scrollHeight;
  }
};

const onHomeKey = () => {
  isKeyboardNavigating.value = true;
  setSelectedToIndex(0);
  currentKeyNavIndex.value = 0;
  const el = containerProps.ref.value as HTMLElement | null;
  if (el) {
    el.scrollTop = 0;
  }
};

const onArrowLeft = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  emit("keyArrowLeft", modelValue.value);
};

const onArrowRight = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  emit("keyArrowRight", modelValue.value);
};

const onCtrlA = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  setSelected(props.possibleValues.map((x) => x.id));
};

const focus = () => {
  if (props.disabled) {
    return;
  }
  (containerProps.ref.value as HTMLElement | null)?.focus();
};

const clearSelection = () => {
  if (props.disabled) {
    return;
  }
  setSelected([]);
};

const hasSelection = () => modelValue.value.length > 0;

// Lifecycle
onMounted(() => {
  globalThis.addEventListener("mouseup", onStopDrag);
  const lastItem = modelValue.value[modelValue.value.length - 1];
  if (lastItem) {
    const idx = props.possibleValues.findIndex((x) => x.id === lastItem);
    if (idx >= 0) {
      currentKeyNavIndex.value = idx;
    }
  }
});

onBeforeUnmount(() => {
  globalThis.removeEventListener("mouseup", onStopDrag);
});

defineExpose({ focus, clearSelection, hasSelection });
</script>

<template>
  <div
    :class="['kds-multiselect-list-box', { disabled: props.disabled }]"
    :style="cssStyleSize"
  >
    <ul
      v-bind="containerProps"
      role="listbox"
      tabindex="0"
      aria-multiselectable="true"
      :aria-label="props.ariaLabel"
      :aria-activedescendant="activeDescendantId"
      :class="[
        'kds-multiselect-list-box-list',
        { disabled: props.disabled, empty: possibleValues.length === 0 },
      ]"
      @keydown.ctrl.a.prevent.exact="onCtrlA"
      @keydown.up.prevent.exact="onArrowUp"
      @keydown.down.prevent.exact="onArrowDown"
      @keydown.shift.up.prevent.exact="onArrowUpShift"
      @keydown.shift.down.prevent.exact="onArrowDownShift"
      @keydown.left.prevent.exact="onArrowLeft"
      @keydown.right.prevent.exact="onArrowRight"
      @keydown.home.prevent.exact="onHomeKey"
      @keydown.end.prevent.exact="onEndKey"
      @mousedown="onStartDrag"
      @mousemove="onDrag"
    >
      <div v-bind="wrapperProps">
        <KdsListItem
          v-for="{ data: item, index } of virtualList"
          :id="generateOptionId(item.id)"
          :key="`listbox-${item.id}`"
          :label="item.text"
          :accessory="item.accessory"
          :data-option-index="index"
          :selected="isCurrentValue(item.id)"
          :special="item.special"
          :disabled="props.disabled"
          :active="isKeyboardNavigating && currentKeyNavIndex === index"
          @click="handleClick($event, item.id, index)"
          @dblclick.shift="handleShiftDblClick()"
          @dblclick.exact="handleDblClick(item.id, index)"
        />
      </div>
    </ul>
    <div v-if="possibleValues.length === 0" class="kds-multiselect-empty">
      <KdsEmptyState headline="No entries in this list" />
    </div>
  </div>
</template>

<style scoped>
.kds-multiselect-list-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: var(--kds-dimension-component-height-2-5x);
  border: var(--kds-border-base-subtle);
  border-radius: var(--kds-border-radius-container-0-31x);

  &:has(:focus-visible) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }
}

.kds-multiselect-list-box-list {
  position: relative;
  flex-grow: 1;
  gap: var(--kds-spacing-container-0-10x);
  min-width: var(--kds-dimension-component-width-12x);
  padding: var(--kds-spacing-container-0-25x);
  margin: 0;
  overflow-y: auto;
  list-style: none;
  background: var(--kds-color-background-neutral-initial);

  &.empty {
    background: var(--kds-color-surface-default);
  }

  &:focus {
    outline: none;
  }
}

.kds-multiselect-empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
</style>
