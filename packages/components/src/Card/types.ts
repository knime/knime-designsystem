export type KdsCardVariant = "filled" | "outlined" | "transparent";

export type KdsCardAriaProps =
  | {
      /**
       * Accessible label for the card. Use this when providing a simple text label.
       * Either ariaLabel or ariaLabelledby must be provided, but not both.
       */
      ariaLabel: string;
      /**
       * ID of an element that labels the card. Use this when the label already exists elsewhere in the DOM.
       * Either ariaLabel or ariaLabelledby must be provided, but not both.
       */
      ariaLabelledby?: never;
    }
  | {
      ariaLabel?: never;
      ariaLabelledby: string;
    };

export type KdsCardProps = {
  /**
   * The visual style of the card container
   */
  variant?: KdsCardVariant;
  /**
   * Whether the card can be selected
   */
  selectable?: boolean;
  /**
   * Whether the card is disabled. When disabled, the card cannot be clicked or focused.
   */
  disabled?: boolean;
} & KdsCardAriaProps;
