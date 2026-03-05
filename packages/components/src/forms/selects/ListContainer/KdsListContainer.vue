<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";

import { KdsListItem } from "../../_helper/List/KdsListItem";

import type { KdsListContainerExpose, KdsListContainerProps } from "./types.ts";

const props = withDefaults(defineProps<KdsListContainerProps>(), {
  noEntriesText: "",
});

const emit = defineEmits<{
  toggleItem: [id: string];
}>();

/** active item id via keyboard or mouseover */
const activeId = ref<string | undefined>(undefined);

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
  props.possibleValues.filter((o) => !o.disabled),
);

/** Reset activeId when possibleValues change and current activeId no longer exists */
watch(enabledValues, (values) => {
  if (
    activeId.value !== undefined &&
    !values.some((o) => o.id === activeId.value)
  ) {
    activeId.value = values.length > 0 ? values[0].id : undefined;
  }
  nextTick(scrollToView);
});

const findEnabledIndex = (id: string | undefined) =>
  id === undefined ? -1 : enabledValues.value.findIndex((o) => o.id === id);

const activateFirst = () => {
  activeId.value =
    enabledValues.value.length > 0 ? enabledValues.value[0].id : undefined;
};

const handleFocus = () => {
  isFocused.value = true;
  if (activeId.value === undefined) {
    activateFirst();
  }
};

const handleBlur = () => {
  isFocused.value = false;
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
        emit("toggleItem", activeId.value);
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
        emit("toggleItem", activeId.value);
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
  handleKeydown,
  handleFocus,
  handleBlur,
  activeId,
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
    :tabindex="props.controlledExternally ? -1 : 0"
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
      :missing="item.missing"
      @click="emit('toggleItem', item.id)"
    />
    <div
      v-if="props.possibleValues.length === 0"
      role="option"
      aria-disabled="true"
      aria-selected="false"
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
  padding: var(--kds-spacing-container-0-25x);
  overflow-y: auto;

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
