<script setup lang="ts">
import type { KdsLoadingSkeletonProps } from "./types";
import { useKdsLoadingSkeleton } from "./useKdsLoadingSkeleton";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<KdsLoadingSkeletonProps>();

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
  <div
    v-if="loading"
    class="kds-loading-skeleton"
    v-bind="$attrs"
    aria-hidden="true"
  >
    <div
      class="kds-loading-skeleton-repeat-items"
      :style="repeatContainerStyles"
      role="presentation"
    >
      <template v-if="isVariant('combined')">
        <div
          v-for="index in repeat"
          :key="`combined-${index}`"
          class="kds-loading-skeleton-combined-layout"
          :style="combinedLayoutStyles"
        >
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-combined-icon"
          />
          <div class="kds-loading-skeleton-combined-lines">
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-combined-line"
            />
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-combined-line"
            />
          </div>
        </div>
      </template>
      <template v-else-if="isVariant('text-headline-with-paragraph')">
        <div
          v-for="index in repeat"
          :key="`headline-${index}`"
          class="kds-loading-skeleton-headline-with-paragraph"
          :style="contentWidthStyles"
        >
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-headline-line"
          />
          <div class="kds-loading-skeleton-paragraph-lines">
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-paragraph-line kds-loading-skeleton-paragraph-line-1"
            />
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-paragraph-line kds-loading-skeleton-paragraph-line-2"
            />
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-paragraph-line kds-loading-skeleton-paragraph-line-3"
            />
          </div>
        </div>
      </template>
      <template v-else-if="isVariant('input-field')">
        <div
          v-for="index in repeat"
          :key="`input-field-${index}`"
          class="kds-loading-skeleton-input-field-layout"
          :style="contentWidthStyles"
        >
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-input-field-label"
          />
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-input-field-card"
          />
        </div>
      </template>
      <template v-else-if="isVariant('list-item-large')">
        <div
          v-for="index in repeat"
          :key="`list-item-large-${index}`"
          class="kds-loading-skeleton-list-item-layout kds-loading-skeleton-list-item-layout-large"
          :style="contentWidthStyles"
        >
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-list-item-icon-large"
          />
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-list-item-text-large"
          />
        </div>
      </template>
      <template v-else-if="isVariant('list-item-large-with-subtext')">
        <div
          v-for="index in repeat"
          :key="`list-item-large-with-subtext-${index}`"
          class="kds-loading-skeleton-list-item-layout kds-loading-skeleton-list-item-layout-large-with-subtext"
          :style="contentWidthStyles"
        >
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-list-item-icon-large"
          />
          <div class="kds-loading-skeleton-list-item-lines">
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-list-item-text-small"
            />
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-list-item-text-small"
            />
          </div>
        </div>
      </template>
      <template v-else-if="isVariant('list-item-small')">
        <div
          v-for="index in repeat"
          :key="`list-item-small-${index}`"
          class="kds-loading-skeleton-list-item-layout kds-loading-skeleton-list-item-layout-small"
          :style="contentWidthStyles"
        >
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-list-item-icon-small"
          />
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-list-item-text-small"
          />
        </div>
      </template>
      <template v-else-if="isVariant('list-item-small-with-subtext')">
        <div
          v-for="index in repeat"
          :key="`list-item-small-with-subtext-${index}`"
          class="kds-loading-skeleton-list-item-layout kds-loading-skeleton-list-item-layout-small-with-subtext"
          :style="contentWidthStyles"
        >
          <div
            class="kds-loading-skeleton-item kds-loading-skeleton-list-item-icon-small"
          />
          <div class="kds-loading-skeleton-list-item-lines">
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-list-item-text-small"
            />
            <div
              class="kds-loading-skeleton-item kds-loading-skeleton-list-item-text-small"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div
          v-for="index in repeat"
          :key="index"
          :class="['kds-loading-skeleton-item', presetClass]"
          :style="styles"
        />
      </template>
    </div>
  </div>
  <div v-else v-bind="$attrs">
    <slot />
  </div>
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

.kds-loading-skeleton {
  display: block;
  width: 100%;
  padding: 0;
}

.kds-loading-skeleton-repeat-items {
  display: flex;
  flex-direction: column;
  gap: var(--kds-spacing-container-1x);
  align-items: stretch;
  align-self: stretch;
  width: 100%;
  padding: 0;
}

