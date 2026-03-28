export const kdsLoadingSkeletonItemShape = {
  TEXT: "text",
  LABEL: "label",
  ICON_LARGE: "icon-large",
  ICON_MEDIUM: "icon-medium",
  ICON_SMALL: "icon-small",
  BUTTON_LARGE: "button-large",
  BUTTON_MEDIUM: "button-medium",
  BUTTON_SMALL: "button-small",
  BUTTON_XSMALL: "button-xsmall",
  CARD: "card",
  INPUT_FIELD: "input-field",
} as const;

export const kdsLoadingSkeletonVariant = {
  ...kdsLoadingSkeletonItemShape,
  TEXT_HEADLINE_WITH_PARAGRAPH: "text-headline-with-paragraph",
  LIST_ITEM_LARGE: "list-item-large",
  LIST_ITEM_LARGE_WITH_SUBTEXT: "list-item-large-with-subtext",
  LIST_ITEM_SMALL: "list-item-small",
  LIST_ITEM_SMALL_WITH_SUBTEXT: "list-item-small-with-subtext",
} as const;

export const kdsLoadingSkeletonVariants = Object.values(
  kdsLoadingSkeletonVariant,
);
