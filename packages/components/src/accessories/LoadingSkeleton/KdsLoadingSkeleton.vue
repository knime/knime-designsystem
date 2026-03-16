<script setup lang="ts">
import type { KdsLoadingSkeletonProps } from "./types";
import { useKdsLoadingSkeleton } from "./useKdsLoadingSkeleton";

const props = withDefaults(defineProps<KdsLoadingSkeletonProps>(), {
  width: "100%",
  height: "var(--kds-spacing-container-1-25x)",
  size: 1,
  variant: "default",
  repeat: 1,
  loading: true,
  repeatGap: "var(--kds-spacing-container-1-25x)",
});

const {
  combinedLayoutStyles,
  contentWidthStyles,
  isVariant,
  loading,
  presetClass,
  repeat,
  repeatContainerStyles,
  sizeMultiplier,
  styles,
} = useKdsLoadingSkeleton(props);
</script>

<template>
  <div v-if="loading" class="wrapper">
    <div class="repeat-items" :style="repeatContainerStyles">
      <template v-if="isVariant('combined')">
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
      <template v-else-if="isVariant('text-headline-with-paragraph')">
        <div
          v-for="index in repeat"
          :key="`headline-${index}`"
          class="headline-with-paragraph"
          v-bind="$attrs"
          :style="contentWidthStyles"
        >
          <div class="skeleton-item headline-line" />
          <div class="paragraph-lines">
            <div class="skeleton-item paragraph-line paragraph-line-1" />
            <div class="skeleton-item paragraph-line paragraph-line-2" />
            <div class="skeleton-item paragraph-line paragraph-line-3" />
          </div>
        </div>
      </template>
      <template v-else-if="isVariant('input-field')">
        <div
          v-for="index in repeat"
          :key="`input-field-${index}`"
          class="input-field-layout"
          v-bind="$attrs"
          :style="contentWidthStyles"
        >
          <div class="skeleton-item input-field-label" />
          <div class="skeleton-item input-field-card" />
        </div>
      </template>
      <template v-else-if="isVariant('list-item-large')">
        <div
          v-for="index in repeat"
          :key="`list-item-large-${index}`"
          class="list-item-layout list-item-layout-large"
          v-bind="$attrs"
          :style="contentWidthStyles"
        >
          <div class="skeleton-item list-item-icon-large" />
          <div class="skeleton-item list-item-text-large" />
        </div>
      </template>
      <template v-else-if="isVariant('list-item-large-with-subtext')">
        <div
          v-for="index in repeat"
          :key="`list-item-large-with-subtext-${index}`"
          class="list-item-layout list-item-layout-large-with-subtext"
          v-bind="$attrs"
          :style="contentWidthStyles"
        >
          <div class="skeleton-item list-item-icon-large" />
          <div class="list-item-lines">
            <div class="skeleton-item list-item-text-small" />
            <div class="skeleton-item list-item-text-small" />
          </div>
        </div>
      </template>
      <template v-else-if="isVariant('list-item-small')">
        <div
          v-for="index in repeat"
          :key="`list-item-small-${index}`"
          class="list-item-layout list-item-layout-small"
          v-bind="$attrs"
          :style="contentWidthStyles"
        >
          <div class="skeleton-item list-item-icon-small" />
          <div class="skeleton-item list-item-text-small" />
        </div>
      </template>
      <template v-else-if="isVariant('list-item-small-with-subtext')">
        <div
          v-for="index in repeat"
          :key="`list-item-small-with-subtext-${index}`"
          class="list-item-layout list-item-layout-small-with-subtext"
          v-bind="$attrs"
          :style="contentWidthStyles"
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
  display: block;
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
  gap: var(--kds-spacing-container-1-25x);
  width: 100%;
  max-width: 87%;
}

