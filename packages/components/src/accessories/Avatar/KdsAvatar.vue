<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { KdsAvatarProps } from "./types";

const props = withDefaults(defineProps<KdsAvatarProps>(), {
  title: undefined,
  src: undefined,
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
  <img
    v-if="shouldShowImage"
    class="kds-avatar kds-avatar-image"
    :src="props.src"
    :alt="hasTitle ? accessibleTitle : ''"
    :title="hasTitle ? accessibleTitle : undefined"
    :aria-hidden="!hasTitle"
    @error="onImageError"
  />
  <div
    v-else
    class="kds-avatar kds-avatar-initials"
    :role="hasTitle ? 'img' : 'presentation'"
    :title="hasTitle ? accessibleTitle : undefined"
    :aria-hidden="!hasTitle"
    :aria-label="hasTitle ? accessibleTitle : undefined"
  >
    <span>
      {{ displayedInitials }}
    </span>
  </div>
</template>

<style scoped>
.kds-avatar {
  display: inline-block;
  inline-size: var(--kds-dimension-component-width-1-5x);
  block-size: var(--kds-dimension-component-width-1-5x);
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: var(--kds-border-base-muted);
  border-radius: var(--kds-border-radius-container-pill);
}

.kds-avatar-image {
  vertical-align: middle;
  object-fit: cover;
  object-position: center;
}

.kds-avatar-initials {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  container-type: inline-size;
  font: var(--kds-font-base-body-small-strong);
  color: var(--kds-color-text-and-icon-primary-inverted);
  user-select: none;
  background: var(--kds-color-background-primary-bold-initial);

  span {
    font-size: calc(1em + calc(100cqi + 2px - 2em) / 2);
  }
}
</style>
