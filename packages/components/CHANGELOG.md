# @knime/kds-components

## 0.5.10

### Patch Changes

- 382c8d0: Remove undefined from RadioButtonGroup and ValueSwitch model emissions
  - @knime/kds-styles@0.5.10

## 0.5.9

### Patch Changes

- a49aa87: Fix border for KdsValueSwitch
- Updated dependencies [a49aa87]
  - @knime/kds-styles@0.5.9

## 0.5.8

### Patch Changes

- Updated dependencies [904359b]
  - @knime/kds-styles@0.5.8

## 0.5.7

### Patch Changes

- 1bf37b9: Add KdsValueSwitch component
  - @knime/kds-styles@0.5.7

## 0.5.6

### Patch Changes

- ca85c24: KDS-659: change kds modal body from grid to flex to avoid safari always full height bug
- Updated dependencies [80de341]
- Updated dependencies [eccfa4f]
  - @knime/kds-styles@0.5.6

## 0.5.5

### Patch Changes

- c81ec62: Use default cursor for disabled states
- c69baf5: Add KdsRadioButton and KdsRadioButtonGroup components
  - @knime/kds-styles@0.5.5

## 0.5.4

### Patch Changes

- cea2454: KDS-433: loading spinner add missing export
  - @knime/kds-styles@0.5.4

## 0.5.3

### Patch Changes

- b18e89a: KDS-433: add LoadingSpinner
- Updated dependencies [b54fab7]
  - @knime/kds-styles@0.5.3

## 0.5.2

### Patch Changes

- 345ee08: Require aria-labels for icon only buttons, add title as optional prop
  - @knime/kds-styles@0.5.2

## 0.5.1

### Patch Changes

- fc72a47: Extend KdsModal API
  - add overflow prop to KdsModal
  - changed name of variant from default to padded
  - allow update configuration from within a component passed to showByTemplate()
  - add a context prop to config to send external data to the component rendered by showByTemplate()
  - @knime/kds-styles@0.5.1

## 0.5.0

### Minor Changes

- 2224c3e: KDS-545: Add KdsToggleButton

### Patch Changes

- @knime/kds-styles@0.5.0

## 0.4.2

### Patch Changes

- 80eb6aa: NXT-4191: KdsModal: use font-base-body-small instead of medium
  - @knime/kds-styles@0.4.2

## 0.4.1

### Patch Changes

- 8a22ca1: Add show and hide animations to KdsModal
  - @knime/kds-styles@0.4.1

## 0.4.0

### Patch Changes

- Updated dependencies [5bed877]
  - @knime/kds-styles@0.4.0

## 0.3.2

### Patch Changes

- 437a201: fix build output missing types for useKdsDynamicModal
  - @knime/kds-styles@0.3.2

## 0.3.1

### Patch Changes

- 9d430e5: KdsCheckbox: improve types by removing `generic="UNUSED"` as it caused issues with e.g. vue-test-utils
  - @knime/kds-styles@0.3.1

## 0.3.0

### Minor Changes

- 02bba28: Improve dialog api for dynamic/programmatic dialog creation.

  BREAKING CHANGE:
  - KdsModal now has a `body` slot that is what before was the `default` slot. The new `default` is replacing everything so use `body` now.
  - `useKdsConfirmDialog` has been renamed to `useKdsDynamicModal` and the `KdsConfirmDialog` became `KdsDynamicModalProvider`.

### Patch Changes

- @knime/kds-styles@0.3.0

## 0.2.1

### Patch Changes

- a9d7db4: KdsModal: fix double close event
  - @knime/kds-styles@0.2.1

## 0.2.0

### Minor Changes

- f5d429e: Add KdsModal components.

### Patch Changes

- @knime/kds-styles@0.2.0

## 0.1.1

### Patch Changes

- Updated dependencies [e381c07]
  - @knime/kds-styles@0.1.1

## 0.1.0

### Minor Changes

- 7531e8d: Renamed components, exported types and constants with a 'Kds' prefix.

  In particular the following mapping needs to be made to update to this version:

  ### Components:
  - Button -> KdsButton
  - LinkButton -> KdsLinkButton
  - Checkbox -> KdsCheckbox
  - Icon -> KdsIcon
  - DataType -> KdsDataType

  ### Utils:
  - useDarkMode -> useKdsDarkMode
  - useLegacyMode -> useKdsLegacyMode

  ### Constants:
  - sizes -> kdsSizes
  - buttonVariants -> kdsButtonVariants
  - iconSizes -> kdsIconSizes
  - dataTypeSizes -> kdsDataTypeSizes
  - iconNames -> kdsIconNames
  - typeIconNames -> kdsTypeIconNames
  - DARK_MODE_STORAGE_KEY -> KDS_DARK_MODE_STORAGE_KEY

  ### Types:
  - Size -> KdsSize
  - ButtonVariant -> KdsButtonVariant
  - ButtonProps -> KdsButtonProps
  - LinkButtonProps -> KdsLinkButtonProps
  - CheckboxProps -> KdsCheckboxProps
  - IconSize -> KdsIconSize
  - DataTypeSize -> KdsDataTypeSize
  - IconName -> KdsIconName
  - TypeIconName -> KdsTypeIconName
  - DarkModeType -> KdsDarkModeType

### Patch Changes

- @knime/kds-styles@0.1.0

## 0.0.16

### Patch Changes

- Updated dependencies [f43d7c8]
  - @knime/kds-styles@0.0.16

## 0.0.15

### Patch Changes

- Updated dependencies [6273d5e]
  - @knime/kds-styles@0.0.15

## 0.0.14

### Patch Changes

- 515b814: Add Checkbox component
- Updated dependencies [8469844]
  - @knime/kds-styles@0.0.14

## 0.0.13

### Patch Changes

- Updated dependencies [a277ce1]
  - @knime/kds-styles@0.0.13

## 0.0.12

### Patch Changes

- Updated dependencies [3c052ec]
  - @knime/kds-styles@0.0.12

## 0.0.11

### Patch Changes

- Updated dependencies [9575244]
  - @knime/kds-styles@0.0.11

## 0.0.10

### Patch Changes

- 16dfcf7: Improve button component API:
  - Remove `icon` prop in favor of `leadingIcon`. Makes prop combinations of Button
    easier to reason about.

- Updated dependencies [91a23d0]
  - @knime/kds-styles@0.0.10

## 0.0.9

### Patch Changes

- 6dff857: Improved tokens
- Updated dependencies [6dff857]
  - @knime/kds-styles@0.0.9
