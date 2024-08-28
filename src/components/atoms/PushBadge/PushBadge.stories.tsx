import type { Meta, StoryObj } from "@storybook/react";

import PushBadge from "./PushBadge";

const meta: Meta<typeof PushBadge> = {
  title: "atoms/PushBadge",
  component: PushBadge,
};

export default meta;

type Story = StoryObj<typeof PushBadge>;

export const Default: Story = {};
