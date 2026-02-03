<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";

import KdsButton from "../../buttons/KdsButton.vue";
import KdsLabel from "../KdsLabel.vue";
import KdsSubText from "../KdsSubText.vue";

import KdsBaseInput from "./BaseInput.vue";
import KdsDropdownContainer from "./Dropdown/KdsDropdownContainer.vue";
import KdsListContainer from "./Dropdown/KdsListContainer.vue";
import KdsListItem from "./Dropdown/KdsListItem.vue";
import type { KdsDropdownContainerExposed } from "./Dropdown/types";
import KdsSearchInput from "./KdsSearchInput.vue";
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
  noEntriesText: "No entries found",
});

const emit = defineEmits<KdsDropdownEmits>();

const modelValue = defineModel<string | null>({ default: null });
const open = ref(false);

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

const dropdownContainerRef = ref<KdsDropdownContainerExposed | null>(null);

const anchorName = computed(() => `--kds-dropdown-${generatedId}`);

const showNativePopover = () => {
  dropdownContainerRef.value?.showPopover();
};

const hideNativePopover = () => {
  dropdownContainerRef.value?.hidePopover();
};
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

    const hasSelected = props.options.some((o) => o.id === modelValue.value);
    if (hasSelected) {
      return baseOptions;
    }

    return [
      {
        id: modelValue.value,
        text: modelValue.value,
        missing: true,
      },
      ...baseOptions,
    ];
  },
);

const filteredOptions = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase();

  const base = optionsWithSyntheticMissing.value;
  if (normalizedQuery.length === 0) {
    return base;
  }

  return base.filter((option) =>
    option.text.toLowerCase().includes(normalizedQuery),
  );
});

const draftOption = computed(() =>
  optionsWithSyntheticMissing.value.find((o) => o.id === draftValue.value),
);
const isMissingDraft = computed(() => Boolean(draftOption.value?.missing));

const inputDisplayValue = ref("");

const updateInputDisplayValue = () => {
  if (draftValue.value === null) {
    inputDisplayValue.value = "";
    return;
  }

  const label = draftOption.value?.text ?? "";
  inputDisplayValue.value = draftOption.value?.missing
    ? `(Missing) ${label}`.trim()
    : label;
};

const setActiveIndexToSelected = () => {
  const selectedIndex = filteredOptions.value.findIndex(
    (o) => o.id === draftValue.value,
  );
  activeIndex.value = selectedIndex >= 0 ? selectedIndex : 0;
};

const openDropdown = (initialSearchQuery?: string) => {
  if (props.disabled) {
    return;
  }

  if (open.value) {
    return;
  }

  draftValue.value = modelValue.value;
  updateInputDisplayValue();

  if (initialSearchQuery === undefined) {
    searchQuery.value = "";
    setActiveIndexToSelected();
  } else {
    searchQuery.value = initialSearchQuery;
    activeIndex.value = 0;
  }

  open.value = true;
  showNativePopover();

  nextTick(() => {
    const triggerEl = document.getElementById(inputId.value);
    triggerEl?.focus();
  });
};

const closeDropdown = () => {
  if (!open.value) {
    return;
  }

  hideNativePopover();
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
    if (open.value === false) {
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

function moveActive(delta: number) {
  if (filteredOptions.value.length === 0) {
    return;
  }

  const nextIndex = activeIndex.value < 0 ? 0 : activeIndex.value + delta;
  const max = filteredOptions.value.length - 1;

  activeIndex.value = Math.min(Math.max(nextIndex, 0), max);
}

function setActiveToEdge(edge: "start" | "end") {
  if (filteredOptions.value.length === 0) {
    return;
  }

  activeIndex.value = edge === "start" ? 0 : filteredOptions.value.length - 1;
}

function selectActive() {
  if (activeIndex.value < 0) {
    return;
  }

  const option = filteredOptions.value[activeIndex.value];
  if (!option || option.disabled) {
    return;
  }

  draftValue.value = option.id;
  updateInputDisplayValue();
}

function commitActiveOrDraftAndClose() {
  const option = filteredOptions.value[activeIndex.value];
  if (option && !option.disabled) {
    commitSelection(option.id);
  } else {
    commitSelection(draftValue.value);
  }
  closeDropdown();
}

function isPrintableKey(event: KeyboardEvent) {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return false;
  }
  return event.key.length === 1;
}

function handleClosedKeydown(event: KeyboardEvent) {
  if (isPrintableKey(event)) {
    event.preventDefault();
    openDropdown(event.key);
    return;
  }

  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openDropdown();
  }
}

function handleSearchFieldKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      moveActive(1);
      break;

    case "ArrowUp":
      event.preventDefault();
      moveActive(-1);
      break;

    case "Enter":
      event.preventDefault();
      commitActiveOrDraftAndClose();
      break;

    case "Tab":
      closeDropdown();
      revertDraft();
      break;

    default:
      break;
  }
}

function handleOpenTriggerKeydown(event: KeyboardEvent) {
  if (event.key === "Backspace") {
    if (searchQuery.value.length > 0) {
      event.preventDefault();
      searchQuery.value = searchQuery.value.slice(0, -1);
    }
    return;
  }

  if (isPrintableKey(event)) {
    event.preventDefault();
    searchQuery.value += event.key;
    if (activeIndex.value < 0) {
      activeIndex.value = 0;
    }
    return;
  }

  switch (event.key) {
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
      commitActiveOrDraftAndClose();
      break;

    default:
      break;
  }
}

const onTriggerKeydown = (event: KeyboardEvent) => {
  if (props.disabled) {
    return;
  }

  const target = event.target as HTMLElement | null;
  const isSearchField = target?.id === searchInputId.value;

  if (open.value === false) {
    handleClosedKeydown(event);
    return;
  }

  if (isSearchField) {
    handleSearchFieldKeydown(event);
    return;
  }

  handleOpenTriggerKeydown(event);
};

const onOptionClick = (option: DropdownOptionWithMissing) => {
  if (option.disabled) {
    return;
  }

  commitSelection(option.id);
  closeDropdown();
};

const onDeleteMissing = () => {
  commitSelection(null);
  closeDropdown();
};

const ariaActiveDescendant = computed(() => {
  return open.value && activeIndex.value >= 0
    ? optionId(activeIndex.value)
    : undefined;
});

const onPopoverToggle = (event: Event) => {
  const toggleEvent = event as Event & { newState?: "open" | "closed" };
  if (toggleEvent.newState === "open") {
    if (open.value) {
      return;
    }

    open.value = true;
    draftValue.value = modelValue.value;
    updateInputDisplayValue();
    searchQuery.value = "";
    setActiveIndexToSelected();
    return;
  }

  if (toggleEvent.newState === "closed") {
    open.value = false;
    searchQuery.value = "";
    activeIndex.value = -1;
    revertDraft();
  }
};
</script>

<template>
  <div class="dropdown">
    <KdsLabel
      v-if="props.label"
      :id="labelId"
      :for="inputId"
      :label="props.label"
    />

    <div class="trigger" :style="{ 'anchor-name': anchorName }">
      <KdsBaseInput
        :id="inputId"
        v-model="inputDisplayValue"
        type="text"
        :placeholder="props.placeholder"
        :trailing-icon="open ? 'chevron-up' : 'chevron-down'"
        :disabled="props.disabled"
        as="button"
        :readonly="true"
        :required="props.required"
        :error="props.error"
        :validating="props.validating"
        :text-color="isMissingDraft ? 'danger' : 'neutral'"
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
      />

      <KdsDropdownContainer
        ref="dropdownContainerRef"
        :anchor-name="anchorName"
        @toggle="onPopoverToggle"
      >
        <template #stickyTop>
          <KdsSearchInput
            :id="searchInputId"
            v-model="searchQuery"
            placeholder="Search"
            @keydown="onTriggerKeydown"
          />
        </template>

        <KdsListContainer
          :id="listboxId"
          :aria-labelledby="ariaLabelledby"
          :empty="filteredOptions.length === 0"
          :empty-text="props.noEntriesText"
        >
          <KdsListItem
            v-for="(option, index) in filteredOptions"
            :id="optionId(index)"
            :key="option.id"
            :text="option.text"
            :leading-icon="option.leadingIcon"
            :missing="option.missing"
            :disabled="option.disabled"
            :active="index === activeIndex"
            :selected="draftValue === option.id"
            @mouseenter="activeIndex = index"
            @click="onOptionClick(option)"
          >
            <template
              v-if="option.missing && option.id === modelValue"
              #trailing
            >
              <KdsButton
                leading-icon="trash"
                aria-label="Remove missing selection"
                title="Remove"
                variant="transparent"
                destructive
                @click="onDeleteMissing"
              />
            </template>
          </KdsListItem>
        </KdsListContainer>
      </KdsDropdownContainer>
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

<style scoped>
.dropdown {
  display: flex;
  flex-direction: column;
}

.trigger {
  position: relative;
}
</style>
