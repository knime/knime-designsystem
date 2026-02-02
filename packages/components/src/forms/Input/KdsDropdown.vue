<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

import KdsDataType from "../../Icon/KdsDataType.vue";
import KdsButton from "../../buttons/KdsButton.vue";
import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import type {
  KdsDropdownEmits,
  KdsDropdownOption,
  KdsDropdownProps,
} from "./types";

const props = withDefaults(defineProps<KdsDropdownProps>(), {
  placeholder: "",
  disabled: false,
  required: false,
  error: false,
  validating: false,
  preserveSubTextSpace: false,
  searchable: true,
  noEntriesText: "No entries found",
  ariaLabel: undefined,
});

const emit = defineEmits<KdsDropdownEmits>();

const modelValue = defineModel<string | null>({ default: null });
const open = defineModel<boolean>("open", { default: false });

const generatedId = useId();
const inputId = computed(() => `${generatedId}-input`);
const labelId = computed(() => `${generatedId}-label`);
const subTextId = computed(() => `${generatedId}-subtext`);
const listboxId = computed(() => `${generatedId}-listbox`);

const optionId = (index: number) => `${generatedId}-option-${index}`;

const ariaLabelledby = computed(() =>
  props.label ? labelId.value : undefined,
);

const ariaDescribedby = computed(() =>
  props.subText || props.validating || props.preserveSubTextSpace
    ? subTextId.value
    : undefined,
);

const wrapperRef = ref<HTMLElement | null>(null);
const searchInputId = computed(() => `${generatedId}-search`);

const searchQuery = ref("");
const activeIndex = ref<number>(-1);
const draftValue = ref<string | null>(null);

type DropdownOptionWithMissing = KdsDropdownOption & { missing: boolean };

const optionsWithSyntheticMissing = computed<DropdownOptionWithMissing[]>(
  () => {
    const baseOptions = props.options.map((option) => ({
      ...option,
      missing: false,
    }));

    if (modelValue.value === null) {
      return baseOptions;
    }

    const hasSelected = props.options.some((o) => o.value === modelValue.value);
    if (hasSelected) {
      return baseOptions;
    }

    return [
      {
        value: modelValue.value,
        label: modelValue.value,
        missing: true,
      },
      ...baseOptions,
    ];
  },
);

const filteredOptions = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase();

  const base = optionsWithSyntheticMissing.value;
  if (!props.searchable || normalizedQuery.length === 0) {
    return base;
  }

  return base.filter((option) =>
    option.label.toLowerCase().includes(normalizedQuery),
  );
});

const draftOption = computed(() =>
  optionsWithSyntheticMissing.value.find((o) => o.value === draftValue.value),
);
const isMissingDraft = computed(() => Boolean(draftOption.value?.missing));

const inputDisplayValue = ref("");

const updateInputDisplayValue = () => {
  if (draftValue.value === null) {
    inputDisplayValue.value = "";
    return;
  }

  const label = draftOption.value?.label ?? "";
  inputDisplayValue.value = draftOption.value?.missing
    ? `(Missing) ${label}`.trim()
    : label;
};

const setActiveIndexToSelected = () => {
  const selectedIndex = filteredOptions.value.findIndex(
    (o) => o.value === draftValue.value,
  );
  activeIndex.value = selectedIndex >= 0 ? selectedIndex : 0;
};

const openDropdown = () => {
  if (props.disabled) {
    return;
  }

  if (open.value) {
    return;
  }

  draftValue.value = modelValue.value;
  updateInputDisplayValue();
  open.value = true;

  nextTick(() => {
    searchQuery.value = "";
    setActiveIndexToSelected();

    if (props.searchable) {
      const searchEl = document.getElementById(searchInputId.value);
      if (searchEl) {
        searchEl.focus();
        return;
      }
    }

    const triggerEl = document.getElementById(inputId.value);
    triggerEl?.focus();
  });
};

const closeDropdown = () => {
  if (!open.value) {
    return;
  }

  open.value = false;
  searchQuery.value = "";
  activeIndex.value = -1;
};

const commitSelection = (value: string | null) => {
  modelValue.value = value;
  emit("change", value);
};

const revertDraft = () => {
  draftValue.value = modelValue.value;
  updateInputDisplayValue();
};

const toggle = () => {
  if (open.value) {
    closeDropdown();
    revertDraft();
    return;
  }
  openDropdown();
};

watch(
  () => open.value,
  (isOpen) => {
    if (isOpen) {
      draftValue.value = modelValue.value;
      updateInputDisplayValue();
      setActiveIndexToSelected();
    } else {
      draftValue.value = modelValue.value;
      updateInputDisplayValue();
    }
  },
);

watch(
  () => modelValue.value,
  () => {
    if (open.value) {
      return;
    }
    draftValue.value = modelValue.value;
    updateInputDisplayValue();
  },
  { immediate: true },
);

watch(
  () => filteredOptions.value,
  () => {
    if (!open.value) {
      return;
    }

    if (filteredOptions.value.length === 0) {
      activeIndex.value = -1;
      return;
    }

    if (
      activeIndex.value < 0 ||
      activeIndex.value >= filteredOptions.value.length
    ) {
      activeIndex.value = 0;
    }
  },
);

onClickOutside(wrapperRef, () => {
  if (!open.value) {
    return;
  }
  closeDropdown();
  revertDraft();
});

