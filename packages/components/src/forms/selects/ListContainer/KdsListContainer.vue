<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { computed, onBeforeUnmount, ref, toValue, watch } from "vue";

import { KdsListItem } from "../../_helper/List/KdsListItem";

import type { KdsListContainerProps } from "./types.ts";

const props = withDefaults(defineProps<KdsListContainerProps>(), {
  noEntriesText: "",
});

const emit = defineEmits<{
  toggleItem: [id: string];
}>();

/** active item id via keyboard or mouseover */
const activeId = ref<string | null>(null);

const isFocused = ref(false);

const resolveElement = (
  el: HTMLElement | ComponentPublicInstance | null,
): HTMLElement | null => {
  if (!el) {
    return null;
  }
  if (el instanceof HTMLElement) {
    return el;
  }
  return (el as ComponentPublicInstance).$el as HTMLElement;
};

const onMouseLeave = () => {
  if (!isFocused.value) {
    activeId.value = null;
  }
};

const enabledValues = computed(() =>
  props.possibleValues.filter((o) => !o.disabled),
);

const findEnabledIndex = (id: string | null) =>
  id === null ? -1 : enabledValues.value.findIndex((o) => o.id === id);

const activateFirst = () => {
  activeId.value =
    enabledValues.value.length > 0 ? enabledValues.value[0].id : null;
};

const onFocus = () => {
  isFocused.value = true;
  if (activeId.value === null) {
    activateFirst();
  }
};

const onBlur = () => {
  isFocused.value = false;
  activeId.value = null;
};

const onKeydown = (event: KeyboardEvent) => {
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
      event.preventDefault();
      break;
    }
    case "ArrowUp": {
      const nextIndex =
        currentIndex <= 0 ? enabledValues.value.length - 1 : currentIndex - 1;
      activeId.value = enabledValues.value[nextIndex].id;
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
      event.preventDefault();
      break;
    case "End":
      activeId.value = enabledValues.value[enabledValues.value.length - 1].id;
      event.preventDefault();
      break;
    default:
      break;
  }
};

let cleanupControlEl: (() => void) | null = null;

const attachControlListeners = (el: HTMLElement) => {
  el.addEventListener("keydown", onKeydown);
  el.addEventListener("focusin", onFocus);
  el.addEventListener("focusout", onBlur);

  const updateAriaActiveDescendant = () => {
    const target = el.querySelector("input, textarea, select") ?? el;
    if (activeId.value) {
      target.setAttribute("aria-activedescendant", activeId.value);
    } else {
      target.removeAttribute("aria-activedescendant");
    }
  };

  const stopWatch = watch(activeId, updateAriaActiveDescendant, {
    flush: "post",
  });

  return () => {
    el.removeEventListener("keydown", onKeydown);
    el.removeEventListener("focusin", onFocus);
    el.removeEventListener("focusout", onBlur);
    stopWatch();
    const target = el.querySelector("input, textarea, select") ?? el;
    target.removeAttribute("aria-activedescendant");
  };
};

watch(
  () => toValue(props.controlEl) ?? null,
  (raw) => {
    cleanupControlEl?.();
    cleanupControlEl = null;
    const el = resolveElement(raw);
    if (el) {
      cleanupControlEl = attachControlListeners(el);
    }
  },
  { immediate: true, flush: "post" },
);

onBeforeUnmount(() => {
  cleanupControlEl?.();
});
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-redundant-roles -->
  <div
    role="listbox"
    :aria-label="props.ariaLabel"
    class="kds-list-container"
    :tabindex="props.controlEl ? -1 : 0"
    v-on="
      props.controlEl
        ? { mouseleave: onMouseLeave }
        : {
            keydown: onKeydown,
            focus: onFocus,
            blur: onBlur,
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
      @mouseover="activeId = item.id"
    />
    <div
      v-if="props.possibleValues.length === 0"
      role="option"
      aria-disabled="true"
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
  padding: var(--kds-border-radius-container-0-25x);
  overflow-y: auto;
  list-style: none;

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
