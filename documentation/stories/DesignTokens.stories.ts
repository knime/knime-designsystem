import { computed, ref } from "vue";
import type { Meta } from "@storybook/vue3-vite";

// Parse CSS variables from the variables.css file
// @ts-expect-error - import.meta.glob is a Vite-specific feature
const variablesCss = import.meta.glob(
  "../../packages/styles/dist/tokens/css/_variables.css",
  { eager: true, query: "?raw", import: "default" },
);

const cssContent = Object.values(variablesCss)[0] as string;

// Extract all CSS custom properties
const extractTokens = (css: string): Array<{ name: string; value: string }> => {
  const tokens: Array<{ name: string; value: string }> = [];
  const regex = /--(kds-[a-z0-9-]+):\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    tokens.push({ name: `--${match[1]}`, value: match[2].trim() });
  }
  return tokens;
};

const allTokens = extractTokens(cssContent);

// Group tokens by category
const categorizeToken = (name: string): string => {
  if (name.includes("-core-color-")) {
    return "Core Colors";
  }
  if (name.includes("-core-font-")) {
    return "Typography";
  }
  if (name.includes("-core-border-")) {
    return "Border";
  }
  if (name.includes("-core-size-")) {
    return "Size";
  }
  if (name.includes("-core-line-height-")) {
    return "Line Height";
  }
  if (name.includes("-core-paragraph-")) {
    return "Paragraph";
  }
  if (name.includes("-color-surface-")) {
    return "Surface Colors";
  }
  if (name.includes("-color-page-")) {
    return "Page Colors";
  }
  if (name.includes("-color-background-")) {
    return "Background Colors";
  }
  if (name.includes("-color-text-and-icon-")) {
    return "Text & Icon Colors";
  }
  if (name.includes("-color-border-")) {
    return "Border Colors";
  }
  if (name.includes("-color-focus-")) {
    return "Focus Colors";
  }
  if (name.includes("-color-blanket-")) {
    return "Blanket Colors";
  }
  if (name.includes("-color-nodes-")) {
    return "Node Colors";
  }
  if (name.includes("-spacing-")) {
    return "Spacing";
  }
  if (name.includes("-radius-")) {
    return "Border Radius";
  }
  if (name.includes("-shadow-")) {
    return "Shadows";
  }
  return "Other";
};

export default {
  title: "Design Tokens",
  tags: ["!autodocs"],
} as Meta;

export const TokenPreview = () => {
  const searchQuery = ref("");
  const selectedCategory = ref("All");

  const categories = computed(() => {
    const cats = new Set(allTokens.map((t) => categorizeToken(t.name)));
    return ["All", ...Array.from(cats).sort()];
  });

  const filteredTokens = computed(() => {
    let tokens = allTokens;

    if (selectedCategory.value !== "All") {
      tokens = tokens.filter(
        (t) => categorizeToken(t.name) === selectedCategory.value,
      );
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      tokens = tokens.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.value.toLowerCase().includes(query),
      );
    }

    return tokens;
  });

  const isColorToken = (value: string): boolean => {
    return (
      value.startsWith("hsl") ||
      value.startsWith("rgb") ||
      value.startsWith("#") ||
      value.startsWith("light-dark")
    );
  };

  const introText = `
    Design tokens are the visual design atoms of the KNIME Design System. They define colors, typography, spacing, and other visual properties as CSS custom properties.
    Use the search bar to find specific tokens or filter by category.
  `;

  return {
    setup() {
      return {
        searchQuery,
        selectedCategory,
        categories,
        filteredTokens,
        introText,
        isColorToken,
      };
    },
    template: `
      <div>
        <h1>Design Tokens</h1>
        <p style="margin-bottom: var(--kds-spacing-container-1x, 16px);">
          {{ introText }}
        </p>
        <div style="display: flex; gap: var(--kds-spacing-container-1x, 16px); margin-bottom: var(--kds-spacing-container-1x, 16px); flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px;">
            <label for="token-search">Search tokens</label>
            <input
              id="token-search"
              type="search"
              v-model="searchQuery"
              placeholder="Search tokens..."
              style="padding: var(--kds-spacing-container-1x, 8px); width: 100%;"
            />
          </div>
          <div>
            <label for="token-category">Category</label>
            <select id="token-category" v-model="selectedCategory" style="padding: var(--kds-spacing-container-1x, 8px); width: 100%">
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>
        <p style="margin-bottom: var(--kds-spacing-container-1x, 16px); color: var(--kds-color-text-and-icon-muted, #666);">
          Showing {{ filteredTokens.length }} tokens
        </p>
        <div style="display: grid; gap: var(--kds-spacing-container-0-5x, 8px);">
          <div
            v-for="token in filteredTokens"
            :key="token.name"
            style="display: grid; grid-template-columns: minmax(50px, auto) 1fr 1fr; gap: var(--kds-spacing-container-1x, 16px); padding: var(--kds-spacing-container-1x, 12px); border: 1px solid var(--kds-color-border-muted, #ccc); border-radius: 4px; align-items: center;"
          >
            <div
              v-if="isColorToken(token.value)"
              :style="{
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                border: '1px solid var(--kds-color-border-muted, #ccc)',
                background: 'var(' + token.name + ')'
              }"
            ></div>
            <div v-else style="width: 40px; height: 40px;"></div>
            <div>
              <code style="font-size: 13px; font-weight: 500;">{{ token.name }}</code>
            </div>
            <div style="color: var(--kds-color-text-and-icon-muted, #666); font-size: 12px; word-break: break-all;">
              {{ token.value }}
            </div>
          </div>
        </div>
      </div>
    `,
  };
};

