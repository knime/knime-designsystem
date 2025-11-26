import { h } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import KdsButton from "../Button/KdsButton.vue";

import KdsConfirmDialog from "./KdsConfirmDialog.vue";
import { useKdsConfirmDialog } from "./useKdsConfirmDialog";

const scriptExample = `html
<script setup lang="ts">
import { useKdsConfirmDialog } from "@knime/kds-components";

const { show } = useKdsConfirmDialog();
const result = await show({ title: "Confirm", message: "Can you confirm this?" });

if (result.confirmed) {
  // do your thing
}
</script>
`.trim();

const templateExample = `html
<template>
  <KdsConfirmDialog />
</template>
`.trim();

const meta: Meta<typeof KdsConfirmDialog> = {
  title: "Components/Modal/useKdsConfirmDialog",
  component: KdsConfirmDialog,
  parameters: {
    docs: {
      description: {
        component:
          "KdsConfirmDialog component should only be used via the `useKdsConfirmDialog()` composable. It is required " +
          "to put the `<KdsConfirmDialog />` tag somewhere global in your application, ideally as a child of `<body>`. " +
          "If you use Nuxt it makes sense to put it between `<ClientOnly></ClientOnly>` to avoid SSR problems. " +
          "\n#### Example usage\n" +
          `\`\`\`${scriptExample}\`\`\`` +
          "Somewhere in your app, state is shared via  useKdsConfirmDialog\n" +
          `\`\`\`${templateExample}\`\`\``,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof KdsConfirmDialog>;

export const Example: Story = {
  render: (args) => ({
    components: { KdsConfirmDialog, KdsButton },
    setup() {
      const { show } = useKdsConfirmDialog();

      const showDialog = () => {
        show({
          title: "Sure?",
          message: "Are you sure?",
          doNotAskAgain: {
            label: "Do not ask again?",
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
    <KdsConfirmDialog />
  `,
  }),
  args: {},
};

export const WithCustomComponent: Story = {
  render: (args) => ({
    components: { KdsConfirmDialog, KdsButton },
    setup() {
      const { show } = useKdsConfirmDialog();

      const showDialog = () => {
        show({
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
    <KdsConfirmDialog />
  `,
  }),
  args: {},
};
