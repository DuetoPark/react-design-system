import { Meta, StoryObj } from "@storybook/react";

import Mask from "./Mask";

const meta: Meta<typeof Mask> = {
  title: "atoms/Mask",
  component: Mask,
  argTypes: {
    rotate: {
      control: { type: "select" },
      options: ["left", "top", "bottom", "right"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Mask>;

export const Default: Story = {
  args: {
    rotate: "left",
  },
  render: (args) => (
    <div style={{ width: "100%", height: "100px", backgroundColor: "black" }}>
      <Mask rotate={args.rotate} />
    </div>
  ),
};
