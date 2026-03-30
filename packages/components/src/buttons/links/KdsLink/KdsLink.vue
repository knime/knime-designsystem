<script setup lang="ts">
import { type Component, computed } from "vue";
import prettyBytes from "pretty-bytes";

import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";
import { resolveNuxtLinkComponent } from "../../../util/nuxtComponentResolver";

import type { KdsLinkProps } from "./types";

const {
  label,
  to,
  fileSize,
  title,
  disabled = false,
  download = false,
  target,
  rel,
} = defineProps<KdsLinkProps>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const linkComponent = resolveNuxtLinkComponent();

function inferVariantFromTo(to: KdsLinkProps["to"]): "internal" | "external" {
  const normalized = to.trim();
  if (!normalized) {
    return "internal";
  }

  if (
    normalized.startsWith("#") ||
    (normalized.startsWith("/") && !normalized.startsWith("//")) ||
    normalized.startsWith("./") ||
    normalized.startsWith("../") ||
    normalized.startsWith("?")
  ) {
    return "internal";
  }

  return "external";
}

const variant = computed(() => {
  if (download || fileSize !== undefined) {
    return "document";
  }

  return inferVariantFromTo(to);
});

const effectiveTarget = computed(
  () => target ?? (variant.value === "external" ? "_blank" : undefined),
);

const effectiveTitle = computed(() => {
  const baseTitle = (title ?? label).trim();
  if (!baseTitle) {
    return undefined;
  }

  if (variant.value === "external") {
    return effectiveTarget.value === "_blank"
      ? `${baseTitle} (opens in a new tab)`
      : baseTitle;
  }

  if (download === true) {
    return `Download ${baseTitle}`;
  }

  return `Open ${baseTitle}`;
});

const component = computed<string | Component>(() => {
  if (disabled) {
    return "span";
  }

  return linkComponent;
});

const effectiveTo = computed(() => (disabled ? undefined : to));

const effectiveRel = computed(() => {
  if (target !== "_blank") {
    return rel ?? undefined;
  }

  if (!rel) {
    return "noopener noreferrer";
  }

  const relTokens = rel.split(/\s+/).filter(Boolean);
  if (!relTokens.includes("noopener")) {
    relTokens.push("noopener");
  }
  if (!relTokens.includes("noreferrer")) {
    relTokens.push("noreferrer");
  }

  return relTokens.join(" ");
});

const normalizedFileSize = computed(() => {
  if (
    typeof fileSize !== "number" ||
    !Number.isFinite(fileSize) ||
    fileSize < 0
  ) {
    return "";
  }

  const formattedFileSize = prettyBytes(fileSize);
  if (!formattedFileSize) {
    return "";
  }

  return `\u00a0(${formattedFileSize})`;
});

function onClick(event: MouseEvent) {
  if (disabled) {
    event.preventDefault();
    return;
  }

  emit("click", event);
}
</script>

<template>
  <Component
    :is="component"
    :class="['kds-link', `variant-${variant}`, { disabled }]"
    :to="effectiveTo"
    :download="disabled ? undefined : download"
    :target="effectiveTarget"
    :rel="effectiveRel"
    :title="effectiveTitle"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="onClick"
  >
    <span class="label">{{ label }}</span>
    <KdsIcon v-if="variant === 'external'" name="external-link" size="xsmall" />
    <span v-if="normalizedFileSize" class="file-size">
      {{ normalizedFileSize }}
    </span>
  </Component>
</template>

<style scoped>
.kds-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  padding: var(--kds-spacing-container-none) var(--kds-spacing-container-0-10x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;
  text-decoration-line: underline;
  border-radius: var(--kds-border-radius-container-0-12x);

  &:is(a) {
    cursor: pointer;
  }

  &:focus-visible {
    outline: var(--kds-border-action-focused);
    outline-offset: var(--kds-spacing-container-none);
  }

  & .label,
  & .file-size {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.variant-internal {
    color: var(--kds-color-text-and-icon-neutral);

    &:not(.disabled) {
      &:visited {
        color: var(--kds-color-text-and-icon-info);
      }

      &:hover {
        background-color: var(--kds-color-background-neutral-hover);
      }

      &:active {
        background-color: var(--kds-color-background-neutral-active);
      }
    }
  }

  &.variant-external {
    gap: var(--kds-spacing-container-0-12x);
  }

  &:is(.variant-external, .variant-document) {
    color: var(--kds-color-text-and-icon-selected);

    &:not(.disabled) {
      &:visited {
        color: var(--kds-color-text-and-icon-info);
      }

      &:hover {
        color: var(--kds-color-text-and-icon-primary-inverted);
        background-color: var(--kds-color-background-primary-bold-hover);
      }

      &:active {
        color: var(--kds-color-text-and-icon-selected-inverted);
        background-color: var(--kds-color-background-primary-bold-active);
      }
    }
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    pointer-events: none;
    cursor: default;
  }
}
</style>
