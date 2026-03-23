<script setup lang="ts">
import {
  type StyleValue,
  computed,
  defineAsyncComponent,
  ref,
  useId,
  useTemplateRef,
} from "vue";

import type { KdsPopoverExpose } from "../../../overlays/Popover";
import BaseFormFieldWrapper from "../../_helper/BaseFormFieldWrapper.vue";
import type { KdsListContainerExpose } from "../../_helper/List/ListContainer";
import type { KdsFormFieldExpose } from "../../types.ts";
import BaseInput from "../BaseInput.vue";

import type { KdsSearchInputProps } from "./types";

const KdsPopover = defineAsyncComponent(
  () => import("../../../overlays/Popover/KdsPopover.vue"),
);

const KdsListContainer = defineAsyncComponent(
  () => import("../../_helper/List/ListContainer/KdsListContainer.vue"),
);

const props = withDefaults(defineProps<KdsSearchInputProps>(), {
  placeholder: "Search",
  disabled: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
});

const modelValue = defineModel<string>({ default: "" });

const emit = defineEmits<{
  /** Native focus event forwarded from the input element. */
  focus: [event: FocusEvent];
  /** Native blur event forwarded from the input element. */
  blur: [event: FocusEvent];
  /** Native keydown event forwarded from the input element. */
  keydown: [event: KeyboardEvent];
  /** Emitted when a result is clicked */
  resultClick: [id?: string];
}>();

const baseInput = useTemplateRef("baseInput");

const popoverEl = useTemplateRef<KdsPopoverExpose>("popover");
const listContainerEl = useTemplateRef<KdsListContainerExpose>("listContainer");
const resultsOpen = ref(false);
const resultsId = useId();

const onKeyDown = (event: KeyboardEvent) => {
  if (resultsOpen.value) {
    listContainerEl.value?.handleKeydown(event);
  }
  emit("keydown", event);
};

const onFocus = (event: FocusEvent) => {
  if (props.results) {
    resultsOpen.value = true;
    listContainerEl.value?.handleFocus();
  }
  emit("focus", event);
};

const onBlur = (event: FocusEvent) => {
  if (resultsOpen.value) {
    resultsOpen.value = false;
    listContainerEl.value?.handleBlur();
  }
  emit("blur", event);
};

const onClick = () => {
  if (props.results && !resultsOpen.value) {
    resultsOpen.value = true;
    listContainerEl.value?.handleFocus();
  }
};

const maxHeightStyle = computed<StyleValue>(() => {
  if (!props.resultsMaxHeight) {
    return {};
  }

  return {
    maxHeight: props.resultsMaxHeight,
    overflowY: "auto",
  };
});

const onResultClick = (itemId?: string) => {
  resultsOpen.value = false;
  listContainerEl.value?.handleBlur();
  emit("resultClick", itemId);
};

defineExpose<KdsFormFieldExpose>({
  focus: () => baseInput.value?.focus(),
});
</script>

<template>
  <BaseFormFieldWrapper
    :id="id"
    :label="label"
    :aria-label="ariaLabel"
    :description="description"
    :sub-text="subText"
    :error="error"
    :validating="validating"
    :preserve-sub-text-space="preserveSubTextSpace"
  >
    <template #default="slotProps">
      <BaseInput
        ref="baseInput"
        v-bind="slotProps"
        v-model="modelValue"
        type="search"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :autocomplete="autocomplete"
        leading-icon="search"
        :clearable="true"
        :style="popoverEl?.anchorStyle"
        :role="results ? 'combobox' : undefined"
        :aria-activedescendant="
          resultsOpen ? listContainerEl?.activeDescendant : undefined
        "
        :aria-haspopup="results ? 'listbox' : undefined"
        :aria-controls="results ? resultsId : undefined"
        :aria-expanded="results ? resultsOpen : undefined"
        @keydown="onKeyDown"
        @focus="onFocus"
        @blur="onBlur"
        @click="onClick"
      />

      <KdsPopover
        v-if="results"
        ref="popover"
        v-model="resultsOpen"
        full-width
        popover-type="manual"
        aria-label="Search results container"
      >
        <div class="kds-search-results-container" :style="maxHeightStyle">
          <KdsListContainer
            :id="resultsId"
            ref="listContainer"
            variant="large"
            :possible-values="results"
            controlled-externally
            allow-no-selection
            empty-text="No search results"
            aria-label="Search results list"
            @item-click="onResultClick"
          />
        </div>
      </KdsPopover>
    </template>
  </BaseFormFieldWrapper>
</template>

<style scoped>
.kds-search-results-container {
  background-color: var(--kds-color-surface-default);
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);
}
</style>
