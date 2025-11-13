import type { IconName } from "@knime/kds-styles/img/icons/def";
import type { TypeIconName } from "@knime/kds-styles/img/type-icons/def";

import type { dataTypeSizes, iconSizes } from "./constants";

type IconSize = (typeof iconSizes)[number];
type DataTypeSize = (typeof dataTypeSizes)[number];

export type { IconSize, IconName, DataTypeSize, TypeIconName };
