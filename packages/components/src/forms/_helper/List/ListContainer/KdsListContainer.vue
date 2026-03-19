<script setup lang="ts">
import { computed, nextTick, ref, useId, useTemplateRef, watch } from "vue";

import KdsEmptyState from "../../../../layouts/EmptyState/KdsEmptyState.vue";
import { KdsListItem } from "../KdsListItem";
import { kdsListItemVariant } from "../KdsListItem/enums";
import ListItemDivider from "../ListItemDivider/ListItemDivider.vue";
import ListItemSectionTitle from "../ListItemSectionTitle/ListItemSectionTitle.vue";

import type {
  KdsListContainerExpose,
  KdsListContainerProps,
  KdsListOption,
} from "./types";

const props = withDefaults(defineProps<KdsListContainerProps>(), {
  emptyText: "",
  variant: kdsListItemVariant.SMALL,
  loading: false,
  role: "listbox",
});

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id: string];
}>();

const idPrefix = useId();
const toOptionId = (elementId: string) => elementId.slice(idPrefix.length + 1);
const emptyOptionId = `${idPrefix}-empty`;
const loadingStateText = "Loading entries";

/** possibleValues with prefixed ids to avoid DOM id collisions */
const prefixedValues = computed<KdsListOption[]>(() =>
  (props.loading ? [] : props.possibleValues).map((o) => ({
    ...o,
    id: `${idPrefix}-${o.id}`,
  })),
);

/** Only selectable (non-section-headline) items */
const selectableValues = computed(() =>
  prefixedValues.value.filter((o) => !o.sectionHeadline),
);

/** active item id (prefixed) via keyboard or mouseover */
const activeId = ref<string | undefined>(undefined);

/** remembers the last active item so it can be restored on re-focus */
const lastActiveId = ref<string | undefined>(undefined);

const isFocused = ref(false);

const containerEl = useTemplateRef("containerEl");

const listItemRole = computed(() => {
  return props.role === "listbox" ? "option" : "menuitem";
});

function scrollToView() {
  if (!activeId.value || !containerEl.value) {
    return;
  }
  containerEl.value
    ?.querySelector(`#${CSS.escape(activeId.value)}`)
    ?.scrollIntoView({ block: "nearest" });
}

const onMouseLeave = () => {
  if (!isFocused.value) {
    activeId.value = undefined;
  }
};

const onMousemove = (event: MouseEvent) => {
  const target = (event.target as HTMLElement)?.closest?.(
    `[role="${listItemRole.value}"]`,
  );
  if (
    target instanceof HTMLElement &&
    target.id &&
    target.getAttribute("aria-disabled") !== "true"
  ) {
    activeId.value = target.id;
  } else if (!isFocused.value) {
    activeId.value = undefined;
  }
};

const enabledValues = computed(() =>
  selectableValues.value.filter((o) => !o.disabled),
);

/** Tracks the set of enabled item ids to detect real list changes (e.g. search filtering) vs. cosmetic changes (e.g. selection toggling). */
const enabledIds = computed(() => enabledValues.value.map((o) => o.id));
let prevEnabledIds: string[] = [];

const firstEnabledOrEmpty = (values: KdsListOption[]) => {
  if (values.length > 0) {
    return values[0].id;
  }
  // Only point to the empty-state element when the list is truly empty.
  // When items exist but are all disabled, leave activeId undefined to
  // avoid aria-activedescendant referencing a non-existent DOM element.
  return selectableValues.value.length === 0 ? emptyOptionId : undefined;
};

const idsChanged = (a: string[], b: string[]) =>
  a.length !== b.length || a.some((id, i) => id !== b[i]);

const getResetActiveId = (values: KdsListOption[]) => {
  if (activeId.value === undefined) {
    return activeId.value;
  }
  // While focused and the visible items actually changed (e.g. during search
  // filtering), always jump to the first enabled value so the highlight
  // follows the top result. Skip when only selection/cosmetic state changed.
  if (isFocused.value && idsChanged(enabledIds.value, prevEnabledIds)) {
    return firstEnabledOrEmpty(values);
  }
  const stillValid = values.some((o) => o.id === activeId.value);
  return stillValid ? activeId.value : firstEnabledOrEmpty(values);
};

/** Reset activeId/lastActiveId when possibleValues change */
watch([enabledValues, () => props.loading], ([values, loading]) => {
  activeId.value = loading ? emptyOptionId : getResetActiveId(values);

  const lastIdStillValid = values.some((o) => o.id === lastActiveId.value);
  if (!lastIdStillValid) {
    lastActiveId.value = undefined;
  }

  prevEnabledIds = enabledIds.value;

  nextTick(scrollToView);
});

