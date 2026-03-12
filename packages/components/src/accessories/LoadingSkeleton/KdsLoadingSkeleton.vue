<script setup lang="ts">
import { computed, toRefs } from "vue";

import {
  kdsLoadingSkeletonButtonPreset,
  kdsLoadingSkeletonCardPreset,
  kdsLoadingSkeletonIconPreset,
  kdsLoadingSkeletonTextPreset,
} from "./enums";
import type { KdsLoadingSkeletonProps } from "./types";

const props = withDefaults(defineProps<KdsLoadingSkeletonProps>(), {
  width: "100%",
  height: "var(--kds-spacing-container-1-25x)",
  size: 1,
  variant: "default",
  repeat: 1,
  loading: true,
  repeatGap: "var(--kds-spacing-container-1-25x)",
});

const { width, height } = toRefs(props);
const sizeMultiplier = computed(() =>
  props.size > 0 && Number.isFinite(props.size) ? props.size : 1,
);
const scaledLength = (value: string) =>
  sizeMultiplier.value === 1
    ? value
    : `calc(${value} * ${sizeMultiplier.value})`;
const effectiveVariant = computed<
  NonNullable<KdsLoadingSkeletonProps["variant"]>
>(() => {
  if (props.variant !== "default") {
    return props.variant;
  }

  if (props.buttonPreset) {
    const buttonValueMap: Record<
      NonNullable<KdsLoadingSkeletonProps["buttonPreset"]>,
      NonNullable<KdsLoadingSkeletonProps["variant"]>
    > = {
      [kdsLoadingSkeletonButtonPreset.LARGE]: "button-large",
      [kdsLoadingSkeletonButtonPreset.MEDIUM]: "button-medium",
      [kdsLoadingSkeletonButtonPreset.SMALL]: "button-small",
      [kdsLoadingSkeletonButtonPreset.XSMALL]: "button-xsmall",
    };

    return buttonValueMap[props.buttonPreset];
  }

  if (props.iconPreset) {
    const iconValueMap: Record<
      NonNullable<KdsLoadingSkeletonProps["iconPreset"]>,
      NonNullable<KdsLoadingSkeletonProps["variant"]>
    > = {
      [kdsLoadingSkeletonIconPreset.LARGE]: "icon-large",
      [kdsLoadingSkeletonIconPreset.MEDIUM]: "icon-medium",
      [kdsLoadingSkeletonIconPreset.SMALL]: "icon-small",
      [kdsLoadingSkeletonIconPreset.XSMALL]: "icon-small",
    };

    return iconValueMap[props.iconPreset];
  }

  if (props.cardPreset === kdsLoadingSkeletonCardPreset.DEFAULT) {
    return "card-default";
  }

  if (props.textPreset === kdsLoadingSkeletonTextPreset.DEFAULT) {
    return "text-default";
  }

  if (
    props.textPreset === kdsLoadingSkeletonTextPreset.HEADLINE_WITH_PARAGRAPH
  ) {
    return "text-headline-with-paragraph";
  }

  return "default";
});

const isCombinedVariant = computed(() => effectiveVariant.value === "combined");
const isHeadlineWithParagraphPreset = computed(
  () => effectiveVariant.value === "text-headline-with-paragraph",
);
const isInputFieldVariant = computed(
  () => effectiveVariant.value === "input-field",
);
const isListItemLargeVariant = computed(
  () => effectiveVariant.value === "list-item-large",
);
const isListItemLargeWithSubtextVariant = computed(
  () => effectiveVariant.value === "list-item-large-with-subtext",
);
const isListItemSmallVariant = computed(
  () => effectiveVariant.value === "list-item-small",
);
const isListItemSmallWithSubtextVariant = computed(
  () => effectiveVariant.value === "list-item-small-with-subtext",
);

const presetClass = computed(() => {
  const valueMap: Partial<
    Record<NonNullable<KdsLoadingSkeletonProps["variant"]>, string>
  > = {
    "button-large": "button-preset-large",
    "button-medium": "button-preset-medium",
    "button-small": "button-preset-small",
    "button-xsmall": "button-preset-xsmall",
    "icon-large": "icon-preset-large",
    "icon-medium": "icon-preset-medium",
    "icon-small": "icon-preset-small",
    "text-default": "text-preset-default",
    "card-default": "card-preset-default",
  };

  return valueMap[effectiveVariant.value] ?? null;
});

const borderRadius = computed(() => {
  if (props.borderRadius) {
    return props.borderRadius;
  }

  const valueMap: Partial<
    Record<NonNullable<KdsLoadingSkeletonProps["variant"]>, string>
  > = {
    "button-large": "var(--kds-border-radius-container-pill)",
    "button-medium": "var(--kds-border-radius-container-pill)",
    "button-small": "var(--kds-border-radius-container-pill)",
    "button-xsmall": "var(--kds-border-radius-container-pill)",
  };

  return (
    valueMap[effectiveVariant.value] ??
    "var(--kds-border-radius-container-pill)"
  );
});

