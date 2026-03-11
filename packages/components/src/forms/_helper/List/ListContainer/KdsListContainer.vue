<script setup lang="ts">
import { computed, nextTick, ref, useId, useTemplateRef, watch } from "vue";

import KdsEmptyState from "../../../../layouts/EmptyState/KdsEmptyState.vue";
import { KdsListItem } from "../KdsListItem";
import ListItemDivider from "../ListItemDivider/ListItemDivider.vue";
import ListItemSectionTitle from "../ListItemSectionTitle/ListItemSectionTitle.vue";

import type {
  KdsListContainerExpose,
  KdsListContainerProps,
  KdsListGroup,
  KdsListOption,
} from "./types";

const isGrouped = (
  values: KdsListOption[] | KdsListGroup[],
): values is KdsListGroup[] => values.length > 0 && "options" in values[0];

const props = withDefaults(defineProps<KdsListContainerProps>(), {
  emptyText: "",
});

const emit = defineEmits<{
  /** Emitted when item is clicked */
  itemClick: [id: string];
}>();

const idPrefix = useId();
const toOptionId = (elementId: string) => elementId.slice(idPrefix.length + 1);
const emptyOptionId = `${idPrefix}-empty`;

/** Normalize possibleValues into groups, prefixing option IDs */
const normalizedGroups = computed(() => {
  const groups = isGrouped(props.possibleValues)
    ? props.possibleValues
    : [{ options: props.possibleValues }];

  return groups.map((group) => ({
    ...group,
    options: group.options.map((o) => ({ ...o, id: `${idPrefix}-${o.id}` })),
  }));
});

/** All selectable options (with prefixed ids), flattened across groups */
const prefixedValues = computed(() =>
  normalizedGroups.value.flatMap((g) => g.options),
);

/** active item id (prefixed) via keyboard or mouseover */
const activeId = ref<string | undefined>(undefined);

/** remembers the last active item so it can be restored on re-focus */
const lastActiveId = ref<string | undefined>(undefined);

const isFocused = ref(false);

const containerEl = useTemplateRef("containerEl");

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
  const target = (event.target as HTMLElement)?.closest?.('[role="option"]');
  if (
    target instanceof HTMLElement &&
    target.id &&
    target.getAttribute("aria-disabled") !== "true"
  ) {
    activeId.value = target.id;
  }
};

const enabledValues = computed(() =>
  prefixedValues.value.filter((o) => !o.disabled),
);

/** Reset activeId/lastActiveId when possibleValues change and current id no longer exists */
watch(enabledValues, (values) => {
  const isValid = (id: string | undefined) =>
    id !== undefined && values.some((o) => o.id === id);

  if (activeId.value !== undefined && !isValid(activeId.value)) {
    if (values.length > 0) {
      activeId.value = values[0].id;
    } else {
      // Only point to the empty-state element when the list is truly empty.
      // When items exist but are all disabled, leave activeId undefined to
      // avoid aria-activedescendant referencing a non-existent DOM element.
      activeId.value =
        prefixedValues.value.length === 0 ? emptyOptionId : undefined;
    }
  }
  if (!isValid(lastActiveId.value)) {
    lastActiveId.value = undefined;
  }
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
});
</script>

<template>
  <div
    ref="containerEl"
    role="listbox"
    :aria-label="props.ariaLabel"
    :aria-activedescendant="
      !props.controlledExternally && activeId ? activeId : undefined
    "
    class="kds-list-container"
    :tabindex="props.controlledExternally ? undefined : 0"
    v-on="
      props.controlledExternally
        ? { mousemove: onMousemove, mouseleave: onMouseLeave }
        : {
            keydown: handleKeydown,
            focus: handleFocus,
            blur: handleBlur,
            mousemove: onMousemove,
            mouseleave: onMouseLeave,
          }
    "
  >
    <template
      v-for="(group, groupIdx) in normalizedGroups"
      :key="group.label ?? groupIdx"
    >
      <ListItemDivider
        v-if="groupIdx > 0"
        role="presentation"
        aria-hidden="true"
      />
      <ListItemSectionTitle
        v-if="group.label"
        :label="group.label"
        :leading-icon="group.leadingIcon"
        role="presentation"
        aria-hidden="true"
      />
      <KdsListItem
        v-for="item in group.options"
        :id="item.id"
        :key="item.id"
        :accessory="item.accessory"
        :label="item.text"
        :sub-text="item.subText"
        :selected="item.selected"
        :disabled="item.disabled"
        :active="activeId === item.id"
        :special="item.special"
        :missing="item.missing"
        :trailing-icon="item.selected ? 'checkmark' : undefined"
        @mousedown="props.controlledExternally && $event.preventDefault()"
        @click.stop="emit('itemClick', toOptionId(item.id))"
      />
    </template>
    <div
      v-if="prefixedValues.length === 0"
      :id="emptyOptionId"
      role="option"
      aria-disabled="true"
      :aria-selected="undefined"
      class="kds-list-container-empty"
    >
      <KdsEmptyState :headline="props.emptyText" />
    </div>
  </div>
</template>

<style scoped>
.kds-list-container {
  display: flex;
  flex-direction: column;
  padding: var(--kds-spacing-container-0-25x);
  overflow-y: auto;

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
    border-radius: var(--kds-border-radius-container-0-31x);
  }
}

.kds-list-container-empty {
  display: flex;
  justify-content: center;
}
</style>
