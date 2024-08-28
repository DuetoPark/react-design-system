import type { Meta, StoryObj } from "@storybook/react";

import AvatarButton from "./AvatarButton";

const meta: Meta<typeof AvatarButton> = {
  title: "atoms/AvatarButton",
  component: AvatarButton,
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

type Story = StoryObj<typeof AvatarButton>;

export const Default: Story = {
  args: {
    variant: "person",
    size: "medium",
  },
};
