# @knime/kds-components

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
