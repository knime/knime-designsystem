<script setup lang="ts">
import { type Component, computed } from "vue";

import KdsIcon from "../../../accessories/Icon/KdsIcon.vue";
import { resolveNuxtLinkComponent } from "../../../util/nuxtComponentResolver";

import type { KdsLinkProps } from "./types";

const props = withDefaults(defineProps<KdsLinkProps>(), {
  title: undefined,
  disabled: false,
  download: undefined,
  target: null,
  rel: null,
});

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

const variant = computed(() => props.variant ?? inferVariantFromTo(props.to));

const effectiveTarget = computed(
  () => props.target ?? (variant.value === "external" ? "_blank" : undefined),
);

const effectiveTitle = computed(() => props.title ?? props.label);

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
    return props.rel ?? undefined;
  }

  if (!props.rel) {
    return "noopener noreferrer";
  }

  const relTokens = props.rel.split(/\s+/).filter(Boolean);
  if (!relTokens.includes("noopener")) {
    relTokens.push("noopener");
  }
  if (!relTokens.includes("noreferrer")) {
    relTokens.push("noreferrer");
  }

  return relTokens.join(" ");
}

type MappedAttributes = {
  component: string | Component;
  to?: KdsLinkProps["to"];
  target?: string;
  rel?: string;
};

const mappedAttributes = computed<MappedAttributes>(() => {
  if (props.disabled) {
    return {
      component: "span",
    };
  }

  const target = effectiveTarget.value;
  const rel = resolveRel(target);

  return {
    component: linkComponent,
    to: props.to,
    target,
    rel,
  };
});

const normalizedFileSize = computed(() => {
  if (!props.fileSize) {
    return "";
  }

  const rawValue = props.fileSize.trim();
  if (!rawValue) {
    return "";
  }

  const withoutBrackets = rawValue.replace(/^\(+|\)+$/g, "");
  return `\u00a0(${withoutBrackets})`;
});

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit("click", event);
}
</script>

<template>
  <Component
    :is="mappedAttributes.component"
    :class="['kds-link', `type-${variant}`, { disabled: props.disabled }]"
    :to="mappedAttributes.to"
    :download="props.disabled ? undefined : props.download"
    :target="mappedAttributes.target"
    :rel="mappedAttributes.rel"
    :title="title"
    :aria-disabled="props.disabled ? 'true' : undefined"
    @click="onClick"
  >
    <span class="label">{{ props.label }}</span>
    <KdsIcon v-if="variant === 'external'" name="external-link" size="xsmall" />
    <span v-if="variant === 'document' && normalizedFileSize" class="file-size">
      {{ normalizedFileSize }}
    </span>
  </Component>
</template>

<style scoped>
.kds-link {
  position: relative;
  display: inline-flex;
  gap: var(--kds-spacing-container-none);
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  padding: var(--kds-spacing-container-none) var(--kds-spacing-container-0-10x);
  font: var(--kds-font-base-body-small);
  color: var(--kds-color-text-and-icon-neutral);
  white-space: nowrap;
  text-decoration-line: underline;
  text-decoration-thickness: from-font;
  text-decoration-skip-ink: none;
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

    &:not(.disabled):hover {
      background-color: var(--kds-color-background-neutral-hover);
    }

    &:not(.disabled):active {
      background-color: var(--kds-color-background-neutral-active);
    }

    &:visited:not(.disabled) {
      color: var(--kds-color-text-and-icon-info);
    }
  }

  &.type-external {
    gap: var(--kds-spacing-container-0-12x);
  }

  &:is(.type-external, .type-document) {
    color: var(--kds-color-text-and-icon-selected);

    &:not(.disabled):hover {
      color: var(--kds-color-text-and-icon-primary-inverted);
      background-color: var(--kds-color-background-primary-bold-hover);
    }

    &:not(.disabled):active {
      color: var(--kds-color-text-and-icon-selected-inverted);
      background-color: var(--kds-color-background-primary-bold-active);
    }
  }

  &.disabled {
    color: var(--kds-color-text-and-icon-disabled);
    text-decoration: none;
    pointer-events: none;
    cursor: default;
  }
}
</style>
