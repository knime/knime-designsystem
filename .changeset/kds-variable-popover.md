---
"@knime/kds-components": minor
---

BREAKING CHANGES: Removes modelValue from `KdsVariableToggleButton` and `KdsInfoToggleButton`. Popover is handled now internally.

Wire `KdsVariableToggleButton` to open a flow-variable popover and add internal `VariablePopover` building block.
