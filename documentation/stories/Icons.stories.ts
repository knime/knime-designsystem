import { computed, ref } from "vue";
import type { Meta } from "@storybook/vue3-vite";

import KdsIcon from "../../packages/components/src/accessories/Icon/KdsIcon.vue";
import { kdsIconNames } from "../../packages/components/src/accessories/Icon/enums";
import KdsSearchInput from "../../packages/components/src/forms/inputs/SearchInput/KdsSearchInput.vue";
import KdsCardClickable from "../../packages/components/src/layouts/KdsCardClickable/KdsCardClickable.vue";

import { keywordMap } from "./icon-alias.ts";

const allIconNames = [...kdsIconNames];

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

export const Search = () => {
  const searchQuery = ref("");
  const copiedName = ref("");

  const filteredIcons = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) {
      return allIconNames;
    }
    const terms = query.split(/\s+/);
    return allIconNames.filter((name) => {
      const nameMatch = name.toLowerCase();
      const keywords = (keywordMap[name] ?? []).map((k) => k.toLowerCase());
      return terms.every(
        (term) =>
          nameMatch.includes(term) || keywords.some((kw) => kw.includes(term)),
      );
    });
  });

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    copiedName.value = name;
    setTimeout(() => {
      if (copiedName.value === name) {
        copiedName.value = "";
      }
    }, 2000);
  };

  return {
    components: { KdsCardClickable, KdsIcon, KdsSearchInput },
    setup() {
      return {
        searchQuery,
        filteredIcons,
        copiedName,
        copyToClipboard,
      };
    },
    template: `
      <div style="max-width: 1200px; margin: 0 auto;">
        <h1 style="margin-bottom: 8px;">Icon Search</h1>
        <p>
          Search for icons by name or by concept. For example, try
          <em>"delete"</em>, <em>"navigate"</em>, <em>"status"</em>, or
          <em>"typography"</em>. Click any icon card to copy its name.
        </p>

        <div style="position: sticky; top: 0; z-index: 10; padding: var(--kds-spacing-container-1x) 0; background: var(--kds-color-page-elevated, #fff);">
          <KdsSearchInput
            v-model="searchQuery"
            placeholder="Search icons by name or keyword…"
            aria-label="Search icons"
          />
          <div style="margin-top: 8px; font-size: 13px; color: var(--kds-color-text-and-icon-secondary, #888);">
            {{ filteredIcons.length }} of {{ ${allIconNames.length} }} icons
          </div>
        </div>

        <div
          v-if="filteredIcons.length === 0"
          style="text-align: center; padding: 48px 0; color: var(--kds-color-text-and-icon-secondary, #888);"
        >
          <p style="font-size: 18px;">No icons found for "{{ searchQuery }}"</p>
          <p style="font-size: 14px; margin-top: 8px;">Try a different search term</p>
        </div>

        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: var(--kds-spacing-container-1x);
            margin-top: var(--kds-spacing-container-1x);
          "
        >
          <KdsCardClickable
            v-for="iconName in filteredIcons"
            :key="iconName"
            v-bind="{ ariaLabel: 'Copy icon name: ' + iconName }"
            variant="outlined"
            @click="copyToClipboard(iconName)"
          >
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 8px;
              padding: 16px 8px;
              position: relative;
            ">
              <KdsIcon :name="iconName" size="large" />
              <span style="
                font-size: 11px;
                text-align: center;
                word-break: break-word;
                line-height: 1.3;
                color: var(--kds-color-text-and-icon-default, #333);
              ">
                {{ iconName }}
              </span>
              <span
                v-if="copiedName === iconName"
                style="
                  position: absolute;
                  inset: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: var(--kds-color-surface-default, rgba(255,255,255,0.95));
                  border-radius: 8px;
                  font-size: 12px;
                  font-weight: 600;
                  color: var(--kds-color-text-and-icon-success, green);
                "
              >
                Copied!
              </span>
            </div>
          </KdsCardClickable>
        </div>
      </div>
    `,
  };
};

export const SizePreview = () => {
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
