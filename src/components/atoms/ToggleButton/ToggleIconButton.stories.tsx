import type { Meta, StoryObj } from "@storybook/react";

import ToggleIconButton from "./ToggleIconButton";
import { icons } from "../Icon/icons";

const meta: Meta<typeof ToggleIconButton> = {
  title: "atoms/ToggleIconButton",
  component: ToggleIconButton,
  argTypes: {
    icon: {
      control: { type: "select" },
      options: Object.keys(icons),
    },
    active: {
      control: { type: "boolean" },
    },
    value: {
      control: { type: "text" },
    },
    label: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleIconButton>;

export const Default: Story = {
  args: {
    icon: "Book",
    active: false,
  },
};
