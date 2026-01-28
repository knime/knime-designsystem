import type { IconName } from "@knime/kds-styles/img/icons/def";

export type KdsTabBarSize = "small" | "large";

export type KdsTab = {
  value: string | number;
  label: string;
  icon?: IconName;
  title?: string;
  disabled?: boolean;
};

export type KdsTabBarProps = {
  tabs: KdsTab[];
  size?: KdsTabBarSize;
  fullWidth?: boolean;
  disabled?: boolean;
  name?: string;
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
  name: "tab-bar",
});

propTypeTester<KdsTab>({
  value: "tab1",
  label: "Tab 1",
  icon: "home",
  title: "Go to home",
  disabled: false,
});
