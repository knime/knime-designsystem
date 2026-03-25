<script setup lang="ts">
import { computed, defineComponent, toRef, useId, watch } from "vue";
import { useVirtualList } from "@vueuse/core";

import {
  kdsDimensionComponentHeight12p5x,
  kdsDimensionComponentHeight1p5x,
  kdsDimensionComponentHeight20x,
  kdsSpacingContainer0p10x,
} from "../../../../../styles/dist/tokens/ts/_tokens"; // temporary import until tokens are officially exported in @knime/kds-styles
import KdsEmptyState from "../../../layouts/EmptyState/KdsEmptyState.vue";
import KdsResizeContainer from "../../../layouts/ResizeContainer/KdsResizeContainer.vue";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import { KdsListItem } from "../../_helper/List/KdsListItem";

import type { KdsMultiSelectListBoxProps } from "./types";
import { useMultiSelectListBoxSelection } from "./useMultiSelectListBoxSelection";

const OPTION_LINE_HEIGHT =
  kdsDimensionComponentHeight1p5x + kdsSpacingContainer0p10x;

const PassThroughResizeContainer = defineComponent({
  inheritAttrs: false,
  setup(_, { slots }) {
    return () => slots.default?.({ contentStyle: undefined });
  },
});

const props = withDefaults(defineProps<KdsMultiSelectListBoxProps>(), {
  disabled: false,
  bottomValue: undefined,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  useResizeHandle: false,
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
  /** Emitted when the enter key is pressed */
  keyEnter: [ids: string[]];
}>();

const idPrefix = useId();

const generateOptionId = (itemId: string) =>
  `${idPrefix}-option-${encodeURIComponent(itemId)}`;

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

const scrollToIndex = (index: number) => {
  if (index === bottomIndex.value && props.bottomValue) {
    return;
  }
  const item = allValues.value[index];
  if (!item) {
    return;
  }
  const el = containerProps.ref.value as HTMLElement | null;
  if (!el) {
    return;
  }
  const itemEl = globalThis.document.getElementById(generateOptionId(item.id));
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
    scrollTo(index);
  }
};

const {
  currentKeyNavIndex,
  isKeyboardNavigating,
  isCurrentValue,
  activeDescendantId,
  handleClick,
  onStartDrag,
  onDrag,
  onArrowDown,
  onArrowUp,
  onArrowDownShift,
  onArrowUpShift,
  onEndKey,
  onHomeKey,
  onEndKeyShift,
  onHomeKeyShift,
  onCtrlA,
  onFocus,
  onBlur,
} = useMultiSelectListBoxSelection({
  modelValue,
  allValues,
  disabled: toRef(props, "disabled"),
  generateOptionId,
  scrollToIndex,
});

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

const onArrowLeft = () => {
  if (!props.disabled) {
    emit("keyArrowLeft", modelValue.value);
  }
};
const onArrowRight = () => {
  if (!props.disabled) {
    emit("keyArrowRight", modelValue.value);
  }
};
const onEnter = () => {
  if (!props.disabled) {
    emit("keyEnter", modelValue.value);
  }
};

const focus = () => {
  if (!props.disabled) {
    (containerProps.ref.value as HTMLElement | null)?.focus();
  }
};

defineExpose({ focus });
</script>

