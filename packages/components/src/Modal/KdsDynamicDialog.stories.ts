import { h, markRaw } from "vue";
import type { Meta, StoryContext, StoryObj } from "@storybook/vue3-vite";

import KdsButton from "../Button/KdsButton.vue";
import { convertImportsInSfc } from "../test-utils/convertImportsInSfc";
import { convertStoryCodeToSfc } from "../test-utils/convertStoryCodeToSfc";

import DemoCustomComponent from "./DemoCustomComponent.vue";
import DemoCustomComponentSource from "./DemoCustomComponent.vue?raw";
import KdsDynamicDialog from "./KdsDynamicDialog.vue";
import { useKdsDialog } from "./useKdsDialog";

const scriptExample = `
<script setup lang="ts">
import { useKdsDialog } from "@knime/kds-components";

const { askConfirmation } = useKdsDialog();
const result = await askConfirmation({ title: "Confirm", message: "A question for you." });

if (result.confirmed) {
  // do your thing
}
</script>
`.trim();

const templateExample = `
<template>
  <KdsDynamicDialog />
</template>
`.trim();

const meta: Meta<typeof KdsDynamicDialog> = {
  title: "Components/Modal/useKdsDialog",
  component: KdsDynamicDialog,
  parameters: {
    docs: {
      source: {
        type: "auto",
        language: "html",
        transform: async (_source: string, storyContext: StoryContext) => {
          const result = await convertStoryCodeToSfc(
            storyContext.originalStoryFn.toString(),
          );
          return result;
        },
      },
      description: {
        component:
          "KdsDynamicDialog component should only be used via the `useKdsDialog()` composable. It is required " +
          "to put the `<KdsDynamicDialog />` tag somewhere global in your application, ideally as a child of `<body>`. " +
          "If you use Nuxt it makes sense to put it between `<ClientOnly></ClientOnly>` to avoid SSR problems. " +
          "\n#### Example usage\n" +
          `\`\`\`html\n${scriptExample}\`\`\`` +
          "Somewhere in your app, state is shared via  useKdsDialog\n" +
          `\`\`\`html\n${templateExample}\`\`\``,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof KdsDynamicDialog>;

export const Confirmation: Story = {
  render: (args) => ({
    /* useKdsDialog is added for source code generation */
    components: {
      KdsDynamicDialog,
      KdsButton,
      useKdsDialog,
    },
    setup() {
      const { askConfirmation } = useKdsDialog();

      const showDialog = () => {
        askConfirmation({
          title: "Sure?",
          message: "Are you sure?",
          doNotAskAgain: {
            label: "Do not ask again",
            title: "Some more info…",
            helperText: "Can be changed in the settings.",
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
        showDialog,
      };
    },
    template: `
    <KdsButton
      label="Show confirm"
      variant="filled"
      @click="showDialog"
    />
    <!-- put this somewhere global like app.vue -->
    <KdsDynamicDialog />
  `,
  }),
  args: {},
};

export const ConfirmationWithTemplate: Story = {
  render: (args) => ({
    components: { KdsDynamicDialog, KdsButton },
    setup() {
      const { askConfirmation } = useKdsDialog();

      const showDialog = () => {
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
        showDialog,
      };
    },
    template: `
    <KdsButton
      label="Component based content"
      variant="filled"
      @click="showDialog"
    />
    <!-- put this somewhere global like app.vue -->
    <KdsDynamicDialog />
  `,
  }),
  args: {},
};

export const WithCustomComponentAndLayout: Story = {
  parameters: {
    docs: {
      source: {
        type: "auto",
        language: "html",
        transform: async (_source: string, storyContext: StoryContext) => {
          const result = await convertStoryCodeToSfc(
            storyContext.originalStoryFn.toString(),
          );
          return `${result}\n<!--  DemoCustomComponent.vue -->\n${convertImportsInSfc(DemoCustomComponentSource)}`;
        },
      },
    },
  },
  render: (args) => ({
    components: { KdsDynamicDialog, KdsButton },
    setup() {
      const { showByTemplate } = useKdsDialog();

      const showDialog = () => {
        showByTemplate({
          title: "Can you see this?",
          icon: "list-bulletpoint",
          closedby: "any",
          component: markRaw(DemoCustomComponent),
        });
      };

      return {
        args,
        showDialog,
      };
    },
    template: `
    <KdsButton
      label="Component based content"
      variant="filled"
      @click="showDialog"
    />
    <!-- put this somewhere global like app.vue -->
    <KdsDynamicDialog />
  `,
  }),
  args: {},
};

export const WithCustomComponentWithoutLayout: Story = {
  render: (args) => ({
    components: { KdsDynamicDialog, KdsButton },
    setup() {
      const { showByTemplate } = useKdsDialog();

      const showDialog = () => {
        showByTemplate({
          title: "Can you see this?",
          icon: "list-bulletpoint",
          closedby: "any",
          component: (props) =>
            h("div", [
              h("h3", "A Headline"),
              h("p", [
                "This is some ",
                h("button", { onClick: props.onClose }, "click me"),
                " text. Just supply a VNode as component.",
              ]),
            ]),
        });
      };
      return {
        args,
        showDialog,
      };
    },
    template: `
    <KdsButton
      label="Component based content"
      variant="filled"
      @click="showDialog"
    />
    <!-- put this somewhere global like app.vue -->
    <KdsDynamicDialog />
  `,
  }),
  args: {},
};
