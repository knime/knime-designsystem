<script setup lang="ts">
import { ref, watch } from "vue";

import KdsButton from "../../buttons/KdsButton/KdsButton.vue";
import KdsCheckbox from "../../forms/Checkbox/KdsCheckbox.vue";

import KdsModalLayout from "./KdsModalLayout.vue";
import type { KdsDynamicModalPropsAPI } from "./useKdsDynamicModal";

const props = defineProps<KdsDynamicModalPropsAPI>();
const checked = ref<boolean | "indeterminate">(false);

const title = "Can you see this?";
const leadingIcon = "ai-general";

props.updateConfig({ title, leadingIcon });

watch(checked, (value) => {
  props.updateConfig({
    title: title + (value ? " (checked)" : ""),
    leadingIcon: value ? "checkmark" : leadingIcon,
  });
});
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
