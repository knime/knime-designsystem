<script setup lang="ts">
import { computed, nextTick, ref, toRef, useTemplateRef, watch } from "vue";
import { useElementSize, useTemplateRefsList } from "@vueuse/core";

import { elementOverflowsHorizontally } from "../../util/useKdsIsTruncated";

import TabBarItemAccessory from "./TabBarItemAccessory.vue";
import type { KdsTabBarItem, KdsTabBarProps } from "./types";
import { useTabBarAdaptiveLayout } from "./useTabBarAdaptiveLayout";

const props = withDefaults(defineProps<KdsTabBarProps>(), {
  size: "small",
  fullWidth: false,
  disabled: false,
});

const modelValue = defineModel<string | number>({ required: false });

const emit = defineEmits<{
  tabSelect: [tab: KdsTabBarItem];
}>();

const tabEls = useTemplateRefsList<HTMLButtonElement>();

const getTabEl = (value: string | number) => {
  const idx = props.tabs.findIndex((t) => t.value === value);
  return tabEls.value[idx];
};

const isTabDisabled = (tab: KdsTabBarItem) => props.disabled || tab.disabled;

const selectTab = (tab: KdsTabBarItem) => {
  if (!isTabDisabled(tab) && modelValue.value !== tab.value) {
    modelValue.value = tab.value;
    emit("tabSelect", tab);
  }
};

const getEnabledTabs = () => props.tabs.filter((tab) => !isTabDisabled(tab));

const focusAndSelect = (tab: KdsTabBarItem) => {
  selectTab(tab);
  getTabEl(tab.value)?.focus();
};

const handleKeydown = (event: KeyboardEvent, currentTab: KdsTabBarItem) => {
  const enabledTabs = getEnabledTabs();
  const currentIndex = enabledTabs.findIndex(
    (tab) => tab.value === currentTab.value,
  );

  switch (event.key) {
    case "ArrowLeft": {
      event.preventDefault();
      const prevIndex =
        currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
      focusAndSelect(enabledTabs[prevIndex]);
      break;
    }
    case "ArrowRight": {
      event.preventDefault();
      const nextIndex =
        currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
      focusAndSelect(enabledTabs[nextIndex]);
      break;
    }
    case "Home":
      event.preventDefault();
      focusAndSelect(enabledTabs[0]);
      break;
    case "End":
      event.preventDefault();
      focusAndSelect(enabledTabs[enabledTabs.length - 1]);
      break;
  }
};

const availableWidthContainer = useTemplateRef<HTMLElement>(
  "availableWidthContainer",
);
const { width } = useElementSize(availableWidthContainer);
const MIN_TAB_WIDTH_TOKEN = "--kds-dimension-component-width-4x";

const { shouldHideIcons, setItemEl, minTabWidth } = useTabBarAdaptiveLayout({
  width,
  tabs: toRef(props, "tabs"),
  containerEl: availableWidthContainer,
  fullWidth: toRef(props, "fullWidth"),
  minTabWidth: MIN_TAB_WIDTH_TOKEN,
});

const minTabWidthCss = `var(${minTabWidth})`;

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
    for (let i = 0; i < props.tabs.length; i++) {
      const el = tabEls.value[i];
      const label = el?.querySelector<HTMLElement>(".kds-tab-label");
      if (elementOverflowsHorizontally(label)) {
        newSet.add(props.tabs[i].value);
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
  <div class="kds-tab-bar-wrapper">
    <div ref="availableWidthContainer" :class="tabBarClass" role="tablist">
      <button
        v-for="tab in tabs"
        :id="tab.id"
        :key="tab.value"
        :ref="
          (el) => {
            tabEls.set(el as object | null);
            setItemEl(tab.value, el);
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
        <TabBarItemAccessory
          v-if="
            tab.accessory && !(tab.accessory.type === 'icon' && shouldHideIcons)
          "
          :accessory="tab.accessory"
          :icon-size="props.size === 'large' ? 'large' : 'medium'"
          :disabled="isTabDisabled(tab)"
        />
        <span class="kds-tab-label">{{ tab.label }}</span>
        <span v-if="modelValue === tab.value" class="kds-tab-indicator" />
      </button>
    </div>
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

.kds-tab {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  font: inherit;
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;

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
      bottom: 0;
      left: 0;
      z-index: 1;
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

.kds-tab-bar-wrapper {
  --focus-ring-space: calc(
    2px + var(--kds-spacing-offset-focus)
  ); /* outline-width + outline-offset */

  position: relative;
  display: flow-root;
  overflow: visible;

  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: var(--kds-core-border-width-m);
    pointer-events: none;
    content: "";
    background: var(--kds-color-border-subtle);
  }
}

.kds-tab-bar {
  display: flex;
  flex-wrap: nowrap;
  padding: var(--focus-ring-space);
  margin: calc(-1 * var(--focus-ring-space));
  overflow-x: auto;
  scrollbar-width: none;
  border-radius: var(--kds-border-radius-container-none);

  &::-webkit-scrollbar {
    display: none;
  }

  &:not(.kds-tab-bar-full-width) .kds-tab {
    flex: 0 1 auto;
    min-width: v-bind(minTabWidthCss);
  }

  &.kds-tab-bar-large .kds-tab-label {
    font: var(--kds-font-base-interactive-large-strong);
  }

  &.kds-tab-bar-large .kds-tab-selected .kds-tab-label {
    font: var(--kds-font-base-title-large);
  }

  &.kds-tab-bar-small,
  &.kds-tab-bar-large {
    & .kds-tab-selected .kds-tab-icon {
      color: var(--kds-color-text-and-icon-selected);
    }
  }

  &.kds-tab-bar-small .kds-tab {
    gap: var(--kds-spacing-container-0-37x);
    height: var(--kds-dimension-component-height-1-75x);
    padding: 0 var(--kds-spacing-container-0-5x);
  }

  &.kds-tab-bar-large .kds-tab {
    gap: var(--kds-spacing-container-0-5x);
    height: var(--kds-dimension-component-height-2-25x);
    padding: 0 var(--kds-spacing-container-0-75x);
  }

  &.kds-tab-bar-full-width .kds-tab {
    flex: 1;
    justify-content: center;
    width: 100%;
  }
}
</style>
