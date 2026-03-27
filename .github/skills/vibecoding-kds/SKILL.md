---
applyTo: "**/*.vue,**/*.ts,**/*.css"
---

# Vibecoding with KDS — UI Changes on knime-hub-webapp

Use this skill when adding, changing, or restyling any UI element in the webapp.
Every visual change must go through the KNIME Design System (KDS) first.

## Step 1 — Identify what to change

Determine the component or area to modify. If the user selected a component via the prompt bridge picker, the context will include:

- Component name and file path
- Component chain (parent hierarchy)
- Props, emits, and slots

Use this to locate the exact source file. If no picker context is provided, search by component name or page path.

## Step 2 — Discover KDS components

Before writing any custom markup, check what KDS already provides. Use the **kds-component-discovery** skill:

1. Ensure the `.kds/` submodule is up to date (`git submodule update --remote .kds`)
2. Read `.kds/packages/components/src/index.ts` to find all public `Kds*` exports
3. If a matching component exists, use the **kds-stories** skill to read its story for usage examples

### Design tokens

Tokens are defined as JSON in `.kds/packages/styles/src/tokens/`. Look up the right token by category:

| What you need                           | Source file in `.kds/packages/styles/src/tokens/` |
| --------------------------------------- | ------------------------------------------------- |
| Colors (surfaces, text, backgrounds)    | `mode/light.json` (or `mode/dark.json`)           |
| Core color palette                      | `core/color.json`                                 |
| Typography (fonts, sizes, line-heights) | `style/typography.json` and `core/font.json`      |
| Spacing & sizing                        | `style/size.json` and `core/size.json`            |
| Borders & radii                         | `style/border.json`                               |
| Elevation / shadows                     | `style/elevation.json`                            |
| Component-specific tokens               | `components/global.json`                          |

The compiled CSS custom properties are in `node_modules/@knime/kds-styles/dist/tokens/css/_variables.css`. Use `grep` to search for tokens by name (e.g. `grep "kds-color-surface" _variables.css`).

All tokens follow the pattern `--kds-{category}-{name}`. Never hard-code colors, spacing, or typography — always use a `--kds-*` token.

#### Typography — use shorthand `font` tokens

KDS provides composite `font` tokens that set weight, size, line-height, and family in one property. **Always prefer these over separate `font-size`/`font-weight`/`line-height` declarations.**

Search available font tokens:

```sh
grep "kds-font-base" node_modules/@knime/kds-styles/dist/tokens/css/_variables.css
```

Common font tokens and their values:

| Token                                       | Use for                         |
| ------------------------------------------- | ------------------------------- |
| `--kds-font-base-display-small`             | Page headings (700 20px/1.3)    |
| `--kds-font-base-display-medium`            | Section headings (700 24px/1.3) |
| `--kds-font-base-title-large-strong`        | Card titles (700 16px/1.3)      |
| `--kds-font-base-title-medium`              | Subtitles (500 14px/1.3)        |
| `--kds-font-base-body-medium`               | Body text (400 14px/1.5)        |
| `--kds-font-base-body-small`                | Secondary text (400 12px/1.5)   |
| `--kds-font-base-subtext-medium`            | Captions (400 12px/1.3)         |
| `--kds-font-base-interactive-medium-strong` | Button labels (500 14px/1.3)    |

Usage: `font: var(--kds-font-base-title-large-strong);` — do NOT break into separate properties.

#### Spacing — use container tokens

All spacing (padding, margin, gap) must use `--kds-spacing-container-*` tokens:

| Token                           | Value |
| ------------------------------- | ----- |
| `--kds-spacing-container-0-25x` | 4px   |
| `--kds-spacing-container-0-5x`  | 8px   |
| `--kds-spacing-container-0-75x` | 12px  |
| `--kds-spacing-container-1x`    | 16px  |
| `--kds-spacing-container-1-5x`  | 24px  |
| `--kds-spacing-container-2x`    | 32px  |

Prefer `gap` over individual margins for flex/grid layouts.

#### Elevation — use level tokens

Replace all custom `box-shadow` with KDS elevation:

| Token                     | Use for                 |
| ------------------------- | ----------------------- |
| `--kds-elevation-level-0` | Flat / no shadow        |
| `--kds-elevation-level-1` | Cards, subtle elevation |
| `--kds-elevation-level-3` | Hover states, overlays  |

#### Colors — surface and text

