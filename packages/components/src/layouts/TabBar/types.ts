import type { KdsIconName } from "../../accessories/Icon/types";

import { kdsTabBarSize } from "./enums";

export type KdsTabBarSize = (typeof kdsTabBarSize)[keyof typeof kdsTabBarSize];

export type KdsTabBarItem = {
  /** Unique HTML id attribute for the tab button element that should be linked to the panel by `aria-labelledby`. */
  id: string;
  /** Unique value used to identify the tab and to track the selected tab via v-model. */
  value: string | number;
  /** Visible text label displayed inside the tab. */
  label: string;
  /** The id of the associated tab panel element, used for `aria-controls`. */
  panelId: string;
  /** Optional icon displayed before the label. Hidden automatically when the container is too narrow. */
  trailingIcon?: KdsIconName;
  /** Optional tooltip text. Falls back to `label` when not provided. */
  title?: string;
  /** Whether this individual tab is disabled. */
  disabled?: boolean;
};

export type KdsTabBarProps = {
  /** The list of tabs to render. */
  tabs: KdsTabBarItem[];
  /** The size variant of the tab bar. @default "small" */
  size?: KdsTabBarSize;
  /** Whether tabs should stretch to fill the full available width. @default false */
  fullWidth?: boolean;
  /** Whether the entire tab bar is disabled. Overrides individual tab `disabled` states. @default false */
  disabled?: boolean;
};

/**
 * Testers
 */

propTypeTester<KdsTabBarProps>({
  tabs: [
    {
      id: "tab1",
      value: "tab1",
      label: "Tab 1",
      panelId: "panel1",
    },
  ],
  size: "small",
  fullWidth: false,
  disabled: false,
});

propTypeTester<KdsTabBarItem>({
  id: "tab1-id",
  value: "tab1",
  label: "Tab 1",
  panelId: "panel1",
  trailingIcon: "home",
  title: "Go to home",
  disabled: false,
});
