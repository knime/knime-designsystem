---
applyTo: "**/*.vue,**/*.ts,**/*.css"
---

# Figma MCP — Inspecting & Implementing Designs

Use this skill when the user provides a Figma link or asks you to implement a design from Figma. Requires the Figma MCP server to be running — if `mcp_figma_get_figma_data` is not available, load the **figma-setup** skill first.

## Extracting file key and node ID from URLs

Figma URLs contain a file key and node ID:

- `https://www.figma.com/design/ABC123/File-Name?node-id=12-34` → file `ABC123`, node `12-34`
- `https://www.figma.com/file/ABC123/File-Name?node-id=12%3A34` → file `ABC123`, node `12:34` (URL-encoded)

Pass the extracted `fileKey` and `nodeId` to MCP tool calls.

## Step 1 — Inspect the Figma design

1. **Fetch node data.** Call `mcp_figma_get_figma_data` with `depth: 3` first. If the target node is deeply nested, increase depth or re-fetch a specific child node.
2. **Download screenshot.** Call `mcp_figma_download_figma_images` for a visual reference. Use `pngScale: 2` for retina clarity.
3. **Identify components.** Look at component names in the metadata:
   - Names starting with `Kds` → design system component. Check availability with the **kds-component-discovery** skill.
   - Other names → implement locally.

## Step 2 — Extract and validate design tokens

The MCP response contains `globalVars.styles` with raw values (colors, fonts, layouts). **Do not use raw hex/px values directly.** Instead, map them to KDS tokens.

### Mapping Figma values to KDS tokens

Search the compiled token file to find the right token:

```bash
grep "<value-or-keyword>" node_modules/@knime/kds-styles/dist/tokens/css/_variables.css
```

Common mappings from Figma raw values:

| Figma value                       | What to search                | KDS token pattern                                   |
| --------------------------------- | ----------------------------- | --------------------------------------------------- |
| `#282828` / dark bg               | `color-surface-default`       | `--kds-color-surface-default`                       |
| `#F0F0F0` / light text on dark    | `color-text-and-icon-neutral` | `--kds-color-text-and-icon-neutral`                 |
| `Roboto 400 14px`                 | `font-base-body-medium`       | `--kds-font-base-body-medium`                       |
| `Roboto 500 14px`                 | `font-base-title-medium`      | `--kds-font-base-title-medium`                      |
| `1px solid rgba(252,252,252,0.2)` | `border-base-muted`           | `--kds-border-base-muted`                           |
| `16×16 icon`                      | `dimension-icon-1x`           | `--kds-dimension-icon-1x` (KdsIcon `size="medium"`) |
| icon stroke ~1.25px               | `border-width-icon-stroke-m`  | `--kds-border-width-icon-stroke-m`                  |

### Token naming conventions

If the user provides Token Studio tokens (from the Tree Inspector plugin), convert directly:

- `kds.spacing.container.0_25x` → `--kds-spacing-container-0-25x`
- `kds.color.background.primary` → `--kds-color-background-primary`
- Rule: dots → dashes, underscores in numbers → dashes.

### Validation

Before using a token, verify it exists:

```bash
grep "token-name" node_modules/@knime/kds-styles/dist/tokens/css/_variables.css
```

If the token doesn't exist, search for alternatives. **Never invent token names.**

### Token source files

For deeper exploration, tokens are defined as JSON in `.kds/packages/styles/src/tokens/`:

| Category                                | Source file                               |
| --------------------------------------- | ----------------------------------------- |
| Colors (surfaces, text, backgrounds)    | `mode/light.json`, `mode/dark.json`       |
| Core color palette                      | `core/color.json`                         |
| Typography (fonts, sizes, line-heights) | `style/typography.json`, `core/font.json` |
| Spacing & sizing                        | `style/size.json`, `core/size.json`       |
| Borders & radii                         | `style/border.json`                       |
| Elevation / shadows                     | `style/elevation.json`                    |
| Component-specific tokens               | `components/global.json`                  |

## Step 3 — Ask for user-provided tokens (optional)

If precision is critical, ask the user to provide a token tree via the [Token Studio Tree Inspector](https://www.figma.com/community/plugin/1507929423982882409/tokens-studio-tree-inspector) plugin. These map 1:1 to CSS variables and are the most reliable source.

## Step 4 — Implement

Only after you have the node data, screenshot, and validated tokens:

1. **Translate.** The MCP output is React + Tailwind — convert to the project's conventions (Vue 3 Composition API, KDS tokens, scoped CSS). Remove unnecessary wrappers.
2. **Use KDS font shorthands.** Always use composite `font` tokens (e.g. `font: var(--kds-font-base-body-medium)`) instead of separate `font-size`/`font-weight`/`line-height`.
3. **Match icons precisely.** Icon names in Figma components map to filenames in `.kds/packages/styles/src/img/icons/`. Verify the icon exists before using it.
4. **Border + padding adjustment.** If an element has both a border and padding: `padding: calc(var({{token}}) - var(--kds-core-border-width-xs))`.
5. **Match props.** Map Figma component properties to Vue component props.
6. **Strive for 1:1 visual parity** with the Figma design. When conflicts arise, prefer KDS tokens.

### Implementation rules

- Never hard-code colors, spacing, or typography — always use `--kds-*` tokens.
- Treat the Figma MCP output as a structural/behavioral reference, not final code.
- Replace Tailwind utility classes with KDS tokens.

## Implementation of missing `Kds*` components

Follow the steps above and additionally:

1. Implement the component in `knime-designsystem/packages/components`.
2. Add Storybook stories. All variants shown in Figma need their Figma link (with node ID).
3. Don't add a unit test yet.
4. Run lint and fix issues.
5. ONLY AFTER lint passes, run Storybook and open it with `#openSimpleBrowser`.
6. Ask the user to open the "Design Comparator" story for visual verification.
7. If not matching, iterate — always stick to the validated tokens.
8. Ask the user if everything is fine before writing unit tests.
