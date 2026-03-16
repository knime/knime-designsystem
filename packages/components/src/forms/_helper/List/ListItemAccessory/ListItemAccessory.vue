<script setup lang="ts">
import { KdsLiveStatus } from "../../../../accessories";
import KdsAvatar from "../../../../accessories/Avatar/KdsAvatar.vue";
import KdsColorSwatch from "../../../../accessories/ColorSwatch/KdsColorSwatch.vue";
import KdsDataType from "../../../../accessories/Icon/KdsDataType.vue";
import KdsIcon from "../../../../accessories/Icon/KdsIcon.vue";

import type {
  KdsListItemAccessory,
  KdsListItemAccessorySize,
} from "./types.ts";

const {
  accessory,
  size,
  disabled = false,
} = defineProps<{
  accessory: KdsListItemAccessory;
  size: KdsListItemAccessorySize;
  disabled?: boolean;
}>();
</script>

<template>
  <KdsAvatar
    v-if="accessory.type === 'avatar'"
    :title="accessory.title"
    :src="accessory.src"
    :initials="accessory.initials"
    :size="size"
  />
  <KdsColorSwatch
    v-else-if="accessory.type === 'colorSwatch'"
    :color="accessory.color"
    :title="accessory.title"
    :size="size"
  />
  <KdsIcon
    v-else-if="accessory.type === 'icon'"
    :name="accessory.name"
    :size="size"
    :disabled="disabled"
  />
  <KdsDataType
    v-else-if="accessory.type === 'dataType'"
    :icon-name="accessory.name"
    :size="size"
    :disabled="disabled"
  />
  <KdsLiveStatus
    v-else-if="accessory.type === 'liveStatus'"
    :status="accessory.status"
    :title="accessory.title"
    :size="size"
  />
</template>
