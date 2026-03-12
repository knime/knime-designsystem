<script setup lang="ts">
import { computed, nextTick, ref, toRef, useTemplateRef, watch } from "vue";
import { useElementSize } from "@vueuse/core";

import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import { elementOverflowsHorizontally } from "../../util/useKdsIsTruncated";

import type { KdsTabBarItem, KdsTabBarProps } from "./types";
import { useTabBarIconHiding } from "./useTabBarIconHiding";

const props = withDefaults(defineProps<KdsTabBarProps>(), {
  size: "small",
  fullWidth: false,
  disabled: false,
});

const modelValue = defineModel<string | number>({ required: false });

const emit = defineEmits<{
  tabSelect: [tab: KdsTabBarItem];
}>();

const tabRefs = ref<Map<string | number, HTMLButtonElement>>(new Map());

const setTabRef = (value: string | number, el: unknown) => {
  if (el instanceof HTMLButtonElement) {
    tabRefs.value.set(value, el);
  } else {
    tabRefs.value.delete(value);
  }
};

const isTabDisabled = (tab: KdsTabBarItem) => props.disabled || tab.disabled;

const selectTab = (tab: KdsTabBarItem) => {
  if (!isTabDisabled(tab) && modelValue.value !== tab.value) {
    modelValue.value = tab.value;
    emit("tabSelect", tab);
  }
};

const getEnabledTabs = () => props.tabs.filter((tab) => !isTabDisabled(tab));

