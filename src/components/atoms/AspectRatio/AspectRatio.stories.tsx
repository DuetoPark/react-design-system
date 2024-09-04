import { Meta, StoryObj } from "@storybook/react";

import AspectRatio from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "atoms/AspectRatio",
  component: AspectRatio,
  argTypes: {
    ratio: {
      control: { type: "number" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <AspectRatio ratio={args.ratio}>
      <div style={{ backgroundColor: "red" }}></div>
    </AspectRatio>
  ),
};
