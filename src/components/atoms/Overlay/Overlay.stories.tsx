import type { Meta, StoryObj } from "@storybook/react";

import Overlay from "./Overlay";

const meta: Meta<typeof Overlay> = {
  title: "atoms/Overlay",
  component: Overlay,
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Defualt: Story = {};