.paragraph-lines {
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
    width: calc(
      var(--kds-dimension-component-width-1-25x) * v-bind(sizeMultiplier)
    );
    height: calc(
      var(--kds-dimension-component-height-1-25x) * v-bind(sizeMultiplier)
    );
  }

  &.icon-preset-medium {
    width: calc(
      var(--kds-dimension-component-width-1x) * v-bind(sizeMultiplier)
    );
    height: calc(
      var(--kds-dimension-component-height-1x) * v-bind(sizeMultiplier)
    );
  }

  &.icon-preset-small {
    width: calc(
      var(--kds-dimension-component-width-0-75x) * v-bind(sizeMultiplier)
    );
    height: calc(
      var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
    );
  }

  &.button-preset-large {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-50x
    );

    width: calc(
      var(--kds-dimension-component-width-4x) * v-bind(sizeMultiplier)
    );
    height: calc(
      var(--kds-dimension-component-height-2-25x) * v-bind(sizeMultiplier)
    );
  }

  &.button-preset-medium {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-37x
    );

    width: calc(
      var(--kds-dimension-component-width-4x) * v-bind(sizeMultiplier)
    );
    height: calc(
      var(--kds-dimension-component-height-1-75x) * v-bind(sizeMultiplier)
    );
  }

  &.button-preset-small {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-37x
    );

    width: calc(
      var(--kds-dimension-component-width-4x) * v-bind(sizeMultiplier)
    );
    height: calc(
      var(--kds-dimension-component-height-1-5x) * v-bind(sizeMultiplier)
    );
  }

  &.button-preset-xsmall {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-25x
    );

    width: calc(
      var(--kds-dimension-component-width-4x) * v-bind(sizeMultiplier)
    );
    height: calc(
      var(--kds-dimension-component-height-1-25x) * v-bind(sizeMultiplier)
    );
  }

  &.text-preset-default {
    width: 100%;
    height: calc(var(--kds-spacing-container-1x) * v-bind(sizeMultiplier));
  }

  &.card-preset-default {
    --kds-loading-skeleton-default-radius: var(
      --kds-border-radius-container-0-50x
    );

    width: 100%;
    height: calc(
      var(--kds-dimension-component-height-1-75x) * v-bind(sizeMultiplier)
    );
  }
}

.headline-line {
  width: 50%;
  height: calc(
    var(--kds-dimension-component-height-1x) * v-bind(sizeMultiplier)
  );
}

.paragraph-line {
  height: calc(
    var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
  );
}

.paragraph-line-1 {
  width: 103%;
}

.paragraph-line-2 {
  width: 76%;
}

.paragraph-line-3 {
  width: 50%;
}

.input-field-label {
  width: 35%;
  height: calc(
    var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
  );
}

.input-field-card {
  --kds-loading-skeleton-default-radius: var(
    --kds-border-radius-container-0-37x
  );

  width: 100%;
  height: calc(
    var(--kds-dimension-component-height-1-75x) * v-bind(sizeMultiplier)
  );
}

.list-item-icon-large {
  width: calc(
    var(--kds-dimension-component-width-1-25x) * v-bind(sizeMultiplier)
  );
  height: calc(
    var(--kds-dimension-component-height-1-25x) * v-bind(sizeMultiplier)
  );
}

.list-item-icon-small {
  width: calc(
    var(--kds-dimension-component-width-0-75x) * v-bind(sizeMultiplier)
  );
  height: calc(
    var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
  );
}

.list-item-text-large {
  width: 100%;
  height: calc(
    var(--kds-dimension-component-height-0-88x) * v-bind(sizeMultiplier)
  );
}

.list-item-text-small {
  width: 100%;
  height: calc(
    var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
  );
}

.combined-icon {
  --kds-loading-skeleton-default-radius: var(
    --kds-border-radius-container-pill
  );

  flex: 0 0 auto;
  width: var(
    --kds-loading-skeleton-combined-icon-size,
    calc(var(--kds-spacing-container-2x) * v-bind(sizeMultiplier))
  );
  height: var(
    --kds-loading-skeleton-combined-icon-size,
    calc(var(--kds-spacing-container-2x) * v-bind(sizeMultiplier))
  );
}

.combined-line {
  --kds-loading-skeleton-default-radius: var(
    --kds-border-radius-container-0-25x
  );

  width: 100%;
  height: var(
    --kds-loading-skeleton-combined-line-height,
    calc(var(--kds-spacing-container-0-75x) * v-bind(sizeMultiplier))
  );
}
</style>
