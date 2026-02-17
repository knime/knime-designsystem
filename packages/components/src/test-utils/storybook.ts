import type { Component, DefineComponent, StyleValue } from "vue";
import type { StoryObj } from "@storybook/vue3-vite";

import DesignComparator, {
  type DesignsToCompare,
} from "./DesignComparator.vue";

type PropsCombinations<Props> = {
  [K in keyof Props]?: readonly (Props[K] | undefined)[];
};

type PropsCombination<Props> = {
  [K in keyof Props]?: Props[K] | undefined;
};

/**
 * Generate all combinations of the provided props by providing an array of possible values for each prop.
 *
 * @example
 * generateCombinations({
 *   disabled: [false, true],
 *   destructive: [false, true],
 *   label: ["Button", undefined]
 * })
 */
function generateCombinations<Props extends Record<string, unknown>>(
  props: PropsCombinations<Props>,
): PropsCombination<Props>[] {
  const keys = Object.keys(props) as (keyof Props)[];
  let results: PropsCombination<Props>[] = [Object.create(null)];

  for (const key of keys) {
    const values = props[key];
    if (!values?.length) {
      continue;
    }

    results = results.flatMap((acc) =>
      values.map((value) => {
        const next = { ...acc } as PropsCombination<Props>;
        next[key] = value;
        return next;
      }),
    );
  }

  return results;
}

type PseudoState = "hover" | "active" | "focus" | "focus-visible";

/**
 * Extracts the props type from a Vue component.
 */
type ExtractComponentProps<C> =
  C extends DefineComponent<infer P, unknown, unknown>
    ? P
    : C extends Component<infer P>
      ? P
      : Record<string, unknown>;

type AllCombinationsStoryParams<C extends Component> = {
  parameters?: StoryObj["parameters"];
  component: C;
  combinationsProps:
    | readonly PropsCombinations<ExtractComponentProps<C>>[]
    | {
        default: PropsCombinations<ExtractComponentProps<C>>;
        combinations: readonly PropsCombinations<ExtractComponentProps<C>>[];
      };
  pseudoStates?: PseudoState[];
};

const isArrayOfCombinations = <T>(
  value: readonly T[] | { default: T; combinations: readonly T[] },
): value is readonly T[] => Array.isArray(value);

/**
 * @example
 *   export const AllCombinations: Story = buildAllCombinationsStory({
 *     component: Button,
 *     combinationsProps: {
 *       default: {
 *         label: ["Button"],
 *         leadingIcon: [undefined, "ai-general"],
 *         readonly: [false],
 *         disabled: [false],
 *       },
 *       combinations: [
 *         {
 *           readonly: [false, true],
 *           disabled: [false, true],
 *         },
 *       ],
 *     },
 *   });
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
export function buildAllCombinationsStory<C extends Component>(
  config: AllCombinationsStoryParams<C>,
): StoryObj {
  const allCombinations: PropsCombination<ExtractComponentProps<C>>[] = [];
  const { combinationsProps } = config;

  if (isArrayOfCombinations(combinationsProps)) {
    for (const props of combinationsProps) {
      allCombinations.push(...generateCombinations(props));
    }
  } else {
    allCombinations.push(...generateCombinations(combinationsProps.default));
    for (const combination of combinationsProps.combinations) {
      const props = { ...combinationsProps.default, ...combination };
      allCombinations.push(...generateCombinations(props));
    }
  }

  return {
    parameters: {
      controls: { disable: true },
      chromatic: { disableSnapshot: false },
      ...config.parameters,
    },
    render: () => ({
      setup() {
        return {
          allCombinations,
          component: config.component,
          pseudoStates: ["", ...(config.pseudoStates ?? [])],
        };
      },
      template: `
      Hover to see the props of each instance:
      <div style="display: grid; grid-template-columns: repeat(4, auto); gap: 1rem;">
        <template v-for="(state, stateIndex) in pseudoStates" :key="state">
          <div v-if="state" style="grid-column: span 4; font-weight: bold; margin-top: 1rem; text-transform: capitalize;">
            {{ state }}
          </div>
          <template v-for="(props, index) in allCombinations" :key="index">
            <div 
              :title="state ? JSON.stringify({ ...props, _pseudo: state }, null, 2) : JSON.stringify(props, null, 2)" 
              style="display: grid; 
              gap: 0.5rem;"
              :class="state ? \`pseudo-\${state}-all\` : undefined"
            >
              <div>
                <div style="font-size: 10px; color: var(--kds-color-text-and-icon-subtle);">
                  {{ index + stateIndex * allCombinations.length }}
                </div>
                <Component :is="component" v-bind="props" />
              </div>
            </div>
          </template>
        </template>
      </div>
    `,
    }),
  };
}

type DesignComparatorParams = {
  component: Component;
  designsToCompare: DesignsToCompare; // or can we infer the possible props from the component type?
  wrapperStyle?: StyleValue;
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
          wrapperStyle: config.wrapperStyle,
        };
      },
      template: `
        <DesignComparator 
          :designs-to-compare="designsToCompare" 
          :component="component"
          :wrapper-style="wrapperStyle"
        />`,
    }),
  };
}

type TextOverflowStoryParams = {
  component: Component;
  /** width of the resizing box; defaults to 200 */
  width?: number;
  /** height of the resizing box; defaults to "auto" */
  height?: number;
};

/**
 * Builds a Storybook story which allows resizing the given component. Useful when providing long texts to test text overflow handling.
 * 
 * @example
 * export const TextOverflow: Story = {
    ...buildTextOverflowStory({
      component: Button,
      width: 300,
    }),
    args: {
      label: "Button with veeery loooong label",
      variant: "outlined",
      leadingIcon: "ai-general",
      trailingIcon: "ai-general",
    },
  };
 */
export function buildTextOverflowStory(
  config: TextOverflowStoryParams,
): StoryObj {
  return {
    parameters: {
      chromatic: { disableSnapshot: false },
    },
    render: (args) => ({
      setup() {
        return {
          component: config.component,
          width: config.width || 200,
          height: config.height || "auto",
          args,
        };
      },
      template: `
      Component without size restrictions to check if it has a max size itself<br>
      <Component :is="component" v-bind="args" /><br>
      Component with size restrictions. Try by resizing the box!
      <div :style="{ width: width + 'px', height: height + 'px', padding: '10px', background: 'lightgray', resize: 'both', overflow: 'auto' }">
        <Component :is="component" v-bind="args" />
      </div>`,
    }),
  };
}
