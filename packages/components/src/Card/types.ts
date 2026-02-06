export type KdsCardVariant = "filled" | "outlined" | "transparent";

export type KdsCardProps = {
  /**
   * The visual style of the card container
   */
  variant?: KdsCardVariant;
  /**
   * Whether the card is in a selected/value state
   */
  modelValue?: boolean;
  /**
   * A label to provide an accessible name for the card. Provide a concise description for screen readers
   */
  ariaLabel?: string;
};
