import type { KdsInfoToggleButtonProps } from "../KdsInfoToggleButton/types";

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

/**
 * Testers
 */

// KdsVariableToggleButton supports inSet/outSet, error and disabled
propTypeTester<KdsVariableToggleButtonProps>({});
propTypeTester<KdsVariableToggleButtonProps>({ inSet: true });
propTypeTester<KdsVariableToggleButtonProps>({ outSet: true });
propTypeTester<KdsVariableToggleButtonProps>({ inSet: true, outSet: true });
propTypeTester<KdsVariableToggleButtonProps>({ disabled: true });
propTypeTester<KdsVariableToggleButtonProps>({ error: true });