| Token                               | Use for                    |
| ----------------------------------- | -------------------------- |
| `--kds-color-surface-default`       | Card/page backgrounds      |
| `--kds-color-surface-muted`         | Secondary backgrounds      |
| `--kds-color-surface-subtle`        | Tertiary/disabled areas    |
| `--kds-color-text-and-icon-neutral` | Primary text               |
| `--kds-color-text-and-icon-muted`   | Secondary/description text |
| `--kds-color-text-and-icon-subtle`  | Tertiary/icon text         |

#### Border radius

| Token                                 | Value  |
| ------------------------------------- | ------ |
| `--kds-border-radius-container-0-25x` | 4px    |
| `--kds-border-radius-container-0-50x` | 8px    |
| `--kds-border-radius-container-1x`    | 16px   |
| `--kds-border-radius-container-pill`  | 1000px |

### Icons

KDS icons are SVGs in `.kds/packages/styles/src/img/icons/`. List them:

```sh
ls .kds/packages/styles/src/img/icons/
```

**Import syntax** — use the `@knime/kds-styles` package export (NOT the `.kds/` submodule path):

```ts
// Correct — package export, NO .svg extension
import WorkflowIcon from "@knime/kds-styles/img/icons/workflow";
import NodeStackIcon from "@knime/kds-styles/img/icons/node-stack";

// WRONG — do not add .svg extension (the package export map appends it)
import WorkflowIcon from "@knime/kds-styles/img/icons/workflow.svg";

// WRONG — legacy package, do not use for new code
import WorkflowIcon from "@knime/styles/img/icons/workflow.svg";
```

The imported icon is a Vue component (SVG). Use it directly: `<WorkflowIcon class="my-icon" />`

## Step 3 — Replace legacy code

When touching existing code, migrate legacy patterns:

| Legacy                                           | KDS replacement                                                 |
| ------------------------------------------------ | --------------------------------------------------------------- |
| `@knime/components` imports                      | `@knime/kds-components` equivalents                             |
| `@knime/styles` imports                          | `@knime/kds-styles` equivalents                                 |
| `@knime/styles/img/icons/foo.svg`                | `@knime/kds-styles/img/icons/foo` (no `.svg` extension)         |
| `--knime-*` CSS variables                        | `--kds-*` tokens                                                |
| `Button` component                               | `KdsButton` or `KdsLinkButton`                                  |
| Hard-coded `box-shadow`                          | `--kds-elevation-level-*` tokens                                |
| Hard-coded colors/spacing                        | `--kds-color-*` / `--kds-spacing-container-*` tokens            |
| Separate `font-size`/`font-weight`/`line-height` | `font: var(--kds-font-base-*)` shorthand token                  |
| Imported SVG icons from `@knime/styles`          | Import from `@knime/kds-styles/img/icons/<name>` (no extension) |

Legacy packages (`@knime/components`, `@knime/styles`) are still present but must NOT be used for new code. When a legacy component has no KDS equivalent (e.g. `NavMenu`, `SubMenu`), keep using it but override its styles with KDS tokens.

## Step 4 — Implement the change

Follow these conventions:

- Use `<script setup lang="ts">` with Composition API
- Use `<style scoped>` — do NOT add `lang="postcss"` unless the file already uses it
- Use `type` instead of `interface` for TypeScript
- Use `computed` over `watch()` for derived state
- Style ONLY with KDS CSS custom properties — never hard-code colors, spacing, or typography
- Prefer semantic HTML elements (`nav`, `main`, `section`, `header`) over generic `div`
- Do NOT write or fix tests (prototyping branch)

## Step 5 — Verify

- Check for compile errors in the modified file
- Visually verify the change in the running dev server
- If the component has stories in `.kds/`, check consistency with canonical examples

## Rules summary

1. Always use the **kds-component-discovery** skill to check KDS exports before creating custom markup
2. Always use KDS tokens for styling — no hard-coded values
3. Never import `_helper/` or `Base*` internals from KDS
4. When modifying existing legacy code, migrate to KDS equivalents
5. Use the **kds-stories** skill to read canonical usage examples before guessing props
6. If Figma context is provided, map to existing KDS components first
7. **Use `<KdsIcon>` for all icons** — never use raw SVG imports via `<Component :is>`. KdsIcon uses `currentColor` so icons automatically adapt to dark/light mode via KDS color tokens. Pass the icon name as a string: `<KdsIcon name="space" size="small" />`. Find available names with `ls .kds/packages/styles/src/img/icons/`.
8. **Everything must be tokenized for dark/light mode** — all colors, backgrounds, borders, and icon colors must use `--kds-*` tokens. Hard-coded hex values (e.g. `#000`, `stroke="#000"`) will break in dark mode because they don't respond to the color scheme. If a value doesn't come from a `--kds-*` token, it won't switch between light and dark.
