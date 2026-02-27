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
8. **Storybook play tests**: `pnpm test:storybook` (runs Storybook interaction tests via Vitest, takes several minutes)
9. **Formatting**: `pnpm format` (runs Prettier with --write)

**ALWAYS UPDATE DOCUMENTATION AND RUN TYPE CHECKS, LINTING, UNIT TESTS AND FORMATTING AFTER EACH CHANGE!**

In case you cannot see the terminal output, stop and ask the user to clear the terminal buffer (e.g. by closing the copilot terminal and opening a new one) and run the command again.

### Type safety note (Vue SFC templates)

- Many component props are intentionally typed as string unions (e.g. `KdsLoadingSpinner` `style` = `"onPrimary" | "onSurface"`).
- It's OK to pass these as **inline string literals** in templates.
- If an invalid literal is used, `vue-tsc` will report it and the CI checks will fail (typically via `pnpm type-check` and often also `pnpm build`).

### Template event naming note

- Vue SFC templates accept both `@update:modelValue` and `@update:model-value` for the same event.
- Our formatter may rewrite camelCase to kebab-case; this is expected and valid.

**Common Build Issues & Solutions:**

- Stylelint can't find CSS custom properties → Run `pnpm install` to build @knime/kds-styles first

### Versioning & Changesets

- Use Changesets for user-facing changes.
- While the major version is `0.x.y`, we use **minor** changesets even for breaking changes.

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
    ├── src/
    │   ├── ComponentCategory/           # Category folder (e.g., buttons/, overlays/)
    │   │   ├── KdsComponent/            # Component subfolder
    │   │   │   ├── KdsComponent.vue     # Component file
    │   │   │   ├── KdsComponent.stories.ts  # Storybook story
    │   │   │   ├── enums.ts             # Component enums (if applicable)
    │   │   │   ├── types.ts             # Component props types
    │   │   │   └── index.ts             # Component exports
    │   │   ├── enums.ts                 # Shared enums (if used by multiple components in category)
    │   │   ├── types.ts                 # Shared types (if used by multiple components in category)
    │   │   └── index.ts                 # Category exports
    │   └── index.ts                     # Component exports
