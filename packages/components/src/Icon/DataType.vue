<script setup lang="ts">
import { computed } from "vue";

import { ID_TO_ICON_MAP, type TypeId } from "./IdToIconNameMapping";
import { typeIconNames } from "./constants";
import type { DataTypeSize, IconSize, TypeIconName } from "./types";
import useIcon from "./useIcon";

type DataTypeIconSize = Exclude<IconSize, "large">;

type Props = {
  iconName?: TypeIconName | TypeId | string;
  iconTitle?: string;
  size?: DataTypeSize;
};

const DATA_TYPE_SIZE_TO_ICON_SIZE: Record<DataTypeSize, DataTypeIconSize> = {
  large: "medium",
  medium: "small",
  small: "xsmall",
} as const;

const props = withDefaults(defineProps<Props>(), {
  iconName: "unknown-datatype",
  iconTitle: "Unknown Data Type",
  size: "medium",
});

const iconSize = computed(() => DATA_TYPE_SIZE_TO_ICON_SIZE[props.size]);

const isIconName = (value: string): value is TypeIconName =>
  typeIconNames.includes(value as TypeIconName);

const isTypeId = (value: string): value is TypeId =>
  Object.keys(ID_TO_ICON_MAP).includes(value);

const iconName = computed<TypeIconName>(() => {
  if (isIconName(props.iconName)) {
    return props.iconName;
  }
  if (isTypeId(props.iconName)) {
    return ID_TO_ICON_MAP[props.iconName];
  }
  return props.iconName.startsWith("org.knime")
    ? "default-extension-datatype"
    : "unknown-datatype";
});

const iconComponent = useIcon({
  name: iconName,
  folder: "type-icons",
});
</script>

<template>
  <div :class="['kds-data-type-icon-container', size]" :title="props.iconTitle">
    <component
      :is="iconComponent"
      :class="['kds-icon', 'kds-data-type-icon', iconSize]"
      aria-hidden="true"
      focusable="false"
    />
  </div>
</template>

<style scoped>
@import url("./styles.css");

.kds-data-type-icon-container {
  --data-type-height: var(--kds-dimension-component-height-1x);
  --data-type-width: var(--kds-dimension-component-width-1x);
  --data-type-padding: var(--kds-spacing-container-0-12x);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--data-type-width);
  height: var(--data-type-height);
  padding: var(--data-type-padding);
  color: var(--kds-color-desktop-header-text-and-icon-muted);
  background-color: var(--kds-color-page-default);
  border: var(--kds-border-base-muted);
  border-radius: var(--kds-border-radius-container-0-12x);

  &.small {
    --data-type-height: var(--kds-dimension-icon-0-75x);
    --data-type-width: var(--kds-dimension-icon-0-75x);
    --data-type-padding: var(--kds-spacing-container-none);
  }

  &.large {
    --data-type-height: var(--kds-dimension-component-height-1-25x);
    --data-type-width: var(--kds-dimension-component-width-1-25x);
  }

  /* The kds-data-type-icon class is needed to increase the specificity to overwrite the icon-stroke-width */
  & .kds-icon.kds-data-type-icon {
    &.small {
      --icon-stroke-width: var(--kds-border-width-icon-stroke-m);
    }

    &.medium {
      --icon-stroke-width: var(--kds-border-width-icon-stroke-l);
    }
  }
}
</style>
