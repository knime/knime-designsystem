<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { useVirtualList } from "@vueuse/core";

import KdsEmptyState from "../../../layouts/EmptyState/KdsEmptyState.vue";
import { KdsListItem } from "../../_helper/List/KdsListItem";

import type {
  KdsMultiselectListBoxOption,
  KdsMultiselectListBoxProps,
} from "./types";

const OPTION_LINE_HEIGHT = 24;
const CLICK_META_KEY_TIMEOUT = 250;

const props = withDefaults(defineProps<KdsMultiselectListBoxProps>(), {
  disabled: false,
  size: 0,
  bottomValue: undefined,
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

const generateOptionId = (itemId: string) =>
  `${idPrefix}-option-${itemId.replace(/[^\w]/gi, "")}`;

/** All values including the optional bottom value — used for index-based operations */
const allValues = computed(() =>
  props.bottomValue
    ? [...props.possibleValues, props.bottomValue]
    : props.possibleValues,
);

const bottomIndex = computed(() => props.possibleValues.length);

const {
  containerProps,
  wrapperProps,
  list: virtualList,
  scrollTo,
} = useVirtualList(
  computed(() => props.possibleValues),
  { itemHeight: OPTION_LINE_HEIGHT },
);

watch(
  () => props.possibleValues,
  () => {
    const el = containerProps.ref.value as HTMLElement | null;
    if (!el) {
      return;
    }
    scrollTo(
      Math.max(
        Math.min(
          Math.floor(el.scrollTop / OPTION_LINE_HEIGHT),
          props.possibleValues.length - 1,
        ),
        0,
      ),
    );
  },
);

const currentKeyNavIndex = ref(0);
const isKeyboardNavigating = ref(false);
const shiftStartIndex = ref(-1);
const draggingStartIndex = ref(-1);
const draggingInverseMode = ref(false);

const isCurrentValue = (id: string) => modelValue.value.includes(id);

const cssStyleSize = computed(() =>
  props.size > 0 ? { height: `${props.size * OPTION_LINE_HEIGHT}px` } : {},
);

const activeDescendantId = computed(() => {
  if (!isKeyboardNavigating.value) {
    return undefined;
  }
  const item = allValues.value[currentKeyNavIndex.value];
  return item ? generateOptionId(item.id) : undefined;
});

const setSelectedNoShiftReset = (values: string[]) => {
  modelValue.value = values;
};
const setSelected = (values: string[]) => {
  shiftStartIndex.value = -1;
  setSelectedNoShiftReset(values);
};

const toggleSelection = (value: string) => {
  if (modelValue.value.includes(value)) {
    setSelected(modelValue.value.filter((v) => v !== value));
  } else {
    setSelected([...modelValue.value, value]);
  }
};

const setSelectedToIndex = (index: number) => {
  const item = allValues.value[index];
  if (item) {
    setSelected([item.id]);
  }
};

const getPossibleValuesInSection = (first: number, second: number) => {
  const start = Math.min(first, second);
  const end = Math.max(first, second);
  return allValues.value.slice(start, end + 1).map((x) => x.id);
};

const handleCtrlClick = (value: string, index: number) => {
  currentKeyNavIndex.value = index;
  toggleSelection(value);
};

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
    setSelected(getPossibleValuesInSection(currentKeyNavIndex.value, index));
    return;
  }
  currentKeyNavIndex.value = index;
  setSelected([value]);
};

const handleDblClick = (id: string, index: number) => {
  if (!props.disabled) {
    emit("doubleClickOnItem", id, index);
  }
};
const handleShiftDblClick = () => {
  if (!props.disabled) {
    emit("doubleClickShift", modelValue.value);
  }
};

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
  const index = getDataOptionIndex(e.target as HTMLElement);
  if (index !== undefined) {
    draggingStartIndex.value = Number(index);
  }
};

