<script setup lang="ts">
import KdsLoadingSkeletonItem from "./KdsLoadingSkeletonItem.vue";
import type {
  KdsLoadingSkeletonProps,
  kdsLoadingSkeletonItemShape,
} from "./types";

const {
  loading = false,
  variant = "text",
  repeat = 1,
  repeatGap = "var(--kds-spacing-container-1x)",
  width,
  height,
} = defineProps<KdsLoadingSkeletonProps>();

/* TODO move to layout folder */
</script>

<template>
  <div v-if="loading" class="kds-loading-skeleton" aria-hidden="true">
    <div v-for="index in repeat" :key="`skeleton-${index}`" role="presentation">
      <template v-if="variant == 'text-headline-with-paragraph'">
        <div class="kds-loading-skeleton-headline-with-paragraph">
          <KdsLoadingSkeletonItem shape="text" class="headline" />
          <div class="kds-loading-skeleton-paragraph-lines">
            <KdsLoadingSkeletonItem shape="text" />
            <KdsLoadingSkeletonItem shape="text" />
            <KdsLoadingSkeletonItem shape="text" />
          </div>
        </div>
      </template>
      <template v-else-if="variant == 'input-field'">
        <div class="kds-loading-skeleton-input-field">
          <KdsLoadingSkeletonItem shape="label" class="label" />
          <KdsLoadingSkeletonItem shape="input-field" />
        </div>
      </template>
      <template v-else-if="variant?.startsWith('list-item-')">
        <div
          :class="[
            'kds-loading-skeleton-list-item',
            {
              'kds-loading-skeleton-list-item-small':
                variant.startsWith('list-item-small'),
            },
          ]"
        >
          <KdsLoadingSkeletonItem
            :shape="
              variant.startsWith('list-item-large')
                ? 'icon-large'
                : 'icon-small'
            "
          />
          <div class="kds-loading-skeleton-list-item-text">
            <KdsLoadingSkeletonItem shape="text" />
            <KdsLoadingSkeletonItem
              v-if="variant.endsWith('subtext')"
              shape="text"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <KdsLoadingSkeletonItem
          :shape="variant as kdsLoadingSkeletonItemShape"
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
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--kds-spacing-container-0-75x);
  align-items: center;

  /* TODO adjust padding depending on large/small */
  padding: var(--kds-spacing-container-0-75x);

  & .kds-loading-skeleton-list-item-text {
    display: grid;
    gap: var(--kds-spacing-container-0-5x);

    & .text {
      height: var(--kds-dimension-component-height-0-88x);
    }
  }
}

.kds-loading-skeleton-list-item-small {
  /* TODO fix icon/text size */
  align-items: start;
}
</style>