// Helper to filter tokens by pattern
const filterTokens = (pattern: string) =>
  allTokens.filter((t) => t.name.includes(pattern));

// Color palette groupings
const coreColorPalettes = [
  "neutral",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
  "aquamarine",
  "grassgreen",
  "brown",
];

export const Colors = () => {
  const searchQuery = ref("");

  const semanticColorGroups = [
    {
      name: "Surface & Page",
      tokens: [
        ...filterTokens("-color-surface-"),
        ...filterTokens("-color-page-"),
      ],
    },
    { name: "Background", tokens: filterTokens("-color-background-") },
    { name: "Text & Icons", tokens: filterTokens("-color-text-and-icon-") },
    { name: "Border", tokens: filterTokens("-color-border-") },
    { name: "Focus", tokens: filterTokens("-color-focus-") },
    { name: "Nodes & Variables", tokens: filterTokens("-color-nodes-") },
  ];

  const coreColorGroups = coreColorPalettes.map((palette) => ({
    name: palette.charAt(0).toUpperCase() + palette.slice(1),
    tokens: filterTokens(`-core-color-${palette}`),
  }));

  const filteredSemanticGroups = computed(() => {
    if (!searchQuery.value) {
      return semanticColorGroups;
    }
    const query = searchQuery.value.toLowerCase();
    return semanticColorGroups
      .map((group) => ({
        ...group,
        tokens: group.tokens.filter(
          (t) =>
            t.name.toLowerCase().includes(query) ||
            t.value.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.tokens.length > 0);
  });

  const filteredCoreGroups = computed(() => {
    if (!searchQuery.value) {
      return coreColorGroups;
    }
    const query = searchQuery.value.toLowerCase();
    return coreColorGroups
      .map((group) => ({
        ...group,
        tokens: group.tokens.filter(
          (t) =>
            t.name.toLowerCase().includes(query) ||
            t.value.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.tokens.length > 0);
  });

  return {
    setup() {
      return { searchQuery, filteredSemanticGroups, filteredCoreGroups };
    },
    template: `
      <div>
        <h1>Color Tokens</h1>
        <p style="margin-bottom: 16px;">
          The KNIME Design System provides semantic color tokens that adapt to light and dark modes,
          as well as core color palettes for building custom themes.
        </p>

        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search colors..."
          style="padding: 8px; width: 100%; max-width: 400px; margin-bottom: 24px;"
        />

        <h2 style="margin-bottom: 16px;">Semantic Colors</h2>
        <p style="margin-bottom: 16px; color: var(--kds-color-text-and-icon-muted, #666);">
          Use these tokens in your components. They automatically adapt to light/dark mode.
        </p>

        <div v-for="group in filteredSemanticGroups" :key="group.name" style="margin-bottom: 32px;">
          <h3 style="margin-bottom: 12px;">{{ group.name }}</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;">
            <div
              v-for="token in group.tokens"
              :key="token.name"
              style="border: 1px solid var(--kds-color-border-muted, #ccc); border-radius: 8px; overflow: hidden;"
            >
              <div
                :style="{
                  height: '60px',
                  background: 'var(' + token.name + ')',
                  borderBottom: '1px solid var(--kds-color-border-muted, #ccc)'
                }"
              ></div>
              <div style="padding: 8px;">
                <code style="font-size: 11px; word-break: break-all;">{{ token.name }}</code>
              </div>
            </div>
          </div>
        </div>

        <h2 style="margin-top: 48px; margin-bottom: 16px;">Core Color Palettes</h2>
        <p style="margin-bottom: 16px; color: var(--kds-color-text-and-icon-muted, #666);">
          Base color scales used to build semantic tokens. Avoid using these directly in components.
        </p>

        <div v-for="group in filteredCoreGroups" :key="group.name" style="margin-bottom: 24px;">
          <h3 style="margin-bottom: 12px;">{{ group.name }}</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            <div
              v-for="token in group.tokens"
              :key="token.name"
              :style="{
                width: '48px',
                height: '48px',
                background: 'var(' + token.name + ')',
                borderRadius: '4px',
                border: '1px solid var(--kds-color-border-muted, #ccc)'
              }"
              :title="token.name + ': ' + token.value"
            ></div>
          </div>
        </div>
      </div>
    `,
  };
};

export const Typography = () => {
  const fontSizes = filterTokens("-core-font-size-");
  const fontWeights = filterTokens("-core-font-weight-");
  const fontFamilies = filterTokens("-core-font-family-");
  const lineHeights = filterTokens("-core-line-height-");

  return {
    setup() {
      return { fontSizes, fontWeights, fontFamilies, lineHeights };
    },
    template: `
      <div>
        <h1>Typography Tokens</h1>
        <p style="margin-bottom: 24px;">
          Typography tokens define font families, sizes, weights, and line heights
          used throughout the KNIME Design System.
        </p>

        <h2 style="margin-bottom: 16px;">Font Families</h2>
        <div style="display: grid; gap: 16px; margin-bottom: 32px;">
          <div
            v-for="token in fontFamilies"
            :key="token.name"
            style="padding: 16px; border: 1px solid var(--kds-color-border-muted, #ccc); border-radius: 8px;"
          >
            <p :style="{ fontFamily: 'var(' + token.name + ')', fontSize: '24px', marginBottom: '8px' }">
              The quick brown fox jumps over the lazy dog
            </p>
            <code style="font-size: 12px;">{{ token.name }}</code>
            <span style="color: var(--kds-color-text-and-icon-muted, #666); font-size: 12px; margin-left: 8px;">
              {{ token.value }}
            </span>
          </div>
        </div>

        <h2 style="margin-bottom: 16px;">Font Sizes</h2>
        <div style="display: grid; gap: 12px; margin-bottom: 32px;">
          <div
            v-for="token in fontSizes"
            :key="token.name"
            style="display: flex; align-items: baseline; gap: 16px; padding: 8px 0; border-bottom: 1px solid var(--kds-color-border-subtle, #eee);"
          >
            <span :style="{ fontSize: 'var(' + token.name + ')', minWidth: '200px' }">
              Sample Text
            </span>
            <code style="font-size: 12px; min-width: 280px;">{{ token.name }}</code>
            <span style="color: var(--kds-color-text-and-icon-muted, #666); font-size: 12px;">
              {{ token.value }}
            </span>
          </div>
        </div>

        <h2 style="margin-bottom: 16px;">Font Weights</h2>
        <div style="display: grid; gap: 12px; margin-bottom: 32px;">
          <div
            v-for="token in fontWeights"
            :key="token.name"
            style="display: flex; align-items: baseline; gap: 16px; padding: 8px 0; border-bottom: 1px solid var(--kds-color-border-subtle, #eee);"
          >
            <span :style="{ fontWeight: 'var(' + token.name + ')', fontSize: '18px', minWidth: '200px' }">
              Sample Text
            </span>
            <code style="font-size: 12px; min-width: 320px;">{{ token.name }}</code>
            <span style="color: var(--kds-color-text-and-icon-muted, #666); font-size: 12px;">
              {{ token.value }}
            </span>
          </div>
        </div>

        <h2 style="margin-bottom: 16px;">Line Heights</h2>
        <div style="display: grid; gap: 16px; margin-bottom: 32px;">
          <div
            v-for="token in lineHeights"
            :key="token.name"
            style="padding: 16px; border: 1px solid var(--kds-color-border-muted, #ccc); border-radius: 8px;"
          >
            <p :style="{ lineHeight: 'var(' + token.name + ')', fontSize: '16px', marginBottom: '8px', maxWidth: '600px' }">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
            <code style="font-size: 12px;">{{ token.name }}</code>
            <span style="color: var(--kds-color-text-and-icon-muted, #666); font-size: 12px; margin-left: 8px;">
              {{ token.value }}
            </span>
          </div>
        </div>
      </div>
    `,
  };
};

export const Spacing = () => {
  const spacingTokens = filterTokens("-spacing-");
  const borderWidths = filterTokens("-core-border-width-");
  const radiusTokens = filterTokens("-radius-");

  return {
    setup() {
      return { spacingTokens, borderWidths, radiusTokens };
    },
    template: `
      <div>
        <h1>Spacing & Layout Tokens</h1>
        <p style="margin-bottom: 24px;">
          Spacing tokens ensure consistent margins, padding, and gaps across the design system.
        </p>

        <h2 style="margin-bottom: 16px;">Spacing Scale</h2>
        <div style="display: grid; gap: 12px; margin-bottom: 32px;">
          <div
            v-for="token in spacingTokens"
            :key="token.name"
            style="display: flex; align-items: center; gap: 16px; padding: 8px 0;"
          >
            <div
              :style="{
                width: 'var(' + token.name + ')',
                height: '24px',
                background: 'var(--kds-color-background-primary-bold-initial, #006064)',
                borderRadius: '2px',
                minWidth: '4px'
              }"
            ></div>
            <code style="font-size: 12px; min-width: 280px;">{{ token.name }}</code>
            <span style="color: var(--kds-color-text-and-icon-muted, #666); font-size: 12px;">
              {{ token.value }}
            </span>
          </div>
        </div>

        <h2 style="margin-bottom: 16px;">Border Widths</h2>
        <div style="display: grid; gap: 12px; margin-bottom: 32px;">
          <div
            v-for="token in borderWidths"
            :key="token.name"
            style="display: flex; align-items: center; gap: 16px; padding: 8px 0;"
          >
            <div
              :style="{
                width: '80px',
                height: '40px',
                border: 'var(' + token.name + ') solid var(--kds-color-border-neutral, #333)',
                borderRadius: '4px'
              }"
            ></div>
            <code style="font-size: 12px; min-width: 220px;">{{ token.name }}</code>
            <span style="color: var(--kds-color-text-and-icon-muted, #666); font-size: 12px;">
              {{ token.value }}
            </span>
          </div>
        </div>

        <h2 v-if="radiusTokens.length" style="margin-bottom: 16px;">Border Radius</h2>
        <div v-if="radiusTokens.length" style="display: grid; gap: 12px; margin-bottom: 32px;">
          <div
            v-for="token in radiusTokens"
            :key="token.name"
            style="display: flex; align-items: center; gap: 16px; padding: 8px 0;"
          >
            <div
              :style="{
                width: '60px',
                height: '60px',
                background: 'var(--kds-color-background-primary-bold-initial, #006064)',
                borderRadius: 'var(' + token.name + ')'
              }"
            ></div>
            <code style="font-size: 12px; min-width: 220px;">{{ token.name }}</code>
            <span style="color: var(--kds-color-text-and-icon-muted, #666); font-size: 12px;">
              {{ token.value }}
            </span>
          </div>
        </div>
      </div>
    `,
  };
};
