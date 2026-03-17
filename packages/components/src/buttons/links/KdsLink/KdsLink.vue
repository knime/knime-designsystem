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
  title: propTitle = undefined,
  disabled = false,
  download = undefined,
  target = null,
  rel = null,
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
    return "document" as const;
  }

  return inferVariantFromTo(to);
});

const effectiveTarget = computed(
  () => target ?? (variant.value === "external" ? "_blank" : undefined),
);

const effectiveTitle = computed(() => propTitle ?? label);

const title = computed(() => {
  const baseTitle = effectiveTitle.value.trim();
  if (!baseTitle) {
    return undefined;
  }

  if (variant.value === "external") {
    return effectiveTarget.value === "_blank"
      ? `${baseTitle} (opens in a new tab)`
      : baseTitle;
  }

  if (variant.value === "document") {
    return `Download ${baseTitle}`;
  }

  return `Open ${baseTitle}`;
});

function resolveRel(target: string | undefined) {
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
}

const mappedComponent = computed<string | Component>(() => {
  if (disabled) {
    return "span";
  }

  return linkComponent;
});

const mappedTo = computed(() => (disabled ? undefined : to));

const mappedTarget = computed(() =>
  disabled ? undefined : effectiveTarget.value,
);

const mappedRel = computed(() =>
  disabled ? undefined : resolveRel(effectiveTarget.value),
);

const normalizedFileSize = computed(() => {
  if (fileSize === undefined) {
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
    :is="mappedComponent"
    :class="['kds-link', `type-${variant}`, { disabled }]"
    :to="mappedTo"
    :download="disabled ? undefined : download"
    :target="mappedTarget"
    :rel="mappedRel"
    :title="title"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="onClick"
  >
    <span class="label">{{ label }}</span>
    <KdsIcon v-if="variant === 'external'" name="external-link" size="xsmall" />
    <span v-if="variant === 'document' && normalizedFileSize" class="file-size">
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

  &.type-internal {
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

  &.type-external {
    gap: var(--kds-spacing-container-0-12x);
  }

  &:is(.type-external, .type-document) {
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
