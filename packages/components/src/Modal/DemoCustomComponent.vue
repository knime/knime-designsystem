<script setup lang="ts">
import { ref } from "vue";

import KdsButton from "../Button/KdsButton.vue";
import KdsCheckbox from "../Checkbox/KdsCheckbox.vue";

import KdsModalLayout from "./KdsModalLayout.vue";
import type { KdsDynamicDialogPropsAPI } from "./useKdsDialog";

const props = defineProps<KdsDynamicDialogPropsAPI>();
const checked = ref<boolean | "indeterminate">(false);
</script>

<template>
  <KdsModalLayout v-bind="$props">
    <template #body>
      <KdsCheckbox
        v-model="checked"
        data-test-id="checkbox"
        label="Check me to close"
      />
      <span>THIS IS THE BODY INSIDE THE CUSTOM TEMPLATE</span>
    </template>
    <template #footer>
      <KdsButton
        data-test-id="close-button"
        :disabled="!checked"
        label="Close me"
        variant="filled"
        @click="props.onClose"
      />
    </template>
  </KdsModalLayout>
</template>