const styles = computed(() => {
  const hasPreset =
    Boolean(presetClass.value) || isHeadlineWithParagraphPreset.value;
  const borderRadiusVar = props.borderRadius?.trim();

  return {
    ...(borderRadiusVar
      ? { "--kds-loading-skeleton-border-radius": borderRadiusVar }
      : {}),
    width: hasPreset ? "" : scaledLength(width.value),
    height: hasPreset ? "" : scaledLength(height.value),
    borderRadius: borderRadiusVar ?? (hasPreset ? "" : borderRadius.value),
  };
});

const repeatContainerStyles = computed(() => {
  return {
    gap: props.repeat > 1 ? props.repeatGap : "0px",
  };
});

const headlineWithParagraphStyles = computed(() => {
  return {
    width: scaledLength(width.value),
  };
});

const inputFieldStyles = computed(() => {
  return {
    width: scaledLength(width.value),
  };
});

const listItemStyles = computed(() => {
  return {
    width: scaledLength(width.value),
  };
});

const combinedLayoutStyles = computed(() => {
  const borderRadiusVar = props.borderRadius?.trim();
  const combinedStyles: Record<string, string> = {
    width: scaledLength(width.value),
    ...(borderRadiusVar
      ? { "--kds-loading-skeleton-border-radius": borderRadiusVar }
      : {}),
  };

  if (props.height !== "var(--kds-spacing-container-1-25x)") {
    combinedStyles["--kds-loading-skeleton-combined-icon-size"] = scaledLength(
      height.value,
    );
    combinedStyles["--kds-loading-skeleton-combined-line-height"] =
      scaledLength(height.value);
  }

  return combinedStyles;
});
</script>

<template>
  <div v-if="loading" class="wrapper">
    <div class="repeat-items" :style="repeatContainerStyles">
      <template v-if="isCombinedVariant">
        <div
          v-for="index in repeat"
          :key="`combined-${index}`"
          class="combined-layout"
          v-bind="$attrs"
          :style="combinedLayoutStyles"
        >
          <div class="skeleton-item combined-icon" />
          <div class="combined-lines">
            <div class="skeleton-item combined-line" />
            <div class="skeleton-item combined-line" />
          </div>
        </div>
      </template>
      <template v-else-if="isHeadlineWithParagraphPreset">
        <div
          v-for="index in repeat"
          :key="`headline-${index}`"
          class="headline-with-paragraph"
          v-bind="$attrs"
          :style="headlineWithParagraphStyles"
        >
          <div class="skeleton-item headline-line" />
          <div class="skeleton-item paragraph-line paragraph-line-1" />
          <div class="skeleton-item paragraph-line paragraph-line-2" />
          <div class="skeleton-item paragraph-line paragraph-line-3" />
        </div>
      </template>
      <template v-else-if="isInputFieldVariant">
        <div
          v-for="index in repeat"
          :key="`input-field-${index}`"
          class="input-field-layout"
          v-bind="$attrs"
          :style="inputFieldStyles"
        >
          <div class="skeleton-item input-field-label" />
          <div class="skeleton-item input-field-card" />
        </div>
      </template>
      <template v-else-if="isListItemLargeVariant">
        <div
          v-for="index in repeat"
          :key="`list-item-large-${index}`"
          class="list-item-layout list-item-layout-large"
          v-bind="$attrs"
          :style="listItemStyles"
        >
          <div class="skeleton-item list-item-icon-large" />
          <div class="skeleton-item list-item-text-large" />
        </div>
      </template>
      <template v-else-if="isListItemLargeWithSubtextVariant">
        <div
          v-for="index in repeat"
          :key="`list-item-large-with-subtext-${index}`"
          class="list-item-layout list-item-layout-large-with-subtext"
          v-bind="$attrs"
          :style="listItemStyles"
        >
          <div class="skeleton-item list-item-icon-large" />
          <div class="list-item-lines">
            <div class="skeleton-item list-item-text-small" />
            <div class="skeleton-item list-item-text-small" />
          </div>
        </div>
      </template>
      <template v-else-if="isListItemSmallVariant">
        <div
          v-for="index in repeat"
          :key="`list-item-small-${index}`"
          class="list-item-layout list-item-layout-small"
          v-bind="$attrs"
          :style="listItemStyles"
        >
          <div class="skeleton-item list-item-icon-small" />
          <div class="skeleton-item list-item-text-small" />
        </div>
      </template>
      <template v-else-if="isListItemSmallWithSubtextVariant">
        <div
          v-for="index in repeat"
          :key="`list-item-small-with-subtext-${index}`"
          class="list-item-layout list-item-layout-small-with-subtext"
          v-bind="$attrs"
          :style="listItemStyles"
        >
          <div class="skeleton-item list-item-icon-small" />
          <div class="list-item-lines">
            <div class="skeleton-item list-item-text-small" />
            <div class="skeleton-item list-item-text-small" />
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="index in repeat"
          :key="index"
          :class="['skeleton-item', presetClass]"
          v-bind="$attrs"
          :style="styles"
        />
      </template>
    </div>
  </div>
  <slot v-else v-bind="$attrs" />
