import type { Meta, StoryObj } from "@storybook/react";

import AvatarGroup from "./AvatarGroup";
import { AvatarStyleProps } from "../Avatar/Avatar";
import companyData from "./json/company.json";

const mockData = companyData as AvatarStyleProps[];

const meta: Meta<typeof AvatarGroup> = {
  title: "atoms/AvatarGroup",
  component: AvatarGroup,
  argTypes: {
    avatars: {
      control: { type: `object` },
      options: [
        {
          variant: {
            control: { type: "radio" },
            options: ["person", "company", "academic"],
          },
        },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  args: {
    avatars: mockData,
  },
};
