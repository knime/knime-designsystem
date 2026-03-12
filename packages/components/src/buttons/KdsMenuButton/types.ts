import type { KdsMenuContainerProps } from "../../overlays/MenuContainer/types";
import type { KdsPopoverProps } from "../../overlays/Popover";
import type { KdsToggleButtonProps } from "../KdsToggleButton";

export type KdsMenuButtonProps = KdsToggleButtonProps &
  KdsMenuContainerProps &
  Pick<KdsPopoverProps, "placement">;