const findEnabledIndex = (id: string | undefined) =>
  id === undefined ? -1 : enabledValues.value.findIndex((o) => o.id === id);

const handleFocus = () => {
  isFocused.value = true;
  if (activeId.value === undefined) {
    activeId.value = lastActiveId.value ?? enabledValues.value[0]?.id;
  }
};

const handleBlur = () => {
  isFocused.value = false;
  lastActiveId.value = activeId.value;
  activeId.value = undefined;
};

const handleKeydown = (event: KeyboardEvent) => {
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
      scrollToView();
      event.preventDefault();
      break;
    }
    case "ArrowUp": {
      const nextIndex =
        currentIndex <= 0 ? enabledValues.value.length - 1 : currentIndex - 1;
      activeId.value = enabledValues.value[nextIndex].id;
      scrollToView();
      event.preventDefault();
      break;
    }
    case "Enter":
      if (
        event.target instanceof HTMLElement &&
        ["BUTTON"].includes(event.target.tagName) &&
        event.target.ariaExpanded === "false"
      ) {
        break;
      }
      if (activeId.value) {
        emit("itemClick", toOptionId(activeId.value));
        event.preventDefault();
      }
      break;
    case " ":
      if (
        event.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)
      ) {
        break;
      }
      if (
        event.target instanceof HTMLElement &&
        ["BUTTON"].includes(event.target.tagName) &&
        event.target.ariaExpanded === "false"
      ) {
        break;
      }
      if (activeId.value) {
        emit("itemClick", toOptionId(activeId.value));
        event.preventDefault();
      }
      break;
    case "Home":
      activeId.value = enabledValues.value[0].id;
      scrollToView();
      event.preventDefault();
      break;
    case "End":
      activeId.value = enabledValues.value[enabledValues.value.length - 1].id;
      scrollToView();
      event.preventDefault();
      break;
    default:
      break;
  }
};

defineExpose<KdsListContainerExpose>({
  /** Forward a keydown event to the list for keyboard navigation */
  handleKeydown,
  /** Notify the list that its controlling element received focus */
  handleFocus,
  /** Notify the list that its controlling element lost focus */
  handleBlur,
  activeDescendant: activeId,
  /** Moves focus to the list container element */
  focus: () => {
    containerEl.value?.focus();
  },
});
</script>

<template>
  <div
    v-bind="$attrs"
    ref="containerEl"
    :role="props.role"
    :aria-busy="props.loading"
    :aria-label="props.ariaLabel"
    :aria-activedescendant="
      !props.controlledExternally && activeId ? activeId : undefined
    "
    :class="[
      'kds-list-container',
      { standalone: !props.controlledExternally, menu: props.role === 'menu' },
    ]"
    :tabindex="props.controlledExternally ? undefined : 0"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
    @mousemove="onMousemove"
    @mouseleave="onMouseLeave"
  >
    <template v-for="(item, index) in prefixedValues" :key="item.id">
      <ListItemSectionTitle
        v-if="item.sectionHeadline"
        :label="item.text"
        :leading-icon="item.sectionHeadlineIcon"
        role="presentation"
        aria-hidden="true"
      />
      <KdsListItem
        v-else
        :id="item.id"
        :accessory="item.accessory"
        :label="item.text"
        :sub-text="item.subText"
        :selected="item.selected"
        :disabled="item.disabled"
        :active="activeId === item.id"
        :special="item.special"
        :missing="item.missing"
        :variant="props.variant"
        :trailing-icon="
          item.missing && !item.disabled
            ? 'trash'
            : item.selected
              ? 'checkmark'
              : undefined
        "
        :role="listItemRole"
        @mousedown="props.controlledExternally && $event.preventDefault()"
        @click="!item.disabled && emit('itemClick', toOptionId(item.id))"
      />
      <ListItemDivider
        v-if="item.separator && index < prefixedValues.length - 1"
        role="presentation"
        aria-hidden="true"
      />
    </template>
    <div
      v-if="selectableValues.length === 0"
      :id="emptyOptionId"
      :role="listItemRole"
      aria-disabled="true"
      aria-selected="false"
      class="kds-list-container-empty"
    >
      <KdsEmptyState
        :headline="props.loading ? loadingStateText : props.emptyText"
        :loading-spinner="props.loading"
      />
    </div>
  </div>
</template>

<style scoped>
.kds-list-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-0-10x);
  min-width: var(--kds-dimension-component-width-12x);
  padding: var(--kds-spacing-container-0-25x);
  overflow-y: auto;

  &.standalone {
    border: var(--kds-border-base-subtle);
    border-radius: var(--kds-border-radius-container-0-31x);
  }

  &.menu {
    border: none;
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-31x);
  }
}

.kds-list-container-empty {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
