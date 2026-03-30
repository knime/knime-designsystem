import type { KdsMenuItem } from "../../forms/_helper/MenuContainer/types";
import type { KdsToggleButtonProps } from "../KdsToggleButton";

export type { KdsMenuItem } from "../../forms/_helper/MenuContainer/types";

export type KdsMenuButtonProps = KdsToggleButtonProps & {
  items: KdsMenuItem[];
  menuMaxHeight?: string;
};
