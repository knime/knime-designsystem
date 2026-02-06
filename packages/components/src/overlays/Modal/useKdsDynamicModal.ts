import {
  type ComponentPublicInstance,
  type FunctionalComponent,
  type VNode,
  computed,
  ref,
} from "vue";

import { promise as PromiseUtils } from "@knime/utils";

import type { KdsButtonProps } from "../../buttons";

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

type CommonConfig = Omit<KdsModalProps, "active">;

type PropertyBasedConfirmModalConfig = CommonConfig & {
  /**
   * The message displayed in the modal body
   */
  message: string;
  /**
   * The label and subText to be rendered for the "do not ask again" checkbox option.
   * The checkbox will only be present when an object is supplied. The value will be returned on the modal result.
   * Defaults to empty undefined.
   */
  doNotAskAgain?: {
    label: string;
    subText?: string;
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

type UpdateConfigType = Partial<
  Omit<KdsDynamicModalTemplateConfig, "component" | "context">
>;

/**
 * Define a props api which dynamic template components can optionally
 * define to get access to the configuration the dynamic modal was called with
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KdsDynamicModalPropsAPI<T = any> = KdsModalLayoutProps & {
  context: T;
  updateConfig: (config: UpdateConfigType) => void;
};
type DynamicModalComponent<T> = abstract new (...args: unknown[]) => {
  $props: KdsDynamicModalPropsAPI<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KdsDynamicModalTemplateConfig<T = any> = CommonConfig & {
  component:
    | DynamicModalComponent<T>
    | FunctionalComponent<KdsDynamicModalPropsAPI<T>>;
  context?: T;
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
const onClosed = () => {
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

const updateConfig = (config: UpdateConfigType) => {
  if (
    !isActive.value ||
    !activeModalConfig.value ||
    activeModalConfig.value.type === "confirm"
  ) {
    consola.warn("useKdsDynamicModal: invalid invocation of updateConfig");
    return;
  }

  activeModalConfig.value.value = {
    ...activeModalConfig.value.value,
    ...config,
  };
};

export const internal = {
  confirm,
  close,
  isTemplateBasedConfirm,
  onClosed,
  updateConfig,
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

  const showByTemplate = <T>(
    config: KdsDynamicModalTemplateConfig<T>,
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
