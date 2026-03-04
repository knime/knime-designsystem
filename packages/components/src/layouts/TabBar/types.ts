import type { KdsIconName } from "../../accessories/Icon/types";

import { kdsTabBarSize } from "./enums";

export type KdsTabBarSize = (typeof kdsTabBarSize)[keyof typeof kdsTabBarSize];

export type KdsTab = {
  value: string | number;
  label: string;
  icon?: KdsIconName;
  title?: string;
  disabled?: boolean;
};

export type KdsTabBarProps = {
  tabs: KdsTab[];
  size?: KdsTabBarSize;
  fullWidth?: boolean;
  disabled?: boolean;
};

/**
 * Testers
 */

propTypeTester<KdsTabBarProps>({
  tabs: [
    {
      value: "tab1",
      label: "Tab 1",
    },
  ],
  size: "small",
  fullWidth: false,
  disabled: false,
});

propTypeTester<KdsTab>({
  value: "tab1",
  label: "Tab 1",
  icon: "home",
  title: "Go to home",
  disabled: false,
});
