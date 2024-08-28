import type { Meta, StoryObj } from "@storybook/react";

import FloatingButton from "./FloatingButton";
import { icons } from "../Icon/icons";

const meta: Meta<typeof FloatingButton> = {
  title: "atoms/FloatingButton",
  component: FloatingButton,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    icon: {
      control: { type: "select" },
      options: Object.keys(icons),
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    icon: "LogoApple",
    disabled: false,
  },
};
