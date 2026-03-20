import { computed } from "vue";

import type { KdsLoadingSkeletonProps } from "./types";

type Variant = NonNullable<KdsLoadingSkeletonProps["variant"]>;

const defaultWidth = "100%";
const defaultHeight = "var(--kds-spacing-container-1-25x)";
const defaultVariant: Variant = "default";
const defaultRepeat = 1;
const defaultBorderRadius = "var(--kds-border-radius-container-pill)";

const presetClassByVariant: Partial<Record<Variant, string>> = {
  "button-large": "button-preset-large",
  "button-medium": "button-preset-medium",
  "button-small": "button-preset-small",
  "button-xsmall": "button-preset-xsmall",
  "icon-large": "icon-preset-large",
  "icon-medium": "icon-preset-medium",
  "icon-small": "icon-preset-small",
  "text-default": "text-preset-default",
  "card-default": "card-preset-default",
};

export const useKdsLoadingSkeleton = (props: KdsLoadingSkeletonProps) => {
  const width = computed(() => props.width ?? defaultWidth);
  const height = computed(() => props.height ?? defaultHeight);
  const variant = computed<Variant>(() => props.variant ?? defaultVariant);
  const loading = computed(() => props.loading ?? true);
  const repeat = computed(() => props.repeat ?? defaultRepeat);
  const repeatGap = computed(() => props.repeatGap);

  const sizeMultiplier = computed(() =>
    props.size && props.size > 0 && Number.isFinite(props.size)
      ? props.size
      : 1,
  );

  const scaledLength = (value: string) =>
    sizeMultiplier.value === 1
      ? value
      : `calc(${value} * ${sizeMultiplier.value})`;

  const isVariant = (variantToCheck: Variant) =>
    variant.value === variantToCheck;

  const presetClass = computed(
    () => presetClassByVariant[variant.value] ?? null,
  );
  const borderRadiusVar = computed(() => props.borderRadius?.trim());

  const styles = computed(() => {
    const hasPreset =
      Boolean(presetClass.value) || isVariant("text-headline-with-paragraph");

    return {
      ...(borderRadiusVar.value
        ? { "--kds-loading-skeleton-border-radius": borderRadiusVar.value }
        : {}),
      width: hasPreset ? "" : scaledLength(width.value),
      height: hasPreset ? "" : scaledLength(height.value),
      borderRadius:
        borderRadiusVar.value ?? (hasPreset ? "" : defaultBorderRadius),
    };
  });

  const repeatContainerStyles = computed(() => ({
    ...(borderRadiusVar.value
      ? { "--kds-loading-skeleton-border-radius": borderRadiusVar.value }
      : {}),
    gap: repeat.value > 1 ? repeatGap.value : "0px",
  }));

  const contentWidthStyles = computed(() => ({
    width: scaledLength(width.value),
  }));

  const combinedLayoutStyles = computed(() => {
    const combinedStyles: Record<string, string> = {
      width: scaledLength(width.value),
    };

    if (props.height !== undefined) {
      combinedStyles["--kds-loading-skeleton-combined-icon-size"] =
        scaledLength(height.value);
      combinedStyles["--kds-loading-skeleton-combined-line-height"] =
        scaledLength(height.value);
    }

    return combinedStyles;
  });

  return {
    combinedLayoutStyles,
    contentWidthStyles,
    isVariant,
    loading,
    presetClass,
    repeat,
    repeatContainerStyles,
    sizeMultiplier,
    styles,
  };
};
