---
"@knime/kds-components": minor
---

BREAKING CHANGE: Change KdsPatternInput so its v-model keeps the visible pattern text and the compiled regex string is emitted via the `regexp` event.

Migrate v-model="regex" to @regexp="regex = $event"
