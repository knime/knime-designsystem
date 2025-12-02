import { type Component, type FunctionalComponent, computed, ref } from "vue";

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

export type ConfirmDialogButton = ConfirmationButton | CancellationButton;

type CommonConfig = {
  /**
   * Dialog title
   */
  title: string;

  /**
   * Icon shown in the title bar of the dialog. Defaults to no icon used
   */
  icon?: KdsModalProps["icon"];

  /**
   * If the dialog gets closed by user actions:
   *   closerequest: pressing the "Esc" key (or equivalent on mobile) dismisses the dialog.
   *   any: the above and also clicking outside of the dialog
   *
   * Defaults to 'closerequest'
   */
  closedby?: KdsModalProps["closedby"];
};

type PropertyBasedConfirmDialogConfig = CommonConfig & {
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

  /**
   * Confirmation or cancellation buttons if omitted default ones are set
   */
  buttons?: Array<ConfirmDialogButton>;
};

type TemplateBasedConfirmDialogConfig = CommonConfig & {
  /**
   * the dynamic component to be used as the confirmation dialog body
   */
  component: Component;

  /**
   * Confirmation or cancellation buttons if omitted default ones are set
   */
  buttons?: Array<ConfirmDialogButton>;
};

export type ConfirmDialogConfig =
  | PropertyBasedConfirmDialogConfig
  | TemplateBasedConfirmDialogConfig;

/**
 * Define a props api which dynamic template components can optionally
 * define to get access to the configuration the dynamic dialog was called with
 */
export type KdsDynamicDialogPropsAPI = KdsModalLayoutProps;
type DynamicDialogComponent = abstract new (...args: unknown[]) => {
  $props: KdsDynamicDialogPropsAPI;
};

export type DynamicDialogConfig = CommonConfig & {
  component:
    | DynamicDialogComponent
    | FunctionalComponent<KdsDynamicDialogPropsAPI>;
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
  | { type: "confirm"; value: ConfirmDialogConfig }
  | { type: "dynamic"; value: DynamicDialogConfig }
  | null
>(null);

const unwrappedPromise = ref(PromiseUtils.createUnwrappedPromise());

const resetInternalState = () => {
  isActive.value = false;
  activeModalConfig.value = null;
  unwrappedPromise.value = PromiseUtils.createUnwrappedPromise();
};

/**
 * Used to confirm the dialog result. Should only used when called via
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
 * Used to cancel the dialog result. Should only used when called via
 * `askConfirmation`
 */
const cancel = () => {
  unwrappedPromise.value.resolve({ confirmed: false });
  resetInternalState();
};

/**
 * Used to close the dialog. Should dnly used when called via
 * `showByTemplate`
 */
const close = () => {
  unwrappedPromise.value.resolve(undefined);
  resetInternalState();
};

const isTemplateBasedConfirmDialog = (
  config: ConfirmDialogConfig,
): config is TemplateBasedConfirmDialogConfig => {
  return "component" in config;
};

export const internal = {
  confirm,
  cancel,
  close,
  isTemplateBasedConfirmDialog,
};

export const useKdsDialog = () => {
  // function overload to support 2 distinct configurations
  function askConfirmation(
    config: PropertyBasedConfirmDialogConfig,
  ): Promise<ConfirmResult>;

  // function overload to support 2 distinct configurations
  function askConfirmation(
    config: TemplateBasedConfirmDialogConfig,
  ): Promise<ConfirmResult>;

  function askConfirmation(
    config: ConfirmDialogConfig,
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

  const showByTemplate = (config: DynamicDialogConfig): Promise<void> => {
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
  };
};
