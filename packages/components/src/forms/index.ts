// Export form components
/**
 * @deprecated Internal component – do not use outside knime-designsystem.
 * This export will be removed in a future version.
 * Use the `label` prop on KDS form field components directly instead
 * (e.g. `KdsTextInput`, `KdsDropdown`, `KdsCheckboxGroup`).
 */
export { default as KdsLabel } from "./_helper/KdsLabel.vue";
/**
 * @deprecated Internal component – do not use outside knime-designsystem.
 * This export will be removed in a future version.
 * Use the `subText`, `error`, `validating`, and `preserveSubTextSpace` props
 * on KDS form field components directly instead.
 */
export { default as KdsSubText } from "./_helper/KdsSubText.vue";

// Export types for form primitives
export type {
  /**
   * @deprecated Internal type – do not use outside knime-designsystem.
   * This export will be removed in a future version.
   * Use the `label` prop on KDS form field components directly instead.
   */
  KdsLabelProps,
  /**
   * @deprecated Internal type – do not use outside knime-designsystem.
   * This export will be removed in a future version.
   * Use the `subText`, `error`, `validating`, and `preserveSubTextSpace` props
   * on KDS form field components directly instead.
   */
  KdsSubTextProps,
  KdsFormFieldExpose,
} from "./types";

export * from "./Checkbox";
export type * from "./Checkbox";

export * from "./RadioButton";
export type * from "./RadioButton";

export * from "./inputs";
export type * from "./inputs";

export * from "./selects";
export type * from "./selects";

export * from "./_helper/InfoPopover";
export type * from "./_helper/InfoPopover";

export * from "./_helper/VariablePopover";
export type * from "./_helper/VariablePopover";