```

**Note:** The package enforces exports from the root `index.ts` - only publicly exported components, types, enums, and composables can be imported by consumers. All internal/helper components (e.g., components in `_helper/` folders, `Base*` components) are hidden and cannot be imported externally.

### Design Token System

- Generated CSS variables in `packages/styles/dist/tokens/css/_variables.css` (= `@knime/kds-styles/kds-variables.css`)
- Light/dark mode support with merged tokens (`light-dark()` function)
- Icon definitions auto-generated in `packages/styles/dist/img/icons/def.ts` (= `@knime/kds-styles/img/icons/def.ts`)

## Example implementations

- Component: see `packages/components/src/buttons/KdsButton/KdsButton.vue`
- Storybook story: see `packages/components/src/buttons/KdsButton/KdsButton.stories.ts`
- Component-specific enums: see `packages/components/src/buttons/KdsToggleButton/enums.ts`
- Shared enums (category-level): see `packages/components/src/buttons/enums.ts`

## Development Rules & Conventions

### Component Development

- All publicly exported components must be prefixed with `Kds` (e.g., `KdsButton`, `KdsIcon`)
- All publicly exported types must be prefixed with `Kds` (e.g., `KdsButtonProps`)
- All publicly exported composables must be prefixed with `useKds` (e.g., `useKdsTheme`)
- i18n is currently not planned in this repo. Hardcoded English strings are OK (e.g., labels, aria-labels, titles, helper texts).
- Prefer using well-known utilities from `@vueuse/core` over custom implementations (e.g. timers via `useTimeoutFn`, debouncing/throttling via `watchDebounced` / `refDebounced`, observers via `useResizeObserver`, etc.). This improves consistency and reduces the risk of missing cleanup on unmount.
- Use Composition API with `<script setup lang="ts">`
- Type all props with `defineProps<T>()` or `withDefaults(defineProps<T>(), {})`
- Type all emits with `defineEmits<T>()`
- Use `defineModel()` for v-model bindings - do NOT manually emit `update:modelValue` events or include `modelValue` in props
- Use `type` instead of `interface`
- Keep TypeScript types out of `.vue` files: put prop/emits/helper types into a `types.ts` (preferably next to the component), even if they are only used by that component. If types are public, export them from `packages/components/src/index.ts`. Don't export types from `.vue` files. Use globally defined [propTypeTester](../packages/components/globals.d.ts) for static type checks.
- IMPORTANT: Define component prop types in the co-located `types.ts` and reference them directly from the `.vue` file (no local/"internal" `*InternalProps` types in `.vue`). If a component needs additional values, model them as real props in `types.ts` or compute them inside the component.
- Prefix style classes with `kds-` (e.g. `kds-list-item`)
- Use `<style scoped>` - do NOT use `lang="postcss"`
- IMPORTANT: Don't use BEM! Use CSS nesting to NOT duplicate selectors.
- IMPORTANT: Don't use `:deep()` selectors. Prefer styling via dedicated wrapper elements, component props, or slots.
- Style ONLY with CSS custom properties from design tokens - never hardcode colors/spacing/typography!
- Export components and types in `packages/components/src/index.ts`
- Follow WCAG accessibility requirements
- Write all comments in English
- Prefer **derived state** (`computed`) over syncing state via `watch()`.
  - If a value can be calculated from props/model/other state, make it a `computed`.
  - Avoid bidirectional "mirror" refs that need watchers to stay in sync.
  - Use `watch()` only when you need a **side effect** (DOM/IO, focusing, timers, analytics, imperative API calls) or when you must bridge to a non-reactive API.
  - For components that need both:
    - keep a small _user-driven_ ref for input (e.g. a manual selection),
    - and a `computed` "effective" value that prefers the model/props and falls back to the manual value.
- Inline single-line `computed` properties in the template for better readability.
- Inline one-line functions in the template for better readability.
- Use composable `useTemplateRef` for type safety when accessing template refs in the script. Then types will be inferred automatically.

### Enums & Constants

For constant values that represent a fixed set of options, use the enum pattern with exports split between `enums.ts` and `types.ts`:

**In `enums.ts`:**

1. **Enum object** (`kdsXxx`): A const object with uppercase keys mapping to string values
2. **Values array** (`kdsXxxs`): An array of all values via `Object.values()`

**In `types.ts`:** 3. **Type** (`KdsXxx`): A union type derived from the enum (import enum, define type)

**Example** (`enums.ts`):

```typescript
export const kdsButtonVariant = {
  FILLED: "filled",
  OUTLINED: "outlined",
  TRANSPARENT: "transparent",
} as const;

export const kdsButtonVariants = Object.values(kdsButtonVariant);
```

**Example** (`types.ts`):

```typescript
import { kdsButtonVariant } from "./enums";

export type KdsButtonVariant =
  (typeof kdsButtonVariant)[keyof typeof kdsButtonVariant];
```

### Component Folder Structure

- Each component should be in its own subfolder: `ComponentCategory/KdsComponent/`
- The subfolder contains: `KdsComponent.vue`, `KdsComponent.stories.ts`, `types.ts`, and `index.ts`
- Component-specific `enums.ts` lives in the component subfolder (if the component has enums)
- Shared types/enums used by multiple components in a category stay in the category folder (e.g., `buttons/types.ts`, `buttons/enums.ts`)

**Index file pattern:**

- Each component folder must have an `index.ts` that exports the component and types
- Parent folders re-export from subfolder index files using `export * from "./Subfolder"`

**Example** (`KdsButton/index.ts`):

```typescript
export { default as KdsButton } from "./KdsButton.vue";
export type * from "./types";
```

**Example** (`buttons/index.ts`):

```typescript
export * from "./KdsButton";
export * from "./KdsToggleButton";
// ... other button components

