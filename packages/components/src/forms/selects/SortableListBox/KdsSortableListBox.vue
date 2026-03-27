<script setup lang="ts">
import { computed, ref, toRef } from "vue";

import KdsButton from "../../../buttons/KdsButton/KdsButton.vue";
import KdsMultiSelectListBox from "../MultiSelectListBox/KdsMultiSelectListBox.vue";

import type {
  KdsSortableListBoxOption,
  KdsSortableListBoxProps,
} from "./types";
import { useSortableListBoxReorder } from "./useSortableListBoxReorder";

const {
  disabled = false,
  error = false,
  validating = false,
  preserveSubTextSpace = false,
  useResizeHandle = false,
  ...props
} = defineProps<KdsSortableListBoxProps>();

const modelValue = defineModel<string[]>({ default: () => [] });

defineEmits<{
  resetOrder: [];
}>();

const selection = ref<string[]>([]);

const optionLookup = computed(() => {
  const map = new Map<string, KdsSortableListBoxOption>();
  for (const option of props.possibleValues) {
    map.set(option.id, option);
  }
  return map;
});

const orderedOptions = computed(
  () =>
    modelValue.value
      .map((id) => optionLookup.value.get(id))
      .filter(Boolean) as KdsSortableListBoxOption[],
);

const listBoxRef = ref<InstanceType<typeof KdsMultiSelectListBox> | null>(null);

const { canMoveUp, canMoveDown, reorder, sortByText } =
  useSortableListBoxReorder({
    orderedIds: modelValue,
    selection,
    disabled: toRef(() => disabled),
  });

const applyReorder = (newOrder: string[]) => {
  modelValue.value = newOrder;
};

const moveUp = () => canMoveUp.value && applyReorder(reorder("up"));
const moveDown = () => canMoveDown.value && applyReorder(reorder("down"));
const moveToTop = () => canMoveUp.value && applyReorder(reorder("top"));
const moveToBottom = () => canMoveDown.value && applyReorder(reorder("bottom"));

const focus = () => listBoxRef.value?.focus();

defineExpose({ focus });
</script>

<template>
  <div class="kds-sortable-list-box-wrapper">
    <div class="kds-sortable-top-buttons">
      <div class="kds-sortable-top-buttons-left">
        <KdsButton
          size="small"
          variant="transparent"
          leading-icon="sort-ascending"
          label="A – Z"
          :disabled="disabled"
          @click="applyReorder(sortByText(true, optionLookup))"
        />
        <KdsButton
          size="small"
          variant="transparent"
          leading-icon="sort-descending"
          label="Z – A"
          :disabled="disabled"
          @click="applyReorder(sortByText(false, optionLookup))"
        />
      </div>
      <KdsButton
        size="small"
        variant="transparent"
        destructive
        label="Reset all"
        :disabled="disabled"
        @click="$emit('resetOrder')"
      />
    </div>

    <KdsMultiSelectListBox
      ref="listBoxRef"
      v-bind="props"
      v-model="selection"
      :possible-values="orderedOptions"
      :error="error"
      :validating="validating"
      :preserve-sub-text-space="preserveSubTextSpace"
      :disabled="disabled"
      :use-resize-handle="useResizeHandle"
    />

    <div class="kds-sortable-footer-buttons">
      <KdsButton
        size="small"
        variant="transparent"
        leading-icon="to-top"
        label="Top"
        title="Move to top"
        :disabled="disabled || !canMoveUp"
        @click="moveToTop"
      />
      <KdsButton
        size="small"
        variant="transparent"
        leading-icon="to-bottom"
        label="Bottom"
        title="Move to bottom"
        :disabled="disabled || !canMoveDown"
        @click="moveToBottom"
      />
      <KdsButton
        size="small"
        variant="transparent"
        leading-icon="arrow-up"
        label="Up"
        title="Move up"
        :disabled="disabled || !canMoveUp"
        @click="moveUp"
      />
      <KdsButton
        size="small"
        variant="transparent"
        leading-icon="arrow-down"
        label="Down"
        title="Move down"
        :disabled="disabled || !canMoveDown"
        @click="moveDown"
      />
    </div>
  </div>
</template>

<style scoped>
.kds-sortable-list-box-wrapper {
  display: flex;
  flex-direction: column;
}

.kds-sortable-top-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--kds-spacing-container-0-75x);
  padding-bottom: var(--kds-spacing-container-0-37x);
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-37x);
}

.kds-sortable-top-buttons-left {
  display: flex;
  gap: var(--kds-spacing-container-0-25x);
}

.kds-sortable-footer-buttons {
  display: flex;
  gap: var(--kds-spacing-container-0-37x);
  align-items: center;
  justify-content: center;
  padding: var(--kds-spacing-container-0-5x) 0;
  background: var(--kds-color-background-neutral-initial);
  border: var(--kds-border-action-transparent);
  border-radius: var(--kds-border-radius-container-0-37x);
}
</style>
