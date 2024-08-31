import { Meta, StoryObj } from "@storybook/react";

import Switch from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "atoms/Switch",
  component: Switch,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};
