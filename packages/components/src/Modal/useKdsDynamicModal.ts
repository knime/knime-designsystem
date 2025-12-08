import {
  type ComponentPublicInstance,
  type FunctionalComponent,
  type VNode,
  computed,
  ref,
} from "vue";

import { promise as PromiseUtils } from "@knime/utils";

import type { KdsButtonProps } from "../Button/types";

import type { KdsModalLayoutProps, KdsModalProps } from "./types";

type CommonButtonProps = {
  label: string;
  autofocus?: boolean;
  destructive?: boolean;
  variant?: KdsButtonProps["variant"];
  flushLeft?: boolean;
};

type ConfirmationButton = CommonButtonProps & {
  type: "confirm";
  customHandler?: (actions: { confirm: () => void }) => void;
};

type CancellationButton = CommonButtonProps & {
  type: "cancel";
  customHandler?: (actions: { cancel: () => void }) => void;
};

export type ConfirmModalButton = ConfirmationButton | CancellationButton;

type CommonConfig = {
  /**
   * Modal title
   */
  title: string;

  /**
   * Icon shown in the title bar of the modal. Defaults to no icon used
   */
  icon?: KdsModalProps["icon"];

  /**
   * If the modal gets closed by user actions:
   *   closerequest: pressing the "Esc" key (or equivalent on mobile) dismisses the modal.
   *   any: the above and also clicking outside of the modal
   *
   * Defaults to 'closerequest'
   */
  closedby?: KdsModalProps["closedby"];
};

type PropertyBasedConfirmModalConfig = CommonConfig & {
  /**
   * The message displayed in the modal body
   */
  message: string;
  /**
   * The label and helperText to be rendered for the "do not ask again" checkbox option.
   * The title will be shown as tooltip on hover. The checkbox will only be present when
   * an object is supplied. The value will be returned on the modal result.
   * Defaults to empty undefined.
   */
  doNotAskAgain?: {
    label: string;
    title?: string;
    helperText?: string;
  };

  /**
   * Confirmation or cancellation buttons if omitted default ones are set
   */
  buttons?: Array<ConfirmModalButton>;
};

type TemplateBasedConfirmModalConfig = CommonConfig & {
  /**
   * the dynamic component to be used as the confirmation modal body
   */
  component: FunctionalComponent | ComponentPublicInstance | VNode;

  /**
   * Confirmation or cancellation buttons if omitted default ones are set
   */
  buttons?: Array<ConfirmModalButton>;
};

export type KdsDynamicDialogConfirmConfig =
  | PropertyBasedConfirmModalConfig
  | TemplateBasedConfirmModalConfig;

/**
 * Define a props api which dynamic template components can optionally
 * define to get access to the configuration the dynamic modal was called with
 */
export type KdsDynamicModalPropsAPI = KdsModalLayoutProps;
type DynamicModalComponent = abstract new (...args: unknown[]) => {
  $props: KdsDynamicModalPropsAPI;
};

export type KdsDynamicModalTemplateConfig = CommonConfig & {
  component:
    | DynamicModalComponent
    | FunctionalComponent<KdsDynamicModalPropsAPI>;
};

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
const activeModalConfig = ref<
  | { type: "confirm"; value: KdsDynamicDialogConfirmConfig }
  | { type: "dynamic"; value: KdsDynamicModalTemplateConfig }
  | null
>(null);

const unwrappedPromise = ref(PromiseUtils.createUnwrappedPromise());

const resetInternalState = () => {
  isActive.value = false;
  unwrappedPromise.value = PromiseUtils.createUnwrappedPromise();
  // config is cleared after the close animations is finished
};

/* called when KdsModal has finished close animations  */
const onCloseAnimationEnd = () => {
  activeModalConfig.value = null;
};

/**
 * Used to confirm the modal result. Should only used when called via
 * `askConfirmation`
 * @param doNotAskAgain
 */
const confirm = (doNotAskAgain = false) => {
  unwrappedPromise.value.resolve({
    confirmed: true,
    doNotAskAgain,
  });
  resetInternalState();
};

/**
 * Close or cancel the dialog
 */
const close = () => {
  const isConfirm = activeModalConfig.value?.type === "confirm";
  unwrappedPromise.value.resolve(isConfirm ? { confirmed: false } : undefined);
  resetInternalState();
};

const isTemplateBasedConfirm = (
  config: KdsDynamicDialogConfirmConfig,
): config is TemplateBasedConfirmModalConfig => {
  return "component" in config;
};

export const internal = {
  confirm,
  close,
  isTemplateBasedConfirm,
  onCloseAnimationEnd,
};

export const useKdsDynamicModal = () => {
  // function overload to support 2 distinct configurations
  function askConfirmation(
    config: PropertyBasedConfirmModalConfig,
  ): Promise<ConfirmResult>;

  // function overload to support 2 distinct configurations
  function askConfirmation(
    config: TemplateBasedConfirmModalConfig,
  ): Promise<ConfirmResult>;

  function askConfirmation(
    config: KdsDynamicDialogConfirmConfig,
  ): Promise<ConfirmResult> {
    activeModalConfig.value = {
      type: "confirm",
      value: {
        buttons: [defaultCancelButton, defaultConfirmButton],
        ...config,
      },
    };

    isActive.value = true;
    return unwrappedPromise.value.promise as Promise<ConfirmResult>;
  }

  const showByTemplate = (
    config: KdsDynamicModalTemplateConfig,
  ): Promise<void> => {
    activeModalConfig.value = {
      type: "dynamic",
      value: config,
    };

    isActive.value = true;
    return unwrappedPromise.value.promise as Promise<void>;
  };

  return {
    askConfirmation,
    showByTemplate,
    config: computed(() => activeModalConfig.value),
    isActive: computed(() => isActive.value),
    close: () => internal.close(),
  };
};
