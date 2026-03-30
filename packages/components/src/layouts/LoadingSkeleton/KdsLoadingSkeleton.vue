<script setup lang="ts">
import LoadingSkeletonItem from "./LoadingSkeletonItem.vue";
import type {
  KdsLoadingSkeletonProps,
  LoadingSkeletonItemShape,
} from "./types";

const {
  loading = false,
  variant = "text",
  repeat = 1,
  repeatGap = "var(--kds-spacing-container-1x)",
  width,
  height,
} = defineProps<KdsLoadingSkeletonProps>();
</script>

<template>
  <div v-if="loading" class="kds-loading-skeleton" aria-hidden="true">
    <div v-for="index in repeat" :key="`skeleton-${index}`" role="presentation">
      <template v-if="variant == 'text-headline-with-paragraph'">
        <div class="kds-loading-skeleton-headline-with-paragraph">
          <LoadingSkeletonItem shape="text" class="headline" />
          <div class="kds-loading-skeleton-paragraph-lines">
            <LoadingSkeletonItem shape="text" />
            <LoadingSkeletonItem shape="text" />
            <LoadingSkeletonItem shape="text" />
          </div>
        </div>
      </template>
      <template v-else-if="variant == 'input-field'">
        <div class="kds-loading-skeleton-input-field">
          <LoadingSkeletonItem shape="label" class="label" />
          <LoadingSkeletonItem shape="input-field" />
        </div>
      </template>
      <template v-else-if="variant?.startsWith('list-item-')">
        <div
          :class="[
            'kds-loading-skeleton-list-item',
            {
              'kds-loading-skeleton-list-item-large':
                variant.startsWith('list-item-large'),
              'kds-loading-skeleton-list-item-large-with-subtext':
                variant == 'list-item-large-with-subtext',
              'kds-loading-skeleton-list-item-small':
                variant.startsWith('list-item-small'),
            },
          ]"
        >
          <LoadingSkeletonItem
            :shape="
              variant.startsWith('list-item-large')
                ? 'icon-large'
                : 'icon-small'
            "
          />
          <div class="kds-loading-skeleton-list-item-text">
            <LoadingSkeletonItem
              shape="text"
              :height="
                variant == 'list-item-large'
                  ? 'var(--kds-dimension-component-height-0-88x)'
                  : 'var(--kds-dimension-component-height-0-75x)'
              "
            />
            <LoadingSkeletonItem
              v-if="variant.endsWith('subtext')"
              shape="text"
              :height="
                variant == 'list-item-large'
                  ? 'var(--kds-dimension-component-height-0-88x)'
                  : 'var(--kds-dimension-component-height-0-75x)'
              "
            />
          </div>
        </div>
      </template>
      <template v-else>
        <LoadingSkeletonItem
          :shape="variant as LoadingSkeletonItemShape"
          :width="width"
          :height="height"
        />
      </template>
    </div>
  </div>
  <div v-else v-bind="$attrs">
    <slot />
  </div>
</template>

<style scoped>
.kds-loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: v-bind(repeatGap);
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
  display: flex;
  gap: var(--kds-spacing-container-0-5x);
  align-items: center;
  width: 100%;
  min-width: var(--kds-dimension-component-width-12x);
  padding: var(--kds-spacing-container-0-25x) var(--kds-spacing-container-0-5x);

  & .kds-loading-skeleton-list-item-text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--kds-spacing-container-0-25x);
    min-width: 0;

    & .text {
      width: 100%;
    }
  }

  &.kds-loading-skeleton-list-item-large {
    & .kds-loading-skeleton-list-item-text {
      justify-content: center;
      min-height: calc(
        var(--kds-dimension-component-height-2-5x) - 2 *
          var(--kds-spacing-container-0-25x)
      );
    }
  }

  &.kds-loading-skeleton-list-item-small {
    gap: var(--kds-spacing-container-0-5x);
    align-items: start;
    padding: calc(
        var(--kds-spacing-container-0-5x) - var(--kds-core-border-width-xs)
      )
      var(--kds-spacing-container-0-5x) var(--kds-spacing-container-0-25x);

    & .kds-loading-skeleton-list-item-text {
      justify-content: flex-start;
    }
  }

  &.kds-loading-skeleton-list-item-large-with-subtext {
    align-items: center;

    & .kds-loading-skeleton-list-item-text {
      justify-content: center;
    }
  }
}
</style>
