<script setup lang="ts">
import { ref } from "vue";

import KdsButton from "../Button/KdsButton.vue";
import type { KdsButtonProps } from "../Button/types";
import KdsCheckbox from "../Checkbox/KdsCheckbox.vue";

import KdsModal from "./KdsModal.vue";
import {
  type UseKdsConfirmDialogButton,
  type UseKdsConfirmDialogCancellationButton,
  type UseKdsConfirmDialogConfirmationButton,
  useKdsConfirmDialog,
} from "./useKdsConfirmDialog";

const askAgain = ref(false);
const { config, isActive, confirm, cancel, isComponentBasedConfig } =
  useKdsConfirmDialog();

const reset = () => {
  askAgain.value = false;
};

const onConfirm = () => {
  confirm(askAgain.value);
  reset();
};

const onCancel = () => {
  cancel();
  reset();
};

const handleConfirmButtonClick = (
  button: UseKdsConfirmDialogConfirmationButton,
) => {
  if (button.customHandler) {
    button.customHandler({ confirm: onConfirm });
    return;
  }
  onConfirm();
};

const handleCancelButtonClick = (
  button: UseKdsConfirmDialogCancellationButton,
) => {
  if (button.customHandler) {
    button.customHandler({ cancel: onCancel });
    return;
  }
  onCancel();
};

const handleButtonClick = (button: UseKdsConfirmDialogButton) => {
  if (button.type === "cancel") {
    handleCancelButtonClick(button);
  } else {
    handleConfirmButtonClick(button);
  }
};

const defaultVariant = (
  type: UseKdsConfirmDialogButton["type"],
): KdsButtonProps["variant"] => (type === "cancel" ? "transparent" : "filled");
</script>

<template>
  <KdsModal
    class="confirm-dialog"
    :active="isActive"
    :title="config?.title"
    :closedby="config?.closedby"
    :icon="config?.icon"
    @close="onCancel"
  >
    <template #default>
      <component
        :is="config.component"
        v-if="config && isComponentBasedConfig(config)"
      />
      <div v-else class="confirmation">
        <div class="message">{{ config?.message }}</div>
        <div v-if="config?.doNotAskAgain" class="ask-again">
          <KdsCheckbox
            v-model="askAgain"
            :label="config.doNotAskAgain.label"
            :title="config.doNotAskAgain.title"
            :helper-text="config.doNotAskAgain.helperText"
          />
        </div>
      </div>
    </template>

    <template v-if="config" #footer>
      <KdsButton
        v-for="(button, index) in config.buttons"
        :key="index"
        :destructive="button.destructive"
        :autofocus="button.autofocus"
        :label="button.label"
        :variant="button.variant ?? defaultVariant(button.type)"
        :class="{ 'flush-left': button.flushLeft }"
        :data-test-id="`${button.type}-button`"
        @click="handleButtonClick(button)"
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
