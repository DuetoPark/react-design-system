import type { Meta, StoryObj } from "@storybook/react";

import IconButton from "./IconButton";
import { icons } from "../Icon/icons";

const meta: Meta<typeof IconButton> = {
  title: "atoms/IconButton",
  component: IconButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "outlined", "background", "normal"],
    },
    size: {
      control: { type: "select" },
      options: ["normal", "small", 54, 36, 32, 28],
    },
    disabled: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "select" },
      options: Object.keys(icons),
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    variant: "normal",
    size: "normal",
    icon: "LogoApple",
    disabled: false,
  },
};

export const Variant: Story = {
  render: () => (
    <div style={{ display: "flex", columnGap: "12px" }}>
      <IconButton label="애플 로고" variant="normal" icon="LogoApple" />
      <IconButton label="애플 로고" variant="background" icon="LogoApple" />
      <IconButton label="애플 로고" variant="outlined" icon="LogoApple" />
      <IconButton label="애플 로고" variant="solid" icon="LogoApple" />
    </div>
  ),
};
