import { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["square", "round", "ghost"],
    },
    size: {
      control: { type: "radio" },
      options: ["normal", "small"],
    },
    state: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Defualt: Story = {
  args: {
    variant: "square",
    size: "normal",
    state: true,
  },
};
