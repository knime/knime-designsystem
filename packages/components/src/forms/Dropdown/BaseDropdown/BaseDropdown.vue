<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";

import KdsIcon from "../../../Icon/KdsIcon.vue";

import type { BaseDropdownEmits, BaseDropdownProps } from "./types";

const props = withDefaults(defineProps<BaseDropdownProps>(), {
  id: undefined,
  placeholder: "",
  disabled: false,
  error: false,
  open: false,
  trailingIcon: undefined,
  textColor: "neutral",
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  role: undefined,
  ariaHaspopup: undefined,
  ariaControls: undefined,
  ariaActivedescendant: undefined,
  ariaAutocomplete: undefined,
});

const emit = defineEmits<BaseDropdownEmits>();

const modelValue = defineModel<string>({ default: "" });

const generatedId = useId();
const triggerId = computed(() => props.id ?? generatedId);

const popoverId = computed(() => `${triggerId.value}-popover`);

const anchorName = computed(() => `--kds-dropdown-${generatedId}`);

const hasValue = computed(() => modelValue.value.length > 0);

const inputTextColor = computed(() => {
  const effectiveTextColor = props.error ? "danger" : props.textColor;

  switch (effectiveTextColor) {
    case "danger":
      return "var(--kds-color-text-and-icon-danger)";
    case "subtle":
      return "var(--kds-color-text-and-icon-subtle)";
    case "neutral":
    default:
      return "var(--kds-color-text-and-icon-neutral)";
  }
});

const popoverEl = ref<HTMLElement | null>(null);

watch(
  () => props.open,
  (isOpen) => {
    if (!popoverEl.value) {
      return;
    }

    if (isOpen) {
      if (popoverEl.value.matches(":popover-open")) {
        return;
      }

      popoverEl.value.showPopover();
      return;
    }

    if (!popoverEl.value.matches(":popover-open")) {
      return;
    }

    popoverEl.value.hidePopover();
  },
  { immediate: true },
);

const handlePopoverToggle = (event: Event) => {
  emit("toggle", event);

  const toggleEvent = event as Event & { newState?: "open" | "closed" };
  if (toggleEvent.newState === "open") {
    emit("update:open", true);
  }
  if (toggleEvent.newState === "closed") {
    emit("update:open", false);
  }
};
</script>

<template>
  <div class="trigger" :style="{ 'anchor-name': anchorName }">
    <div
      :class="{
        container: true,
        error: props.error,
        disabled: props.disabled,
      }"
    >
      <div class="content">
        <button
          :id="triggerId"
          type="button"
          :disabled="props.disabled"
          :role="props.role"
          :aria-label="props.ariaLabel"
          :aria-labelledby="props.ariaLabelledby"
          :aria-describedby="props.ariaDescribedby"
          :aria-haspopup="props.ariaHaspopup"
          :aria-expanded="props.open"
          :aria-controls="props.ariaControls"
          :aria-activedescendant="props.ariaActivedescendant"
          :aria-autocomplete="props.ariaAutocomplete"
          :aria-invalid="props.error"
          :popovertarget="popoverId"
          :style="{ '--kds-base-input-text-color': inputTextColor }"
          :class="{
            'input-field': true,
            'has-value': hasValue,
            'button-field': true,
          }"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
          @keydown="emit('keydown', $event)"
        >
          <span :class="{ 'button-text': true, placeholder: !hasValue }">
            {{ hasValue ? modelValue : props.placeholder }}
          </span>

          <KdsIcon
            class="icon-wrapper trailing"
            :name="props.open ? 'chevron-up' : 'chevron-down'"
          />
        </button>

        <slot name="trailing" />
      </div>
    </div>

    <div
      :id="popoverId"
      ref="popoverEl"
      class="popover"
      popover
      :style="{ 'position-anchor': anchorName }"
      @toggle="handlePopoverToggle"
      @click.stop
    >
      <div v-if="$slots.stickyTop" class="sticky-top">
        <slot name="stickyTop" />
      </div>

      <div v-if="$slots.top" class="top">
        <slot name="top" />
      </div>

      <slot />
    </div>
  </div>
</template>

<style scoped>
.trigger {
  position: relative;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0;
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);

  &:has(button:focus) {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &:has(.input-field:hover:not(:disabled)) {
    background: var(--kds-color-background-input-hover);
  }

  &.error {
    border: var(--kds-border-action-error);
  }

  &.disabled {
    border: var(--kds-border-action-disabled);
    border-color: var(--kds-color-border-disabled);
  }
}

.content {
  display: flex;
  flex: 1 0 0;
  gap: 0;
  align-items: center;
  min-width: 0;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0 var(--kds-spacing-container-0-25x);
}

.icon-wrapper {
  display: flex;
  flex-shrink: 0;
  align-items: center;

  &.trailing {
    padding-right: var(--kds-spacing-container-0-12x);
  }

  .container.disabled & {
    color: var(--kds-color-text-and-icon-disabled);
  }
}

.input-field {
  flex: 1 0 0;
  min-width: 0;
  height: var(--kds-dimension-component-height-1-75x);
  padding: var(--kds-spacing-container-0-25x);
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--kds-font-base-interactive-small);
  color: var(
    --kds-base-input-text-color,
    var(--kds-color-text-and-icon-neutral)
  );
  white-space: nowrap;
  outline: none;
  background: transparent;
  border: none;
}

.button-field {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
}

.button-text {
  display: block;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }
}

.popover {
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  outline: none;
  background: var(--kds-color-surface-default);
  border: none;
  border-radius: var(--kds-border-radius-container-0-50x);
  box-shadow: var(--kds-elevation-level-3);

  &:popover-open {
    display: flex;
  }
}

.popover[popover] {
  position: fixed;
  inset: auto;
  top: calc(anchor(bottom) + var(--kds-spacing-container-0-25x));
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  left: anchor(left);
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  width: anchor-size(width);
  margin: 0;
  position-try-fallbacks: --kds-dropdown-above;
}

@position-try --kds-dropdown-above {
  top: auto;
  bottom: calc(anchor(top) + var(--kds-spacing-container-0-25x));
  /* stylelint-disable-next-line at-rule-descriptor-value-no-unknown */
  left: anchor(left);
  /* stylelint-disable-next-line at-rule-descriptor-value-no-unknown */
  width: anchor-size(width);
}

.sticky-top {
  padding: var(--kds-spacing-container-0-25x);
  border-bottom: var(--kds-border-base-subtle);
}

.top {
  padding: var(--kds-spacing-container-0-25x);
  border-bottom: var(--kds-border-base-subtle);
}
</style>
