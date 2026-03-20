<script setup lang="ts">
import KdsLoadingSkeletonItem from "./KdsLoadingSkeletonItem.vue";
import type { KdsLoadingSkeletonProps } from "./types";
import { useKdsLoadingSkeleton } from "./useKdsLoadingSkeleton";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<KdsLoadingSkeletonProps>();

const { isVariant, loading, repeat } = useKdsLoadingSkeleton(props);
</script>

<template>
  <div
    v-if="loading"
    class="kds-loading-skeleton"
    v-bind="$attrs"
    aria-hidden="true"
  >
    <div v-for="index in repeat" :key="`skeleton-${index}`" role="presentation">
      <template v-if="isVariant('text-headline-with-paragraph')">
        <div class="kds-loading-skeleton-headline-with-paragraph">
          <KdsLoadingSkeletonItem shape="text" class="headline" />
          <div class="kds-loading-skeleton-paragraph-lines">
            <KdsLoadingSkeletonItem shape="text" />
            <KdsLoadingSkeletonItem shape="text" />
            <KdsLoadingSkeletonItem shape="text" />
          </div>
        </div>
      </template>
      <template v-else-if="isVariant('input-field')">
        <div class="kds-loading-skeleton-input-field">
          <KdsLoadingSkeletonItem shape="label" class="label" />
          <KdsLoadingSkeletonItem shape="input" />
        </div>
      </template>
      <template
        v-else-if="
          isVariant('list-item-large') ||
          isVariant('list-item-large-with-subtext') ||
          isVariant('list-item-small') ||
          isVariant('list-item-small-with-subtext')
        "
      >
        <div
          :class="[
            'kds-loading-skeleton-list-item',
            {
              'kds-loading-skeleton-list-item-small':
                isVariant('list-item-small') ||
                isVariant('list-item-small-with-subtext'),
            },
          ]"
        >
          <KdsLoadingSkeletonItem
            :shape="
              isVariant('list-item-large') ||
              isVariant('list-item-large-with-subtext')
                ? 'icon-large'
                : 'icon-small'
            "
          />
          <div class="kds-loading-skeleton-list-item-text">
            <KdsLoadingSkeletonItem shape="text" />
            <KdsLoadingSkeletonItem
              v-if="
                isVariant('list-item-large-with-subtext') ||
                isVariant('list-item-small-with-subtext')
              "
              shape="text"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <KdsLoadingSkeletonItem :shape="props.variant" />
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
  display: flex;
  flex-direction: column;
  gap: v-bind(props.repeatGap);
}

.kds-loading-skeleton-headline-with-paragraph {
  display: grid;
  gap: var(--kds-spacing-container-1-25x);

  & .headline {
    width: 50%;
    height: var(--kds-dimension-component-height-1x);
  }

  & .kds-loading-skeleton-paragraph-lines {
    display: grid;
    gap: var(--kds-spacing-container-0-75x);

    & > *:nth-child(2) {
      width: 75%;
    }

    & > *:nth-child(3) {
      width: 50%;
    }
  }
}

.kds-loading-skeleton-input-field {
  display: grid;
  gap: var(--kds-spacing-container-0-75x);
}

.kds-loading-skeleton-list-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--kds-spacing-container-0-75x);
  align-items: center;

  & .kds-loading-skeleton-list-item-text {
    display: grid;
    gap: var(--kds-spacing-container-0-5x);

    & .text {
      height: var(--kds-dimension-component-height-0-88x);
    }
  }
}

.kds-loading-skeleton-list-item-small {
  align-items: start;
}
</style>
