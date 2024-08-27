import type { Meta, StoryObj } from "@storybook/react";

import Icon, { IconName } from "./Icon";
import { icons } from "./icons";

const meta: Meta<typeof Icon> = {
  title: "atoms/Icon",
  component: Icon,
  argTypes: {
    icon: {
      control: { type: "select" },
      options: Object.keys(icons),
    },
    size: {
      control: { type: "select" },
      options: ["tiny", "small", "medium", "large", "normal", 36, 54, 72],
    },
    label: {
      control: { type: "text" },
    },
    className: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: "LogoApple",
    size: "normal",
  },
};

export const All: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: "24px",
        rowGap: "24px",
      }}
    >
      {Object.keys(icons).map((iconName) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "24px",
            width: "240px",
            padding: "24px",
          }}
        >
          <div
            key={iconName}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#3385ff",
              color: "white",
            }}
          >
            <Icon icon={iconName as IconName} />
          </div>
          <span style={{ fontWeight: 500 }}>{iconName}</span>
        </div>
      ))}
    </div>
  ),
};
