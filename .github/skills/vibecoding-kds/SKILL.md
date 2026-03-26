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

### Icons

List available icons: `ls .kds/packages/styles/src/img/icons/`

Use via `<KdsIcon name="icon-name" />` (without `.svg` extension).

## Step 3 — Replace legacy code

When touching existing code, migrate legacy patterns:

| Legacy                      | KDS replacement                     |
| --------------------------- | ----------------------------------- |
| `@knime/components` imports | `@knime/kds-components` equivalents |
| `@knime/styles` imports     | `@knime/kds-styles` equivalents     |
| `--knime-*` CSS variables   | `--kds-*` tokens                    |
| `Button` component          | `KdsButton` or `KdsLinkButton`      |
| Hard-coded colors/spacing   | KDS tokens                          |
| Imported SVG icons          | `<KdsIcon name="..." />`            |

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
