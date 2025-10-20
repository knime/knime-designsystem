import type { Component } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import DesignComparator, {
  type DesignsToCompare,
} from "./DesignComparator.vue";

/**
 * Generate all combinations of the provided props by providing an array of possible values for each prop, e.g.:
 *
 * @example
 * generateCombinations({
 *   disabled: [false, true],
 *   destructive: [false, true],
 *   label: ["Button", undefined]
 * })
 */

export function generateCombinations(
  props: Record<string, readonly unknown[]>,
): Record<string, unknown>[] {
  const keys = Object.keys(props);

  function helper(
    index: number,
    acc: Record<string, unknown>,
  ): Record<string, unknown>[] {
    if (index === keys.length) {
      return [acc];
    }
    const key = keys[index];
    return props[key].flatMap((value) =>
      helper(index + 1, { ...acc, [key]: value }),
    );
  }

  return helper(0, {});
}

type AllCombinationsStoryParams = {
  component: Component;
  combinationsProps: Record<string, readonly unknown[]>[]; // or can we infer the possible props from the component type?
};

/**
 * 
 * @example
  export const AllCombinations: Story = buildAllCombinationsStory({
    component: Button,
    combinationsProps: [
      {
        disabled: [false, true],
        label: ["Button"],
        leadingIcon: [undefined, "ai-general"],
      },
      {
        disabled: [false, true],
        icon: ["ai-general"],
      },
    ],
  });
 */
export function buildAllCombinationsStory(
  config: AllCombinationsStoryParams,
): StoryObj {
  const allCombinations: Record<string, unknown>[] = [];
  config.combinationsProps.forEach((props) => {
    allCombinations.push(...generateCombinations(props));
  });

  return {
    parameters: {
      controls: { disable: true },
    },
    render: () => ({
      setup() {
        return { allCombinations, component: config.component };
      },
      template: `
      Hover to see the props of each instance:
      <div style="display: grid; grid-template-columns: repeat(4, auto); gap: 1rem;">
        <div v-for="(props, index) in allCombinations" :key="index">
          <span style="font-size: 10px; color: var(--kds-color-text-and-icon-subtle);">{{ index }}</span> 
          <Component :is="component" v-bind="props" :title="JSON.stringify(props, null, 2)" />
        </div>
      </div>
    `,
    }),
  };
}

type DesignComparatorParams = {
  component: Component;
  designsToCompare: DesignsToCompare; // or can we infer the possible props from the component type?
};

/**
 * Builds a Storybook story that compares a component against its Figma designs.
 * 
 * @example
  export const DesignComparator = buildDesignComparator({
    component: Button,
    designsToCompare: {
      "With Icon": {
        props: {
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
        },
      },
    },
  });
 */
export function buildDesignComparatorStory(
  config: DesignComparatorParams,
): StoryObj {
  return {
    parameters: {
      a11y: { disable: true },
      controls: { disable: true },
      actions: { disable: true },
      chromatic: { disableSnapshot: true },
    },
    render: () => ({
      components: {
        DesignComparator,
      },
      setup() {
        return {
          designsToCompare: config.designsToCompare,
          component: config.component,
        };
      },
      template: `
        <DesignComparator :designs-to-compare="designsToCompare" :component="component"></DesignComparator>`,
    }),
  };
}
