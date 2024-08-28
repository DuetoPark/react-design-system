import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "atoms/Avatar",
  component: Avatar,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["person", "company", "academic"],
    },
    size: {
      control: { type: "select" },
      options: ["xsmall", "small", "medium", "large", "xlarge", 48, 54, 60, 72],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    variant: "person",
    size: "medium",
  },
};
