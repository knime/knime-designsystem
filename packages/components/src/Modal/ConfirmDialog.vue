<script setup lang="ts">
import { ref } from "vue";

import Button from "../Button/Button.vue";
import Checkbox from "../Checkbox/Checkbox.vue";

import BaseModal from "./BaseModal.vue";
import {
  type CancellationButton,
  type ConfirmationButton,
  isComponentBasedConfig,
  useConfirmDialog,
} from "./useConfirmDialog";

const askAgain = ref(false);
const { config, isActive, confirm, cancel } = useConfirmDialog();

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

const handleConfirmButtonClick = (button: ConfirmationButton) => {
  if (button.customHandler) {
    button.customHandler({ confirm: onConfirm });
    return;
  }
  onConfirm();
};
const handleCancelButtonClick = (button: CancellationButton) => {
  if (button.customHandler) {
    button.customHandler({ cancel: onCancel });
    return;
  }
  onCancel();
};
</script>

<template>
  <BaseModal
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
          <Checkbox
            v-model="askAgain"
            :label="config.doNotAskAgain.label"
            :title="config.doNotAskAgain.title"
            :helper-text="config.doNotAskAgain.helperText"
          />
        </div>
      </div>
    </template>

    <template v-if="config" #footerStart>
      <Button
        v-for="(button, index) in config.cancelButtons"
        ref="buttonsCancel"
        :key="index"
        size="large"
        :label="button.label"
        variant="transparent"
        :data-test-id="`cancel-button-${index}`"
        @click="handleCancelButtonClick(button)"
      />
    </template>

    <template v-if="config" #footerEnd>
      <Button
        v-for="(button, index) in config.confirmButtons"
        ref="buttonsConfirm"
        :key="index"
        size="large"
        :leading-icon="button.leadingIcon"
        :destructive="button.destructive"
        :label="button.label"
        :variant="button.variant"
        :data-test-id="`confirm-button-${index}`"
        @click="handleConfirmButtonClick(button)"
      />
    </template>
  </BaseModal>
</template>

<style scoped>
.ask-again {
  padding: var(--kds-spacing-container-0-5x) 0 0 0;
}
</style>
