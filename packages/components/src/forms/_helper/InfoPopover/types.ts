export type KdsInfoToggleButtonProps = {
  /**
   * Content to display inside the info popover. Used when no default slot is provided.
   */
  content?: string;
  /**
   * If set to true, the button is disabled and cannot be interacted with.
   */
  disabled?: boolean;
  /**
   * If set to true, the button is hidden when not focused or hovered.
   */
  hidden?: boolean;
};

// KdsInfoToggleButton supports disabled and hidden
propTypeTester<KdsInfoToggleButtonProps>({ disabled: true });
propTypeTester<KdsInfoToggleButtonProps>({ hidden: true });
