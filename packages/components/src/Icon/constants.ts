import { iconNames } from "@knime/kds-styles/img/icons/def";
import { typeIconNames } from "@knime/kds-styles/img/type-icons/def";

import { sizes } from "../constants";

const iconSizes = sizes;
const dataTypeSizes = sizes.filter((size) => size !== "xsmall");

export { iconSizes, dataTypeSizes, iconNames, typeIconNames };
