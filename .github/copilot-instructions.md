## Project Overview

The KNIME Design System is a Vue3 TypeScript monorepo providing design tokens, icons, and reusable components for KNIME applications. It includes 3 packages: @knime/kds-styles (tokens/icons), @knime/kds-components (Vue components), and @knime/kds-documentation (Storybook docs).

**Trust these instructions** - only search/explore if information is incomplete or contradicts your findings.

## Important commands

1. **Setup (required first time)**: `pnpm install` (takes ~7s, creates node_modules + installs packages)
2. **Build**: `pnpm build` (takes ~3s)
3. **Type check**: `pnpm type-check` (runs TypeScript type checks)
4. **Linting**: `pnpm lint` (runs ESLint + Stylelint with --fix, may show warnings about TODO comments)
5. **Linting JS**: `pnpm lint:js --fix` (runs only ESLint with --fix)
6. **Linting CSS**: `pnpm lint:css --fix` (runs only Stylelint with --fix)
7. **Testing**: `pnpm test:unit` (runs Vitest unit tests)
8. **Formatting**: `pnpm format` (runs Prettier with --write)

**ALWAYS UPDATE DOCUMENTATION AND RUN TYPE CHECKS, LINTING, UNIT TESTS AND FORMATTING AFTER EACH CHANGE!**

**Common Build Issues & Solutions:**

- Stylelint can't find CSS custom properties → Run `pnpm install` to build @knime/kds-styles first

## Project Architecture & Key Locations

### Monorepo Structure

```
documentation/    # Storybook instance
    └── .storybook/   # Storybook configuration
packages/
├── styles/           # Design tokens, icons, CSS variables
│   ├── src/tokens/   # Token definitions (input)
│   ├── dist/tokens/css/_variables.css  # Generated CSS variables (output)
│   └── dist/img/icons/ # SVG icons + def.ts manifest
└── components/       # Vue 3 components with TypeScript
    ├── src/ComponentName/ComponentName.vue # Component files
    ├── src/ComponentName/ComponentName.stories.ts # Storybook stories
    └── src/index.ts  # Component exports

```

### Design Token System

- Generated CSS variables in `packages/styles/dist/tokens/css/_variables.css` (= `@knime/kds-styles/kds-variables.css`)
- Light/dark mode support with merged tokens (`light-dark()` function)
- Icon definitions auto-generated in `packages/styles/dist/img/icons/def.ts` (= `@knime/kds-styles/img/icons/def.ts`)

## Example implementations

- Component: see `packages/components/src/Button/KdsButton.vue`
- Storybook story: see `packages/components/src/Button/KdsButton.stories.ts`

## Development Rules & Conventions

### Component Development

- All publicly exported components must be prefixed with `Kds` (e.g., `KdsButton`, `KdsIcon`)
- All publicly exported types must be prefixed with `Kds` (e.g., `KdsButtonProps`)
- All publicly exported composables must be prefixed with `useKds` (e.g., `useKdsTheme`)
- i18n is currently not planned in this repo. Hardcoded English strings are OK (e.g., labels, aria-labels, titles, helper texts).
- Use Composition API with `<script setup lang="ts">`
- Type all props with `defineProps<T>()` or `withDefaults(defineProps<T>(), {})`
- Type all emits with `defineEmits<T>()`
- Use `defineModel()` for v-model bindings - do NOT manually emit `update:modelValue` events or include `modelValue` in props
- Use `type` instead of `interface`
- Keep TypeScript types out of `.vue` files: put prop/emits/helper types into a `types.ts` (preferably next to the component), even if they are only used by that component. If types are public, export them from `packages/components/src/index.ts`. Don't export types from `.vue` files. Use globally defined [propTypeTester](../packages/components/globals.d.ts) for static type checks.
- IMPORTANT: Define component prop types in the co-located `types.ts` and reference them directly from the `.vue` file (no local/"internal" `*InternalProps` types in `.vue`). If a component needs additional values, model them as real props in `types.ts` or compute them inside the component.
- Use `<style scoped>`
- IMPORTANT: Don't use BEM! Use CSS nesting to NOT duplicate selectors.
- IMPORTANT: Don't use `:deep()` selectors. Prefer styling via dedicated wrapper elements, component props, or slots.
- Style ONLY with CSS custom properties from design tokens - never hardcode colors/spacing/typography!
- Export components and types in `packages/components/src/index.ts`
- Follow WCAG accessibility requirements
- Write all comments in English

### Icons & Components

- Use `KdsIcon` component for all icons (never inline SVGs)
- Available icons listed in `packages/styles/dist/img/icons/def.ts` (always read the whole file, it's not big)
- For links, use `KdsLinkButton` component
- Reuse existing components instead of duplicating functionality

### Storybook Stories

- Add a story file for each exported KdsComponent in the same folder as the component, named `KdsComponent.stories.ts`
- Describe the behavior of the component with important key details. Often in Figma key aspects are described in notes.
- Include Figma design URL in story parameters
- Define modelValues for all v-model bindings in stories as category "Model". Do not add model update emit function since this is already covered by the term model.
- Define all props in stories as category "Props" ordered by importance for users and similar to other stories.
- Provide arg values for all props, e.g. false for boolean and "" for string props in the same order.
- Provide stories for important prop combinations.
- ALWAYS add a story **AllCombinations**: Use `buildAllCombinationsStory()` from `test-utils/storybook`
- ALWAYS add a story **DesignComparator**: Use `buildDesignComparatorStory()` from `test-utils/storybook` with Figma URLs + node IDs. Make sure to include all variants shown in Figma. Do use the node id of the exact component usage (without potential wrapping explanations). Also include variants for different states (hover, focus, disabled) if applicable.
- ALWAYS add a story **TextOverflow**: Use `buildTextOverflowStory()` from `test-utils/storybook` and provide long text to test text overflow behavior
- ALWAYS add a story **Interaction**: Use build in play function to test important interactions (e.g., clicks, keyboard navigation). Make sure to reset the state end the end of the test to allow re-running the test in Storybook.

### Figma Integration (when implementing from Figma)

- Follow [Figma MCP Integration Rules](./instructions/figma.md).

### Testing

- Vitest for unit tests
- Test files in `src/**/__tests__/*.test.ts`
- We want to test as much as possible with Story book tests
  - story book can cover visual changes for props
  - unit tests should only cover logic that is internally hidden

### Migration documentation

- When creating a new component, ask the user if it has an equivalent one in `@knime/components`. If it does, add migration instructions to `.github/agents/wac-to-kds-migrator.md`.