const handleKeydown = (event: KeyboardEvent, currentTab: KdsTabBarItem) => {
  const enabledTabs = getEnabledTabs();
  const currentIndex = enabledTabs.findIndex(
    (tab) => tab.value === currentTab.value,
  );

  let targetIndex: number | null = null;

  switch (event.key) {
    case "ArrowLeft":
      targetIndex =
        currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
      break;
    case "ArrowRight":
      targetIndex =
        currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
      break;
    case "Home":
      targetIndex = 0;
      break;
    case "End":
      targetIndex = enabledTabs.length - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  const targetTab = enabledTabs[targetIndex];
  selectTab(targetTab);
  tabRefs.value.get(targetTab.value)?.focus();
};

const availableWidthContainer = useTemplateRef<HTMLElement>(
  "availableWidthContainer",
);
const { width } = useElementSize(availableWidthContainer);
const { shouldHideIcons, setItemEl } = useTabBarIconHiding({
  width,
  tabs: toRef(props, "tabs"),
  containerEl: availableWidthContainer,
});

const tabBarClass = computed(() => ({
  "kds-tab-bar": true,
  [`kds-tab-bar-${props.size}`]: true,
  "kds-tab-bar-full-width": props.fullWidth,
}));

// The tab that should receive tabindex=0 (keyboard-focusable).
// Prefers the selected tab if it's enabled; otherwise falls back to the first enabled tab.
const focusableTabValue = computed(() => {
  const enabledTabs = getEnabledTabs();
  const selectedIsEnabled = enabledTabs.some(
    (tab) => tab.value === modelValue.value,
  );
  if (selectedIsEnabled) {
    return modelValue.value;
  }
  return enabledTabs[0]?.value ?? null;
});

const truncatedTabs = ref<Set<string | number>>(new Set());

watch(
  () => [width.value, shouldHideIcons.value, props.tabs] as const,
  async () => {
    await nextTick();
    const newSet = new Set<string | number>();
    for (const [value, el] of tabRefs.value) {
      const label = el.querySelector<HTMLElement>(".kds-tab-label");
      if (elementOverflowsHorizontally(label)) {
        newSet.add(value);
      }
    }
    truncatedTabs.value = newSet;
  },
  { immediate: true },
);

const getTabTitle = (tab: KdsTabBarItem) =>
  truncatedTabs.value.has(tab.value) ? (tab.title ?? tab.label) : undefined;

// Auto-select first available tab when current selection is invalid
// (on mount, when tabs change, or when the selected tab becomes disabled)
watch(
  () => [props.tabs, props.disabled, modelValue.value] as const,
  () => {
    const enabledTabs = getEnabledTabs();
    const isCurrentSelectionValid = enabledTabs.some(
      (tab) => tab.value === modelValue.value,
    );

    if (!isCurrentSelectionValid) {
      const firstEnabled = enabledTabs[0];
      if (firstEnabled) {
        modelValue.value = firstEnabled.value;
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <div ref="availableWidthContainer" :class="tabBarClass" role="tablist">
    <button
      v-for="tab in tabs"
      :id="tab.id"
      :key="tab.value"
      :ref="
        (el) => {
          setItemEl(tab.value, el);
          setTabRef(tab.value, el);
        }
      "
      type="button"
      role="tab"
      :title="getTabTitle(tab)"
      :aria-selected="modelValue === tab.value"
      :aria-controls="tab.panelId"
      :tabindex="focusableTabValue === tab.value ? 0 : -1"
      :disabled="isTabDisabled(tab)"
      :class="{
        'kds-tab': true,
        'kds-tab-selected': modelValue === tab.value,
      }"
      @click="selectTab(tab)"
      @keydown="handleKeydown($event, tab)"
    >
      <KdsIcon
        v-if="tab.trailingIcon && !shouldHideIcons"
        :name="tab.trailingIcon"
        class="kds-tab-icon"
      />
      <span class="kds-tab-label">{{ tab.label }}</span>
      <span v-if="modelValue === tab.value" class="kds-tab-indicator" />
    </button>
  </div>
</template>

<style scoped>
.kds-tab-icon {
  flex-shrink: 0;
}

.kds-tab-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-medium-strong);
  white-space: nowrap;
}

/* Size-dependent overrides — must precede .kds-tab for ascending specificity */
.kds-tab-bar-small .kds-tab-icon {
  width: var(--kds-dimension-component-width-1x);
  height: var(--kds-dimension-component-height-1x);
}

.kds-tab-bar-large .kds-tab-icon {
  width: var(--kds-dimension-component-width-1-25x);
  height: var(--kds-dimension-component-height-1-25x);
}

.kds-tab-bar-large .kds-tab-label {
  font: var(--kds-font-base-interactive-large-strong);
}

.kds-tab-bar-small .kds-tab-selected .kds-tab-icon,
.kds-tab-bar-large .kds-tab-selected .kds-tab-icon {
  color: var(--kds-color-text-and-icon-selected);
}

.kds-tab-bar-large .kds-tab-selected .kds-tab-label {
  font: var(--kds-font-base-title-large);
}

.kds-tab {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-bottom: var(--kds-border-base-subtle);
  border-bottom-width: var(--kds-core-border-width-m);
  border-radius: var(--kds-border-radius-container-none);

  &:disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-12x);
  }

  &.kds-tab-selected {
    color: var(--kds-color-text-and-icon-selected);

    & .kds-tab-indicator {
      position: absolute;
      right: 0;
      bottom: calc(-1 * var(--kds-core-border-width-m));
      left: 0;
      z-index: -1;
      height: var(--kds-dimension-component-height-0-125x);
      background: var(--kds-color-background-selected-bold-initial);
      border: var(--kds-border-action-selected);
      border-top-left-radius: var(--kds-border-radius-container-0-12x);
      border-top-right-radius: var(--kds-border-radius-container-0-12x);
    }
  }

  &:hover:not(:disabled) {
    color: var(--kds-color-text-and-icon-selected);
  }
}

.kds-tab-bar {
  display: flex;
  flex-wrap: nowrap;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:not(.kds-tab-bar-full-width) .kds-tab {
    flex: 0 1 auto;
    min-width: var(--kds-dimension-component-width-4x);
  }

  &.kds-tab-bar-small .kds-tab {
    gap: var(--kds-spacing-container-0-37x);
    height: var(--kds-dimension-component-height-1-75x);
    padding: 0
      calc(var(--kds-spacing-container-0-5x) - var(--kds-core-border-width-m));
  }

  &.kds-tab-bar-large .kds-tab {
    gap: var(--kds-spacing-container-0-5x);
    height: var(--kds-dimension-component-height-2-25x);
    padding: 0
      calc(var(--kds-spacing-container-0-75x) - var(--kds-core-border-width-m));
  }

  &.kds-tab-bar-full-width .kds-tab {
    flex: 1;
    justify-content: center;
    width: 100%;
  }
}
</style>
