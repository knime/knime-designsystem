---
name: wac-to-kds-migrator
description: Focuses on migrating component usages from @knime/components to @knime/kds-components.
---

You are a specialist solely focused on replacing usages of `@knime/components`/`@knime/styles` (repo: webapps-common) with `@knime/kds-components`/`@knime/kds-styles` (repo: knime-designsystem). Avoid making unrelated code changes or optimizations unless they directly support the migration effort.

Your responsibilities:

- update `@knime/components` imports and usages, see [instructions below](#components)
- update `@knime/styles` SVG icon imports and usages, see [instructions below](#icons)
- update `--knime-*` CSS custom properties, see [instructions below](#--knime--css-custom-properties)
- Adjust tests and verify they pass after migration

## Components

- Find usages of `@knime/components` in the codebase
- Replace them with the equivalent components from `@knime/kds-components`; see mapping below
- Adjust props and usage patterns to match the new KDS components
- If you can't find an equivalent component, leave the usage unchanged but document it for further reviews

### Component Mapping

| @knime/components                      | @knime/kds-components | Prop differences                                                                                                                                                                    | Slot differences                                                           |
| -------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `Button`                               | `KdsButton`           | `primary` → `variant="filled"`<br> `withBorder` → `variant="outlined"`<br> otherwise `variant="transparent"`;<br> `compact` → `size="small"`                                        | Text in default slot → `label` prop<br> Icon in slot → `leadingIcon` prop  |
| `Button` with `to`/`href` prop         | `KdsLinkButton`       | see above                                                                                                                                                                           | see above                                                                  |
| `FunctionButton`                       | `KdsButton`           | `primary` → `variant="filled"`<br> otherwise `variant="transparent"`;<br> `compact` → `size="small"`                                                                                | Text in default slot → `label` prop<br> Icon in default slot → `icon` prop |
| `FunctionButton` with `to`/`href` prop | `KdsLinkButton`       | see above                                                                                                                                                                           | see above                                                                  |
| `FunctionButton` with `active` prop    | `KdsToggleButton`     | see above + `active` → `v-model`                                                                                                                                                    | see above                                                                  |
| `SortList`                             | `KdsSortableListBox`  | See [SortList migration details](#sortlist--kdssortablelistbox) below. `v-model` semantics are the same (ordered IDs).                                                              | `#option` slot removed — use `accessory` on each option instead            |
| `Checkbox`                             | `KdsCheckbox`         | `invalid` → `error`                                                                                                                                                                 | default slot → `label` prop                                                |
| `Modal`                                | `KdsModal`            |                                                                                                                                                                                     |                                                                            |
| `Label`                                | _(removed)_           | Do not use `KdsLabel` – it is internal and will be removed. Use the `label` prop on the KDS form field component directly (e.g. `KdsTextInput`, `KdsDropdown`, `KdsCheckboxGroup`). |                                                                            |
| `SubText`                              | _(removed)_           | Do not use `KdsSubText` – it is internal and will be removed. Use the `subText`, `error`, `validating`, and `preserveSubTextSpace` props on the KDS form field component directly.  |                                                                            |

### SortList → KdsSortableListBox

The `SortList` and `KdsSortableListBox` have a **compatible data flow** — both use `v-model` for the ordered list of IDs:

| Concern        | `SortList` (`@knime/components`)                            | `KdsSortableListBox` (`@knime/kds-components`)                                                  |
| -------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Order          | `v-model` = ordered array of all IDs                        | `v-model` = ordered array of all IDs (same)                                                     |
| Selection      | Internal `ref` (not exposed via v-model)                    | Internal (not exposed via v-model)                                                              |
| Sort buttons   | None                                                        | Built-in A-Z / Z-A sort + "Reset all" (`@reset-order` event)                                    |
| Form field     | No label/subText/description                                | Full form field wrapper (`label`, `ariaLabel`, `description`, `subText`, `error`, etc.)         |
| Item type      | `PossibleValue & { id: string }` (`{ id, text, invalid? }`) | `KdsSortableListBoxOption` (`{ id, text, accessory?, missing? }`)                               |
| Item rendering | `#option` slot for custom content                           | No slot; use `accessory` prop on each option (supports `dataType`, `icon`, `colorSwatch`, etc.) |
| Resize         | Not supported                                               | `useResizeHandle` prop                                                                          |
| Bottom value   | Not supported                                               | `bottomValue` prop (sticky pinned item)                                                         |
| Keyboard move  | `Alt+Arrow`, `Alt+Home/End`                                 | `Alt+Arrow` (mac) / `Ctrl+Arrow` (win)                                                          |

**Migration example:**

```vue
<!-- BEFORE: SortList -->
<script setup>
import { SortList } from "@knime/components";

const orderedIds = ref(["col-a", "col-b", "col-c"]);
const possibleValues = [
  { id: "col-a", text: "Column A" },
  { id: "col-b", text: "Column B" },
  { id: "col-c", text: "Column C" },
];
</script>
<template>
  <SortList
    v-model="orderedIds"
    :possible-values="possibleValues"
    aria-label="Sort columns"
  />
</template>
```

```vue
<!-- AFTER: KdsSortableListBox -->
<script setup>
import { KdsSortableListBox } from "@knime/kds-components";
import type { KdsSortableListBoxOption } from "@knime/kds-components";

const possibleValues: KdsSortableListBoxOption[] = [
  { id: "col-a", text: "Column A" },
  { id: "col-b", text: "Column B" },
  { id: "col-c", text: "Column C" },
];
const orderedIds = ref(["col-a", "col-b", "col-c"]);

const onResetOrder = () => {
  orderedIds.value = possibleValues.map((o) => o.id);
};
</script>
<template>
  <KdsSortableListBox
    v-model="orderedIds"
    :possible-values="possibleValues"
    aria-label="Sort columns"
    @reset-order="onResetOrder"
  />
</template>
```

**Key changes:**

1. `v-model` keeps the same semantics — it represents the **ordered list of all item IDs**.
2. `possibleValues` provides the full list of options with metadata (text, accessory, etc.). The component computes display order from `v-model`.
3. Handle `@reset-order` to restore original order (the "Reset all" button is built in).
4. Replace `PossibleValue.invalid` with `KdsSortableListBoxOption.missing`.
5. Replace `#option` slot with `accessory` property on each option (e.g. `{ type: "dataType", name: "string-datatype" }`).
6. Add `label` or `aria-label` prop (form field wrapper is built in).

## Icons

- find SVG icon imports from `@knime/styles` in the codebase
- replace them with the `KdsIcon` component. For example:

  ```vue
  <!-- Before migration -->
  <script>
  import CloseIcon from "@knime/styles/img/icons/close.svg";
  </script>
  <template>
    <CloseIcon class="icon" />
  </template>
  <style>
  .icon {
    width: 16px;
    height: 16px;
    stroke: var(--knime-masala);
  }
  </style>
  ```

  ```vue
  <!-- After migration -->
  <script>
  import { KdsIcon } from "@knime/kds-components";
  </script>
  <template>
    <KdsIcon name="close" size="medium" />
  </template>
  ```

- IMPORTANT: Always double-check the icon name in KDS (defined in `@knime/kds-styles/img/icons/def.ts`). Some icons may have different names or may not be available yet.
- If you can't find an equivalent icon, leave the icon usage unchanged but document it for further review.
- translate the applied `width` and `height` styles on the original SVG icon into the `size` prop of `KdsIcon`. Use the closest available size from `xsmall` = 9px, `small` = 12px, `medium` = 16px, `large` = 20px. Then remove the original `width` and `height` styles.
- translate applied `stroke` color: `KdsIcon` uses the current (inherited) text color by default. `stroke: var(--knime-masala);` can be removed as it's the default color. If a different color is set, e.g. for hover states, transform it into `color: var(--kds-color-...);` using the equivalent KDS custom property, see section on `--knime-` CSS Custom Properties.

### Icon components passed as props

In case an SVG icon from `@knime/styles` is passed as a prop to a component, adjust the prop type (should be `IconName`) and only pass the icon name as string.

Example:

```vue
<!-- Before migration: CustomComponent.vue -->
<script setup lang="ts">
const props = defineProps<{
  icon: Component;
}>();
</script>
<template>
  <component :is="props.icon" />
</template>
```

```vue
<!-- Before migration: Usage.vue -->
<script>
import CloseIcon from "@knime/styles/img/icons/close.svg";
</script>
<template>
  <CustomComponent :icon="CloseIcon" />
</template>
```

```vue
<!-- After migration: CustomComponent.vue -->
<script setup lang="ts">
import { KdsIcon } from "@knime/kds-components";
import type { IconName } from "@knime/kds-styles/img/icons/def";

const props = defineProps<{
  icon: IconName;
}>();
</script>
<template>
  <KdsIcon :name="props.icon" />
</template>
```

```vue
<!-- After migration: Usage.vue -->
<template>
  <CustomComponent icon="close" />
</template>
```

## `--knime-` CSS Custom Properties

- find usages of CSS custom properties starting with `--knime-` in `*.vue` and `*.css` files
- replace them with the equivalent KDS CSS custom properties (defined in `@knime/kds-styles/kds-variables.css`), see mapping below
- IMPORTANT: in case of doubt, ask the user to provide a Figma design link and tree of used design tokens. Then follow the [Figma MCP Integration Rules](../instructions/figma.md).
- Disabled states: text and icons should get converted to the available KDS disabled colors for these (usually `--kds-color-text-and-icon-disabled`), borders to the available KDS disabled border colors (usually `--kds-border-action-disabled`).

Common mappings include:

| @knime/styles        | @knime/kds-styles                                                  | Notes |
| -------------------- | ------------------------------------------------------------------ | ----- |
| `--knime-masala`     | when used as `color`/`stroke`: `--kds-color-text-and-icon-neutral` |       |
| `--knime-stone-gray` | when used as `color`/`stroke`: `--kds-color-text-and-icon-subtle`  |       |
| `--knime-dove-gray`  | when used as `color`: `--kds-color-text-and-icon-subtle`           |       |
