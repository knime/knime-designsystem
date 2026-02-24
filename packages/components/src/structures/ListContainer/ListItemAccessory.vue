<script setup lang="ts">
import { KdsLiveStatus } from "../../accessories";
import KdsAvatar from "../../accessories/Avatar/KdsAvatar.vue";
import KdsColorSwatch from "../../accessories/ColorSwatch/KdsColorSwatch.vue";
import KdsDataType from "../../accessories/Icon/KdsDataType.vue";
import KdsIcon from "../../accessories/Icon/KdsIcon.vue";

import type { KdsListItemAccessory } from "./types";

const props = defineProps<{
  accessory: KdsListItemAccessory;
  size: "small" | "large";
}>();
</script>

<template>
  <KdsAvatar
    v-if="props.accessory.type === 'avatar'"
    :title="props.accessory.title"
    :src="props.accessory.imageSrc"
    :initials="props.accessory.initials"
    :size="props.size"
  />
  <KdsColorSwatch
    v-else-if="props.accessory.type === 'colorSwatch'"
    :color="props.accessory.color"
    :title="props.accessory.title"
    :size="props.size"
  />
  <KdsIcon
    v-else-if="props.accessory.type === 'icon'"
    :name="props.accessory.name"
    :size="props.size"
  />
  <KdsDataType
    v-else-if="props.accessory.type === 'dataType'"
    :icon-name="props.accessory.name"
    :size="props.size"
  />
  <KdsLiveStatus
    v-else-if="props.accessory.type === 'liveStatus'"
    :status="props.accessory.status"
    :title="props.accessory.title"
    :size="props.size"
  />
</template>
