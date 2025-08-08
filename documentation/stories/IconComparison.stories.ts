import { computed, ref } from "vue";
import type { Meta } from "@storybook/vue3-vite";

// Import all SVG icons from the src/icons and dist/icons folders
const srcIcons = import.meta.glob("../../packages/styles/src/icons/*.svg", {
  eager: true,
});
const distIcons = import.meta.glob("../../packages/styles/dist/icons/*.svg", {
  eager: true,
});

export default {
  title: "Core Concepts/Icons",
  tags: ["!autodocs"],
} as Meta;

export const IconComparison = () => {
  const searchQuery = ref("");
  const srcIconNames = Object.keys(srcIcons).map((path) =>
    path.split("/").pop()!.replace(".svg", ""),
  );
  const distIconNames = Object.keys(distIcons).map((path) =>
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
        distIcons,
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
                <component :is="srcIcons[\`../../packages/styles/src/icons/\${iconName}.svg\`]" width="12" height="12" />
                <figcaption style="margin-top: var(--kds-spacing-container-0_5x); font-size: 10px;">src</figcaption>
              </figure>
              <figure style="display: flex; flex-direction: column; align-items: center; margin: 0;">
                <component :is="distIcons[\`../../packages/styles/dist/icons/\${iconName}.svg\`]" width="12" height="12" />
                <figcaption style="margin-top: var(--kds-spacing-container-0_5x); font-size: 10px;">dist</figcaption>
              </figure>
            </div>
            <figcaption style="margin-top: var(--kds-spacing-container-1x); text-align: center;">{{ iconName }}</figcaption>
          </figure>
        </div>
      </div>
    `,
  };
};