<template>
  <BaseFormFieldWrapper
    :id="props.id"
    :label="props.label"
    :aria-label="props.ariaLabel"
    :description="props.description"
    :sub-text="props.subText"
    :error="props.error"
    :validating="props.validating"
    :preserve-sub-text-space="props.preserveSubTextSpace"
  >
    <template #default="slotProps">
      <component
        :is="
          props.useResizeHandle
            ? KdsResizeContainer
            : PassThroughResizeContainer
        "
        :height="kdsDimensionComponentHeight20x"
        :min-height="kdsDimensionComponentHeight12p5x"
      >
        <template #default="{ contentStyle }">
          <div class="kds-multiselect-list-box" :style="contentStyle">
            <div
              v-bind="containerProps"
              :id="slotProps.id"
              role="listbox"
              :tabindex="props.disabled ? -1 : 0"
              aria-multiselectable="true"
              :aria-labelledby="slotProps.ariaLabelledby"
              :aria-describedby="slotProps.ariaDescribedby"
              :aria-label="slotProps.ariaLabel"
              :aria-invalid="slotProps.ariaInvalid"
              :aria-activedescendant="activeDescendantId"
              :aria-disabled="props.disabled"
              class="kds-multiselect-list-box-list"
              @keydown.ctrl.a.prevent.exact="onCtrlA"
              @keydown.meta.a.prevent.exact="onCtrlA"
              @keydown.up.prevent.exact="onArrowUp"
              @keydown.down.prevent.exact="onArrowDown"
              @keydown.shift.up.prevent.exact="onArrowUpShift"
              @keydown.shift.down.prevent.exact="onArrowDownShift"
              @keydown.left.prevent.exact="onArrowLeft"
              @keydown.right.prevent.exact="onArrowRight"
              @keydown.enter.prevent.exact="onEnter"
              @keydown.home.prevent.exact="onHomeKey"
              @keydown.end.prevent.exact="onEndKey"
              @keydown.shift.home.prevent.exact="onHomeKeyShift"
              @keydown.shift.end.prevent.exact="onEndKeyShift"
              @mousedown="onStartDrag"
              @mousemove="onDrag"
              @focus="onFocus"
              @blur="onBlur"
            >
              <div class="kds-multiselect-list-box-content-grid">
                <div
                  class="kds-multiselect-list-box-content"
                  v-bind="wrapperProps"
                >
                  <KdsListItem
                    v-for="{ data: item, index } of virtualList"
                    :id="generateOptionId(item.id)"
                    :key="`listbox-${item.id}`"
                    :class="[
                      'kds-multiselect-list-box-item',
                      { 'kds-multiselect-list-box-item-first': index === 0 },
                    ]"
                    :label="item.text"
                    :accessory="item.accessory"
                    :missing="item.missing"
                    :data-option-index="index"
                    :selected="isCurrentValue(item.id)"
                    :disabled="props.disabled"
                    :active="
                      isKeyboardNavigating && currentKeyNavIndex === index
                    "
                    :trailing-icon="
                      item.missing && !props.disabled
                        ? 'trash'
                        : isCurrentValue(item.id)
                          ? 'checkmark'
                          : undefined
                    "
                    @dblclick.exact="handleDblClick(item.id, index)"
                    @click="handleClick($event, item.id, index)"
                    @dblclick.shift="handleShiftDblClick()"
                  />
                </div>
                <div
                  v-if="props.bottomValue"
                  class="kds-multiselect-sticky-bottom"
                >
                  <KdsListItem
                    :id="generateOptionId(props.bottomValue.id)"
                    :label="props.bottomValue.text"
                    :accessory="props.bottomValue.accessory"
                    :missing="props.bottomValue.missing"
                    :data-option-index="bottomIndex"
                    :selected="isCurrentValue(props.bottomValue.id)"
                    :disabled="props.disabled"
                    :active="
                      isKeyboardNavigating && currentKeyNavIndex === bottomIndex
                    "
                    special
                    :trailing-icon="
                      props.bottomValue.missing && !props.disabled
                        ? 'trash'
                        : isCurrentValue(props.bottomValue.id)
                          ? 'checkmark'
                          : undefined
                    "
                    @click="
                      handleClick($event, props.bottomValue.id, bottomIndex)
                    "
                    @dblclick.shift="handleShiftDblClick()"
                    @dblclick.exact="
                      handleDblClick(props.bottomValue.id, bottomIndex)
                    "
                  />
                </div>
              </div>
            </div>
            <div
              v-if="props.possibleValues.length === 0 && !props.bottomValue"
              class="kds-multiselect-empty"
            >
              <KdsEmptyState headline="No entries in this list" />
            </div>
          </div>
        </template>
      </component>
    </template>
  </BaseFormFieldWrapper>
</template>

<style scoped>
.kds-multiselect-list-box {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  min-block-size: 0;
  background: var(--kds-color-surface-default);
  border: var(--kds-border-action-input);
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
  padding: calc(
    var(--kds-spacing-container-0-25x) - var(--kds-core-border-width-xs)
  );
  margin: 0;
  overflow-y: auto;

  &:focus {
    outline: none;
  }
}

.kds-multiselect-list-box-item {
  height: var(--kds-dimension-component-height-1-5x);
  margin-top: var(--kds-spacing-container-0-10x);

  &.kds-multiselect-list-box-item-first {
    margin-top: 0;
  }
}

.kds-multiselect-list-box-content-grid {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: calc(100% - 2 * var(--kds-core-border-width-xs));
}

.kds-multiselect-list-box-content {
  min-width: 0;
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
