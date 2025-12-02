<script setup lang="ts">
import { ref } from "vue";

import KdsButton from "../Button/KdsButton.vue";
import type { KdsButtonProps } from "../Button/types";
import KdsCheckbox from "../Checkbox/KdsCheckbox.vue";

import KdsModal from "./KdsModal.vue";
import {
  type ConfirmDialogButton,
  internal,
  useKdsDialog,
} from "./useKdsDialog";

const askAgain = ref(false);
const { config, isActive } = useKdsDialog();

const reset = () => {
  askAgain.value = false;
};

const onConfirm = () => {
  internal.confirm(askAgain.value);
  reset();
};

const onClose = () => {
  if (config.value?.type === "confirm") {
    internal.cancel();
    reset();
  } else {
    internal.close();
  }
};

const handleConfirmDialogButton = (button: ConfirmDialogButton) => {
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
  type: ConfirmDialogButton["type"],
): KdsButtonProps["variant"] => (type === "cancel" ? "transparent" : "filled");
</script>

<template>
  <KdsModal
    class="confirm-dialog"
    :active="isActive"
    :title="config?.value.title"
    :closedby="config?.value.closedby"
    :icon="config?.value.icon"
    @close="onClose"
  >
    <template v-if="config?.type === 'confirm'" #body>
      <Component
        :is="config.value.component"
        v-if="internal.isTemplateBasedConfirmDialog(config.value)"
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
        @click="handleConfirmDialogButton(button)"
      />
    </template>

    <template v-if="config?.type === 'dynamic'" #default="slotProps">
      <Component :is="config.value.component" v-bind="slotProps" />
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
