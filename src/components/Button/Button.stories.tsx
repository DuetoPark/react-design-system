import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["solid", "outlined", "text"],
    },
    color: {
      control: { type: "radio" },
      options: ["primary", "secondary", "assistive"],
    },
    size: {
      control: { type: "radio" },
      options: ["large", "medium", "small"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// 각각의 스토리를 정의합니다.
export const Default: Story = {
  args: {
    variant: "solid",
    color: "primary",
    size: "medium",
    children: "Solid Button",
  },
};

// 테마 관련
export const Theme: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: "8px",
      }}
    >
      <Button>Solid</Button>

      <Button variant="outlined">Outlined</Button>
      <Button variant="outlined" color="secondary">
        Outlined
      </Button>
      <Button variant="outlined" color="assistive">
        Outlined
      </Button>

      <Button variant="text">Text</Button>
      <Button variant="text" color="assistive">
        Text
      </Button>
    </div>
  ),
};

// 크기 관련
export const Size: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: "8px",
      }}
    >
      <Button size="large">Solid</Button>
      <Button size="medium">Solid</Button>
      <Button size="small">Solid</Button>
    </div>
  ),
};

// 크기 관련
export const Disabled: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: "8px",
      }}
    >
      <Button disabled>Solid</Button>
      <Button variant="outlined" disabled>
        Outlined
      </Button>
      <Button variant="text" disabled>
        Text
      </Button>
    </div>
  ),
};
