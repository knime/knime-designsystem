export type KdsInfoToggleButtonProps = {
  disabled?: boolean;
  /**
   * If set to true, the button is visible even when not focused.
   */
  hidden?: boolean;
};

/**
 * Testers
 */

// KdsInfoToggleButton supports disabled
propTypeTester<KdsInfoToggleButtonProps>({ disabled: true });
// KdsInfoToggleButton supports hidden
propTypeTester<KdsInfoToggleButtonProps>({ hidden: true });