.kds-loading-skeleton-combined-layout {
  display: flex;
  gap: var(--kds-spacing-container-0-75x);
  align-items: center;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.kds-loading-skeleton-combined-lines {
  display: grid;
  flex: 1;
  gap: var(--kds-spacing-container-0-5x);
  min-width: 0;
}

.kds-loading-skeleton-headline-with-paragraph {
  display: grid;
  gap: var(--kds-spacing-container-1-25x);
  width: calc(100% + var(--kds-spacing-container-0-25x));
  max-width: 100%;
}

.kds-loading-skeleton-paragraph-lines {
  display: grid;
  gap: var(--kds-spacing-container-0-75x);
  width: 100%;
}

.kds-loading-skeleton-input-field-layout {
  display: grid;
  gap: var(--kds-spacing-container-0-75x);
  width: calc(100% + var(--kds-spacing-container-0-25x));
}

.kds-loading-skeleton-list-item-layout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--kds-spacing-container-0-75x);
  align-items: center;
  width: 100%;
  padding-block-start: var(--kds-dimension-component-height-0-25x);
  padding-inline-start: var(--kds-dimension-component-width-0-75x);
}

.kds-loading-skeleton-list-item-layout-large {
  align-items: center;
  padding-block-start: var(--kds-dimension-component-height-0-75x);
  padding-inline-start: var(--kds-dimension-component-width-0-75x);
}

.kds-loading-skeleton-list-item-layout-large-with-subtext {
  align-items: center;
  padding-block-start: var(--kds-dimension-component-height-0-75x);
  padding-inline-start: var(--kds-dimension-component-width-0-75x);
}

.kds-loading-skeleton-list-item-layout-small {
  align-items: center;
}

.kds-loading-skeleton-list-item-layout-small-with-subtext {
  align-items: start;
}

.kds-loading-skeleton-list-item-lines {
  display: grid;
  gap: var(--kds-spacing-container-0-25x);
  width: 100%;
  min-width: 0;
}

.kds-loading-skeleton-item {
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
    --kds-loading-skeleton-default-radius: calc(
      var(--kds-border-radius-container-0-37x) * v-bind(sizeMultiplier)
    );

    box-sizing: border-box;
    align-self: stretch;
    width: 100%;
    min-width: 100%;
    height: auto;

    /* Minimum height approximates a typical card skeleton (headline + ~3 lines). */
    min-height: calc(
      var(--kds-dimension-component-height-2-5x) * 4 * v-bind(sizeMultiplier)
    );
    margin: 0;
  }
}

.kds-loading-skeleton-headline-line {
  width: 50%;
  height: calc(
    var(--kds-dimension-component-height-1x) * v-bind(sizeMultiplier)
  );
}

.kds-loading-skeleton-paragraph-line {
  height: calc(
    var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
  );
}

.kds-loading-skeleton-paragraph-line-1 {
  width: 103%;
}

.kds-loading-skeleton-paragraph-line-2 {
  width: 76%;
}

.kds-loading-skeleton-paragraph-line-3 {
  width: 50%;
}

.kds-loading-skeleton-input-field-label {
  width: 35%;
  height: calc(
    var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
  );
}

.kds-loading-skeleton-input-field-card {
  --kds-loading-skeleton-default-radius: var(
    --kds-border-radius-container-0-37x
  );

  width: 100%;
  height: calc(
    var(--kds-dimension-component-height-1-75x) * v-bind(sizeMultiplier)
  );
}

.kds-loading-skeleton-list-item-icon-large {
  width: calc(
    var(--kds-dimension-component-width-1-25x) * v-bind(sizeMultiplier)
  );
  height: calc(
    var(--kds-dimension-component-height-1-25x) * v-bind(sizeMultiplier)
  );
}

.kds-loading-skeleton-list-item-icon-small {
  width: calc(
    var(--kds-dimension-component-width-0-75x) * v-bind(sizeMultiplier)
  );
  height: calc(
    var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
  );
}

.kds-loading-skeleton-list-item-text-large {
  width: 100%;
  min-width: 0;
  height: calc(
    var(--kds-dimension-component-height-0-88x) * v-bind(sizeMultiplier)
  );
}

.kds-loading-skeleton-list-item-text-small {
  width: 100%;
  min-width: 0;
  height: calc(
    var(--kds-dimension-component-height-0-75x) * v-bind(sizeMultiplier)
  );
}

.kds-loading-skeleton-combined-icon {
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

.kds-loading-skeleton-combined-line {
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
