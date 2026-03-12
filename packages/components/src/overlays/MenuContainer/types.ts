import type { KdsListOption } from "../../forms/_helper/List/ListContainer";
import type {
  KdsAvatarAccessory,
  KdsIconAccessory,
  KdsLiveStatusAccessory,
} from "../../forms/_helper/List/ListItemAccessory/types";
import type { KdsPopoverProps } from "../Popover";

type KdsMenuItemAccessory =
  | KdsIconAccessory
  | KdsLiveStatusAccessory
  | KdsAvatarAccessory;

export type KdsMenuItem = KdsListOption & {
  accessory?: KdsMenuItemAccessory;
};

export type KdsMenuContainerProps = Pick<KdsPopoverProps, "placement"> & {
  items: KdsMenuItem[];
};
