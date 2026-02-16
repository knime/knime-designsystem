import type { IconName as KdsIconName } from "@knime/kds-styles/img/icons/def";
import type { TypeIconName as KdsTypeIconName } from "@knime/kds-styles/img/type-icons/def";

import type { kdsDataTypeSizes, kdsIconSizes } from "./constants";

type KdsIconSize = (typeof kdsIconSizes)[number];
type KdsDataTypeSize = (typeof kdsDataTypeSizes)[number];

export type { KdsIconSize, KdsIconName, KdsDataTypeSize, KdsTypeIconName };
