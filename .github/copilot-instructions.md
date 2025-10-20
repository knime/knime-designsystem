## Project Overview

This project is a design system, providing reusable components and styles to ensure consistency across applications.

## Tech Stack

- Vue
- TypeScript
- plain CSS in components using `<style scoped>`
- Storybook for component development and documentation
- Vitest (only for utils, no testing of Vue components)

## Important commands

- `pnpm dev --no-open` - runs Storybook for local development
- `pnpm test:unit` - runs Vitest unit tests
- `pnpm lint` - runs linters and formatters
- `pnpm build` - builds the packages

## File Structure & Imports

- Components: `packages/components/src/ComponentName/ComponentName.vue`
- Storybook stories: `packages/components/src/ComponentName/ComponentName.stories.ts`
- Export each component and its types in `packages/components/src/index.ts`
- Use relative imports within `packages/components/src/`
- Composables in `packages/components/src/composables/`
- Helpers in `packages/components/src/util/`

## Rules

- when implementing components based on Figma designs, follow the [Figma MCP Integration Rules](./instructions/figma.md).
- Always use Composition API and `<script setup lang="ts">`.
- Type all props and emits with `defineProps` / `withDefaults` if applicable and `defineEmits`.
- Style only with CSS custom properties from `packages/styles/dist/tokens/css/_variables.css`; IMPORTANT: never hardcode colors, spacing, or typography!
- Use CSS nesting to not repeat selectors.
- Reuse existing components instead of duplicating functionality.
- For icons, use the `Icon` component. Available icon names are in `packages/styles/dist/img/icons/def.ts`.
- For links, use the `LinkButton` component.
- Avoid inline styles and excessive logic in templates.
- Follow WCAG requirements for accessibility

## Example implementations

- Component: see `packages/components/src/Button/Button.vue`
- Storybook story: see `packages/components/src/Button/Button.stories.ts`
