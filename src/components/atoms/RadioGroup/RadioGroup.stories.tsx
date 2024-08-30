import { Meta, StoryObj } from "@storybook/react";

import RadioGroup, { RadioGroupProps } from "./RadioGroup";
import fruitesData from "./json/fruits.json";

const mockData = fruitesData as RadioGroupProps["items"];

const meta: Meta<typeof RadioGroup> = {
  title: "atoms/RadioGroup",
  component: RadioGroup,
  argTypes: {
    items: {
      control: { type: "object" },
    },
    loop: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const firstItem = mockData.slice(0, 1);

export const Default: Story = {
  args: {
    items: firstItem,
  },
};

export const Group: Story = {
  args: {
    items: mockData,
    disabled: false,
    required: false,
  },
};
