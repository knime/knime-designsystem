## Project Overview

This project is a design system, providing reusable components and styles to ensure consistency across applications.

## Tech Stack

- Vue
- TypeScript
- plain CSS in components using `<style scoped>`
- Storybook for component development and documentation
- Vitest

## Important commands

- `pnpm dev --no-open` - runs Storybook for local development
- `pnpm test:unit` - runs Vitest unit tests
- `pnpm lint` - runs linters and formatters
- `pnpm build` - builds the packages

## File Structure & Imports

- Components: `packages/components/src/ComponentName/ComponentName.vue`
- Storybook stories in `packages/components/src/ComponentName/ComponentName.stories.ts`.
- Export each component and its types in `packages/components/src/index.ts`.
- Use relative imports within `packages/components/src/`.
- Composables go in `packages/components/src/composables/`; helpers in `packages/components/src/util/`.

## Rules

- Always use Composition API and `<script setup lang="ts">`.
- Type all props and emits with `defineProps` / `withDefaults` if applicable and `defineEmits`.
- Style only with CSS custom properties from `packages/styles/dist/tokens/css/_variables.css`; never hardcode colors, spacing, or typography. Prefer shorthand CSS custom properties if available.
- For icons, use the `Icon` component. Available icon names are in `packages/styles/dist/img/icons/def.ts`.
- Avoid inline styles, and excessive logic in templates.
- Reuse existing components (e.g., buttons, inputs) instead of duplicating functionality.
- Follow WCAG requirements for accessibility

## Figma MCP Integration Rules

These rules define how to translate Figma inputs into code and must be followed for every Figma-driven change.

### Required flow (do not skip)

