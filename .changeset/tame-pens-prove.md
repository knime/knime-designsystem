---
"@knime/kds-components": minor
---

BREAKING CHANGE: Change KdsPatternInput so its v-model keeps the visible pattern text and the compiled regex string is emitted via the `update:regex` event.

Migrate v-model="regex" to @update:regex="regex = $event"
