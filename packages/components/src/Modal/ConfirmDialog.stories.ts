import { h } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Button from "../Button/Button.vue";

import ConfirmDialog from "./ConfirmDialog.vue";
import { useConfirmDialog } from "./useConfirmDialog";

const scriptExample = `html
<script setup lang="ts">
import { useConfirmDialog } from "@knime/kds-components";

const { show } = useConfirmDialog();
const result = await show({ title: "Confirm", message: "Can you confirm this?" });

if (result.confirmed) {
  // do your thing
}
</script>
`.trim();

const templateExample = `html
<template>
  <ConfirmDialog />
</template>
`.trim();

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/Modal/useConfirmDialog",
  component: ConfirmDialog,
  parameters: {
    docs: {
      description: {
        component:
          "ConfirmDialog component should only be used via the `useConfirmDialog()` composable. It is required " +
          "to put the `<ConfirmDialog />` tag somewhere global in your application, ideally as a child of `<body>`. " +
          "If you use Nuxt it makes sense to put it between `<ClientOnly></ClientOnly>` to avoid SSR problems. " +
          "\n#### Example usage\n" +
          `\`\`\`${scriptExample}\`\`\`` +
          "Somewhere in your app, state is shared via  useConfirmDialog\n" +
          `\`\`\`${templateExample}\`\`\``,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

export const ConfirmDialogStory: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const { show } = useConfirmDialog();

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
    <Button
      label="Show confirm"
      variant="filled"
      @click="showDialog"
    />
    <ConfirmDialog />
  `,
  }),
  args: {},
};

export const ConfirmDialogWithCustomComponent: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const { show } = useConfirmDialog();

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
    <Button
      label="Component based content"
      variant="filled"
      @click="showDialog"
    />
    <ConfirmDialog />
  `,
  }),
  args: {},
};
