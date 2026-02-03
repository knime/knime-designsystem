<script setup lang="ts">
import { computed } from "vue";

import KdsButton from "../../../buttons/KdsButton.vue";

import type { KdsListItemActionEmits, KdsListItemActionProps } from "./types";

const props = defineProps<KdsListItemActionProps>();
const emit = defineEmits<KdsListItemActionEmits>();

const ariaLabel = computed(() => props["aria-label"]);
</script>

<template>
  <KdsButton
    type="button"
    size="xsmall"
    variant="transparent"
    :leading-icon="props.icon"
    :aria-label="ariaLabel"
    :title="props.title ?? ariaLabel"
    @click.stop="emit('click')"
  />
</template>
