export const kdsLoadingSkeletonVariant = {
  DEFAULT: "default",
  TEXT_DEFAULT: "text-default",
  TEXT_HEADLINE_WITH_PARAGRAPH: "text-headline-with-paragraph",
  ICON_LARGE: "icon-large",
  ICON_MEDIUM: "icon-medium",
  ICON_SMALL: "icon-small",
  BUTTON_LARGE: "button-large",
  BUTTON_MEDIUM: "button-medium",
  BUTTON_SMALL: "button-small",
  BUTTON_XSMALL: "button-xsmall",
  INPUT_FIELD: "input-field",
  LIST_ITEM_LARGE: "list-item-large",
  LIST_ITEM_LARGE_WITH_SUBTEXT: "list-item-large-with-subtext",
  LIST_ITEM_SMALL: "list-item-small",
  LIST_ITEM_SMALL_WITH_SUBTEXT: "list-item-small-with-subtext",
  CARD_DEFAULT: "card-default",
  COMBINED: "combined",
} as const;

export const kdsLoadingSkeletonVariants = Object.values(
  kdsLoadingSkeletonVariant,
);