const onDrag = (e: MouseEvent) => {
  if (draggingStartIndex.value === -1) {
    return;
  }
  const dataIndex = getDataOptionIndex(e.target as HTMLElement);
  if (dataIndex === undefined) {
    return;
  }
  let sectionValues = getPossibleValuesInSection(
    draggingStartIndex.value,
    Number(dataIndex),
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

const scrollToCurrent = () => {
  if (currentKeyNavIndex.value === bottomIndex.value && props.bottomValue) {
    return;
  }
  const item = allValues.value[currentKeyNavIndex.value];
  if (!item) {
    return;
  }
  const el = containerProps.ref.value as HTMLElement | null;
  if (!el) {
    return;
  }
  const itemEl = el.querySelector(`#${CSS.escape(generateOptionId(item.id))}`);
  if (itemEl) {
    itemEl.scrollIntoView({ block: "nearest" });
    if (props.bottomValue) {
      const stickyEl = el.querySelector(".kds-multiselect-sticky-bottom");
      if (stickyEl) {
        const itemRect = itemEl.getBoundingClientRect();
        const stickyRect = stickyEl.getBoundingClientRect();
        if (itemRect.bottom > stickyRect.top) {
          el.scrollTop += itemRect.bottom - stickyRect.top;
        }
      }
    }
  } else {
    scrollTo(currentKeyNavIndex.value);
  }
};

const isOutOfRange = (index: number) =>
  index < 0 || index >= allValues.value.length;

const navigateTo = (next: number, select: "single" | "shift") => {
  if (select === "shift") {
    if (shiftStartIndex.value === -1) {
      shiftStartIndex.value = currentKeyNavIndex.value;
    }
    setSelectedNoShiftReset(
      getPossibleValuesInSection(shiftStartIndex.value, next),
    );
  } else {
    setSelectedToIndex(next);
  }
  currentKeyNavIndex.value = next;
  scrollToCurrent();
};

const onArrowDown = () => {
  if (props.disabled || isOutOfRange(currentKeyNavIndex.value + 1)) {
    return;
  }
  isKeyboardNavigating.value = true;
  navigateTo(currentKeyNavIndex.value + 1, "single");
};
const onArrowUp = () => {
  if (props.disabled || isOutOfRange(currentKeyNavIndex.value - 1)) {
    return;
  }
  isKeyboardNavigating.value = true;
  navigateTo(currentKeyNavIndex.value - 1, "single");
};
const onArrowDownShift = () => {
  if (props.disabled || isOutOfRange(currentKeyNavIndex.value + 1)) {
    return;
  }
  isKeyboardNavigating.value = true;
  navigateTo(currentKeyNavIndex.value + 1, "shift");
};
const onArrowUpShift = () => {
  if (props.disabled || isOutOfRange(currentKeyNavIndex.value - 1)) {
    return;
  }
  isKeyboardNavigating.value = true;
  navigateTo(currentKeyNavIndex.value - 1, "shift");
};
const onEndKey = () => {
  isKeyboardNavigating.value = true;
  navigateTo(allValues.value.length - 1, "single");
};
const onHomeKey = () => {
  isKeyboardNavigating.value = true;
  navigateTo(0, "single");
};
const onEndKeyShift = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  navigateTo(allValues.value.length - 1, "shift");
};
const onHomeKeyShift = () => {
  if (props.disabled) {
    return;
  }
  isKeyboardNavigating.value = true;
  navigateTo(0, "shift");
};

const onArrowLeft = () => {
  if (!props.disabled) {
    isKeyboardNavigating.value = true;
    emit("keyArrowLeft", modelValue.value);
  }
};
const onArrowRight = () => {
  if (!props.disabled) {
    isKeyboardNavigating.value = true;
    emit("keyArrowRight", modelValue.value);
  }
};
const onCtrlA = () => {
  if (!props.disabled) {
    isKeyboardNavigating.value = true;
    setSelected(allValues.value.map((x) => x.id));
  }
};

const focus = () => {
  if (!props.disabled) {
    (containerProps.ref.value as HTMLElement | null)?.focus();
  }
};

const getItemProps = (item: KdsMultiselectListBoxOption, index: number) => ({
  id: generateOptionId(item.id),
  label: item.text,
  accessory: item.accessory,
  "data-option-index": index,
  selected: isCurrentValue(item.id),
  disabled: props.disabled,
  active: isKeyboardNavigating.value && currentKeyNavIndex.value === index,
  "trailing-icon": isCurrentValue(item.id) ? "checkmark" : undefined,
});

onMounted(() => {
  globalThis.addEventListener("mouseup", onStopDrag);
  const lastItem = modelValue.value[modelValue.value.length - 1];
  if (lastItem) {
    const idx = allValues.value.findIndex((x) => x.id === lastItem);
    if (idx >= 0) {
      currentKeyNavIndex.value = idx;
    }
  }
});

onBeforeUnmount(() => {
  globalThis.removeEventListener("mouseup", onStopDrag);
  if (metaClickTimer !== null) {
    clearTimeout(metaClickTimer);
    metaClickTimer = null;
  }
});

defineExpose({ focus });
</script>

<template>
  <div
    :class="['kds-multiselect-list-box', { disabled: props.disabled }]"
    :style="cssStyleSize"
  >
    <div
      v-bind="containerProps"
      role="listbox"
      :tabindex="props.disabled ? undefined : 0"
      aria-multiselectable="true"
      :aria-label="props.ariaLabel"
      :aria-activedescendant="activeDescendantId"
      :aria-disabled="props.disabled"
      :class="[
        'kds-multiselect-list-box-list',
        { disabled: props.disabled, empty: possibleValues.length === 0 },
      ]"
      @keydown.ctrl.a.prevent.exact="onCtrlA"
      @keydown.meta.a.prevent.exact="onCtrlA"
      @keydown.up.prevent.exact="onArrowUp"
      @keydown.down.prevent.exact="onArrowDown"
      @keydown.shift.up.prevent.exact="onArrowUpShift"
      @keydown.shift.down.prevent.exact="onArrowDownShift"
      @keydown.left.prevent.exact="onArrowLeft"
      @keydown.right.prevent.exact="onArrowRight"
      @keydown.home.prevent.exact="onHomeKey"
      @keydown.end.prevent.exact="onEndKey"
      @keydown.shift.home.prevent.exact="onHomeKeyShift"
      @keydown.shift.end.prevent.exact="onEndKeyShift"
      @mousedown="onStartDrag"
      @mousemove="onDrag"
    >
      <div v-bind="wrapperProps">
        <KdsListItem
          v-for="{ data: item, index } of virtualList"
          :key="`listbox-${item.id}`"
          v-bind="getItemProps(item, index)"
          @click="handleClick($event, item.id, index)"
          @dblclick.shift="handleShiftDblClick()"
          @dblclick.exact="handleDblClick(item.id, index)"
        />
      </div>
      <div v-if="props.bottomValue" class="kds-multiselect-sticky-bottom">
        <KdsListItem
          v-bind="getItemProps(props.bottomValue, bottomIndex)"
          special
          @click="handleClick($event, props.bottomValue.id, bottomIndex)"
          @dblclick.shift="handleShiftDblClick()"
          @dblclick.exact="handleDblClick(props.bottomValue.id, bottomIndex)"
        />
      </div>
    </div>
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
  min-width: var(--kds-dimension-component-width-12x);
  padding: var(--kds-spacing-container-0-25x);
  margin: 0;
  overflow-y: auto;
  background: var(--kds-color-background-neutral-initial);

  &.empty {
    background: var(--kds-color-surface-default);
  }

  &:focus {
    outline: none;
  }
}

.kds-multiselect-sticky-bottom {
  position: sticky;
  bottom: calc(-1 * var(--kds-spacing-container-0-25x));
  padding: var(--kds-spacing-container-0-25x) 0;
  margin-bottom: calc(-1 * var(--kds-spacing-container-0-25x));
  background: var(--kds-color-surface-default);
  border-top: var(--kds-border-base-subtle);
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