1. IMPORTANT! Ask the user to provide a tree of used design tokens (the user has to copy & paste via [Token Studio Tree Inspector](https://www.figma.com/community/plugin/1507929423982882409/tokens-studio-tree-inspector) plugin).
2. Run get_code first to fetch the structured representation for the exact node(s).
3. Get the exact name of the component from Figma (starting with `kds-`) and name it accordingly. Don't guess the name.
4. If the response is too large or truncated, run get_metadata to get the high‑level node map and then re‑fetch only the required node(s) with get_code.
5. Run get_screenshot for a visual reference of the node variant being implemented.
6. Only after you have both get_code and get_screenshot, download any assets needed and start implementation.
7. Translate the output (usually React + Tailwind) into this project's conventions, styles and framework. Reuse the project's color tokens, components, and typography wherever possible. Remove unnecessary wrappers and divs.
8. Match the component props to the Figma component properties as closely as possible.
9. Run Storybook, then #openSimpleBrowser `http://localhost:6006/`. Take a screenshot and visually validate against Figma for 1:1 look and behavior before marking complete.

### Implementation rules

- Treat the Figma MCP output (React + Tailwind) as a representation of design and behavior, not as final code style.
- Replace Tailwind utility classes with the project's preferred utilities/design‑system tokens when applicable.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design‑system tokens and adjust spacing or sizes minimally to match visuals.

## Example implementation of a Button component

### ExampleButton.vue

```vue
<script lang="ts">
export const variants = ["filled", "outlined", "transparent"] as const;
export type Variant = (typeof variants)[number];
</script>

<script setup lang="ts">
import { computed } from "vue";

import type { IconName } from "@knime/kds-styles/img/icons/def";

import Icon from "../Icon/Icon.vue";
import type { Size } from "../types";

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  label: string;
  icon?: IconName | null; // prop only needed if Icon is configurable in Figma component
};

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "filled",
  size: "medium",
  disabled: false,
  icon: null,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const classes = computed(() => [
  "button",
  props.size,
  { disabled: props.disabled },
]);
</script>

<template>
  <button :class="classes" @click="emit('click', $event)">
    <Icon v-if="props.icon" :name="props.icon" />
    <span class="label">{{ props.label }}</span>
  </button>
</template>

<style scoped>
.button {
  color: var(--kds-color-text-and-icon-primary-inverted);
  background-color: var(--kds-color-background-primary-bold-initial);
  border: var(--kds-border-action-transparent);

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-focus-outline-offset);
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    border: var(--kds-border-action-disabled);
  }

  & .label {
    padding: 0 var(--kds-spacing-container-0-12x);
    text-rendering: geometricprecision;
  }

  &.xsmall {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-25x);
    padding: 0 var(--kds-spacing-container-0-25x);

    font: var(--kds-font-base-interactive-xsmall-strong);
  }

  &.small {
    gap: var(--kds-spacing-container-0-12x);
    height: var(--kds-dimension-component-height-1-5x);
    padding: 0 var(--kds-spacing-container-0-37x);

    font: var(--kds-font-base-interactive-small-strong);
  }

  &.medium {
    gap: var(--kds-spacing-container-0-25x);
    height: var(--kds-dimension-component-height-1-75x);
    padding: 0 var(--kds-spacing-container-0-37x);

    font: var(--kds-font-base-interactive-medium-strong);
  }

  &.large {
    gap: var(--kds-spacing-container-0-25x);
    height: var(--kds-dimension-component-height-2-25x);
    padding: 0 var(--kds-spacing-container-0-5x);

    font: var(--kds-font-base-interactive-large-strong);

    & .label {
      padding: 0 var(--kds-spacing-container-0-25x);
    }
  }
}
</style>
```

### ExampleButton.stories.ts

```ts
import type { FunctionalComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { iconNames } from "@knime/kds-styles/img/icons/def";

import { sizes } from "../constants";
import {
  buildAllCombinationsStory,
  buildDesignComparatorStory,
} from "../testUtils/storybook";

import ExampleButton, { variants } from "./ExampleButton.vue";

const meta: Meta<typeof ExampleButton> = {
  title: "Components/Buttons/ExampleButton",
  component: ExampleButton,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=345-19622",
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: sizes,
    },
    variant: {
      control: { type: "select" },
      options: variants,
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
    icon: {
      control: { type: "select" },
      options: [undefined, ...iconNames],
    },
  },
  args: {
    onClick: fn(),
  },
};
export default meta;

type Story = StoryObj<typeof ExampleButton>;

export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Button",
  },
};

export const AllCombinations: Story = buildAllCombinationsStory({
  component: ExampleButton,
  combinationsProps: [
    {
      size: sizes,
      variant: variants,
      disabled: [false, true],
      label: ["Button"],
      icon: [undefined, "ai-general"],
    },
  ],
});

export const TruncatedLabel: Story = {
  args: {
    label: "Button with veeery loooong label",
    variant: "outlined",
    leadingIcon: "ai-general",
    trailingIcon: "ai-general",
  },
  render: (args) => ({
    components: { ExampleButton },
    setup() {
      return { args };
    },
    template: `
      <ExampleButton v-bind="args" /><br>
      Try by resizing the box!
      <div style="width: 200px; padding: 10px; background: lightgray; resize: horizontal; overflow: auto;">
        <ExampleButton v-bind="args" />
      </div>`,
  }),
};

export const DesignComparator: Story = buildDesignComparatorStory({
  component: ExampleButton,
  designsToCompare: {
    label: {
      props: {
        label: "{Label}",
        variant: "outlined",
      },
      variants: {
        // IMPORTANT: these URLs must match the node IDs of the variants in Figma and need to be set as property keys!
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89691":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89976":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90261":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90546":
          {
            size: "xsmall",
          },
      },
    },
    icon: {
      props: {
        variant: "outlined",
        icon: "placeholder",
      },
      variants: {
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-89762":
          {
            size: "large",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90047":
          {
            size: "medium",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90332":
          {
            size: "small",
          },
        "https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=3804-90617":
          {
            size: "xsmall",
          },
      },
    },
  },
});
```
