import type { KdsIconName } from "../../../Icon/types";

export type BaseDropdownTextColor = "neutral" | "subtle" | "danger";

export type BaseDropdownProps = {
  /** ID for the trigger element. If not provided, a unique ID will be generated. */
  id?: string;
  /** Placeholder shown when modelValue is empty. */
  placeholder?: string;
  /** Whether the dropdown trigger is disabled. */
  disabled?: boolean;
  /** Whether the dropdown is in an error state (also makes the text red). */
  error?: boolean;
  /** Controls whether the popover is open. */
  open?: boolean;
  /** Optional icon shown at the end of the trigger. */
  trailingIcon?: KdsIconName;
  /** Text color for the trigger value. If error is true, danger is used. */
  textColor?: BaseDropdownTextColor;

  /** Accessible label for the trigger (for aria-label). */
  ariaLabel?: string;
  /** ID of element that labels this trigger (for aria-labelledby). */
  ariaLabelledby?: string;
  /** ID of element that describes this trigger (for aria-describedby). */
  ariaDescribedby?: string;

  /** Role of the trigger element (e.g. "combobox"). */
  role?: string;
  /** aria-haspopup value (e.g. "listbox"). */
  ariaHaspopup?:
    | "dialog"
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | boolean
    | "true"
    | "false";
  /** aria-controls target ID (e.g. listbox ID). */
  ariaControls?: string;
  /** aria-activedescendant target ID (e.g. active option ID). */
  ariaActivedescendant?: string;
  /** aria-autocomplete value (e.g. "list"). */
  ariaAutocomplete?: "none" | "inline" | "list" | "both";
};

export type BaseDropdownEmits = {
  /** Native popover toggle event forwarded from the popover element. */
  toggle: [event: Event];
  /** v-model support for the open state. */
  "update:open": [open: boolean];

  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  keydown: [event: KeyboardEvent];
  click: [event: MouseEvent];
};
