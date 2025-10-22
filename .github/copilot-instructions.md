## Project Overview

The KNIME Design System is a Vue3 TypeScript monorepo providing design tokens, icons, and reusable components for KNIME applications. It includes 3 packages: @knime/kds-styles (tokens/icons), @knime/kds-components (Vue components), and @knime/kds-documentation (Storybook docs).

## Important commands

1. **Setup (required first time)**: `pnpm install` (takes ~7s, creates node_modules + installs packages)
2. **Build**: `pnpm build` (takes ~3s)
3. **Development**: `pnpm dev --no-open` (starts Storybook at http://localhost:6006, takes ~200ms)
4. **Testing**: `pnpm test:unit` (press 'q' to quit watch mode)
5. **Linting**: `pnpm lint` (runs ESLint + Stylelint with --fix, may show warnings about TODO comments and prop defaults)

**Common Build Issues & Solutions:**

- Stylelint can't find CSS custom properties → Run `pnpm i` to build @knime/kds-styles first
- Storybook compatibility warnings about @storybook/types@8.6.14 vs 9.1.7 are expected

## Project Architecture & Key Locations

**Monorepo Structure:**

```
packages/
├── styles/           # Design tokens, icons, CSS variables
│   ├── src/tokens/   # Token definitions (input)
│   ├── dist/tokens/css/_variables.css  # Generated CSS variables (output)
│   └── dist/img/icons/ # SVG icons + def.ts manifest
├── components/       # Vue 3 components with TypeScript
│   ├── src/ComponentName/ComponentName.vue # Component files
│   ├── src/ComponentName/ComponentName.stories.ts # Storybook stories
│   └── src/index.ts  # Component exports
└── documentation/    # Storybook instance
    └── .storybook/   # Storybook configuration
```

**Design Token System:**

- Generated CSS variables in `packages/styles/dist/tokens/css/_variables.css`
- Light/dark mode support with merged tokens (`light-dark()` function)
- Icon definitions auto-generated in `packages/styles/dist/img/icons/def.ts`

## Example implementations

- Component: see `packages/components/src/Button/Button.vue`
- Storybook story: see `packages/components/src/Button/Button.stories.ts`

## Development Rules & Conventions

**Component Development:**

- Use Composition API with `<script setup lang="ts">`
- Type all props with `defineProps<T>()` or `withDefaults(defineProps<T>(), {})`
- Type all emits with `defineEmits<T>()`
- Use `<style scoped>`
- IMPORTANT: Use CSS nesting to NOT duplicate selectors! Don't use BEM.
- Style ONLY with CSS custom properties from design tokens - never hardcode colors/spacing/typography!
- Export components and types in `packages/components/src/index.ts`
- Follow WCAG accessibility requirements

**Icons & Components:**

- Use `Icon` component for all icons (never inline SVGs)
- Available icons listed in `packages/styles/dist/img/icons/def.ts` (do always read the whole file, it's not big)
- For links, use `LinkButton` component
- Reuse existing components instead of duplicating functionality

**Storybook Stories (required for all components):**

1. **AllCombinations**: Use `buildAllCombinationsStory()` from `testUtils/storybook`
2. **DesignComparator**: Use `buildDesignComparatorStory()` from `testUtils/storybook` with Figma URLs + node IDs. Make sure to include all variants shown in Figma. Do use the node id of the exact component usage (without potential wrapping explainations).
3. **TextOverflow**: Use `buildTextOverflowStory()` from `testUtils/storybook` and provide long text to test text overflow behavior
4. Include Figma design URL in story parameters

**Figma Integration (when implementing from Figma):**

- Follow [Figma MCP Integration Rules](./instructions/figma.md).

**Testing:**

- Vitest for unit tests
- Test files in `src/**/__tests__/*.test.ts`

**Trust these instructions** - only search/explore if information is incomplete or contradicts your findings.
