---
applyTo: "**/*.vue,**/*.ts,**/*.css"
---

# KDS Stories — Learn Component Usage from Storybook

Use this skill to read KDS component stories before using a component.
Stories are the **usage source of truth** — they show correct prop combinations, variants, slots, and rendering patterns.

## When to use

- Before using any `Kds*` component for the first time
- When unsure about available props, variants, or slot patterns
- When the component API from the source file isn't clear enough
- To find the right combination of props for a specific visual outcome

## Step 1 — Find the story file

Stories are colocated with their component source in `.kds/packages/components/src/`:

```sh
find .kds/packages/components/src -name "KdsComponentName.stories.ts"
```

Or browse by category:

- `buttons/` — KdsButton, KdsLinkButton, KdsToggleButton, KdsProgressButton
- `forms/` — inputs, checkboxes, radio buttons, dropdowns, value switches
- `accessories/` — KdsIcon, KdsAvatar, KdsBadge, KdsLoadingSpinner, KdsColorSwatch
- `layouts/` — KdsModal, KdsCardClickable, KdsEmptyState, KdsInlineMessage
- `overlays/` — KdsMenuButton, popovers

## Step 2 — Read the story file

Read the full `*.stories.ts` file. Extract these key sections:

### Meta (component setup)

Look at the `meta` object at the top for:

- `argTypes` — all controllable props, their types, and valid options
- `args` — default prop values
- `parameters.design.url` — Figma design link (if present)

### Story exports

Each named export is a usage variant. Look for:

- **Basic variants** — `Filled`, `Outlined`, `Transparent`, etc. show the main visual modes
- **State variants** — `Disabled`, `Destructive`, `Loading` show interactive states
- **Composition patterns** — stories with custom `render` functions show slot usage and complex compositions
- **All Combinations** — `buildAllCombinationsStory` generates a matrix of all prop combos

### What to extract for usage

From each story, note:

1. **Which props are set** — these are the essential props for that variant
2. **The `render` template** — if present, shows the exact Vue template to use
3. **Slot usage** — look for `<template #slotName>` in render functions
4. **Imported enums** — `kdsButtonVariants`, `kdsButtonSizes`, etc. define valid prop values

## Step 3 — Apply to your code

Use the story as a template. Example from a `KdsButton` story:

```vue
<!-- Story: Filled -->
<KdsButton variant="filled" label="Save" />

<!-- Story: IconOnly -->
<KdsButton variant="outlined" leading-icon="ai-general" aria-label="AI" />

<!-- Story: Destructive -->
<KdsButton variant="filled" destructive label="Delete" />
```

## Rules

- Stories are the canonical usage reference — prefer them over guessing props
- If a story uses enums (e.g. `kdsButtonVariants`), import and use those enums in your code too
- Stories with `render` functions show the most realistic usage — prioritize these
- `_helper/` stories exist but are for internal components — do not use those components directly
- If no story exists for a component, read the component source (`defineProps`, `defineEmits`) instead
