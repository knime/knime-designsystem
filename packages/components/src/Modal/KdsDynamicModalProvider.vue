<script setup lang="ts">
import { computed, ref } from "vue";

import type { KdsButtonProps } from "../buttons";
import KdsButton from "../buttons/KdsButton.vue";
import KdsCheckbox from "../forms/Checkbox/KdsCheckbox.vue";

import KdsModal from "./KdsModal.vue";
import {
  type ConfirmModalButton,
  internal,
  useKdsDynamicModal,
} from "./useKdsDynamicModal";

const askAgain = ref(false);
const { config, isActive } = useKdsDynamicModal();

const reset = () => {
  askAgain.value = false;
};

const onConfirm = () => {
  internal.confirm(askAgain.value);
  reset();
};

const onClose = () => {
  internal.close();
  reset();
};

const handleConfirmButton = (button: ConfirmModalButton) => {
  if (!button.customHandler) {
    const handler = button.type === "cancel" ? onClose : onConfirm;
    handler();
    return;
  }

  if (button.type === "cancel") {
    button.customHandler({ cancel: onClose });
  }

  if (button.type === "confirm") {
    button.customHandler({ confirm: onConfirm });
  }
};

const defaultVariant = (
  type: ConfirmModalButton["type"],
): KdsButtonProps["variant"] => (type === "cancel" ? "transparent" : "filled");

const kdsModalProps = computed(() => {
  if (!config.value) {
    return {};
  }

  const { icon, title, height, width, variant, overflow, closedby } =
    config.value.value;

  return {
    icon,
    title,
    height,
    width,
    variant,
    overflow,
    closedby,
    onClose,
    onClosed: internal.onClosed,
    active: isActive.value,
  };
});
</script>

<template>
  <KdsModal class="confirm-modal" v-bind="kdsModalProps">
    <template v-if="config?.type === 'confirm'" #body>
      <Component
        :is="config.value.component"
        v-if="internal.isTemplateBasedConfirm(config.value)"
      />

      <div v-else class="confirmation">
        <div class="message">{{ config.value.message }}</div>
        <div v-if="config.value.doNotAskAgain" class="ask-again">
          <KdsCheckbox
            v-model="askAgain"
            :label="config.value.doNotAskAgain.label"
            :title="config.value.doNotAskAgain.title"
            :helper-text="config.value.doNotAskAgain.helperText"
          />
        </div>
      </div>
    </template>

    <template v-if="config?.type === 'confirm'" #footer>
      <KdsButton
        v-for="(button, index) in config.value.buttons"
        :key="index"
        :destructive="button.destructive"
        :autofocus="button.autofocus"
        :label="button.label"
        :variant="button.variant ?? defaultVariant(button.type)"
        :class="{ 'flush-left': button.flushLeft }"
        :data-test-id="`${button.type}-button`"
        @click="handleConfirmButton(button)"
      />
    </template>

    <template v-if="config?.type === 'dynamic'" #default="slotProps">
      <Component
        :is="config.value.component"
        v-bind="{
          ...slotProps,
          context: config.value.context,
          updateConfig: internal.updateConfig,
        }"
      />
    </template>
  </KdsModal>
</template>

<style scoped>
.ask-again {
  padding: var(--kds-spacing-container-0-5x) 0 0 0;
}

.flush-left {
  margin-right: auto;
}
</style>
