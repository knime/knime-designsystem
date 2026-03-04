<script setup lang="ts">
import { computed, onMounted, ref, toRef, useTemplateRef } from "vue";
import { useElementSize } from "@vueuse/core";

import KdsIcon from "../../accessories/Icon/KdsIcon.vue";

import type { KdsTab, KdsTabBarProps } from "./types";
import { useTabBarIconHiding } from "./useTabBarIconHiding";

const props = withDefaults(defineProps<KdsTabBarProps>(), {
  size: "small",
  fullWidth: false,
  disabled: false,
});

const modelValue = defineModel<string | number>({ required: false });

const emit = defineEmits<{
  tabClick: [tab: KdsTab];
}>();

const tabRefs = ref<Map<string | number, HTMLButtonElement>>(new Map());

const setTabRef = (value: string | number, el: unknown) => {
  if (el instanceof HTMLButtonElement) {
    tabRefs.value.set(value, el);
  } else {
    tabRefs.value.delete(value);
  }
};

const isTabDisabled = (tab: KdsTab) => props.disabled || tab.disabled;

const selectTab = (tab: KdsTab) => {
  if (!isTabDisabled(tab) && modelValue.value !== tab.value) {
    modelValue.value = tab.value;
    emit("tabClick", tab);
  }
};

const getEnabledTabs = () => props.tabs.filter((tab) => !isTabDisabled(tab));

const handleKeydown = (event: KeyboardEvent, currentTab: KdsTab) => {
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
  "tab-bar": true,
  [props.size]: true,
  "full-width": props.fullWidth,
}));

// Auto-select first available tab if none is selected
onMounted(() => {
  const availableTabs = getEnabledTabs();
  let initialTab = availableTabs.find((tab) => tab.value === modelValue.value);

  if (!initialTab) {
    initialTab = availableTabs[0];
    if (initialTab) {
      modelValue.value = initialTab.value;
    }
  }
});
</script>

<template>
  <div ref="availableWidthContainer" :class="tabBarClass" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :ref="
        (el) => {
          setItemEl(tab.value, el);
          setTabRef(tab.value, el);
        }
      "
      type="button"
      role="tab"
      :title="tab.title ?? tab.label"
      :aria-selected="modelValue === tab.value"
      :tabindex="
        modelValue === tab.value ||
        (!tabs.some((t) => t.value === modelValue && !isTabDisabled(t)) &&
          tabs.find((t) => !isTabDisabled(t))?.value === tab.value)
          ? 0
          : -1
      "
      :disabled="isTabDisabled(tab)"
      :class="{
        tab: true,
        selected: modelValue === tab.value,
      }"
      @click="selectTab(tab)"
      @keydown="handleKeydown($event, tab)"
    >
      <KdsIcon
        v-if="tab.icon && !shouldHideIcons"
        :name="tab.icon"
        :class="`icon-${props.size}`"
      />
      <span class="label">{{ tab.label }}</span>
      <span v-if="modelValue === tab.value" class="indicator" />
    </button>
  </div>
</template>

<style scoped>
/* Base elements - lowest specificity first */
.label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-medium-strong);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;
}

.icon-small,
.icon-large {
  flex-shrink: 0;
}

.tab {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: var(--kds-border-radius-container-none);
}

.tab:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.tab:focus-visible {
  outline: var(--kds-border-action-focused);
  outline-offset: calc(-2 * var(--kds-spacing-offset-focus));
  border-radius: var(--kds-border-radius-container-0-12x);
}

.tab.selected .indicator {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--kds-core-border-width-m);
  background: var(--kds-color-background-selected-bold-initial);
  border: var(--kds-border-action-selected);
  border-top-left-radius: var(--kds-border-radius-container-0-12x);
  border-top-right-radius: var(--kds-border-radius-container-0-12x);
}

.tab:hover:not(:disabled, .selected) {
  color: var(--kds-color-text-and-icon-selected);
}

/* Tab bar container */
.tab-bar {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto hidden;
  scrollbar-width: none;
  border-bottom: var(--kds-border-base-subtle);
  border-bottom-width: var(--kds-core-border-width-m);
}

.tab-bar::-webkit-scrollbar {
  display: none;
}

.tab-bar:not(.full-width) .tab {
  flex: 0 1 auto;
  min-width: var(--kds-dimension-component-width-4x);
}

.tab-bar.small .tab {
  gap: var(--kds-spacing-container-0-37x);
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0
    calc(var(--kds-spacing-container-0-5x) - var(--kds-core-border-width-m));
}

.tab-bar.large .tab {
  gap: var(--kds-spacing-container-0-5x);
  height: var(--kds-dimension-component-height-2-25x);
  padding: 0
    calc(var(--kds-spacing-container-0-75x) - var(--kds-core-border-width-m));
}

.tab-bar.full-width .tab {
  flex: 1;
  justify-content: center;
  width: 100%;
}

/* Small size icons */
.tab-bar.small .icon-small {
  width: var(--kds-dimension-component-width-1x);
  height: var(--kds-dimension-component-height-1x);
}

.tab-bar.small .tab.selected .icon-small {
  color: var(--kds-color-text-and-icon-selected);
}

/* Large size icons */
.tab-bar.large .icon-large {
  width: var(--kds-dimension-component-width-1-25x);
  height: var(--kds-dimension-component-height-1-25x);
}

.tab-bar.large .tab.selected .icon-large {
  color: var(--kds-color-text-and-icon-selected);
}

/* Label styles - ordered by ascending specificity */
.tab-bar.large .label {
  font: var(--kds-font-base-interactive-large-strong);
}

.tab.selected .label {
  color: var(--kds-color-text-and-icon-selected);
}

.tab:hover:not(:disabled, .selected) .label {
  color: var(--kds-color-text-and-icon-selected);
}

.tab-bar.large .tab.selected .label {
  font: var(--kds-font-base-title-large);
}
</style>
