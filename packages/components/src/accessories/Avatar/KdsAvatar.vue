<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { KdsAvatarProps } from "./types";

const props = withDefaults(defineProps<KdsAvatarProps>(), {
  title: undefined,
  src: undefined,
  size: "xlarge",
});

const imageLoadFailed = ref(false);

watch(
  () => props.src,
  () => {
    imageLoadFailed.value = false;
  },
);

const shouldShowImage = computed(
  () => Boolean(props.src) && !imageLoadFailed.value,
);

const onImageError = () => {
  imageLoadFailed.value = true;
};

const accessibleTitle = computed(() => props.title?.trim() ?? "");
const hasTitle = computed(() => accessibleTitle.value.length > 0);

const displayedInitials = computed(() =>
  props.initials.trim().slice(0, 2).toUpperCase(),
);
</script>

<template>
  <div
    class="kds-avatar"
    :class="props.size"
    :role="hasTitle ? 'img' : 'presentation'"
    :title="hasTitle ? accessibleTitle : undefined"
    :aria-hidden="!hasTitle ? 'true' : undefined"
    :aria-label="hasTitle ? accessibleTitle : undefined"
  >
    <img
      v-if="shouldShowImage"
      class="kds-avatar-image"
      :src="props.src"
      alt=""
      aria-hidden="true"
      @error="onImageError"
    />
    <div v-else class="kds-avatar-initials" aria-hidden="true">
      <span>
        {{ displayedInitials }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.kds-avatar {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  vertical-align: middle;
  border-radius: var(--kds-border-radius-container-pill);

  &.small {
    inline-size: var(--kds-dimension-icon-0-75x);
    block-size: var(--kds-dimension-icon-0-75x);
  }

  &.medium {
    inline-size: var(--kds-dimension-icon-1x);
    block-size: var(--kds-dimension-icon-1x);
  }

  &.large {
    inline-size: var(--kds-dimension-component-width-1-25x);
    block-size: var(--kds-dimension-component-height-1-25x);
  }

  &.xlarge {
    inline-size: var(--kds-dimension-component-width-1-5x);
    block-size: var(--kds-dimension-component-height-1-5x);
  }
}

.kds-avatar::after {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  pointer-events: none;
  content: "";
  border: var(--kds-border-base-muted);
  border-radius: inherit;
}

.kds-avatar-image {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  object-position: center;
}

.kds-avatar-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
  container-type: inline-size;
  font: var(--kds-font-base-body-small-strong);
  color: var(--kds-color-text-and-icon-primary-inverted);
  user-select: none;
  background: var(--kds-color-background-primary-bold-initial);
}

.kds-avatar-initials > span {
  font-size: calc(1em + calc(100cqi - 2em) / 2);
}
</style>
