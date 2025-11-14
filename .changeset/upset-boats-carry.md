---
"@knime/kds-components": minor
---

Renamed components, exported types and constants with a 'Kds' prefix.

In particular the following mapping needs to be made to update to this version:

### Components:

- Button -> KdsButton
- LinkButton -> KdsButton
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
