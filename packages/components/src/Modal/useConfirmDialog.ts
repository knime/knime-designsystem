import { type VNode, computed, ref } from "vue";

import { promise as PromiseUtils } from "@knime/utils";

import type { ButtonProps } from "../Button/types";

import type { BaseModalProps } from "./types";

type CommonButtonProps = {
  label: string;
  autofocus?: boolean;
  destructive?: boolean;
  variant?: ButtonProps["variant"];
  flushLeft?: boolean;
};

export type ConfirmationButton = CommonButtonProps & {
  type: "confirm";
  customHandler?: (actions: { confirm: () => void }) => void;
};

export type CancellationButton = CommonButtonProps & {
  type: "cancel";
  customHandler?: (actions: { cancel: () => void }) => void;
};

export type UseConfirmDialogButton = ConfirmationButton | CancellationButton;

type CommonConfig = {
  /**
   * Dialog title
   */
  title: string;

  /**
   * Icon shown in the title bar of the dialog. Defaults to no icon used
   */
  icon?: BaseModalProps["icon"];

  /**
   * If the dialog gets closed by user actions:
   *   closerequest: pressing the "Esc" key (or equivalent on mobile) dismisses the dialog.
   *   any: the above and also clicking outside of the dialog
   *
   * Defaults to 'closerequest'
   */
  closedby?: BaseModalProps["closedby"];

  /**
   * Confirmation or cancellation buttons if omitted default ones are set
   */
  buttons?: Array<UseConfirmDialogButton>;
};

export type PropertyBasedConfig = CommonConfig & {
  /**
   * The message displayed in the dialog body
   */
  message: string;
  /**
   * The label and helperText to be rendered for the "do not ask again" checkbox option.
   * The title will be shown as tooltip on hover. The checkbox will only be present when
   * an object is supplied. The value will be returned on the dialog result.
   * Defaults to empty undefined.
   */
  doNotAskAgain?: {
    label: string;
    title?: string;
    helperText?: string;
  };
};

export type ComponentBasedConfig = CommonConfig & {
  /**
   * A component (supplied as Vue VNode instance) to be used as the template
   * for the dialog body
   */
  component: VNode;
};

type ModalConfig = PropertyBasedConfig | ComponentBasedConfig;

const defaultCancelButton: CancellationButton = {
  type: "cancel",
  label: "Cancel",
};

const defaultConfirmButton: ConfirmationButton = {
  type: "confirm",
  label: "Confirm",
};

type ConfirmResult = { confirmed: boolean; doNotAskAgain?: boolean };

const isActive = ref(false);
const activeModalConfig = ref<ModalConfig | null>(null);
const unwrappedPromise = ref(
  PromiseUtils.createUnwrappedPromise<ConfirmResult>(),
);

export const isComponentBasedConfig = (
  config: ModalConfig,
): config is ComponentBasedConfig => {
  return "component" in config;
};

export const useConfirmDialog = () => {
  // function overload to support 2 distinct configurations
  function show(config: PropertyBasedConfig): Promise<ConfirmResult>;

  // function overload to support 2 distinct configurations
  function show(config: ComponentBasedConfig): Promise<ConfirmResult>;

  function show(config: ModalConfig): Promise<ConfirmResult> {
    activeModalConfig.value = {
      buttons: [defaultCancelButton, defaultConfirmButton],
      ...config,
    };

    isActive.value = true;
    return unwrappedPromise.value.promise;
  }

  const close = () => {
    isActive.value = false;
    activeModalConfig.value = null;
    unwrappedPromise.value = PromiseUtils.createUnwrappedPromise();
  };

  const confirm = (doNotAskAgain = false) => {
    unwrappedPromise.value.resolve({
      confirmed: true,
      doNotAskAgain,
    });
    close();
  };

  const cancel = () => {
    unwrappedPromise.value.resolve({ confirmed: false });
    close();
  };

  return {
    show,
    confirm,
    cancel,
    config: computed(() => activeModalConfig.value),
    isActive: computed(() => isActive.value),
    dialogResult: computed(() => unwrappedPromise.value.promise),
  };
};
