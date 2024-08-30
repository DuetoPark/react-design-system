import { Meta, StoryObj } from "@storybook/react";
import * as PrimitiveRadioGroup from "@radix-ui/react-radio-group";

import Radio from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "atoms/Radio",
  component: Radio,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    id: "default",
    value: "default",
    size: "normal",
  },
  render: ({ disabled, id, value, size }) => (
    <PrimitiveRadioGroup.Root disabled={disabled}>
      <div className="radio--item">
        <Radio id={id} value={value} size={size} />
      </div>
    </PrimitiveRadioGroup.Root>
  ),
};