export { kdsButtonVariant, kdsButtonVariants } from "./enums";
export type { KdsButtonVariant } from "./types";
```

### Icons & Components

- Use `KdsIcon` component for all icons (never inline SVGs)
- Available icons listed in `packages/styles/dist/img/icons/def.ts` (always read the whole file, it's not big)
- For links, use `KdsLinkButton` component
- Reuse existing components instead of duplicating functionality

### Storybook Stories

- Add a story file for each exported KdsComponent in the same folder as the component, named `KdsComponent.stories.ts`
- Describe the behavior of the component with important key details. Often in Figma key aspects are described in notes.
- Include Figma design URL in story parameters
- Define modelValues for all v-model bindings in stories as category "model". Do not add model update emit function since this is already covered by the term model.
- Define all props in stories as category "props" ordered by importance for users and similar to other stories.
- Provide arg values for all props, e.g. false for boolean and "" for string props in the same order.
- Provide stories for important prop combinations in the same order (if possible).
- Test the desired behavior (e.g. disabled state) via storybook play function.
- Always test **both mouse and keyboard interaction** in play tests. If a component cannot be reset to its initial state after one interaction method (e.g. a radio button that cannot be unselected), test mouse in one story and keyboard in another.
- Do not allow stories witch violate accessibility rules. Rewrite the story accordingly (e.g. no label story -> use a custom label story).
- Always add the following three stories **last** (in this order):
  1. **TextOverflow** (third-to-last): Use `buildTextOverflowStory()` from `test-utils/storybook` and provide long text to test text overflow behavior.
  2. **DesignComparator** (second-to-last): Use `buildDesignComparatorStory()` from `test-utils/storybook` with Figma URLs + node IDs. Make sure to include all variants shown in Figma. Use the node id of the exact component usage (without potential wrapping explanations). Also include variants for different states (hover, focus, disabled) if applicable via `parameters: { pseudo: { hover: true } }`.
  3. **AllCombinations** (last): Use `buildAllCombinationsStory()` from `test-utils/storybook`. Also pseudo states via `pseudoStates: ('hover' | 'active' | 'focus' | 'focus-visible')[]` as variants if applicable. `hover` should be applicable to all components. `active` can only be applied to elements that perform actions like buttons. Always add some kind of focus pseudo class to test outline visibility - use `focus` instead of `focus-visible` if the component shows focus for mouse interactions (e.g. inputs). If the total number of combinations becomes too large (e.g. it would create too many Chromatic snapshots), split it into multiple stories (for example `AllCombinationsPart1` / `AllCombinationsPart2`) with smaller combination sets.
- Remove `&p=f&m=dev` from all Figma URLs

#### Storybook Play Test Auto-Waiting

Use proper auto-waiting in Storybook play tests. **Never** use manual `setTimeout`, polling loops, or `waitFor` unless absolutely necessary.

**Imports**: Use `import { expect, userEvent, within } from "storybook/test";`

**Key rules**:

- Always `await userEvent.*()` for interactions - it waits for events to complete
- `await expect(...).toBeInTheDocument()` auto-retries until the assertion passes or times out
- Use `findBy*` (async) for elements that appear **after** a state change (e.g., after a click triggers re-render)
- Use `getBy*` (sync) for elements that are **already present** in the DOM
- Always use `within(canvasElement)` to scope queries to the story canvas

**Example**:

```typescript
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Element already exists - use getBy*
  const input = canvas.getByRole("textbox", { name: "Email" });
  await userEvent.type(input, "test@example.com");

  await userEvent.click(canvas.getByRole("button", { name: "Submit" }));

  // Element appears after submit - use findBy* (auto-waits)
  const success = await canvas.findByText(/success/i);
  await expect(success).toBeInTheDocument();
};
```

**Common patterns**:

- After clicking a toggle: `await canvas.findByRole("button", { name: "New Label" })` to wait for label change
- After clearing input (clear button disappears): click the next element directly instead of relying on tab order
- To reset focus for tab navigation tests: `element.blur()` then `await userEvent.tab()`

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
