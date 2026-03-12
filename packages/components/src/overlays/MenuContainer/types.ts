import type { KdsListOption } from "../../forms/_helper/List/ListContainer";
import type {
  KdsAvatarAccessory,
  KdsIconAccessory,
  KdsLiveStatusAccessory,
} from "../../forms/_helper/List/ListItemAccessory/types";

type KdsMenuItemAccessory =
  | KdsIconAccessory
  | KdsLiveStatusAccessory
  | KdsAvatarAccessory;

export type KdsMenuItem = KdsListOption & {
  accessory?: KdsMenuItemAccessory;
};

export type KdsMenuContainerProps = {
  items: KdsMenuItem[];
};
