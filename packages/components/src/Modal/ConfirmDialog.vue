<script setup lang="ts">
import { nextTick, ref, unref, useTemplateRef, watch } from "vue";

import Button from "../Button/Button.vue";
import Checkbox from "../Checkbox/Checkbox.vue";

import BaseModal from "./BaseModal.vue";
import {
  type ConfirmDialogButton,
  isComponentBasedConfig,
  useConfirmDialog,
} from "./useConfirmDialog";

const askAgain = ref(false);
const { config, isActive, confirm, cancel } = useConfirmDialog();

const reset = () => {
  askAgain.value = false;
};

const onConfirm = () => {
  confirm(unref(askAgain.value));
  reset();
};

const onCancel = () => {
  cancel();
  reset();
};

const handleButtonClick = (button: ConfirmDialogButton) => {
  if (button.customHandler) {
    button.customHandler({ confirm: onConfirm, cancel: onCancel });
    return;
  }

  const handler = button.type === "confirm" ? onConfirm : onCancel;
  handler();
};

const buttons = useTemplateRef("buttons");
watch(isActive, async (active) => {
  if (active && config.value?.focusButton !== undefined) {
    await nextTick();
    buttons.value?.at(config.value?.focusButton)?.$el.focus();
  }
});
</script>

<template>
  <BaseModal
    :active="isActive"
    :title="config?.title"
    :implicit-dismiss="config?.implicitDismiss"
    class="confirm-dialog"
    :icon="config?.titleIcon"
    @close="onCancel"
  >
    <template #default>
      <component
        :is="config.component"
        v-if="config && isComponentBasedConfig(config)"
      />
      <div v-else class="confirmation">
        <div class="message">{{ config?.message }}</div>
        <div v-if="config?.doNotAskAgainText" class="ask-again">
          <Checkbox
            v-model="askAgain"
            :label="config.doNotAskAgainText"
            :helper-text="config.doNotAskAgainHelperText"
          />
        </div>
      </div>
    </template>

    <template v-if="config" #footer>
      <Button
        v-for="(button, index) in config.buttons"
        ref="buttons"
        :key="index"
        size="large"
        :class="`button-${button.type}`"
        :data-test-id="`${button.type}-button-${index}`"
        :label="button.label"
        :variant="button.variant"
        @click="handleButtonClick(button)"
    /></template>
  </BaseModal>
</template>

<style scoped>
.button-confirm,
.button-cancel {
  margin-left: initial;
}

:nth-child(1 of .button-confirm) {
  margin-left: auto;
}
</style>
