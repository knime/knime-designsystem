---
"@knime/kds-components": minor
---

BREAKING CHANGES: Remove native (UA) default styling from `KdsPopover` so it is a purely positioned container. Swapped right and left `placement` values to align with other frameworks.

- When using the `content` prop, default KDS surface styling (background, radius, shadow, padding) is applied automatically.
- When using the default slot, no styling is applied - wrap your content with your own styled container.
- The `placement` prop values for right and left are swapped to be more intuitive. For example, old `bottom-right` becomes `bottom-left` and old `bottom-left` becomes `bottom-right`.
