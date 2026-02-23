<script setup lang="ts">
import { computed, useId } from "vue";

import { type KdsAccessory, KdsColorSwatch } from "../../../accessories";
import KdsAvatar from "../../../accessories/Avatar/KdsAvatar.vue";
import KdsDataType from "../../../accessories/Icon/KdsDataType.vue";
import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";

type BaseDropdownProps = {
  open: boolean;
  text: string;
  placeholder?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  missing?: boolean;
  accessory?: KdsAccessory;

  /** Forwarded a11y/field attributes from BaseFormFieldWrapper */
  id?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaLabel?: string;
  ariaInvalid?: boolean;
};

const props = withDefaults(defineProps<BaseDropdownProps>(), {
  placeholder: false,
  disabled: false,
  readonly: false,
  error: false,
  missing: false,
  accessory: undefined,

  id: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  ariaLabel: undefined,
  ariaInvalid: undefined,
});

const valueTextId = useId();

const ariaLabelledby = computed(() =>
  [props.ariaLabelledby, valueTextId].filter(Boolean).join(" "),
);

const emit = defineEmits<{
  (e: "click"): void;
  (e: "keydown", event: KeyboardEvent): void;
  (e: "update:open", value: boolean): void;
}>();

const onTriggerKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) {
    return;
  }

  switch (event.key) {
    case "ArrowDown":
    case "ArrowUp":
      event.preventDefault();
      if (!props.open) {
        emit("update:open", true);
      }
      break;
  }
};
</script>

<template>
  <button
    :id="props.id"
    class="kds-dropdown-trigger-button"
    type="button"
    role="combobox"
    aria-autocomplete="list"
    :aria-labelledby="ariaLabelledby"
    :aria-describedby="props.ariaDescribedby"
    :aria-label="props.ariaLabel"
    :aria-invalid="props.ariaInvalid"
    :aria-readonly="props.readonly || undefined"
    :disabled="props.disabled"
    :class="{
      error: props.error,
      readonly: props.readonly,
      missing: props.missing,
    }"
    @click="!props.disabled && !props.readonly && emit('click')"
    @keydown="(event) => (emit('keydown', event), onTriggerKeydown(event))"
  >
    <span v-if="props.accessory" class="leading" aria-hidden="true">
      <KdsIcon
        v-if="props.accessory.type === 'icon'"
        :name="props.accessory.name"
      />
      <KdsDataType
        v-else-if="props.accessory.type === 'dataType'"
        :icon-name="props.accessory.name"
      />
      <KdsColorSwatch
        v-else-if="props.accessory.type === 'colorSwatch'"
        :color="props.accessory.color"
        :title="props.accessory.title"
      />
      <KdsAvatar
        v-else-if="props.accessory.type === 'avatar'"
        class="avatar"
        :initials="props.accessory.initials"
        :src="props.accessory.imageSrc"
        :title="props.accessory.title"
      />
    </span>

    <span
      :id="valueTextId"
      class="text"
      :class="{ placeholder: props.placeholder, missing: props.missing }"
    >
      {{ props.text }}
    </span>

    <span class="trailing" aria-hidden="true">
      <KdsIcon
        :name="props.open ? 'chevron-up' : 'chevron-down'"
        size="small"
      />
    </span>
  </button>
</template>

<style scoped>
.kds-dropdown-trigger-button {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--kds-dimension-component-height-1-75x);
  padding: 0 var(--kds-spacing-container-0-25x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  cursor: pointer;
  background: var(--kds-color-background-input-initial);
  border: var(--kds-border-action-input);
  border-radius: var(--kds-border-radius-container-0-37x);

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-offset-focus);
  }

  &.error {
    border: var(--kds-border-action-error);
  }

  &:disabled {
    cursor: default;
    border: var(--kds-border-action-disabled);
    border-color: var(--kds-color-border-disabled);
  }

  &:not(:disabled, :focus):hover {
    background: var(--kds-color-background-input-hover);
  }
}

.leading {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: var(--kds-dimension-component-width-1x);
  height: var(--kds-dimension-component-width-1x);
  margin-left: var(--kds-spacing-container-0-12x);

  & > div {
    width: 100%;
    height: 100%;
  }
}

.text {
  flex: 1 0 0;
  min-width: 0;
  padding: var(--kds-spacing-container-0-25x);
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--kds-color-text-and-icon-neutral);
  text-align: left;
  white-space: nowrap;

  &.placeholder {
    color: var(--kds-color-text-and-icon-subtle);
  }

  .kds-dropdown-trigger-button:disabled & {
    color: var(--kds-color-text-and-icon-disabled);
  }

  .kds-dropdown-trigger-button.missing & {
    color: var(--kds-color-text-and-icon-danger);
  }
}

.trailing {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding-right: var(--kds-spacing-container-0-12x);
  color: var(--kds-color-text-and-icon-subtle);

  .kds-dropdown-trigger-button:disabled & {
    color: var(--kds-color-text-and-icon-disabled);
  }

  .kds-dropdown-trigger-button:focus-visible &,
  .kds-dropdown-trigger-button:not(:disabled) .text:not(.placeholder) ~ & {
    color: var(--kds-color-text-and-icon-neutral);
  }
}
</style>
