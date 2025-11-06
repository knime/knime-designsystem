import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Button from "../Button/Button.vue";

import ConfirmDialog from "./ConfirmDialog.vue";
import { useConfirmDialog } from "./useConfirmDialog";

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
      size="large"
      variant="filled"
      @click="showDialog"
    />
    <ConfirmDialog />
  `,
  }),
  args: {},
};
