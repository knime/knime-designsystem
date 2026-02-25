import { h, markRaw } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsButton from "../../buttons/KdsButton/KdsButton.vue";
import { convertImportsInSfc } from "../../test-utils/convertImportsInSfc";
import { convertStoryCodeToSfc } from "../../test-utils/convertStoryCodeToSfc";

import DemoCustomComponent from "./DemoCustomComponent.vue";
import DemoCustomComponentSource from "./DemoCustomComponent.vue?raw";
import KdsDynamicModalProvider from "./KdsDynamicModalProvider.vue";
import { useKdsDynamicModal } from "./useKdsDynamicModal";

const scriptExample = `
<script setup lang="ts">
import { useKdsDynamicModal } from "@knime/kds-components";

const { askConfirmation } = useKdsDynamicModal();
const result = await askConfirmation({ title: "Confirm", message: "A question for you." });

if (result.confirmed) {
  // do your thing
}
</script>
`.trim();

const templateExample = `
<template>
  <KdsDynamicModalProvider />
</template>
`.trim();

const meta: Meta<typeof KdsDynamicModalProvider> = {
  title: "Overlays/useDynamicModal",
  component: KdsDynamicModalProvider,
  parameters: {
    docs: {
      source: {
        type: "code",
        language: "html",
        transform: async (source: string) => {
          const result = await convertStoryCodeToSfc(source);
          return result;
        },
      },
      description: {
        component:
          "KdsDynamicModalProvider component should only be used via the `useKdsDynamicModal()` composable. It is required " +
          "to put the `<KdsDynamicModalProvider />` tag somewhere global in your application, ideally as a child of `<body>`. " +
          "If you use Nuxt it makes sense to put it between `<ClientOnly></ClientOnly>` to avoid SSR problems. " +
          "\n#### Example usage\n" +
          `\`\`\`html\n${scriptExample}\`\`\`` +
          "Somewhere in your app, state is shared via  useKdsDynamicModal\n" +
          `\`\`\`html\n${templateExample}\`\`\``,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof KdsDynamicModalProvider>;

export const Confirmation: Story = {
  render: (args) => ({
    /* useKdsDynamicModal is added for source code generation */
    components: {
      KdsDynamicModalProvider,
      KdsButton,
      useKdsDynamicModal,
    },
    setup() {
      const { askConfirmation } = useKdsDynamicModal();

      const showModal = () => {
        askConfirmation({
          title: "Sure?",
          message: "Are you sure?",
          doNotAskAgain: {
            label: "Do not ask again",
            subText: "Can be changed in the settings.",
          },
          buttons: [
            {
              type: "cancel",
              label: "Nay",
              variant: "transparent",
              flushLeft: true,
            },
            {
              type: "confirm",
              label: "Maybe",
              variant: "outlined",
              autofocus: true,
              customHandler: () => {
                alert("Think again…");
              },
            },
            { type: "confirm", label: "Sure thing", variant: "filled" },
          ],
        });
      };
      return {
        args,
        showModal,
      };
    },
    template: `
    <KdsButton
      label="Show confirm"
      variant="filled"
      @click="showModal"
    />
    <!-- put this somewhere global like app.vue -->
    <KdsDynamicModalProvider />
  `,
  }),
  args: {},
};

export const ConfirmationWithTemplate: Story = {
  render: (args) => ({
    components: { KdsDynamicModalProvider, KdsButton },
    setup() {
      const { askConfirmation } = useKdsDynamicModal();

      const showModal = () => {
        askConfirmation({
          title: "Can you see this?",
          icon: "list-bulletpoint",
          closedby: "any",
          component: h("div", [
            h("h3", "A Headline"),
            h("p", [
              "This is some ",
              h("b", "bold"),
              " text. Just supply a VNode as component.",
            ]),
          ]),
        });
      };
      return {
        args,
        showModal,
      };
    },
    template: `
    <KdsButton
      label="Confirmation template based"
      variant="filled"
      @click="showModal"
    />
    <!-- put this somewhere global like app.vue -->
    <KdsDynamicModalProvider />
  `,
  }),
  args: {},
};

export const WithCustomComponentAndLayout: Story = {
  parameters: {
    docs: {
      source: {
        type: "code",
        language: "html",
        transform: async (source: string) => {
          const result = await convertStoryCodeToSfc(source);
          return `${result}\n<!--  DemoCustomComponent.vue -->\n${convertImportsInSfc(DemoCustomComponentSource)}`;
        },
      },
    },
  },
  render: (args) => ({
    components: { KdsDynamicModalProvider, KdsButton },
    setup() {
      const { showByTemplate } = useKdsDynamicModal();

      const showModal = () => {
        showByTemplate({
          title: "Can you see this?",
          icon: "list-bulletpoint",
          closedby: "any",
          component: markRaw(DemoCustomComponent),
        });
      };

      return {
        args,
        showModal,
      };
    },
    template: `
    <KdsButton
      label="Comp. with KdsModalLayout"
      variant="filled"
      @click="showModal"
    />
    <!-- put this somewhere global like app.vue -->
    <KdsDynamicModalProvider />
  `,
  }),
  args: {},
};

export const WithCustomComponentWithoutLayout: Story = {
  render: (args) => ({
    components: { KdsDynamicModalProvider, KdsButton },
    setup() {
      const { showByTemplate } = useKdsDynamicModal();

      const showModal = () => {
        showByTemplate({
          title: "Can you see this?",
          icon: "list-bulletpoint",
          closedby: "any",
          context: {
            someData: true,
            something: "asdf",
          },
          component: (props) =>
            h("div", [
              h("h3", "A Headline"),
              h("p", [
                "This: ",
                h("button", { onClick: props.onClose }, "click me"),
                props.context.someData
                  ? "Just supply a VNode."
                  : "someData false",
              ]),
            ]),
        });
      };
      return {
        args,
        showModal,
      };
    },
    template: `
    <KdsButton
      label="Component based content"
      variant="filled"
      @click="showModal"
    />
    <!-- put this somewhere global like app.vue -->
    <KdsDynamicModalProvider />
  `,
  }),
  args: {},
};