const moveActive = (delta: number) => {
  if (filteredOptions.value.length === 0) {
    return;
  }

  const nextIndex = activeIndex.value < 0 ? 0 : activeIndex.value + delta;
  const max = filteredOptions.value.length - 1;

  activeIndex.value = Math.min(Math.max(nextIndex, 0), max);
};

const setActiveToEdge = (edge: "start" | "end") => {
  if (filteredOptions.value.length === 0) {
    return;
  }

  activeIndex.value = edge === "start" ? 0 : filteredOptions.value.length - 1;
};

const selectActive = () => {
  if (activeIndex.value < 0) {
    return;
  }

  const option = filteredOptions.value[activeIndex.value];
  if (!option || option.disabled) {
    return;
  }

  draftValue.value = option.value;
  updateInputDisplayValue();
};

const onTriggerKeydown = (event: KeyboardEvent) => {
  if (props.disabled) {
    return;
  }

  if (!open.value) {
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      openDropdown();
    }
    return;
  }

  switch (event.key) {
    case "Escape":
      event.preventDefault();
      closeDropdown();
      revertDraft();
      break;

    case "Tab":
      closeDropdown();
      revertDraft();
      break;

    case "ArrowDown":
      event.preventDefault();
      moveActive(1);
      break;

    case "ArrowUp":
      event.preventDefault();
      moveActive(-1);
      break;

    case "Home":
      event.preventDefault();
      setActiveToEdge("start");
      break;

    case "End":
      event.preventDefault();
      setActiveToEdge("end");
      break;

    case " ":
      event.preventDefault();
      selectActive();
      break;

    case "Enter":
      event.preventDefault();
      commitSelection(draftValue.value);
      closeDropdown();
      break;

    default:
      break;
  }
};

const onOptionClick = (option: DropdownOptionWithMissing) => {
  if (option.disabled) {
    return;
  }

  commitSelection(option.value);
  closeDropdown();
};

const onDeleteMissing = () => {
  commitSelection(null);
  closeDropdown();
};

const ariaActiveDescendant = computed(() => {
  if (!open.value || activeIndex.value < 0) {
    return undefined;
  }
  return optionId(activeIndex.value);
});
</script>

<template>
  <div ref="wrapperRef" class="dropdown">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />

    <div class="trigger">
      <KdsBaseInput
        :id="inputId"
        v-model="inputDisplayValue"
        type="text"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="true"
        :required="props.required"
        :error="props.error"
        :validating="props.validating"
        :text-color="isMissingDraft ? 'danger' : 'neutral'"
        :aria-label="props.label ? undefined : props.ariaLabel"
        :aria-labelledby="ariaLabelledby"
        :aria-describedby="ariaDescribedby"
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        :aria-expanded="open"
        :aria-controls="listboxId"
        :aria-activedescendant="ariaActiveDescendant"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keydown="onTriggerKeydown"
        @click="toggle"
      >
        <template #trailing>
          <KdsButton
            type="button"
            size="xsmall"
            variant="transparent"
            :leading-icon="open ? 'chevron-up' : 'chevron-down'"
            :aria-label="open ? 'Close' : 'Open'"
            :title="open ? 'Close' : 'Open'"
            @click.stop="toggle"
          />
        </template>
      </KdsBaseInput>

      <div v-if="open" class="popover" :style="{ width: '100%' }">
        <div v-if="props.searchable" class="sticky-top">
          <KdsBaseInput
            :id="searchInputId"
            v-model="searchQuery"
            type="search"
            placeholder="Search"
            leading-icon="search"
            :clearable="true"
            :aria-label="'Search'"
            @keydown="onTriggerKeydown"
            @click.stop
          />
        </div>

        <ul
          :id="listboxId"
          class="list"
          role="listbox"
          :aria-labelledby="ariaLabelledby"
          @click.stop
        >
          <li
            v-if="filteredOptions.length === 0"
            class="empty"
            aria-disabled="true"
          >
            {{ props.noEntriesText }}
          </li>

          <li
            v-for="(option, index) in filteredOptions"
            :id="optionId(index)"
            :key="option.value"
            role="option"
            :aria-selected="draftValue === option.value"
            :aria-disabled="option.disabled"
            :class="{
              option: true,
              active: index === activeIndex,
              selected: draftValue === option.value,
              disabled: option.disabled,
              missing: option.missing,
            }"
            @mouseenter="activeIndex = index"
            @click="onOptionClick(option)"
          >
            <div class="option-content">
              <KdsDataType
                v-if="option.dataTypeIconName"
                size="small"
                :icon-name="option.dataTypeIconName"
              />

              <span v-if="option.missing" class="missing-label">(Missing)</span>
              <span class="label">{{ option.label }}</span>
            </div>

            <KdsButton
              v-if="option.missing && option.value === modelValue"
              type="button"
              size="xsmall"
              variant="transparent"
              leading-icon="trash"
              aria-label="Remove missing selection"
              title="Remove"
              @click.stop="onDeleteMissing"
            />
          </li>
        </ul>
      </div>
    </div>

    <KdsSubText
      :id="subTextId"
      :sub-text="props.subText"
      :error="props.error"
      :validating="props.validating"
      :preserve-sub-text-space="props.preserveSubTextSpace"
    />
  </div>
</template>

<style scoped src="./KdsDropdown.css"></style>
