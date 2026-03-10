## AI-assisted development / vibecoding guidelines

These rules help Copilot and other coding agents generate UI that correctly uses the KNIME Design System.

### Source priority

1. **Code** — the repository's public exports (`packages/components/src/index.ts`) are the implementation source of truth.
2. **Stories** — colocated `*.stories.ts` files are the usage source of truth.
3. **Figma MCP** — use only when code + stories are insufficient. See [Figma integration rules](./figma.md).

### Component discovery

- Check `packages/components/src/index.ts` for every publicly available `Kds*` component, type, enum, and composable.
- Browse the colocated `*.stories.ts` file for canonical usage examples and prop combinations.
- Available design tokens (CSS custom properties) are in `packages/styles/dist/tokens/css/_variables.css`.
- Available icons are listed in `packages/styles/dist/img/icons/def.ts`.

### Rules

- Prefer existing `Kds*` components over custom UI — always check what is exported before creating new markup.
- Do not import internal helpers (`_helper/` folders) or `Base*` components; they are not part of the public API.
- If component usage is unclear, inspect the nearest `*.stories.ts` file before guessing.
- If a design is referenced from Figma, map it to existing KDS components instead of recreating markup.
- Style only with CSS custom properties from design tokens — never hard-code colors, spacing, or typography values.
- Do not implement pixel-perfect UI directly from Figma when an equivalent KDS component already exists.

### Goal

Make the design system easy for both humans and AI agents to consume while preserving stable component APIs.
