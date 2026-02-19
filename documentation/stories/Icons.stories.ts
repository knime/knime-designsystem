import { computed, ref } from "vue";
import type { Meta } from "@storybook/vue3-vite";

// Import all SVG icons from the dist/icons folder
// @ts-expect-error - import.meta.glob is a Vite-specific feature
const icons = import.meta.glob("../../packages/styles/dist/img/icons/*.svg", {
  eager: true,
});

// Import source icons for comparison
// @ts-expect-error - import.meta.glob is a Vite-specific feature
const srcIcons = import.meta.glob("../../packages/styles/src/img/icons/*.svg", {
  eager: true,
});

export default {
  title: "Icons",
  tags: ["!autodocs"],
} as Meta;

export const Preview = () => {
  const searchQuery = ref("");
  const iconNames = Object.keys(icons).map((path) =>
    path.split("/").pop()!.replace(".svg", ""),
  );

  const filteredIcons = computed(() => {
    if (!searchQuery.value) {
      return iconNames;
    }
    return iconNames.filter((name) =>
      name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  });

  const introText = `
    Here you can find all the available SVG icons in the KNIME Design System. 
    Each icon is available only in 4 distinct sizes, which are each rendered here. The base icon is a 12x12 pixel icon,
    which represents the 'small' size. All other sizes scale the icon accordingly. We use 'xsmall' - 9x9, 'small' - 
    12x12, 'medium' - 16x16, and 'large' - 20x20 pixels. 
    Use the search bar to quickly find the icon you need.
  `;

  return {
    setup() {
      return { searchQuery, filteredIcons, introText, icons, iconNames };
    },
    template: `
      <div>
        <h1>Icons</h1>
        <p style="margin-bottom: var(--kds-spacing-container-1x);">
          {{ introText }}
        </p>
        <div style="display: flex; justify-content: center; margin-bottom: var(--kds-spacing-container-1x);">
          <div style="position: relative; width: 80%;">
            <input
              type="search"
              v-model="searchQuery"
              placeholder="Search icons..."
              style="padding: var(--kds-spacing-container-1x); width: 100%;"
              list="iconNames"
            />
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--kds-spacing-container-2x);">
          <figure v-for="iconName in filteredIcons" :key="iconName" style="display: flex; flex-direction: column; align-items: center; border: 1px solid #ccc; border-radius: 8px; padding: var(--kds-spacing-container-1x);">
            <div style="display: flex; gap: var(--kds-spacing-container-1x);">
              <component :is="icons[\`../../packages/styles/dist/img/icons/\${iconName}.svg\`]" width="9" height="9" stroke-width="1" />
              <component :is="icons[\`../../packages/styles/dist/img/icons/\${iconName}.svg\`]" width="12" height="12" stroke-width="1" />
              <component :is="icons[\`../../packages/styles/dist/img/icons/\${iconName}.svg\`]" width="16" height="16" stroke-width="1.25" />
              <component :is="icons[\`../../packages/styles/dist/img/icons/\${iconName}.svg\`]" width="20" height="20" stroke-width="1.5" />
            </div>
            <figcaption style="margin-top: var(--kds-spacing-container-1x); text-align: center;">{{ iconName }}</figcaption>
          </figure>
        </div>
      </div>
    `,
  };
};

export const Comparison = () => {
  const searchQuery = ref("");
  const srcIconNames = Object.keys(srcIcons).map((path) =>
    path.split("/").pop()!.replace(".svg", ""),
  );
  const distIconNames = Object.keys(icons).map((path) =>
    path.split("/").pop()!.replace(".svg", ""),
  );

  const iconNames = srcIconNames.filter((name) => distIconNames.includes(name));

  const filteredIcons = computed(() => {
    if (!searchQuery.value) {
      return iconNames;
    }
    return iconNames.filter((name) =>
      name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  });

  const introText = `
    Here you can compare the SVG icons from Figma exports (src) with the corresponding processed and optimized 
    icons after the build step (dist).
  `;

  return {
    setup() {
      return {
        searchQuery,
        filteredIcons,
        introText,
        srcIcons,
        icons,
        iconNames,
      };
    },
    template: `
      <div>
        <h1>Icon Comparison</h1>
        <p style="margin-bottom: var(--kds-spacing-container-1x);">
          {{ introText }}
        </p>
        <div style="display: flex; justify-content: center; margin-bottom: var(--kds-spacing-container-1x);">
          <div style="position: relative; width: 80%;">
            <input
              type="search"
              v-model="searchQuery"
              placeholder="Search icons..."
              style="padding: var(--kds-spacing-container-1x); width: 100%;"
              list="iconNames"
            />
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--kds-spacing-container-2x);">
          <figure v-for="iconName in filteredIcons" :key="iconName" style="display: flex; flex-direction: column; align-items: center; border: 1px solid #ccc; border-radius: 8px; padding: var(--kds-spacing-container-1x);">
            <div style="display: flex; gap: var(--kds-spacing-container-1x);">
              <figure style="display: flex; flex-direction: column; align-items: center; margin: 0;">
                <component :is="srcIcons[\`../../packages/styles/src/img/icons/\${iconName}.svg\`]" width="12" height="12" />
                <figcaption style="margin-top: 8px; font-size: 10px;">src</figcaption>
              </figure>
              <figure style="display: flex; flex-direction: column; align-items: center; margin: 0;">
                <component :is="icons[\`../../packages/styles/dist/img/icons/\${iconName}.svg\`]" width="12" height="12" />
                <figcaption style="margin-top: 8px; font-size: 10px;">dist</figcaption>
              </figure>
            </div>
            <figcaption style="margin-top: var(--kds-spacing-container-1x); text-align: center;">{{ iconName }}</figcaption>
          </figure>
        </div>
      </div>
    `,
  };
};
