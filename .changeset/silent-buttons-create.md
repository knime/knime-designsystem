---
"@knime/kds-components": minor
---

BREAKING CHANGE: KdsEmptyState grouped button props. Previously, the component exposed multiple prefixed button props (for example `buttonVariant`, `buttonSize`, `buttonDisabled`, `buttonLeadingIcon`, `buttonTrailingIcon`, `buttonAriaLabel`, `buttonLabel`, `buttonTo`, `buttonTitle`, `buttonDestructive`, `buttonTarget`, `buttonRel`, `buttonDownload`). To migrate, replace these props with the new nested `button` prop as follows:

- `buttonVariant` → `button.variant`
- `buttonSize` → `button.size`
- `buttonDisabled` → `button.disabled`
- `buttonLeadingIcon` → `button.leadingIcon`
- `buttonTrailingIcon` → `button.trailingIcon`
- `buttonAriaLabel` → `button.ariaLabel`
- `buttonLabel` → `button.label`
- `buttonTo` → `button.to`
- `buttonTitle` → `button.title`
- `buttonDestructive` → `button.destructive`
- `buttonTarget` → `button.target`
- `buttonRel` → `button.rel`
- `buttonDownload` → `button.download`

Additionally, the helper types `PrefixedKdsButtonProps*` and `PrefixedKdsLinkButtonProps*` are no longer exported; if you relied on them, please inline the corresponding props in your own types or migrate to the new `KdsEmptyState` button prop shape.
