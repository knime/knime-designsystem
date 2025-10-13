import { computed, ref } from "vue";
import type { Meta } from "@storybook/vue3-vite";

// Import all SVG icons from the dist/icons folder
const icons = import.meta.glob("../../packages/styles/dist/img/icons/*.svg", {
  eager: true,
});

export default {
  title: "Core Concepts/Icons",
  tags: ["!autodocs"],
} as Meta;

export const IconsPreview = () => {
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
