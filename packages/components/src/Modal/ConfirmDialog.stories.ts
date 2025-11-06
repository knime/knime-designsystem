import { h } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Button from "../Button/Button.vue";

import ConfirmDialog from "./ConfirmDialog.vue";
import {
  cancelButton,
  confirmButton,
  useConfirmDialog,
} from "./useConfirmDialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/Modal/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  parameters: {},
  argTypes: {},
  args: {},
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
          cancelButtons: [cancelButton("Nay")],
          confirmButtons: [
            {
              type: "confirm",
              label: "Maybe",
              leadingIcon: "circle-question",
              variant: "outlined",
              autofocus: true,
              customHandler: () => {
                alert("Think again…");
              },
            },
            confirmButton("Sure thing"),
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
