import type { Meta, StoryObj } from "@storybook/react";

import Divider from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "atoms/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    size: {
      control: { type: "select" },
      options: ["normal", "thick"],
    },
    decorative: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Defualt: Story = {
  args: {
    orientation: "horizontal",
    size: "normal",
    decorative: false,
  },
};

export const Horizontal: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "12px",
        width: "100%",
      }}
    >
      <p>horizontal</p>
      <Divider />
      <p>horizontal</p>
      <Divider size="thick" />
      <p>horizontal</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    size: "normal",
    decorative: true,
  },
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        columnGap: "12px",
        height: "16px",
      }}
    >
      <p>vertical</p>
      <Divider orientation="vertical" decorative />
      <p>vertical</p>
      <Divider orientation="vertical" size="thick" decorative />
      <span>vertical</span>
    </div>
  ),
};
