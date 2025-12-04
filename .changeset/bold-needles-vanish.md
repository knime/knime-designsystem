---
"@knime/kds-components": minor
---

Improve dialog api for dynamic/programmatic dialog creation.

BREAKING CHANGE:

- KdsModal now has a `body` slot that is what before was the `default` slot. The new `default` is replacing everything so use `body` now.
- `useKdsConfirmDialog` has been renamed to `useKdsDynamicModal` and the `KdsConfirmDialog` became `KdsDynamicModalProvider`.
