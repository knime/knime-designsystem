import { iconNames as kdsIconNames } from "@knime/kds-styles/img/icons/def";
import { typeIconNames as kdsTypeIconNames } from "@knime/kds-styles/img/type-icons/def";

import { kdsSizes } from "../../constants";

const kdsIconSizes = kdsSizes;
const kdsDataTypeSizes = kdsSizes.filter((size) => size !== "xsmall");

export { kdsIconSizes, kdsDataTypeSizes, kdsIconNames, kdsTypeIconNames };
