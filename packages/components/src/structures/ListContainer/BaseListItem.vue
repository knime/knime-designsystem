<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string;
    borderRadius?: string;
    selected?: boolean;
    active?: boolean;
    missing?: boolean;
    disabled?: boolean;
  }>(),
  {
    borderRadius: "var(--kds-border-radius-container-0-25x)",
    selected: false,
    active: false,
    missing: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <li
    :id="props.id"
    role="option"
    :aria-selected="props.selected"
    :aria-disabled="props.disabled"
    :class="{
      selected: props.selected,
      active: props.active,
      missing: props.missing,
      disabled: props.disabled,
    }"
    @click="!props.disabled && emit('click', $event)"
  >
    <slot />
  </li>
</template>

<style scoped>
li[role="option"] {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-neutral-initial);
  border: none;
  border-radius: v-bind("props.borderRadius");

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    cursor: default;
  }

  &:not(.disabled):hover {
    background: var(--kds-color-background-neutral-hover);
  }

  &:not(.disabled):active {
    background: var(--kds-color-background-neutral-active);
  }

  &.selected {
    color: var(--kds-color-text-and-icon-selected);
    background: var(--kds-color-background-selected-initial);

    &:not(.disabled):hover {
      background: var(--kds-color-background-selected-hover);
    }

    &:not(.disabled):active {
      background: var(--kds-color-background-selected-active);
    }
  }

  &.missing {
    color: var(--kds-color-text-and-icon-danger);
    background: var(--kds-color-background-danger-initial);

    &:not(.disabled):hover {
      background: var(--kds-color-background-danger-hover);
    }

    &:not(.disabled):active {
      background: var(--kds-color-background-danger-active);
    }
  }

  &.active {
    &:not(.disabled, .selected, .missing) {
      background: var(--kds-color-background-neutral-hover);
    }

    &.selected:not(.disabled) {
      background: var(--kds-color-background-selected-hover);
    }

    &.missing:not(.disabled) {
      background: var(--kds-color-background-danger-hover);
    }
  }
}
</style>
