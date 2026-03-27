---
applyTo: "**/*.vue,**/*.ts,**/*.css"
---

# KDS Component Discovery

Use this skill to find available KNIME Design System components before building custom UI.
The `.kds/` submodule contains the full KDS source — always check it first.

## Step 1 — Update the submodule

Ensure you have the latest KDS code:

```sh
cd /workspaces/knime-hub-webapp
git submodule update --remote .kds
```

This pulls the latest from the KDS `ux-prototyping` branch.

## Step 2 — List all public exports

Read the barrel export file to see every available `Kds*` component, type, enum, and composable:

```
.kds/packages/components/src/index.ts
```

This file re-exports from category folders. If you need more detail, follow the re-exports:

- `.kds/packages/components/src/accessories/index.ts` — avatars, badges, icons, data types, etc.
- `.kds/packages/components/src/buttons/index.ts` — buttons, toggle buttons, link buttons
- `.kds/packages/components/src/forms/index.ts` — inputs, dropdowns, checkboxes, radio buttons
- `.kds/packages/components/src/layouts/index.ts` — modals, cards, empty states, inline messages
- `.kds/packages/components/src/overlays/index.ts` — popovers, menus
- `.kds/packages/components/src/util/index.ts` — dark mode, truncation, composables

## Step 3 — Search for a specific component

If you're looking for a component by function (e.g. "button", "modal", "input"):

1. Grep the exports: `grep -ri "Kds.*Button\|Kds.*Input" .kds/packages/components/src/index.ts`
2. Or search for component directories: `find .kds/packages/components/src -name "Kds*" -type d`
3. Or check the installed package exports: `grep "Kds" node_modules/@knime/kds-components/dist/index.js`

## Step 4 — Read the component source

Once you find the component, read its source to understand props, emits, and slots:

```
.kds/packages/components/src/<category>/<ComponentName>/<ComponentName>.vue
```

Key things to extract:

- `defineProps` — available props and their types/defaults
- `defineEmits` — events the component emits
- `<slot>` elements — named slots for composition
- Imported types/enums — valid prop values (sizes, variants, etc.)

## Step 5 — Look up design tokens

Token source files live in `.kds/packages/styles/src/tokens/`:

```
tokens/
  core/color.json        — core color palette
  core/font.json         — font families, weights, sizes
  core/size.json         — base size scale
  mode/light.json        — semantic color assignments (light mode)
  mode/dark.json         — semantic color assignments (dark mode)
  style/typography.json  — typography compositions
  style/size.json        — spacing and sizing tokens
  style/border.json      — border and radius tokens
  style/elevation.json   — elevation / shadow tokens
  components/global.json — component-specific tokens
```

To find a specific token, read the relevant JSON file. For example, to find surface colors: read `mode/light.json` and search for `surface`.

The **compiled CSS custom properties** are at `node_modules/@knime/kds-styles/dist/tokens/css/_variables.css`. Grep this file to find the exact CSS variable name:

```sh
grep "kds-color-surface" node_modules/@knime/kds-styles/dist/tokens/css/_variables.css
grep "kds-spacing-container" node_modules/@knime/kds-styles/dist/tokens/css/_variables.css
```

All tokens follow the pattern `--kds-{category}-{name}`.

## Step 6 — Check for icons

Available icons are SVGs in:

```
.kds/packages/styles/src/img/icons/
```

List them with: `ls .kds/packages/styles/src/img/icons/`

**Import syntax** — use the `@knime/kds-styles` package export, without `.svg` extension:

```ts
// Correct
import WorkflowIcon from "@knime/kds-styles/img/icons/workflow";
import NodeStackIcon from "@knime/kds-styles/img/icons/node-stack";

// WRONG — .svg extension breaks the package export map
import WorkflowIcon from "@knime/kds-styles/img/icons/workflow.svg";

// WRONG — legacy package
import WorkflowIcon from "@knime/styles/img/icons/workflow.svg";
```

The exported icon is a Vue component (SVG). Use directly: `<WorkflowIcon class="icon" />`

## Step 7 — Use design tokens correctly

When writing CSS, always use KDS tokens. Key patterns:

### Typography — use composite `font` tokens

```css
/* Correct — single shorthand property */
font: var(--kds-font-base-title-large-strong);

/* WRONG — do not break into separate properties */
font-size: 16px;
font-weight: 700;
line-height: 20px;
```

Search for font tokens: `grep "kds-font-base" node_modules/@knime/kds-styles/dist/tokens/css/_variables.css`

### Spacing — use `--kds-spacing-container-*`

```css
padding: var(--kds-spacing-container-1x); /* 16px */
gap: var(--kds-spacing-container-0-5x); /* 8px */
margin-bottom: var(--kds-spacing-container-0-25x); /* 4px */
```

### Elevation — use `--kds-elevation-level-*`

```css
/* Correct */
box-shadow: var(--kds-elevation-level-1);

/* WRONG — hardcoded shadow */
box-shadow: 0 2px 13px 0 rgb(130 133 134 / 10%);
```

### Colors

```css
background: var(--kds-color-surface-default);
color: var(--kds-color-text-and-icon-neutral);
```

### Border radius

```css
border-radius: var(--kds-border-radius-container-0-50x); /* 8px */
```

## Rules

- Never import from `_helper/` or `Base*` — these are internal
- Only use publicly exported components from `index.ts`
- If a component doesn't exist yet in KDS, check if the legacy `@knime/components` has an equivalent before building from scratch
- When the legacy package has a component but KDS doesn't, keep using the legacy one and override styles with KDS tokens
