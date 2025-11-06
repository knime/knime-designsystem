import { type VNode, computed, ref } from "vue";
import type { IconName } from "packages/styles/dist/img/icons/def";

import { promise as PromiseUtils } from "@knime/utils";

import type { Variant } from "../Button/BaseButton.vue";

type ConfirmationButton = {
  type: "confirm";
  label: string;
  variant?: Variant;
  destructive?: boolean;
  customHandler?: (actions: { confirm: () => void }) => void;
};

type CancellationButton = {
  type: "cancel";
  label: string;
  variant?: Variant;
  destructive?: boolean;
  customHandler?: (actions: { cancel: () => void }) => void;
};

export type ConfirmDialogButton = ConfirmationButton | CancellationButton;

type CommonConfig = {
  /**
   * Dialog title
   */
  title: string;
  /**
   * Icon shown in the title bar of the dialog. Defaults to no icon used
   */
  titleIcon?: IconName;
  /**
   * Whether pressing the "Esc" key dismisses the dialog. Defaults to (false)
   */
  implicitDismiss?: boolean;
  /**
   * A list of buttons to control the dialog. Buttons belong to 2 categories:
   * - confirmation -> positive result out from the dialog
   * - cancellation -> negative result out from the dialog
   */
  buttons?: Array<ConfirmDialogButton>;

  /**
   * Index of the button that should have focus after the dialog is shown.
   */
  focusButton?: number;
};

export type PropertyBasedConfig = CommonConfig & {
  /**
   * The message displayed in the dialog body
   */
  message: string;
  /**
   * The text to be rendered for the "do not ask again" checkbox option. The checkbox
   * will only be present when a text is supplied. The value will be returned on the dialog result.
   * Defaults to empty string
   */
  doNotAskAgainText?: string;
};

export type ComponentBasedConfig = CommonConfig & {
  /**
   * A component (supplied as Vue vnode instance) to be used as the template
   * for the dialog body
   */
  component: VNode;
};

type ModalConfig = PropertyBasedConfig | ComponentBasedConfig;

export const defaultButtons = (
  confirmLabel: string = "Yes",
  cancelLabel: string = "No",
): [ConfirmDialogButton, ConfirmDialogButton] => [
  { type: "cancel", label: cancelLabel, variant: "outlined" },
  { type: "confirm", label: confirmLabel, variant: "filled" },
];

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
      buttons: defaultButtons(),
      focusButton: 0, // focus cancel by default
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
