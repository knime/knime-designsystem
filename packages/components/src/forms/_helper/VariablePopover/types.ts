import type { KdsInfoToggleButtonProps } from "../InfoPopover/types.ts";

export type KdsVariableToggleButtonProps = KdsInfoToggleButtonProps & {
  /**
   * If set to true, indicates that an input flow variable is configured.
   */
  inSet?: boolean;
  /**
   * If set to true, indicates that an output flow variable is configured.
   */
  outSet?: boolean;
  /**
   * If set to true, the button indicates an error state.
   */
  error?: boolean;
};

// KdsVariableToggleButton supports variable-specific props
propTypeTester<KdsVariableToggleButtonProps>({
  inSet: true,
  outSet: true,
  error: true,
});
