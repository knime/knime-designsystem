<script setup lang="ts">
import KdsIcon from "../../accessories/Icon/KdsIcon.vue";
import KdsLiveStatus from "../../accessories/LiveStatus/KdsLiveStatus.vue";

import type { KdsTabBarItemAccessory } from "./types";

const props = defineProps<{
  accessory: KdsTabBarItemAccessory;
  disabled?: boolean;
}>();
</script>

<template>
  <KdsIcon
    v-if="props.accessory.type === 'icon'"
    :name="props.accessory.name"
    class="kds-tab-icon"
    :disabled="props.disabled"
  />
  <KdsLiveStatus
    v-else-if="props.accessory.type === 'liveStatus'"
    :status="props.accessory.status"
    class="kds-tab-live-status"
  />
</template>