</template>

<style scoped>
@keyframes knight-rider {
  from {
    background-position-x: 100%;
  }

  to {
    background-position-x: -100%;
  }
}

.wrapper {
  display: contents;
  width: 100%;
}

.repeat-items {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-1x);
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
}

.combined-layout {
  display: flex;
  gap: var(--kds-spacing-container-0-75x);
  align-items: center;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.combined-lines {
  display: grid;
  flex: 1;
  gap: var(--kds-spacing-container-0-5x);
  min-width: 0;
}

.headline-with-paragraph {
  display: grid;
  gap: var(--kds-spacing-container-0-75x);
  width: 100%;
}

.input-field-layout {
  display: grid;
  gap: var(--kds-spacing-container-0-75x);
  width: 100%;
}

.list-item-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--kds-spacing-container-0-75x);
  width: 100%;
}

.list-item-layout-large {
  align-items: start;
}

.list-item-layout-large-with-subtext {
  align-items: center;
}

.list-item-layout-small {
  align-items: center;
}

.list-item-layout-small-with-subtext {
  align-items: start;
}

.list-item-lines {
  display: grid;
  gap: var(--kds-spacing-container-0-75x);
}

.skeleton-item {
  background-color: var(--kds-color-border-subtle);
  background-image: linear-gradient(
    90deg,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 2%, transparent)
      0%,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 15%, transparent)
      25%,
    color-mix(in srgb, var(--kds-color-text-and-icon-neutral) 2%, transparent)
      50%,
    transparent 100%
  );
  background-repeat: no-repeat;
  background-size: 200% 100%;
  border-radius: var(
    --kds-loading-skeleton-border-radius,
    var(
      --kds-loading-skeleton-default-radius,
      var(--kds-border-radius-container-pill)
    )
  );
  animation: knight-rider 2s linear 200ms infinite;

  &.icon-preset-large {
    width: var(--kds-dimension-component-width-1-25x);
    height: var(--kds-dimension-component-height-1-25x);
  }

  &.icon-preset-medium {
    width: var(--kds-dimension-component-width-1x);
    height: var(--kds-dimension-component-height-1x);
  }

  &.icon-preset-small {
    width: var(--kds-dimension-component-width-0-75x);
    height: var(--kds-dimension-component-height-0-75x);
  }

  &.button-preset-large {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-50x
    );

    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-2-25x);
  }

  &.button-preset-medium {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-37x
    );

    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-75x);
  }

  &.button-preset-small {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-37x
    );

    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-5x);
  }

  &.button-preset-xsmall {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-25x
    );

    width: var(--kds-dimension-component-width-4x);
    height: var(--kds-dimension-component-height-1-25x);
  }

  &.text-preset-default {
    width: 100%;
    height: var(--kds-spacing-container-1x);
  }

  &.card-preset-default {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-50x
    );

    width: 100%;
    height: var(--kds-dimension-component-height-1-75x);
  }
}

.headline-line {
  width: 50%;
  height: var(--kds-dimension-component-height-1x);
}

.paragraph-line {
  height: var(--kds-dimension-component-height-0-75x);
}

.paragraph-line-1 {
  width: 100%;
}

.paragraph-line-2 {
  width: 75%;
}

.paragraph-line-3 {
  width: 50%;
}

.input-field-label {
  width: 35%;
  height: var(--kds-dimension-component-height-0-75x);
}

.input-field-card {
  --kds-loading-skeleton-default-radius: var(
    --kds-border-radius-container-0-37x
  );

  width: 100%;
  height: var(--kds-dimension-component-height-1-75x);
}

.list-item-icon-large {
  width: var(--kds-dimension-component-width-1-25x);
  height: var(--kds-dimension-component-height-1-25x);
}

.list-item-icon-small {
  width: var(--kds-dimension-component-width-0-75x);
  height: var(--kds-dimension-component-height-0-75x);
}

.list-item-text-large {
  width: 100%;
  height: var(--kds-dimension-component-height-0-88x);
}

.list-item-text-small {
  width: 100%;
  height: var(--kds-dimension-component-height-0-75x);
}

.combined-icon {
  --kds-loading-skeleton-default-radius: var(
    --kds-border-radius-container-pill
  );

  flex: 0 0 auto;
  width: var(
    --kds-loading-skeleton-combined-icon-size,
    var(--kds-spacing-container-2x)
  );
  height: var(
    --kds-loading-skeleton-combined-icon-size,
    var(--kds-spacing-container-2x)
  );
}

.combined-line {
  --kds-loading-skeleton-default-radius: var(
    --kds-border-radius-container-0-25x
  );

  width: 100%;
  height: var(
    --kds-loading-skeleton-combined-line-height,
    var(--kds-spacing-container-0-75x)
  );
}
</style>
