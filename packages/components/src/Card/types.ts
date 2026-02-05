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
};
