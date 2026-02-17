export type KdsCardVariant = "filled" | "outlined" | "transparent";

export type KdsCardAriaProps =
  | {
      /**
       * Accessible label for the card. Use this when providing a simple text label.
       * Either ariaLabel or ariaLabelledby must be provided, but not both.
       */
      ariaLabel: string;
      /**
       * ID of an element that labels the card. Use this when the label already exists elsewhere in the DOM.
       * Either ariaLabel or ariaLabelledby must be provided, but not both.
       */
      ariaLabelledby?: never;
    }
  | {
      ariaLabel?: never;
      ariaLabelledby: string;
    };

/**
 * Props for KdsCard component.
 *
 * **Important Usage Note**: Due to TypeScript limitations with discriminated unions in Vue templates,
 * you must use `v-bind` with a properly typed object. Direct prop binding (even with hardcoded values)
 * will cause type errors because Vue's template compiler cannot narrow discriminated unions.
 *
 * @example
 * // ✅ Correct: Use v-bind with a typed object
 * const cardProps: KdsCardProps = {
 *   variant: "filled",
 *   ariaLabel: "My card"
 * };
 * <KdsCard v-bind="cardProps">
 *   <div>Content</div>
 * </KdsCard>
 *
 * @example
 * // ✅ Correct: In wrapper components, use computed with typed object
 * const cardProps = computed(() => {
 *   const base = { variant: props.variant, selectable: props.selectable };
 *   return props.ariaLabel
 *     ? { ...base, ariaLabel: props.ariaLabel } as KdsCardProps
 *     : { ...base, ariaLabelledby: props.ariaLabelledby! } as KdsCardProps;
 * });
 * <KdsCard v-bind="cardProps" />
 *
 * @example
 * // ❌ Incorrect: Direct prop binding causes type errors
 * <KdsCard aria-label="My card" variant="filled">
 *   <div>Content</div>
 * </KdsCard>
 *
 * @example
 * // ❌ Incorrect: Even forwarding individual props causes type errors
 * <KdsCard :aria-label="ariaLabel" :aria-labelledby="ariaLabelledby" />
 */
export type KdsCardProps = {
  /**
   * The visual style of the card container
   */
  variant?: KdsCardVariant;
  /**
   * Whether the card can be selected
   */
  selectable?: boolean;
  /**
   * Whether the card is disabled. When disabled, the card cannot be clicked or focused.
   */
  disabled?: boolean;
} & KdsCardAriaProps;

/**
 * Type testers
 */

// supports ariaLabel
propTypeTester<KdsCardProps>({ ariaLabel: "Card label" });

// supports ariaLabelledby
propTypeTester<KdsCardProps>({ ariaLabelledby: "label-id" });

// supports both base props and ariaLabel
propTypeTester<KdsCardProps>({
  variant: "filled",
  selectable: true,
  disabled: false,
  ariaLabel: "Card label",
});

// @ts-expect-error - should not allow both ariaLabel and ariaLabelledby
propTypeTester<KdsCardProps>({
  ariaLabel: "Card label",
  ariaLabelledby: "label-id",
});

// @ts-expect-error - should require either ariaLabel or ariaLabelledby
propTypeTester<KdsCardProps>({ variant: "filled" });
